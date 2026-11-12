import type { Locale } from "@/config/site";
import { legalIds, legalSlugs, serviceIds, serviceSlugs, servicesSegment, type LegalId, type ServiceId } from "@/config/service-slugs";

export const homePath = (locale: Locale, hash?: string) => `/${locale}${hash ? `#${hash}` : ""}`;

export const servicePath = (locale: Locale, id: ServiceId) =>
  `/${locale}/${servicesSegment[locale]}/${serviceSlugs[id][locale]}`;

export const legalPath = (locale: Locale, id: LegalId) => `/${locale}/${legalSlugs[id][locale]}`;

/**
 * Equivalente de la ruta actual en otro idioma (traduce los slugs de servicio).
 * Acepta tanto la URL pública como la ruta canónica interna (/en/servicios/...).
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const [, segment, slug] = pathname.split("/").filter(Boolean);
  const legal = legalIds.find((id) => legalSlugs[id].es === segment || legalSlugs[id].en === segment);
  if (legal && !slug) return legalPath(to, legal);
  const isServicesSegment = segment === servicesSegment.es || segment === servicesSegment.en;
  if (isServicesSegment && slug) {
    const id = serviceIds.find((s) => serviceSlugs[s].es === slug || serviceSlugs[s].en === slug);
    if (id) return servicePath(to, id);
  }
  return `/${to}`;
}
