import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { legalDocs } from "@/content/legal";
import { isLocale, locales } from "@/lib/i18n";
import { LegalDocument } from "@/components/sections/LegalDocument";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/terminos">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: legalDocs.terms.title[locale] };
}

export default async function Page({ params }: PageProps<"/[locale]/terminos">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <LegalDocument locale={locale} id="terms" />;
}
