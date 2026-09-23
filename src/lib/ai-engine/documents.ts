import type { Experience, FaqItem, GoogleInsightSummary, PortfolioContent, Project } from "@/content/types";

export type SeoAuditTargetKind = "homepage" | "project" | "faqs" | "experience";

export interface SeoDocument {
  target: string;
  kind: SeoAuditTargetKind;
  title: string;
  description: string;
  body: string;
  headings: Array<{ level: 1 | 2 | 3; text: string }>;
  keywords: string[];
  images: Array<{ src: string; alt: string }>;
  lists: string[][];
  faqs: FaqItem[];
  entities: string[];
  geoSignals: string[];
  citations: string[];
  stats: string[];
  path: string;
  focusEntity: string;
}

export function healthFromScore(score: number): "red" | "yellow" | "green" {
  if (score >= 80) return "green";
  if (score >= 50) return "yellow";
  return "red";
}

function unique(values: string[]): string[] {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function sharedSignals(portfolio: PortfolioContent) {
  return {
    keywords: portfolio.site.keywords,
    entities: unique([
      portfolio.personalInfo.name,
      portfolio.personalInfo.title,
      portfolio.personalInfo.location,
      ...portfolio.experience.map((item) => item.company),
      ...portfolio.projects.map((item) => item.title),
      ...portfolio.services.map((item) => item.title),
    ]),
    geoSignals: unique([
      portfolio.personalInfo.location,
      portfolio.personalInfo.locationShort,
      "Dubai",
      "United Arab Emirates",
      "UAE",
      "Pakistan",
      "Karachi",
    ]),
    citations: unique([
      ...portfolio.projects.map((project) => project.liveUrl),
      portfolio.personalInfo.socialLinks.linkedin,
      portfolio.personalInfo.socialLinks.github,
    ]),
    stats: unique([
      portfolio.personalInfo.yearsExperience,
      portfolio.personalInfo.conversionGrowth,
      portfolio.personalInfo.seoGrowth,
      portfolio.personalInfo.projectsCompleted,
      ...portfolio.hero.stats.map((stat) => `${stat.value} ${stat.label}`),
    ]),
  };
}

export function buildHomepageDocument(portfolio: PortfolioContent): SeoDocument {
  const shared = sharedSignals(portfolio);
  return {
    target: "homepage",
    kind: "homepage",
    title: portfolio.site.title,
    description: portfolio.site.description,
    body: [
      portfolio.personalInfo.bio,
      portfolio.personalInfo.tagline,
      portfolio.site.ogDescription,
      ...portfolio.faqs.map((item) => `${item.question} ${item.answer}`),
    ].join("\n\n"),
    headings: [
      { level: 1, text: portfolio.personalInfo.name },
      { level: 2, text: `${portfolio.personalInfo.headlinePrefix} ${portfolio.personalInfo.headlineAccent}` },
      { level: 2, text: portfolio.sections.projects.heading },
      { level: 2, text: portfolio.sections.services.heading },
      { level: 2, text: portfolio.sections.faqs.heading },
      ...portfolio.faqs.map((item) => ({ level: 3 as const, text: item.question })),
    ],
    keywords: shared.keywords,
    images: [{ src: portfolio.personalInfo.profileImage, alt: portfolio.personalInfo.profileImageAlt }],
    lists: [portfolio.services.map((service) => service.title), portfolio.faqs.map((item) => item.question)],
    faqs: portfolio.faqs,
    entities: shared.entities,
    geoSignals: shared.geoSignals,
    citations: shared.citations,
    stats: shared.stats,
    path: "/",
    focusEntity: `${portfolio.personalInfo.name} Web Designer Dubai`,
  };
}

export function buildProjectDocument(portfolio: PortfolioContent, project: Project): SeoDocument {
  const shared = sharedSignals(portfolio);
  const title = `${project.title} — ${project.subtitle}`.slice(0, 80);
  return {
    target: `project:${project.id}`,
    kind: "project",
    title,
    description: project.description,
    body: [
      project.description,
      project.fullCaseStudy.challenge,
      project.fullCaseStudy.solution,
      ...project.fullCaseStudy.keyAchievements,
      ...project.fullCaseStudy.architecture,
    ].join("\n\n"),
    headings: [
      { level: 1, text: project.title },
      { level: 2, text: "Challenge" },
      { level: 2, text: "Solution" },
      { level: 2, text: "Key achievements" },
      { level: 3, text: project.subtitle },
    ],
    keywords: unique([...shared.keywords, ...project.tags, project.title]),
    images: [{ src: project.image, alt: `${project.title} case study preview` }],
    lists: [project.fullCaseStudy.keyAchievements, project.fullCaseStudy.architecture, project.tags],
    faqs: [],
    entities: unique([...shared.entities, project.title, project.fullCaseStudy.client]),
    geoSignals: shared.geoSignals,
    citations: unique([...shared.citations, project.liveUrl]),
    stats: unique([...shared.stats, ...project.metrics.map((metric) => `${metric.value} ${metric.label}`)]),
    path: `/projects/${project.id}`,
    focusEntity: `${project.title} ${project.category} Dubai`,
  };
}

export function buildFaqsDocument(portfolio: PortfolioContent): SeoDocument {
  const shared = sharedSignals(portfolio);
  return {
    target: "faqs",
    kind: "faqs",
    title: portfolio.sections.faqs.heading,
    description: portfolio.sections.faqs.description,
    body: portfolio.faqs.map((item) => `${item.question}\n${item.answer}`).join("\n\n"),
    headings: [
      { level: 1, text: portfolio.sections.faqs.heading },
      ...portfolio.faqs.map((item) => ({ level: 2 as const, text: item.question })),
    ],
    keywords: shared.keywords,
    images: [],
    lists: [portfolio.faqs.map((item) => item.question)],
    faqs: portfolio.faqs,
    entities: shared.entities,
    geoSignals: shared.geoSignals,
    citations: shared.citations,
    stats: shared.stats,
    path: "/#faqs",
    focusEntity: `${portfolio.personalInfo.name} FAQ Dubai`,
  };
}

export function buildExperienceDocument(portfolio: PortfolioContent, roles: Experience[] = portfolio.experience): SeoDocument {
  const shared = sharedSignals(portfolio);
  return {
    target: "experience",
    kind: "experience",
    title: portfolio.sections.experience.heading,
    description: portfolio.sections.experience.description,
    body: roles
      .map((item) => `${item.title} at ${item.company}, ${item.location}. ${item.summary} ${item.highlights.join(" ")}`)
      .join("\n\n"),
    headings: [
      { level: 1, text: portfolio.sections.experience.heading },
      ...roles.map((item) => ({ level: 2 as const, text: `${item.title} — ${item.company}` })),
    ],
    keywords: shared.keywords,
    images: [],
    lists: roles.map((item) => item.highlights),
    faqs: [],
    entities: unique([...shared.entities, ...roles.map((item) => item.company)]),
    geoSignals: unique([...shared.geoSignals, ...roles.map((item) => item.location)]),
    citations: shared.citations,
    stats: unique([...shared.stats, ...roles.flatMap((item) => item.metrics)]),
    path: "/#experience",
    focusEntity: `${portfolio.personalInfo.name} experience Dubai UAE`,
  };
}

export function resolveSeoDocument(
  portfolio: PortfolioContent,
  target = "homepage",
): SeoDocument {
  if (target === "faqs") {
    return buildFaqsDocument(portfolio);
  }
  if (target === "experience") {
    return buildExperienceDocument(portfolio);
  }
  if (target.startsWith("project:")) {
    const id = target.slice("project:".length);
    const project = portfolio.projects.find((item) => item.id === id);
    if (project) {
      return buildProjectDocument(portfolio, project);
    }
  }
  return buildHomepageDocument(portfolio);
}

export function insightsForPath(insights: GoogleInsightSummary | undefined, path: string): GoogleInsightSummary | undefined {
  if (!insights) {
    return insights;
  }
  const pages = insights.topPages?.filter((page) => page.page.includes(path) || (path === "/" && /\/$|\/\?|#home/.test(page.page)));
  if (!pages?.length) {
    return insights;
  }
  return { ...insights, topPages: pages };
}
