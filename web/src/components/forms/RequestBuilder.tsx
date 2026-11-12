"use client";

import { useRef, useState } from "react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { buildRequestMessage, whatsappLink } from "@/lib/request";
import { buttonClass } from "@/components/ui/Button";
import { Check, Message } from "@/components/ui/Icons";

const fieldClass =
  "mt-1.5 block min-h-12 w-full rounded-md border border-navy/25 bg-white px-3.5 text-base text-navy focus:border-navy";

/**
 * Arma una solicitud lista para enviar. NO envía nada ni guarda datos: solo copia el texto
 * al portapapeles o lo abre en WhatsApp (si el número está configurado).
 */
export function RequestBuilder({
  locale,
  labels,
  privacy,
  services,
  whatsapp,
}: {
  locale: Locale;
  labels: Dictionary["contact"]["builder"];
  privacy: string;
  services: { id: string; name: string }[];
  whatsapp: string | null;
}) {
  const [service, setService] = useState(services[0]?.name ?? "");
  const [whenIndex, setWhenIndex] = useState(0);
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const previewRef = useRef<HTMLPreElement>(null);

  const message = buildRequestMessage(labels, service, labels.when[whenIndex].toLocaleLowerCase(locale));

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
    } catch {
      // Sin acceso al portapapeles: se selecciona el texto para que lo copie a mano.
      const node = previewRef.current;
      if (node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
      setStatus("failed");
    }
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          {labels.serviceLabel}
          <select
            value={service}
            onChange={(e) => {
              setService(e.target.value);
              setStatus("idle");
            }}
            className={fieldClass}
          >
            {services.map((s) => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-navy">
          {labels.whenLabel}
          <select
            value={whenIndex}
            onChange={(e) => {
              setWhenIndex(Number(e.target.value));
              setStatus("idle");
            }}
            className={fieldClass}
          >
            {labels.when.map((w, i) => (
              <option key={w} value={i}>
                {w}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="text-sm font-medium text-navy">{labels.previewLabel}</p>
        <pre
          ref={previewRef}
          className="mt-1.5 whitespace-pre-wrap rounded-md border border-line border-l-[3px] border-l-gold bg-ivory p-4 font-sans text-[0.95rem] leading-relaxed text-navy"
        >
          {message}
        </pre>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={copy} className={buttonClass({ size: "lg", className: "w-full sm:w-auto" })}>
          {status === "copied" ? <Check /> : null}
          {labels.copy}
        </button>
        {whatsapp ? (
          <a
            href={whatsappLink(whatsapp.replace(/\D/g, ""), message)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}
          >
            <Message />
            {labels.whatsapp}
          </a>
        ) : null}
      </div>

      <div aria-live="polite" className="min-h-5 text-sm font-medium text-navy">
        {status === "copied" ? labels.copied : status === "failed" ? labels.copyFailed : null}
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{whatsapp ? labels.noteWhatsapp : labels.noteNoWhatsapp}</p>
      <p className="text-sm leading-relaxed text-ink-soft">{privacy}</p>
    </div>
  );
}
