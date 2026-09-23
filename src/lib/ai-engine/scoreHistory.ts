import type { AiAuditMetrics, ScoreHistoryPoint } from "@/content/types";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function recordScoreHistory(metrics: AiAuditMetrics): Promise<void> {
  const admin = createSupabaseAdminClient();
  if (!admin) return;
  await admin.from("seo_score_history").insert({
    target: metrics.target,
    overall: metrics.overallScore,
    seo: metrics.seoScore,
    aeo: metrics.aeoReadiness,
    geo: metrics.geoReadiness,
    payload: {
      health: metrics.health,
      issues: metrics.issues.map((issue) => issue.code),
    },
  });
}

export async function getScoreHistory(target: string, limit = 12): Promise<ScoreHistoryPoint[]> {
  const admin = createSupabaseAdminClient();
  if (!admin) return [];
  const { data, error } = await admin
    .from("seo_score_history")
    .select("target, overall, seo, aeo, geo, created_at")
    .eq("target", target)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return [...data].reverse().map((row) => ({
    target: String(row.target),
    overall: Number(row.overall),
    seo: Number(row.seo),
    aeo: Number(row.aeo),
    geo: Number(row.geo),
    createdAt: String(row.created_at),
  }));
}
