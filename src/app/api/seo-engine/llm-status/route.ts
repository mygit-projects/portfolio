import { NextResponse } from "next/server";
import { probeLlmProviders } from "@/lib/ai-engine/llmClient";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

export async function POST() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const result = await probeLlmProviders();
  return NextResponse.json({ ok: true, ...result });
}