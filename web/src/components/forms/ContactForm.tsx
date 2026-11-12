"use client";

import { useEffect, useId, useState } from "react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { OTHER } from "@/lib/contact-mail";
import { isValidEmail, isValidPhone } from "@/lib/scheduler";
import { cn } from "@/lib/cn";
import { ArrowRight, Check } from "@/components/ui/Icons";

type Status = "idle" | "sending" | "success" | "error" | "sensitive" | "tooMany";
type Field = "firstName" | "lastName" | "email" | "phone" | "service" | "message";

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-navy/25 bg-white px-3.5 text-base text-navy placeholder:text-ink-soft/60 focus:border-navy aria-[invalid=true]:border-red-700";

/**
 * Formulario de contacto: el mensaje llega por correo a la asesora (POST /api/contact). Consulta GET /api/contact al cargar:
 * si el correo aún no está conectado, se ve el formulario pero el envío queda bloqueado con un aviso (nunca finge enviar).
 */
export function ContactForm({
  locale,
  labels,
  services,
}: {
  locale: Locale;
  labels: Dictionary["contact"];
  services: { id: string; name: string }[];
}) {
  const uid = useId();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [values, setValues] = useState({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "", website: "" });
  const [errors, setErrors] = useState<Partial<Record<Field, boolean>>>({});
  const f = labels.fields;

  useEffect(() => {
    fetch("/api/contact", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, []);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));

  function validate() {
    const e: Partial<Record<Field, boolean>> = {
      firstName: values.firstName.trim().length < 2,
      lastName: values.lastName.trim().length < 2,
      email: !isValidEmail(values.email),
      phone: values.phone.trim() !== "" && !isValidPhone(values.phone),
      service: values.service === "",
      message: values.message.trim().length < 10,
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled || status === "sending" || !validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ firstName: "", lastName: "", email: "", phone: "", service: "", message: "", website: "" });
        return;
      }
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus(body.error === "sensitive" ? "sensitive" : res.status === 429 ? "tooMany" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="py-6 text-center" role="status">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold text-navy">
          <Check width={28} height={28} />
        </span>
        <p className="mt-4 font-serif text-2xl text-navy">{labels.success}</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-6 min-h-12 rounded-lg border border-navy/30 px-5 font-semibold text-navy transition-colors hover:border-navy hover:bg-navy-50">
          {labels.again}
        </button>
      </div>
    );
  }

  const field = (k: Field, label: string, input: React.ReactNode) => (
    <div>
      <label htmlFor={`${uid}-${k}`} className="text-sm font-medium text-navy">
        {label}
      </label>
      {input}
      {errors[k] ? (
        <p id={`${uid}-${k}-e`} className="mt-1 text-sm font-medium text-red-800">
          {labels.errors[k]}
        </p>
      ) : null}
    </div>
  );
  const aria = (k: Field) => ({ id: `${uid}-${k}`, "aria-invalid": errors[k] || undefined, "aria-describedby": errors[k] ? `${uid}-${k}-e` : undefined });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {enabled === false ? (
        <p role="status" className="rounded-lg border border-gold/60 bg-gold-tint px-4 py-3 text-sm leading-relaxed text-navy">
          {labels.unavailable}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {field("firstName", f.firstName, <input {...aria("firstName")} value={values.firstName} onChange={set("firstName")} autoComplete="given-name" maxLength={60} className={inputClass} />)}
        {field("lastName", f.lastName, <input {...aria("lastName")} value={values.lastName} onChange={set("lastName")} autoComplete="family-name" maxLength={60} className={inputClass} />)}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("email", f.email, <input {...aria("email")} type="email" inputMode="email" value={values.email} onChange={set("email")} autoComplete="email" maxLength={150} className={inputClass} />)}
        {field("phone", f.phone, <input {...aria("phone")} type="tel" inputMode="tel" value={values.phone} onChange={set("phone")} autoComplete="tel" maxLength={25} className={inputClass} />)}
      </div>
      {field(
        "service",
        f.service,
        <select {...aria("service")} value={values.service} onChange={set("service")} className={inputClass}>
          <option value="">{f.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
          <option value={OTHER}>{f.other}</option>
        </select>,
      )}
      {field("message", f.message, <textarea {...aria("message")} value={values.message} onChange={set("message")} rows={5} maxLength={1500} placeholder={f.messagePlaceholder} className={cn(inputClass, "min-h-32 py-3")} />)}

      {/* Honeypot: invisible para las personas; los robots suelen llenarlo. */}
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={set("website")} />
      </div>

      <p className="text-sm leading-relaxed text-ink-soft">{labels.privacy}</p>

      <button
        type="submit"
        disabled={enabled !== true || status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gold sm:w-auto"
      >
        {status === "sending" ? labels.sending : labels.submit}
        {status === "sending" ? null : <ArrowRight width={18} height={18} />}
      </button>

      <div aria-live="polite">
        {status === "error" ? <p className="text-sm font-medium text-red-800">{labels.error}</p> : null}
        {status === "sensitive" ? <p className="text-sm font-medium text-red-800">{labels.sensitive}</p> : null}
        {status === "tooMany" ? <p className="text-sm font-medium text-red-800">{labels.tooMany}</p> : null}
      </div>
    </form>
  );
}
