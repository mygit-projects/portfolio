"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import Link from "next/link";
import type { SeoFieldScore, SeoHealth } from "@/content/types";
import { getFieldRole, type FieldRole, type SeoPillar } from "@/lib/ai-engine/fieldRoles";

interface SeoFieldContextValue {
  scores: SeoFieldScore[];
}

const SeoFieldContext = createContext<SeoFieldContextValue>({ scores: [] });

export function SeoFieldScoreProvider({
  children,
  initialScores = [],
}: {
  children: ReactNode;
  initialScores?: SeoFieldScore[];
}) {
  const value = useMemo(() => ({ scores: initialScores }), [initialScores]);
  return <SeoFieldContext.Provider value={value}>{children}</SeoFieldContext.Provider>;
}

function healthClass(health?: SeoHealth) {
  if (health === "green") return "bg-emerald-100 text-emerald-800";
  if (health === "yellow") return "bg-amber-100 text-amber-800";
  if (health === "red") return "bg-rose-100 text-rose-800";
  return "bg-white text-slate-500";
}

function pillarClass(pillar: SeoPillar) {
  if (pillar === "SEO") return "bg-violet-100 text-violet-800";
  if (pillar === "AEO") return "bg-indigo-100 text-indigo-800";
  return "bg-teal-100 text-teal-800";
}

const UI_ONLY: FieldRole = { role: "UI only", pillars: [] };

export function SeoFieldChips({ path }: { path?: string }) {
  const mapped = path ? getFieldRole(path) : null;
  const role = mapped ?? UI_ONLY;
  const { scores } = useContext(SeoFieldContext);
  const score = role.scorePath ? scores.find((item) => item.path === role.scorePath) : undefined;

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-200 bg-[#F4F6FB] px-2 py-1.5">
      <span className="rounded-md bg-slate-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white">
        {role.role}
      </span>
      {role.pillars.length ? (
        role.pillars.map((pillar) => (
          <span key={pillar} className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${pillarClass(pillar)}`}>
            {pillar}
          </span>
        ))
      ) : (
        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-500">
          Not scored
        </span>
      )}
      {mapped ? (
        <span className={`rounded-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${healthClass(score?.health)}`}>
          {score ? `Score ${score.health}` : "Score —"}
        </span>
      ) : null}
      <Link href="/admin/seo-optimizer" className="ml-auto text-[10px] font-black uppercase tracking-wide text-[#7C5CFC]">
        SEO engine
      </Link>
    </div>
  );
}