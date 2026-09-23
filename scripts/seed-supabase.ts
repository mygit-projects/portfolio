import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import { portfolioData } from "../src/content/portfolioData";
import { SECTION_KEYS, splitPortfolio } from "../src/lib/cms/sections";

function loadLocalEnv() {
  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const projectDir = resolve(scriptDir, "..");
  loadEnvConfig(projectDir);

  const envPath = resolve(projectDir, ".env.local");
  if (!existsSync(envPath)) {
    console.error(`Missing ${envPath}. Copy .env.example and add your Supabase keys.`);
  }
}

async function main() {
  loadLocalEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRole) {
    console.error(
      "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then run npm run seed:supabase again.",
    );
    console.error(
      `Detected URL: ${url ? "yes" : "no"} | service role key: ${serviceRole ? "yes" : "no"}`,
    );
    process.exit(1);
  }

  const supabase = createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const sections = splitPortfolio(portfolioData);
  const rows = SECTION_KEYS.map((key) => ({
    key,
    data: sections[key],
  }));

  const { error } = await supabase.from("content_sections").upsert(rows, { onConflict: "key" });
  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Seeded ${rows.length} content sections into Supabase.`);
}

void main();
