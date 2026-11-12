import Image from "next/image";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";

/** Sin nombre, foto ni biografía hasta que el cliente los confirme (siteConfig.advisor). */
export function AdvisorIntro({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const { name, photo, bio } = siteConfig.advisor;
  return (
    <section id="asesora" aria-labelledby="asesora-title" className="bg-ivory-200 py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="mx-auto w-full max-w-sm rounded-lg border border-line bg-white p-8">
          {photo ? (
            <Image src={photo.src} width={photo.width} height={photo.height} alt={name ?? ""} className="h-auto w-full rounded-md object-cover" />
          ) : (
            <Logo size={320} className="mx-auto" />
          )}
        </div>
        <div>
          <Eyebrow>{dict.advisor.eyebrow}</Eyebrow>
          <h2 id="asesora-title" className="mt-3 font-serif text-3xl leading-tight text-navy sm:text-4xl">
            {name ?? dict.advisor.title}
          </h2>
          {name ? <p className="mt-2 font-serif text-xl text-gold-dark">{dict.advisor.title}</p> : null}
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{bio ? bio[locale] : dict.advisor.text}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{dict.advisor.text2}</p>
        </div>
      </Container>
    </section>
  );
}
