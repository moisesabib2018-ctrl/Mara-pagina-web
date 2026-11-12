import type { ChatBackend } from "./respond";

type Part = { text?: string; thought?: boolean };
type GeminiResponse = {
  candidates?: { content?: { parts?: Part[] }; finishReason?: string }[];
  promptFeedback?: { blockReason?: string };
};

/** Motivos de fin que significan "el proveedor bloqueó o cortó la respuesta por seguridad". */
const BLOCKED = new Set(["SAFETY", "PROHIBITED_CONTENT", "BLOCKLIST", "SPII", "RECITATION", "IMAGE_SAFETY", "OTHER"]);

/**
 * Proveedor Google (Gemini API, REST `generateContent`). La clave va en el encabezado `x-goog-api-key` (nunca en la URL).
 * El modelo se define con GEMINI_MODEL (los nombres cambian entre versiones: se copia del panel de Google AI Studio).
 */
export function geminiBackend({
  apiKey,
  model,
  baseUrl = "https://generativelanguage.googleapis.com",
  fetchImpl = fetch,
  timeoutMs = 30_000,
}: {
  apiKey: string;
  model: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}): ChatBackend {
  const id = encodeURIComponent(model.trim().replace(/^models\//, ""));
  return async ({ system, messages }) => {
    const res = await fetchImpl(`${baseUrl.replace(/\/$/, "")}/v1beta/models/${id}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: system }] },
        contents: messages.map((m) => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
        // Margen amplio: algunos modelos gastan parte del tope "pensando" antes de responder.
        generationConfig: { maxOutputTokens: 2000, temperature: 0.4 },
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!res.ok) throw new Error(`gemini ${res.status}`);

    const data = (await res.json()) as GeminiResponse;
    if (data.promptFeedback?.blockReason) return { text: "", refused: true };
    const candidate = data.candidates?.[0];
    const text = (candidate?.content?.parts ?? [])
      .filter((p) => !p.thought && typeof p.text === "string")
      .map((p) => p.text)
      .join("");
    if (!text.trim() && candidate?.finishReason && BLOCKED.has(candidate.finishReason)) return { text: "", refused: true };
    return { text };
  };
}
