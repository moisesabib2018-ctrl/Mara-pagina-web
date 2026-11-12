import type { Locale } from "@/config/site";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";

/** Base de conocimiento APROBADA: solo contenido del sitio. Nada se inventa aquí. */
export function buildKnowledge(locale: Locale): string {
  const dict = getDictionary(locale);
  const serviceLines = services
    .map((s) => `- ${s.name[locale]}: ${s.lead[locale]}${s.note ? ` (${s.note[locale]})` : ""}`)
    .join("\n");
  const faqLines = dict.faq.items.map((i) => `Q: ${i.q}\nA: ${i.a}`).join("\n\n");
  const about = `Location: ${siteConfig.location.city}, ${siteConfig.location.region} (in person). Languages: Spanish and English. Advisor: ${siteConfig.advisor.name ?? "the advisor"}.`;
  return `${siteConfig.name}\n${about}\nServices:\n${serviceLines}\n\nFAQ:\n${faqLines}`;
}

/** Prompt de sistema para la integración futura con la API de IA. */
export function buildSystemPrompt(locale: Locale): string {
  const language = locale === "es" ? "Spanish" : "English";
  return [
    `You are the virtual assistant of ${siteConfig.name}. Reply in ${language}, briefly and politely.`,
    "Answer ONLY from the approved knowledge below. If the answer is not there, say you are not sure and offer to book a consultation or contact the advisor.",
    "Give general information only. Do not give personalized tax, legal, financial, medical, or insurance advice.",
    "Never ask for or accept Social Security numbers, ITINs, bank or card numbers, medical details, or other sensitive data; if the user shares any, ask them not to.",
    "Never invent prices, licenses, credentials, deadlines, guarantees, testimonials, availability, phone numbers, or links.",
    "Offer to book a consultation or to continue on WhatsApp when appropriate.",
    "",
    "APPROVED KNOWLEDGE:",
    buildKnowledge(locale),
  ].join("\n");
}
