import Link from "next/link";
import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { whatsappHref } from "@/lib/contact";
import { homePath, servicePath } from "@/lib/routes";
import type { Service } from "@/types/service";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-navy/20 pt-6">
      <h2 className="font-serif text-2xl text-navy sm:text-3xl">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function ServiceDetail({ locale, service }: { locale: Locale; service: Service }) {
  const dict = getDictionary(locale);
  const wa = whatsappHref();
  const others = services.filter((s) => s.id !== service.id);

  return (
    <>
      <section className="relative overflow-hidden bg-ivory">
        <ArcMotif className="absolute -right-56 -top-44 w-[420px] opacity-25 lg:-right-32 lg:-top-40 lg:w-[620px] lg:opacity-100" />
        <Container className="relative py-14 sm:py-20">
          <nav aria-label={dict.a11y.breadcrumb} className="text-sm text-ink-soft">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={homePath(locale)} className="hover:text-navy">
                  {dict.service.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-navy">
                {service.name[locale]}
              </li>
            </ol>
          </nav>
          <Eyebrow className="mt-8">{dict.services.eyebrow}</Eyebrow>
          <h1 className="rise mt-4 text-balance font-serif text-5xl leading-[1.05] tracking-tight text-navy sm:text-6xl">{service.name[locale]}</h1>
          <p className="rise mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl" style={{ animationDelay: "100ms" }}>{service.lead[locale]}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={homePath(locale, "agenda")} size="lg">
              {dict.cta.book}
              <ArrowRight />
            </ButtonLink>
            {wa ? (
              <ButtonLink href={wa} external variant="outline" size="lg">
                {dict.cta.whatsapp}
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </section>

      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-20">
        <div className="space-y-14">
          <Block title={dict.service.forWhom}>
            <ul className="space-y-3">
              {service.forWhom[locale].map((item) => (
                <li key={item} className="flex gap-3 text-lg leading-snug text-ink-soft">
                  <Check className="mt-1 shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
          </Block>

          <Block title={dict.service.process}>
            <ol className="space-y-6">
              {service.steps[locale].map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-2">
                  <span className="font-serif text-3xl leading-none text-gold-dark" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-navy">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {service.note ? (
              <p className="mt-8 border-l-2 border-gold bg-ivory px-5 py-4 leading-relaxed text-navy">
                <span className="font-semibold">{dict.service.note}: </span>
                {service.note[locale]}
              </p>
            ) : null}
          </Block>

          <Block title={dict.service.bring}>
            <ul className="space-y-3">
              {service.bring[locale].map((item) => (
                <li key={item} className="flex gap-3 leading-snug text-ink-soft">
                  <Check className="mt-0.5 shrink-0 text-gold-dark" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-ink-soft">{dict.service.bringHint}</p>
          </Block>
        </div>

        <aside className="lg:self-start lg:sticky lg:top-28">
          <div className="rounded-2xl bg-navy p-7 text-white shadow-[0_28px_56px_-28px_rgba(4,27,60,0.6)]">
            <p className="font-serif text-5xl leading-none text-gold-light">45<span className="ml-1 text-lg">min</span></p>
            <h2 className="mt-4 font-serif text-2xl">{dict.service.aside}</h2>
            <p className="mt-3 leading-relaxed text-white/75">{dict.service.asideText}</p>
            <ButtonLink href={homePath(locale, "agenda")} size="lg" className="mt-6 w-full">
              {dict.cta.book}
            </ButtonLink>
            {wa ? (
              <ButtonLink href={wa} external variant="outline-light" size="lg" className="mt-3 w-full">
                {dict.cta.whatsapp}
              </ButtonLink>
            ) : null}
          </div>
        </aside>
      </Container>

      <section aria-labelledby="otros-title" className="border-t border-line bg-ivory py-14">
        <Container>
          <h2 id="otros-title" className="font-serif text-2xl text-navy">
            {dict.service.others}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((s) => (
              <li key={s.id}>
                <Link
                  href={servicePath(locale, s.id)}
                  className="flex min-h-14 items-center justify-between gap-2 border border-line bg-white px-4 py-3 text-sm font-medium text-navy transition-colors hover:border-navy/40"
                >
                  {s.name[locale]}
                  <ArrowRight width={16} height={16} className="shrink-0 text-gold-dark" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
