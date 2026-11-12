import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { whatsappHref } from "@/lib/contact";
import { isLocale, locales } from "@/lib/i18n";
import { homePath } from "@/lib/routes";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const viewport: Viewport = { themeColor: "#041b3c" };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: dict.meta.description,
    icons: { icon: siteConfig.logo.src },
    // El sitio ya es bilingüe: evita que el traductor automático altere la marca y el contenido.
    other: { google: "notranslate" },
    // Sitio no publicado: sin indexación hasta el lanzamiento.
    robots: siteConfig.indexable ? undefined : { index: false, follow: false },
    // hreflang y URLs absolutas solo cuando exista dominio confirmado.
    ...(siteConfig.url
      ? {
          metadataBase: new URL(siteConfig.url),
          alternates: { languages: { es: "/es", en: "/en", "x-default": "/es" } },
        }
      : {}),
    openGraph: { siteName: siteConfig.name, locale: locale === "es" ? "es_US" : "en_US", type: "website" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${inter.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col pb-20 md:pb-0">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-navy"
        >
          {dict.a11y.skip}
        </a>
        <Header locale={locale} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} />
        <BookingProvider locale={locale} labels={dict.scheduler} />
        <aside aria-label={dict.a11y.quickActions}>
          <MobileCTABar locale={locale} />
          <WhatsAppFloat locale={locale} />
          <ChatWidget
            locale={locale}
            labels={dict.chat}
            stackedOnWhatsapp={whatsappHref(locale) !== null}
            links={{ services: homePath(locale, "servicios"), booking: homePath(locale, "agenda"), whatsapp: whatsappHref(locale) }}
          />
        </aside>
      </body>
    </html>
  );
}
