"use client";

import React from "react";
import { X, Printer, Download } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  const { personalInfo, experience, education, certifications, languages, projects, cvCompetencies } = usePortfolio();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-extrabold text-xs flex items-center justify-center">
              {personalInfo.initials}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{personalInfo.name} — Resume & Credentials</h3>
              <p className="text-[11px] text-slate-500">Official Curriculum Vitae</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-[#7C5CFC] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-slate-800 font-sans">
          <div className="border-b-2 border-slate-900 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">{personalInfo.name}</h1>
                <h2 className="text-sm sm:text-base font-extrabold text-[#7C5CFC] uppercase tracking-wider mt-0.5">
                  {personalInfo.cvModalTitle}
                </h2>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">{personalInfo.cvModalSubtitle}</p>
              </div>
              <div className="text-xs space-y-1 text-slate-600 sm:text-right">
                <p>
                  <span className="font-bold text-slate-900">Call / WhatsApp:</span> {personalInfo.phone}
                </p>
                <p>
                  <span className="font-bold text-slate-900">Email:</span> {personalInfo.email}
                </p>
                <p>
                  <span className="font-bold text-slate-900">Location:</span> {personalInfo.locationShort}
                </p>
                <p>
                  <span className="font-bold text-slate-900">UAE Driving License:</span> Yes •{" "}
                  <span className="font-bold text-slate-900">DOB:</span> {personalInfo.dob}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2.5">
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{personalInfo.bio}</p>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
              CORE COMPETENCIES & TECHNICAL SKILLS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {cvCompetencies.map((block) => (
                <div
                  key={block.title}
                  className={`p-3 rounded-xl border space-y-1 ${
                    block.tone === "accent" ? "bg-purple-50/60 border-purple-100" : "bg-slate-50 border-slate-100"
                  }`}
                >
                  <p className={`font-bold ${block.tone === "accent" ? "text-purple-900" : "text-slate-900"}`}>• {block.title}</p>
                  <p className="text-slate-600">{block.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-4">
              PROFESSIONAL EXPERIENCE
            </h3>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">{exp.title}</span>
                      <span className="text-xs font-bold text-[#7C5CFC]"> | {exp.company}</span>
                    </div>
                    <div className="text-[11px] font-bold text-slate-500">
                      {exp.period} • {exp.location}
                    </div>
                  </div>
                  <ul className="space-y-1.5 pl-3 text-xs text-slate-700 list-disc">
                    {exp.highlights.map((item) => (
                      <li key={item} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">EDUCATION</h3>
              <div className="space-y-3 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <p className="font-bold text-slate-900">{edu.degree}</p>
                    <p className="text-[#7C5CFC] font-semibold">{edu.field}</p>
                    <p className="text-[11px] text-slate-500">
                      {edu.institution} - {edu.location}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3">
                CERTIFICATIONS & LANGUAGES
              </h3>
              <div className="space-y-3 text-xs mb-4">
                {certifications.map((cert) => (
                  <div key={cert.title}>
                    <p className="font-bold text-slate-900">{cert.title}</p>
                    <p className="text-slate-600">
                      {cert.issuer} ({cert.date})
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-xs pt-2 border-t border-slate-100">
                <p className="font-bold text-slate-900 mb-0.5">Languages:</p>
                <p className="text-slate-600">{languages.map((lang) => lang.language).join(", ")}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2.5">
              FEATURED PORTFOLIO & LIVE PLATFORMS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {projects.map((project) => (
                <a
                  key={project.id}
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-purple-300"
                >
                  <p className="font-bold text-slate-900">{project.title}</p>
                  <p className="text-[11px] text-slate-500">{project.subtitle}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between print:hidden">
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
              Contact {personalInfo.name}
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-[#7C5CFC] hover:bg-[#6842f5] text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-500/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download CV</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
