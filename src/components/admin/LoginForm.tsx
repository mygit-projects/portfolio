"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const configured = isSupabaseConfigured();

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (!configured) {
      setError("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.");
      return;
    }

    setSaving(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Sign-in failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center px-4">
      <form onSubmit={(event) => void onSubmit(event)} className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 space-y-5 shadow-sm">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#7C5CFC]">Administrator</p>
          <h1 className="mt-2 text-2xl font-black text-slate-900">Sign in to the CMS</h1>
          <p className="mt-1 text-sm text-slate-500">Use the Supabase Auth email and password you created for this project.</p>
        </div>
        <label className="block space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC]/20"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC]/20"
          />
        </label>
        {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}
        <button
          type="submit"
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7C5CFC] px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
          {saving ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
