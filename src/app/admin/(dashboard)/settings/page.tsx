import { SettingsForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminSettingsPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return (
    <SettingsForm
      initial={{
        site: sections.site,
        personalInfo: sections.personalInfo,
        navigation: sections.navigation,
        ctas: sections.ctas,
        footer: sections.footer,
        drivingCard: sections.drivingCard,
        cvCompetencies: sections.cvCompetencies,
      }}
    />
  );
}
