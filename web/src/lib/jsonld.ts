import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import type { Service } from "@/types/service";

export function faqJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getDictionary(locale).faq.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

/** Organization solo si hay URL de producción confirmada. */
export function organizationJsonLd() {
  if (!siteConfig.url) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    // Solo ciudad y estado confirmados; la dirección exacta sigue pendiente.
    address: { "@type": "PostalAddress", addressLocality: siteConfig.location.city, addressRegion: siteConfig.location.regionCode, addressCountry: "US" },
    areaServed: { "@type": "City", name: siteConfig.location.city },
  };
}

export function serviceJsonLd(service: Service, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name[locale],
    description: service.lead[locale],
    provider: { "@type": "Organization", name: siteConfig.name },
  };
}
