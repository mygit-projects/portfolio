"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export const TestimonialBanner: React.FC = () => {
  const testimonials = usePortfolio().testimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex] ?? testimonials[0];

  if (!active) {
    return null;
  }

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-md shadow-purple-500/5 overflow-hidden">
          <Quote className="absolute -top-4 -left-4 w-32 h-32 text-purple-100/40 pointer-events-none -rotate-12" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100/80 text-[#7C5CFC] flex items-center justify-center shrink-0 mt-1">
                <Quote className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 font-medium italic leading-relaxed mb-4">
                  &ldquo;{active.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  {testimonials.map((item, idx) => (
                    <button
                      key={item.author}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeIndex === idx ? "w-6 bg-[#7C5CFC]" : "w-2 bg-slate-200 hover:bg-slate-300"
                      }`}
                      aria-label={`Show testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 md:pl-8 md:border-l md:border-slate-100">
              <Image
                src={active.avatar}
                alt={active.author}
                width={56}
                height={56}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#7C5CFC]/30 shadow-md"
              />
              <div>
                <h4 className="text-base font-extrabold text-slate-900 leading-tight">{active.author}</h4>
                <p className="text-xs text-[#7C5CFC] font-semibold">{active.role}</p>
                <p className="text-[11px] text-slate-400 font-medium">{active.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
