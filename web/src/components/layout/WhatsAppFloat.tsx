import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { whatsappHref } from "@/lib/contact";
import { Message } from "@/components/ui/Icons";

/** Botón de WhatsApp en la esquina inferior derecha (celular y escritorio). Solo aparece con un número confirmado. */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const wa = whatsappHref(locale);
  if (!wa) return null;
  const label = getDictionary(locale).cta.whatsapp;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed bottom-[5.5rem] right-3 z-40 flex size-12 items-center justify-center rounded-full bg-[#1a9e4d] text-white shadow-lg ring-2 ring-white transition-all hover:scale-105 hover:bg-[#158a42] md:bottom-6 md:right-6 md:size-14"
    >
      <Message width={26} height={26} />
    </a>
  );
}
