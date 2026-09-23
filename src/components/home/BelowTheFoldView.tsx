"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { CvModal } from "@/components/CvModal";
import { useHomeActions } from "./HomeActions";

const ProjectsSection = dynamic(
  () => import("@/components/ProjectsSection").then((mod) => mod.ProjectsSection),
  { ssr: true },
);
const ServicesSection = dynamic(
  () => import("@/components/ServicesSection").then((mod) => mod.ServicesSection),
  { ssr: true },
);
const TestimonialBanner = dynamic(
  () => import("@/components/TestimonialBanner").then((mod) => mod.TestimonialBanner),
  { ssr: true },
);
const SkillsSection = dynamic(
  () => import("@/components/SkillsSection").then((mod) => mod.SkillsSection),
  { ssr: true },
);
const ProcessSection = dynamic(
  () => import("@/components/ProcessSection").then((mod) => mod.ProcessSection),
  { ssr: true },
);
const ExperienceTimeline = dynamic(
  () => import("@/components/ExperienceTimeline").then((mod) => mod.ExperienceTimeline),
  { ssr: true },
);
const EducationSection = dynamic(
  () => import("@/components/EducationSection").then((mod) => mod.EducationSection),
  { ssr: true },
);
const FaqSection = dynamic(
  () => import("@/components/FaqSection").then((mod) => mod.FaqSection),
  { ssr: true },
);
const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((mod) => mod.ContactSection),
  { ssr: true },
);
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  { ssr: true },
);

export function BelowTheFoldView() {
  const { openContact, isCvOpen, closeCv, setBelowReady } = useHomeActions();

  useEffect(() => {
    setBelowReady(true);
    return () => setBelowReady(false);
  }, [setBelowReady]);

  return (
    <>
      <main>
        <ProjectsSection onOpenContact={openContact} />
        <ServicesSection onOpenContact={openContact} />
        <TestimonialBanner />
        <SkillsSection />
        <ProcessSection />
        <ExperienceTimeline />
        <EducationSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <CvModal
        isOpen={isCvOpen}
        onClose={closeCv}
        onOpenContact={() => {
          closeCv();
          openContact();
        }}
      />
    </>
  );
}
