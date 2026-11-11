import { type Locale } from "@/config/site";
import { getDictionary } from "@/content/ui";
import { Container } from "@/components/ui/Container";

/** Solo hechos verificables (dados por el cliente). */
export function TrustStrip({ locale }: { locale: Locale }) {
  const items = getDictionary(locale).trust;
  return (
    <section aria-label="Resumen" className="border-b border-line bg-white">
      <Container>
        <ul className="grid divide-y divide-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {items.map((t) => (
            <li key={t} className="flex min-h-16 items-center justify-center px-4 py-4 text-center font-serif text-base text-navy sm:text-lg">
              {t}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
