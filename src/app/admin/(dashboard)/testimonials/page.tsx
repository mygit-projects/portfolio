import { TestimonialsForm } from "@/components/admin/forms";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { splitPortfolio } from "@/lib/cms/sections";

export default async function AdminTestimonialsPage() {
  const { testimonials } = splitPortfolio(await getPortfolioFresh());
  return <TestimonialsForm initial={testimonials} />;
}
