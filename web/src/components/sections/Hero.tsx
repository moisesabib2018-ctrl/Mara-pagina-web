import Link from "next/link";
import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { homePath, servicePath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { hero } = dict;
  return (
    <section className="relative overflow-hidden bg-ivory">
      <ArcMotif className="absolute -right-60 -top-44 w-[460px] opacity-25 lg:-right-56 lg:top-1/2 lg:w-[860px] lg:-translate-y-1/2 lg:opacity-100" />

      <Container className="relative grid gap-12 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:py-28">
        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.75rem] leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-[4.4rem]">
            {hero.titleLead}{" "}
            <em className="whitespace-nowrap bg-[linear-gradient(transparent_64%,rgb(183_139_64/0.38)_64%)] pr-1 italic">
              {hero.titleAccent}
            </em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {hero.text}
          </p>
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

        {/* Tarjeta de consulta: punto focal y acceso directo a cada servicio */}
        <div className="rise relative lg:ml-auto lg:w-full lg:max-w-md" style={{ animationDelay: "200ms" }}>
          <div
            className="absolute -right-2 -top-6 z-10 flex size-[5.25rem] flex-col items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-ivory sm:-right-4"
            aria-hidden="true"
          >
            <span className="font-serif text-3xl leading-none">45</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest">{hero.minutes}</span>
          </div>

          <div className="overflow-hidden rounded-2xl bg-navy text-white shadow-[0_32px_64px_-24px_rgba(4,27,60,0.55)]">
            <div className="border-b border-white/10 px-7 pb-5 pt-7">
              <h2 className="pr-16 font-serif text-2xl leading-snug">{hero.cardTitle}</h2>
              <p className="mt-1.5 text-sm text-white/65">{hero.cardText}</p>
            </div>
            <ol>
              {services.map((s, i) => (
                <li key={s.id} className="border-b border-white/10">
                  <Link href={servicePath(locale, s.id)} className="group flex min-h-14 items-center gap-4 px-7 py-3 transition-colors hover:bg-white/[0.06]">
                    <span className="w-6 font-serif text-base text-gold-light" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[0.95rem] font-medium">{s.name[locale]}</span>
                    <ArrowRight width={18} height={18} className="text-white/35 transition-all group-hover:translate-x-0.5 group-hover:text-gold-light" />
                  </Link>
                </li>
              ))}
            </ol>
            <div className="p-5">
              <ButtonLink href={homePath(locale, "agenda")} size="lg" className="w-full">
                {hero.cardCta}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
