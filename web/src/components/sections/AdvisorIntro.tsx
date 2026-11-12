import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Check } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Presentación de la asesora (única en la página). Foto a la izquierda en escritorio y primero en celular,
 * sin degradado encima. Solo información ya aprobada; la biografía y credenciales siguen pendientes (siteConfig.advisor.bio).
 */
export function AdvisorIntro({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { name, photo, bio } = siteConfig.advisor;
  return (
    <section id="asesora" aria-labelledby="asesora-title" className="border-b border-line bg-ivory-200 py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
        {photo ? (
          // Marco blanco suave; el recorte conserva el aspecto de la foto (sin deformar) y deja ver el rostro completo.
          <div className="mx-auto w-full max-w-md rounded-[1.75rem] bg-white p-2.5 shadow-[0_28px_60px_-34px_rgba(4,27,60,0.45)] lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-ivory-200">
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1024px) 480px, (min-width: 448px) 448px, calc(100vw - 3.5rem)"
                alt={`${name ?? siteConfig.name}${dict.advisor.photoAlt}`}
                quality={90}
                className="size-full object-cover object-[27%_12%]"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-sm rounded-2xl border border-line bg-white p-8">
            <Logo size={320} className="mx-auto" />
          </div>
        )}

        <div>
          <Eyebrow>{dict.advisor.eyebrow}</Eyebrow>
          <h2
            id="asesora-title"
            translate={name ? "no" : undefined}
            className="mt-4 text-balance font-serif text-4xl leading-[1.08] tracking-tight text-navy sm:text-5xl"
          >
            {name ?? dict.advisor.title}
          </h2>
          {name ? <p className="mt-3 font-serif text-xl italic text-gold-dark sm:text-2xl">{dict.advisor.title}</p> : null}

          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{bio ? bio[locale] : dict.advisor.text}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{dict.advisor.text2}</p>

          <ul className="mt-7 space-y-3">
            {dict.advisor.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-3 text-[0.97rem] font-medium text-navy">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark ring-1 ring-gold/40">
                  <Check width={16} height={16} />
                </span>
                {fact}
              </li>
            ))}
          </ul>

          <ButtonLink href={homePath(locale, "agenda")} size="lg" className="mt-9 w-full sm:w-auto">
            {dict.cta.book}
            <ArrowRight />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
