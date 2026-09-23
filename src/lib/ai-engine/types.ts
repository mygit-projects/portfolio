import type { PortfolioContent } from "@/content/types";

export type JsonLdNode = Record<string, unknown>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export type LlmProvider = "gemini";

export interface LlmCompletionRequest {
  system: string;
  user: string;
  maxTokens?: number;
  json?: boolean;
}

export interface LlmCompletionResult {
  provider: LlmProvider;
  text: string;
}

export interface LlmClient {
  provider: LlmProvider;
  isConfigured(): boolean;
  complete(request: LlmCompletionRequest): Promise<LlmCompletionResult>;
}

export interface AuditInput {
  title: string;
  description: string;
  body: string;
  entities: string[];
  geoSignals: string[];
  citations: string[];
}

export interface AuditResult {
  answerFirstScore: number;
  citationAuthority: number;
  entityCoverage: number;
  geoReadiness: number;
  aeoReadiness: number;
  overallScore: number;
  issues: Array<{
    code: string;
    severity: "info" | "warning" | "critical";
    message: string;
    recommendation: string;
  }>;
  recommendations: string[];
  analyzedAt: string;
  provider: "heuristic" | "gemini" | "hybrid";
  llmSummary?: string;
}

export function serializePortfolioForAudit(portfolio: PortfolioContent): AuditInput {
  const citations = [
    ...portfolio.projects.map((project) => project.liveUrl),
    portfolio.personalInfo.socialLinks.linkedin,
    portfolio.personalInfo.socialLinks.github,
  ];

  const entities = [
    portfolio.personalInfo.name,
    portfolio.personalInfo.title,
    portfolio.personalInfo.location,
    ...portfolio.experience.map((item) => item.company),
    ...portfolio.projects.map((item) => item.title),
    ...portfolio.services.map((item) => item.title),
  ];

  const geoSignals = [
    portfolio.personalInfo.location,
    "Dubai",
    "United Arab Emirates",
    "UAE",
    "Pakistan",
    "Karachi",
  ];

  const body = [
    portfolio.personalInfo.bio,
    portfolio.personalInfo.tagline,
    ...portfolio.services.map((service) => `${service.title}. ${service.description}`),
    ...portfolio.projects.map(
      (project) =>
        `${project.title}: ${project.description} Challenge: ${project.fullCaseStudy.challenge} Solution: ${project.fullCaseStudy.solution}`,
    ),
    ...portfolio.experience.map((item) => `${item.title} at ${item.company}. ${item.summary}`),
  ].join("\n\n");

  return {
    title: portfolio.site.title,
    description: portfolio.site.description,
    body,
    entities,
    geoSignals,
    citations,
  };
}
