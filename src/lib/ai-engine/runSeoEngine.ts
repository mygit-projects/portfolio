import { randomUUID } from "node:crypto";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { collectLiveAuditExtras } from "./collectLiveAudit";
import { resolveSeoDocument } from "./documents";
import { getLatestInsightSummary, syncGoogleInsights } from "./google/snapshots";
import { recordScoreHistory } from "./scoreHistory";
import { analyzeSeoDocument } from "./seoAnalyzer";
import { applyOptimizePatch, generateOptimizePatch, type SeoOptimizePatch } from "./optimize";
import { resolveLlmClient } from "./llmClient";
import { getEngineSettings } from "./engineSettings";
import { getPinnedPaths } from "./fieldPins";
import { recordEngineLog } from "./engineLog";
import { applySectionsAsEngine } from "./applyAdmin";
import { patchHasChanges, splitOptimizePatch } from "./policy";
import type { AiAuditMetrics } from "@/content/types";
import type { SeoEngineLogRow } from "./engineLog";
import type { SeoEngineSettings } from "./engineSettings";

export interface RunSeoEngineResult {
  metrics: AiAuditMetrics;
  applied: SeoOptimizePatch;
  queued: SeoOptimizePatch;
  rejected: SeoEngineLogRow["rejected"];
  settings: SeoEngineSettings;
  runId: string;
  reason: string;
}

export async function runSeoEngine(options: {
  target?: string;
  live?: boolean;
  syncGoogle?: boolean;
  optimize?: boolean;
}): Promise<RunSeoEngineResult> {
  const target = options.target ?? "homepage";
  const optimize = options.optimize ?? true;
  const live = options.live ?? optimize;

  if (options.syncGoogle) {
    try {
      await syncGoogleInsights();
    } catch {
      // Google may be disconnected.
    }
  }

  const [settings, portfolio, insights, pins] = await Promise.all([
    getEngineSettings(),
    getPortfolioFresh(),
    getLatestInsightSummary(),
    getPinnedPaths(),
  ]);

  const document = resolveSeoDocument(portfolio, target);
  const extras = await collectLiveAuditExtras(portfolio, document, insights, { live });
  const metrics = analyzeSeoDocument(document, insights, extras);
  await recordScoreHistory(metrics);

  const runId = randomUUID();
  const provider = optimize ? (resolveLlmClient(settings.providerPreference)?.provider ?? metrics.provider) : "heuristic";

  if (!optimize) {
    const reason = "Scored without proposing CMS changes.";
    await recordEngineLog({
      runId,
      target,
      provider,
      mode: settings.mode,
      applied: {},
      queued: {},
      rejected: [],
      reason,
    });
    return {
      metrics,
      applied: {},
      queued: {},
      rejected: [],
      settings,
      runId,
      reason,
    };
  }

  try {
    const rawPatch = await generateOptimizePatch(portfolio, document, insights, settings.providerPreference);
    const split = splitOptimizePatch(rawPatch, pins, settings.mode, portfolio);

    if (patchHasChanges(split.applied)) {
      const sections = applyOptimizePatch(portfolio, split.applied);
      await applySectionsAsEngine(sections);
    }

    const reason = patchHasChanges(split.applied)
      ? `Applied auto-safe fields in ${settings.mode} mode.`
      : patchHasChanges(split.queued)
        ? "Queued proposals for review."
        : "No CMS changes proposed.";

    await recordEngineLog({
      runId,
      target,
      provider,
      mode: settings.mode,
      applied: split.applied,
      queued: split.queued,
      rejected: split.rejected,
      reason,
    });

    return {
      metrics,
      applied: split.applied,
      queued: split.queued,
      rejected: split.rejected,
      settings,
      runId,
      reason,
    };
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Engine run failed.";
    await recordEngineLog({
      runId,
      target,
      provider,
      mode: settings.mode,
      applied: {},
      queued: {},
      rejected: [],
      reason,
    });
    return {
      metrics,
      applied: {},
      queued: {},
      rejected: [],
      settings,
      runId,
      reason,
    };
  }
}
