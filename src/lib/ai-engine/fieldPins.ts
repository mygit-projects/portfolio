import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export interface SeoFieldPin {
  fieldPath: string;
  reason: string;
  updatedAt: string;
}

export async function getPinnedPaths(): Promise<string[]> {
  const pins = await getFieldPins();
  return pins.map((pin) => pin.fieldPath);
}

export async function getFieldPins(): Promise<SeoFieldPin[]> {
  const admin = createSupabaseAdminClient();
  if (!admin) return [];
  const { data, error } = await admin.from("seo_field_pins").select("field_path, reason, updated_at");
  if (error || !data) return [];
  return data.map((row) => ({
    fieldPath: String(row.field_path),
    reason: String(row.reason ?? "Manual edit"),
    updatedAt: String(row.updated_at),
  }));
}

export async function pinFieldPaths(paths: string[], reason = "Manual CMS edit"): Promise<void> {
  const admin = createSupabaseAdminClient();
  if (!admin || !paths.length) return;
  const now = new Date().toISOString();
  await admin.from("seo_field_pins").upsert(
    paths.map((field_path) => ({
      field_path,
      reason,
      updated_at: now,
    })),
    { onConflict: "field_path" },
  );
}

export async function unpinFieldPath(path: string): Promise<void> {
  const admin = createSupabaseAdminClient();
  if (!admin) return;
  await admin.from("seo_field_pins").delete().eq("field_path", path);
}