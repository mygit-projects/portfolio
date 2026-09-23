import type { GoogleInsightSummary } from "@/content/types";
import { decryptSecret, encryptSecret } from "@/lib/ai-engine/tokenCrypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fetchGa4Snapshot } from "./ga4Client";
import { fetchGbpSnapshot } from "./gbpClient";
import { refreshGoogleAccessToken } from "./googleOAuth";
import { fetchGscSnapshot } from "./gscClient";
import type { GoogleIntegrationRecord, InsightSnapshotPayload } from "./types";

function questionQuery(query: string): boolean {
  return /^(who|what|why|how|when|where|near)\b|\?/.test(query.toLowerCase());
}

export async function getGoogleIntegration(): Promise<GoogleIntegrationRecord | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin.from("seo_integrations").select("*").eq("provider", "google").maybeSingle();
  if (error || !data) return null;
  const record = data as GoogleIntegrationRecord;
  return {
    ...record,
    refresh_token: decryptSecret(record.refresh_token),
    access_token: decryptSecret(record.access_token),
  };
}

export async function upsertGoogleIntegration(values: Partial<GoogleIntegrationRecord> & { provider?: "google" }) {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error("Supabase service role is required to store Google tokens.");
  }

  const existing = await getGoogleIntegration();
  const merged = {
    ...existing,
    ...Object.fromEntries(Object.entries(values).filter(([, value]) => value !== undefined)),
  };
  const payload = {
    provider: "google" as const,
    ...merged,
    refresh_token: encryptSecret(merged.refresh_token ?? null),
    access_token: encryptSecret(merged.access_token ?? null),
    updated_at: new Date().toISOString(),
  };

  const { error } = existing
    ? await admin.from("seo_integrations").update(payload).eq("id", existing.id)
    : await admin.from("seo_integrations").insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteGoogleIntegration() {
  const admin = createSupabaseAdminClient();
  if (!admin) return;
  await admin.from("seo_integrations").delete().eq("provider", "google");
  await admin.from("seo_insight_snapshots").delete().neq("id", "00000000-0000-0000-0000-000000000000");
}

export async function getValidGoogleAccessToken(): Promise<string | null> {
  const integration = await getGoogleIntegration();
  if (!integration?.refresh_token && !integration?.access_token) {
    return null;
  }

  const expiresAt = integration.access_token_expires_at
    ? new Date(integration.access_token_expires_at).getTime()
    : 0;
  if (integration.access_token && expiresAt > Date.now() + 60_000) {
    return integration.access_token;
  }

  if (!integration.refresh_token) {
    return integration.access_token;
  }

  const refreshed = await refreshGoogleAccessToken(integration.refresh_token);
  await upsertGoogleIntegration({
    access_token: refreshed.access_token,
    access_token_expires_at: new Date(Date.now() + (refreshed.expires_in ?? 3600) * 1000).toISOString(),
    refresh_token: refreshed.refresh_token ?? integration.refresh_token,
  });
  return refreshed.access_token;
}

export async function syncGoogleInsights(): Promise<InsightSnapshotPayload> {
  const integration = await getGoogleIntegration();
  const accessToken = await getValidGoogleAccessToken();
  if (!integration || !accessToken) {
    throw new Error("Google is not connected.");
  }

  const payload: InsightSnapshotPayload = {};
  if (integration.gsc_site_url) {
    payload.gsc = await fetchGscSnapshot(accessToken, integration.gsc_site_url);
  }
  if (integration.ga4_property_id) {
    payload.ga4 = await fetchGa4Snapshot(accessToken, integration.ga4_property_id);
  }
  if (integration.gbp_location_name) {
    payload.gbp = await fetchGbpSnapshot(accessToken, integration.gbp_location_name);
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error("Supabase service role is required to store insight snapshots.");
  }

  await admin.from("seo_insight_snapshots").insert({
    source: "combined",
    time_window: "28d",
    payload,
    fetched_at: new Date().toISOString(),
  });

  return payload;
}

export function summarizeInsights(payload?: InsightSnapshotPayload, fetchedAt?: string): GoogleInsightSummary {
  if (!payload) {
    return { connected: false, window: "28d" };
  }

  const uaeClicks = payload.gsc?.countries
    .filter((row) => /are|united arab emirates|ae/i.test(row.country))
    .reduce((sum, row) => sum + row.impressions, 0);
  const totalImpressions = payload.gsc?.totals.impressions ?? 0;
  const uaeSessions =
    payload.ga4?.countries
      .filter((row) => /united arab emirates|uae/i.test(row.country))
      .reduce((sum, row) => sum + row.sessions, 0) ?? 0;
  const totalSessions = payload.ga4?.sessions ?? 0;
  const uaeShare =
    totalSessions > 0
      ? uaeSessions / totalSessions
      : totalImpressions > 0 && uaeClicks
        ? uaeClicks / totalImpressions
        : undefined;

  return {
    connected: true,
    window: "28d",
    fetchedAt,
    clicks: payload.gsc?.totals.clicks,
    impressions: payload.gsc?.totals.impressions,
    ctr: payload.gsc?.totals.ctr,
    averagePosition: payload.gsc?.totals.position,
    sessions: payload.ga4?.sessions,
    uaeShare,
    gbpRating: payload.gbp?.rating,
    gbpReviewCount: payload.gbp?.reviewCount,
    gbpTitle: payload.gbp?.title,
    gbpAddress: payload.gbp?.address,
    topQueries: payload.gsc?.queries.slice(0, 8).map((row) => ({
      query: row.query,
      clicks: row.clicks,
      impressions: row.impressions,
    })),
    topPages: payload.gsc?.pages.slice(0, 8).map((row) => ({
      page: row.page,
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
    })),
    questionQueries: payload.gsc?.queries.filter((row) => questionQuery(row.query)).map((row) => row.query),
  };
}

export async function getLatestInsightSummary(): Promise<GoogleInsightSummary> {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    return { connected: false, window: "28d" };
  }

  const { data, error } = await admin
    .from("seo_insight_snapshots")
    .select("payload, fetched_at")
    .order("fetched_at", { ascending: false })
    .limit(2);

  if (error || !data?.length) {
    const integration = await getGoogleIntegration();
    return { connected: Boolean(integration?.refresh_token || integration?.access_token), window: "28d" };
  }

  const latest = summarizeInsights(data[0].payload as InsightSnapshotPayload, data[0].fetched_at as string);
  if (data[1]) {
    const previous = summarizeInsights(data[1].payload as InsightSnapshotPayload, data[1].fetched_at as string);
    latest.previous = {
      clicks: previous.clicks,
      impressions: previous.impressions,
      ctr: previous.ctr,
      fetchedAt: previous.fetchedAt,
    };
  }
  return latest;
}

export async function getGoogleConnectionStatus() {
  const integration = await getGoogleIntegration();
  const insights = await getLatestInsightSummary();
  return {
    configured: Boolean(process.env.GOOGLE_OAUTH_CLIENT_ID && process.env.GOOGLE_OAUTH_CLIENT_SECRET),
    connected: Boolean(integration?.refresh_token || integration?.access_token),
    email: integration?.connected_email ?? null,
    gscSiteUrl: integration?.gsc_site_url ?? null,
    ga4PropertyId: integration?.ga4_property_id ?? null,
    gbpAccountName: integration?.gbp_account_name ?? null,
    gbpLocationName: integration?.gbp_location_name ?? null,
    insights,
  };
}
