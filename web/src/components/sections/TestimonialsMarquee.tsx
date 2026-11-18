"use client";

import { useState, type CSSProperties, type ReactNode } from "react";

/**
 * Dos filas de tarjetas que corren en sentidos opuestos (efecto de carrusel infinito). El contenido se duplica
 * (la copia va oculta a lectores de pantalla) para que el bucle sea continuo. Incluye botón de pausa.
 */
export function TestimonialsMarquee({
  rows,
  labels,
}: {
  rows: ReactNode[][];
  labels: { pause: string; play: string };
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div className="space-y-5">
        {rows.map((cards, r) => (
          <div key={r} className={`marquee overflow-hidden py-2 ${r > 0 ? "motion-reduce:hidden" : ""}`}>
            <div
              className="marquee-track"
              style={
                {
                  "--marquee-duration": `${r === 0 ? 70 : 80}s`,
                  animationDirection: r % 2 === 0 ? "normal" : "reverse",
                  animationPlayState: paused ? "paused" : "running",
                } as CSSProperties
              }
            >
              <ul className="marquee-set">{cards}</ul>
              <ul className="marquee-set marquee-dup" aria-hidden="true">
                {cards}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center motion-reduce:hidden">
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
