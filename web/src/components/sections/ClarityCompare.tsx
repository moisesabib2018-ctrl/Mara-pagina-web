import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Compare } from "@/components/ui/compare";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClarityArt, ConfusionArt } from "./ClarityArt";

/** «De la confusión a la claridad»: deslizador antes/después con ilustraciones originales (sin fotos ni casos reales). */
export function ClarityCompare({ locale }: { locale: Locale }) {
  const { clarity } = getDictionary(locale);
  return (
    <section id="claridad" aria-labelledby="claridad-title" className="view bg-ivory-200 py-16 sm:py-24">
      <Container>
        <SectionHeading id="claridad-title" eyebrow={clarity.eyebrow} title={clarity.title} text={clarity.text} />
        <div className="mx-auto mt-10 max-w-4xl">
          <Compare
            first={<ConfusionArt />}
            second={<ClarityArt />}
            firstLabel={clarity.before}
            secondLabel={clarity.after}
            ariaLabel={clarity.sliderLabel}
          />
          <p className="mt-4 text-center text-sm text-ink-soft">{clarity.hint}</p>
        </div>
      </Container>
    </section>
  );
}
