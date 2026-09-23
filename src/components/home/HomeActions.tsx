"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type HomeActions = {
  openContact: () => void;
  closeContact: () => void;
  openCv: () => void;
  closeCv: () => void;
  isContactOpen: boolean;
  isCvOpen: boolean;
  belowReady: boolean;
  setBelowReady: (ready: boolean) => void;
};

const HomeActionsContext = createContext<HomeActions | null>(null);

export function HomeActionsProvider({ children }: { children: ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [belowReady, setBelowReady] = useState(false);

  const openContact = useCallback(() => setIsContactOpen(true), []);
  const closeContact = useCallback(() => setIsContactOpen(false), []);
  const openCv = useCallback(() => setIsCvOpen(true), []);
  const closeCv = useCallback(() => setIsCvOpen(false), []);

  const value = useMemo(
    () => ({
      openContact,
      closeContact,
      openCv,
      closeCv,
      isContactOpen,
      isCvOpen,
      belowReady,
      setBelowReady,
    }),
    [openContact, closeContact, openCv, closeCv, isContactOpen, isCvOpen, belowReady],
  );

  return <HomeActionsContext.Provider value={value}>{children}</HomeActionsContext.Provider>;
}

export function useHomeActions(): HomeActions {
  const context = useContext(HomeActionsContext);
  if (!context) {
    throw new Error("useHomeActions must be used within HomeActionsProvider");
  }
  return context;
}
