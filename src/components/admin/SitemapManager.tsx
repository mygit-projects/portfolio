"use client";

import { useState } from "react";
import { generateSitemap } from "@/app/admin/actions";
import type { SitemapEntry } from "@/lib/cms/sitemap";

function formatStamp(value: string | null) {
  if (!value) return "Not generated yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

export function SitemapManager({
  url,
  generatedAt,
  entries,
}: {
  url: string;
  generatedAt: string | null;
  entries: SitemapEntry[];
}) {
  const [rows, setRows] = useState(entries);
  const [generated, setGenerated] = useState(generatedAt);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");

  async function onGenerate() {
    setBusy(true);
    setStatus("");
    const result = await generateSitemap();
    setBusy(false);
    if (!result.ok) {
      setStatus(result.error);
      return;
    }
    setRows(result.entries);
    setGenerated(result.generatedAt);
    setStatus(`Updated ${result.entries.length} URLs. Paste the sitemap URL in Google Search Console.`);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setStatus("Could not copy. Select the URL and copy it manually.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">XML Sitemap</h1>
        <p className="mt-1 text-sm text-slate-500">
          Generate the public sitemap, then submit this URL in Google Search Console → Sitemaps.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-500">Sitemap URL for GSC</p>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              readOnly
              value={url}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 outline-none"
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => void onCopy()}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                Open
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600">
            Last generated: <span className="font-bold text-slate-900">{formatStamp(generated)}</span>
            {rows.length ? ` · ${rows.length} URLs` : ""}
          </p>
          <button
            type="button"
            disabled={busy}
            onClick={() => void onGenerate()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
          >
            {busy ? "Generating…" : generated ? "Generate / Update sitemap" : "Generate sitemap"}
          </button>
        </div>
        {status ? <p className="text-sm font-semibold text-slate-700">{status}</p> : null}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5">
        <h2 className="font-black text-slate-900">Included URLs</h2>
        <p className="mt-1 text-sm text-slate-500">These are the locs Google will fetch from the XML file.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                <th className="pb-2 pr-4">URL</th>
                <th className="pb-2 pr-4">Lastmod</th>
                <th className="pb-2 pr-4">Change</th>
                <th className="pb-2">Priority</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.url} className="border-t border-slate-100">
                  <td className="py-2 pr-4 font-semibold text-slate-800">{row.url}</td>
                  <td className="py-2 pr-4 text-slate-500">{formatStamp(row.lastModified)}</td>
                  <td className="py-2 pr-4 text-slate-500">{row.changeFrequency}</td>
                  <td className="py-2 text-slate-500">{row.priority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
