import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceIds } from "@/config/service-slugs";
import { getService } from "@/content/services";
import { isLocale, locales } from "@/lib/i18n";
import { serviceJsonLd } from "@/lib/jsonld";
import { Booking } from "@/components/sections/Booking";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { JsonLd } from "@/components/ui/JsonLd";

/**
 * Las 6 páginas de servicio se generan estáticas (generateStaticParams). Se desactiva solo el aviso de desarrollo
 * "navegación instantánea" de Next, que pide envolver `params` en <Suspense>; no cambia el resultado en producción.
 */
export const instant = false;

/** Ruta canónica interna. En inglés se sirve como /en/services/<slug> mediante rewrites (next.config.ts). */
export function generateStaticParams() {
  return locales.flatMap((locale) => serviceIds.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/servicios/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) return {};
  return { title: service.name[locale], description: service.lead[locale] };
}

export default async function ServicePage({ params }: PageProps<"/[locale]/servicios/[slug]">) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!isLocale(locale) || !service) notFound();

  return (
    <>
      <JsonLd data={serviceJsonLd(service, locale)} />
      <ServiceDetail locale={locale} service={service} />
      <Booking locale={locale} />
    </>
  );
}
