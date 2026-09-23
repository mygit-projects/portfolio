export {
  buildPersonSchema,
  buildTechArticleSchema as buildLegacyTechArticles,
  buildWebSiteSchema,
  generateSiteJsonLd,
} from "./schemaManager";

import type { PortfolioContent } from "@/content/types";
import { getSiteUrl } from "@/lib/site";
import { buildTechArticleSchema } from "./schemaManager";
import type { JsonLdNode } from "./types";

export function buildTechArticleSchemaList(
  portfolio: PortfolioContent,
  siteUrl = getSiteUrl(),
): JsonLdNode[] {
  return portfolio.projects.map((project) => buildTechArticleSchema(project, siteUrl));
}
