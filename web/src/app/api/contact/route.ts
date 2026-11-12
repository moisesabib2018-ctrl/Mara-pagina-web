import { isContactConfigured } from "@/config/env";
import { containsSensitiveData } from "@/lib/chat/guardrails";
import { createRateLimiter } from "@/lib/chat/rate-limit";
import { buildContactEmail, contactSchema } from "@/lib/contact-mail";

// Mejor esfuerzo por instancia: 5 mensajes por visitante cada 10 minutos.
const limiter = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });
const visitor = (r: Request) => r.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || r.headers.get("x-real-ip") || "unknown";

/** Estado en tiempo de ejecución: el formulario lo consulta para saber si el envío de correo está conectado. */
export async function GET() {
  return Response.json({ enabled: isContactConfigured() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
  const data = parsed.data;

  // Honeypot lleno = robot: se responde "ok" sin enviar nada.
  if (data.website) return Response.json({ ok: true });
  if (containsSensitiveData(data.message)) return Response.json({ error: "sensitive" }, { status: 400 });
  if (!isContactConfigured()) return Response.json({ error: "not_configured" }, { status: 503 });
  if (!limiter.check(visitor(request))) return Response.json({ error: "rate_limited" }, { status: 429 });

  const mail = buildContactEmail(data, process.env.CONTACT_EMAIL_FROM!.trim(), process.env.CONTACT_EMAIL_TO!.trim());
  try {
    const res = await fetch(process.env.CONTACT_EMAIL_API_URL?.trim() || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CONTACT_EMAIL_API_KEY!.trim()}`, "Content-Type": "application/json" },
      body: JSON.stringify(mail),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("contact email error", res.status); // sin datos de la persona en los registros
      return Response.json({ error: "upstream" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    console.error("contact email error", "network");
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
