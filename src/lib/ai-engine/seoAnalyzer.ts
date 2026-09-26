import type {
  AiAuditIssue,
  AiAuditMetrics,
  CitationClaim,
  CoreWebVitalsSnapshot,
  GoogleInsightSummary,
  IndexationRow,
  NapCheck,
  RenderAuditSnapshot,
  ScoreHistoryPoint,
  SeoSchemaNode,
} from "@/content/types";
import { healthFromScore, type SeoDocument } from "./documents";
import { buildSerpPreview } from "./serpPreview";
import { getPublicSiteUrl } from "@/lib/site";
import type { LlmClient } from "./types";

export interface LiveAuditExtras {
  render?: RenderAuditSnapshot;
  vitals?: CoreWebVitalsSnapshot;
  indexation?: IndexationRow[];
  claims?: CitationClaim[];
  schemaIssues?: string[];
  schemaNodes?: SeoSchemaNode[];
  nap?: NapCheck;
  history?: ScoreHistoryPoint[];
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function countMatches(haystack: string, needles: string[]): number {
  const text = haystack.toLowerCase();
  return needles.filter((needle) => needle.length > 2 && text.includes(needle.toLowerCase())).length;
}

function pushIssue(
  issues: AiAuditIssue[],
  code: string,
  severity: AiAuditIssue["severity"],
  message: string,
  recommendation: string,
) {
  issues.push({ code, severity, message, recommendation });
}

function scoreSeo(
  document: SeoDocument,
  insights: GoogleInsightSummary | undefined,
  extras: LiveAuditExtras | undefined,
  issues: AiAuditIssue[],
): number {
  let score = 100;
  const serp = buildSerpPreview(document.title, document.description, `${getPublicSiteUrl()}${document.path}`);

  if (!serp.titleFits) {
    score -= 16;
    pushIssue(
      issues,
      "SEO_TITLE_PIXELS",
      "warning",
      `Title is ${serp.titlePx}px (Google truncates near 580px).`,
      "Shorten the title so the focus entity and a proof point remain visible in the SERP.",
    );
  }

  if (!serp.descriptionFits) {
    score -= 12;
    pushIssue(
      issues,
      "SEO_META_PIXELS",
      "warning",
      `Meta description is ${serp.descriptionPx}px / ${document.description.length} chars.`,
      "Keep the description 120–160 characters and under ~920px so the answer is not cut off.",
    );
  }

  const corpus = `${document.title}\n${document.description}\n${document.body}`;
  const focusHits = countMatches(corpus, document.focusEntity.split(/\s+/));
  if (focusHits < 2) {
    score -= 10;
    pushIssue(
      issues,
      "SEO_FOCUS_ENTITY",
      "warning",
      `Focus entity “${document.focusEntity}” is thin in the copy.`,
      "Use the focus entity in the title, first paragraph, and one H2.",
    );
  }

  const headingSource = extras?.render?.headings.length ? extras.render.headings : document.headings;
  const h1Count = extras?.render?.h1.length ?? headingSource.filter((heading) => heading.level === 1).length;
  if (h1Count !== 1) {
    score -= 12;
    pushIssue(
      issues,
      "SEO_HEADING_HIERARCHY",
      "warning",
      `Rendered/document heading hierarchy has ${h1Count} H1s.`,
      "Keep a single H1, then nest H2/H3 sections.",
    );
  }

  const missingAlt = extras?.render ? extras.render.missingAlt : document.images.filter((image) => !image.alt.trim()).length;
  if (missingAlt) {
    score -= 10;
    pushIssue(issues, "SEO_IMAGE_ALT", "warning", `${missingAlt} image(s) are missing alt text.`, "Add descriptive alt text.");
  }

  if (extras?.render?.fetched && extras.render.title && extras.render.title !== document.title) {
    score -= 6;
    pushIssue(
      issues,
      "SEO_RENDER_TITLE_DRIFT",
      "info",
      "Rendered <title> does not match the CMS title.",
      "Keep generateMetadata and the CMS title in sync.",
    );
  }

  if (insights?.connected && (insights.ctr ?? 1) < 0.02 && (insights.impressions ?? 0) > 50) {
    score -= 10;
    pushIssue(
      issues,
      "GSC_LOW_CTR",
      "warning",
      "Search Console shows impressions with a weak click-through rate.",
      "Align title and meta with the top GSC queries.",
    );
  }

  const weakPage = insights?.topPages?.find((page) => page.page.includes(document.path) && page.impressions > 20 && page.ctr < 0.02);
  if (weakPage) {
    score -= 6;
    pushIssue(issues, "GSC_WEAK_PAGE", "info", `${weakPage.page} has impressions but weak CTR.`, "Rewrite the SERP title/description for that URL.");
  }

  if (extras?.vitals?.lcpMs && extras.vitals.lcpMs > 2500) {
    score -= 8;
    pushIssue(issues, "CWV_LCP", "warning", `LCP is ${Math.round(extras.vitals.lcpMs)}ms.`, "Reduce hero image weight and server TTFB.");
  }
  if (extras?.vitals?.inpMs && extras.vitals.inpMs > 200) {
    score -= 6;
    pushIssue(issues, "CWV_INP", "info", `INP is ${Math.round(extras.vitals.inpMs)}ms.`, "Cut main-thread work on first interaction.");
  }
  if (extras?.vitals?.cls !== undefined && extras.vitals.cls > 0.1) {
    score -= 6;
    pushIssue(issues, "CWV_CLS", "info", `CLS is ${extras.vitals.cls}.`, "Reserve image and font space to stop layout shift.");
  }

  const excluded = extras?.indexation?.find((row) => /excluded|not indexed|error/i.test(`${row.coverageState} ${row.verdict} ${row.error}`));
  if (excluded) {
    score -= 10;
    pushIssue(issues, "GSC_NOT_INDEXED", "critical", `${excluded.url} is not cleanly indexed.`, "Check robots, canonical, and request indexing in Search Console.");
  }

  return clampScore(score);
}

function scoreAeo(document: SeoDocument, insights: GoogleInsightSummary | undefined, extras: LiveAuditExtras | undefined, issues: AiAuditIssue[]): number {
  let score = 20;
  const opening = `${document.title} ${document.description} ${document.body}`.slice(0, 420);
  const answerFirst =
    /\bmuhammad faizan\b/i.test(opening) &&
    /\b(dubai|uae|united arab emirates)\b/i.test(opening) &&
    /\b(15\+?|web design|digital solutions|specialist)\b/i.test(opening);

  if (answerFirst) score += 26;
  else {
    pushIssue(issues, "AEO_ANSWER_FIRST", "warning", "Opening copy does not lead with a citable identity statement.", "Lead with name, role, Dubai/UAE, and a measurable outcome.");
  }

  if (document.faqs.length >= 3) score += 20;
  else {
    pushIssue(issues, "AEO_FAQ_BLOCKS", "warning", "FAQ coverage is thin for answer engines.", "Add 3–5 FAQ items that match spoken questions.");
  }

  if (/\b(is a|specialist who|results?|how|what)\b/i.test(document.body)) score += 14;
  else {
    pushIssue(issues, "AEO_DEFINITION", "info", "Copy is light on definition / results phrasing.", "Use a one-sentence definition answer engines can extract.");
  }

  if (extras?.render?.jsonLdTypes.includes("FAQPage") || extras?.schemaIssues === undefined) {
    score += 8;
  }
  if (extras?.schemaIssues?.length) {
    score -= 6;
    pushIssue(issues, "AEO_SCHEMA_INVALID", "warning", extras.schemaIssues[0] ?? "Schema validation failed.", "Keep visible FAQ copy in sync with FAQPage JSON-LD.");
  }

  const questionQueries = insights?.questionQueries ?? [];
  const faqText = document.faqs.map((item) => item.question.toLowerCase()).join(" ");
  const uncovered = questionQueries.filter((query) => !faqText.includes(query.split(" ")[0] ?? ""));
  if (insights?.connected && questionQueries.length && uncovered.length) {
    score -= 8;
    pushIssue(issues, "GSC_QUESTION_GAP", "info", "Question-shaped queries are not fully covered by FAQs.", `Add answers for “${questionQueries.slice(0, 3).join("”, “")}”.`);
  } else if (insights?.connected && questionQueries.length) {
    score += 8;
  }

  return clampScore(score);
}

function scoreGeo(document: SeoDocument, insights: GoogleInsightSummary | undefined, extras: LiveAuditExtras | undefined, issues: AiAuditIssue[]): number {
  const corpus = `${document.title}\n${document.description}\n${document.body}`;
  const entityHits = countMatches(corpus, document.entities);
  const entityCoverage = entityHits / Math.max(document.entities.length, 1);
  const geoHits = countMatches(corpus, document.geoSignals);
  const geoCoverage = geoHits / Math.max(document.geoSignals.length, 1);
  const citationHits = document.citations.filter((citation) => /^https?:\/\//i.test(citation)).length;
  const hasStats = extras?.claims?.length
    ? extras.claims.every((claim) => claim.source.startsWith("http"))
    : document.stats.some((stat) => /\d/.test(stat));
  const hasLists = document.lists.some((list) => list.length >= 3);

  let score = clampScore(entityCoverage * 26 + geoCoverage * 22 + Math.min(citationHits * 8, 18) + (hasStats ? 14 : 0) + (hasLists ? 12 : 0) + (extras?.claims?.length ? 8 : 0));

  if (entityCoverage < 0.45) {
    pushIssue(issues, "GEO_ENTITY_COVERAGE", "warning", "Entity names are underused.", "Repeat person, employer, and project brands next to outcomes.");
  }
  if (geoCoverage < 0.4) {
    pushIssue(issues, "GEO_LOCAL_ENTITIES", "info", "Geographic entities could be denser.", "Keep Dubai and UAE next to services and experience.");
  }
  if (!hasStats) {
    pushIssue(issues, "GEO_STATS", "warning", "Statistical proof is missing or uncited.", "Pair each metric with a live source URL.");
  }
  if (!hasLists) {
    pushIssue(issues, "GEO_STRUCTURED_LISTS", "info", "Structured lists that LLMs cite are thin.", "Keep achievements and architecture as short lists.");
  }
  if (insights?.connected && (insights.uaeShare ?? 1) < 0.15 && (insights.sessions ?? insights.impressions ?? 0) > 20) {
    score = clampScore(score - 8);
    pushIssue(issues, "GEO_LOW_UAE_SHARE", "info", "UAE share of demand is low.", "Strengthen Dubai/UAE modifiers.");
  }
  if (extras?.nap && !extras.nap.aligned) {
    score = clampScore(score - 8);
    pushIssue(issues, "GBP_NAP_DRIFT", "warning", extras.nap.issues[0] ?? "GBP NAP does not match the site.", "Align phone, Dubai locality, and site URL with the selected listing.");
  }

  return clampScore(score);
}

export function analyzeSeoDocument(
  document: SeoDocument,
  insights?: GoogleInsightSummary,
  extras: LiveAuditExtras = {},
): AiAuditMetrics {
  const issues: AiAuditIssue[] = [];
  const seoScore = scoreSeo(document, insights, extras, issues);
  const aeoScore = scoreAeo(document, insights, extras, issues);
  const geoScore = scoreGeo(document, insights, extras, issues);
  const overallScore = clampScore(seoScore * 0.38 + aeoScore * 0.32 + geoScore * 0.3);
  const serp = buildSerpPreview(document.title, document.description, `${getPublicSiteUrl()}${document.path}`);

  return {
    answerFirstScore: aeoScore,
    citationAuthority: clampScore(document.citations.filter((item) => item.startsWith("http")).length * 18),
    entityCoverage: clampScore((countMatches(`${document.title} ${document.body}`, document.entities) / Math.max(document.entities.length, 1)) * 100),
    geoReadiness: geoScore,
    aeoReadiness: aeoScore,
    seoScore,
    overallScore,
    health: healthFromScore(overallScore),
    pillars: {
      seo: { score: seoScore, health: healthFromScore(seoScore) },
      aeo: { score: aeoScore, health: healthFromScore(aeoScore) },
      geo: { score: geoScore, health: healthFromScore(geoScore) },
    },
    issues,
    recommendations: [...new Set([
      "Keep Person + ProfilePage + FAQPage + TechArticle JSON-LD in sync with visible copy.",
      "Lead every surface with name, role, Dubai/UAE, and a sourced metric.",
      ...issues.map((issue) => issue.recommendation),
    ])],
    analyzedAt: new Date().toISOString(),
    provider: "heuristic",
    target: document.target,
    focusEntity: document.focusEntity,
    insights,
    serp,
    render: extras.render,
    vitals: extras.vitals,
    indexation: extras.indexation,
    claims: extras.claims,
    schemaIssues: extras.schemaIssues,
    schemaNodes: extras.schemaNodes,
    nap: extras.nap,
    history: extras.history,
  };
}

export async function auditSeoDocument(
  document: SeoDocument,
  insights?: GoogleInsightSummary,
  extras: LiveAuditExtras = {},
  client: LlmClient | null = null,
): Promise<AiAuditMetrics> {
  const heuristic = analyzeSeoDocument(document, insights, extras);
  if (!client) {
    return heuristic;
  }

  try {
    const completion = await client.complete({
      system:
        "You are an SEO, AEO, and GEO auditor for a Dubai portfolio. Return 4-6 concise recommendations. Do not invent metrics. Prefer answer-first identity, citation-ready proof, and live GSC/CWV/GBP demand when provided.",
      user: [
        `Target: ${document.target}`,
        `Focus entity: ${document.focusEntity}`,
        `Title: ${document.title}`,
        `Scores: seo=${heuristic.seoScore} aeo=${heuristic.aeoReadiness} geo=${heuristic.geoReadiness}`,
        insights?.connected
          ? `Live insights: clicks=${insights.clicks ?? 0} impressions=${insights.impressions ?? 0} ctr=${insights.ctr ?? 0}`
          : "Live insights: not connected",
        extras.vitals ? `CWV: LCP=${extras.vitals.lcpMs ?? "n/a"} INP=${extras.vitals.inpMs ?? "n/a"}` : "",
        document.body.slice(0, 4000),
      ].join("\n\n"),
      maxTokens: 500,
    });

    const llmRecommendations = completion.text
      .split(/\n+/)
      .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
      .filter((line) => line.length > 12)
      .slice(0, 6);

    return {
      ...heuristic,
      provider: "hybrid",
      recommendations: [...new Set([...llmRecommendations, ...heuristic.recommendations])],
      llmSummary: completion.text.slice(0, 400),
    };
  } catch {
    return heuristic;
  }
}
