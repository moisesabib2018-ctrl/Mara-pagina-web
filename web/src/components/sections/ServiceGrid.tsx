import { Container } from "@/components/ui/Container";
import { services } from "@/content/services";
import type { Locale } from "@/config/site";

export function ServiceGrid({ locale }: { locale: Locale }) {
  return (
    <section className="bg-mist-100 py-12">
      <Container>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="rounded-lg border-t-4 border-gold bg-white p-6 font-medium text-deep shadow-sm">
              {s.name[locale]}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
