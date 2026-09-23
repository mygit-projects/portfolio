"use client";

import { useState } from "react";
import { saveSections, type ActionResult } from "@/app/admin/actions";
import type { SectionMap } from "@/lib/cms/sections";

export function useSectionForm<T>(initial: T, toPayload: (value: T) => Partial<SectionMap>) {
  const [value, setValue] = useState(initial);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  async function save() {
    setSaving(true);
    setStatus(null);
    const result: ActionResult = await saveSections(toPayload(value));
    setSaving(false);
    setStatus(
      result.ok
        ? { type: "success", message: "Saved. The public site will refresh with this content." }
        : { type: "error", message: result.error },
    );
  }

  return { value, setValue, saving, status, save };
}
