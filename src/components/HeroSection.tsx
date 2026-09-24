"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Download, Sparkles, MessageCircle, Layout } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import { heroStatIcons, resolveIcon } from "@/lib/icons";
import { HangingCard } from "./HangingCard";
import { HeroVibeSandbox } from "./HeroVibeSandbox";
import { HeroSpeedDial } from "./HeroSpeedDial";
import { HeroLanyardBadge } from "./HeroLanyardBadge";
import { HeroStackBadge } from "./HeroStackBadge";

interface HeroSectionProps {
  onOpenContact: () => void;
  onOpenCvModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onOpenCvModal }) => {
  const { personalInfo, hero, ctas } = usePortfolio();
  const [activeMetricDetail, setActiveMetricDetail] = useState<string | null>(null);
  const activeStat = hero.stats.find((stat) => stat.id === activeMetricDetail);

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="absolute top-12 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-200/50 via-indigo-100/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute top-48 left-[2%] w-[420px] h-[420px] bg-gradient-to-tr from-indigo-100/60 via-purple-100/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none -z-10"
        style={{
          backgroundImage: `radial-gradient(#7C5CFC 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            <div
              id="hero-greeting-badge"
              className="hero-copy-in inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 shadow-xs text-[#7C5CFC] text-xs font-extrabold tracking-wider uppercase mb-5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 font-bold">{personalInfo.greetingBadgeLocation}</span>
              <span className="text-slate-300">•</span>
              <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC]" />
              <span>{personalInfo.greetingBadgeText}</span>
            </div>

            <h1 className="hero-copy-in hero-copy-in-d1 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] mb-3">
              {personalInfo.name}
            </h1>

            <h2 className="hero-copy-in hero-copy-in-d2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-800 mb-6">
              {personalInfo.headlinePrefix}{" "}
              <span className="bg-gradient-to-r from-[#7C5CFC] via-[#9073FC] to-[#4F46E5] bg-clip-text text-transparent">
                {personalInfo.headlineAccent}
              </span>
            </h2>

            <p className="hero-copy-in hero-copy-in-d3 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mb-8">
              {personalInfo.bio}
            </p>

            <div className="hero-copy-in hero-copy-in-d4 flex flex-wrap items-center gap-3.5 mb-10 w-full sm:w-auto">
              <a
                href="#projects"
                id="hero-view-work-btn"
                className="px-6 py-3.5 rounded-2xl bg-[#7C5CFC] hover:bg-[#6A46F9] text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-500/25 hover:shadow-purple-500/35 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>{ctas.viewWork}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <button
                id="hero-download-cv-btn"
                type="button"
                onClick={onOpenCvModal}
                className="hidden md:flex px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold text-sm tracking-wide border border-slate-200 hover:border-purple-300 shadow-sm transition-all items-center gap-2 group cursor-pointer"
              >
                <span>{ctas.downloadCv}</span>
                <Download className="w-4 h-4 text-[#7C5CFC] group-hover:translate-y-0.5 transition-transform" />
              </button>

              <a
                href={personalInfo.socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs tracking-wide border border-emerald-200/80 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>{ctas.whatsappChat}</span>
              </a>
            </div>

            <div
              id="hero-metrics-bar"
              className="hero-copy-in hero-copy-in-d5 grid grid-cols-3 gap-2.5 sm:gap-4 pt-6 border-t border-slate-200/80 w-full max-w-xl"
            >
              {hero.stats.map((stat) => {
                const Icon = resolveIcon(heroStatIcons, stat.icon, Layout);
                return (
                  <div
                    key={stat.id}
                    onClick={() => setActiveMetricDetail(activeMetricDetail === stat.id ? null : stat.id)}
                    className={`p-2.5 sm:p-3 rounded-2xl bg-white/70 hover:bg-white border border-slate-200/70 shadow-xs hover:shadow-md transition-all cursor-pointer group ${stat.accentClass}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider transition-colors">
                        {stat.category}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                    <div className="text-[11px] font-semibold text-slate-500 truncate">{stat.shortLabel}</div>
                  </div>
                );
              })}
            </div>

            {activeStat && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3 p-3 rounded-xl bg-purple-50/80 border border-purple-200 text-xs text-slate-700 w-full max-w-xl"
              >
                <p>
                  <strong className="text-slate-900">{activeStat.detailTitle}</strong> {activeStat.detailBody}
                </p>
              </motion.div>
            )}
          </div>

          <div className="relative hidden min-h-[520px] items-center justify-center md:flex sm:min-h-[580px] lg:col-span-6">
            <div
              className="absolute w-[380px] h-[380px] sm:w-[480px] sm:h-[480px] rounded-full border border-purple-200/60 -z-10 animate-spin"
              style={{ animationDuration: "50s" }}
            />
            <div
              className="absolute w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-indigo-200/70 -z-10 animate-spin"
              style={{ animationDuration: "40s", animationDirection: "reverse" }}
            />
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full bg-gradient-to-tr from-purple-200/40 via-purple-100/20 to-transparent -z-10" />

            <div className="relative z-10 w-64 sm:w-72 md:w-80">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/20 border-4 border-white bg-gradient-to-b from-slate-100 via-purple-50/50 to-indigo-50 aspect-[4/5]">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.profileImageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover filter contrast-105 select-none"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="text-xs font-black tracking-wider uppercase text-purple-200">{personalInfo.name}</p>
                    <p className="text-[11px] text-slate-200 font-medium">
                      {personalInfo.locationShort} • {personalInfo.yearsExperience} Yrs Industry Track Record
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-20 sm:-top-24 md:-top-28 -right-2 sm:-right-4 md:-right-6 z-30">
              <HangingCard
                cordLength={28}
                initialRotation={2.2}
                swingDuration={5.5}
                delay={0}
                badgeLabel={hero.hangingCards.vibeEngine}
                badgeColor="bg-gradient-to-r from-[#7C5CFC] to-indigo-600"
              >
                <HeroVibeSandbox />
              </HangingCard>
            </div>

            <div className="absolute -bottom-10 sm:-bottom-8 -right-4 sm:-right-4 md:-right-6 z-30">
              <HangingCard
                cordLength={35}
                initialRotation={-1.8}
                swingDuration={6}
                delay={1.2}
                badgeLabel={hero.hangingCards.coreWebVitals}
                badgeColor="bg-emerald-600"
              >
                <HeroSpeedDial />
              </HangingCard>
            </div>

            <div className="absolute -bottom-8 sm:-bottom-6 -left-6 sm:-left-8 md:-left-12 z-30">
              <HangingCard
                cordLength={40}
                initialRotation={1.6}
                swingDuration={5.8}
                delay={0.6}
                badgeLabel="Verified"
                badgeColor="bg-slate-800"
              >
                <HeroLanyardBadge onOpenContact={onOpenContact} />
              </HangingCard>
            </div>

            <div className="absolute -top-8 sm:-top-6 -left-8 sm:-left-10 md:-left-14 z-25 hidden sm:block">
              <HangingCard
                cordLength={38}
                initialRotation={-2.0}
                swingDuration={6.4}
                delay={1.8}
                badgeLabel={hero.hangingCards.stack}
                badgeColor="bg-indigo-600"
              >
                <HeroStackBadge />
              </HangingCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
