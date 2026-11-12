import Link from "next/link";
import { siteConfig, type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { homePath } from "@/lib/routes";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { LanguageSwitch } from "./LanguageSwitch";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const items = [
    { href: homePath(locale, "asesora"), label: dict.nav.advisor },
    { href: homePath(locale, "servicios"), label: dict.nav.services },
    { href: homePath(locale, "proceso"), label: dict.nav.process },
    { href: homePath(locale, "preguntas"), label: dict.nav.faq },
    { href: homePath(locale, "contacto"), label: dict.nav.contact },
  ];
  const book = homePath(locale, "agenda");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <Container className="relative flex h-[4.5rem] items-center justify-between gap-4">
        <Link href={homePath(locale)} aria-label={dict.a11y.home} className="flex items-center gap-3">
          {/* alt vacío: el enlace ya tiene aria-label y el nombre aparece como texto al lado */}
          <Logo size={56} priority alt="" />
          <span translate="no" className="hidden whitespace-nowrap font-serif text-lg font-medium tracking-wide text-navy sm:inline lg:hidden xl:inline">{siteConfig.name}</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-ink-soft transition-colors hover:text-navy">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <LanguageSwitch locale={locale} label={dict.a11y.language} />
          <ButtonLink href={book} className="max-sm:hidden">
            {dict.cta.book}
          </ButtonLink>
          <MobileNav
            items={items}
            ctaHref={book}
            ctaLabel={dict.cta.book}
            openLabel={dict.a11y.menu}
            closeLabel={dict.a11y.closeMenu}
          />
        </div>
      </Container>
    </header>
  );
}
