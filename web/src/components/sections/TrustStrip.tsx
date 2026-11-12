import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Container } from "@/components/ui/Container";

/** Solo hechos verificables (dados por el cliente). */
export function TrustStrip({ locale }: { locale: Locale }) {
  const items = getDictionary(locale).trust;
  return (
    <section aria-label="Resumen" className="border-y border-line bg-white">
      <Container>
        <ul className="grid grid-cols-3 divide-x divide-line">
          {items.map((t) => (
            <li key={t.label} className="px-2 py-6 text-center sm:py-8">
              <p className="whitespace-nowrap font-serif text-xl text-navy sm:text-4xl">{t.value}</p>
              <p className="mt-1 text-xs leading-snug text-ink-soft sm:text-sm">{t.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
