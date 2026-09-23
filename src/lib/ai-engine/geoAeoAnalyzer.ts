import type { AiAuditMetrics } from "@/content/types";
import { buildHomepageDocument } from "./documents";
import { GeminiLlmClient, resolveLlmClient } from "./llmClient";
import { analyzeSeoDocument, auditSeoDocument } from "./seoAnalyzer";
import type { AuditInput, AuditResult, LlmClient } from "./types";
import { serializePortfolioForAudit } from "./types";

export { GeminiLlmClient, resolveLlmClient };
export { serializePortfolioForAudit };

function documentFromAuditInput(input: AuditInput) {
  return {
    target: "homepage",
    kind: "homepage" as const,
    title: input.title,
    description: input.description,
    body: input.body,
    headings: [
      { level: 1 as const, text: input.title },
      { level: 2 as const, text: "Overview" },
    ],
    keywords: input.entities.slice(0, 8),
    images: [],
    lists: [],
    faqs: [],
    entities: input.entities,
    geoSignals: input.geoSignals,
    citations: input.citations,
    stats: [],
    path: "/",
    focusEntity: input.entities[0] ?? input.title,
  };
}

export function analyzeHeuristically(input: AuditInput): AuditResult {
  return analyzeSeoDocument(documentFromAuditInput(input));
}

export async function auditPortfolioContent(
  input: AuditInput,
  client: LlmClient | null = resolveLlmClient(),
): Promise<AiAuditMetrics> {
  return auditSeoDocument(documentFromAuditInput(input), undefined, {}, client);
}

export async function auditSerializedHomepage(
  input: Parameters<typeof buildHomepageDocument>[0],
): Promise<AiAuditMetrics> {
  return auditSeoDocument(buildHomepageDocument(input));
}
