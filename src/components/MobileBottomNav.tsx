"use client";

import { Briefcase, FileText, FolderKanban, GraduationCap, Home } from "lucide-react";

const SECTION_ITEMS = [
  { id: "home", label: "Home", href: "#home", icon: Home },
  { id: "projects", label: "Projects", href: "#projects", icon: FolderKanban },
  { id: "services", label: "Service", href: "#services", icon: Briefcase },
  { id: "education", label: "Education", href: "#education", icon: GraduationCap },
] as const;

interface MobileBottomNavProps {
  activeSection: string;
  hashPrefix: string;
  onOpenCvModal: () => void;
}

export function MobileBottomNav({ activeSection, hashPrefix, onOpenCvModal }: MobileBottomNavProps) {
  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(15,23,42,0.18)] backdrop-blur-xl md:hidden"
    >
      <div className="flex items-center justify-between px-1.5 pt-1.5 pb-1.5">
        {SECTION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`${hashPrefix}${item.href}`}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 transition-colors ${
                isActive ? "bg-purple-50 text-[#5B3DE0]" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Icon className={`pointer-events-none h-[18px] w-[18px] ${isActive ? "stroke-[2.25]" : "stroke-[1.75]"}`} />
              <span className={`truncate text-[10px] leading-none ${isActive ? "font-extrabold" : "font-semibold"}`}>
                {item.label}
              </span>
            </a>
          );
        })}

        <button
          type="button"
          onClick={onOpenCvModal}
          className="flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-xl px-1 py-1.5 text-slate-500 transition-colors hover:bg-purple-50 hover:text-[#5B3DE0]"
        >
          <span className="pointer-events-none flex h-[18px] w-[18px] items-center justify-center rounded-md bg-[#5B3DE0] text-white shadow-sm shadow-purple-500/30">
            <FileText className="h-3 w-3" />
          </span>
          <span className="truncate text-[10px] font-extrabold leading-none text-[#5B3DE0]">CV</span>
        </button>
      </div>
    </nav>
  );
}
