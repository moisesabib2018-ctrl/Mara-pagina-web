import Link from "next/link";
import { siteConfig, type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { getChannels } from "@/lib/contact";
import { homePath, legalPath, servicePath } from "@/lib/routes";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const channels = getChannels(locale);
  const linkClass = "inline-flex min-h-9 items-center text-sm text-white/75 transition-colors hover:text-white";

  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <div className="inline-block rounded-lg bg-white p-2">
            <Logo size={88} />
          </div>
          <p translate="no" className="mt-4 font-serif text-lg">{siteConfig.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/70">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.services}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{dict.footer.services}</h2>
          <ul className="mt-3">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={servicePath(locale, s.id)} className={linkClass}>
                  {s.name[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={dict.footer.explore}>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{dict.footer.explore}</h2>
          <ul className="mt-3">
            {[
              [dict.nav.process, "proceso"],
              [dict.nav.advisor, "asesora"],
              [dict.nav.booking, "agenda"],
              [dict.nav.faq, "preguntas"],
              [dict.nav.contact, "contacto"],
            ].map(([label, hash]) => (
              <li key={hash}>
                <Link href={homePath(locale, hash)} className={linkClass}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {channels.length > 0 ? (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{dict.footer.contact}</h2>
            <ul className="mt-3">
              {channels.map((c) => (
                <li key={c.key}>
                  <a
                    href={c.href}
                    className={linkClass}
                    {...(c.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>

      <div className="border-t border-white/15">
        <Container className="space-y-2 py-6 pr-[4.5rem] text-xs leading-relaxed text-white/60 sm:pr-8">
          <p>{dict.footer.disclaimer}</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>{dict.footer.rights}</span>
            <Link href={legalPath(locale, "privacy")} className="inline-flex min-h-9 items-center underline underline-offset-4 hover:text-white">
              {dict.footer.privacy}
            </Link>
            <Link href={legalPath(locale, "terms")} className="inline-flex min-h-9 items-center underline underline-offset-4 hover:text-white">
              {dict.footer.terms}
            </Link>
          </p>
        </Container>
      </div>
    </footer>
  );
}
