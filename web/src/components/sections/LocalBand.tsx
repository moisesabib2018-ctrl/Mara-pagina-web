import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { ArcMotif } from "@/components/ui/ArcMotif";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

/**
 * Cierre local: refuerza la ubicación (SEO local) y lleva a agendar una cita presencial.
 * Con `siteConfig.location.photo` usa la fotografía de fondo (capa azul para legibilidad); sin ella, los arcos del logo.
 */
export function LocalBand({ locale }: { locale: Locale }) {
  const { local } = getDictionary(locale);
  const photo = siteConfig.location.photo;
  return (
    <section aria-labelledby="local-title" className="view relative isolate overflow-hidden bg-deep py-20 sm:py-28">
      {photo ? (
        <>
          <Image src={photo.src} width={photo.width} height={photo.height} alt="" sizes="100vw" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/35 sm:via-navy/70" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-navy/70 to-transparent" />
        </>
      ) : (
        <ArcMotif variant="light" className="absolute -right-48 top-1/2 -z-10 w-[640px] -translate-y-1/2 opacity-60 sm:-right-24 sm:w-[760px]" />
      )}
      <Container className="relative">
        <Eyebrow className="text-gold-light">{local.eyebrow}</Eyebrow>
        <h2 id="local-title" className="mt-4 max-w-xl text-balance font-serif text-4xl leading-[1.08] text-white sm:text-6xl">
          {local.title}
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">{local.text}</p>
        <ButtonLink href={homePath(locale, "agenda")} size="lg" className="mt-9">
          {local.cta}
        </ButtonLink>
        {photo?.credit ? (
          <p className="mt-12 text-xs leading-relaxed text-white/70">
            {local.creditPrefix} {photo.credit.author} ·{" "}
            <a href={photo.credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              {photo.credit.license}
            </a>{" "}
            ·{" "}
            <a href={photo.credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">
              {local.creditSuffix}
            </a>
          </p>
        ) : null}
      </Container>
    </section>
  );
}
