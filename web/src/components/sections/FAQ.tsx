import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Container } from "@/components/ui/Container";
import { Plus } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Acordeón con <details> nativo: accesible y sin JavaScript. */
export function FAQ({ locale }: { locale: Locale }) {
  const { faq } = getDictionary(locale);
  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-white py-16 sm:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <SectionHeading id="preguntas-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div className="border-t border-line">
          {faq.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-left font-medium text-navy">
                <span className="text-base sm:text-lg">{item.q}</span>
                <Plus className="shrink-0 text-gold-dark transition-transform group-open:rotate-45" />
              </summary>
              <p className="pb-5 pr-9 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
