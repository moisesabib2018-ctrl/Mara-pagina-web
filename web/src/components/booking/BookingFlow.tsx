"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { siteConfig, type Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { nowInZone } from "@/lib/dates";
import {
  endTime,
  isValidEmail,
  isValidPhone,
  maxBookableDate,
  monthGrid,
  monthKey,
  shiftMonth,
  slotsForDate,
  type Availability,
} from "@/lib/scheduler";
import { cn } from "@/lib/cn";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Phone, Video } from "@/components/ui/Icons";

type Mode = "phone" | "meet";
type Errors = Partial<Record<"name" | "phone" | "email", boolean>>;

const { booking } = siteConfig;
const availability: Availability = {
  ...booking.previewHours,
  weekdays: [...booking.previewHours.weekdays],
  stepMinutes: booking.consultationMinutes + booking.breakMinutes, // el descanso solo separa los inicios; nunca se muestra
  consultationMinutes: booking.consultationMinutes,
  minNoticeMinutes: booking.minNoticeMinutes,
  maxAdvanceMonths: booking.maxAdvanceMonths,
};

// "Ahora" en Houston: null en el servidor (evita desajustes) y se actualiza cada minuto en el navegador.
const subscribeToClock = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const useNow = () => useSyncExternalStore(subscribeToClock, () => nowInZone(booking.timeZone), () => null);

