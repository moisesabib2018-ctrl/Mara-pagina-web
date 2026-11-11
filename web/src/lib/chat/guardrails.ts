import type { Locale } from "@/config/site";

/**
 * Bloquea mensajes que parezcan contener datos sensibles (SSN, ITIN, EIN, tarjetas,
 * cuentas bancarias): cualquier secuencia de 9 o más dígitos, con espacios o guiones.
 */
const LONG_DIGIT_RUN = /(?:\d[\s-]?){9,}/;
const EIN = /\b\d{2}-\d{7}\b/;

export function containsSensitiveData(text: string): boolean {
  return LONG_DIGIT_RUN.test(text) || EIN.test(text);
}

export const sensitiveDataReply: Record<Locale, string> = {
  es: "Por tu seguridad, no compartas números de seguro social, ITIN, cuentas bancarias ni otros datos sensibles por aquí. Para revisar tu caso, agenda una consulta con la asesora.",
  en: "For your safety, please do not share Social Security numbers, ITINs, bank accounts, or other sensitive data here. To review your case, book a consultation with the advisor.",
};
