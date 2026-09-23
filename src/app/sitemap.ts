import type { MetadataRoute } from "next";
import { getPortfolio } from "@/content/getPortfolio";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const portfolio = await getPortfolio();
  const lastModified = new Date();

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/ai`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...portfolio.projects.map((project) => ({
      url: `${siteUrl}/projects/${project.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
