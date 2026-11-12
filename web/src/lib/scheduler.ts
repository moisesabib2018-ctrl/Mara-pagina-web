/**
 * Lógica pura del calendario de citas (sin React). Todas las fechas son "YYYY-MM-DD" y las horas "HH:mm" en la hora de
 * la oficina; "ahora" es "YYYY-MM-DDTHH:mm" en esa misma zona (ver nowInZone en lib/dates).
 */
export type Availability = {
  weekdays: number[]; // 0 = domingo … 6 = sábado
  firstHour: number; // primera hora de inicio
  lastHour: number; // última hora de inicio
  stepMinutes: number; // consulta + descanso (el descanso nunca se muestra)
  consultationMinutes: number;
  minNoticeMinutes: number;
  maxAdvanceMonths: number;
};

const pad = (n: number) => String(n).padStart(2, "0");
export const isoDate = (y: number, m0: number, d: number) => `${y}-${pad(m0 + 1)}-${pad(d)}`;
const daysIn = (y: number, m0: number) => new Date(Date.UTC(y, m0 + 1, 0)).getUTCDate();
export const dayOfWeek = (iso: string) => new Date(`${iso}T00:00:00Z`).getUTCDay();
const minutes = (hm: string) => Number(hm.slice(0, 2)) * 60 + Number(hm.slice(3, 5));
const fromMinutes = (n: number) => `${pad(Math.floor(n / 60))}:${pad(n % 60)}`;

/** Último día reservable: hoy + N meses (ajustando fin de mes). */
export function maxBookableDate(today: string, months: number): string {
  const y = Number(today.slice(0, 4));
  const m0 = Number(today.slice(5, 7)) - 1 + months;
  const ty = y + Math.floor(m0 / 12);
  const tm = ((m0 % 12) + 12) % 12;
  return isoDate(ty, tm, Math.min(Number(today.slice(8, 10)), daysIn(ty, tm)));
}

/** Horas de inicio de un día de trabajo: cada (consulta + descanso) minutos. */
export function dayStartTimes(a: Availability): string[] {
  const out: string[] = [];
  for (let t = a.firstHour * 60; t <= a.lastHour * 60; t += a.stepMinutes) out.push(fromMinutes(t));
  return out;
}

/** Horarios disponibles de un día (vacío si es pasado, fuera de rango o no laborable). */
export function slotsForDate(iso: string, now: string, a: Availability): string[] {
  const today = now.slice(0, 10);
  if (iso < today || iso > maxBookableDate(today, a.maxAdvanceMonths)) return [];
  if (!a.weekdays.includes(dayOfWeek(iso))) return [];
  const times = dayStartTimes(a);
  if (iso !== today) return times;
  const earliest = minutes(now.slice(11, 16)) + a.minNoticeMinutes;
  return times.filter((t) => minutes(t) >= earliest);
}

/** Hora de fin de una consulta que empieza a `start`. */
export const endTime = (start: string, a: Availability) => fromMinutes(minutes(start) + a.consultationMinutes);

/** Semanas del mes (null = hueco). `weekStart`: 0 = domingo, 1 = lunes. */
export function monthGrid(year: number, month0: number, weekStart: 0 | 1): (string | null)[][] {
  const lead = (new Date(Date.UTC(year, month0, 1)).getUTCDay() - weekStart + 7) % 7;
  const cells: (string | null)[] = [
    ...Array.from({ length: lead }, () => null),
    ...Array.from({ length: daysIn(year, month0) }, (_, i) => isoDate(year, month0, i + 1)),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7));
}

export const monthKey = (iso: string) => iso.slice(0, 7);
export function shiftMonth(key: string, delta: number): string {
  const idx = Number(key.slice(0, 4)) * 12 + (Number(key.slice(5, 7)) - 1) + delta;
  return `${Math.floor(idx / 12)}-${pad((idx % 12) + 1)}`;
}

/** Teléfono: 10 a 15 dígitos (acepta +, espacios, guiones y paréntesis). */
export function isValidPhone(raw: string): boolean {
  if (!/^[+\d\s().-]+$/.test(raw.trim())) return false;
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
export const isValidEmail = (raw: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw.trim());
