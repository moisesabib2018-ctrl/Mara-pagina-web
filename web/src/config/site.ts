/**
 * Datos del sitio. Solo valores confirmados por el cliente.
 * `null` = pendiente: los componentes NO deben renderizar nada para ese dato.
 * Nunca rellenar con datos de ejemplo.
 */
export const siteConfig = {
  name: "Blanchard Group LLC",
  /** Ruta pública del logo original (pendiente de recibir referencias/prototipo-v3). */
  logo: null as { src: string; width: number; height: number } | null,
  /** URL de producción. Pendiente de dominio. */
  url: null as string | null,
  contact: {
    whatsapp: null as string | null, // solo dígitos con código de país
    instagram: null as string | null, // URL completa
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },
  locales: ["es", "en"] as const,
  defaultLocale: "es" as const,
  booking: {
    consultationMinutes: 45,
    breakMinutes: 15, // interno: nunca se muestra al cliente
    timeZone: null as string | null, // pendiente
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];
