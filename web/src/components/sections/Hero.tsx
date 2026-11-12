import Link from "next/link";
import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { getChannels } from "@/lib/contact";
import { homePath } from "@/lib/routes";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { Container } from "@/components/ui/Container";
import { channelIcon } from "@/components/ui/channel-icons";
import { ArrowRight, Check } from "@/components/ui/Icons";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { hero } = dict;
  const { name, photo } = siteConfig.advisor;
  const channels = getChannels(locale);
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

        {/* Tarjeta de la asesora: identidad, cómo es la consulta y canales directos (sin repetir los servicios) */}
        <div className="rise relative lg:ml-auto lg:w-full lg:max-w-md" style={{ animationDelay: "200ms" }}>
          <div
            className="absolute -right-2 -top-6 z-10 flex size-[5.25rem] flex-col items-center justify-center rounded-full bg-gold text-navy shadow-lg ring-4 ring-ivory sm:-right-4"
            aria-hidden="true"
          >
            <span className="font-serif text-3xl leading-none">45</span>
            <span className="text-[0.65rem] font-semibold uppercase tracking-widest">{hero.minutes}</span>
          </div>

          <div className="overflow-hidden rounded-2xl bg-navy text-white shadow-[0_32px_64px_-24px_rgba(4,27,60,0.55)]">
            <div className="flex items-center gap-4 border-b border-white/10 p-7 pr-24">
              <div className="shrink-0 overflow-hidden rounded-xl bg-white p-1.5">
                {photo ? (
                  <Image src={photo.src} width={64} height={64} alt={name ?? ""} className="size-16 rounded-lg object-cover" />
                ) : (
                  <Logo size={64} alt="" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">{hero.cardLabel}</p>
                <p translate="no" className="mt-1 font-serif text-xl leading-snug">
                  {name ?? siteConfig.name}
                </p>
              </div>
            </div>

            <div className="p-7">
              <h2 className="font-serif text-2xl leading-snug">{hero.cardTitle}</h2>
              <p className="mt-2 leading-relaxed text-white/70">{hero.cardText}</p>

              <ul className="mt-6 space-y-3">
                {hero.cardFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-3 text-[0.95rem] text-white/90">
                    <Check className="mt-0.5 shrink-0 text-gold-light" width={18} height={18} />
                    {fact}
                  </li>
                ))}
              </ul>

              {channels.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {channels.map((c) => {
                    const Icon = channelIcon[c.key];
                    return (
                      <li key={c.key}>
                        <a
                          href={c.href}
                          {...(c.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-sm font-medium transition-colors hover:border-gold-light hover:text-gold-light"
                        >
                          <Icon width={18} height={18} />
                          {c.key === "email" || c.key === "phone" ? c.value : c.key === "whatsapp" ? dict.cta.whatsapp : dict.cta.instagram}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>

            <Link
              href={homePath(locale, "asesora")}
              className="group flex min-h-14 items-center justify-between border-t border-white/10 px-7 text-sm font-semibold transition-colors hover:bg-white/[0.06]"
            >
              {hero.cardLink}
              <ArrowRight width={18} height={18} className="text-gold-light transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
