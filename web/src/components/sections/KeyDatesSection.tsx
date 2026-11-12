import { type Locale } from "@/config/site";
import { keyDates } from "@/content/key-dates";
import { getDictionary } from "@/content/ui";
import { formatKeyDate } from "@/lib/dates";
import { KeyDates } from "./KeyDates";

/** Resuelve textos e idioma en el servidor; el estado según la fecha de hoy lo calcula el cliente. */
export function KeyDatesSection({ locale }: { locale: Locale }) {
  const cards = keyDates.map((item) => ({
    item,
    title: item.title[locale],
    text: item.text[locale],
    note: item.note?.[locale],
    range: formatKeyDate(item, locale),
  }));
  return <KeyDates cards={cards} labels={getDictionary(locale).keyDates} />;
}
