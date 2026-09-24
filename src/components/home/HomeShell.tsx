"use client";

import type { ReactNode } from "react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { HomeActionsProvider, useHomeActions } from "./HomeActions";
import { CvModalSkeleton } from "./HomeSkeletons";

function HomeShellInner({ children }: { children: ReactNode }) {
  const { isCvOpen, belowReady, closeCv } = useHomeActions();

  return (
    <div className="relative min-h-screen bg-[#F8F9FD] pb-24 text-[#2A2E3D] selection:bg-[#7C5CFC]/20 selection:text-[#5B3DE0] md:pb-0">
      <ParticleBackground />
      {children}
      {isCvOpen && !belowReady ? <CvModalSkeleton onClose={closeCv} /> : null}
    </div>
  );
}

export function HomeShell({ children }: { children: ReactNode }) {
  return (
    <HomeActionsProvider>
      <HomeShellInner>{children}</HomeShellInner>
    </HomeActionsProvider>
  );
}
