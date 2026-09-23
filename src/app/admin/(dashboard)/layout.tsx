import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { getHomepageHeuristicAudit } from "@/lib/ai-engine/homepageAudit";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const [supabase, audit] = await Promise.all([createSupabaseServerClient(), getHomepageHeuristicAudit()]);
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  return (
    <AdminShell email={user?.email} fieldScores={audit.scores}>
      {children}
    </AdminShell>
  );
}
