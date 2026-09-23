"use server";

import { revalidatePath } from "next/cache";
import { pinFieldPaths } from "@/lib/ai-engine/fieldPins";
import { policyPathsFromSections } from "@/lib/ai-engine/policy";
import { sectionSchemas } from "@/lib/cms/schemas";
import { revalidatePortfolioPaths } from "@/lib/cms/revalidate";
import type { SectionKey, SectionMap } from "@/lib/cms/sections";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ActionResult = { ok: true } | { ok: false; error: string };

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { supabase: null, error: "Supabase is not configured." } as const;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { supabase: null, error: "You must be signed in." } as const;
  }

  return { supabase, error: null } as const;
}

export async function saveSections(
  payload: Partial<SectionMap>,
  options: { pin?: boolean } = {},
): Promise<ActionResult> {
  const auth = await requireAdmin();
  if (!auth.supabase) {
    return { ok: false, error: auth.error };
  }

  const writes: Array<{ key: SectionKey; data: SectionMap[SectionKey] }> = [];
  for (const [key, value] of Object.entries(payload) as Array<[SectionKey, SectionMap[SectionKey]]>) {
    const parsed = sectionSchemas[key].safeParse(value);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return {
        ok: false,
        error: `Invalid ${key}${first?.path?.length ? ` (${first.path.join(".")})` : ""}: ${first?.message ?? "validation failed"}`,
      };
    }
    writes.push({ key, data: parsed.data as SectionMap[SectionKey] });
  }

  const results = await Promise.all(
    writes.map((row) => auth.supabase.from("content_sections").upsert({ key: row.key, data: row.data })),
  );
  const failed = results.find((row) => row.error);
  if (failed?.error) {
    return { ok: false, error: failed.error.message };
  }

  if (options.pin !== false) {
    await pinFieldPaths(policyPathsFromSections(payload), "Manual CMS edit");
  }

  revalidatePortfolioPaths(payload);
  return { ok: true };
}

export async function signOutAdmin(): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { ok: false, error: "Supabase is not configured." };
  }

  const { error } = await supabase.auth.signOut();
  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}
