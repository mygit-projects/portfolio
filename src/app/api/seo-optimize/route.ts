import { NextResponse } from "next/server";
import { seoAuditTargetSchema } from "@/lib/ai-engine/auditRequest";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";
import { runSeoEngine } from "@/lib/ai-engine/runSeoEngine";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { target?: string };
  const parsed = seoAuditTargetSchema.safeParse(body.target ?? "homepage");
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid optimize target." }, { status: 422 });
  }

  try {
    const result = await runSeoEngine({ target: parsed.data, live: true, optimize: true, syncGoogle: false });
    return NextResponse.json({
      ok: true,
      patch: result.queued,
      applied: result.applied,
      rejected: result.rejected,
      runId: result.runId,
      reason: result.reason,
      metrics: result.metrics,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Optimize failed." },
      { status: 502 },
    );
  }
}