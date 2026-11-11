import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { whatsappHref } from "@/lib/contact";
import { homePath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { Calendar, Message } from "@/components/ui/Icons";

/** Barra fija inferior solo en celulares: acción principal siempre a un toque. */
export function MobileCTABar({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const wa = whatsappHref();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <ButtonLink href={homePath(locale, "agenda")} size="lg" className="flex-1">
        <Calendar />
        {dict.cta.bookShort}
      </ButtonLink>
      {wa ? (
        <ButtonLink href={wa} external variant="outline" size="lg" aria-label={dict.cta.whatsapp}>
          <Message />
          {dict.cta.whatsapp}
        </ButtonLink>
      ) : null}
    </div>
  );
}
