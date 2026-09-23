"use client";

import { useState, type ReactNode } from "react";
import { ImagePlus, LoaderCircle, Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { SeoFieldChips } from "./SeoFieldChips";

export function Field({
  label,
  hint,
  seoPath,
  children,
}: {
  label: string;
  hint?: string;
  seoPath?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[11px] font-black uppercase tracking-wider text-slate-500">{label}</span>
      {children}
      <SeoFieldChips path={seoPath} />
      {hint ? <span className="block text-[11px] text-slate-400">{hint}</span> : null}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-[#7C5CFC] focus:ring-2 focus:ring-[#7C5CFC]/20";

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className={inputClass}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className={`${inputClass} resize-y`} />
  );
}

export function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(event) => onChange(Number(event.target.value))}
      className={inputClass}
    />
  );
}

export function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} className={inputClass}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export function LineList({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value.join("\n")}
      rows={Math.max(3, value.length + 1)}
      placeholder={placeholder ?? "One item per line"}
      onChange={(event) =>
        onChange(
          event.target.value
            .split("\n")
            .map((line) => line.trimEnd())
            .filter((line, index, all) => !(line === "" && index === all.length - 1)),
        )
      }
      className={`${inputClass} resize-y font-mono text-xs`}
    />
  );
}

export function ImageField({
  value,
  onChange,
  label = "Image URL",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
      const path = `${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
        upsert: true,
        cacheControl: "3600",
      });
      if (uploadError) {
        setError(uploadError.message);
        return;
      }
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <TextInput value={value} onChange={onChange} placeholder="https://..." />
      <div className="flex items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200">
          {uploading ? <LoaderCircle className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
          {uploading ? "Uploading..." : "Upload to Storage"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(event) => void onFile(event.target.files?.[0])}
          />
        </label>
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label} className="h-10 w-10 rounded-lg object-cover border border-slate-200" />
        ) : null}
      </div>
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </div>
  );
}

export function CollectionEditor<T>({
  items,
  onChange,
  createItem,
  title,
  renderItem,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  title: string;
  renderItem: (item: T, index: number, update: (item: T) => void) => ReactNode;
}) {
  function move(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= items.length) return;
    const copy = [...items];
    const [row] = copy.splice(index, 1);
    if (row === undefined) return;
    copy.splice(next, 0, row);
    onChange(copy);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">{title}</h3>
        <button
          type="button"
          onClick={() => onChange([...items, createItem()])}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#7C5CFC] px-3 py-1.5 text-xs font-bold text-white"
        >
          <Plus className="h-3.5 w-3.5" />
          Add
        </button>
      </div>
      {items.map((item, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex items-center justify-end gap-1">
            <button type="button" onClick={() => move(index, -1)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
              <ChevronUp className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => move(index, 1)} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
              <ChevronDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {renderItem(item, index, (next) => {
            const copy = [...items];
            copy[index] = next;
            onChange(copy);
          })}
        </div>
      ))}
    </div>
  );
}

export function Notice({ status }: { status: { type: "success" | "error"; message: string } | null }) {
  if (!status) return null;
  return (
    <div
      className={`rounded-2xl px-4 py-3 text-sm font-medium ${
        status.type === "success" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"
      }`}
    >
      {status.message}
    </div>
  );
}

export function SaveBar({
  saving,
  onSave,
}: {
  saving: boolean;
  onSave: () => void;
}) {
  return (
    <div className="sticky bottom-4 z-20 flex justify-end">
      <button
        type="button"
        disabled={saving}
        onClick={onSave}
        className="inline-flex items-center gap-2 rounded-full bg-[#7C5CFC] px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 disabled:opacity-60"
      >
        {saving ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
        {saving ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/90 p-5 sm:p-6 space-y-4">
      <h2 className="text-lg font-black text-slate-900">{title}</h2>
      {children}
    </section>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
