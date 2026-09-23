import { HeroForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminHeroPage() {
  const { hero } = splitPortfolio(await getPortfolioFresh());
  return <HeroForm initial={hero} />;
}
