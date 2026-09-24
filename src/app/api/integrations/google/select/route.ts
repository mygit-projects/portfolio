import { NextResponse } from "next/server";
import { z } from "zod";
import { listGbpLocations } from "@/lib/ai-engine/google/gbpClient";
import { getValidGoogleAccessToken, upsertGoogleIntegration } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

const optionalId = z.preprocess(
  (value) => (typeof value === "string" && value.trim() === "" ? null : value),
  z.string().min(1).nullable().optional(),
);

const schema = z.object({
  gscSiteUrl: optionalId,
  ga4PropertyId: optionalId,
  gbpAccountName: optionalId,
  gbpLocationName: optionalId,
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

  if (
    !parsed.data.gscSiteUrl &&
    !parsed.data.ga4PropertyId &&
    !parsed.data.gbpAccountName &&
    !parsed.data.gbpLocationName
  ) {
    return NextResponse.json({ ok: false, error: "Select at least one Google property to save." }, { status: 422 });
  }

  try {
    await upsertGoogleIntegration({
      gsc_site_url: parsed.data.gscSiteUrl ?? null,
      ga4_property_id: parsed.data.ga4PropertyId ?? null,
      gbp_account_name: parsed.data.gbpAccountName ?? null,
      gbp_location_name: parsed.data.gbpLocationName ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Could not save Google properties." },
      { status: 500 },
    );
  }

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

  return NextResponse.json({
    ok: true,
    gbpLocations,
    saved: {
      gscSiteUrl: parsed.data.gscSiteUrl ?? null,
      ga4PropertyId: parsed.data.ga4PropertyId ?? null,
      gbpAccountName: parsed.data.gbpAccountName ?? null,
      gbpLocationName: parsed.data.gbpLocationName ?? null,
    },
  });
}
