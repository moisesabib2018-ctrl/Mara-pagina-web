import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Container } from "@/components/ui/Container";
import { Plus } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Acordeón con <details> nativo (accesible y sin JavaScript), presentado como tarjetas. */
export function FAQ({ locale }: { locale: Locale }) {
  const { faq } = getDictionary(locale);
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-white py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <SectionHeading id="preguntas-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div className="space-y-3">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-line bg-white transition-colors open:border-gold/60 open:bg-ivory hover:border-navy/25"
            >
              <summary className="flex min-h-16 cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left font-medium text-navy sm:px-6">
                <span className="text-base sm:text-lg">{item.q}</span>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold-tint text-gold-dark">
                  <Plus width={18} height={18} className="transition-transform group-open:rotate-45" />
                </span>
              </summary>
              <p className="px-5 pb-6 pr-14 leading-relaxed text-ink-soft sm:px-6">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
