import { publicEnv } from "@/lib/public-env";

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
  url: publicEnv.siteUrl, // NEXT_PUBLIC_SITE_URL
  /** false hasta el lanzamiento: mantiene noindex. NEXT_PUBLIC_INDEXABLE=true lo activa. */
  indexable: publicEnv.indexable,
  contact: {
    // Se configuran con variables de entorno (ver .env.example). null = no se muestra.
    whatsapp: publicEnv.whatsapp, // NEXT_PUBLIC_WHATSAPP
    instagram: publicEnv.instagram, // NEXT_PUBLIC_INSTAGRAM_URL
    email: publicEnv.email, // NEXT_PUBLIC_CONTACT_EMAIL
    phone: publicEnv.phone, // NEXT_PUBLIC_PHONE
    address: null as string | null,
  },
  /** Zona de servicio confirmada por el cliente. La dirección exacta sigue pendiente (contact.address). */
  location: {
    city: "Houston",
    region: "Texas",
    regionCode: "TX",
    inPerson: true,
    /** Fotografía de fondo de "De Houston, para Houston" (Wikimedia Commons, licencia comprobada). Cambiable por una foto propia. */
    photo: {
      src: "/images/houston-skyline.jpg",
      width: 1920,
      height: 960,
      // Licencia CC BY 4.0: exige dar crédito al autor, enlazar la licencia e indicar que se modificó (recorte y capa de color).
      credit: {
        author: "David Daniel Turner",
        license: "CC BY 4.0",
        licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
        sourceUrl: "https://commons.wikimedia.org/wiki/File:Downtown_Houston,_TX_Skyline_-_2018.jpg",
      },
    } as {
      src: string;
      width: number;
      height: number;
      credit?: { author: string; license: string; licenseUrl: string; sourceUrl: string };
    } | null,
  },
  advisor: {
    name: "Mariamna Blanchard Hernandez" as string | null,
    photo: { src: "/images/advisor-portrait.jpg", width: 1600, height: 1066 } as { src: string; width: number; height: number } | null,
    bio: null as { es: string; en: string } | null, // biografía y credenciales: pendientes
  },
  locales: ["es", "en"] as const,
  defaultLocale: "es" as const,
  booking: {
    /**
     * "preview" = el calendario es solo una VISTA PREVIA del diseño: horarios de ejemplo, no crea citas ni envía datos
     * y muestra un aviso visible. Pasará a "live" cuando se conecte la API de Google Calendar (pendiente).
     */
    mode: "preview" as "preview" | "live",
    consultationMinutes: 45,
    /** Descanso entre consultas: INTERNO, nunca se muestra al cliente (solo separa el inicio de cada horario). */
    breakMinutes: 15,
    /** Los horarios se muestran en la hora de la oficina. */
    timeZone: "America/Chicago",
    /** Hasta cuántos meses adelante se puede reservar. */
    maxAdvanceMonths: 3,
    /** Aviso mínimo antes de una cita (minutos). */
    minNoticeMinutes: 120,
    /** Horario de EJEMPLO para la vista previa (el real lo definirá la asesora en Google Calendar). */
    previewHours: { weekdays: [1, 2, 3, 4, 5], firstHour: 9, lastHour: 16 },
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];
