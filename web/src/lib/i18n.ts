import { siteConfig, type Locale } from "@/config/site";

export const locales = siteConfig.locales;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export const localeNames: Record<Locale, string> = { es: "Español", en: "English" };

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
