import { SitemapManager } from "@/components/admin/SitemapManager";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { buildSitemapEntries, getSitemapPublicUrl, getSitemapSnapshot } from "@/lib/cms/sitemap";

export default async function AdminSitemapPage() {
  const snapshot = await getSitemapSnapshot();
  const entries = snapshot?.entries ?? buildSitemapEntries(await getPortfolioFresh());

  return (
    <SitemapManager
      url={getSitemapPublicUrl()}
      generatedAt={snapshot?.generatedAt ?? null}
      entries={entries}
    />
  );
}
