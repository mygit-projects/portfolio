import { NextResponse } from "next/server";
import { getFieldPins, unpinFieldPath } from "@/lib/ai-engine/fieldPins";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";

export const runtime = "nodejs";

export async function GET() {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }
  const pins = await getFieldPins();
  return NextResponse.json({ ok: true, pins });
}

export async function POST(request: Request) {
  const auth = await requireAdminSession();
  if (!auth.user) {
    return NextResponse.json({ ok: false, error: auth.error }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { path?: string };
  if (!body.path) {
    return NextResponse.json({ ok: false, error: "Provide a field path to unpin." }, { status: 422 });
  }
  await unpinFieldPath(body.path);
  return NextResponse.json({ ok: true });
}