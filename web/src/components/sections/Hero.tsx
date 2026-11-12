import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { Container } from "@/components/ui/Container";
import { HeroVisual } from "./HeroVisual";

/**
 * Portada: solo mensaje (la reserva está en el botón del menú superior). En escritorio, a la derecha va una composición de
 * ilustraciones de los seis servicios; en pantallas menores, solo unos aros suaves en la esquina. La presentación de la
 * asesora vive en su propia sección (AdvisorIntro).
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale);
  return (
    <section className="relative overflow-hidden bg-ivory">
      <ArcMotif className="absolute -right-72 -top-60 w-[480px] opacity-20 sm:-right-40 sm:-top-40 sm:w-[560px] sm:opacity-30 lg:hidden" />

      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.6rem] leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-5xl xl:text-6xl">
            {hero.titleLead}{" "}
            <em className="whitespace-nowrap bg-[linear-gradient(transparent_64%,rgb(183_139_64/0.38)_64%)] pr-1 italic">
              {hero.titleAccent}
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.text}</p>
        </div>

        <HeroVisual locale={locale} />
      </Container>
    </section>
  );
}
