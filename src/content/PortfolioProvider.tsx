"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { PortfolioContent } from "@/content/types";

const PortfolioContext = createContext<PortfolioContent | null>(null);

export function PortfolioProvider({
  value,
  children,
}: {
  value: PortfolioContent;
  children: ReactNode;
}) {
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio(): PortfolioContent {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within PortfolioProvider");
  }
  return context;
}
