import { z } from "zod";
import type { GoogleInsightSummary, PortfolioContent } from "@/content/types";
import { allowedMetrics, patchInventedMetrics } from "./claims";
import type { SeoDocument } from "./documents";
import { extractJsonObject, resolveLlmClient } from "./llmClient";
import type { LlmProvider } from "./types";

export const seoOptimizePatchSchema = z.object({
  site: z
    .object({
      title: z.string().min(8).max(70).optional(),
      description: z.string().min(50).max(220).optional(),
      ogTitle: z.string().min(8).max(80).optional(),
      ogDescription: z.string().min(50).max(220).optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
  personalInfo: z
    .object({
      bio: z.string().min(40).max(800).optional(),
      tagline: z.string().min(12).max(220).optional(),
      profileImageAlt: z.string().min(8).max(160).optional(),
    })
    .optional(),
  project: z
    .object({
      id: z.string(),
      subtitle: z.string().min(8).max(160).optional(),
      description: z.string().min(40).max(600).optional(),
      keyAchievements: z.array(z.string()).optional(),
      architecture: z.array(z.string()).optional(),
    })
    .optional(),
  faqs: z
    .array(
      z.object({
        id: z.string(),
        question: z.string().min(8).max(180),
        answer: z.string().min(20).max(600),
      }),
    )
    .optional(),
  experience: z
    .array(
      z.object({
        id: z.string(),
        summary: z.string().min(20).max(500).optional(),
        highlights: z.array(z.string()).optional(),
      }),
    )
    .optional(),
});

export type SeoOptimizePatch = z.infer<typeof seoOptimizePatchSchema>;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : null;
}

function clipString(value: unknown, min: number, max: number): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length < min) return undefined;
  return trimmed.length > max ? trimmed.slice(0, max).trim() : trimmed;
}

function clipList(value: unknown, maxItems = 12, maxLen = 180): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length >= 2)
    .map((item) => (item.length > maxLen ? item.slice(0, maxLen).trim() : item))
    .slice(0, maxItems);
  return items.length ? items : undefined;
}

function unwrapPatch(raw: unknown): Record<string, unknown> | null {
  const root = asRecord(raw);
  if (!root) return null;
  const nested = root.patch ?? root.data ?? root.result ?? root.optimization;
  return asRecord(nested) ?? root;
}

function compact<T extends Record<string, unknown>>(value: T): T | undefined {
  const next = Object.fromEntries(Object.entries(value).filter(([, item]) => item !== undefined)) as T;
  return Object.keys(next).length ? next : undefined;
}

export function sanitizeOptimizePatch(raw: unknown, portfolio: PortfolioContent, document: SeoDocument): unknown {
  const root = unwrapPatch(raw);
  if (!root) return {};

  const siteRaw = asRecord(root.site);
  const site = siteRaw
    ? compact({
        title: clipString(siteRaw.title, 8, 70),
        description: clipString(siteRaw.description, 50, 220),
        ogTitle: clipString(siteRaw.ogTitle, 8, 80),
        ogDescription: clipString(siteRaw.ogDescription, 50, 220),
        keywords: clipList(siteRaw.keywords, 16, 48),
      })
    : undefined;

  const infoRaw = asRecord(root.personalInfo);
  const personalInfo = infoRaw
    ? compact({
        bio: clipString(infoRaw.bio, 40, 800),
        tagline: clipString(infoRaw.tagline, 12, 220),
        profileImageAlt: clipString(infoRaw.profileImageAlt, 8, 160),
      })
    : undefined;

  const fallbackProjectId =
    document.kind === "project" ? document.target.replace(/^project:/, "") : portfolio.projects[0]?.id;
  const projectRaw = asRecord(root.project);
  const projectId = clipString(projectRaw?.id, 1, 80) ?? fallbackProjectId;
  const project =
    projectRaw && projectId
      ? compact({
          id: projectId,
          subtitle: clipString(projectRaw.subtitle, 8, 160),
          description: clipString(projectRaw.description, 40, 600),
          keyAchievements: clipList(projectRaw.keyAchievements, 8, 180),
          architecture: clipList(projectRaw.architecture, 8, 180),
        })
      : undefined;

  const faqs = Array.isArray(root.faqs)
    ? root.faqs
        .map((item) => {
          const row = asRecord(item);
          if (!row) return null;
          const id = clipString(row.id, 1, 80);
          const question = clipString(row.question, 8, 180);
          const answer = clipString(row.answer, 20, 600);
          if (!id || !question || !answer) return null;
          return { id, question, answer };
        })
        .filter((item): item is { id: string; question: string; answer: string } => Boolean(item))
        .slice(0, 12)
    : undefined;

  const experience = Array.isArray(root.experience)
    ? root.experience
        .map((item) => {
          const row = asRecord(item);
          if (!row) return null;
          const id = clipString(row.id, 1, 80);
          if (!id) return null;
          return compact({
            id,
            summary: clipString(row.summary, 20, 500),
            highlights: clipList(row.highlights, 8, 180),
          });
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item) && Object.keys(item).length > 1)
        .slice(0, 8)
    : undefined;

  return compact({
    site,
    personalInfo,
    project: project && Object.keys(project).length > 1 ? project : undefined,
    faqs: faqs?.length ? faqs : undefined,
    experience: experience?.length ? experience : undefined,
  }) ?? {};
}

function parseOptimizePatch(text: string, portfolio: PortfolioContent, document: SeoDocument) {
  const sanitized = sanitizeOptimizePatch(extractJsonObject(text), portfolio, document);
  return seoOptimizePatchSchema.safeParse(sanitized);
}

