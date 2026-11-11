import { siteConfig } from "@/config/site";

export type Channel = { key: "whatsapp" | "instagram" | "email" | "phone"; href: string; value: string };

/** Solo canales confirmados (no nulos). */
export function getChannels(): Channel[] {
  const { whatsapp, instagram, email, phone } = siteConfig.contact;
  const list: Channel[] = [];
  if (whatsapp) list.push({ key: "whatsapp", href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`, value: "WhatsApp" });
  if (instagram && instagram.startsWith("https://")) list.push({ key: "instagram", href: instagram, value: "Instagram" });
  if (email) list.push({ key: "email", href: `mailto:${email}`, value: email });
  if (phone) list.push({ key: "phone", href: `tel:${phone.replace(/[^\d+]/g, "")}`, value: phone });
  return list;
}

export const whatsappHref = () => getChannels().find((c) => c.key === "whatsapp")?.href ?? null;
