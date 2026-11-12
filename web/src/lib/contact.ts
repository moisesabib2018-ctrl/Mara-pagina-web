import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";

export type Channel = { key: "whatsapp" | "instagram" | "email" | "phone"; href: string; value: string };

/** Enlace de WhatsApp con mensaje inicial en el idioma del visitante. */
export function buildWhatsappHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Solo canales confirmados (no nulos). */
export function getChannels(locale: Locale): Channel[] {
  const { whatsapp, instagram, email, phone } = siteConfig.contact;
  const list: Channel[] = [];
  if (whatsapp) list.push({ key: "whatsapp", href: buildWhatsappHref(whatsapp, getDictionary(locale).cta.whatsappMessage), value: "WhatsApp" });
  if (instagram) list.push({ key: "instagram", href: instagram, value: "Instagram" });
  if (email) list.push({ key: "email", href: `mailto:${email}`, value: email });
  if (phone) list.push({ key: "phone", href: `tel:${phone.replace(/[^\d+]/g, "")}`, value: phone });
  return list;
}

export const whatsappHref = (locale: Locale) => getChannels(locale).find((c) => c.key === "whatsapp")?.href ?? null;
