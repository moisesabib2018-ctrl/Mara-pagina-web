"use client";

import { useState } from "react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { cn } from "@/lib/cn";

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "mt-1.5 block min-h-12 w-full rounded-md border border-navy/25 bg-white px-3.5 text-base text-navy placeholder:text-ink-soft/60 focus:border-navy disabled:bg-mist-100";

export function ContactForm({
  enabled,
  locale,
  labels,
  services,
}: {
  enabled: boolean;
  locale: Locale;
  labels: Dictionary["contact"];
  services: { id: string; name: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const f = labels.fields;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!enabled || status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate={false}>
      {!enabled ? (
        <p role="status" className="rounded-md border border-gold/50 bg-gold-tint px-4 py-3 text-sm text-navy">
          {labels.unavailable}
        </p>
      ) : null}

      <label className="block text-sm font-medium text-navy">
        {f.name}
        <input name="name" required maxLength={100} autoComplete="name" disabled={!enabled} className={fieldClass} />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-navy">
          {f.email}
          <input name="email" type="email" required maxLength={150} autoComplete="email" disabled={!enabled} className={fieldClass} />
        </label>
        <label className="block text-sm font-medium text-navy">
          {f.phone}
          <input name="phone" type="tel" maxLength={30} autoComplete="tel" disabled={!enabled} className={fieldClass} />
        </label>
      </div>
      <label className="block text-sm font-medium text-navy">
        {f.service}
        <select name="service" defaultValue="" disabled={!enabled} className={fieldClass}>
          <option value="">{f.servicePlaceholder}</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-navy">
        {f.message}
        <textarea name="message" required rows={5} maxLength={1500} disabled={!enabled} className={cn(fieldClass, "min-h-32 py-3")} />
      </label>

      {/* Honeypot: invisible para personas; los bots suelen llenarlo. */}
      <div className="hidden" aria-hidden="true">
        <input name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-ink-soft">{labels.privacy}</p>

      <button
        type="submit"
        disabled={!enabled || status === "sending"}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-md bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "sending" ? labels.sending : labels.submit}
      </button>

      <div aria-live="polite">
        {status === "success" ? <p className="text-sm font-medium text-navy">{labels.success}</p> : null}
        {status === "error" ? <p className="text-sm font-medium text-red-800">{labels.error}</p> : null}
      </div>
    </form>
  );
}