const bcp = (l: Locale) => (l === "es" ? "es-US" : "en-US");
const fmt = (iso: string, l: Locale, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(bcp(l), { ...o, timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`));
const fmtTime = (hm: string, l: Locale) =>
  new Intl.DateTimeFormat(bcp(l), { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(`1970-01-01T${hm}:00Z`));

const inputClass =
  "mt-1.5 block min-h-12 w-full rounded-lg border border-navy/25 bg-white px-3.5 text-base text-navy placeholder:text-ink-soft/60 focus:border-navy aria-[invalid=true]:border-red-700";

/**
 * Calendario de citas: elegir día y hora → modalidad (llamada o Google Meet) y datos → confirmación.
 * En modo "preview" muestra horarios de EJEMPLO con un aviso visible y no envía ni guarda nada.
 */
export function BookingFlow({ locale, labels, onClose }: { locale: Locale; labels: Dictionary["scheduler"]; onClose?: () => void }) {
  const uid = useId();
  const now = useNow();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [cursor, setCursor] = useState<string | null>(null); // "YYYY-MM"
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("phone");
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Errors>({});

  if (!now) return <div className="min-h-[28rem]" aria-hidden="true" />;

  const today = now.slice(0, 10);
  const lastDay = maxBookableDate(today, availability.maxAdvanceMonths);
  const month = cursor ?? monthKey(today);
  const weekStart = locale === "es" ? 1 : 0;
  const weeks = monthGrid(Number(month.slice(0, 4)), Number(month.slice(5, 7)) - 1, weekStart);
  // 2023-01-01 fue domingo: de ahí salen los nombres de los días en el orden de la semana del idioma
  const weekdayNames = Array.from({ length: 7 }, (_, i) => fmt(`2023-01-${String(1 + weekStart + i).padStart(2, "0")}`, locale, { weekday: "short" }));
  const times = date ? slotsForDate(date, now, availability) : [];
  const canPrev = month > monthKey(today);
  const canNext = month < monthKey(lastDay);
  const previewMode = booking.mode === "preview";

  const pickDate = (d: string) => {
    setDate(d);
    setTime(null);
  };
  const validate = () => {
    const e: Errors = {
      name: form.name.trim().length < 2,
      phone: !isValidPhone(form.phone),
      email: mode === "meet" && !isValidEmail(form.email),
    };
    setErrors(e);
    return !Object.values(e).some(Boolean);
  };
  const restart = () => {
    setStep(1);
    setDate(null);
    setTime(null);
    setMode("phone");
    setForm({ name: "", phone: "", email: "" });
    setErrors({});
  };

  const stepper = (
    <ol className="flex items-center gap-2 text-xs font-semibold sm:gap-3" aria-label={labels.title}>
      {labels.steps.map((name, i) => {
        const n = i + 1;
        const state = n === step ? "current" : n < step ? "done" : "todo";
        return (
          <li key={name} aria-current={state === "current" ? "step" : undefined} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[0.7rem]",
                state === "todo" ? "bg-mist-200 text-ink-soft" : "bg-gold text-navy",
              )}
            >
              {state === "done" ? <Check width={14} height={14} /> : n}
            </span>
            <span className={cn("hidden sm:inline", state === "current" ? "text-navy" : "text-ink-soft")}>{name}</span>
            {n < 3 ? <span className="h-px flex-1 bg-line" aria-hidden="true" /> : null}
          </li>
        );
      })}
    </ol>
  );

  return (
    <div className="text-navy">
      {previewMode ? (
        <p role="note" className="mb-5 rounded-lg border border-gold/60 bg-gold-tint px-4 py-3 text-sm leading-relaxed text-navy">
          {labels.preview}
        </p>
      ) : null}
      <div className="mb-6">{stepper}</div>

      {step === 1 ? (
        <div className="grid gap-8 md:grid-cols-[1.15fr_1fr]">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl first-letter:uppercase sm:text-2xl" id={`${uid}-month`} aria-live="polite">
                {fmt(`${month}-01`, locale, { month: "long", year: "numeric" })}
              </h3>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={labels.prevMonth}
                  disabled={!canPrev}
                  onClick={() => setCursor(shiftMonth(month, -1))}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-gold hover:bg-gold-tint disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  aria-label={labels.nextMonth}
                  disabled={!canNext}
                  onClick={() => setCursor(shiftMonth(month, 1))}
                  className="flex size-11 items-center justify-center rounded-full border border-line text-navy transition-colors hover:border-gold hover:bg-gold-tint disabled:opacity-30 disabled:hover:border-line disabled:hover:bg-transparent"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-ink-soft" aria-hidden="true">
              {weekdayNames.map((w, i) => (
                <span key={i}>{w.replace(".", "")}</span>
              ))}
            </div>
            <div role="group" aria-labelledby={`${uid}-month`} className="mt-2 grid grid-cols-7 gap-1">
              {weeks.flat().map((d, i) => {
                if (!d) return <span key={`e${i}`} />;
                const available = slotsForDate(d, now, availability).length > 0;
                const selected = d === date;
                return (
                  <button
                    key={d}
                    type="button"
                    disabled={!available}
                    aria-pressed={selected}
                    aria-label={fmt(d, locale, { weekday: "long", day: "numeric", month: "long" }) + (d === today ? `, ${labels.today}` : "")}
                    onClick={() => pickDate(d)}
                    className={cn(
                      "relative flex aspect-square min-h-11 items-center justify-center rounded-full text-sm transition-colors",
                      selected
                        ? "bg-gold font-bold text-navy shadow-[0_6px_14px_-6px_rgba(183,139,64,0.9)]"
                        : available
                          ? "bg-gold-tint/70 font-semibold text-navy hover:bg-gold-tint hover:ring-1 hover:ring-gold"
                          : "text-ink-soft/35",
                    )}
                  >
                    {Number(d.slice(8))}
                    {d === today ? <span aria-hidden="true" className="absolute bottom-1.5 size-1 rounded-full bg-navy" /> : null}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="md:border-l md:border-line md:pl-8">
            <h3 className="font-serif text-xl sm:text-2xl">{labels.times}</h3>
            <p className="mt-1 text-sm text-ink-soft">{labels.timezone}</p>
            <div aria-live="polite" className="mt-4">
              {!date ? (
                <p className="rounded-lg border border-dashed border-line px-4 py-8 text-center text-ink-soft">{labels.pickDay}</p>
              ) : (
                <>
                  <p className="mb-3 font-semibold first-letter:uppercase">{fmt(date, locale, { weekday: "long", day: "numeric", month: "long" })}</p>
                  {times.length === 0 ? (
                    <p className="text-ink-soft">{labels.noTimes}</p>
                  ) : (
                    <ul className="grid grid-cols-2 gap-2">
                      {times.map((t) => (
                        <li key={t}>
                          <button
                            type="button"
                            aria-pressed={t === time}
                            onClick={() => setTime(t)}
                            className={cn(
                              "flex min-h-12 w-full flex-col items-center justify-center rounded-lg border px-2 text-sm font-semibold transition-colors",
                              t === time ? "border-navy bg-navy text-white" : "border-gold/50 bg-white text-navy hover:border-gold hover:bg-gold-tint",
                            )}
                          >
                            {fmtTime(t, locale)}
                            <span className={cn("text-[0.7rem] font-normal", t === time ? "text-white/70" : "text-ink-soft")}>
                              {labels.duration} · {fmtTime(endTime(t, availability), locale)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
            <button
              type="button"
              disabled={!date || !time}
              onClick={() => setStep(2)}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-gold"
            >
              {labels.next}
              <ArrowRight width={18} height={18} />
            </button>
          </div>
        </div>
      ) : null}

      {step === 2 && date && time ? (
        <form
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) setStep(3);
          }}
          className="mx-auto max-w-xl space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gold/50 bg-ivory px-4 py-3">
            <p className="font-semibold">
              <span className="first-letter:uppercase">{fmt(date, locale, { weekday: "long", day: "numeric", month: "long" })}</span> · {fmtTime(time, locale)}
            </p>
            <button type="button" onClick={() => setStep(1)} className="min-h-11 px-1 text-sm font-semibold text-gold-dark underline underline-offset-4">
              {labels.change}
            </button>
          </div>

          <fieldset>
            <legend className="font-serif text-xl sm:text-2xl">{labels.how}</legend>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(["phone", "meet"] as const).map((m) => {
                const info = m === "phone" ? labels.phoneCall : labels.meet;
                const Icon = m === "phone" ? Phone : Video;
                return (
                  <label key={m} className="block cursor-pointer">
                    <input type="radio" name={`${uid}-mode`} value={m} checked={mode === m} onChange={() => setMode(m)} className="peer sr-only" />
                    <span className="flex h-full gap-3 rounded-xl border border-line bg-white p-4 transition-colors hover:border-gold peer-checked:border-gold peer-checked:bg-gold-tint/60 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold">
                      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-full", mode === m ? "bg-gold text-navy" : "bg-mist-100 text-navy")}>
                        <Icon width={20} height={20} />
                      </span>
                      <span>
                        <span className="block font-semibold">{info.title}</span>
                        <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{info.text}</span>
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="space-y-4">
            <div>
              <label htmlFor={`${uid}-name`} className="text-sm font-medium">{labels.fields.name}</label>
              <input id={`${uid}-name`} value={form.name} autoComplete="name" maxLength={100} aria-invalid={errors.name || undefined} aria-describedby={errors.name ? `${uid}-name-e` : undefined} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
              {errors.name ? <p id={`${uid}-name-e`} className="mt-1 text-sm font-medium text-red-800">{labels.errors.name}</p> : null}
            </div>
            <div>
              <label htmlFor={`${uid}-phone`} className="text-sm font-medium">{labels.fields.phone}</label>
              <input id={`${uid}-phone`} type="tel" inputMode="tel" value={form.phone} autoComplete="tel" maxLength={25} aria-invalid={errors.phone || undefined} aria-describedby={`${uid}-phone-h${errors.phone ? ` ${uid}-phone-e` : ""}`} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="(713) 555-0123" />
              <p id={`${uid}-phone-h`} className="mt-1 text-sm text-ink-soft">{mode === "phone" ? labels.fields.phoneHintCall : labels.fields.phoneHintMeet}</p>
              {errors.phone ? <p id={`${uid}-phone-e`} className="mt-1 text-sm font-medium text-red-800">{labels.errors.phone}</p> : null}
            </div>
            {mode === "meet" ? (
              <div>
                <label htmlFor={`${uid}-email`} className="text-sm font-medium">{labels.fields.email}</label>
                <input id={`${uid}-email`} type="email" inputMode="email" value={form.email} autoComplete="email" maxLength={150} aria-invalid={errors.email || undefined} aria-describedby={`${uid}-email-h${errors.email ? ` ${uid}-email-e` : ""}`} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                <p id={`${uid}-email-h`} className="mt-1 text-sm text-ink-soft">{labels.fields.emailHint}</p>
                {errors.email ? <p id={`${uid}-email-e`} className="mt-1 text-sm font-medium text-red-800">{labels.errors.email}</p> : null}
              </div>
            ) : null}
          </div>

          <p className="text-sm leading-relaxed text-ink-soft">{labels.privacy}</p>

          <div className="flex items-center justify-between gap-3">
            <button type="button" onClick={() => setStep(1)} className="min-h-12 rounded-lg border border-navy/30 px-5 font-semibold transition-colors hover:border-navy hover:bg-navy-50">
              {labels.back}
            </button>
            <button type="submit" className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light">
              {labels.confirm}
              <ArrowRight width={18} height={18} />
            </button>
          </div>
        </form>
      ) : null}

      {step === 3 && date && time ? (
        <div className="mx-auto max-w-xl text-center" aria-live="polite">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gold text-navy">
            <Check width={32} height={32} />
          </span>
          <h3 className="mt-5 font-serif text-2xl sm:text-3xl">{labels.doneTitle}</h3>
          <p className="mt-2 leading-relaxed text-ink-soft">{labels.doneText}</p>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-xl border border-line bg-ivory p-5 text-left text-sm sm:text-base">
            <dt className="text-ink-soft">{labels.summary.day}</dt>
            <dd className="font-semibold first-letter:uppercase">{fmt(date, locale, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</dd>
            <dt className="text-ink-soft">{labels.summary.time}</dt>
            <dd className="font-semibold">{fmtTime(time, locale)} – {fmtTime(endTime(time, availability), locale)}</dd>
            <dt className="text-ink-soft">{labels.summary.mode}</dt>
            <dd className="font-semibold">{mode === "phone" ? labels.phoneCall.title : labels.meet.title}</dd>
            <dt className="text-ink-soft">{labels.summary.phone}</dt>
            <dd className="font-semibold">{form.phone}</dd>
            {mode === "meet" ? (
              <>
                <dt className="text-ink-soft">{labels.summary.email}</dt>
                <dd className="break-all font-semibold">{form.email}</dd>
              </>
            ) : null}
          </dl>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={restart} className="min-h-12 rounded-lg border border-navy/30 px-5 font-semibold transition-colors hover:border-navy hover:bg-navy-50">
              {labels.restart}
            </button>
            {onClose ? (
              <button type="button" onClick={onClose} className="min-h-12 rounded-lg bg-gold px-6 font-semibold text-navy transition-colors hover:bg-gold-light">
                {labels.closeDone}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
