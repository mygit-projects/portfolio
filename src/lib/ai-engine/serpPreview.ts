import type { SerpPreview } from "@/content/types";

const TITLE_LIMIT_PX = 580;
const DESCRIPTION_LIMIT_PX = 920;

export function estimateArialPx(text: string, fontPx: number): number {
  let width = 0;
  for (const char of text) {
    if (char === " ") {
      width += fontPx * 0.33;
    } else if ("MW@".includes(char)) {
      width += fontPx * 0.88;
    } else if ("iljtI.,:'|!".includes(char)) {
      width += fontPx * 0.28;
    } else if (char === char.toUpperCase() && /[A-Z0-9]/.test(char)) {
      width += fontPx * 0.66;
    } else {
      width += fontPx * 0.5;
    }
  }
  return Math.round(width);
}

export function buildSerpPreview(title: string, description: string, displayUrl: string): SerpPreview {
  const titlePx = estimateArialPx(title, 20);
  const descriptionPx = estimateArialPx(description, 14);
  return {
    title,
    description,
    displayUrl,
    titlePx,
    descriptionPx,
    titleFits: titlePx <= TITLE_LIMIT_PX && title.trim().length > 0,
    descriptionFits: descriptionPx <= DESCRIPTION_LIMIT_PX && description.trim().length >= 80,
  };
}

export function truncateForSerp(title: string): string {
  if (estimateArialPx(title, 20) <= TITLE_LIMIT_PX) {
    return title;
  }
  let next = title.trim();
  while (next.length > 12 && estimateArialPx(`${next}…`, 20) > TITLE_LIMIT_PX) {
    next = next.slice(0, -1).trimEnd();
  }
  return `${next}…`;
}
