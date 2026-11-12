import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { faqJsonLd, organizationJsonLd } from "@/lib/jsonld";
import { isLocale, locales } from "@/lib/i18n";
import { AdvisorIntro } from "@/components/sections/AdvisorIntro";
import { Booking } from "@/components/sections/Booking";
import { Contact } from "@/components/sections/Contact";
import { FAQ } from "@/components/sections/FAQ";
import { Hero } from "@/components/sections/Hero";
import { KeyDatesSection } from "@/components/sections/KeyDatesSection";
import { LocalBand } from "@/components/sections/LocalBand";
import { Process } from "@/components/sections/Process";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { JsonLd } from "@/components/ui/JsonLd";

const tagline = { es: "Taxes, empresas y seguros", en: "Taxes, business and insurance" } as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: { absolute: `${siteConfig.name} | ${tagline[locale]}` } };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <JsonLd data={faqJsonLd(locale)} />
      <JsonLd data={organizationJsonLd()} />
      <Hero locale={locale} />
      <TrustStrip locale={locale} />
      <ServiceGrid locale={locale} />
      <Process locale={locale} />
      <KeyDatesSection locale={locale} />
      <AdvisorIntro locale={locale} />
      <Booking locale={locale} />
      <FAQ locale={locale} />
      <Contact locale={locale} />
      <LocalBand locale={locale} />
    </>
  );
}
