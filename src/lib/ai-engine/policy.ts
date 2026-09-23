import type { PortfolioContent } from "@/content/types";
import type { SeoOptimizePatch } from "./optimize";

export type EngineMode = "suggest" | "auto-safe";

export type PolicyLane = "auto-safe" | "queued" | "never-auto" | "pinned";

export interface PolicyRejection {
  path: string;
  reason: string;
  lane: PolicyLane;
}

export interface SplitOptimizeResult {
  applied: SeoOptimizePatch;
  queued: SeoOptimizePatch;
  rejected: PolicyRejection[];
}

const AUTO_SITE_KEYS = ["title", "description", "ogTitle", "ogDescription", "keywords"] as const;
const QUEUED_PERSONAL_KEYS = ["bio", "tagline"] as const;
const AUTO_PERSONAL_KEYS = ["profileImageAlt"] as const;
const NEVER_PERSONAL_KEYS = [
  "name",
  "yearsExperience",
  "conversionGrowth",
  "seoGrowth",
  "projectsCompleted",
  "phone",
  "whatsapp",
  "email",
  "location",
  "locationShort",
] as const;

export const NEVER_AUTO_PATHS = [
  "personalInfo.name",
  "personalInfo.yearsExperience",
  "personalInfo.conversionGrowth",
  "personalInfo.seoGrowth",
  "personalInfo.phone",
  "personalInfo.whatsapp",
  "personalInfo.email",
  "personalInfo.location",
  "heading.level",
  "schema.types",
] as const;

export function isPinned(pins: Iterable<string>, path: string): boolean {
  const set = pins instanceof Set ? pins : new Set(pins);
  return set.has(path);
}

function emptyPatch(): SeoOptimizePatch {
  return {};
}

export function splitOptimizePatch(
  patch: SeoOptimizePatch,
  pins: Iterable<string>,
  mode: EngineMode,
  portfolio: PortfolioContent,
): SplitOptimizeResult {
  const pinSet = pins instanceof Set ? pins : new Set(pins);
  const applied = emptyPatch();
  const queued = emptyPatch();
  const rejected: PolicyRejection[] = [];

  const route = (lane: PolicyLane, path: string, onApplied: () => void, onQueued: () => void) => {
    if (pinSet.has(path)) {
      rejected.push({ path, reason: "Pinned by a manual edit.", lane: "pinned" });
      return;
    }
    if (lane === "never-auto") {
      rejected.push({ path, reason: "Identity or fact field is locked.", lane: "never-auto" });
      return;
    }
    if (lane === "queued" || mode === "suggest") {
      onQueued();
      return;
    }
    onApplied();
  };

  if (patch.site) {
    const appliedSite: NonNullable<SeoOptimizePatch["site"]> = {};
    const queuedSite: NonNullable<SeoOptimizePatch["site"]> = {};
    for (const key of AUTO_SITE_KEYS) {
      if (patch.site[key] === undefined) continue;
      route(
        "auto-safe",
        `site.${key}`,
        () => {
          (appliedSite as Record<string, unknown>)[key] = patch.site?.[key];
        },
        () => {
          (queuedSite as Record<string, unknown>)[key] = patch.site?.[key];
        },
      );
    }
    if (Object.keys(appliedSite).length) applied.site = appliedSite;
    if (Object.keys(queuedSite).length) queued.site = queuedSite;
  }

  if (patch.personalInfo) {
    const appliedInfo: NonNullable<SeoOptimizePatch["personalInfo"]> = {};
    const queuedInfo: NonNullable<SeoOptimizePatch["personalInfo"]> = {};
    for (const key of NEVER_PERSONAL_KEYS) {
      if ((patch.personalInfo as Record<string, unknown>)[key] !== undefined) {
        rejected.push({ path: `personalInfo.${key}`, reason: "Identity or fact field is locked.", lane: "never-auto" });
      }
    }
    for (const key of AUTO_PERSONAL_KEYS) {
      if (patch.personalInfo[key] === undefined) continue;
      route(
        "auto-safe",
        `personalInfo.${key}`,
        () => {
          appliedInfo[key] = patch.personalInfo?.[key];
        },
        () => {
          queuedInfo[key] = patch.personalInfo?.[key];
        },
      );
    }
    for (const key of QUEUED_PERSONAL_KEYS) {
      if (patch.personalInfo[key] === undefined) continue;
      route(
        "queued",
        `personalInfo.${key}`,
        () => {
          appliedInfo[key] = patch.personalInfo?.[key];
        },
        () => {
          queuedInfo[key] = patch.personalInfo?.[key];
        },
      );
    }
    if (Object.keys(appliedInfo).length) applied.personalInfo = appliedInfo;
    if (Object.keys(queuedInfo).length) queued.personalInfo = queuedInfo;
  }

  if (patch.faqs) {
    const appliedFaqs: NonNullable<SeoOptimizePatch["faqs"]> = [];
    const queuedFaqs: NonNullable<SeoOptimizePatch["faqs"]> = [];
    for (const item of patch.faqs) {
      const current = portfolio.faqs.find((faq) => faq.id === item.id);
      const answerPath = `faqs.${item.id}.answer`;
      const questionPath = `faqs.${item.id}.question`;
      const existingSameQuestion = Boolean(current && current.question === item.question);
      if (!current) {
        route("queued", `faqs.${item.id}`, () => queuedFaqs.push(item), () => queuedFaqs.push(item));
        continue;
      }
      if (!existingSameQuestion) {
        route("queued", questionPath, () => queuedFaqs.push(item), () => queuedFaqs.push(item));
        continue;
      }
      if (pinSet.has(answerPath)) {
        rejected.push({ path: answerPath, reason: "Pinned by a manual edit.", lane: "pinned" });
        continue;
      }
      route(
        "auto-safe",
        answerPath,
        () => appliedFaqs.push({ id: item.id, question: current.question, answer: item.answer }),
        () => queuedFaqs.push({ id: item.id, question: current.question, answer: item.answer }),
      );
    }
    if (appliedFaqs.length) applied.faqs = appliedFaqs;
    if (queuedFaqs.length) queued.faqs = queuedFaqs;
  }

  if (patch.project) {
    const id = patch.project.id;
    const queuedProject: NonNullable<SeoOptimizePatch["project"]> = { id };
    let any = false;
    for (const key of ["subtitle", "description", "keyAchievements", "architecture"] as const) {
      if (patch.project[key] === undefined) continue;
      const path = `projects.${id}.${key}`;
      if (pinSet.has(path)) {
        rejected.push({ path, reason: "Pinned by a manual edit.", lane: "pinned" });
        continue;
      }
      (queuedProject as Record<string, unknown>)[key] = patch.project[key];
      any = true;
    }
    if (any) queued.project = queuedProject;
  }

  if (patch.experience) {
    const queuedRoles: NonNullable<SeoOptimizePatch["experience"]> = [];
    for (const role of patch.experience) {
      const next: NonNullable<SeoOptimizePatch["experience"]>[number] = { id: role.id };
      let any = false;
      for (const key of ["summary", "highlights"] as const) {
        if (role[key] === undefined) continue;
        const path = `experience.${role.id}.${key}`;
        if (pinSet.has(path)) {
          rejected.push({ path, reason: "Pinned by a manual edit.", lane: "pinned" });
          continue;
        }
        (next as Record<string, unknown>)[key] = role[key];
        any = true;
      }
      if (any) queuedRoles.push(next);
    }
    if (queuedRoles.length) queued.experience = queuedRoles;
  }

  return { applied, queued, rejected };
}

