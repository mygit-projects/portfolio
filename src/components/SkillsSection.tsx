"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Zap, Flame, Terminal, Layout } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import type { SkillTool } from "@/content/types";
import { resolveIcon, skillToolIcons } from "@/lib/icons";

export const SkillsSection: React.FC = () => {
  const { skills, sections } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [hoveredTool, setHoveredTool] = useState<SkillTool | null>(null);

  const filteredTools =
    activeCategory === "All" ? skills.tools : skills.tools.filter((tool) => tool.category === activeCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7C5CFC] text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{sections.skills.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {sections.skills.heading}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">{sections.skills.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-6 space-y-6 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#7C5CFC]" />
                <h3 className="text-lg font-black text-slate-900">Core Competencies & Proficiency</h3>
              </div>
              <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Verified Expertise
              </span>
            </div>

            <div className="space-y-5">
              {skills.progressMeters.map((skill, index) => (
                <div key={skill.name} className="space-y-1.5 group">
                  <div className="flex items-center justify-between text-xs font-extrabold">
                    <span className="text-slate-800 group-hover:text-[#7C5CFC] transition-colors">{skill.name}</span>
                    <span className="text-[#7C5CFC] font-black">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#7C5CFC] via-indigo-500 to-[#9B82FC] rounded-full shadow-xs"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3">
                Specialized Knowledge & Production Domains
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skills.specializedTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#7C5CFC] border border-slate-200/80 text-[11px] font-semibold transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/80 shadow-lg flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {skills.toolCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold transition-all cursor-pointer ${
                        activeCategory === cat
                          ? "bg-[#7C5CFC] text-white shadow-sm"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTools.map((tool) => {
                  const Icon = resolveIcon(skillToolIcons, tool.icon, Layout);
                  return (
                    <motion.div
                      key={tool.name}
                      whileHover={{ scale: 1.03 }}
                      onMouseEnter={() => setHoveredTool(tool)}
                      onMouseLeave={() => setHoveredTool(null)}
                      className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-white border border-slate-100 hover:border-purple-300 hover:shadow-md transition-all group flex flex-col items-center text-center justify-center gap-2 relative cursor-pointer"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center border ${tool.color} group-hover:scale-110 transition-transform shadow-xs`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-black text-slate-900 leading-tight">{tool.name}</div>
                        <div className="text-[10px] text-purple-600 font-bold mt-0.5">{tool.impact}</div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 p-4 rounded-2xl bg-purple-50/70 border border-purple-100/90 text-xs text-slate-700">
                {hoveredTool ? (
                  <div>
                    <div className="font-extrabold text-[#7C5CFC] flex items-center gap-1.5 mb-0.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{hoveredTool.name} in Action:</span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{hoveredTool.usage}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#7C5CFC] text-white flex items-center justify-center shrink-0">
                      <Flame className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-black text-slate-900">10x Engineering Velocity</p>
                      <p className="text-slate-600 text-[11px]">Hover any tool to inspect real-world production application.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-indigo-950 text-white border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center shrink-0 border border-purple-400/30">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs text-white">Full-Stack & Vibe Coding Synergy</p>
                  <p className="text-[10px] text-slate-400">Spec-driven architectures delivered with sub-second performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
