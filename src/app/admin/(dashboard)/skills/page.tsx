import { SkillsForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminSkillsPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return <SkillsForm initial={{ skills: sections.skills, sections: sections.sections }} />;
}
