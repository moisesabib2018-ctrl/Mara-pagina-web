import { describe, expect, it, vi } from "vitest";
import type Anthropic from "@anthropic-ai/sdk";
import { DEFAULT_MODEL, anthropicBackend, generateReply, normalizeMessages, type ChatClient } from "./respond";

const fakeMessage = (over: Partial<Anthropic.Message>): Anthropic.Message =>
  ({ id: "m", type: "message", role: "assistant", model: "x", stop_reason: "end_turn", stop_sequence: null, content: [], usage: {}, ...over }) as unknown as Anthropic.Message;

const clientReturning = (msg: Anthropic.Message) => {
  const create = vi.fn().mockResolvedValue(msg);
  return { client: { messages: { create } } as unknown as ChatClient, create };
};

describe("normalizeMessages", () => {
  it("la conversación empieza con el usuario", () => {
    const out = normalizeMessages([
      { role: "assistant", content: "hola" },
      { role: "user", content: "¿cuánto dura?" },
    ]);
    expect(out).toEqual([{ role: "user", content: "¿cuánto dura?" }]);
  });
  it("omite del historial mensajes con datos sensibles", () => {
    const out = normalizeMessages([
      { role: "user", content: "mi ssn 123-45-6789" },
      { role: "assistant", content: "no compartas eso" },
      { role: "user", content: "gracias" },
    ]);
    expect(JSON.stringify(out)).not.toContain("123-45");
    expect(out[0].content).toBe("[omitted]");
  });
  it("sin mensajes del usuario no queda nada", () => {
    expect(normalizeMessages([{ role: "assistant", content: "hola" }])).toEqual([]);
  });
});

describe("generateReply", () => {
  it("envía el prompt aprobado, el modelo por defecto y devuelve el texto", async () => {
    const { client, create } = clientReturning(fakeMessage({ content: [{ type: "text", text: "Dura 45 minutos." } as never] }));
    const reply = await generateReply({ locale: "es", messages: [{ role: "user", content: "¿cuánto dura?" }] }, anthropicBackend(client));
    expect(reply).toBe("Dura 45 minutos.");
    const params = create.mock.calls[0][0];
    expect(params.model).toBe(DEFAULT_MODEL);
    expect(params.system).toContain("APPROVED KNOWLEDGE");
    expect(params.system).toContain("Never invent prices");
    expect(params.messages[0].role).toBe("user");
  });
  it("respeta el modelo configurado", async () => {
    const { client, create } = clientReturning(fakeMessage({ content: [{ type: "text", text: "ok" } as never] }));
    await generateReply({ locale: "en", messages: [{ role: "user", content: "hi" }] }, anthropicBackend(client, "claude-haiku-5-5"));
    expect(create.mock.calls[0][0].model).toBe("claude-haiku-5-5");
  });
  it("ante un rechazo del modelo responde con un mensaje amable y no vacío", async () => {
    const { client } = clientReturning(fakeMessage({ stop_reason: "refusal" }));
    const reply = await generateReply({ locale: "es", messages: [{ role: "user", content: "hola" }] }, anthropicBackend(client));
    expect(reply).toContain("agenda una consulta");
  });
  it("sin texto devuelve el mensaje de respaldo", async () => {
    const { client } = clientReturning(fakeMessage({ content: [] }));
    expect(await generateReply({ locale: "en", messages: [{ role: "user", content: "hi" }] }, anthropicBackend(client))).toContain("book a consultation");
  });
  it("no llama a la API si no hay mensaje del usuario", async () => {
    const { client, create } = clientReturning(fakeMessage({}));
    await generateReply({ locale: "es", messages: [{ role: "assistant", content: "hola" }] }, anthropicBackend(client));
    expect(create).not.toHaveBeenCalled();
  });
});
