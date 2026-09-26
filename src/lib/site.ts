export const PRODUCTION_SITE_URL = "https://iamfaizan.dev";
export const PRODUCTION_HOST = "iamfaizan.dev";

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

/** Force marketing/SEO URLs onto the apex host (no www, no preview hosts). */
export function normalizePublicSiteUrl(url: string): string {
  const normalized = stripTrailingSlash(url.trim());
  if (!normalized || isLocalHostUrl(normalized)) {
    return PRODUCTION_SITE_URL;
  }

  try {
    const parsed = new URL(normalized.includes("://") ? normalized : `https://${normalized}`);
    const host = parsed.hostname.replace(/^www\./i, "").toLowerCase();
    if (host === PRODUCTION_HOST) {
      return PRODUCTION_SITE_URL;
    }
  } catch {
    // Fall through to apex.
  }

  return PRODUCTION_SITE_URL;
}

/** Public SEO host. Always https://iamfaizan.dev — never localhost or www. */
export function getPublicSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return normalizePublicSiteUrl(configured);
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
