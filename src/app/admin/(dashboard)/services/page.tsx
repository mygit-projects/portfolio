import { ServicesForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminServicesPage() {
  const sections = splitPortfolio(await getPortfolioFresh());
  return (
    <ServicesForm
      initial={{
        services: sections.services,
        estimator: sections.estimator,
        sections: sections.sections,
      }}
    />
  );
}
