import { revalidatePath } from "next/cache";
import type { SectionMap } from "./sections";

export function revalidatePortfolioPaths(payload: Partial<SectionMap> = {}) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/seo-optimizer");
  revalidatePath("/login");
  revalidatePath("/sitemap.xml");
  revalidatePath("/projects");
  revalidatePath("/ai");
  revalidatePath("/llms.txt");
  if (payload.projects && "items" in payload.projects) {
    for (const project of payload.projects.items) {
      revalidatePath(`/projects/${project.id}`);
    }
  }
}