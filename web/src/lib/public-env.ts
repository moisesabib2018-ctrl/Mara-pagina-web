/**
 * Lectura y limpieza de los valores públicos configurables por variables de entorno
 * (NEXT_PUBLIC_*). Un valor vacío o inválido se trata como "pendiente" (null): nunca se muestra.
 * Cada variable se lee con su nombre literal para que Next la incruste en el cliente.
 */
const blank = (v: string | undefined) => (v && v.trim() !== "" ? v.trim() : null);

/**
 * WhatsApp: solo dígitos con código de país (8 a 15). Acepta "+1 (555) 123-4567".
 * Un número de exactamente 10 dígitos se toma como de EE. UU. y se le antepone el 1 (wa.me exige el código de país).
 */
export function cleanWhatsapp(raw: string | undefined): string | null {
  const v = blank(raw);
  if (!v) return null;
  const digits = v.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits.length >= 8 && digits.length <= 15 ? digits : null;
}

/** Solo enlaces https. */
export function cleanHttpsUrl(raw: string | undefined): string | null {
  const v = blank(raw);
  if (!v) return null;
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.toString().replace(/\/$/, "") : null;
  } catch {
    return null;
  }
}

export function cleanEmail(raw: string | undefined): string | null {
  const v = blank(raw);
  return v && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : null;
}

export function cleanPhone(raw: string | undefined): string | null {
  const v = blank(raw);
  return v && v.replace(/\D/g, "").length >= 7 ? v : null;
}

export const publicEnv = {
  siteUrl: cleanHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL),
  whatsapp: cleanWhatsapp(process.env.NEXT_PUBLIC_WHATSAPP),
  instagram: cleanHttpsUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  email: cleanEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: cleanPhone(process.env.NEXT_PUBLIC_PHONE),
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
};
