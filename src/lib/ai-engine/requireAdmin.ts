import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdminSession() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { user: null, error: "Supabase is not configured." } as const;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, error: "You must be signed in." } as const;
  }

  return { user, error: null } as const;
}
