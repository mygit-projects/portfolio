import { PortfolioProvider } from "@/content/PortfolioProvider";
import { getAboveTheFoldPortfolio } from "@/content/getPortfolio";
import { AboveTheFoldView } from "./AboveTheFoldView";

export async function AboveTheFold() {
  const portfolio = await getAboveTheFoldPortfolio();

  return (
    <PortfolioProvider value={portfolio}>
      <AboveTheFoldView />
    </PortfolioProvider>
  );
}
