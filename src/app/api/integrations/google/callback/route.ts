import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { exchangeGoogleCode, fetchGoogleEmail } from "@/lib/ai-engine/google/googleOAuth";
import { upsertGoogleIntegration } from "@/lib/ai-engine/google/snapshots";
import { requireAdminSession } from "@/lib/ai-engine/requireAdmin";
import { getSiteUrl } from "@/lib/site";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const siteUrl = getSiteUrl();
  const dest = new URL("/admin/seo-optimizer", siteUrl);
  const auth = await requireAdminSession();
  if (!auth.user) {
    dest.searchParams.set("google", "auth");
    return NextResponse.redirect(dest);
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieStore = await cookies();
  const expected = cookieStore.get("google_oauth_state")?.value;
  cookieStore.delete("google_oauth_state");

  if (!code || !state || !expected || state !== expected) {
    dest.searchParams.set("google", "state");
    return NextResponse.redirect(dest);
  }

  try {
    const tokens = await exchangeGoogleCode(code);
    const email = await fetchGoogleEmail(tokens.access_token);
    await upsertGoogleIntegration({
      connected_email: email,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      access_token_expires_at: new Date(Date.now() + (tokens.expires_in ?? 3600) * 1000).toISOString(),
    });
    dest.searchParams.set("google", "connected");
  } catch {
    dest.searchParams.set("google", "error");
  }

  return NextResponse.redirect(dest);
}
