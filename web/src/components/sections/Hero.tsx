import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { Logo } from "@/components/layout/Logo";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";

/** La asesora al inicio: en celular la foto va primero; en escritorio, a la derecha. Sin foto usa el logo. */
export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { hero } = dict;
  const { name, photo } = siteConfig.advisor;
  return (
    <section className="relative overflow-hidden bg-ivory">
      <ArcMotif className="absolute -right-60 -top-44 w-[460px] opacity-25 lg:-right-56 lg:top-1/2 lg:w-[860px] lg:-translate-y-1/2 lg:opacity-100" />

      <Container className="relative grid gap-9 py-6 sm:py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-20">
        <div className="relative order-first lg:order-last lg:ml-auto lg:w-full lg:max-w-[28rem]">
          <div
            className="absolute -right-1 -top-4 z-10 flex size-[4.5rem] flex-col items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-ivory sm:-right-3 sm:-top-6 sm:size-[5.25rem]"
            aria-hidden="true"
          >
            <span className="font-serif text-2xl leading-none sm:text-3xl">45</span>
            <span className="text-[0.6rem] font-semibold uppercase tracking-widest sm:text-[0.65rem]">{hero.minutes}</span>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_32px_64px_-28px_rgba(4,27,60,0.5)] lg:aspect-[4/5]">
            {photo ? (
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                priority
                sizes="(min-width: 1024px) 448px, calc(100vw - 2.5rem)"
                alt={`${name ?? siteConfig.name}${hero.photoAlt}`}
                className="size-full object-cover object-[10%_20%] lg:object-[18%_20%]"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Logo size={220} alt="" />
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/95 via-navy/70 to-transparent px-5 pb-5 pt-20 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">{hero.role}</p>
              <p translate="no" className="mt-1 font-serif text-xl leading-snug sm:text-2xl">
                {name ?? siteConfig.name}
              </p>
              {name ? (
                <p translate="no" className="mt-0.5 text-sm text-white/75">
                  {siteConfig.name}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-gold/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-navy">
            <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 text-balance font-serif text-[2.6rem] leading-[1.04] tracking-tight text-navy sm:text-6xl lg:text-[4.4rem]">
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
