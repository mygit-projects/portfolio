"use client";

import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ContactModal } from "@/components/ContactModal";
import { useHomeActions } from "./HomeActions";

export function AboveTheFoldView() {
  const { openContact, openCv, isContactOpen, closeContact } = useHomeActions();

  return (
    <>
      <Navbar onOpenContact={openContact} onOpenCvModal={openCv} />
      <HeroSection onOpenContact={openContact} onOpenCvModal={openCv} />
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
    </>
  );
}
