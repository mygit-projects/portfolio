import { cache } from "react";
import { portfolioData } from "./portfolioData";
import type { PortfolioContent } from "./types";
import { assemblePortfolio } from "@/lib/cms/schemas";
import { ATF_KEYS, BELOW_KEYS, SECTION_KEYS, type SectionKey } from "@/lib/cms/sections";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { isSupabaseConfigured } from "@/lib/supabase/env";

async function getPortfolioByKeys(keys: readonly SectionKey[]): Promise<PortfolioContent> {
  if (!isSupabaseConfigured()) {
    return portfolioData;
  }

  const client = createSupabasePublicClient();
  if (!client) {
    return portfolioData;
  }

  const { data, error } = await client.from("content_sections").select("key, data").in("key", [...keys]);
  if (error) {
    console.error("[getPortfolio] Supabase read failed:", error.message);
    return portfolioData;
  }

  if (!data?.length) {
    console.warn("[getPortfolio] content_sections is empty; using static fallback. Run npm run seed:supabase.");
    return portfolioData;
  }

  return assemblePortfolio(data, portfolioData);
}

export const getPortfolioFresh = cache(async (): Promise<PortfolioContent> => {
  return getPortfolioByKeys(SECTION_KEYS);
});

export async function getPortfolio(): Promise<PortfolioContent> {
  if (!isSupabaseConfigured()) {
    return portfolioData;
  }

  return getPortfolioFresh();
}

export const getAboveTheFoldPortfolio = cache(async () => getPortfolioByKeys(ATF_KEYS));

export const getBelowTheFoldPortfolio = cache(async () => getPortfolioByKeys(BELOW_KEYS));
