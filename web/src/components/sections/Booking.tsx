import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Sección «Agenda»: el calendario propio en línea. Los demás botones «Agendar» abren este mismo calendario en una ventana. */
export function Booking({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="agenda" aria-labelledby="agenda-title" className="view bg-deep py-16 sm:py-24">
      <Container>
        <SectionHeading id="agenda-title" light eyebrow={dict.booking.eyebrow} title={dict.booking.title} text={dict.booking.text} />
        <div className="mt-10 rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)] sm:p-8">
          <BookingFlow locale={locale} labels={dict.scheduler} />
        </div>
      </Container>
    </section>
  );
}
