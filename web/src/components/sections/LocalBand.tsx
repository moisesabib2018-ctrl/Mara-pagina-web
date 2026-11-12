import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Cierre local: refuerza la ubicación (SEO local) y lleva a agendar una cita presencial. */
export function LocalBand({ locale }: { locale: Locale }) {
  const { local } = getDictionary(locale);
  return (
    <section aria-labelledby="local-title" className="relative overflow-hidden bg-deep py-16 sm:py-24">
      <ArcMotif variant="light" className="absolute -right-48 top-1/2 w-[640px] -translate-y-1/2 opacity-60 sm:-right-24 sm:w-[760px]" />
      <Container className="relative">
        <Eyebrow className="text-gold-light">{local.eyebrow}</Eyebrow>
        <h2 id="local-title" className="mt-3 max-w-xl text-balance font-serif text-4xl leading-tight text-white sm:text-5xl">
          {local.title}
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{local.text}</p>
        <ButtonLink href={homePath(locale, "agenda")} size="lg" className="mt-8">
          {local.cta}
        </ButtonLink>
      </Container>
    </section>
  );
}
