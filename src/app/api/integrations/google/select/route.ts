import { NextResponse } from "next/server";
import { z } from "zod";
import { listGbpLocations } from "@/lib/ai-engine/google/gbpClient";
import { getValidGoogleAccessToken, upsertGoogleIntegration } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

const schema = z.object({
  gscSiteUrl: z.string().min(1).optional().nullable(),
  ga4PropertyId: z.string().min(1).optional().nullable(),
  gbpAccountName: z.string().min(1).optional().nullable(),
  gbpLocationName: z.string().min(1).optional().nullable(),
});

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid property selection." }, { status: 422 });
  }

  await upsertGoogleIntegration({
    gsc_site_url: parsed.data.gscSiteUrl ?? null,
    ga4_property_id: parsed.data.ga4PropertyId ?? null,
    gbp_account_name: parsed.data.gbpAccountName ?? null,
    gbp_location_name: parsed.data.gbpLocationName ?? null,
  });

  let gbpLocations: Array<{ name: string; title: string }> = [];
  if (parsed.data.gbpAccountName) {
    const token = await getValidGoogleAccessToken();
    if (token) {
      try {
        gbpLocations = await listGbpLocations(token, parsed.data.gbpAccountName);
      } catch {
        gbpLocations = [];
      }
    }
  }

  return NextResponse.json({ ok: true, gbpLocations });
}
