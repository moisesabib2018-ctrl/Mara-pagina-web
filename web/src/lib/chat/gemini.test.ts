import { describe, expect, it, vi } from "vitest";
import { geminiBackend } from "./gemini";
import { generateReply } from "./respond";

const okJson = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
const make = (impl: (url: string, init: RequestInit) => Response | Promise<Response>) => {
  const fetchImpl = vi.fn(async (url: string | URL | Request, init?: RequestInit) => impl(String(url), init ?? {}));
  return { fetchImpl: fetchImpl as unknown as typeof fetch, calls: fetchImpl.mock.calls };
};

describe("proveedor Google (Gemini)", () => {
  it("manda la clave en el encabezado, el prompt como system_instruction y los roles user/model", async () => {
    const { fetchImpl, calls } = make(() => okJson({ candidates: [{ content: { parts: [{ text: "Hola" }] } }] }));
    const backend = geminiBackend({ apiKey: "KEY123", model: "models/gemini-prueba", fetchImpl });
    await backend({ system: "SISTEMA", messages: [{ role: "user", content: "a" }, { role: "assistant", content: "b" }, { role: "user", content: "c" }] });
    const [url, init] = calls[0] as [string, RequestInit];
    expect(url).toBe("https://generativelanguage.googleapis.com/v1beta/models/gemini-prueba:generateContent");
    expect(url).not.toContain("KEY123"); // la clave nunca va en la URL
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe("KEY123");
    const body = JSON.parse(init.body as string);
    expect(body.system_instruction.parts[0].text).toBe("SISTEMA");
    expect(body.contents.map((c: { role: string }) => c.role)).toEqual(["user", "model", "user"]);
    expect(body.generationConfig.maxOutputTokens).toBeGreaterThanOrEqual(1000);
  });
  it("une las partes de texto y omite las de razonamiento", async () => {
    const { fetchImpl } = make(() => okJson({ candidates: [{ content: { parts: [{ text: "pensando…", thought: true }, { text: "Hola, " }, { text: "bienvenida." }] } }] }));
    const r = await geminiBackend({ apiKey: "k", model: "m", fetchImpl })({ system: "s", messages: [{ role: "user", content: "x" }] });
    expect(r).toEqual({ text: "Hola, bienvenida." });
  });
  it("trata una respuesta bloqueada por seguridad como rechazo (mensaje amable)", async () => {
    const blockedPrompt = make(() => okJson({ promptFeedback: { blockReason: "SAFETY" } }));
    const reply = await generateReply({ locale: "es", messages: [{ role: "user", content: "hola" }] }, geminiBackend({ apiKey: "k", model: "m", fetchImpl: blockedPrompt.fetchImpl }));
    expect(reply).toContain("agenda una consulta");
    const blockedOutput = make(() => okJson({ candidates: [{ finishReason: "SAFETY" }] }));
    const r = await geminiBackend({ apiKey: "k", model: "m", fetchImpl: blockedOutput.fetchImpl })({ system: "s", messages: [{ role: "user", content: "x" }] });
    expect(r.refused).toBe(true);
  });
  it("un error HTTP lanza (el servidor responde 502 sin filtrar detalles)", async () => {
    const { fetchImpl } = make(() => new Response("{}", { status: 429 }));
    await expect(geminiBackend({ apiKey: "k", model: "m", fetchImpl })({ system: "s", messages: [{ role: "user", content: "x" }] })).rejects.toThrow("gemini 429");
  });
});
