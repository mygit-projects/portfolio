"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

interface NavbarProps {
  onOpenContact: () => void;
  onOpenCvModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenCvModal }) => {
  const { personalInfo, navigation, ctas } = usePortfolio();
  const pathname = usePathname();
  const hashPrefix = pathname === "/" ? "" : "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 200;

      for (const section of navigation) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation]);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm border-b border-slate-100/80 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href={`${hashPrefix}#home`} id="brand-logo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C5CFC] to-[#9B82FC] flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            {personalInfo.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-wider uppercase text-slate-900 group-hover:text-[#7C5CFC] transition-colors leading-tight">
              {personalInfo.name}
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
              {personalInfo.navbarSubtitle}
            </span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navigation.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`${hashPrefix}${link.href}`}
                id={`nav-link-${link.id}`}
                className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-200 relative ${
                  isActive
                    ? "text-[#7C5CFC] bg-purple-50/80 font-extrabold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#7C5CFC] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-cv-btn"
            onClick={onOpenCvModal}
            className="px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide text-slate-700 hover:text-[#7C5CFC] hover:bg-purple-50/60 border border-slate-200/80 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C5CFC]" />
            <span>{ctas.resume}</span>
          </button>

          <button
            id="nav-contact-btn"
            onClick={onOpenContact}
            className="px-4 py-2 rounded-xl text-xs font-bold tracking-wide uppercase text-[#7C5CFC] hover:text-white bg-purple-50/80 hover:bg-[#7C5CFC] border border-purple-200/80 hover:border-transparent transition-all shadow-sm hover:shadow-md hover:shadow-purple-500/20 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{ctas.letsTalk}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          id="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 px-6 py-5 shadow-xl transition-all">
          <div className="flex flex-col gap-2">
            {navigation.map((link) => (
              <a
                key={link.id}
                href={`${hashPrefix}${link.href}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2.5 rounded-xl text-sm font-semibold tracking-wide transition-colors ${
                  activeSection === link.id
                    ? "text-[#7C5CFC] bg-purple-50 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCvModal();
                }}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-purple-50 hover:text-[#7C5CFC] text-center transition-colors"
              >
                View Full CV & Credentials
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-2.5 rounded-xl text-sm font-bold text-white bg-[#7C5CFC] hover:bg-[#6b47fc] text-center shadow-md shadow-purple-500/25 flex items-center justify-center gap-2"
              >
                <span>{ctas.letsTalk}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
