import { z } from "zod";

/**
 * Variables de entorno del servidor. Se validan al llamar `getServerEnv()`,
 * no al importar, para que el sitio compile sin credenciales.
 * Todas son opcionales hasta que se integre cada servicio.
 */
const serverSchema = z.object({
  GOOGLE_CLIENT_EMAIL: z.string().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
  GOOGLE_AVAILABILITY_CALENDAR_ID: z.string().optional(),
  GOOGLE_BOOKING_CALENDAR_ID: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  CONTACT_EMAIL_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.string().optional(),
  CONTACT_EMAIL_FROM: z.string().optional(),
});

export function getServerEnv() {
  return serverSchema.parse(process.env);
}
