import { serviceIds, type ServiceId } from "@/config/service-slugs";

/**
 * Lógica del cuestionario "¿Qué necesitas realmente?". Solo usa los seis servicios existentes
 * y no pide ningún dato: las respuestas viven en memoria y no se envían ni guardan.
 */
export type Who = "personal" | "business" | "both";
export const NONE = "none" as const;
export type Second = ServiceId | typeof NONE;

export type QuizState = { who: Who | null; first: ServiceId | null; second: Second | null };
export const emptyQuiz: QuizState = { who: null, first: null, second: null };

/** Servicios que tienen sentido según para quién es la ayuda (orden de aparición). */
const allowed: Record<Who, ServiceId[]> = {
  personal: ["taxes-individuales", "itin", "seguros-de-vida", "seguros-de-salud"],
  business: ["taxes-corporativos", "creacion-de-empresas", "seguros-de-vida", "seguros-de-salud"],
  both: [...serviceIds],
};

/** Pregunta 2: qué resolver primero. */
export const firstOptions = (who: Who): ServiceId[] => allowed[who];

/** Pregunta 3: qué más revisar (los demás servicios permitidos, sin repetir el de la pregunta 2). */
export const secondOptions = (who: Who, first: ServiceId): ServiceId[] => allowed[who].filter((id) => id !== first);

/** Si se cambia una respuesta anterior, descarta las siguientes que ya no sean válidas. */
export function reconcile(state: QuizState): QuizState {
  const { who } = state;
  if (!who) return emptyQuiz;
  const first = state.first && firstOptions(who).includes(state.first) ? state.first : null;
  if (!first) return { who, first: null, second: null };
  const second =
    state.second === NONE || (state.second && secondOptions(who, first).includes(state.second)) ? state.second : null;
  return { who, first, second };
}

/** Servicios a mostrar al final: primero el principal y, si lo hay, el segundo. */
export function getResult(state: QuizState): ServiceId[] {
  const { first, second } = state;
  if (!first) return [];
  return second && second !== NONE ? [first, second] : [first];
}

export const isComplete = (s: QuizState) => Boolean(s.who && s.first && s.second);
