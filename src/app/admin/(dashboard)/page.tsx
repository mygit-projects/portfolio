import Link from "next/link";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { SECTION_KEYS, splitPortfolio } from "@/lib/cms/sections";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const LINKS = [
  ["/admin/seo-optimizer", "SEO Engine", "SEO / AEO / GEO scores, FAQs, Google insights"],
  ["/admin/settings", "Settings", "Identity, nav, CTAs, footer"],
  ["/admin/hero", "Hero", "Stats, hanging cards, widgets"],
  ["/admin/services", "Services", "Cards and estimator"],
  ["/admin/projects", "Projects", "Case studies and images"],
  ["/admin/skills", "Skills", "Meters and tools"],
  ["/admin/process", "Process", "Delivery steps"],
  ["/admin/experience", "Experience", "Roles and sidebar"],
  ["/admin/education", "Education", "Degrees, certs, languages"],
  ["/admin/testimonials", "Testimonials", "Quotes and avatars"],
  ["/admin/contact", "Contact", "Form copy and presets"],
] as const;

export default async function AdminOverviewPage() {
  const portfolio = await getPortfolioFresh();
  const sections = splitPortfolio(portfolio);
  const configured = isSupabaseConfigured();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Content overview</h1>
        <p className="mt-1 text-sm text-slate-500">
          {configured
            ? "Connected to Supabase. Edit a section, then save to update the public site."
            : "Supabase env vars are missing, so the CMS is showing the static fallback. Add keys and run the SQL + seed scripts."}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {LINKS.map(([href, title, copy]) => (
          <Link key={href} href={href} className="rounded-3xl border border-slate-200 bg-white p-5 hover:border-[#7C5CFC]/40 hover:shadow-sm transition">
            <h2 className="font-black text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{copy}</p>
          </Link>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-black uppercase tracking-wider text-slate-500">Loaded sections</h2>
        <p className="mt-2 text-sm text-slate-600">
          {SECTION_KEYS.length} documents · {sections.projects.items.length} projects · {sections.services.length} services ·{" "}
          {sections.experience.length} roles
        </p>
      </div>
    </div>
  );
}
