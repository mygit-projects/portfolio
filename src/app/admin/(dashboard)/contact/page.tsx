import { ContactForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminContactPage() {
  const { contact } = splitPortfolio(await getPortfolioFresh());
  return <ContactForm initial={contact} />;
}
