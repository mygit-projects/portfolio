import { createClient } from "@supabase/supabase-js";
import { getSupabasePublicEnv, getSupabaseServiceRoleKey } from "./env";

export function createSupabaseAdminClient() {
  const env = getSupabasePublicEnv();
  const serviceRole = getSupabaseServiceRoleKey();
  if (!env || !serviceRole) {
    return null;
  }
  return createClient(env.url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
