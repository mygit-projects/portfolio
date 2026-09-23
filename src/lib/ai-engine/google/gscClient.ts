import type { GscRow, GscSnapshot } from "./types";

function dateDaysAgo(days: number): string {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}

async function gscQuery(accessToken: string, siteUrl: string, dimensions: string[]): Promise<GscRow[]> {
  const response = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: dateDaysAgo(28),
        endDate: dateDaysAgo(1),
        dimensions,
        rowLimit: 25,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Search Console query failed (${response.status}).`);
  }

  const payload = (await response.json()) as { rows?: GscRow[] };
  return payload.rows ?? [];
}

export async function listGscSites(accessToken: string): Promise<Array<{ siteUrl: string; permissionLevel?: string }>> {
  const response = await fetch("https://searchconsole.googleapis.com/webmasters/v3/sites", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`Search Console sites failed (${response.status}).`);
  }
  const payload = (await response.json()) as { siteEntry?: Array<{ siteUrl: string; permissionLevel?: string }> };
  return payload.siteEntry ?? [];
}

export async function fetchGscSnapshot(accessToken: string, siteUrl: string): Promise<GscSnapshot> {
  const [totals, queries, pages, countries] = await Promise.all([
    gscQuery(accessToken, siteUrl, []),
    gscQuery(accessToken, siteUrl, ["query"]),
    gscQuery(accessToken, siteUrl, ["page"]),
    gscQuery(accessToken, siteUrl, ["country"]),
  ]);

  const total = totals[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };

  return {
    siteUrl,
    totals: {
      clicks: total.clicks ?? 0,
      impressions: total.impressions ?? 0,
      ctr: total.ctr ?? 0,
      position: total.position ?? 0,
    },
    queries: queries.map((row) => ({
      query: row.keys?.[0] ?? "",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    })),
    pages: pages.map((row) => ({
      page: row.keys?.[0] ?? "",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    })),
    countries: countries.map((row) => ({
      country: row.keys?.[0] ?? "",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
    })),
  };
}
