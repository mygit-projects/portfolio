export const PRODUCTION_SITE_URL = "https://iamfaizan.dev";

function stripTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

function isLocalHostUrl(url: string) {
  try {
    const hostname = new URL(url).hostname;
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return /localhost|127\.0\.0\.1/.test(url);
  }
}

/** Public SEO host. Never emits localhost — GSC, sitemap, /ai, and llms.txt use this. */
export function getPublicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    const normalized = stripTrailingSlash(configured);
    if (!isLocalHostUrl(normalized)) {
      return normalized;
    }
  }
  return PRODUCTION_SITE_URL;
}

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) {
    return configured;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
