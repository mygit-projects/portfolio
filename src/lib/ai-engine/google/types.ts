export interface GoogleIntegrationRecord {
  id: string;
  provider: "google";
  connected_email: string | null;
  refresh_token: string | null;
  access_token: string | null;
  access_token_expires_at: string | null;
  gsc_site_url: string | null;
  ga4_property_id: string | null;
  gbp_account_name: string | null;
  gbp_location_name: string | null;
}

export interface GscRow {
  keys?: string[];
  clicks?: number;
  impressions?: number;
  ctr?: number;
  position?: number;
}

export interface GscSnapshot {
  siteUrl?: string;
  totals: { clicks: number; impressions: number; ctr: number; position: number };
  queries: Array<{ query: string; clicks: number; impressions: number; ctr: number; position: number }>;
  pages: Array<{ page: string; clicks: number; impressions: number; ctr: number; position: number }>;
  countries: Array<{ country: string; clicks: number; impressions: number }>;
}

export interface Ga4Snapshot {
  propertyId?: string;
  sessions: number;
  engagedSessions: number;
  landingPages: Array<{ page: string; sessions: number }>;
  countries: Array<{ country: string; sessions: number }>;
  sources: Array<{ source: string; sessions: number }>;
}

export interface GbpSnapshot {
  locationName?: string;
  title?: string;
  address?: string;
  mapsUri?: string;
  rating?: number;
  reviewCount?: number;
  categories?: string[];
}

export interface InsightSnapshotPayload {
  gsc?: GscSnapshot;
  ga4?: Ga4Snapshot;
  gbp?: GbpSnapshot;
}
