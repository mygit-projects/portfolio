import type { MetadataRoute } from "next";
import { getPublicSiteUrl, PRODUCTION_SITE_URL } from "@/lib/site";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export type SitemapChangeFrequency = "weekly" | "monthly";

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}

export interface SitemapSnapshot {
  url: string;
  generatedAt: string;
  entries: SitemapEntry[];
}

export function getSitemapPublicUrl() {
  return `${getPublicSiteUrl()}/sitemap.xml`;
}

export function buildSitemapEntries(
  portfolio: { projects: Array<{ id: string }> },
  generatedAt = new Date(),
): SitemapEntry[] {
  const siteUrl = getPublicSiteUrl();
  const lastModified = generatedAt.toISOString();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/ai`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...portfolio.projects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

export function toMetadataSitemap(entries: SitemapEntry[]): MetadataRoute.Sitemap {
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: new Date(entry.lastModified),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

function isSitemapEntry(value: unknown): value is SitemapEntry {
  if (!value || typeof value !== "object") return false;
  const row = value as SitemapEntry;
  return (
    typeof row.url === "string" &&
    row.url.startsWith("https://") &&
    !/localhost|127\.0\.0\.1/.test(row.url) &&
    typeof row.lastModified === "string" &&
    (row.changeFrequency === "weekly" || row.changeFrequency === "monthly") &&
    typeof row.priority === "number"
  );
}

function normalizeEntries(value: unknown): SitemapEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isSitemapEntry).map((entry) => ({
    ...entry,
    url: entry.url.replace(/^https?:\/\/(www\.)?iamfaizan\.dev/i, PRODUCTION_SITE_URL),
  }));
}

export async function getSitemapSnapshot(): Promise<SitemapSnapshot | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;

  const { data, error } = await admin.from("seo_sitemap").select("entries, generated_at").limit(1).maybeSingle();
  if (error || !data) return null;

  const entries = normalizeEntries(data.entries);
  if (!entries.length) return null;

  return {
    url: getSitemapPublicUrl(),
    generatedAt: typeof data.generated_at === "string" ? data.generated_at : new Date().toISOString(),
    entries,
  };
}

export async function saveSitemapSnapshot(
  entries: SitemapEntry[],
  generatedAt = new Date(),
  userId?: string,
): Promise<SitemapSnapshot> {
  const snapshot: SitemapSnapshot = {
    url: getSitemapPublicUrl(),
    generatedAt: generatedAt.toISOString(),
    entries,
  };

  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error("Supabase service role is required to save the sitemap.");
  }

  const { data: existing, error: existingError } = await admin.from("seo_sitemap").select("id").limit(1).maybeSingle();
  if (existingError) {
    throw new Error(existingError.message);
  }

  const payload = {
    entries,
    generated_at: snapshot.generatedAt,
    updated_by: userId ?? null,
  };

  const write = existing?.id
    ? await admin.from("seo_sitemap").update(payload).eq("id", existing.id)
    : await admin.from("seo_sitemap").insert(payload);

  if (write.error) {
    const missingTable = write.error.code === "42P01" || /seo_sitemap/i.test(write.error.message);
    throw new Error(
      missingTable
        ? "Run supabase/seo_sitemap.sql in the Supabase SQL editor, then generate again."
        : write.error.message,
    );
  }

  return snapshot;
}

export async function refreshSitemapFromProjects(projects: Array<{ id: string }>, userId?: string) {
  try {
    await saveSitemapSnapshot(buildSitemapEntries({ projects }), new Date(), userId);
  } catch (error) {
    console.error("[sitemap] snapshot refresh failed:", error instanceof Error ? error.message : error);
  }
}
