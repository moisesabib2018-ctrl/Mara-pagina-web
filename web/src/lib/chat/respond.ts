import Anthropic from "@anthropic-ai/sdk";
import type { Locale } from "@/config/site";
import { containsSensitiveData } from "./guardrails";
import { buildSystemPrompt } from "./knowledge";

/**
 * Modelo por defecto. Para un chat público de preguntas frecuentes se puede usar uno más
 * económico (p. ej. claude-haiku-5-5) definiendo ANTHROPIC_MODEL, sin tocar el código.
 */
export const DEFAULT_MODEL = "claude-opus-5-5";
export const MAX_TOKENS = 2000; // incluye el razonamiento; las respuestas son breves por instrucción

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** Subconjunto del cliente del SDK que usamos (permite probar con un cliente falso). */
export type ChatClient = {
  messages: { create(params: Anthropic.MessageCreateParamsNonStreaming): Promise<Anthropic.Message> };
};

const fallbackReply: Record<Locale, string> = {
  es: "No pude responder eso con certeza. Para tu caso, agenda una consulta con la asesora o escríbenos.",
  en: "I couldn't answer that with confidence. For your case, please book a consultation with the advisor or contact us.",
};

/**
 * La conversación debe empezar con un mensaje del usuario. Los mensajes del usuario que
 * parezcan contener datos sensibles se omiten del historial que se envía al proveedor.
 */
export function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
  const cleaned = messages
    .map((m) => ({ ...m, content: m.content.trim() }))
    .filter((m) => m.content !== "")
    .map((m) => (m.role === "user" && containsSensitiveData(m.content) ? { ...m, content: "[omitted]" } : m));
  const firstUser = cleaned.findIndex((m) => m.role === "user");
  return firstUser === -1 ? [] : cleaned.slice(firstUser);
}

export async function generateReply(
  { locale, messages }: { locale: Locale; messages: ChatMessage[] },
  client: ChatClient,
  model: string = DEFAULT_MODEL,
): Promise<string> {
  const history = normalizeMessages(messages);
  if (history.length === 0) return fallbackReply[locale];

  const response = await client.messages.create({
    model,
    max_tokens: MAX_TOKENS,
    system: buildSystemPrompt(locale),
    messages: history,
    output_config: { effort: "low" },
  });

  // Rechazo por políticas de seguridad: respuesta amable en vez de texto vacío.
  if (response.stop_reason === "refusal") return fallbackReply[locale];

  const text = response.content
    .flatMap((block) => (block.type === "text" ? [block.text] : []))
    .join("\n")
    .trim();
  return text || fallbackReply[locale];
}
