import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { getBookingTarget } from "@/lib/booking";
import { getChannels } from "@/lib/contact";
import { homePath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Calendar } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Calendario oficial de Google Calendar (Appointment Schedules).
 * Sin enlace confirmado NO muestra horarios ni simula reservas.
 */
export function Booking({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const target = getBookingTarget(siteConfig.booking.url);
  const channels = getChannels().filter((c) => c.key === "whatsapp" || c.key === "email" || c.key === "phone");

  return (
    <section id="agenda" aria-labelledby="agenda-title" className="bg-deep py-16 sm:py-24">
      <Container>
        <SectionHeading id="agenda-title" light eyebrow={dict.booking.eyebrow} title={dict.booking.title} text={dict.booking.text} />

        <div className="mt-10 rounded-lg bg-white p-4 text-navy sm:p-6">
          {target.kind === "embed" ? (
            <>
              <iframe
                src={target.src}
                title={dict.booking.iframeTitle}
                loading="lazy"
                className="h-[720px] w-full rounded-md border-0"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-ink-soft">{dict.booking.note}</p>
                <ButtonLink href={target.href} external variant="outline">
                  {dict.booking.open}
                </ButtonLink>
              </div>
            </>
          ) : target.kind === "link" ? (
            <div className="flex flex-col items-start gap-4 p-2 sm:p-4">
              <Calendar width={28} height={28} className="text-gold-dark" />
              <p className="text-ink-soft">{dict.booking.note}</p>
              <ButtonLink href={target.href} external size="lg">
                {dict.cta.book}
              </ButtonLink>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 p-2 sm:p-6">
              <Calendar width={28} height={28} className="text-gold-dark" />
              <h3 className="font-serif text-2xl text-navy">{dict.booking.pendingTitle}</h3>
              <p className="max-w-xl text-ink-soft">{dict.booking.pendingText}</p>
              <div className="flex flex-col gap-3 sm:flex-row">
                {channels.map((c) => (
                  <ButtonLink key={c.key} href={c.href} external={c.href.startsWith("https://")} variant="outline">
                    {c.value}
                  </ButtonLink>
                ))}
                <ButtonLink href={homePath(locale, "contacto")} variant="outline">
                  {dict.nav.contact}
                </ButtonLink>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
