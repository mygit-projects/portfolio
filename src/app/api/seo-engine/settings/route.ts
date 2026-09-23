import { NextResponse } from "next/server";
import { getEngineSettings, saveEngineSettings } from "@/lib/ai-engine/engineSettings";
import type { EngineMode } from "@/lib/ai-engine/policy";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";
import type { LlmProvider } from "@/lib/ai-engine/types";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }
  const settings = await getEngineSettings();
  return NextResponse.json({ ok: true, settings });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    mode?: EngineMode;
    providerPreference?: LlmProvider | "";
  };
  if (body.mode && body.mode !== "suggest" && body.mode !== "auto-safe") {
    return NextResponse.json({ ok: false, error: "Invalid mode." }, { status: 422 });
  }

  const settings = await saveEngineSettings({
    mode: body.mode,
    providerPreference: body.providerPreference,
  });
  return NextResponse.json({ ok: true, settings });
}