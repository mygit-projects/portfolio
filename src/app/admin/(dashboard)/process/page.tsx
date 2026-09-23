import { ProcessForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminProcessPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return <ProcessForm initial={{ processSteps: sections.processSteps, sections: sections.sections }} />;
}
