"use client";

import React, { useState } from "react";
import { Send, Check, Heart, Mail, MessageCircle, Linkedin } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";

export const Footer: React.FC = () => {
  const { personalInfo, navigation, footer } = usePortfolio();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 2000);
  };

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-100">
          <div className="lg:col-span-4 space-y-4">
            <a href="/#home" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5B3DE0] to-[#9B82FC] flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-purple-500/20">
                {personalInfo.initials}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-wider uppercase text-slate-900 group-hover:text-[#5B3DE0] transition-colors leading-tight">
                  {personalInfo.name}
                </span>
                <span className="text-[10px] font-semibold tracking-widest text-slate-600 uppercase">
                  {personalInfo.navbarSubtitle}
                </span>
              </div>
            </a>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">{personalInfo.footerBio}</p>
            <div className="text-xs text-slate-600 font-medium">
              {personalInfo.location} • {personalInfo.drivingLicense}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {navigation.map((item) => (
                <li key={item.id}>
                  <a href={`/${item.href}`.replace(/^\/#/, "/#")} className="text-slate-500 hover:text-[#5B3DE0] transition-colors font-medium">
                    {item.name.charAt(0) + item.name.slice(1).toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Direct Channels</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={personalInfo.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-emerald-600 flex items-center gap-2 font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-500" />
                  <span>WhatsApp Direct ({personalInfo.phone})</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socialLinks.email}
                  className="text-slate-600 hover:text-[#5B3DE0] flex items-center gap-2 font-medium transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#5B3DE0]" />
                  <span>{personalInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-blue-600 flex items-center gap-2 font-medium transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">{footer.newsletterHeading}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{footer.newsletterCopy}</p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  id="footer-newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-label="Email address for newsletter"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-[#5B3DE0] focus:outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-[#5B3DE0] hover:bg-[#4A2EC4] text-white flex items-center justify-center transition-colors shadow-xs"
                  aria-label="Subscribe to newsletter"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && <p className="text-[11px] text-emerald-600 font-bold">Thank you for connecting!</p>}
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. {footer.copyrightSuffix}
          </p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 inline" />
            <span>{footer.designedWith}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
