import { getPortfolio } from "@/content/getPortfolio";
import { buildLlmsTxt } from "@/lib/ai-engine/claims";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const portfolio = await getPortfolio();
  return new Response(buildLlmsTxt(portfolio), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
}
