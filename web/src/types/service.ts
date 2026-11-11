import type { Locale } from "@/config/site";

export type ServiceSlug =
  | "taxes-individuales"
  | "taxes-corporativos"
  | "creacion-de-empresas"
  | "itin"
  | "seguros-de-vida"
  | "seguros-de-salud";

export type Localized = Record<Locale, string>;

export type Service = {
  slug: ServiceSlug;
  name: Localized;
  /** Descripción aprobada por el cliente. null = pendiente, no se muestra. */
  summary: Localized | null;
};
