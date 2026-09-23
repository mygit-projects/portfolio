"use client";

import { X } from "lucide-react";

export function HeroSkeleton() {
  return (
    <div className="px-6 pt-8 pb-16">
      <div className="mx-auto max-w-6xl space-y-8 animate-pulse">
        <div className="h-14 rounded-full bg-white shadow-sm" />
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 pt-10">
            <div className="h-6 w-40 rounded-full bg-purple-100" />
            <div className="h-16 w-full rounded-2xl bg-slate-200" />
            <div className="h-16 w-4/5 rounded-2xl bg-slate-200" />
            <div className="h-24 w-full rounded-2xl bg-slate-100" />
          </div>
          <div className="aspect-[4/5] max-w-sm rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
}

export function RestSkeleton() {
  return (
    <div className="px-6 pb-20">
      <div className="mx-auto max-w-6xl space-y-8 animate-pulse">
        <div className="h-8 w-64 rounded-2xl bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-72 rounded-3xl bg-white shadow-sm" />
          <div className="h-72 rounded-3xl bg-white shadow-sm" />
          <div className="h-72 rounded-3xl bg-white shadow-sm" />
        </div>
      </div>
    </div>
  );
}

export function CvModalSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 min-h-[50vh] p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          aria-label="Close CV Modal"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="animate-pulse space-y-4 pt-6">
          <div className="h-8 w-64 rounded-xl bg-slate-200" />
          <div className="h-4 w-40 rounded-lg bg-slate-100" />
          <div className="h-32 w-full rounded-2xl bg-slate-100" />
          <div className="h-32 w-full rounded-2xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
