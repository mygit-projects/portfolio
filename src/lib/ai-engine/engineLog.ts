import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { EngineMode, PolicyRejection } from "./policy";
import type { SeoOptimizePatch } from "./optimize";

export interface SeoEngineLogRow {
  runId: string;
  target: string;
  provider: string;
  mode: EngineMode;
  applied: SeoOptimizePatch;
  queued: SeoOptimizePatch;
  rejected: PolicyRejection[];
  reason: string;
  createdAt: string;
}

export async function recordEngineLog(entry: Omit<SeoEngineLogRow, "createdAt">): Promise<void> {
  const admin = createSupabaseAdminClient();
  if (!admin) return;
  await admin.from("seo_engine_log").insert({
    run_id: entry.runId,
    target: entry.target,
    provider: entry.provider,
    mode: entry.mode,
    applied: entry.applied,
    queued: entry.queued,
    rejected: entry.rejected,
    reason: entry.reason,
  });
}

export async function getEngineLog(limit = 12): Promise<SeoEngineLogRow[]> {
  const admin = createSupabaseAdminClient();
  if (!admin) return [];
  const { data, error } = await admin
    .from("seo_engine_log")
    .select("run_id, target, provider, mode, applied, queued, rejected, reason, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error || !data) return [];
  return data.map((row) => ({
    runId: String(row.run_id),
    target: String(row.target),
    provider: String(row.provider),
    mode: row.mode === "auto-safe" ? "auto-safe" : "suggest",
    applied: (row.applied ?? {}) as SeoOptimizePatch,
    queued: (row.queued ?? {}) as SeoOptimizePatch,
    rejected: Array.isArray(row.rejected) ? (row.rejected as PolicyRejection[]) : [],
    reason: String(row.reason ?? ""),
    createdAt: String(row.created_at),
  }));
}

export async function getEngineLogByRunId(runId: string): Promise<SeoEngineLogRow | null> {
  const admin = createSupabaseAdminClient();
  if (!admin) return null;
  const { data, error } = await admin
    .from("seo_engine_log")
    .select("run_id, target, provider, mode, applied, queued, rejected, reason, created_at")
    .eq("run_id", runId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    runId: String(data.run_id),
    target: String(data.target),
    provider: String(data.provider),
    mode: data.mode === "auto-safe" ? "auto-safe" : "suggest",
    applied: (data.applied ?? {}) as SeoOptimizePatch,
    queued: (data.queued ?? {}) as SeoOptimizePatch,
    rejected: Array.isArray(data.rejected) ? (data.rejected as PolicyRejection[]) : [],
    reason: String(data.reason ?? ""),
    createdAt: String(data.created_at),
  };
}