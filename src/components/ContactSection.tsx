"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, Send, CheckCircle2, Copy, Check, MessageSquare, Sparkles, Globe2 } from "lucide-react";
import { usePortfolio } from "@/content/PortfolioProvider";
import type { ContactApiError, ContactApiSuccess } from "@/lib/contact/schema";

interface ContactSectionProps {
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isModal = false }) => {
  const { personalInfo, contact } = usePortfolio();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: contact.defaultSubject,
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [dubaiTime, setDubaiTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setDubaiTime(formatter.format(new Date()));
      } catch {
        setDubaiTime("12:00 PM GST");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = async () => {
    await navigator.clipboard.writeText(personalInfo.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = (await response.json()) as ContactApiSuccess | ContactApiError;

      if (!response.ok || !payload.ok) {
        const errorPayload = payload as ContactApiError;
        setFormError(errorPayload.error ?? "Unable to send your message.");
        return;
      }

      setSubmitted(true);
    } catch {
      setFormError("Network error. Please try WhatsApp or email instead.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = (customText?: string) => {
    const text = encodeURIComponent(
      customText || "Hi Muhammad Faizan, I came across your portfolio website and would like to discuss a project / role.",
    );
    window.open(`https://wa.me/${personalInfo.whatsapp}?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className={`relative z-10 ${isModal ? "p-0" : "py-20 md:py-28"}`}>
      <div className={`${isModal ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-50/90 via-white to-purple-100/50 p-8 sm:p-12 md:p-14 border border-purple-200/90 shadow-2xl shadow-purple-500/10 overflow-hidden">
          <div className="absolute right-4 bottom-4 md:right-12 md:bottom-8 w-72 h-72 opacity-25 pointer-events-none -z-0">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M20 100L180 20L120 180L90 120L20 100Z" fill="url(#paint0_linear)" stroke="#5B3DE0" strokeWidth="2" />
              <path d="M180 20L90 120" stroke="#5B3DE0" strokeWidth="2" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="paint0_linear" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#5B3DE0" />
                  <stop offset="1" stopColor="#9B82FC" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#5B3DE0] text-xs font-extrabold uppercase tracking-widest mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{contact.section.badge}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  {contact.section.heading}
                </h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{contact.section.description}</p>

              <div className="p-4 rounded-2xl bg-white/95 border border-purple-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#5B3DE0] flex items-center justify-center font-bold">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
                      <span>{contact.dubaiTimeLabel}</span>
                    </div>
                    <div className="text-sm font-black text-[#5B3DE0] font-mono">{dubaiTime || "Loading..."}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {contact.availability}
                </span>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-100/80 text-[#5B3DE0] flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Email Address</div>
                      <a href={`mailto:${personalInfo.email}`} className="text-xs sm:text-sm font-black text-slate-800 hover:text-[#5B3DE0] transition-colors">
                        {personalInfo.email}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copiedEmail ? "Email copied" : "Copy email"}
                    title="Copy Email"
                    className="p-2 rounded-xl text-slate-600 hover:text-[#5B3DE0] hover:bg-purple-50 transition-colors cursor-pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/80 text-emerald-600 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Direct UAE Phone</div>
                      <a href={`tel:${personalInfo.phone}`} className="text-xs sm:text-sm font-black text-slate-800 hover:text-emerald-600 transition-colors">
                        {personalInfo.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    aria-label={copiedPhone ? "Phone copied" : "Copy phone"}
                    title="Copy Phone"
                    className="p-2 rounded-xl text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors cursor-pointer"
                  >
                    {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                  </button>
                </div>

                <button
                  onClick={() => openWhatsApp()}
                  className="w-full py-3 px-4 rounded-2xl bg-[#047857] hover:bg-[#036348] text-white text-xs font-black shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start WhatsApp Chat ({personalInfo.phone})</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-purple-200/80 shadow-xl shadow-purple-500/5 space-y-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Send a Direct Message</h3>
                <p className="text-xs text-slate-500 mt-0.5">Pick a 1-click inquiry template below or draft custom requirements.</p>
              </div>

              <div>
                <div className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider mb-2">Quick Inquiry Templates:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {contact.presets.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, message: preset.text }))}
                      className="p-2.5 rounded-xl bg-purple-50/60 hover:bg-purple-100 text-slate-800 text-[11px] font-bold text-left border border-purple-100 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-black text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Thank you, {formData.name || "there"}. I will review your requirements and get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: contact.defaultSubject, message: "" });
                    }}
                    className="text-xs font-extrabold text-[#5B3DE0] hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={contact.formNamePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5B3DE0] focus:bg-white transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-extrabold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={contact.formEmailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5B3DE0] focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-extrabold text-slate-700 mb-1.5">
                      Subject / Topic
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      autoComplete="off"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5B3DE0] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-extrabold text-slate-700 mb-1.5">
                      Message & Requirements *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={contact.formMessagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#5B3DE0] focus:bg-white transition-all resize-none"
                    />
                  </div>
                  {formError && (
                    <p className="text-xs font-semibold text-rose-600">{formError}</p>
                  )}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-600 font-semibold">{contact.responseSla}</span>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-xl bg-[#5B3DE0] hover:bg-[#4A2EC4] text-white text-xs font-black shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
