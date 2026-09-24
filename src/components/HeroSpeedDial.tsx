"use client";

import React, { useState } from "react";
import { Zap, Gauge, CheckCircle2, RotateCw, Activity } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export const HeroSpeedDial: React.FC = () => {
  const speedDial = usePortfolio().hero.speedDial;
  const [isRunningAudit, setIsRunningAudit] = useState(false);
  const [score, setScore] = useState(speedDial.pagespeedScore);
  const [lcp, setLcp] = useState(speedDial.lcp);

  const runAudit = () => {
    setIsRunningAudit(true);
    setScore(85);
    setTimeout(() => {
      setScore(94);
      setTimeout(() => {
        setScore(speedDial.pagespeedScore);
        setLcp(speedDial.lcp);
        setIsRunningAudit(false);
      }, 400);
    }, 400);
  };

  return (
    <div className="w-[230px] sm:w-[250px] bg-white/95 text-slate-900 rounded-2xl p-3.5 shadow-2xl border border-purple-200/80 backdrop-blur-xl group transition-all duration-300">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2.5 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
            <Gauge className="w-3.5 h-3.5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">Speed & CRO Engine</span>
        </div>

        <button
          onClick={runAudit}
          disabled={isRunningAudit}
          title="Run Live Performance Audit"
          className="px-2 py-0.5 rounded-md bg-purple-50 hover:bg-purple-100 text-[#5B3DE0] text-[9px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCw className={`w-2.5 h-2.5 ${isRunningAudit ? "animate-spin" : ""}`} />
          <span>{isRunningAudit ? "Testing..." : "Audit"}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2.5">
        <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50/60 border border-emerald-100/80 text-center">
          <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 flex items-center justify-center gap-1">
            <Activity className="w-2.5 h-2.5" />
            <span>{speedDial.pagespeedLabel}</span>
          </div>
          <div className="text-xl font-black text-emerald-600 tracking-tight mt-0.5">
            {score}
            <span className="text-xs font-bold text-emerald-500">/100</span>
          </div>
          <p className="text-[8px] font-semibold text-emerald-700">LCP {lcp} • Grade A</p>
        </div>

        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50/60 border border-purple-100/80 text-center">
          <div className="text-[9px] font-bold uppercase tracking-wider text-purple-800 flex items-center justify-center gap-1">
            <Zap className="w-2.5 h-2.5 text-[#5B3DE0]" />
            <span>CRO Lift</span>
          </div>
          <div className="text-xl font-black text-[#5B3DE0] tracking-tight mt-0.5">{speedDial.croLift}</div>
          <p className="text-[8px] font-semibold text-purple-700">{speedDial.croCaption}</p>
        </div>
      </div>

      <div className="space-y-1 text-[9px] text-slate-600">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            {speedDial.vitalsLabel}
          </span>
          <span className="font-bold text-emerald-600">{speedDial.vitalsValue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3 h-3 text-[#5B3DE0]" />
            {speedDial.seoLabel}
          </span>
          <span className="font-bold text-[#5B3DE0]">{speedDial.seoValue}</span>
        </div>
      </div>
    </div>
  );
};
