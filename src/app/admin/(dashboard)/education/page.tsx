import { EducationForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminEducationPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return (
    <EducationForm
      initial={{
        education: sections.education,
        certifications: sections.certifications,
        languages: sections.languages,
        sections: sections.sections,
      }}
    />
  );
}
