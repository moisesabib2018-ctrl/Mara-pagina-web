import { z } from "zod";
import { siteConfig } from "@/config/site";
import { serviceIds, type ServiceId } from "@/config/service-slugs";
import { services } from "@/content/services";
import { isValidPhone } from "./scheduler";

export const OTHER = "otro" as const;

/** Datos del formulario de contacto (los valida el servidor; el navegador repite las mismas reglas). */
export const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(60),
  lastName: z.string().trim().min(2).max(60),
  email: z.string().trim().max(150).pipe(z.email()),
  phone: z
    .string()
    .trim()
    .max(25)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => v === undefined || isValidPhone(v)),
  service: z.enum([...serviceIds, OTHER]),
  message: z.string().trim().min(10).max(1500),
  locale: z.enum(siteConfig.locales),
  website: z.string().max(200).optional(), // honeypot: las personas no lo ven ni lo llenan
});
export type ContactInput = z.infer<typeof contactSchema>;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const serviceName = (id: ServiceId | typeof OTHER) => (id === OTHER ? "Otra consulta" : (services.find((s) => s.id === id)?.name.es ?? id));

/** Arma el correo para la asesora (en español). `reply_to` = la persona: basta con pulsar «Responder». */
export function buildContactEmail(data: ContactInput, from: string, to: string) {
  const fullName = `${data.firstName} ${data.lastName}`;
  const service = serviceName(data.service);
  const lang = data.locale === "es" ? "Español" : "Inglés";
  const rows: [string, string][] = [
    ["Nombre", fullName],
    ["Correo", data.email],
    ["Teléfono", data.phone ?? "—"],
    ["Servicio", service],
    ["Idioma del sitio", lang],
  ];
  const text = [`Nueva consulta desde la página web de ${siteConfig.name}`, "", ...rows.map(([k, v]) => `${k}: ${v}`), "", "Mensaje:", data.message].join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#041b3c;max-width:560px">
<h2 style="margin:0 0 12px">Nueva consulta desde la página web</h2>
<table style="border-collapse:collapse;width:100%">${rows.map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#465671;vertical-align:top">${esc(k)}</td><td style="padding:6px 0"><strong>${esc(v)}</strong></td></tr>`).join("")}</table>
<p style="margin:16px 0 4px;color:#465671">Mensaje</p>
<div style="white-space:pre-wrap;border-left:3px solid #b78b40;padding:8px 12px;background:#fbf8f2">${esc(data.message)}</div>
<p style="margin-top:16px;font-size:12px;color:#465671">Para responder, pulsa «Responder»: el mensaje irá directo a ${esc(data.email)}.</p></div>`;
  return { from, to: [to], reply_to: data.email, subject: `Nueva consulta web: ${service} — ${fullName}`, text, html };
}
