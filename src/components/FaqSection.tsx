"use client";

import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export function FaqSection() {
  const { faqs, sections } = usePortfolio();
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  if (!faqs.length) {
    return null;
  }

  return (
    <section id="faqs" className="py-20 md:py-24 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5B3DE0] text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sections.faqs.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">{sections.faqs.heading}</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl">{sections.faqs.description}</p>
        </div>

        <div className="space-y-3">
          {faqs.map((item) => {
            const open = openId === item.id;
            return (
              <article key={item.id} className="rounded-2xl border border-slate-200 bg-white/90 shadow-xs overflow-hidden">
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">{item.question}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-[#5B3DE0] transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                </h3>
                {open ? <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{item.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
