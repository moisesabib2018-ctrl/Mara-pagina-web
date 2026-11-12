"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { Close } from "@/components/ui/Icons";
import { BookingFlow } from "./BookingFlow";

/**
 * Abre el calendario en una ventana modal desde CUALQUIER enlace o botón que apunte a "#agenda"
 * (encabezado, barra móvil, páginas de servicio, pie, chat…). Sin JavaScript esos enlaces siguen llevando a la sección.
 */
export function BookingProvider({ locale, labels }: { locale: Locale; labels: Dictionary["scheduler"] }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Intercepta los clics (fase de captura, antes que el enrutador) sin romper otros manejadores.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.getAttribute("target") === "_blank") return;
      // "#agenda", "/es#agenda" o "/en#agenda"
      if (!/^(\/(es|en))?#agenda$/.test(a.getAttribute("href") ?? "")) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="booking-dialog-title"
      onClose={() => setOpen(false)}
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}
      className="m-auto max-h-[100svh] w-full max-w-4xl overflow-hidden rounded-none bg-white p-0 text-navy shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)] backdrop:bg-navy/70 backdrop:backdrop-blur-sm max-sm:h-[100svh] max-sm:max-w-none sm:max-h-[min(92svh,820px)] sm:rounded-2xl"
    >
      {open ? (
        <div className="flex max-h-[inherit] flex-col max-sm:h-[100svh]">
          <div className="flex items-start justify-between gap-4 bg-navy px-5 py-5 text-white sm:px-8">
            <div>
              <h2 id="booking-dialog-title" className="font-serif text-2xl sm:text-3xl">{labels.title}</h2>
              <p className="mt-1 text-sm text-white/75">{labels.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={labels.close}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold-light hover:text-gold-light"
            >
              <Close />
            </button>
          </div>
          <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            <BookingFlow locale={locale} labels={labels} onClose={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
