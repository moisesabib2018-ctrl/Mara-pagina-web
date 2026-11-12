import type { Locale } from "@/config/site";

type Strings = { intro: string; serviceLine: string; whenLine: string };

/** Arma el texto de la solicitud (se copia o se abre en WhatsApp; nunca se envía automáticamente). */
export function buildRequestMessage(strings: Strings, service: string, when: string): string {
  return [strings.intro, `${strings.serviceLine}: ${service}`, `${strings.whenLine}: ${when}`].join("\n");
}

export function whatsappLink(number: string, message: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export type { Locale };
