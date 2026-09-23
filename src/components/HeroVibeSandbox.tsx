"use client";

import React, { useState, useEffect } from "react";
import { Play, Terminal, Check, RefreshCw, Zap } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export const HeroVibeSandbox: React.FC = () => {
  const presets = usePortfolio().hero.vibePresets;
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const activePreset = presets[activeIdx] ?? presets[0];

  useEffect(() => {
    if (!isPlaying || presets.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % presets.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, presets.length]);

  if (!activePreset) {
    return null;
  }

  return (
    <div className="w-[260px] sm:w-[280px] bg-slate-900/95 text-white rounded-2xl p-3.5 shadow-2xl border border-purple-500/30 backdrop-blur-xl group transition-all duration-300">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-black uppercase tracking-wider text-purple-300">
            AI Vibe Coding Engine
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Auto-Switch" : "Resume Auto-Switch"}
            className="p-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <RefreshCw className="w-2.5 h-2.5 animate-spin text-purple-400" />
            ) : (
              <Play className="w-2.5 h-2.5 text-emerald-400" />
            )}
          </button>
          <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-[#9E86FF] text-[9px] font-extrabold">
            {activePreset.tool}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mb-2.5">
        {presets.map((preset, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={preset.id}
              onClick={() => {
                setActiveIdx(idx);
                setIsPlaying(false);
              }}
              className={`px-1 py-1 rounded-lg text-[9px] font-bold transition-all truncate text-center cursor-pointer ${
                isActive
                  ? "bg-[#7C5CFC] text-white shadow-sm shadow-purple-500/40 font-extrabold"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {preset.title.split(" ")[0]}
            </button>
          );
        })}
      </div>

      <div className="bg-slate-950/80 rounded-xl p-2.5 mb-2.5 border border-slate-800/80 relative overflow-hidden">
        <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 mb-1.5">
          <div className="flex items-center gap-1">
            <Terminal className="w-3 h-3 text-purple-400" />
            <span className="text-slate-300 font-semibold">{activePreset.tag}</span>
          </div>
          <span className="text-emerald-400 flex items-center gap-0.5 font-bold">
            <Zap className="w-2.5 h-2.5" /> 10x Velocity
          </span>
        </div>

        <div className="font-mono text-[10px] text-purple-200 bg-slate-900/90 rounded-lg p-2 overflow-x-hidden border border-purple-500/20">
          <p className="text-slate-400 text-[8px] mb-0.5">// Prompt: {activePreset.prompt.slice(0, 38)}...</p>
          <p className="text-emerald-300 truncate font-semibold">{activePreset.codeSnippet}</p>
        </div>

        <div className="h-4 flex items-end justify-between gap-0.5 px-1 mt-2">
          {[45, 80, 35, 95, 60, 85, 50, 100, 75, 90, 65, 95, 40, 70, 90, 60, 85].map((val, i) => (
            <span
              key={i}
              className="w-1 bg-gradient-to-t from-[#7C5CFC] via-[#9E86FF] to-cyan-300 rounded-full transition-all duration-300"
              style={{
                height: `${isPlaying ? (val * ((i % 3) + 1)) % 100 : val}%`,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1 font-bold text-slate-300">
          <Check className="w-3 h-3 text-emerald-400" />
          {activePreset.resultMetric}
        </span>
        <button
          onClick={() => setIsDetailOpen(!isDetailOpen)}
          className="text-[9px] font-extrabold text-[#9E86FF] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
        >
          {isDetailOpen ? "Close Spec" : "View Spec"}
        </button>
      </div>

      {isDetailOpen && (
        <div className="mt-2.5 pt-2 border-t border-slate-800 text-[10px] text-slate-300 space-y-1 bg-slate-950/60 p-2 rounded-lg">
          <p className="font-bold text-purple-300">Active Workflow:</p>
          <p className="text-[9px] text-slate-400 leading-relaxed">
            AI Prompting → Specification Markdown → Cursor & Lovable generation → Production hardening.
          </p>
        </div>
      )}
    </div>
  );
};
