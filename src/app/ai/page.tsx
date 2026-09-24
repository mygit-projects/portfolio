import type { Metadata } from "next";
import Link from "next/link";
import { getPortfolio } from "@/content/getPortfolio";
import { buildCitationClaims } from "@/lib/ai-engine/claims";
import { getPublicSiteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio();
  return {
    title: `${portfolio.personalInfo.name} — AI citation profile`,
    description: portfolio.personalInfo.bio.slice(0, 160),
    alternates: { canonical: `${getPublicSiteUrl()}/ai` },
    robots: { index: true, follow: true },
  };
}

export default async function AiCitationPage() {
  const portfolio = await getPortfolio();
  const claims = buildCitationClaims(portfolio);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-slate-800">
      <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C5CFC]">Citation pack</p>
      <h1 className="mt-3 text-4xl font-black text-slate-900">{portfolio.personalInfo.name}</h1>
      <p className="mt-3 text-base leading-relaxed text-slate-600">{portfolio.personalInfo.bio}</p>
      <dl className="mt-8 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-[11px] font-bold uppercase text-slate-400">Role</dt>
          <dd className="font-bold">{portfolio.personalInfo.title}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-[11px] font-bold uppercase text-slate-400">Location</dt>
          <dd className="font-bold">{portfolio.personalInfo.location}</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-[11px] font-bold uppercase text-slate-400">Experience</dt>
          <dd className="font-bold">{portfolio.personalInfo.yearsExperience} years</dd>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <dt className="text-[11px] font-bold uppercase text-slate-400">Contact</dt>
          <dd className="font-bold">{portfolio.personalInfo.email}</dd>
        </div>
      </dl>

      <h2 className="mt-12 text-2xl font-black">Sourced claims</h2>
      <ul className="mt-4 space-y-3">
        {claims.map((claim) => (
          <li key={claim.claim} className="rounded-2xl border border-slate-200 p-4 text-sm">
            <p className="font-bold text-slate-900">{claim.claim}</p>
            <p className="mt-1 text-slate-500">
              Metric: {claim.metric} · <a className="text-[#7C5CFC]" href={claim.source}>{claim.source}</a> · {claim.date}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm">
        Machine-readable version: <Link className="font-bold text-[#7C5CFC]" href="/llms.txt">/llms.txt</Link>
      </p>
    </main>
  );
}
