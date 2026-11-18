import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { sampleTestimonials, testimonials, type Testimonial } from "@/content/testimonials";
import { getDictionary } from "@/content/ui";
import { resolveTestimonials } from "@/lib/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialsMarquee } from "./TestimonialsMarquee";

function Card({ item, locale, sample, tag }: { item: Testimonial; locale: Locale; sample: boolean; tag: string }) {
  const name = item.name[locale];
  return (
    <li className="w-[17.5rem] shrink-0 sm:w-[22rem]">
      <figure className="relative rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(4,27,60,0.04)]">
        {sample ? (
          <span className="absolute right-4 top-4 rounded-full bg-gold-tint px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-gold-dark">
            {tag}
          </span>
        ) : null}
        <span className="block h-7 font-serif text-5xl leading-none text-gold" aria-hidden="true">
          “
        </span>
        <blockquote className="mt-2 text-[0.97rem] font-medium leading-relaxed text-navy">{item.quote[locale]}</blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
          {item.photo ? (
            <Image src={item.photo} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
          ) : (
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold-tint font-serif text-base text-gold-dark"
              aria-hidden="true"
            >
              {name.trim().charAt(0).toUpperCase()}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-navy">{name}</span>
            {item.role ? <span className="block truncate text-sm text-ink-soft">{item.role[locale]}</span> : null}
          </span>
        </figcaption>
      </figure>
    </li>
  );
}

/**
 * «Personas que confiaron en nosotros»: carrusel de comentarios. Sin comentarios reales solo aparece en vista previa
 * (`siteConfig.testimonialsPreview`), con tarjetas de ejemplo marcadas y un aviso visible.
 */
export function Testimonials({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.testimonials;
  const { items, sample } = resolveTestimonials(testimonials, sampleTestimonials, siteConfig.testimonialsPreview);
  if (items.length === 0) return null;

  // Dos filas: la segunda arranca desplazada para que no repitan el mismo orden.
  const half = Math.ceil(items.length / 2);
  const second = [...items.slice(half), ...items.slice(0, half)];
  const renderRow = (list: Testimonial[]) => list.map((item) => <Card key={item.id} item={item} locale={locale} sample={sample} tag={t.sampleTag} />);

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="view bg-ivory-200 py-16 sm:py-24">
      <Container>
        <SectionHeading id="testimonios-title" eyebrow={t.eyebrow} title={t.title} text={t.text} />
        {sample ? (
          <p className="mt-6 max-w-2xl rounded-xl border border-gold/50 bg-white px-4 py-3 text-sm leading-relaxed text-navy">{t.previewNotice}</p>
        ) : null}
      </Container>
      <div className="mt-10">
        <TestimonialsMarquee rows={[renderRow(items), renderRow(second)]} labels={{ pause: t.pause, play: t.play }} />
      </div>
    </section>
  );
}
