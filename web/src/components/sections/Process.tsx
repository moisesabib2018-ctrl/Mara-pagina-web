import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process({ locale }: { locale: Locale }) {
  const { process } = getDictionary(locale);
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading id="proceso-title" eyebrow={process.eyebrow} title={process.title} />
        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {process.steps.map((step, i) => (
            <li key={step.title} className="border-t border-navy/25 pt-6">
              <span className="font-serif text-3xl text-gold-dark" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl text-navy">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
