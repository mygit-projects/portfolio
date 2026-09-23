"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import type { Project } from "@/content/types";
import { usePortfolio } from "@/content/PortfolioProvider";

export function ProjectCasePage({ project }: { project: Project }) {
  const { personalInfo } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#2A2E3D]">
      <Navbar
        onOpenContact={() => {
          window.location.href = "/#contact";
        }}
        onOpenCvModal={() => {
          window.location.href = "/#home";
        }}
      />

      <main className="pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#7C5CFC]">{project.category}</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">{project.title}</h1>
          <p className="mt-3 text-xl font-bold text-slate-700">{project.subtitle}</p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl bg-[#7C5CFC] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20"
            >
              Live site <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"
            >
              All projects <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border-4 border-white bg-slate-100 shadow-xl">
            <Image
              src={project.image}
              alt={`${project.title} case study preview`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 960px"
            />
          </div>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Client</dt>
              <dd className="mt-1 text-sm font-bold text-slate-900">{project.fullCaseStudy.client}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Role</dt>
              <dd className="mt-1 text-sm font-bold text-slate-900">{project.fullCaseStudy.role}</dd>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Timeline</dt>
              <dd className="mt-1 text-sm font-bold text-slate-900">{project.fullCaseStudy.timeline}</dd>
            </div>
          </dl>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl bg-purple-50 px-4 py-5 text-center">
                <div className="text-2xl font-black text-slate-900">{metric.value}</div>
                <div className="text-xs font-semibold text-slate-500">{metric.label}</div>
              </div>
            ))}
          </div>

          <section className="mt-12 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Challenge</h2>
            <p className="text-sm leading-relaxed text-slate-600">{project.fullCaseStudy.challenge}</p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Solution</h2>
            <p className="text-sm leading-relaxed text-slate-600">{project.fullCaseStudy.solution}</p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Key achievements</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {project.fullCaseStudy.keyAchievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-2xl font-black text-slate-900">Architecture</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
              {project.fullCaseStudy.architecture.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <p className="mt-12 text-sm text-slate-500">
            Built by {personalInfo.name}, {personalInfo.title} in {personalInfo.location}.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
