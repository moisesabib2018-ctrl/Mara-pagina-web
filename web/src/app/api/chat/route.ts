import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getServerEnv, isChatEnabled } from "@/config/env";
import { containsSensitiveData, sensitiveDataReply } from "@/lib/chat/guardrails";
import { createRateLimiter } from "@/lib/chat/rate-limit";
import { DEFAULT_MODEL, generateReply } from "@/lib/chat/respond";

const schema = z.object({
  locale: z.enum(siteConfig.locales),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(800) }))
    .min(1)
    .max(12),
});

// Mejor esfuerzo por instancia (ver rate-limit.ts). 12 mensajes por visitante cada 10 min.
const perVisitor = createRateLimiter({ limit: 12, windowMs: 10 * 60 * 1000 });
let dailyLimiter: ReturnType<typeof createRateLimiter> | null = null;

function visitorKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Estado en tiempo de ejecución: el widget lo consulta al abrirse (la clave puede agregarse sin recompilar). */
export async function GET() {
  return Response.json({ enabled: isChatEnabled() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
  const { locale, messages } = parsed.data;

  const last = messages[messages.length - 1];
  if (last.role !== "user") return Response.json({ error: "invalid" }, { status: 400 });

  // Protección: nada se envía al proveedor si el mensaje parece contener datos sensibles.
  if (containsSensitiveData(last.content)) {
    return Response.json({ reply: sensitiveDataReply[locale], blocked: true });
  }

  // Sin clave (o apagado) no se inventan respuestas.
  if (!isChatEnabled()) return Response.json({ error: "not_configured" }, { status: 503 });

  const env = getServerEnv();
  dailyLimiter ??= createRateLimiter({ limit: env.CHAT_DAILY_LIMIT ?? 300, windowMs: 24 * 60 * 60 * 1000, maxKeys: 1 });
  if (!perVisitor.check(visitorKey(request)) || !dailyLimiter.check("all")) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 });
    const reply = await generateReply({ locale, messages }, client, env.ANTHROPIC_MODEL?.trim() || DEFAULT_MODEL);
    return Response.json({ reply });
  } catch (error) {
    // No se filtran detalles al navegador.
    console.error("chat error", error instanceof Anthropic.APIError ? `API ${error.status}` : "unexpected");
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
