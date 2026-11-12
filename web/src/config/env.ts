import { z } from "zod";

/**
 * Variables de entorno del servidor. Se validan al llamar `getServerEnv()`,
 * no al importar, para que el sitio compile sin credenciales.
 * Todas son opcionales hasta que se integre cada servicio.
 */
const serverSchema = z.object({
  ANTHROPIC_API_KEY: z.string().optional(),
  /** Modelo del chatbot. Por defecto claude-opus-5-5 (ver src/lib/chat/respond.ts). */
  ANTHROPIC_MODEL: z.string().optional(),
  /** "false" apaga el chatbot aunque exista la clave. */
  CHAT_ENABLED: z.string().optional(),
  /** Tope global de mensajes del chatbot por día (control de costo). */
  CHAT_DAILY_LIMIT: z.coerce.number().int().positive().optional(),
  CONTACT_EMAIL_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.string().optional(),
  CONTACT_EMAIL_FROM: z.string().optional(),
});

export function getServerEnv() {
  return serverSchema.parse(process.env);
}

/** El chatbot se activa solo con clave de API y sin CHAT_ENABLED=false. */
export function isChatEnabled(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY?.trim()) && process.env.CHAT_ENABLED !== "false";
}
