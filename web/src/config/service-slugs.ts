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
