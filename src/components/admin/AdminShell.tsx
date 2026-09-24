"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import {
  Briefcase,
  Contact,
  GraduationCap,
  House,
  Layers3,
  LayoutDashboard,
  LogOut,
  Map,
  Menu,
  MessageSquareQuote,
  Search,
  Settings,
  Sparkles,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import type { SeoFieldScore } from "@/content/types";
import { signOutAdmin } from "@/app/admin/actions";
import { SeoFieldScoreProvider } from "./SeoFieldChips";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/seo-optimizer", label: "SEO Engine", icon: Search },
  { href: "/admin/sitemap", label: "XML Sitemap", icon: Map },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/services", label: "Services", icon: Layers3 },
  { href: "/admin/projects", label: "Projects", icon: House },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/process", label: "Process", icon: Workflow },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/contact", label: "Contact", icon: Contact },
];

export function AdminShell({
  children,
  email,
  fieldScores = [],
}: {
  children: ReactNode;
  email?: string;
  fieldScores?: SeoFieldScore[];
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function onSignOut() {
    await signOutAdmin();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB] text-slate-800">
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
        <p className="text-sm font-black">Portfolio CMS</p>
        <button type="button" onClick={() => setOpen((value) => !value)} className="rounded-lg p-2 hover:bg-slate-100">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className="lg:grid lg:grid-cols-[240px_1fr]">
        <aside
          className={`${open ? "block" : "hidden"} lg:block border-r border-slate-200 bg-white px-4 py-6 lg:min-h-screen`}
        >
          <p className="hidden lg:block px-2 text-sm font-black text-slate-900">Portfolio CMS</p>
          <p className="mt-1 mb-5 px-2 text-[11px] text-slate-400 truncate">{email ?? "Administrator"}</p>
          <nav className="space-y-1">
            {NAV.map((item) => {
              const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold ${
                    active ? "bg-[#7C5CFC] text-white" : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            onClick={() => void onSignOut()}
            className="mt-6 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </aside>
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <SeoFieldScoreProvider initialScores={fieldScores}>
            <p className="mb-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900">
              <span className="font-black">SEO role bars</span> sit under every field: black = H1 / H2 / meta / body / UI only. Violet = SEO. Indigo = AEO. Teal = GEO. Homepage H1 is Settings → Name.
            </p>
            {children}
          </SeoFieldScoreProvider>
        </div>
      </div>
    </div>
  );
}
