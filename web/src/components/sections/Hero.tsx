import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { Container } from "@/components/ui/Container";

/**
 * Portada: mensaje centrado y equilibrado (sin botones: la reserva está en el menú superior y en la sección de agenda).
 * Los arcos del logo enmarcan el texto desde dos esquinas opuestas, de modo que no queda ningún lado vacío.
 */
export function Hero({ locale }: { locale: Locale }) {
  const { hero } = getDictionary(locale);
  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Aros en esquinas opuestas, fuera de la columna de texto (no cruzan las letras). Más suaves cuando hay poco ancho. */}
      <ArcMotif className="absolute -right-44 -top-44 w-[300px] opacity-25 sm:-right-48 sm:-top-60 sm:w-[420px] min-[1360px]:-right-52 min-[1360px]:w-[560px] min-[1360px]:opacity-100" />
      <ArcMotif className="absolute -bottom-60 -left-48 hidden w-[420px] opacity-25 sm:block min-[1360px]:-left-52 min-[1360px]:w-[560px] min-[1360px]:opacity-100" />

      <Container className="relative py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-left sm:text-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.6rem] leading-[1.06] tracking-tight text-navy sm:text-6xl lg:text-7xl">
            {hero.titleLead}{" "}
            <em className="bg-[linear-gradient(transparent_64%,rgb(183_139_64/0.38)_64%)] pr-1 italic sm:whitespace-nowrap">
              {hero.titleAccent}
            </em>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.text[0]}</p>
          <p className="mx-auto mt-4 max-w-2xl font-serif text-xl italic leading-snug text-gold-dark sm:text-2xl">{hero.text[1]}</p>
        </div>
      </Container>
    </section>
  );
}
