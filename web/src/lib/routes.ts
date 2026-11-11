import type { Locale } from "@/config/site";
import { serviceIds, serviceSlugs, servicesSegment, type ServiceId } from "@/config/service-slugs";

export const homePath = (locale: Locale, hash?: string) => `/${locale}${hash ? `#${hash}` : ""}`;

export const servicePath = (locale: Locale, id: ServiceId) =>
  `/${locale}/${servicesSegment[locale]}/${serviceSlugs[id][locale]}`;

/**
 * Equivalente de la ruta actual en otro idioma (traduce los slugs de servicio).
 * Acepta tanto la URL pública como la ruta canónica interna (/en/servicios/...).
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const [, segment, slug] = pathname.split("/").filter(Boolean);
  const isServicesSegment = segment === servicesSegment.es || segment === servicesSegment.en;
  if (isServicesSegment && slug) {
    const id = serviceIds.find((s) => serviceSlugs[s].es === slug || serviceSlugs[s].en === slug);
    if (id) return servicePath(to, id);
  }
  return `/${to}`;
}
