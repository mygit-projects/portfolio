import type { PortfolioContent } from "@/content/types";
import { buildCitationClaims } from "./claims";
import type { SeoDocument } from "./documents";
import { inspectIndexedUrl } from "./google/gscInspect";
import { getGoogleIntegration, getValidGoogleAccessToken } from "./google/snapshots";
import type { GoogleInsightSummary } from "@/content/types";
import { checkNapAlignment } from "./napCheck";
import { fetchRenderedAudit } from "./renderAudit";
import { getScoreHistory } from "./scoreHistory";
import { generateProjectJsonLd, generateSiteJsonLd } from "./schemaManager";
import { validateJsonLdGraph } from "./schemaValidator";
import type { LiveAuditExtras } from "./seoAnalyzer";
import { getSiteUrl } from "@/lib/site";
import { fetchCoreWebVitals } from "./vitalsClient";

export async function collectLiveAuditExtras(
  portfolio: PortfolioContent,
  document: SeoDocument,
  insights: GoogleInsightSummary,
  options: { live: boolean },
): Promise<LiveAuditExtras> {
  const siteUrl = getSiteUrl();
  const project =
    document.kind === "project"
      ? portfolio.projects.find((item) => document.target.endsWith(item.id)) ?? portfolio.projects[0]
      : undefined;
  const graph =
    document.kind === "project" && project
      ? generateProjectJsonLd(portfolio, project, siteUrl)
      : generateSiteJsonLd(portfolio, siteUrl);

  const extras: LiveAuditExtras = {
    claims: buildCitationClaims(portfolio),
    schemaIssues: validateJsonLdGraph(graph),
    schemaNodes: graph["@graph"].map((node) => ({
      type: Array.isArray(node["@type"]) ? node["@type"].map(String).join(",") : String(node["@type"] ?? "Node"),
      id: typeof node["@id"] === "string" ? node["@id"] : undefined,
    })),
    nap: checkNapAlignment(portfolio, {
      title: insights.gbpTitle,
      address: insights.gbpAddress,
      reviewCount: insights.gbpReviewCount,
    }),
    history: await getScoreHistory(document.target),
  };

  if (!options.live) {
    extras.render = {
      fetched: false,
      h1: document.headings.filter((heading) => heading.level === 1).map((heading) => heading.text),
      headings: document.headings,
      imageAlts: document.images.map((image) => image.alt),
      missingAlt: document.images.filter((image) => !image.alt.trim()).length,
      jsonLdTypes: extras.schemaNodes?.map((node) => node.type) ?? [],
    };
    return extras;
  }

  const publicPath = document.path.startsWith("/#") ? "/" : document.path;
  const [render, vitals, integration, token] = await Promise.all([
    fetchRenderedAudit(publicPath),
    fetchCoreWebVitals(`${siteUrl}${publicPath}`),
    getGoogleIntegration(),
    getValidGoogleAccessToken(),
  ]);
  extras.render = render;
  extras.vitals = vitals;
  if (integration?.gsc_site_url && token) {
    const urls = [siteUrl, ...portfolio.projects.map((project) => `${siteUrl}/projects/${project.id}`)];
    extras.indexation = await Promise.all(
      urls.map((url) => inspectIndexedUrl(token, integration.gsc_site_url as string, url)),
    );
  }

  return extras;
}
