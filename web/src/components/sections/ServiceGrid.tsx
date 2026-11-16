import Link from "next/link";
import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { servicePath } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServiceGrid({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="view bg-ivory py-16 sm:py-24">
      <Container>
        <SectionHeading id="servicios-title" eyebrow={dict.services.eyebrow} title={dict.services.title} text={dict.services.text} />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id}>
              <Link
                href={servicePath(locale, s.id)}
                className="group relative block h-full rounded-2xl bg-gradient-to-b from-gold/40 via-gold/10 to-transparent p-[1px] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_10px_30px_rgba(183,139,64,0.15)] motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                <div className="flex h-full w-full flex-col justify-between rounded-2xl bg-white p-8">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <span
                        className="inline-flex size-10 items-center justify-center rounded-xl border border-gold/40 bg-gold-tint font-serif text-sm font-semibold text-gold-dark"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-navy">{s.name[locale]}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{s.short[locale]}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-6">
                    <span className="text-sm font-medium text-navy transition-colors group-hover:text-gold-dark">{dict.cta.learnMore}</span>
                    <ArrowRight
                      width={16}
                      height={16}
                      className="text-ink-soft transition-all group-hover:translate-x-1 group-hover:text-gold-dark"
                    />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
