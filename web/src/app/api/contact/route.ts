import { z } from "zod";
import { siteConfig } from "@/config/site";
import { getServerEnv } from "@/config/env";
import { serviceIds } from "@/config/service-slugs";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(150),
  phone: z.string().trim().max(30).optional(),
  service: z.enum(serviceIds).or(z.literal("")).optional(),
  message: z.string().trim().min(1).max(1500),
  locale: z.enum(siteConfig.locales),
  website: z.string().max(0).optional(), // honeypot
});

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });

  // Aún no hay proveedor de email conectado: no se finge el envío.
  const env = getServerEnv();
  if (!siteConfig.contactForm.enabled || !env.CONTACT_EMAIL_API_KEY || !env.CONTACT_EMAIL_TO) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  // TODO: enviar con el proveedor de email elegido (pendiente de definir).
  return Response.json({ error: "not_implemented" }, { status: 501 });
}
