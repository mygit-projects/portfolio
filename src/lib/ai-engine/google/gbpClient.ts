import type { GbpSnapshot } from "./types";

interface GbpAccount {
  name?: string;
  accountName?: string;
}

interface GbpLocation {
  name?: string;
  title?: string;
  storefrontAddress?: { addressLines?: string[]; locality?: string; administrativeArea?: string };
  metadata?: { mapsUri?: string };
  categories?: { primaryCategory?: { displayName?: string }; additionalCategories?: Array<{ displayName?: string }> };
}

export async function listGbpAccounts(accessToken: string): Promise<Array<{ name: string; title: string }>> {
  const response = await fetch("https://mybusinessaccountmanagement.googleapis.com/v1/accounts", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`Business Profile accounts failed (${response.status}).`);
  }
  const payload = (await response.json()) as { accounts?: GbpAccount[] };
  return (payload.accounts ?? []).map((account) => ({
    name: account.name ?? "",
    title: account.accountName ?? account.name ?? "Business account",
  }));
}

export async function listGbpLocations(
  accessToken: string,
  accountName: string,
): Promise<Array<{ name: string; title: string }>> {
  const response = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title,storefrontAddress`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!response.ok) {
    throw new Error(`Business Profile locations failed (${response.status}).`);
  }
  const payload = (await response.json()) as { locations?: GbpLocation[] };
  return (payload.locations ?? []).map((location) => ({
    name: location.name ?? "",
    title: location.title ?? location.name ?? "Location",
  }));
}

export async function fetchGbpSnapshot(accessToken: string, locationName: string): Promise<GbpSnapshot> {
  const infoResponse = await fetch(
    `https://mybusinessbusinessinformation.googleapis.com/v1/${locationName}?readMask=name,title,storefrontAddress,metadata,categories`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  if (!infoResponse.ok) {
    throw new Error(`Business Profile location failed (${infoResponse.status}).`);
  }
  const location = (await infoResponse.json()) as GbpLocation;

  let rating: number | undefined;
  let reviewCount: number | undefined;
  try {
    const reviewsResponse = await fetch(`https://mybusiness.googleapis.com/v4/${locationName}/reviews`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (reviewsResponse.ok) {
      const reviews = (await reviewsResponse.json()) as {
        averageRating?: number;
        totalReviewCount?: number;
      };
      rating = reviews.averageRating;
      reviewCount = reviews.totalReviewCount;
    }
  } catch {
    rating = undefined;
  }

  const categories = [
    location.categories?.primaryCategory?.displayName,
    ...(location.categories?.additionalCategories?.map((item) => item.displayName) ?? []),
  ].filter((item): item is string => Boolean(item));

  const addressParts = [
    ...(location.storefrontAddress?.addressLines ?? []),
    location.storefrontAddress?.locality,
    location.storefrontAddress?.administrativeArea,
  ].filter(Boolean);

  return {
    locationName,
    title: location.title,
    address: addressParts.join(", "),
    mapsUri: location.metadata?.mapsUri,
    rating,
    reviewCount,
    categories,
  };
}