function schemaErrorMessage(error: z.ZodError): string {
  return error.issues
    .slice(0, 3)
    .map((issue) => `${issue.path.join(".") || "patch"}: ${issue.message}`)
    .join(" ");
}

function hasPatchFields(patch: SeoOptimizePatch): boolean {
  return Boolean(patch.site || patch.personalInfo || patch.faqs?.length || patch.project || patch.experience?.length);
}

export async function generateOptimizePatch(
  portfolio: PortfolioContent,
  document: SeoDocument,
  insights?: GoogleInsightSummary,
  preferred?: LlmProvider | "",
): Promise<SeoOptimizePatch> {
  const client = resolveLlmClient(preferred);
  if (!client) {
    throw new Error("Add GEMINI_API_KEY to .env.local and restart the dev server.");
  }

  const system = [
    "You rewrite portfolio CMS fields for SEO, AEO, and GEO.",
    "Return a JSON object only. Allowed top-level keys: site, personalInfo, project, faqs, experience.",
    "site keys: title (<=70 chars), description (80-160 chars), ogTitle, ogDescription, keywords.",
    "personalInfo keys: bio, tagline, profileImageAlt. Do not include name, years, phone, or metrics.",
    "Keep Muhammad Faizan, Dubai, UAE, and 15+ years facts. Do not invent clients or metrics.",
    `Only reuse these existing metrics: ${allowedMetrics(portfolio).join(", ")}.`,
    "Keep existing ids on faqs, project, and experience. Omit a field rather than guess.",
  ].join(" ");

  const payload = {
    target: document.target,
    current: {
      title: document.title,
      description: document.description,
      body: document.body.slice(0, 4000),
      faqs: portfolio.faqs.map((faq) => ({ id: faq.id, question: faq.question, answer: faq.answer })),
      project: document.kind === "project" ? portfolio.projects.find((item) => document.target.endsWith(item.id)) : null,
      site: portfolio.site,
      personalInfo: {
        bio: portfolio.personalInfo.bio,
        tagline: portfolio.personalInfo.tagline,
        profileImageAlt: portfolio.personalInfo.profileImageAlt,
      },
    },
    insights,
  };

  const first = await client.complete({
    system,
    user: JSON.stringify(payload),
    maxTokens: 2500,
    json: true,
  });

  let parsed = parseOptimizePatch(first.text, portfolio, document);
  if (!parsed.success || !hasPatchFields(parsed.data)) {
    const repair = await client.complete({
      system: "Return only a valid JSON object with keys site, personalInfo, project, faqs, experience. No markdown.",
      user: JSON.stringify({
        error: parsed.success ? "Previous JSON had no usable fields." : schemaErrorMessage(parsed.error),
        previous: first.text.slice(0, 4000),
        required: {
          site: { title: "8-70 chars", description: "80-160 chars" },
          faqs: [{ id: "existing id", question: "string", answer: "string" }],
        },
      }),
      maxTokens: 2500,
      json: true,
    });
    parsed = parseOptimizePatch(repair.text, portfolio, document);
  }

  if (!parsed.success) {
    throw new Error(`The model returned an invalid optimization patch. ${schemaErrorMessage(parsed.error)}`);
  }
  if (!hasPatchFields(parsed.data)) {
    throw new Error("Gemini returned no usable SEO fields.");
  }

  const invented = patchInventedMetrics(JSON.stringify(parsed.data), allowedMetrics(portfolio));
  if (invented.length) {
    throw new Error(`Optimize refused invented metrics: ${invented.join(", ")}.`);
  }
  return parsed.data;
}

export function applyOptimizePatch(portfolio: PortfolioContent, patch: SeoOptimizePatch): Partial<{
  site: PortfolioContent["site"];
  personalInfo: PortfolioContent["personalInfo"];
  projects: { items: PortfolioContent["projects"]; categories: PortfolioContent["projectCategories"] };
  faqs: PortfolioContent["faqs"];
  experience: PortfolioContent["experience"];
}> {
  const next: ReturnType<typeof applyOptimizePatch> = {};

  if (patch.site) {
    next.site = { ...portfolio.site, ...patch.site };
  }
  if (patch.personalInfo) {
    next.personalInfo = { ...portfolio.personalInfo, ...patch.personalInfo };
  }
  if (patch.faqs) {
    const byId = new Map(patch.faqs.map((item) => [item.id, item]));
    next.faqs = portfolio.faqs.map((faq) => {
      const update = byId.get(faq.id);
      return update ? { ...faq, question: update.question, answer: update.answer } : faq;
    });
    const existing = new Set(portfolio.faqs.map((faq) => faq.id));
    next.faqs = [...next.faqs, ...patch.faqs.filter((item) => !existing.has(item.id))];
  }
  if (patch.project) {
    next.projects = {
      items: portfolio.projects.map((project) =>
        project.id === patch.project?.id
          ? {
              ...project,
              subtitle: patch.project.subtitle ?? project.subtitle,
              description: patch.project.description ?? project.description,
              fullCaseStudy: {
                ...project.fullCaseStudy,
                keyAchievements: patch.project.keyAchievements ?? project.fullCaseStudy.keyAchievements,
                architecture: patch.project.architecture ?? project.fullCaseStudy.architecture,
              },
            }
          : project,
      ),
      categories: portfolio.projectCategories,
    };
  }
  if (patch.experience) {
    next.experience = portfolio.experience.map((role) => {
      const update = patch.experience?.find((item) => item.id === role.id);
      if (!update) return role;
      return {
        ...role,
        summary: update.summary ?? role.summary,
        highlights: update.highlights ?? role.highlights,
      };
    });
  }

  return next;
}
