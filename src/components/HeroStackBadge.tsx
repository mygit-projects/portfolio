"use client";

import React, { useState } from "react";
import { Layers } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export const HeroStackBadge: React.FC = () => {
  const stackItems = usePortfolio().hero.stackItems;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selectedItem = stackItems[selectedIdx] ?? stackItems[0];

  if (!selectedItem) {
    return null;
  }

  return (
    <div className="w-[230px] sm:w-[250px] bg-white/95 text-slate-900 rounded-2xl p-3.5 shadow-2xl border border-purple-200/90 backdrop-blur-xl group transition-all duration-300">
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center font-extrabold text-[10px]">
            <Layers className="w-3 h-3" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-800">Interactive Stack</span>
        </div>
        <span className="text-[9px] font-bold text-slate-400">Click to Inspect</span>
      </div>

      <div className="flex flex-wrap gap-1 mb-2.5">
        {stackItems.map((tech, idx) => {
          const isSelected = idx === selectedIdx;
          return (
            <button
              key={tech.name}
              onClick={() => setSelectedIdx(idx)}
              className={`px-2 py-0.5 rounded-full text-[9px] font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-purple-50 hover:text-purple-700"
              }`}
            >
              {tech.name}
            </button>
          );
        })}
      </div>

      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 space-y-0.5">
        <div className="flex items-center justify-between text-[9px]">
          <span className="font-extrabold text-slate-900">{selectedItem.name}</span>
          <span className="font-bold text-purple-600">{selectedItem.category}</span>
        </div>
        <p className="text-[8px] text-slate-500 font-medium">{selectedItem.highlight}</p>
      </div>
    </div>
  );
};
