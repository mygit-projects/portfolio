import type { RenderAuditSnapshot } from "@/content/types";
import { getSiteUrl } from "@/lib/site";

function extractAll(html: string, pattern: RegExp): string[] {
  return [...html.matchAll(pattern)].map((match) => match[1]?.replace(/<[^>]+>/g, "").trim()).filter(Boolean);
}

export async function fetchRenderedAudit(path: string): Promise<RenderAuditSnapshot> {
  const url = `${getSiteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "MuhammadFaizanSeoEngine/1.0" },
      cache: "no-store",
    });
    if (!response.ok) {
      return { fetched: false, url, h1: [], headings: [], imageAlts: [], missingAlt: 0, jsonLdTypes: [], error: `HTTP ${response.status}` };
    }
    const html = await response.text();
    const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.replace(/\s+/g, " ").trim();
    const canonical = html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
      ?? html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i)?.[1];
    const h1 = extractAll(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi);
    const h2 = extractAll(html, /<h2\b[^>]*>([\s\S]*?)<\/h2>/gi);
    const h3 = extractAll(html, /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi);
    const images = [...html.matchAll(/<img\b([^>]*)>/gi)].map((match) => match[1] ?? "");
    const imageAlts = images.map((attrs) => attrs.match(/alt=["']([^"']*)["']/)?.[1] ?? "");
    const missingAlt = imageAlts.filter((alt) => !alt.trim()).length;
    const jsonLdTypes = [...html.matchAll(/"@type"\s*:\s*"([^"]+)"/g)].map((match) => match[1]);

    return {
      fetched: true,
      url,
      title,
      canonical,
      h1,
      headings: [
        ...h1.map((text) => ({ level: 1 as const, text })),
        ...h2.map((text) => ({ level: 2 as const, text })),
        ...h3.map((text) => ({ level: 3 as const, text })),
      ],
      imageAlts,
      missingAlt,
      jsonLdTypes,
    };
  } catch (error) {
    return {
      fetched: false,
      url,
      h1: [],
      headings: [],
      imageAlts: [],
      missingAlt: 0,
      jsonLdTypes: [],
      error: error instanceof Error ? error.message : "Render fetch failed.",
    };
  } finally {
    clearTimeout(timer);
  }
}
