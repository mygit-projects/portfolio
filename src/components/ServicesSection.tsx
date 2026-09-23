"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Layout,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Clock,
  Zap,
  Check,
} from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import { resolveIcon, serviceIcons } from "@/lib/icons";

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const { services, estimatorOptions, estimatorDefaults, sections, ctas } = usePortfolio();
  const [selectedAddons, setSelectedAddons] = useState<string[]>(estimatorDefaults);
  const [showEstimator, setShowEstimator] = useState(false);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const calculatedDays = selectedAddons.reduce((acc, id) => {
    const item = estimatorOptions.find((opt) => opt.id === id);
    return acc + (item ? item.days : 0);
  }, 0);

  return (
    <section id="services" className="py-20 md:py-28 bg-[#F3F5FC]/70 border-y border-slate-200/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7C5CFC] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sections.services.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {sections.services.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">
              {sections.services.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEstimator(!showEstimator)}
              className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-[#7C5CFC]" />
              <span>{showEstimator ? "Hide Timeline Estimator" : "Scope & Timeline Calculator"}</span>
            </button>

            <button
              onClick={onOpenContact}
              className="px-4 py-2.5 rounded-2xl bg-[#7C5CFC] hover:bg-[#6842F5] text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{ctas.directInquiry}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showEstimator && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl shadow-purple-500/5 relative">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 mb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-extrabold text-[#7C5CFC] uppercase tracking-wider mb-1">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Interactive Project Scope Simulator</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900">Customize Your Project Requirements</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Select target modules to estimate project turnaround and deliverables with AI-accelerated velocity.
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-purple-50/80 p-3.5 rounded-2xl border border-purple-100">
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Turnaround</div>
                      <div className="text-2xl font-black text-[#7C5CFC]">
                        {calculatedDays > 0 ? `${calculatedDays}–${calculatedDays + 3} Working Days` : "Select modules"}
                      </div>
                    </div>
                    <button
                      onClick={onOpenContact}
                      className="px-4 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#6842F5] text-white text-xs font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Lock In Scope</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {estimatorOptions.map((option) => {
                    const isSelected = selectedAddons.includes(option.id);
                    return (
                      <div
                        key={option.id}
                        onClick={() => toggleAddon(option.id)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-50/60 border-[#7C5CFC] ring-2 ring-purple-100 shadow-xs"
                            : "bg-slate-50/60 border-slate-200/80 hover:bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900">{option.name}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                            <span className="px-1.5 py-0.5 rounded bg-white text-slate-600 text-[10px] font-bold border border-slate-200">
                              {option.badge}
                            </span>
                            <span className="flex items-center gap-0.5 text-[#7C5CFC] font-semibold">
                              <Clock className="w-3 h-3" />~{option.days} Days
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                            isSelected ? "bg-[#7C5CFC] border-[#7C5CFC] text-white" : "bg-white border-slate-300 text-transparent"
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {services.map((service, index) => {
            const Icon = resolveIcon(serviceIcons, service.icon, Layout);
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group bg-white rounded-3xl p-7 border border-slate-200/80 shadow-md hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-purple-50 group-hover:bg-[#7C5CFC] group-hover:text-white border border-purple-100 flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6 text-[#7C5CFC] group-hover:text-white" />
                    </div>
                    <span className="text-xs font-black text-slate-300 group-hover:text-[#7C5CFC] transition-colors">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-[#7C5CFC] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-5 font-normal">{service.shortDesc}</p>

                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2 text-[11px] text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#7C5CFC] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={onOpenContact}
                  className="w-full py-2.5 rounded-xl bg-slate-50 group-hover:bg-purple-50 text-[#7C5CFC] font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-100 group-hover:border-purple-200 transition-all cursor-pointer"
                >
                  <span>{ctas.inquireService}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
