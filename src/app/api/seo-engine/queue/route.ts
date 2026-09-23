import { NextResponse } from "next/server";
import { getPortfolioFresh } from "@/content/getPortfolio";
import { applyOptimizePatch } from "@/lib/ai-engine/optimize";
import { getEngineLogByRunId } from "@/lib/ai-engine/engineLog";
import { pinFieldPaths } from "@/lib/ai-engine/fieldPins";
import { patchHasChanges, policyPathsFromPatch } from "@/lib/ai-engine/policy";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";
import { saveSections } from "@/app/admin/actions";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    runId?: string;
    action?: "accept" | "dismiss";
    pin?: boolean;
  };

  if (!body.runId || (body.action !== "accept" && body.action !== "dismiss")) {
    return NextResponse.json({ ok: false, error: "Provide runId and accept or dismiss." }, { status: 422 });
  }

  const row = await getEngineLogByRunId(body.runId);
  if (!row) {
    return NextResponse.json({ ok: false, error: "Engine run not found." }, { status: 404 });
  }

  if (body.action === "dismiss") {
    if (body.pin !== false && patchHasChanges(row.queued)) {
      await pinFieldPaths(policyPathsFromPatch(row.queued), "Dismissed AI proposal");
    }
    return NextResponse.json({ ok: true, dismissed: true });
  }

  if (!patchHasChanges(row.queued)) {
    return NextResponse.json({ ok: false, error: "Nothing queued on that run." }, { status: 422 });
  }

  const portfolio = await getPortfolioFresh();
  const sections = applyOptimizePatch(portfolio, row.queued);
  const saved = await saveSections(sections, { pin: false });
  if (!saved.ok) {
    return NextResponse.json({ ok: false, error: saved.error }, { status: 500 });
  }
  return NextResponse.json({ ok: true, accepted: true, sections });
}