"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/config/site";
import type { Dictionary } from "@/content/ui";
import { Chat, Close } from "@/components/ui/Icons";

type Message = { role: "user" | "assistant"; content: string };

/**
 * Interfaz del asistente. Consulta GET /api/chat para saber si hay un proveedor de IA conectado.
 * Si no lo hay, NO simula respuestas: muestra el aviso y accesos directos.
 */
export function ChatWidget({
  locale,
  labels,
  links,
}: {
  locale: Locale;
  labels: Dictionary["chat"];
  links: { services: string; booking: string; whatsapp: string | null };
}) {
  const [open, setOpen] = useState(false);
  // Estado real del servidor (se consulta una vez al abrir): "checking" | "on" | "off"
  const [status, setStatus] = useState<"checking" | "on" | "off">("checking");
  const enabled = status === "on";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    if (status !== "checking") return;
    fetch("/api/chat", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enabled: false }))
      .then((d: { enabled?: boolean }) => setStatus(d.enabled ? "on" : "off"))
      .catch(() => setStatus("off"));
  }, [open, status]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, loading]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!enabled || !text || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: next.slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string };
      setMessages([...next, { role: "assistant", content: res.ok && data.reply ? data.reply : res.status === 429 ? labels.tooMany : labels.error }]);
    } catch {
      setMessages([...next, { role: "assistant", content: labels.error }]);
    } finally {
      setLoading(false);
    }
  }

  const quick = [
    { href: links.services, label: labels.quickServices },
    { href: links.booking, label: labels.quickBook },
    ...(links.whatsapp ? [{ href: links.whatsapp, label: labels.quickWhatsapp, external: true }] : []),
  ];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? labels.close : labels.open}
        className="fixed bottom-24 right-3 z-40 flex size-12 md:size-14 items-center justify-center rounded-full bg-gold text-navy shadow-lg transition-colors hover:bg-gold-light md:bottom-24 md:right-6"
      >
        {open ? <Close width={24} height={24} /> : <Chat width={24} height={24} />}
      </button>

      {open ? (
        <div
          id="chat-panel"
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-label={labels.title}
          onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
          className="fixed inset-x-3 bottom-40 z-40 flex max-h-[calc(100dvh-11rem)] flex-col overflow-hidden rounded-lg border border-line bg-white shadow-2xl outline-none sm:inset-x-auto sm:right-6 sm:w-[24rem]"
        >
          <div className="bg-navy px-5 py-4 text-white">
            <p className="font-serif text-lg">{labels.title}</p>
            <p className="text-xs text-white/70">{labels.subtitle}</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            <p className="rounded-md bg-mist-100 px-3.5 py-3 leading-relaxed text-navy">{labels.greeting}</p>
            {status === "off" ? <p className="rounded-md border border-gold/50 bg-gold-tint px-3.5 py-3 leading-relaxed text-navy">{labels.unavailable}</p> : null}
            {messages.map((m, i) => (
              <p
                key={i}
                className={
                  m.role === "user"
                    ? "ml-8 rounded-md bg-navy px-3.5 py-3 leading-relaxed text-white"
                    : "mr-8 rounded-md bg-mist-100 px-3.5 py-3 leading-relaxed text-navy"
                }
              >
                {m.content}
              </p>
            ))}
            {loading ? <p className="text-ink-soft" aria-live="polite">…</p> : null}
            <div className="flex flex-wrap gap-2 pt-1">
              {quick.map((q) => (
                <a
                  key={q.href}
                  href={q.href}
                  onClick={() => setOpen(false)}
                  {...("external" in q ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-10 items-center rounded-full border border-navy/25 px-4 text-sm font-medium text-navy hover:border-navy"
                >
                  {q.label}
                </a>
              ))}
            </div>
            <div ref={endRef} />
          </div>

          <form onSubmit={send} className="border-t border-line p-3">
            <p className="mb-2 text-xs leading-snug text-ink-soft">{labels.disclaimer}</p>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!enabled}
                maxLength={800}
                placeholder={labels.placeholder}
                aria-label={labels.placeholder}
                className="min-h-11 min-w-0 flex-1 rounded-md border border-navy/25 px-3 text-base disabled:bg-mist-100"
              />
              <button
                type="submit"
                disabled={!enabled || loading || !input.trim()}
                className="min-h-11 rounded-md bg-navy px-4 text-sm font-semibold text-white disabled:opacity-40"
              >
                {labels.send}
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
