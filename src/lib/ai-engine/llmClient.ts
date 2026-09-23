import type { LlmClient, LlmCompletionRequest, LlmCompletionResult, LlmProvider } from "./types";

interface GeminiPart {
  text?: string;
  thought?: boolean;
}

interface GeminiGenerateResponse {
  candidates?: Array<{
    content?: { parts?: GeminiPart[] };
    finishReason?: string;
  }>;
  promptFeedback?: { blockReason?: string };
  error?: { message?: string };
}

function geminiApiKey(): string {
  return process.env.GEMINI_API_KEY?.trim() ?? "";
}

function visibleGeminiText(payload: GeminiGenerateResponse): string {
  const parts = payload.candidates?.[0]?.content?.parts ?? [];
  return parts
    .filter((part) => !part.thought)
    .map((part) => part.text ?? "")
    .join("")
    .trim();
}

/** Gemini 3 thinking tokens count toward maxOutputTokens. Leave headroom so the visible reply is not empty. */
function outputTokenLimit(requested: number): number {
  return Math.max(requested + 1024, 1536);
}

export class GeminiLlmClient implements LlmClient {
  readonly provider: LlmProvider = "gemini";

  isConfigured(): boolean {
    return Boolean(geminiApiKey());
  }

  async complete(request: LlmCompletionRequest): Promise<LlmCompletionResult> {
    const apiKey = geminiApiKey();
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const model = process.env.GEMINI_MODEL?.trim() || "gemini-3.6-flash";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: request.system }] },
          contents: [{ role: "user", parts: [{ text: request.user }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: outputTokenLimit(request.maxTokens ?? 700),
            thinkingConfig: { thinkingLevel: "MINIMAL" },
            ...(request.json ? { responseMimeType: "application/json" } : {}),
          },
        }),
      },
    );

    const payload = (await response.json()) as GeminiGenerateResponse;
    if (!response.ok) {
      const message = payload.error?.message || `Gemini request failed with status ${response.status}.`;
      if (request.json && /mime|json|thinking/i.test(message)) {
        return this.complete({ ...request, json: false });
      }
      throw new Error(message);
    }

    const text = visibleGeminiText(payload);
    if (!text) {
      const reason = payload.candidates?.[0]?.finishReason || payload.promptFeedback?.blockReason || "empty";
      throw new Error(`Gemini returned an empty completion (${reason}).`);
    }

    return { provider: "gemini", text };
  }
}

export interface LlmProbeResult {
  provider: LlmProvider;
  configured: boolean;
  connected: boolean;
  active: boolean;
  message: string;
}

export async function probeLlmProviders(): Promise<{ active: LlmProvider | null; providers: LlmProbeResult[] }> {
  const client = new GeminiLlmClient();
  const active = client.isConfigured() ? client.provider : null;

  if (!client.isConfigured()) {
    return {
      active,
      providers: [
        {
          provider: "gemini",
          configured: false,
          connected: false,
          active: false,
          message: "No GEMINI_API_KEY in .env.local. Restart npm run dev after saving the key.",
        },
      ],
    };
  }

  try {
    await client.complete({
      system: "Reply with the single word ok.",
      user: "ok",
      maxTokens: 256,
    });
    return {
      active,
      providers: [
        {
          provider: "gemini",
          configured: true,
          connected: true,
          active: true,
          message: "Connected",
        },
      ],
    };
  } catch (error) {
    return {
      active,
      providers: [
        {
          provider: "gemini",
          configured: true,
          connected: false,
          active: true,
          message: error instanceof Error ? error.message : "Request failed.",
        },
      ],
    };
  }
}

export function resolveLlmClient(_preferred?: LlmProvider | ""): LlmClient | null {
  const gemini = new GeminiLlmClient();
  return gemini.isConfigured() ? gemini : null;
}

export function extractJsonObject(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("LLM did not return a JSON object.");
  }
  const slice = raw.slice(start, end + 1);
  try {
    return JSON.parse(slice);
  } catch {
    const repaired = slice.replace(/,\s*([}\]])/g, "$1").replace(/[\u201C\u201D]/g, '"');
    return JSON.parse(repaired);
  }
}
