import type { CoreWebVitalsSnapshot } from "@/content/types";

interface CruxResponse {
  record?: {
    metrics?: {
      largest_contentful_paint?: { percentiles?: { p75?: number } };
      interaction_to_next_paint?: { percentiles?: { p75?: number } };
      cumulative_layout_shift?: { percentiles?: { p75?: number } };
    };
  };
  error?: { message?: string };
}

interface PsiResponse {
  lighthouseResult?: { categories?: { performance?: { score?: number } } };
  loadingExperience?: {
    metrics?: {
      LARGEST_CONTENTFUL_PAINT_MS?: { percentile?: number };
      INTERACTION_TO_NEXT_PAINT?: { percentile?: number };
      CUMULATIVE_LAYOUT_SHIFT_SCORE?: { percentile?: number };
    };
  };
}

export async function fetchCoreWebVitals(url: string): Promise<CoreWebVitalsSnapshot> {
  const key = process.env.PAGESPEED_API_KEY?.trim() || process.env.GOOGLE_PSI_API_KEY?.trim();
  try {
    const crux = await fetch("https://chromeuxreport.googleapis.com/v1/records:queryRecord", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origin: new URL(url).origin, formFactor: "PHONE" }),
    });
    if (crux.ok) {
      const payload = (await crux.json()) as CruxResponse;
      if (payload.record?.metrics) {
        return {
          source: "crux",
          lcpMs: payload.record.metrics.largest_contentful_paint?.percentiles?.p75,
          inpMs: payload.record.metrics.interaction_to_next_paint?.percentiles?.p75,
          cls: payload.record.metrics.cumulative_layout_shift?.percentiles?.p75,
        };
      }
    }
  } catch {
    // Fall through to PSI.
  }

  try {
    const endpoint = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    endpoint.searchParams.set("url", url);
    endpoint.searchParams.set("category", "PERFORMANCE");
    endpoint.searchParams.set("strategy", "mobile");
    if (key) endpoint.searchParams.set("key", key);
    const psi = await fetch(endpoint, { cache: "no-store" });
    if (!psi.ok) {
      return { source: "none", error: `PageSpeed failed (${psi.status}).` };
    }
    const payload = (await psi.json()) as PsiResponse;
    const metrics = payload.loadingExperience?.metrics;
    return {
      source: "psi",
      performanceScore: Math.round((payload.lighthouseResult?.categories?.performance?.score ?? 0) * 100),
      lcpMs: metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile,
      inpMs: metrics?.INTERACTION_TO_NEXT_PAINT?.percentile,
      cls: metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
        ? metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
        : undefined,
    };
  } catch (error) {
    return { source: "none", error: error instanceof Error ? error.message : "Vitals fetch failed." };
  }
}
