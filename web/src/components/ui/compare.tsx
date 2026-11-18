"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/cn";

// Deslizador de antes y después (efecto «Compare» de Aceternity UI), sin librerías: clip-path + eventos del puntero.
//  - `first` queda encima y se revela de izquierda a derecha; `second` va debajo.
//  - Se arrastra con mouse y dedo (el desplazamiento vertical de la página sigue funcionando: touch-action: pan-y)
//    y es accesible con teclado (role="slider": flechas, Inicio, Fin).
//  - No tiene animación propia, así que no depende de «reducir movimiento».

export function Compare({
  first,
  second,
  firstLabel,
  secondLabel,
  ariaLabel,
  initialPosition = 50,
  className,
}: {
  first: React.ReactNode;
  second: React.ReactNode;
  firstLabel?: string;
  secondLabel?: string;
  ariaLabel: string;
  initialPosition?: number;
  className?: string;
}) {
  const [position, setPosition] = useState(initialPosition);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const moveTo = (clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const { left, width } = box.getBoundingClientRect();
    if (width === 0) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 4;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPosition((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPosition((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPosition(0);
    else if (e.key === "End") setPosition(100);
    else return;
    e.preventDefault();
  };

  const chip = "absolute top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-navy shadow-sm ring-1 ring-line sm:top-4 sm:text-sm";

  return (
    <div
      ref={boxRef}
      className={cn("relative aspect-[16/9] w-full cursor-ew-resize select-none overflow-hidden rounded-2xl border border-line bg-white", className)}
      style={{ touchAction: "pan-y" }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        setDragging(true);
        moveTo(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging) moveTo(e.clientX);
      }}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <div className="absolute inset-0">
        {second}
        {secondLabel ? <span className={cn(chip, "right-3 sm:right-4")}>{secondLabel}</span> : null}
      </div>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {first}
        {firstLabel ? <span className={cn(chip, "left-3 sm:left-4")}>{firstLabel}</span> : null}
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(4,27,60,0.12)]" style={{ left: `${position}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold bg-white text-gold-dark shadow-[0_6px_18px_-6px_rgba(4,27,60,0.5)] outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-navy"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 7l-5 5 5 5" />
            <path d="M15 7l5 5-5 5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
