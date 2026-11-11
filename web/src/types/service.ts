import type { Locale } from "@/config/site";
import type { ServiceId } from "@/config/service-slugs";

export type Localized<T = string> = Record<Locale, T>;

export type Step = { title: string; text: string };

/** Contenido de una página de servicio. BORRADOR: requiere aprobación de la asesora. */
export type Service = {
  id: ServiceId;
  name: Localized;
  /** Resumen de una línea para tarjetas. */
  short: Localized;
  /** Introducción de la página. */
  lead: Localized;
  forWhom: Localized<string[]>;
  steps: Localized<Step[]>;
  bring: Localized<string[]>;
  /** Aclaración importante (p. ej. depende del IRS o de la aseguradora). */
  note?: Localized;
};
