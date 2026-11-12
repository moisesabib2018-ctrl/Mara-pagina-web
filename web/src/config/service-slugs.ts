/** Identificadores y slugs de URL por idioma. Sin imports: lo usa también next.config.ts. */
export const serviceIds = [
  "taxes-individuales",
  "taxes-corporativos",
  "creacion-de-empresas",
  "itin",
  "seguros-de-vida",
  "seguros-de-salud",
] as const;

export type ServiceId = (typeof serviceIds)[number];

export const serviceSlugs: Record<ServiceId, { es: string; en: string }> = {
  "taxes-individuales": { es: "taxes-individuales", en: "individual-taxes" },
  "taxes-corporativos": { es: "taxes-corporativos", en: "corporate-taxes" },
  "creacion-de-empresas": { es: "creacion-de-empresas", en: "business-formation" },
  itin: { es: "itin", en: "itin" },
  "seguros-de-vida": { es: "seguros-de-vida", en: "life-insurance" },
  "seguros-de-salud": { es: "seguros-de-salud", en: "health-insurance" },
};

export const servicesSegment = { es: "servicios", en: "services" } as const;

/** Páginas legales: ruta canónica interna en español (`/es/privacidad`); en inglés se publica como `/en/privacy` (rewrite). */
export const legalIds = ["privacy", "terms"] as const;
export type LegalId = (typeof legalIds)[number];
export const legalSlugs: Record<LegalId, { es: string; en: string }> = {
  privacy: { es: "privacidad", en: "privacy" },
  terms: { es: "terminos", en: "terms" },
};

/**
 * ¿Es una URL pública inválida que, sin esta comprobación, respondería 200 (la ruta dinámica o la interna la atienden)?
 * - `/en/servicios/*` y `/en/privacidad|terminos`: rutas internas, no públicas.
 * - `/es/servicios/<slug desconocido>`.
 * El proxy las manda a la pantalla 404 con estado HTTP 404 (con `cacheComponents` no existe `dynamicParams`).
 */
export function isInvalidPublicPath(pathname: string): boolean {
  const [locale, segment, slug] = pathname.split("/").filter(Boolean);
  if (locale === "en") return segment === "servicios" || segment === "privacidad" || segment === "terminos";
  if (locale === "es" && segment === "servicios" && slug) {
    return !serviceIds.some((id) => serviceSlugs[id].es === slug);
  }
  return false;
}
