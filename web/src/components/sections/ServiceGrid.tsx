import Link from "next/link";
import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { servicePath } from "@/lib/routes";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
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
              <CardContainer containerClassName="h-full" className="h-full w-full">
                <CardBody className="h-full w-full rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(4,27,60,0.04)] transition-all duration-200 hover:border-gold/60 hover:shadow-[0_22px_44px_-24px_rgba(4,27,60,0.4)]">
                  <Link
                    href={servicePath(locale, s.id)}
                    className="group flex h-full flex-col rounded-2xl p-7 [transform-style:preserve-3d]"
                  >
                    <CardItem
                      as="span"
                      translateZ={40}
                      className="flex size-12 items-center justify-center rounded-full border border-gold/40 bg-gold-tint font-serif text-lg text-gold-dark"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </CardItem>
                    <CardItem as="h3" translateZ={50} className="mt-6 w-full font-serif text-2xl leading-snug text-navy">
                      {s.name[locale]}
                    </CardItem>
                    <CardItem as="p" translateZ={30} className="mt-3 w-full flex-1 leading-relaxed text-ink-soft">
                      {s.short[locale]}
                    </CardItem>
                    <CardItem
                      as="span"
                      translateZ={20}
                      className="mt-6 flex w-full items-center justify-between border-t border-line pt-4 text-sm font-semibold text-navy"
                    >
                      {dict.cta.learnMore}
                      <ArrowRight width={18} height={18} className="text-gold-dark transition-transform group-hover:translate-x-1" />
                    </CardItem>
                  </Link>
                </CardBody>
              </CardContainer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
