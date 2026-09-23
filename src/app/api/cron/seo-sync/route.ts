import { NextResponse } from "next/server";
import { runSeoEngine } from "@/lib/ai-engine/runSeoEngine";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET?.trim();
  const header = request.headers.get("authorization");
  if (secret && header !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const result = await runSeoEngine({ target: "homepage", live: true, optimize: true, syncGoogle: true });
  return NextResponse.json({
    ok: true,
    overall: result.metrics.overallScore,
    runId: result.runId,
    reason: result.reason,
    mode: result.settings.mode,
  });
}