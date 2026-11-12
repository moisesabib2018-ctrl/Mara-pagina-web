"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ServiceId } from "@/config/service-slugs";
import type { Dictionary } from "@/content/ui";
import { NONE, emptyQuiz, firstOptions, getResult, isComplete, reconcile, secondOptions, type QuizState, type Who } from "@/lib/quiz";
import { cn } from "@/lib/cn";
import { ArrowRight, Check } from "@/components/ui/Icons";

export type QuizService = { id: ServiceId; name: string; short: string; href: string };

const TOTAL = 3;
const whos: Who[] = ["personal", "business", "both"];

/**
 * Cuestionario de orientación (3 pasos). Funciona solo en el navegador: no pide datos personales, fiscales ni médicos
 * y no envía ni guarda las respuestas. El resultado es una orientación general hacia los servicios existentes.
 */
export function Quiz({ labels, services }: { labels: Dictionary["quiz"]; services: QuizService[] }) {
  const [state, setState] = useState<QuizState>(emptyQuiz);
  const [step, setStep] = useState(0); // 0..2 preguntas, 3 resultado
  const headingRef = useRef<HTMLElement>(null);
  const mounted = useRef(false);

  // Al cambiar de paso, el foco va al encabezado del paso (lectores de pantalla y teclado). No en la carga inicial.
  useEffect(() => {
    if (mounted.current) headingRef.current?.focus();
    mounted.current = true;
  }, [step]);

  const byId = (id: ServiceId) => services.find((s) => s.id === id)!;
  const answered = step === 0 ? state.who : step === 1 ? state.first : step === 2 ? state.second : true;

  const update = (patch: Partial<QuizState>) => setState((prev) => reconcile({ ...prev, ...patch }));
  const go = (n: number) => setStep(Math.max(0, Math.min(TOTAL, n)));
  const restart = () => {
    setState(emptyQuiz);
    setStep(0);
  };

  let title = "";
  let hint = "";
  let options: { value: string; label: string; sub?: string }[] = [];
  let selected: string | null = null;
  let onPick: (value: string) => void = () => {};

  if (step === 0) {
    ({ title, hint } = labels.q1);
    options = whos.map((w) => ({ value: w, label: labels.q1[w] }));
    selected = state.who;
    onPick = (v) => update({ who: v as Who });
  } else if (step === 1 && state.who) {
    ({ title, hint } = labels.q2);
    options = firstOptions(state.who).map((id) => ({ value: id, label: byId(id).name, sub: byId(id).short }));
    selected = state.first;
    onPick = (v) => update({ first: v as ServiceId });
  } else if (step === 2 && state.who && state.first) {
    ({ title, hint } = labels.q3);
    options = [
      ...secondOptions(state.who, state.first).map((id) => ({ value: id, label: byId(id).name, sub: byId(id).short })),
      { value: NONE, label: labels.q3.none },
    ];
    selected = state.second;
    onPick = (v) => update({ second: v as QuizState["second"] });
  }

  const result = step === TOTAL && isComplete(state) ? getResult(state) : [];

  return (
    <section
      id="cuestionario"
      aria-labelledby="cuestionario-title"
      className="relative overflow-hidden bg-navy bg-[radial-gradient(ellipse_at_top,rgba(18,58,112,0.6),transparent_62%)] py-14 sm:py-20"
    >
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-light sm:text-sm">{labels.eyebrow}</p>
          <h2 id="cuestionario-title" className="mt-4 text-balance font-serif text-4xl leading-[1.08] text-white sm:text-6xl">
            {labels.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-xl">{labels.subtitle}</p>
        </div>

        <div className="mt-10 rounded-3xl border border-gold/40 bg-deep/70 p-5 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] sm:p-9">
          <ol aria-label={labels.progress} className="flex gap-2 sm:gap-3">
            {Array.from({ length: TOTAL }, (_, i) => (
              <li
                key={i}
                aria-current={i === Math.min(step, TOTAL - 1) ? "step" : undefined}
                className={cn("h-1.5 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-gold" : "bg-white/15")}
              >
                <span className="sr-only">{labels.step.replace("{n}", String(i + 1)).replace("{total}", String(TOTAL))}</span>
              </li>
            ))}
          </ol>

          {step < TOTAL ? (
            <fieldset key={step} className="mt-8 min-w-0">
              <legend ref={headingRef as React.RefObject<HTMLLegendElement>} tabIndex={-1} className="font-serif text-2xl leading-snug text-white outline-none sm:text-3xl">
                {title}
              </legend>
              <p className="mt-2 text-white/70">{hint}</p>

              <div className="mt-6 grid gap-3">
                {options.map((o) => (
                  <label key={o.value} className="block cursor-pointer">
                    <input
                      type="radio"
                      name={`quiz-step-${step}`}
                      value={o.value}
                      checked={selected === o.value}
                      onChange={() => onPick(o.value)}
                      className="peer sr-only"
                    />
                    <span className="flex min-h-[4.25rem] items-center gap-4 rounded-2xl border border-gold/35 bg-navy/70 px-5 py-3.5 transition-colors hover:border-gold peer-checked:border-gold peer-checked:bg-gold/15 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full border-2 border-gold transition-colors",
                          selected === o.value ? "bg-gold text-navy" : "bg-transparent text-transparent",
                        )}
                      >
                        <Check width={16} height={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-base font-semibold text-white sm:text-lg">{o.label}</span>
                        {o.sub ? <span className="mt-0.5 block text-sm leading-snug text-white/65">{o.sub}</span> : null}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  disabled={step === 0}
                  className="min-h-12 rounded-lg border border-white/35 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/35 disabled:hover:bg-transparent"
                >
                  {labels.back}
                </button>
                <button
                  type="button"
                  onClick={() => go(step + 1)}
                  disabled={!answered}
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gold"
                >
                  {step === TOTAL - 1 ? labels.finish : labels.next}
                  <ArrowRight width={18} height={18} />
                </button>
              </div>
            </fieldset>
          ) : (
            <div key="result" aria-live="polite" className="mt-8">
              <h3 ref={headingRef as React.RefObject<HTMLHeadingElement>} tabIndex={-1} className="font-serif text-2xl leading-snug text-white outline-none sm:text-3xl">
                {labels.result.title}
              </h3>
              <p className="mt-2 text-white/70">{labels.result.text}</p>

              <ul className="mt-6 grid gap-3">
                {result.map((id, i) => {
                  const svc = byId(id);
                  return (
                    <li key={id}>
                      <Link
                        href={svc.href}
                        className={cn(
                          "group block rounded-2xl border bg-navy/70 p-5 transition-colors hover:border-gold sm:p-6",
                          i === 0 ? "border-gold" : "border-gold/35",
                        )}
                      >
                        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
                          {i === 0 ? labels.result.first : labels.result.second}
                        </span>
                        <span className="mt-2 block font-serif text-2xl text-white">{svc.name}</span>
                        <span className="mt-1 block leading-relaxed text-white/70">{svc.short}</span>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-light">
                          {labels.result.link}
                          <ArrowRight width={18} height={18} className="transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-white/60">{labels.result.disclaimer}</p>

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => go(TOTAL - 1)}
                  className="min-h-12 rounded-lg border border-white/35 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
                >
                  {labels.back}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  className="min-h-12 rounded-lg border border-gold/60 px-5 font-semibold text-gold-light transition-colors hover:border-gold hover:bg-gold/10"
                >
                  {labels.restart}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
