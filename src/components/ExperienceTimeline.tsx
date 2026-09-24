"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar,
  MapPin,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Building,
  TrendingUp,
} from "lucide-react";
import { contrastSafeClass } from "@/lib/contrastClass";
import { usePortfolio } from "@/content/PortfolioProvider";
import { UaeDrivingCard } from "./UaeDrivingCard";

export const ExperienceTimeline: React.FC = () => {
  const { experience, sections, careerSidebar, personalInfo } = usePortfolio();
  const [expandedId, setExpandedId] = useState<string>(experience[0]?.id ?? "");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? "" : id);
  };

  return (
    <section id="experience" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#5B3DE0] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sections.experience.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {sections.experience.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">
              {sections.experience.description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs self-start md:self-end">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-extrabold text-slate-800">
              {personalInfo.yearsExperience} Years Active Production Impact
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            {experience.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              return (
                <motion.div
                  key={exp.id}
                  id={`experience-card-${exp.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white rounded-3xl border transition-all duration-300 overflow-hidden ${
                    isExpanded
                      ? "border-purple-300 shadow-xl shadow-purple-500/5 ring-2 ring-purple-100"
                      : "border-slate-200/80 hover:border-purple-200 shadow-sm"
                  }`}
                >
                  <div
                    onClick={() => toggleExpand(exp.id)}
                    className="p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-gradient-to-r from-white via-white to-purple-50/30"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">{exp.title}</h3>
                        {exp.badge && (
                          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-[#5B3DE0] text-[10px] font-black uppercase tracking-wider shadow-xs">
                            {exp.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap font-medium">
                        <span className="font-extrabold text-[#5B3DE0] flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          {exp.company}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {exp.location}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-600 font-bold">
                          <Calendar className="w-3.5 h-3.5" />
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isExpanded ? "bg-[#5B3DE0] text-white" : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-slate-100 space-y-5"
                      >
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{exp.summary}</p>
                        <div className="space-y-2.5">
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#5B3DE0]" />
                            <span>Key Deliverables & Documented Impact:</span>
                          </h4>
                          {exp.highlights.map((highlight) => (
                            <div
                              key={highlight}
                              className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-2.5 rounded-xl border border-slate-100"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#5B3DE0] shrink-0 mt-1.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            {exp.metrics.map((metric) => (
                              <span
                                key={metric}
                                className="px-3 py-1 rounded-xl bg-purple-50 text-[#5B3DE0] text-xs font-extrabold border border-purple-200/80 shadow-xs"
                              >
                                {metric}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {exp.skillsUsed.slice(0, 3).map((skill) => (
                              <span key={skill} className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md space-y-5">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5B3DE0] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">{careerSidebar.heading}</h4>
                  <p className="text-[11px] text-slate-600">{careerSidebar.period}</p>
                </div>
              </div>
              <div className="space-y-3">
                {careerSidebar.stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-xs font-bold text-slate-600">{stat.label}</span>
                    <span className={`text-sm font-black ${contrastSafeClass(stat.valueClass)}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="pt-3 border-t border-slate-100">
                <p className="text-[11px] text-slate-500 leading-relaxed">{careerSidebar.blurb}</p>
              </div>
            </div>
            <UaeDrivingCard />
          </div>
        </div>
      </div>
    </section>
  );
};
