import { z } from "zod";

/**
 * Variables de entorno del servidor. Se validan al llamar `getServerEnv()`,
 * no al importar, para que el sitio compile sin credenciales.
 * Todas son opcionales hasta que se integre cada servicio.
 */
const serverSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  /** Proveedor del chat: "gemini" (Google) o "anthropic" (Claude). Si no se indica, se elige según la clave que exista. */
  CHAT_PROVIDER: z.string().optional(),
  /** Google (Gemini API): clave de Google AI Studio y nombre del modelo (se copia del panel; cambia entre versiones). */
  GEMINI_API_KEY: z.string().optional(),
  GOOGLE_API_KEY: z.string().optional(),
  GEMINI_MODEL: z.string().optional(),
  /** Opcional: dirección de la API de Google (para pruebas con un servidor falso). */
  GEMINI_BASE_URL: z.string().optional(),
  /** Modelo del chatbot. Por defecto claude-opus-5-5 (ver src/lib/chat/respond.ts). */
  ANTHROPIC_MODEL: z.string().optional(),
  /** "false" apaga el chatbot aunque exista la clave. */
  CHAT_ENABLED: z.string().optional(),
  /** Tope global de mensajes del chatbot por día (control de costo). */
  CHAT_DAILY_LIMIT: z.coerce.number().int().positive().optional(),
  CONTACT_EMAIL_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.string().optional(),
  CONTACT_EMAIL_FROM: z.string().optional(),
  /** Opcional: dirección de la API de correo (por defecto Resend). Útil para pruebas con un servidor falso. */
  CONTACT_EMAIL_API_URL: z.string().optional(),
});

export function getServerEnv() {
  return serverSchema.parse(process.env);
}

export type ChatProvider = "gemini" | "anthropic";

/**
 * Proveedor del chat según las variables de entorno (null = apagado). Google necesita clave Y modelo.
 * Con CHAT_PROVIDER se fuerza uno; sin él, gana Claude si hay clave de Claude y, si no, Google.
 */
export function chatProvider(): ChatProvider | null {
  const has = (v?: string) => Boolean(v?.trim());
  if (process.env.CHAT_ENABLED === "false") return null;
  const gemini = (has(process.env.GEMINI_API_KEY) || has(process.env.GOOGLE_API_KEY)) && has(process.env.GEMINI_MODEL);
  const claude = has(process.env.ANTHROPIC_API_KEY);
  const forced = process.env.CHAT_PROVIDER?.trim().toLowerCase();
  if (forced === "gemini") return gemini ? "gemini" : null;
  if (forced === "anthropic") return claude ? "anthropic" : null;
  return claude ? "anthropic" : gemini ? "gemini" : null;
}

/** El chatbot se activa solo si hay un proveedor configurado y sin CHAT_ENABLED=false. */
export function isChatEnabled(): boolean {
  return chatProvider() !== null;
}

/** El formulario de contacto envía correos solo si están las tres variables (clave, destinatario y remitente). */
export function isContactConfigured(): boolean {
  const ok = (v?: string) => Boolean(v?.trim());
  return ok(process.env.CONTACT_EMAIL_API_KEY) && ok(process.env.CONTACT_EMAIL_TO) && ok(process.env.CONTACT_EMAIL_FROM);
}
