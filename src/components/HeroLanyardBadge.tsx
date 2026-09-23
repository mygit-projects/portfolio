"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

interface HeroLanyardBadgeProps {
  onOpenContact: () => void;
}

export const HeroLanyardBadge: React.FC<HeroLanyardBadgeProps> = ({ onOpenContact }) => {
  const { personalInfo } = usePortfolio();

  return (
    <div className="w-[270px] sm:w-[300px] md:w-[320px] bg-gradient-to-b from-white via-slate-50 to-purple-50/60 rounded-3xl p-4 sm:p-5 shadow-2xl border border-purple-200/90 backdrop-blur-xl relative overflow-hidden group">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
            {personalInfo.initials}
          </div>
          <div>
            <p className="text-xs sm:text-sm font-black uppercase text-slate-900 tracking-tight leading-tight">
              {personalInfo.name}
            </p>
            <p className="text-[10px] sm:text-[11px] font-bold text-[#7C5CFC]">UAE Verified Specialist</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100/90 border border-slate-200/90 text-[10px] sm:text-xs font-extrabold text-slate-800 shadow-2xs">
          <span>🇦🇪</span>
          <span>Dubai</span>
        </div>
      </div>

      <div className="space-y-2 mb-3.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Specialization:</span>
          <span className="font-bold text-slate-900">Web & Vibe Coding</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Experience:</span>
          <span className="font-black text-[#7C5CFC]">{personalInfo.yearsExperience} Years Track Record</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">UAE Driving License:</span>
          <span className="font-semibold text-slate-800">{personalInfo.drivingLicenseShort}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Availability:</span>
          <span className="inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Active & Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-200/80">
        <a
          href={personalInfo.socialLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenContact}
          className="px-3 py-2.5 rounded-xl bg-[#7C5CFC] hover:bg-[#6842F5] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Direct Call</span>
        </button>
      </div>
    </div>
  );
};
