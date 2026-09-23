import { NextResponse } from "next/server";
import { getLatestInsightSummary, syncGoogleInsights } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

export async function POST() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  try {
    await syncGoogleInsights();
    const insights = await getLatestInsightSummary();
    return NextResponse.json({ ok: true, insights });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Google sync failed." },
      { status: 502 },
    );
  }
}
