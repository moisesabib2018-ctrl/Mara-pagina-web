import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { serviceIds } from "@/config/service-slugs";
import { homePath, servicePath } from "@/lib/routes";

/** Sin URL de producción no hay sitemap. Incluye alternativas es/en (hreflang) de cada página. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  if (!base) return [];
  const pair = (es: string, en: string) => ({
    url: `${base}${es}`,
    alternates: { languages: { es: `${base}${es}`, en: `${base}${en}` } },
  });
  return [
    pair(homePath("es"), homePath("en")),
    ...serviceIds.map((id) => pair(servicePath("es", id), servicePath("en", id))),
  ];
}
