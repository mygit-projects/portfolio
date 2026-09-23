import { ProjectsForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminProjectsPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return <ProjectsForm initial={{ projects: sections.projects, sections: sections.sections }} />;
}
