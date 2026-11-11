import Link from "next/link";
import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { homePath, servicePath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Hero({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section className="bg-navy text-white">
      <Container className="grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:py-28">
        <div>
          <Eyebrow className="text-gold-light">{dict.hero.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-balance font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-[3.4rem]">{dict.hero.title}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{dict.hero.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={homePath(locale, "agenda")} size="lg">
              {dict.cta.book}
              <ArrowRight />
            </ButtonLink>
            <ButtonLink href={homePath(locale, "servicios")} variant="outline-light" size="lg">
              {dict.cta.viewServices}
            </ButtonLink>
          </div>
        </div>

        <nav aria-label={dict.hero.indexTitle} className="hidden rounded-lg border border-white/15 p-8 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{dict.hero.indexTitle}</p>
          <ol className="mt-4">
            {services.map((s, i) => (
              <li key={s.id} className="border-b border-white/15 last:border-b-0">
                <Link href={servicePath(locale, s.id)} className="group flex items-center gap-4 py-3.5">
                  <span className="w-7 font-serif text-lg text-gold-light" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[0.95rem] text-white/90 transition-colors group-hover:text-white">{s.name[locale]}</span>
                  <ArrowRight className="text-white/40 transition-colors group-hover:text-gold-light" width={18} height={18} />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}
