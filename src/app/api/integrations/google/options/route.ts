import { NextResponse } from "next/server";
import { listGa4Properties } from "@/lib/ai-engine/google/ga4Client";
import { listGbpAccounts, listGbpLocations } from "@/lib/ai-engine/google/gbpClient";
import { listGscSites } from "@/lib/ai-engine/google/gscClient";
import { getValidGoogleAccessToken, getGoogleIntegration } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const accessToken = await getValidGoogleAccessToken();
  if (!accessToken) {
    return NextResponse.json({ ok: false, error: "Google is not connected." }, { status: 409 });
  }

  const integration = await getGoogleIntegration();
  const [gscSites, ga4Properties, gbpAccounts] = await Promise.allSettled([
    listGscSites(accessToken),
    listGa4Properties(accessToken),
    listGbpAccounts(accessToken),
  ]);

  let gbpLocations: Array<{ name: string; title: string }> = [];
  if (integration?.gbp_account_name) {
    try {
      gbpLocations = await listGbpLocations(accessToken, integration.gbp_account_name);
    } catch {
      gbpLocations = [];
    }
  }

  return NextResponse.json({
    ok: true,
    gscSites: gscSites.status === "fulfilled" ? gscSites.value : [],
    ga4Properties: ga4Properties.status === "fulfilled" ? ga4Properties.value : [],
    gbpAccounts: gbpAccounts.status === "fulfilled" ? gbpAccounts.value : [],
    gbpLocations,
    errors: {
      gsc: gscSites.status === "rejected" ? String(gscSites.reason) : null,
      ga4: ga4Properties.status === "rejected" ? String(ga4Properties.reason) : null,
      gbp: gbpAccounts.status === "rejected" ? String(gbpAccounts.reason) : null,
    },
  });
}
