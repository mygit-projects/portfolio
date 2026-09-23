import { PortfolioProvider } from "@/content/PortfolioProvider";
import { getBelowTheFoldPortfolio } from "@/content/getPortfolio";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateSiteJsonLd } from "@/lib/ai-engine/schemaManager";
import { getSiteUrl } from "@/lib/site";
import { BelowTheFoldView } from "./BelowTheFoldView";

export async function BelowTheFold() {
  const portfolio = await getBelowTheFoldPortfolio();
  const jsonLd = generateSiteJsonLd(portfolio, getSiteUrl());

  return (
    <>
      <JsonLd data={jsonLd} />
      <PortfolioProvider value={portfolio}>
        <BelowTheFoldView />
      </PortfolioProvider>
    </>
  );
}
