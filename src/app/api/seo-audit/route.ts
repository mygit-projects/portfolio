import { NextResponse } from "next/server";
import { getPortfolio } from "@/content/getPortfolio";
import { seoAuditRequestSchema } from "@/lib/ai-engine/auditRequest";
import { collectLiveAuditExtras } from "@/lib/ai-engine/collectLiveAudit";
import { resolveSeoDocument } from "@/lib/ai-engine/documents";
import { getLatestInsightSummary } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";
import { recordScoreHistory } from "@/lib/ai-engine/scoreHistory";
import { analyzeSeoDocument } from "@/lib/ai-engine/seoAnalyzer";

export const runtime = "nodejs";

async function unauthorized() {
  const auth = await requireAdminSession();
  if (auth.user) return null;
  return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
}

export async function GET(request: Request) {
  const denied = await unauthorized();
  if (denied) return denied;

  const url = new URL(request.url);
  const target = url.searchParams.get("target") ?? "homepage";
  const live = url.searchParams.get("live") === "1";
  const [portfolio, insights] = await Promise.all([getPortfolio(), getLatestInsightSummary()]);
  const document = resolveSeoDocument(portfolio, target);
  const extras = await collectLiveAuditExtras(portfolio, document, insights, { live });
  const metrics = analyzeSeoDocument(document, insights, extras);
  if (live) await recordScoreHistory(metrics);
  return NextResponse.json({ ok: true, metrics });
}

export async function POST(request: Request) {
  const denied = await unauthorized();
  if (denied) return denied;

  let rawBody: unknown = {};

  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  const parsed = seoAuditRequestSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid audit payload.", fieldErrors: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  const [portfolio, insights] = await Promise.all([getPortfolio(), getLatestInsightSummary()]);
  const document = resolveSeoDocument(portfolio, parsed.data.target ?? "homepage");
  if (parsed.data.title) document.title = parsed.data.title;
  if (parsed.data.description) document.description = parsed.data.description;
  if (parsed.data.body) document.body = parsed.data.body;

  const extras = await collectLiveAuditExtras(portfolio, document, insights, { live: false });
  const metrics = analyzeSeoDocument(document, insights, extras);
  return NextResponse.json({ ok: true, metrics });
}
