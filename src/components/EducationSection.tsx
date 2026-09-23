"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GraduationCap,
  Award,
  Sparkles,
  CheckCircle2,
  BookOpen,
  MapPin,
  Languages,
  ShieldCheck,
  Check,
  Globe2,
  Zap,
} from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import { educationIcons, resolveIcon } from "@/lib/icons";

const accentMap = {
  purple: {
    card: "border-purple-200/90 shadow-purple-500/5 hover:border-[#7C5CFC]",
    icon: "bg-purple-50 text-[#7C5CFC] group-hover:bg-[#7C5CFC] group-hover:text-white",
    badge: "bg-purple-100 text-[#7C5CFC]",
    label: "text-[#7C5CFC]",
    headingHover: "group-hover:text-[#7C5CFC]",
  },
  indigo: {
    card: "border-slate-200 hover:border-[#7C5CFC]",
    icon: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
    badge: "bg-indigo-100 text-indigo-700",
    label: "text-indigo-600",
    headingHover: "group-hover:text-indigo-600",
  },
  slate: {
    card: "border-slate-200 hover:border-[#7C5CFC]",
    icon: "bg-slate-100 text-slate-700 group-hover:bg-[#7C5CFC] group-hover:text-white",
    badge: "bg-slate-100 text-slate-700",
    label: "text-slate-500",
    headingHover: "group-hover:text-[#7C5CFC]",
  },
} as const;

const certAccentMap = {
  amber: {
    card: "border-amber-200 shadow-amber-500/5",
    icon: "bg-amber-50 text-amber-600 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    label: "text-amber-700",
    competency: "bg-amber-50/60",
    check: "text-amber-600",
  },
  purple: {
    card: "border-purple-200 shadow-purple-500/5",
    icon: "bg-purple-50 text-[#7C5CFC] border-purple-200",
    badge: "bg-purple-100 text-[#7C5CFC]",
    label: "text-[#7C5CFC]",
    competency: "bg-purple-50/60",
    check: "text-[#7C5CFC]",
  },
} as const;

export const EducationSection: React.FC = () => {
  const { education, certifications, languages, sections, personalInfo } = usePortfolio();
  const [activeTab, setActiveTab] = useState<"degrees" | "certifications" | "languages">("degrees");

  return (
    <section id="education" className="py-20 md:py-28 bg-[#F3F5FC]/70 border-y border-slate-200/60 relative z-10 overflow-hidden">
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[300px] bg-purple-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#7C5CFC] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sections.education.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {sections.education.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl leading-relaxed">{sections.education.description}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs self-start md:self-end">
            <button
              onClick={() => setActiveTab("degrees")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "degrees" ? "bg-[#7C5CFC] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Degrees & Diplomas</span>
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "certifications" ? "bg-[#7C5CFC] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Certifications</span>
            </button>
            <button
              onClick={() => setActiveTab("languages")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "languages" ? "bg-[#7C5CFC] text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>Languages</span>
            </button>
          </div>
        </div>

        {activeTab === "degrees" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {education.map((item, index) => {
              const styles = accentMap[item.accent];
              const Icon = resolveIcon(educationIcons, item.icon, GraduationCap);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-7 sm:p-8 border shadow-xl flex flex-col justify-between relative group transition-all ${styles.card}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-xs ${styles.icon}`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles.badge}`}>
                        {item.badge}
                      </span>
                    </div>
                    <div className={`text-xs font-extrabold uppercase tracking-wider mb-1 ${styles.label}`}>{item.categoryLabel}</div>
                    <h3 className={`text-xl font-black text-slate-900 leading-tight mb-2 transition-colors ${styles.headingHover}`}>
                      {item.degree}
                    </h3>
                    <p className="text-xs font-bold text-slate-700 mb-2">{item.field}</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-4">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.institution}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal mb-5">{item.description}</p>
                    <div className="space-y-1.5 pt-4 border-t border-slate-100">
                      <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">{item.modulesLabel}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.modules.map((mod) => (
                          <span key={mod} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-[10px] font-bold border border-slate-200">
                            {mod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-extrabold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{item.statusLabel}</span>
                    </div>
                    <span className="text-slate-400 font-bold flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "certifications" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {certifications.map((cert, index) => {
              const styles = certAccentMap[cert.accent];
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-7 sm:p-9 border shadow-xl flex flex-col justify-between relative group ${styles.card}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xs ${styles.icon}`}>
                        {cert.accent === "amber" ? <Award className="w-7 h-7" /> : <ShieldCheck className="w-7 h-7" />}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${styles.badge}`}>
                        {cert.badge}
                      </span>
                    </div>
                    <div className={`text-xs font-black uppercase tracking-wider mb-1 ${styles.label}`}>{cert.issuer}</div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">{cert.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold mb-4">Issued: {cert.date}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-normal">{cert.description}</p>
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <div className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Verified Competencies:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {cert.competencies.map((comp) => (
                          <div key={comp} className={`flex items-center gap-2 p-2 rounded-xl text-[11px] font-bold text-slate-800 ${styles.competency}`}>
                            <Check className={`w-3.5 h-3.5 shrink-0 ${styles.check}`} />
                            <span>{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-600 font-extrabold flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Official Certificate</span>
                    </span>
                    <span className="text-slate-500 font-bold">{cert.issuerShort}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {activeTab === "languages" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {languages.map((lang, idx) => (
              <motion.div
                key={lang.language}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 text-[#7C5CFC] flex items-center justify-center mb-5 border border-purple-100">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-1">{lang.language}</h3>
                  <p className="text-xs font-extrabold text-[#7C5CFC] uppercase tracking-wider mb-3">{lang.proficiency}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{lang.description}</p>
                </div>
                <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Communication Readiness</span>
                  <span className="text-emerald-600">100% Fluent</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7C5CFC] text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {personalInfo.yearsExperience} Years of Proven Engineering & Digital Pedigree
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Combining a rigorous 4-year Telecommunications Degree with cutting-edge modern AI prompt engineering and full-stack frameworks.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-5 py-3 rounded-2xl bg-purple-50 hover:bg-[#7C5CFC] text-[#7C5CFC] hover:text-white text-xs font-black transition-all border border-purple-200 shadow-xs shrink-0"
          >
            Request Official Credentials
          </a>
        </div>
      </div>
    </section>
  );
};
