import type { IndexationRow } from "@/content/types";

interface InspectResponse {
  inspectionResult?: {
    indexStatusResult?: {
      coverageState?: string;
      indexingState?: string;
      lastCrawlTime?: string;
      crawledAs?: string;
      verdict?: string;
    };
  };
  error?: { message?: string };
}

export async function inspectIndexedUrl(
  accessToken: string,
  siteUrl: string,
  inspectionUrl: string,
): Promise<IndexationRow> {
  const response = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl, siteUrl }),
  });

  if (!response.ok) {
    return { url: inspectionUrl, error: `Inspection failed (${response.status}).` };
  }

  const payload = (await response.json()) as InspectResponse;
  const status = payload.inspectionResult?.indexStatusResult;
  return {
    url: inspectionUrl,
    coverageState: status?.coverageState,
    indexingState: status?.indexingState,
    lastCrawlTime: status?.lastCrawlTime,
    crawledAs: status?.crawledAs,
    verdict: status?.verdict,
    error: payload.error?.message,
  };
}
