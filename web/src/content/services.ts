import type { Service } from "@/types/service";

/** Solo nombres de servicio dados por el cliente. Descripciones pendientes. */
export const services: Service[] = [
  { slug: "taxes-individuales", name: { es: "Taxes individuales", en: "Individual taxes" }, summary: null },
  { slug: "taxes-corporativos", name: { es: "Taxes corporativos", en: "Corporate taxes" }, summary: null },
  { slug: "creacion-de-empresas", name: { es: "Creación de empresas", en: "Business formation" }, summary: null },
  { slug: "itin", name: { es: "ITIN", en: "ITIN" }, summary: null },
  { slug: "seguros-de-vida", name: { es: "Seguros de vida", en: "Life insurance" }, summary: null },
  { slug: "seguros-de-salud", name: { es: "Seguros de salud", en: "Health insurance" }, summary: null },
];
