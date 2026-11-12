import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";

export type Channel = { key: "whatsapp" | "instagram" | "email" | "phone"; href: string; value: string };

/** Enlace de WhatsApp con mensaje inicial en el idioma del visitante. */
export function buildWhatsappHref(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Número para mostrar: "+1 (713) 555-0123" (11 dígitos con 1), "(713) 555-0123" (10) o "+dígitos". */
export function formatPhoneDisplay(raw: string): string {
  const d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("1")) return `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  return `+${d}`;
}

/** Solo canales confirmados (no nulos). */
export function getChannels(locale: Locale): Channel[] {
  const { whatsapp, instagram, email, phone } = siteConfig.contact;
  const list: Channel[] = [];
  if (whatsapp) list.push({ key: "whatsapp", href: buildWhatsappHref(whatsapp, getDictionary(locale).cta.whatsappMessage), value: `WhatsApp ${formatPhoneDisplay(whatsapp)}` });
  if (instagram) list.push({ key: "instagram", href: instagram, value: "Instagram" });
  if (email) list.push({ key: "email", href: `mailto:${email}`, value: email });
  if (phone) list.push({ key: "phone", href: `tel:${phone.replace(/[^\d+]/g, "")}`, value: phone });
  return list;
}

export const whatsappHref = (locale: Locale) => getChannels(locale).find((c) => c.key === "whatsapp")?.href ?? null;
