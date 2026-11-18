import type { Localized } from "@/types/service";

/**
 * Comentarios de clientes.
 *
 * REGLA: nunca inventar testimonios. `testimonials` se llena SOLO con comentarios reales, con permiso por escrito
 * de la persona (nombre, cargo/servicio y, si hay, foto). Mientras esté vacío, la sección solo aparece si
 * `siteConfig.testimonialsPreview` es true, y entonces muestra tarjetas de EJEMPLO (`sampleTestimonials`) con un
 * aviso visible. Con la vista previa apagada y sin comentarios reales, la sección no se muestra.
 */
export type Testimonial = {
  id: string;
  quote: Localized;
  /** Nombre como lo autorizó la persona (puede ser solo nombre y apellido inicial). */
  name: Localized;
  /** Servicio recibido u ocupación, opcional. */
  role?: Localized;
  /** Foto autorizada, opcional (ruta en /public). Sin foto se muestran las iniciales. */
  photo?: string;
};

/** Comentarios reales y autorizados. Pendiente: pedirlos a la asesora. */
export const testimonials: Testimonial[] = [];

/** SOLO para la vista previa del diseño: textos genéricos, sin nombres ni opiniones reales. */
export const sampleTestimonials: Testimonial[] = [
  {
    id: "ejemplo-1",
    quote: {
      es: "Aquí aparecerá el comentario de un cliente, escrito con sus propias palabras.",
      en: "A client's comment will appear here, in their own words.",
    },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
  {
    id: "ejemplo-2",
    quote: {
      es: "Texto de ejemplo para mostrar cómo se verá un comentario más largo dentro de la tarjeta, con varias líneas de texto, antes de reemplazarlo por uno real y autorizado.",
      en: "Sample text to show how a longer comment will look inside the card, spanning several lines, before it is replaced with a real, authorized one.",
    },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
  {
    id: "ejemplo-3",
    quote: { es: "Comentario de ejemplo.", en: "Sample comment." },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
  {
    id: "ejemplo-4",
    quote: {
      es: "Este es un espacio para que una persona cuente su experiencia con Blanchard Group LLC.",
      en: "This is a space for a person to share their experience with Blanchard Group LLC.",
    },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
  {
    id: "ejemplo-5",
    quote: {
      es: "Otro comentario de ejemplo, de largo mediano, para ver el ritmo de las tarjetas al desplazarse.",
      en: "Another sample comment, of medium length, to see the rhythm of the cards as they scroll.",
    },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
  {
    id: "ejemplo-6",
    quote: {
      es: "Texto de muestra. Será reemplazado por un comentario verdadero.",
      en: "Placeholder text. It will be replaced with a genuine comment.",
    },
    name: { es: "Nombre del cliente", en: "Client name" },
    role: { es: "Servicio que recibió", en: "Service received" },
  },
];
