"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ExternalLink, ArrowUpRight, Sparkles, Eye, Monitor, Tablet, Smartphone, Zap } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import type { Project } from "@/content/types";
import { ProjectModal } from "./ProjectModal";

interface ProjectsSectionProps {
  onOpenContact: () => void;
}

type DeviceView = "desktop" | "tablet" | "mobile";

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenContact }) => {
  const { projects, projectCategories, sections, ctas } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [deviceViews, setDeviceViews] = useState<Record<string, DeviceView>>(
    Object.fromEntries(projects.map((project) => [project.id, "desktop"])),
  );

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory);

  const handleDeviceChange = (projectId: string, view: DeviceView, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeviceViews((prev) => ({ ...prev, [projectId]: view }));
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#7C5CFC] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sections.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {sections.projects.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl">{sections.projects.description}</p>
          </div>

          <div className="flex items-center gap-2 flex-wrap self-start md:self-end">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#7C5CFC] text-white shadow-lg shadow-purple-500/25 ring-2 ring-purple-200"
                    : "bg-white/80 backdrop-blur-md text-slate-600 hover:bg-white hover:text-slate-900 border border-slate-200/80 shadow-xs"
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-[#7C5CFC] text-xs font-black transition-all cursor-pointer border border-purple-200/80 shadow-xs group"
            >
              <span>{ctas.startProject}</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const currentView = deviceViews[project.id] ?? "desktop";
            const primaryMetric = project.metrics[0];

            return (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-300 transition-all duration-300 flex flex-col relative"
              >
                <div className="absolute top-4 left-4 z-20 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/10 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Live in Production</span>
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-slate-950/85 backdrop-blur-md p-1 rounded-xl border border-white/10 shadow-sm">
                  <button
                    onClick={(e) => handleDeviceChange(project.id, "desktop", e)}
                    title="Desktop Preview"
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      currentView === "desktop" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeviceChange(project.id, "tablet", e)}
                    title="Tablet Preview"
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      currentView === "tablet" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Tablet className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeviceChange(project.id, "mobile", e)}
                    title="Mobile Preview"
                    className={`p-1 rounded-lg transition-colors cursor-pointer ${
                      currentView === "mobile" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                  </button>
                </div>

                <div
                  className={`relative aspect-[16/10] overflow-hidden bg-slate-950 flex items-center justify-center ${
                    currentView === "desktop" ? "p-0" : "p-2"
                  }`}
                >
                  <div
                    className={`transition-all duration-500 overflow-hidden relative shadow-2xl ${
                      currentView === "desktop"
                        ? "w-full h-full rounded-none"
                        : currentView === "tablet"
                          ? "w-[75%] h-[92%] rounded-xl border-2 border-slate-700"
                          : "w-[45%] h-[95%] rounded-2xl border-2 border-slate-700"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent flex flex-col justify-end p-4">
                      {primaryMetric && (
                        <div className="self-start mb-1">
                          <span className="px-2.5 py-0.5 rounded-full bg-[#7C5CFC] text-white text-[10px] font-black tracking-wide shadow-sm flex items-center gap-1">
                            <Zap className="w-2.5 h-2.5" />
                            {primaryMetric.value} {primaryMetric.label}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      className="px-3.5 py-2 rounded-xl bg-white text-slate-900 text-xs font-black shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7C5CFC]" />
                      <span>Case Study</span>
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-[#7C5CFC] text-white text-xs font-black shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
                      <span className="text-[#7C5CFC] font-extrabold uppercase tracking-wider">{project.category}</span>
                      <span>{project.fullCaseStudy.role.split("&")[0]}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-[#7C5CFC] transition-colors leading-tight mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs font-bold text-slate-700 mb-2">{project.subtitle}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">{project.description}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 bg-slate-50/70 rounded-2xl px-3 text-center">
                    {project.metrics.map((metric) => (
                      <div key={metric.label}>
                        <div className="text-xs sm:text-sm font-black text-slate-900">{metric.value}</div>
                        <div className="text-[9px] font-semibold text-slate-500 truncate">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-purple-50/80 text-[#7C5CFC] text-[10px] font-bold border border-purple-100/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-slate-600 hover:text-[#7C5CFC] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#7C5CFC]" />
                      <span>View Full Blueprint</span>
                    </button>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7C5CFC] hover:text-[#5833eb] transition-colors flex items-center gap-1 group/link"
                    >
                      <span>Visit URL</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          onOpenContact();
        }}
      />
    </section>
  );
};
