import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv } from "./env";

export function createSupabasePublicClient() {
  const env = getSupabasePublicEnv();
  if (!env) {
    return null;
  }
  return createClient(env.url, env.anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
