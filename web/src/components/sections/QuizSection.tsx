import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { servicePath } from "@/lib/routes";
import { Quiz } from "./Quiz";

/** Resuelve idioma, nombres y enlaces de los seis servicios en el servidor; el cuestionario corre en el navegador. */
export function QuizSection({ locale }: { locale: Locale }) {
  return (
    <Quiz
      labels={getDictionary(locale).quiz}
      services={services.map((s) => ({ id: s.id, name: s.name[locale], short: s.short[locale], href: servicePath(locale, s.id) }))}
    />
  );
}
