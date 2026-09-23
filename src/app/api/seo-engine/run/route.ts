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

  const body = (await request.json().catch(() => ({}))) as {
    target?: string;
    optimize?: boolean;
    live?: boolean;
  };
  const parsed = seoAuditTargetSchema.safeParse(body.target ?? "homepage");
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Invalid engine target." }, { status: 422 });
  }

  const optimize = body.optimize === true;
  const result = await runSeoEngine({
    target: parsed.data,
    optimize,
    live: optimize ? body.live !== false : false,
    syncGoogle: false,
  });
  return NextResponse.json({ ok: true, ...result });
}
