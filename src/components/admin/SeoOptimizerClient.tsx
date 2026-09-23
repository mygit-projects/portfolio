"use client";

import { useMemo, useState } from "react";
import { saveSections } from "@/app/admin/actions";
import type { AiAuditMetrics, FaqItem, GoogleInsightSummary, PortfolioContent } from "@/content/types";
import type { SeoEngineLogRow } from "@/lib/ai-engine/engineLog";
import type { SeoEngineSettings } from "@/lib/ai-engine/engineSettings";
import type { SeoFieldPin } from "@/lib/ai-engine/fieldPins";
import { fieldScoresFromMetrics, headingOutlineFromMetrics } from "@/lib/ai-engine/fieldScores";
import type { LlmProbeResult } from "@/lib/ai-engine/llmClient";
import type { EngineMode } from "@/lib/ai-engine/policy";
import type { SectionMap } from "@/lib/cms/sections";
import { Field } from "./formKit";

type ConnectionStatus = {
  configured: boolean;
  connected: boolean;
  email: string | null;
  gscSiteUrl: string | null;
  ga4PropertyId: string | null;
  gbpAccountName: string | null;
  gbpLocationName: string | null;
  insights: GoogleInsightSummary;
};

function deltaLabel(current?: number, previous?: number, pct = false) {
  if (current === undefined || previous === undefined) return "—";
  const diff = current - previous;
  const shown = pct ? `${Math.round(diff * 1000) / 10}pt` : `${diff > 0 ? "+" : ""}${Math.round(diff * 10) / 10}`;
  return shown;
}

function meterColor(health: "red" | "yellow" | "green") {
  if (health === "green") return "bg-emerald-500";
  if (health === "yellow") return "bg-amber-400";
  return "bg-rose-500";
}

