export type BookingTarget =
  | { kind: "embed"; src: string; href: string }
  | { kind: "link"; href: string }
  | { kind: "none" };

/**
 * Valida el enlace de Google Calendar Appointment Schedules.
 * Solo se incrusta contenido de calendar.google.com (https). Los enlaces cortos
 * calendar.app.google no se pueden incrustar: se ofrecen como enlace.
 */
export function getBookingTarget(raw: string | null): BookingTarget {
  if (!raw) return { kind: "none" };
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return { kind: "none" };
  }
  if (url.protocol !== "https:") return { kind: "none" };

  if (url.hostname === "calendar.google.com" && url.pathname.startsWith("/calendar/appointments/")) {
    const embed = new URL(url);
    if (!embed.searchParams.has("gv")) embed.searchParams.set("gv", "true");
    return { kind: "embed", src: embed.toString(), href: url.toString() };
  }
  if (url.hostname === "calendar.app.google") return { kind: "link", href: url.toString() };
  return { kind: "none" };
}
