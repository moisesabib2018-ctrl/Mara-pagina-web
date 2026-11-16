"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// ContainerTextFlip (API de Aceternity UI: words, interval, className, textClassName, animationDuration).
// Versión sin la librería `motion`: el cambio de palabra y el ajuste de ancho se hacen con CSS (ligero para el LCP).
// Cambios de comportamiento:
//  - La primera palabra se pinta ya visible (nada parte de opacidad 0), para no retrasar el LCP del titular.
//  - Con «reducir movimiento» no rota: queda fija la primera palabra.
//  - Las letras animadas se ocultan a lectores de pantalla, que reciben la lista completa de palabras.
//  - Sin colores, tamaños ni tipografía por defecto: hereda la del texto que lo rodea y se estiliza con className.

export interface ContainerTextFlipProps {
  words?: string[];
  /** Milisegundos entre palabras. */
  interval?: number;
  className?: string;
  textClassName?: string;
  /** Milisegundos que dura el ajuste de ancho. */
  animationDuration?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
}: ContainerTextFlipProps) {
  const [index, setIndex] = useState(0);
  const [hasFlipped, setHasFlipped] = useState(false);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const boxRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setHasFlipped(true);
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  // Mide la palabra actual (texto + relleno del recuadro) para que el ancho se ajuste con una transición.
  useLayoutEffect(() => {
    if (!boxRef.current || !textRef.current) return;
    const style = getComputedStyle(boxRef.current);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const border = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    setWidth(Math.ceil(textRef.current.getBoundingClientRect().width + padding + border));
  }, [index]);

  const word = words[index] ?? "";

  return (
    <>
      <span className="sr-only">{words.join(", ")}</span>
      <span
        ref={boxRef}
        aria-hidden="true"
        className={cn("relative inline-block overflow-clip whitespace-nowrap text-center", className)}
        style={{ width, boxSizing: "border-box", transition: `width ${animationDuration / 2}ms ease-in-out` }}
      >
        <span ref={textRef} className={cn("inline-block", textClassName)}>
          {Array.from(word).map((letter, i) => (
            <span
              key={`${index}-${i}`}
              className={hasFlipped ? "flip-letter" : undefined}
              style={hasFlipped ? { animationDelay: `${i * 20}ms` } : undefined}
            >
              {letter === " " ? " " : letter}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}
