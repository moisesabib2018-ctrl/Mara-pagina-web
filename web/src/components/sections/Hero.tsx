import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

/** Portada: mensaje y acción principal. La presentación de la asesora vive en su propia sección (AdvisorIntro). */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { hero } = dict;
  return (
    <section className="relative overflow-hidden bg-ivory">
      <ArcMotif className="absolute -right-72 -top-60 w-[480px] opacity-20 sm:-right-40 sm:-top-40 sm:w-[640px] sm:opacity-60 lg:-right-32 lg:top-1/2 lg:w-[820px] lg:-translate-y-1/2 lg:opacity-100" />

      <Container className="relative py-14 sm:py-20 lg:py-28">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.6rem] leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-7xl">
            {hero.titleLead}{" "}
            <em className="whitespace-nowrap bg-[linear-gradient(transparent_64%,rgb(183_139_64/0.38)_64%)] pr-1 italic">
              {hero.titleAccent}
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={homePath(locale, "agenda")} size="lg">
              {dict.cta.book}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href={homePath(locale, "servicios")} variant="outline" size="lg">
              {dict.cta.viewServices}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
