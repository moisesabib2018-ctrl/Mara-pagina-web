import Link from "next/link";
import { siteConfig, type Locale } from "@/config/site";
import type { LegalId } from "@/config/service-slugs";
import { legalDocs } from "@/content/legal";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { Container } from "@/components/ui/Container";

/** Página legal (privacidad o términos). Muestra un aviso mientras el texto no esté aprobado por un abogado. */
export function LegalDocument({ locale, id }: { locale: Locale; id: LegalId }) {
  const doc = legalDocs[id];
  const dict = getDictionary(locale);
  const email = siteConfig.contact.email;
  return (
    <>
      <section className="bg-ivory py-12 sm:py-16">
        <Container>
          <nav aria-label={dict.a11y.breadcrumb} className="text-sm text-ink-soft">
            <ol className="flex items-center gap-2">
              <li>
                <Link href={homePath(locale)} className="hover:text-navy">
                  {dict.service.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-navy">
                {doc.title[locale]}
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-balance font-serif text-4xl leading-tight tracking-tight text-navy sm:text-5xl">{doc.title[locale]}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{doc.intro[locale]}</p>
          {siteConfig.legalDraft ? (
            <p role="note" className="mt-6 max-w-2xl rounded-lg border border-gold/60 bg-gold-tint px-4 py-3 text-sm leading-relaxed text-navy">
              {dict.legal.draftNotice}
            </p>
          ) : null}
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10">
          {doc.sections.map((s, i) => (
            <section key={s.title.es} aria-labelledby={`${id}-${i}`}>
              <h2 id={`${id}-${i}`} className="font-serif text-2xl text-navy">
                {s.title[locale]}
              </h2>
              {s.paragraphs[locale].map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
              {s.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-6 leading-relaxed text-ink-soft marker:text-gold">
                  {s.bullets[locale].map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {i === doc.sections.length - 2 && id === "privacy" && email ? (
                <p className="mt-3 leading-relaxed text-ink-soft">
                  {dict.legal.emailLine} <a href={`mailto:${email}`} className="font-medium text-navy underline underline-offset-4">{email}</a>
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
