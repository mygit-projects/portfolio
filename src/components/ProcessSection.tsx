"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Play,
  Pause,
  Compass,
  Clock,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Activity,
  Zap,
} from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import { contrastSafeClass } from "@/lib/contrastClass";
import { processIcons, resolveIcon } from "@/lib/icons";

export const ProcessSection: React.FC = () => {
  const { processSteps, sections } = usePortfolio();
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const activeStep = processSteps[activeStepIdx] ?? processSteps[0];

  useEffect(() => {
    if (!isAutoPlaying || processSteps.length === 0) return;

    const tickRate = 50;
    const totalDuration = 5000;
    const stepIncrement = (tickRate / totalDuration) * 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStepIdx((current) => (current + 1) % processSteps.length);
          return 0;
        }
        return prev + stepIncrement;
      });
    }, tickRate);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeStepIdx, processSteps.length]);

  const handleSelectStep = (idx: number) => {
    setActiveStepIdx(idx);
    setProgress(0);
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setActiveStepIdx((prev) => (prev + 1) % processSteps.length);
    setProgress(0);
    setIsAutoPlaying(false);
  };

  const handlePrev = () => {
    setActiveStepIdx((prev) => (prev - 1 + processSteps.length) % processSteps.length);
    setProgress(0);
    setIsAutoPlaying(false);
  };

  if (!activeStep) {
    return null;
  }

  return (
    <section id="process" className="py-20 md:py-28 bg-[#F3F5FC]/80 border-y border-slate-200/60 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-200/40 via-indigo-100/30 to-pink-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-100 text-[#5B3DE0] text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{sections.process.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
              {sections.process.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {sections.process.description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm self-start md:self-end">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5B3DE0] text-xs font-bold transition-all cursor-pointer"
              title={isAutoPlaying ? "Pause Automated Walkthrough" : "Play Automated Walkthrough"}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#5B3DE0]" />
                  <span>Auto Tour Active</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-700">Resume Tour</span>
                </>
              )}
            </button>

            <div className="h-5 w-[1px] bg-slate-200 mx-0.5" />

            <button
              onClick={handlePrev}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Next step"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2 px-1">
            <span className="flex items-center gap-1.5 text-slate-900">
              <Activity className="w-3.5 h-3.5 text-[#5B3DE0]" />
              <span>
                Current Phase:{" "}
                <strong className="text-[#5B3DE0]">
                  {activeStep.step}. {activeStep.title}
                </strong>
              </span>
            </span>
            <span className="text-[11px] text-slate-600 font-semibold">
              {activeStepIdx + 1} of {processSteps.length} Phases
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden flex gap-1 p-0.5">
            {processSteps.map((step, idx) => {
              const isPast = idx < activeStepIdx;
              const isCurrent = idx === activeStepIdx;
              return (
                <div
                  key={step.step}
                  className="h-full flex-1 rounded-full bg-slate-200/80 overflow-hidden relative cursor-pointer"
                  onClick={() => handleSelectStep(idx)}
                >
                  {isPast && <div className="h-full w-full bg-[#5B3DE0]" />}
                  {isCurrent && (
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#5B3DE0] to-indigo-600 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mb-10">
          <div className="hidden lg:block absolute top-9 left-12 right-12 h-1 bg-gradient-to-r from-purple-200 via-indigo-200 to-emerald-200 z-0 rounded-full opacity-60" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 relative z-10">
            {processSteps.map((step, idx) => {
              const isActive = idx === activeStepIdx;
              const StepIcon = resolveIcon(processIcons, step.icon, Compass);

              return (
                <motion.div
                  key={step.step}
                  id={`process-step-${step.step}`}
                  onClick={() => handleSelectStep(idx)}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className={`relative rounded-3xl p-5 sm:p-6 transition-all duration-300 flex flex-col items-start cursor-pointer select-none ${
                    isActive
                      ? "bg-white shadow-xl shadow-purple-500/10 border-2 border-[#5B3DE0] ring-4 ring-purple-100"
                      : "bg-white/80 hover:bg-white border border-slate-200/80 shadow-sm hover:shadow-md"
                  }`}
                >
                  {isActive && (
                    <div className="absolute -top-3 right-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#5B3DE0] text-white text-[9px] font-black uppercase tracking-wider shadow-xs flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        ACTIVE
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between w-full mb-5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base shadow-sm transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-br ${step.color} text-white shadow-md shadow-purple-500/30 scale-105`
                          : "bg-slate-100 text-slate-700 hover:bg-purple-50 hover:text-[#5B3DE0]"
                      }`}
                    >
                      <StepIcon className="w-6 h-6" />
                    </div>
                    <span className={`text-xl font-black tracking-tight ${isActive ? "text-[#5B3DE0]" : "text-slate-500"}`}>
                      {step.step}
                    </span>
                  </div>

                  <h3 className={`text-lg font-black mb-1 transition-colors ${isActive ? "text-[#5B3DE0]" : "text-slate-900"}`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">{step.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4 line-clamp-3">{step.desc}</p>

                  <div className="mt-auto pt-3 border-t border-slate-100 w-full flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-purple-400" />
                      {step.duration}
                    </span>
                    <span className={`flex items-center gap-0.5 transition-colors ${isActive ? "text-[#5B3DE0]" : "text-slate-600"}`}>
                      <span>Details</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? "translate-x-0.5 text-[#5B3DE0]" : ""}`} />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl shadow-purple-500/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-purple-100/60 via-indigo-50/40 to-transparent rounded-bl-full pointer-events-none -z-0" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${contrastSafeClass(activeStep.accentBg)}`}>
                    <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
                    Phase {activeStep.step} Deep-Dive: {activeStep.title}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Estimated Duration: {activeStep.duration}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                    {activeStep.title} — {activeStep.tagline}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{activeStep.desc}</p>
                </div>

                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#5B3DE0]" />
                    <span>Tangible Outputs & Deliverables:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeStep.deliverables.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100/90 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs font-bold text-slate-500">Tools Used:</span>
                  {activeStep.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 rounded-lg bg-purple-50 text-[#5B3DE0] text-xs font-bold border border-purple-200/60"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-300 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-yellow-400" />
                      Phase Success Benchmark
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono">
                      Phase {activeStep.step}/05
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white tracking-tight mb-1">{activeStep.keyMetric}</div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Guaranteed outcome achieved at the conclusion of this stage before moving to the next pipeline milestone.
                  </p>
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-purple-500/20 font-mono text-[11px] text-purple-200 overflow-x-auto">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[9px] mb-1.5">
                      <Terminal className="w-3 h-3 text-purple-400" />
                      <span>Phase Artifact Preview</span>
                    </div>
                    <code className="text-emerald-300 font-semibold leading-relaxed break-all">{activeStep.codeOrArtifact}</code>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 font-bold text-slate-600 hover:text-[#5B3DE0] transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Phase</span>
                  </button>
                  <span className="font-extrabold text-slate-600">{activeStep.step} / 05</span>
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 font-bold text-[#5B3DE0] hover:text-[#4A2EC4] transition-colors cursor-pointer"
                  >
                    <span>Next Phase</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
