"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

// Dos filas de tarjetas que giran en sentidos opuestos (carrusel infinito).
// Autocontenido a propósito: la disposición va con clases de Tailwind en este archivo y el movimiento lo hace la
// Web Animations API, así que no depende de CSS global. El contenido se duplica (la copia va oculta a lectores de
// pantalla) para que el bucle sea continuo. Se pausa con el botón y al pasar el mouse.

const FADE = "[mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]";
const DURATIONS = [70, 80]; // segundos por vuelta de cada fila

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export function TestimonialsMarquee({
  rows,
  labels,
}: {
  rows: ReactNode[][];
  labels: { pause: string; play: string };
}) {
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
  const [paused, setPaused] = useState(false);
  const tracks = useRef<(HTMLDivElement | null)[]>([]);
  const animations = useRef<Animation[]>([]);
  const hovered = useRef(false);

  // Crea una animación por fila: la primera avanza hacia la izquierda y la segunda en sentido contrario.
  useEffect(() => {
    if (reduced) return;
    const list = tracks.current.flatMap((el, i) =>
      el
        ? [
            el.animate([{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }], {
              duration: (DURATIONS[i] ?? 75) * 1000,
              iterations: Infinity,
              direction: i % 2 === 0 ? "normal" : "reverse",
              easing: "linear",
            }),
          ]
        : [],
    );
    animations.current = list;
    return () => list.forEach((a) => a.cancel());
  }, [reduced, rows.length]);

  // Pausa o reanuda según el botón o el mouse encima.
  useEffect(() => {
    const stop = paused || hovered.current;
    animations.current.forEach((a) => (stop ? a.pause() : a.play()));
  }, [paused]);

  const setHover = (value: boolean) => {
    hovered.current = value;
    animations.current.forEach((a) => (value || paused ? a.pause() : a.play()));
  };

  // «Reducir movimiento»: tarjetas quietas, una sola vez cada una, acomodadas en filas.
  if (reduced) {
    return (
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-5 px-4">{rows[0]}</ul>
    );
  }

  return (
    <div>
      <div className="space-y-5">
        {rows.map((cards, r) => (
          <div
            key={r}
            className={`overflow-hidden py-2 ${FADE}`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              ref={(el) => {
                tracks.current[r] = el;
              }}
              className="flex w-max"
            >
              <ul className="flex items-center gap-5 pr-5">{cards}</ul>
              <ul className="flex items-center gap-5 pr-5" aria-hidden="true">
                {cards}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-sm font-medium text-navy transition-colors hover:border-gold"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-gold-dark">
            {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
          </svg>
          {paused ? labels.play : labels.pause}
        </button>
      </div>
    </div>
  );
}
