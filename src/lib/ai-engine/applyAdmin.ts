import { revalidatePath } from "next/cache";
import { sectionSchemas } from "@/lib/cms/schemas";
import { revalidatePortfolioPaths } from "@/lib/cms/revalidate";
import type { SectionKey, SectionMap } from "@/lib/cms/sections";
import { refreshSitemapFromProjects } from "@/lib/cms/sitemap";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function applySectionsAsEngine(payload: Partial<SectionMap>): Promise<void> {
  const admin = createSupabaseAdminClient();
  if (!admin) {
    throw new Error("Supabase service role is required to apply SEO engine writes.");
  }

  for (const [key, value] of Object.entries(payload) as Array<[SectionKey, SectionMap[SectionKey]]>) {
    const parsed = sectionSchemas[key].safeParse(value);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      throw new Error(
        `Invalid ${key}${first?.path?.length ? ` (${first.path.join(".")})` : ""}: ${first?.message ?? "validation failed"}`,
      );
    }
    const { error } = await admin.from("content_sections").upsert({
      key,
      data: parsed.data,
    });
    if (error) {
      throw new Error(error.message);
    }
  }

  revalidatePortfolioPaths(payload);
  if (payload.projects) {
    await refreshSitemapFromProjects(payload.projects.items);
    revalidatePath("/sitemap.xml");
    revalidatePath("/admin/sitemap");
  }
}