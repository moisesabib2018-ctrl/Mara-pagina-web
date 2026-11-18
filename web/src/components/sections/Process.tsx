import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process({ locale }: { locale: Locale }) {
  const { process } = getDictionary(locale);
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="view bg-white py-16 sm:py-24">
      <Container>
        <SectionHeading id="proceso-title" eyebrow={process.eyebrow} title={process.title} />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title}>
              <CardContainer containerClassName="h-full" className="h-full w-full">
                <CardBody className="relative h-full w-full rounded-2xl border border-line bg-ivory p-7">
                  <CardItem
                    as="span"
                    translateZ={40}
                    className="flex size-12 items-center justify-center rounded-full bg-navy font-serif text-lg text-gold-light"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </CardItem>
                  <CardItem as="h3" translateZ={50} className="mt-6 font-serif text-xl leading-snug text-navy">
                    {step.title}
                  </CardItem>
                  <CardItem as="p" translateZ={30} className="mt-2 leading-relaxed text-ink-soft">
                    {step.text}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
