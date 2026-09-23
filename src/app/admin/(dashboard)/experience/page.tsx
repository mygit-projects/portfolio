import { ExperienceForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminExperiencePage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return (
    <ExperienceForm
      initial={{
        experience: sections.experience,
        careerSidebar: sections.careerSidebar,
        sections: sections.sections,
      }}
    />
  );
}
