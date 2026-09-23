import { NextResponse } from "next/server";
import { deleteGoogleIntegration } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

export async function POST() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  await deleteGoogleIntegration();
  return NextResponse.json({ ok: true });
}
