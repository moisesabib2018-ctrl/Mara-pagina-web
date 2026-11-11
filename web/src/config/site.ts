/**
 * Datos del sitio. Solo valores confirmados por el cliente.
 * `null` = pendiente: los componentes NO deben renderizar nada para ese dato.
 * Nunca rellenar con datos de ejemplo.
 */
export const siteConfig = {
  name: "Blanchard Group LLC",
  /** Logo original, sin modificar (JPG cuadrado 1254×1254). */
  logo: { src: "/brand/logo-blanchard-group.jpg", width: 1254, height: 1254 },
  /** URL de producción. Pendiente de dominio. Activa metadataBase, hreflang y JSON-LD. */
  url: null as string | null,
  /** false hasta el lanzamiento: mantiene noindex. */
  indexable: false,
  contact: {
    whatsapp: null as string | null, // solo dígitos con código de país
    instagram: null as string | null, // URL completa https://...
    email: null as string | null,
    phone: null as string | null,
    address: null as string | null,
  },
  advisor: {
    name: null as string | null,
    photo: null as { src: string; width: number; height: number } | null,
    bio: null as { es: string; en: string } | null,
  },
  locales: ["es", "en"] as const,
  defaultLocale: "es" as const,
  booking: {
    consultationMinutes: 45,
    // Los 15 min de descanso se configuran en Google Calendar y nunca se muestran.
    /** Enlace público de la página de citas de Google Calendar. Pendiente. */
    url: null as string | null,
  },
  /** El chatbot solo se activa cuando /api/chat esté integrado con un proveedor de IA. */
  chat: { enabled: false },
  /** El formulario solo se activa cuando /api/contact esté conectado a un proveedor de email. */
  contactForm: { enabled: false },
} as const;

export type Locale = (typeof siteConfig.locales)[number];
