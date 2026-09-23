import type { EngineMode } from "./policy";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import type { LlmProvider } from "./types";

export interface SeoEngineSettings {
  mode: EngineMode;
  providerPreference: LlmProvider | "";
}

const DEFAULT_SETTINGS: SeoEngineSettings = {
  mode: "suggest",
  providerPreference: "",
};

export async function getEngineSettings(): Promise<SeoEngineSettings> {
  const admin = createSupabaseAdminClient();
  if (!admin) return DEFAULT_SETTINGS;
  const { data, error } = await admin.from("seo_engine_settings").select("mode, provider_preference").limit(1).maybeSingle();
  if (error || !data) return DEFAULT_SETTINGS;
  const mode = data.mode === "auto-safe" ? "auto-safe" : "suggest";
  const provider = data.provider_preference;
  return {
    mode,
    providerPreference: provider === "gemini" ? provider : "",
  };
}

export async function saveEngineSettings(next: Partial<SeoEngineSettings>): Promise<SeoEngineSettings> {
  const current = await getEngineSettings();
  const merged: SeoEngineSettings = {
    mode: next.mode ?? current.mode,
    providerPreference: next.providerPreference ?? current.providerPreference,
  };
  const admin = createSupabaseAdminClient();
  if (!admin) return merged;
  const { data: existing } = await admin.from("seo_engine_settings").select("id").limit(1).maybeSingle();
  const payload = {
    mode: merged.mode,
    provider_preference: merged.providerPreference || null,
    updated_at: new Date().toISOString(),
  };
  if (existing?.id) {
    await admin.from("seo_engine_settings").update(payload).eq("id", existing.id);
  } else {
    await admin.from("seo_engine_settings").insert(payload);
  }
  return merged;
}