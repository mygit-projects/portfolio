import type { Ga4Snapshot } from "./types";

interface Ga4AccountSummaries {
  accountSummaries?: Array<{
    displayName?: string;
    propertySummaries?: Array<{ property: string; displayName?: string }>;
  }>;
}

interface Ga4Report {
  rows?: Array<{
    dimensionValues?: Array<{ value?: string }>;
    metricValues?: Array<{ value?: string }>;
  }>;
}

function num(row: Ga4Report["rows"], index = 0): number {
  return Number(row?.[0]?.metricValues?.[index]?.value ?? 0);
}

async function runReport(
  accessToken: string,
  propertyId: string,
  dimensions: string[],
  metrics: string[],
): Promise<Ga4Report> {
  const property = propertyId.startsWith("properties/") ? propertyId : `properties/${propertyId}`;
  const response = await fetch(`https://analyticsdata.googleapis.com/v1beta/${property}:runReport`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit: 15,
    }),
  });

  if (!response.ok) {
    throw new Error(`GA4 report failed (${response.status}).`);
  }

  return (await response.json()) as Ga4Report;
}

export async function listGa4Properties(accessToken: string): Promise<Array<{ id: string; name: string }>> {
  const response = await fetch("https://analyticsadmin.googleapis.com/v1beta/accountSummaries", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`GA4 properties failed (${response.status}).`);
  }
  const payload = (await response.json()) as Ga4AccountSummaries;
  return (payload.accountSummaries ?? []).flatMap((account) =>
    (account.propertySummaries ?? []).map((property) => ({
      id: property.property,
      name: `${account.displayName ?? "Account"} / ${property.displayName ?? property.property}`,
    })),
  );
}

export async function fetchGa4Snapshot(accessToken: string, propertyId: string): Promise<Ga4Snapshot> {
  const [totals, landing, countries, sources] = await Promise.all([
    runReport(accessToken, propertyId, [], ["sessions", "engagedSessions"]),
    runReport(accessToken, propertyId, ["landingPagePlusQueryString"], ["sessions"]),
    runReport(accessToken, propertyId, ["country"], ["sessions"]),
    runReport(accessToken, propertyId, ["sessionSource"], ["sessions"]),
  ]);

  return {
    propertyId,
    sessions: num(totals.rows, 0),
    engagedSessions: num(totals.rows, 1),
    landingPages: (landing.rows ?? []).map((row) => ({
      page: row.dimensionValues?.[0]?.value ?? "/",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })),
    countries: (countries.rows ?? []).map((row) => ({
      country: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })),
    sources: (sources.rows ?? []).map((row) => ({
      source: row.dimensionValues?.[0]?.value ?? "",
      sessions: Number(row.metricValues?.[0]?.value ?? 0),
    })),
  };
}
