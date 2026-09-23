import { cache } from "react";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { collectLiveAuditExtras } from "./collectLiveAudit";
import { resolveSeoDocument } from "./documents";
import { fieldScoresFromMetrics } from "./fieldScores";
import { getLatestInsightSummary } from "./google/snapshots";
import { analyzeSeoDocument } from "./seoAnalyzer";

export const getHomepageHeuristicAudit = cache(async () => {
  const [portfolio, insights] = await Promise.all([getPortfolioFresh(), getLatestInsightSummary()]);
  const document = resolveSeoDocument(portfolio, "homepage");
  const extras = await collectLiveAuditExtras(portfolio, document, insights, { live: false });
  const metrics = analyzeSeoDocument(document, insights, extras);
  return {
    portfolio,
    insights,
    document,
    extras,
    metrics,
    scores: fieldScoresFromMetrics(metrics),
  };
});
