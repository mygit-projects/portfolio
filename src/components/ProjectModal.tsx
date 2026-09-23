"use client";

import React from "react";
import Image from "next/image";
import { X, ExternalLink, CheckCircle2, Layers, Calendar, User, TrendingUp, Sparkles } from "lucide-react";
import type { Project } from "@/content/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-[#7C5CFC] text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            {project.badge && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                {project.badge}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">{project.title}</h3>
            <p className="text-base font-semibold text-[#7C5CFC]">{project.subtitle}</p>
          </div>

          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-900 group">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${project.previewGradient} opacity-40 mix-blend-multiply`} />
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-sm shadow-xl flex items-center gap-2 hover:bg-purple-50 hover:text-[#7C5CFC] transition-colors"
              >
                <span>Visit Live Platform ({project.title})</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
            <div>
              <div className="flex items-center gap-1 text-slate-400 font-medium mb-0.5">
                <User className="w-3.5 h-3.5" />
                <span>Client</span>
              </div>
              <span className="font-bold text-slate-800">{project.fullCaseStudy.client}</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-slate-400 font-medium mb-0.5">
                <Layers className="w-3.5 h-3.5" />
                <span>Role</span>
              </div>
              <span className="font-bold text-slate-800">{project.fullCaseStudy.role}</span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1 text-slate-400 font-medium mb-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </div>
              <span className="font-bold text-slate-800">{project.fullCaseStudy.timeline}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100 text-center">
                <div className="text-xl sm:text-2xl font-black text-[#7C5CFC]">{metric.value}</div>
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">{metric.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-rose-500" />
                <span>The Challenge</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                {project.fullCaseStudy.challenge}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#7C5CFC]" />
                <span>Strategic Solution & Engineering</span>
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed bg-purple-50/40 p-3.5 rounded-xl border border-purple-100/60">
                {project.fullCaseStudy.solution}
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-3">Key Impact & Deliverables</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.fullCaseStudy.keyAchievements.map((item) => (
                <div key={item} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2">Technology Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {project.fullCaseStudy.architecture.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors">
            Close
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-4 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-[#7C5CFC] font-bold text-xs transition-colors"
            >
              Discuss Similar Project
            </button>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#6845f0] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
