"use client";

import { useSyncExternalStore } from "react";
import { getDateStatus, todayInZone, type DateStatus } from "@/lib/dates";
import type { KeyDate } from "@/content/key-dates";
import type { Dictionary } from "@/content/ui";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export type KeyDateCard = { item: KeyDate; title: string; text: string; note?: string; range: string };

const fill = (s: string, n: number) => s.replace("{n}", String(n));
const plural = (pair: string[], n: number) => fill(n === 1 ? pair[0] : pair[1], n);

function pill(status: DateStatus, l: Dictionary["keyDates"]): { label: string; tone: "gold" | "navy" | "soft" } | null {
  switch (status.state) {
    case "open":
      if (status.days === null) return { label: l.openNow, tone: "gold" };
      return { label: `${l.openNow} · ${status.days === 0 ? l.closesToday : plural(l.closesIn, status.days)}`, tone: "gold" };
    case "upcoming":
      return { label: plural(l.opensIn, status.days), tone: "soft" };
    case "deadline":
      return status.days === 0
        ? { label: l.today, tone: "navy" }
        : status.days <= 45
          ? { label: plural(l.daysLeft, status.days), tone: "navy" }
          : { label: l.markIt, tone: "soft" };
    default:
      return null;
  }
}

function subscribeToClock(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

const tones = { gold: "bg-gold text-navy", navy: "bg-navy text-white", soft: "bg-navy-50 text-navy" } as const;

/**
 * El estado ("abierto ahora", "cierra en N días") se calcula en el navegador con la fecha de Houston,
 * para que nunca quede desactualizado en una página ya compilada. Las fechas vencidas se ocultan.
 */
export function KeyDates({ cards, labels }: { cards: KeyDateCard[]; labels: Dictionary["keyDates"] }) {
  // En el servidor "hoy" es desconocido (null); en el navegador es la fecha de Houston y se revisa cada minuto.
  const today = useSyncExternalStore(subscribeToClock, () => todayInZone(), () => null);

  const visible = cards
    .map((c) => ({ ...c, status: today ? getDateStatus(c.item, today) : null }))
    .filter((c) => c.status?.state !== "closed");
  if (visible.length === 0) return null;

  return (
    <section id="fechas" aria-labelledby="fechas-title" className="bg-ivory py-16 sm:py-24">
      <Container>
        <SectionHeading id="fechas-title" eyebrow={labels.eyebrow} title={labels.title} text={labels.text} />
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {visible.map(({ item, title, text, note, range, status }) => {
            const p = status ? pill(status, labels) : null;
            return (
              <li
                key={item.id}
                className={cn(
                  "flex flex-col rounded-2xl border bg-white p-7 shadow-[0_1px_2px_rgba(4,27,60,0.04)]",
                  status?.state === "open" ? "border-gold/70 shadow-[0_18px_40px_-26px_rgba(183,139,64,0.7)]" : "border-line",
                )}
              >
                <div className="min-h-8">
                  {p ? (
                    <span className={cn("inline-block rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em]", tones[p.tone])}>
                      {p.label}
                    </span>
                  ) : null}
                </div>
                <h3 className="mt-5 font-serif text-2xl leading-snug text-navy">{title}</h3>
                <p className="mt-2 text-lg font-semibold text-gold-dark">{range}</p>
                <p className="mt-4 border-t border-line pt-4 leading-relaxed text-ink-soft">{text}</p>
                {note ? <p className="mt-3 border-l-2 border-gold/60 pl-3 text-sm leading-relaxed text-ink-soft">{note}</p> : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-8 text-sm text-ink-soft">{labels.footnote}</p>
      </Container>
    </section>
  );
}
