import type { Locale } from "@/config/site";
import type { KeyDate } from "@/content/key-dates";

/** Fecha de hoy (YYYY-MM-DD) en la zona horaria de la oficina, para que el conteo no dependa de la del visitante. */
export function todayInZone(zone = "America/Chicago", now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: zone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

const DAY = 86_400_000;
const utc = (iso: string) => Date.parse(`${iso}T00:00:00Z`);

/** Días enteros de `a` a `b` (YYYY-MM-DD). */
export function daysBetween(a: string, b: string): number {
  return Math.round((utc(b) - utc(a)) / DAY);
}

export type DateStatus =
  | { state: "upcoming"; days: number }
  | { state: "open"; days: number | null }
  | { state: "deadline"; days: number }
  | { state: "closed" };

export function getDateStatus(item: KeyDate, today: string): DateStatus {
  if (item.kind === "deadline") {
    return today > item.date ? { state: "closed" } : { state: "deadline", days: daysBetween(today, item.date) };
  }
  if (today < item.start) return { state: "upcoming", days: daysBetween(today, item.start) };
  if (item.end && today > item.end) return { state: "closed" };
  return { state: "open", days: item.end ? daysBetween(today, item.end) : null };
}

const intlLocale: Record<Locale, string> = { es: "es-US", en: "en-US" };
const fmt = (iso: string, locale: Locale, opts: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(intlLocale[locale], { ...opts, timeZone: "UTC" }).format(utc(iso));

/** Texto del periodo: "15 oct – 7 dic 2026", "Desde el 1 nov 2026", "15 de abril de 2027". */
export function formatKeyDate(item: KeyDate, locale: Locale): string {
  const short = { day: "numeric", month: "short" } as const;
  const shortY = { ...short, year: "numeric" } as const;
  if (item.kind === "deadline") return fmt(item.date, locale, { day: "numeric", month: "long", year: "numeric" });
  if (!item.end) return `${locale === "es" ? "Desde el" : "From"} ${fmt(item.start, locale, shortY)}`;
  const sameYear = item.start.slice(0, 4) === item.end.slice(0, 4);
  return `${fmt(item.start, locale, sameYear ? short : shortY)} – ${fmt(item.end, locale, shortY)}`;
}

/** "Ahora" en la zona de la oficina como "YYYY-MM-DDTHH:mm" (cadena estable durante un minuto). */
export function nowInZone(zone = "America/Chicago", now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}:${get("minute")}`;
}
