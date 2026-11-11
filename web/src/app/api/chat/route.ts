import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getServerEnv } from "@/config/env";
import { containsSensitiveData, sensitiveDataReply } from "@/lib/chat/guardrails";

const schema = z.object({
  locale: z.enum(siteConfig.locales),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(800) }))
    .min(1)
    .max(12),
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
  const { locale, messages } = parsed.data;

  const last = messages[messages.length - 1];
  if (last.role !== "user") return Response.json({ error: "invalid" }, { status: 400 });

  // Protección: no se envía a ningún proveedor si el mensaje parece contener datos sensibles.
  if (containsSensitiveData(last.content)) {
    return Response.json({ reply: sensitiveDataReply[locale], blocked: true });
  }

  // Aún no hay proveedor de IA conectado: no se inventan respuestas.
  const env = getServerEnv();
  if (!siteConfig.chat.enabled || !env.ANTHROPIC_API_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  // TODO: llamar a la API de IA con buildSystemPrompt(locale) (src/lib/chat/knowledge.ts),
  // limitar frecuencia por IP y transmitir la respuesta.
  return Response.json({ error: "not_implemented" }, { status: 501 });
}