export function patchHasChanges(patch: SeoOptimizePatch): boolean {
  return Boolean(patch.site || patch.personalInfo || patch.faqs || patch.project || patch.experience);
}

export function policyPathsFromSections(payload: {
  site?: { title?: string; description?: string; ogTitle?: string; ogDescription?: string; keywords?: string[] };
  personalInfo?: { bio?: string; tagline?: string; profileImageAlt?: string };
  faqs?: Array<{ id: string }>;
  projects?: { items?: Array<{ id: string }> };
  experience?: Array<{ id: string }>;
}): string[] {
  const paths: string[] = [];
  if (payload.site) {
    for (const key of AUTO_SITE_KEYS) paths.push(`site.${key}`);
  }
  if (payload.personalInfo) {
    paths.push("personalInfo.profileImageAlt", "personalInfo.bio", "personalInfo.tagline");
  }
  if (payload.faqs) {
    for (const item of payload.faqs) {
      paths.push(`faqs.${item.id}.answer`, `faqs.${item.id}.question`);
    }
  }
  if (payload.projects?.items) {
    for (const item of payload.projects.items) {
      paths.push(
        `projects.${item.id}.subtitle`,
        `projects.${item.id}.description`,
        `projects.${item.id}.keyAchievements`,
        `projects.${item.id}.architecture`,
      );
    }
  }
  if (payload.experience) {
    for (const role of payload.experience) {
      paths.push(`experience.${role.id}.summary`, `experience.${role.id}.highlights`);
    }
  }
  return paths;
}

export function policyPathsFromPatch(patch: SeoOptimizePatch): string[] {
  const paths: string[] = [];
  if (patch.site) {
    for (const key of AUTO_SITE_KEYS) {
      if (patch.site[key] !== undefined) paths.push(`site.${key}`);
    }
  }
  if (patch.personalInfo) {
    if (patch.personalInfo.profileImageAlt !== undefined) paths.push("personalInfo.profileImageAlt");
    if (patch.personalInfo.bio !== undefined) paths.push("personalInfo.bio");
    if (patch.personalInfo.tagline !== undefined) paths.push("personalInfo.tagline");
  }
  if (patch.faqs) {
    for (const item of patch.faqs) {
      paths.push(`faqs.${item.id}.answer`, `faqs.${item.id}.question`);
    }
  }
  if (patch.project) {
    for (const key of ["subtitle", "description", "keyAchievements", "architecture"] as const) {
      if (patch.project[key] !== undefined) paths.push(`projects.${patch.project.id}.${key}`);
    }
  }
  if (patch.experience) {
    for (const role of patch.experience) {
      if (role.summary !== undefined) paths.push(`experience.${role.id}.summary`);
      if (role.highlights !== undefined) paths.push(`experience.${role.id}.highlights`);
    }
  }
  return paths;
}