function ScoreMeter({ label, score, health }: { label: string; score: number; health: "red" | "yellow" | "green" }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between text-sm font-bold text-slate-700">
        <span>{label}</span>
        <span>{score}</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${meterColor(health)}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function SeoOptimizerClient({
  portfolio,
  initialMetrics,
  connection,
  initialSettings,
  initialPins,
  initialLog,
}: {
  portfolio: PortfolioContent;
  initialMetrics: AiAuditMetrics;
  connection: ConnectionStatus;
  initialSettings: SeoEngineSettings;
  initialPins: SeoFieldPin[];
  initialLog: SeoEngineLogRow[];
}) {
  const targets = useMemo(
    () => [
      { id: "homepage", label: "Homepage" },
      ...portfolio.projects.map((project) => ({ id: `project:${project.id}`, label: project.title })),
      { id: "faqs", label: "FAQs" },
      { id: "experience", label: "Experience" },
    ],
    [portfolio.projects],
  );

  const [target, setTarget] = useState("homepage");
  const [metrics, setMetrics] = useState(initialMetrics);
  const [mode, setMode] = useState<EngineMode>(initialSettings.mode);
  const [pins, setPins] = useState(initialPins);
  const [log, setLog] = useState(initialLog);
  const [insights, setInsights] = useState(connection.insights);
  const [faqs, setFaqs] = useState<FaqItem[]>(portfolio.faqs);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [patchPreview, setPatchPreview] = useState<unknown>(null);
  const [pendingSections, setPendingSections] = useState<Partial<SectionMap> | null>(null);
  const [gscSiteUrl, setGscSiteUrl] = useState(connection.gscSiteUrl ?? "");
  const [ga4PropertyId, setGa4PropertyId] = useState(connection.ga4PropertyId ?? "");
  const [gbpAccountName, setGbpAccountName] = useState(connection.gbpAccountName ?? "");
  const [gbpLocationName, setGbpLocationName] = useState(connection.gbpLocationName ?? "");
  const [llmProbes, setLlmProbes] = useState<LlmProbeResult[] | null>(null);
  const geminiProbe = llmProbes?.find((item) => item.provider === "gemini");
  const [options, setOptions] = useState<{
    gscSites: Array<{ siteUrl: string }>;
    ga4Properties: Array<{ id: string; name: string }>;
    gbpAccounts: Array<{ name: string; title: string }>;
    gbpLocations: Array<{ name: string; title: string }>;
  } | null>(null);

  async function runEngine(nextTarget = target, busyKey: string = "audit", optimize = false) {
    setBusy(busyKey);
    setStatus(null);
    try {
      const response = await fetch("/api/seo-engine/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target: nextTarget, optimize }),
      });
      const payload = (await response.json()) as {
        ok: boolean;
        metrics?: AiAuditMetrics;
        queued?: unknown;
        applied?: unknown;
        reason?: string;
        runId?: string;
        error?: string;
      };
      if (!payload.ok || !payload.metrics) {
        throw new Error(payload.error ?? payload.reason ?? "Engine run failed.");
      }
      setMetrics(payload.metrics);
      if (payload.metrics.insights) setInsights(payload.metrics.insights);
      setPatchPreview({ applied: payload.applied, queued: payload.queued });
      if (payload.runId) {
        setLog((current) => [
          {
            runId: payload.runId as string,
            target: nextTarget,
            provider: payload.metrics?.provider ?? "hybrid",
            mode,
            applied: (payload.applied ?? {}) as SeoEngineLogRow["applied"],
            queued: (payload.queued ?? {}) as SeoEngineLogRow["queued"],
            rejected: [],
            reason: payload.reason ?? "",
            createdAt: new Date().toISOString(),
          },
          ...current,
        ].slice(0, 12));
      }
      setStatus(payload.reason ?? "Engine run complete.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Engine run failed.");
    } finally {
      setBusy(null);
    }
  }

  async function runAudit(nextTarget = target) {
    await runEngine(nextTarget, "audit", false);
  }

  async function optimize() {
    await runEngine(target, "optimize", true);
  }

  async function persistMode(next: EngineMode) {
    setMode(next);
    const response = await fetch("/api/seo-engine/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: next }),
    });
    const payload = (await response.json()) as { ok: boolean; error?: string };
    setStatus(payload.ok ? `Engine mode is now ${next}.` : payload.error ?? "Could not save mode.");
  }

  async function unpin(path: string) {
    await fetch("/api/seo-engine/pins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    });
    setPins((current) => current.filter((pin) => pin.fieldPath !== path));
  }

  async function handleQueue(runId: string, action: "accept" | "dismiss") {
    setBusy(action);
    const response = await fetch("/api/seo-engine/queue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ runId, action, pin: action === "dismiss" }),
    });
    const payload = (await response.json()) as { ok: boolean; error?: string };
    setBusy(null);
    if (!payload.ok) {
      setStatus(payload.error ?? "Queue action failed.");
      return;
    }
    setStatus(action === "accept" ? "Queued AI changes saved. Field was not pinned." : "Proposal dismissed and pinned.");
    if (action === "dismiss") {
      const row = log.find((item) => item.runId === runId);
      if (row) {
        setPins((current) => [
          ...current,
          ...Object.keys(row.queued ?? {}).map((path) => ({
            fieldPath: path,
            reason: "Dismissed AI proposal",
            updatedAt: new Date().toISOString(),
          })),
        ]);
      }
    }
  }

  async function save() {
    setBusy("save");
    setStatus(null);
    const payload: Partial<SectionMap> = pendingSections ?? { faqs };
    const result = await saveSections(payload);
    setStatus(result.ok ? "Saved to Supabase." : result.error);
    setBusy(null);
    if (result.ok) {
      setPendingSections(null);
      await runAudit();
    }
  }

  async function loadOptions() {
    const response = await fetch("/api/integrations/google/options");
    const payload = (await response.json()) as {
      ok: boolean;
      gscSites?: Array<{ siteUrl: string }>;
      ga4Properties?: Array<{ id: string; name: string }>;
      gbpAccounts?: Array<{ name: string; title: string }>;
      gbpLocations?: Array<{ name: string; title: string }>;
      error?: string;
    };
    if (!payload.ok) {
      setStatus(payload.error ?? "Could not load Google properties.");
      return;
    }
    setOptions({
      gscSites: payload.gscSites ?? [],
      ga4Properties: payload.ga4Properties ?? [],
      gbpAccounts: payload.gbpAccounts ?? [],
      gbpLocations: payload.gbpLocations ?? [],
    });
  }

  async function persistSelection() {
    setBusy("select");
    const response = await fetch("/api/integrations/google/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gscSiteUrl, ga4PropertyId, gbpAccountName, gbpLocationName }),
    });
    const payload = (await response.json()) as { ok: boolean; gbpLocations?: Array<{ name: string; title: string }>; error?: string };
    setBusy(null);
    if (!payload.ok) {
      setStatus(payload.error ?? "Could not save Google properties.");
      return;
    }
    if (payload.gbpLocations) {
      setOptions((current) => (current ? { ...current, gbpLocations: payload.gbpLocations ?? [] } : current));
    }
    setStatus("Google properties saved.");
  }

  async function refreshInsights() {
    setBusy("sync");
    const response = await fetch("/api/integrations/google/sync", { method: "POST" });
    const payload = (await response.json()) as { ok: boolean; insights?: GoogleInsightSummary; error?: string };
    setBusy(null);
    if (!payload.ok || !payload.insights) {
      setStatus(payload.error ?? "Google sync failed.");
      return;
    }
    setInsights(payload.insights);
    setStatus("Google insights refreshed.");
    await runAudit();
  }

  async function disconnect() {
    setBusy("disconnect");
    await fetch("/api/integrations/google/disconnect", { method: "POST" });
    setInsights({ connected: false, window: "28d" });
    setBusy(null);
    setStatus("Google disconnected.");
  }

  async function testLlmConnections() {
    setBusy("llm");
    setStatus(null);
    try {
      const response = await fetch("/api/seo-engine/llm-status", { method: "POST" });
      const payload = (await response.json()) as {
        ok: boolean;
        providers?: LlmProbeResult[];
        error?: string;
      };
      if (!payload.ok || !payload.providers) {
        throw new Error(payload.error ?? "LLM probe failed.");
      }
      setLlmProbes(payload.providers);
      const gemini = payload.providers.find((item) => item.provider === "gemini");
      setStatus(gemini?.connected ? "Gemini connected." : gemini?.message || "Gemini did not accept the test request.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "LLM probe failed.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">SEO / AEO / GEO optimizer</h1>
        <p className="mt-1 text-sm text-slate-500">
          AI runs the loop. You watch headings, schema, field scores, and the activity log. Pin a field only when you override it.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-slate-400">Engine mode</p>
          <p className="text-sm text-slate-600">
            {mode === "suggest" ? "Queue everything for Accept." : "Auto-apply titles, meta, alts, and existing FAQ answers."}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void persistMode("suggest")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "suggest" ? "bg-slate-900 text-white" : "border border-slate-200"}`}
          >
            Suggest
          </button>
          <button
            type="button"
            onClick={() => void persistMode("auto-safe")}
            className={`rounded-xl px-4 py-2 text-sm font-bold ${mode === "auto-safe" ? "bg-[#7C5CFC] text-white" : "border border-slate-200"}`}
          >
            Auto-safe
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-slate-400">Gemini</p>
            <p className="text-sm text-slate-600">One-word ping to Google Gemini. The key stays on the server.</p>
          </div>
          <button
            type="button"
            onClick={() => void testLlmConnections()}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white"
          >
            {busy === "llm" ? "Testing…" : "Test connection"}
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-black text-slate-900">Gemini</p>
            <span
              className={`h-3 w-3 rounded-full ${!geminiProbe ? "bg-slate-200" : geminiProbe.connected ? "bg-emerald-500" : "bg-rose-500"}`}
              title={!geminiProbe ? "Not tested" : geminiProbe.connected ? "Connected" : "Not connected"}
            />
          </div>
          <p
            className={`mt-1 text-xs font-bold ${geminiProbe?.connected ? "text-emerald-700" : geminiProbe ? "text-rose-600" : "text-slate-400"}`}
          >
            {!geminiProbe ? "Not tested" : geminiProbe.connected ? "Connected" : "Not connected"}
          </p>
          {geminiProbe?.message ? <p className="mt-1 text-[11px] text-slate-500">{geminiProbe.message}</p> : null}
        </div>
      </div>

      {status ? <p className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">{status}</p> : null}

      <div className="grid gap-3 lg:grid-cols-4">
        <ScoreMeter label="Overall" score={metrics.overallScore} health={metrics.health} />
        <ScoreMeter label="SEO" score={metrics.pillars.seo.score} health={metrics.pillars.seo.health} />
        <ScoreMeter label="AEO" score={metrics.pillars.aeo.score} health={metrics.pillars.aeo.health} />
        <ScoreMeter label="GEO" score={metrics.pillars.geo.score} health={metrics.pillars.geo.health} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-3">
        <p className="text-xs font-black uppercase tracking-wider text-slate-400">Focus entity</p>
        <p className="text-lg font-black text-slate-900">{metrics.focusEntity ?? "—"}</p>
        {metrics.serp ? (
          <div className="rounded-2xl bg-[#F8F9FD] p-4">
            <p className="text-sm font-semibold text-[#1a0dab]">{metrics.serp.title}</p>
            <p className="text-xs text-emerald-700">{metrics.serp.displayUrl}</p>
            <p className="mt-1 text-sm text-slate-600">{metrics.serp.description}</p>
            <p className="mt-2 text-[11px] font-bold text-slate-400">
              Title {metrics.serp.titlePx}px {metrics.serp.titleFits ? "fits" : "truncated"} · Description {metrics.serp.descriptionPx}px
            </p>
          </div>
        ) : null}
        {metrics.history?.length ? (
          <div className="flex h-16 items-end gap-1">
            {metrics.history.map((point) => (
              <div
                key={point.createdAt}
                title={`${point.createdAt}: ${point.overall}`}
                className="flex-1 rounded-t bg-[#7C5CFC]/70"
                style={{ height: `${Math.max(8, point.overall)}%` }}
              />
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400">Score history appears after you re-score (and after running the seo_score_history SQL).</p>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Heading outline</h2>
          <p className="mt-1 text-xs text-slate-500">Levels are locked. Edit the mapped CMS text if a heading is wrong.</p>
          <ul className="mt-3 space-y-2 text-sm">
            {headingOutlineFromMetrics(metrics).length ? (
              headingOutlineFromMetrics(metrics).map((heading, index) => (
                <li key={`${heading.role}-${heading.text}-${index}`} className="flex items-start justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2">
                  <span>
                    <span className="mr-2 font-black text-slate-400">H{heading.level}</span>
                    {heading.text}
                  </span>
                  <span className="shrink-0 text-[11px] font-bold uppercase text-slate-400">{heading.role}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">Re-score to load the live heading tree.</li>
            )}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Schema</h2>
          <p className="mt-1 text-xs text-slate-500">Viewer only. The engine generates JSON-LD from CMS copy.</p>
          <ul className="mt-3 space-y-2 text-xs text-slate-600">
            {metrics.schemaNodes?.length ? (
              metrics.schemaNodes.map((node) => (
                <li key={`${node.type}-${node.id ?? "noid"}`}>
                  <span className="font-bold text-slate-800">{node.type}</span>
                  {node.id ? ` · ${node.id.replace(/^https?:\/\//, "")}` : ""}
                </li>
              ))
            ) : (
              <li>No schema graph on this target yet.</li>
            )}
          </ul>
          {metrics.schemaIssues?.length ? (
            <p className="mt-3 text-sm text-amber-700">{metrics.schemaIssues.join(" ")}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Field scores</h2>
          <ul className="mt-3 space-y-2">
            {fieldScoresFromMetrics(metrics).map((field) => (
              <li key={field.path} className="rounded-2xl bg-slate-50 px-3 py-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-slate-800">{field.label}</p>
                  <span className={`text-[11px] font-black uppercase ${field.health === "green" ? "text-emerald-600" : field.health === "yellow" ? "text-amber-600" : "text-rose-600"}`}>
                    {field.health}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">{field.path}</p>
                {field.issues.length ? <p className="mt-1 text-xs text-slate-600">{field.issues.join(" ")}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Activity log</h2>
          <ul className="mt-3 space-y-3">
            {log.length ? (
              log.map((row) => (
                <li key={row.runId} className="rounded-2xl bg-slate-50 p-3 text-sm">
                  <p className="text-xs font-black uppercase text-slate-400">
                    {row.mode} · {row.provider} · {row.createdAt.slice(0, 16)}
                  </p>
                  <p className="font-bold text-slate-800">{row.reason || "Engine run"}</p>
                  <p className="text-xs text-slate-500">Target {row.target}</p>
                  {Object.keys(row.queued ?? {}).length ? (
                    <div className="mt-2 flex gap-2">
                      <button type="button" onClick={() => void handleQueue(row.runId, "accept")} className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                        {busy === "accept" ? "Saving…" : "Accept queued"}
                      </button>
                      <button type="button" onClick={() => void handleQueue(row.runId, "dismiss")} className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold">
                        Dismiss + pin
                      </button>
                    </div>
                  ) : null}
                </li>
              ))
            ) : (
              <li className="text-sm text-slate-500">Run the engine to see applied, queued, and rejected changes.</li>
            )}
          </ul>
          {pins.length ? (
            <div className="mt-4">
              <p className="text-xs font-black uppercase text-slate-400">Pinned overrides</p>
              <ul className="mt-2 space-y-1">
                {pins.map((pin) => (
                  <li key={pin.fieldPath} className="flex items-center justify-between gap-2 text-xs">
                    <span>{pin.fieldPath}</span>
                    <button type="button" className="font-bold text-[#7C5CFC]" onClick={() => void unpin(pin.fieldPath)}>
                      Unpin
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Core Web Vitals</h2>
          <p className="mt-2 text-sm text-slate-600">
            Source: {metrics.vitals?.source ?? "none"}
            {metrics.vitals?.error ? ` · ${metrics.vitals.error}` : ""}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
            <InsightStat label="LCP ms" value={metrics.vitals?.lcpMs} />
            <InsightStat label="INP ms" value={metrics.vitals?.inpMs} />
            <InsightStat label="CLS" value={metrics.vitals?.cls} />
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Indexation</h2>
          {metrics.indexation?.length ? (
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {metrics.indexation.map((row) => (
                <li key={row.url}>
                  <span className="font-bold text-slate-800">{row.url.replace(/^https?:\/\//, "")}</span>
                  {" · "}
                  {row.coverageState ?? row.verdict ?? row.error ?? "No inspection yet"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-slate-500">Connect Search Console and re-score to inspect `/` and project URLs.</p>
          )}
          {metrics.nap && !metrics.nap.aligned ? (
            <p className="mt-3 text-sm text-rose-600">{metrics.nap.issues.join(" ")}</p>
          ) : null}
          {metrics.schemaIssues?.length ? (
            <p className="mt-3 text-sm text-amber-700">{metrics.schemaIssues.join(" ")}</p>
          ) : null}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm font-bold text-slate-700">
            Target
            <select
              value={target}
              onChange={(event) => {
                const next = event.target.value;
                setTarget(next);
                void runAudit(next);
              }}
              className="mt-1 block rounded-xl border border-slate-200 px-3 py-2 text-sm"
            >
              {targets.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={() => void runAudit()} className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
            {busy === "audit" ? "Scoring…" : "Re-score"}
          </button>
          <button type="button" onClick={() => void optimize()} className="rounded-xl bg-[#7C5CFC] px-4 py-2 text-sm font-bold text-white">
            {busy === "optimize" ? "Running…" : "Run AI engine"}
          </button>
          <button type="button" onClick={() => void save()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700">
            {busy === "save" ? "Saving…" : "Save to Supabase"}
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-black text-slate-900">Google connections</h2>
            <p className="text-sm text-slate-500">
              {connection.configured
                ? insights.connected || connection.connected
                  ? `Connected${connection.email ? ` as ${connection.email}` : ""}.`
                  : "OAuth is configured. Connect a Google account that owns GSC, GA4, and the Dubai GBP listing."
                : "Add GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET to enable connect."}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a href="/api/integrations/google/start" className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white">
              Connect Google
            </a>
            <button type="button" onClick={() => void loadOptions()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">
              Load properties
            </button>
            <button type="button" onClick={() => void persistSelection()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">
              Save properties
            </button>
            <button type="button" onClick={() => void refreshInsights()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold">
              {busy === "sync" ? "Refreshing…" : "Refresh data"}
            </button>
            <button type="button" onClick={() => void disconnect()} className="rounded-xl px-4 py-2 text-sm font-bold text-rose-600">
              Disconnect
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="text-xs font-bold text-slate-500">
            Search Console
            <select value={gscSiteUrl} onChange={(event) => setGscSiteUrl(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select site</option>
              {options?.gscSites.map((site) => (
                <option key={site.siteUrl} value={site.siteUrl}>
                  {site.siteUrl}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold text-slate-500">
            GA4 property
            <select value={ga4PropertyId} onChange={(event) => setGa4PropertyId(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select property</option>
              {options?.ga4Properties.map((property) => (
                <option key={property.id} value={property.id}>
                  {property.name}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold text-slate-500">
            GBP account
            <select value={gbpAccountName} onChange={(event) => setGbpAccountName(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select account</option>
              {options?.gbpAccounts.map((account) => (
                <option key={account.name} value={account.name}>
                  {account.title}
                </option>
              ))}
            </select>
          </label>
          <label className="text-xs font-bold text-slate-500">
            GBP location
            <select value={gbpLocationName} onChange={(event) => setGbpLocationName(event.target.value)} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm">
              <option value="">Select location</option>
              {options?.gbpLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4 text-sm">
          <InsightStat label="Clicks" value={insights.clicks} />
          <InsightStat label="Impressions" value={insights.impressions} />
          <InsightStat label="CTR" value={insights.ctr} format="pct" />
          <InsightStat label="Avg position" value={insights.averagePosition} />
          <InsightStat label="Sessions" value={insights.sessions} />
          <InsightStat label="UAE share" value={insights.uaeShare} format="pct" />
          <InsightStat label="GBP rating" value={insights.gbpRating} />
          <InsightStat label="GBP reviews" value={insights.gbpReviewCount} />
        </div>
        {insights.previous ? (
          <p className="text-xs text-slate-500">
            vs previous snapshot
            {insights.previous.fetchedAt ? ` (${insights.previous.fetchedAt.slice(0, 10)})` : ""}: clicks{" "}
            {deltaLabel(insights.clicks, insights.previous.clicks)} · impressions{" "}
            {deltaLabel(insights.impressions, insights.previous.impressions)} · CTR{" "}
            {deltaLabel(insights.ctr, insights.previous.ctr, true)}
          </p>
        ) : null}
        {insights.topQueries?.length ? (
          <p className="text-xs text-slate-500">
            Top queries: {insights.topQueries.map((item) => item.query).join(" · ")}
          </p>
        ) : null}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Issues</h2>
          <ul className="mt-3 space-y-3">
            {metrics.issues.map((issue) => (
              <li key={issue.code} className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-black uppercase tracking-wider text-slate-400">{issue.severity}</p>
                <p className="text-sm font-bold text-slate-800">{issue.message}</p>
                <p className="text-sm text-slate-500">{issue.recommendation}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Recommendations</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
            {metrics.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-black text-slate-900">FAQ editor</h2>
          <button
            type="button"
            className="text-sm font-bold text-[#7C5CFC]"
            onClick={() => setFaqs((current) => [...current, { id: `faq-${Date.now()}`, question: "New question?", answer: "Direct answer." }])}
          >
            Add FAQ
          </button>
        </div>
        {faqs.map((item, index) => (
          <div key={item.id} className="grid gap-2 rounded-2xl border border-slate-100 p-3">
            <Field label="Question" seoPath="faqs.question">
              <input
                value={item.question}
                onChange={(event) =>
                  setFaqs((current) => current.map((faq, faqIndex) => (faqIndex === index ? { ...faq, question: event.target.value } : faq)))
                }
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold"
              />
            </Field>
            <Field label="Answer" seoPath="faqs.answer">
              <textarea
                value={item.answer}
                onChange={(event) =>
                  setFaqs((current) => current.map((faq, faqIndex) => (faqIndex === index ? { ...faq, answer: event.target.value } : faq)))
                }
                className="min-h-20 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
            </Field>
            <button type="button" className="justify-self-start text-xs font-bold text-rose-600" onClick={() => setFaqs((current) => current.filter((faq) => faq.id !== item.id))}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {patchPreview ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <h2 className="font-black text-slate-900">Optimize diff</h2>
          <p className="mt-1 text-sm text-slate-500">Review the proposed CMS field changes before saving.</p>
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <pre className="overflow-auto rounded-2xl bg-slate-50 p-3 text-xs text-slate-700">
              {JSON.stringify(
                {
                  title: portfolio.site.title,
                  description: portfolio.site.description,
                  bio: portfolio.personalInfo.bio,
                },
                null,
                2,
              )}
            </pre>
            <pre className="overflow-auto rounded-2xl bg-slate-950 p-3 text-xs text-slate-100">
              {JSON.stringify(patchPreview, null, 2)}
            </pre>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function InsightStat({
  label,
  value,
  format,
}: {
  label: string;
  value?: number;
  format?: "pct";
}) {
  const shown =
    value === undefined
      ? "—"
      : format === "pct"
        ? `${Math.round(value * 1000) / 10}%`
        : Math.round(value * 10) / 10;
  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3">
      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-lg font-black text-slate-900">{shown}</p>
    </div>
  );
}
