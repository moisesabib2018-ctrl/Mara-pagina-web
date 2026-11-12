import type { Localized } from "@/types/service";

/**
 * Fechas clave de la temporada. DATOS POR AÑO: la asesora debe revisarlas y actualizarlas cada temporada.
 * Cuando una fecha ya pasó, la tarjeta se oculta sola; si pasan todas, se oculta la sección.
 * - Medicare (15 oct – 7 dic): verificada en varias fuentes.
 * - Mercado de salud (Obamacare): la fecha de CIERRE se reporta distinta según la fuente (15 dic / 15 ene)
 *   y depende del estado: por eso `end: null` y se muestra el aviso de confirmar.
 */
export type KeyDate = {
  id: string;
  title: Localized;
  text: Localized;
  /** Aviso opcional bajo el texto. */
  note?: Localized;
} & ({ kind: "window"; start: string; end: string | null } | { kind: "deadline"; date: string });

export const keyDates: KeyDate[] = [
  {
    id: "medicare-aep",
    kind: "window",
    start: "2026-10-15",
    end: "2026-12-07",
    title: { es: "Medicare — Inscripción anual", en: "Medicare — Annual Enrollment" },
    text: {
      es: "Ventana para cambiar o ajustar tu plan de Medicare para el próximo año.",
      en: "Window to change or adjust your Medicare plan for next year.",
    },
  },
  {
    id: "aca-open-enrollment",
    kind: "window",
    start: "2026-11-01",
    end: null,
    title: { es: "Obamacare — Inscripción abierta", en: "Obamacare — Open Enrollment" },
    text: {
      es: "El periodo para inscribirte o cambiar tu seguro de salud del Mercado para 2027.",
      en: "The period to enroll in or change your Marketplace health insurance for 2027.",
    },
    note: {
      es: "La fecha de cierre puede variar según tu estado: confírmala en HealthCare.gov o con tu asesora.",
      en: "The closing date may vary by state: confirm it at HealthCare.gov or with your advisor.",
    },
  },
  {
    id: "tax-deadline",
    kind: "deadline",
    date: "2027-04-15",
    title: { es: "Taxes — Último día para declarar", en: "Taxes — Last day to file" },
    text: {
      es: "Fecha límite federal para presentar tu declaración de impuestos 2026.",
      en: "Federal deadline to file your 2026 tax return.",
    },
  },
];
