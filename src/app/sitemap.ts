import type { MetadataRoute } from "next";
import { getPortfolio } from "@/content/getPortfolio";
import { buildSitemapEntries, getSitemapSnapshot, toMetadataSitemap } from "@/lib/cms/sitemap";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const snapshot = await getSitemapSnapshot();
  if (snapshot?.entries.length) {
    return toMetadataSitemap(snapshot.entries);
  }

  return toMetadataSitemap(buildSitemapEntries(await getPortfolio()));
}
