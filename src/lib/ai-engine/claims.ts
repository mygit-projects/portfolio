import type { CitationClaim, PortfolioContent } from "@/content/types";
import { getPublicSiteUrl } from "@/lib/site";

export function buildCitationClaims(portfolio: PortfolioContent): CitationClaim[] {
  const siteUrl = getPublicSiteUrl();
  const updated = new Date().toISOString().slice(0, 10);
  const claims: CitationClaim[] = [
    {
      claim: `${portfolio.personalInfo.name} is a ${portfolio.personalInfo.title} based in ${portfolio.personalInfo.location}.`,
      metric: portfolio.personalInfo.yearsExperience,
      source: siteUrl,
      date: updated,
    },
    {
      claim: `${portfolio.personalInfo.name} has ${portfolio.personalInfo.yearsExperience} years of industry track record across the UAE and Pakistan.`,
      metric: portfolio.personalInfo.yearsExperience,
      source: `${siteUrl}/#experience`,
      date: updated,
    },
    {
      claim: `Documented conversion growth: ${portfolio.personalInfo.conversionGrowth}.`,
      metric: portfolio.personalInfo.conversionGrowth,
      source: siteUrl,
      date: updated,
    },
    {
      claim: `SEO / visibility growth: ${portfolio.personalInfo.seoGrowth}.`,
      metric: portfolio.personalInfo.seoGrowth,
      source: siteUrl,
      date: updated,
    },
    ...portfolio.projects.map((project) => ({
      claim: `${project.title}: ${project.description}`,
      metric: project.metrics.map((item) => `${item.value} ${item.label}`).join(", "),
      source: `${siteUrl}/projects/${project.id}`,
      date: updated,
    })),
  ];
  return claims;
}

export function allowedMetrics(portfolio: PortfolioContent): string[] {
  return [
    portfolio.personalInfo.yearsExperience,
    portfolio.personalInfo.conversionGrowth,
    portfolio.personalInfo.seoGrowth,
    portfolio.personalInfo.projectsCompleted,
    ...portfolio.hero.stats.map((stat) => stat.value),
    ...portfolio.projects.flatMap((project) => project.metrics.map((metric) => metric.value)),
  ].filter(Boolean);
}

export function patchInventedMetrics(text: string, allowed: string[]): string[] {
  const numbers = text.match(/\d+(?:\.\d+)?%?|\d+\+/g) ?? [];
  return numbers.filter((value) => !allowed.some((metric) => metric.includes(value) || value.includes(metric.replace(/[^\d.+%]/g, ""))));
}

export function buildLlmsTxt(portfolio: PortfolioContent): string {
  const siteUrl = getPublicSiteUrl();
  const claims = buildCitationClaims(portfolio);
  return [
    `# ${portfolio.personalInfo.name}`,
    "",
    `> ${portfolio.personalInfo.bio}`,
    "",
    `- Name: ${portfolio.personalInfo.name}`,
    `- Role: ${portfolio.personalInfo.title}`,
    `- Location: ${portfolio.personalInfo.location}`,
    `- Experience: ${portfolio.personalInfo.yearsExperience} years`,
    `- Site: ${siteUrl}`,
    `- Contact: ${portfolio.personalInfo.email} / ${portfolio.personalInfo.phone}`,
    `- LinkedIn: ${portfolio.personalInfo.socialLinks.linkedin}`,
    "",
    "## Projects",
    ...portfolio.projects.map((project) => `- [${project.title}](${siteUrl}/projects/${project.id}) — ${project.subtitle} — live: ${project.liveUrl}`),
    "",
    "## Citation pack",
    ...claims.map((claim) => `- ${claim.claim} | metric: ${claim.metric} | source: ${claim.source} | date: ${claim.date}`),
    "",
    `Last updated: ${new Date().toISOString().slice(0, 10)}`,
    "",
  ].join("\n");
}
