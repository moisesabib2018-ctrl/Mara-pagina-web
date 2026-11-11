import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { whatsappHref } from "@/lib/contact";
import { Message } from "@/components/ui/Icons";

/** Botón flotante de WhatsApp (escritorio; en celular está en la barra inferior). Solo con número confirmado. */
export function WhatsAppFloat({ locale }: { locale: Locale }) {
  const wa = whatsappHref();
  if (!wa) return null;
  const label = getDictionary(locale).cta.whatsapp;
  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-6 right-6 z-40 hidden size-14 items-center justify-center rounded-full bg-navy text-white shadow-lg ring-1 ring-white/20 transition-colors hover:bg-deep md:flex"
    >
      <Message width={26} height={26} />
    </a>
  );
}
