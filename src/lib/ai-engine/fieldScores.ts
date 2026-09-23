import type { AiAuditMetrics, SeoFieldScore, SeoHeadingRow } from "@/content/types";

const ISSUE_FIELDS: Array<{ codes: string[]; path: string; label: string }> = [
  { codes: ["SEO_TITLE_PIXELS", "SEO_FOCUS_ENTITY", "SEO_RENDER_TITLE_DRIFT"], path: "site.title", label: "SEO title" },
  { codes: ["SEO_META_PIXELS"], path: "site.description", label: "Meta description" },
  { codes: ["SEO_IMAGE_ALT"], path: "personalInfo.profileImageAlt", label: "Profile image alt" },
  { codes: ["SEO_HEADING_HIERARCHY"], path: "outline", label: "Heading outline" },
  { codes: ["AEO_FAQ_BLOCKS", "GSC_QUESTION_GAP"], path: "faqs", label: "FAQs" },
  { codes: ["AEO_ANSWER_FIRST", "AEO_DEFINITION"], path: "personalInfo.bio", label: "Opening copy" },
  { codes: ["AEO_SCHEMA_INVALID"], path: "schema", label: "Schema" },
  { codes: ["GBP_NAP_DRIFT"], path: "nap", label: "NAP / GBP" },
  { codes: ["GEO_ENTITY_COVERAGE", "GEO_LOCAL_ENTITIES"], path: "entities", label: "Entity / GEO" },
  { codes: ["CWV_LCP", "CWV_INP", "CWV_CLS"], path: "vitals", label: "Core Web Vitals" },
];

export function fieldScoresFromMetrics(metrics: AiAuditMetrics): SeoFieldScore[] {
  return ISSUE_FIELDS.map((field) => {
    const issues = metrics.issues.filter((issue) => field.codes.includes(issue.code));
    const health = issues.some((issue) => issue.severity === "critical")
      ? "red"
      : issues.some((issue) => issue.severity === "warning")
        ? "yellow"
        : "green";
    return {
      path: field.path,
      label: field.label,
      health,
      issues: issues.map((issue) => issue.message),
    };
  });
}

export function headingOutlineFromMetrics(metrics: AiAuditMetrics): SeoHeadingRow[] {
  const headings = metrics.render?.headings.length
    ? metrics.render.headings
    : [];
  return headings.map((heading) => ({
    level: heading.level,
    text: heading.text,
    role: heading.level === 1 ? "page-h1" : heading.level === 2 ? "section-h2" : "card-h3",
  }));
}