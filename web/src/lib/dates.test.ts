import { describe, expect, it } from "vitest";
import { keyDates, type KeyDate } from "@/content/key-dates";
import { daysBetween, formatKeyDate, getDateStatus, todayInZone } from "./dates";

const medicare = keyDates.find((k) => k.id === "medicare-aep") as KeyDate;
const aca = keyDates.find((k) => k.id === "aca-open-enrollment") as KeyDate;
const tax = keyDates.find((k) => k.id === "tax-deadline") as KeyDate;

describe("getDateStatus", () => {
  it("ventana abierta con cuenta regresiva", () => {
    expect(getDateStatus(medicare, "2026-11-12")).toEqual({ state: "open", days: 25 });
    expect(getDateStatus(medicare, "2026-12-07")).toEqual({ state: "open", days: 0 });
  });
  it("antes de abrir y después de cerrar", () => {
    expect(getDateStatus(medicare, "2026-10-01")).toEqual({ state: "upcoming", days: 14 });
    expect(getDateStatus(medicare, "2026-12-08")).toEqual({ state: "closed" });
  });
  it("sin fecha de cierre no inventa una cuenta regresiva", () => {
    expect(getDateStatus(aca, "2026-11-12")).toEqual({ state: "open", days: null });
    expect(getDateStatus(aca, "2026-10-31")).toEqual({ state: "upcoming", days: 1 });
  });
  it("fecha límite", () => {
    expect(getDateStatus(tax, "2027-04-14")).toEqual({ state: "deadline", days: 1 });
    expect(getDateStatus(tax, "2027-04-15")).toEqual({ state: "deadline", days: 0 });
    expect(getDateStatus(tax, "2027-04-16")).toEqual({ state: "closed" });
  });
});

describe("fechas", () => {
  it("daysBetween cruza meses y años", () => {
    expect(daysBetween("2026-12-31", "2027-01-01")).toBe(1);
  });
  it("usa la zona horaria de Houston para 'hoy'", () => {
    // 03:00 UTC del 13 nov = 21:00 del 12 nov en Houston
    expect(todayInZone("America/Chicago", new Date("2026-11-13T03:00:00Z"))).toBe("2026-11-12");
  });
  it("formatea en español e inglés", () => {
    expect(formatKeyDate(medicare, "es")).toMatch(/^15 oct\.? – 7 dic\.? 2026$/);
    expect(formatKeyDate(medicare, "en")).toBe("Oct 15 – Dec 7, 2026");
    expect(formatKeyDate(aca, "es")).toMatch(/^Desde el 1 nov\.? 2026$/);
    expect(formatKeyDate(tax, "es")).toBe("15 de abril de 2027");
    expect(formatKeyDate(tax, "en")).toBe("April 15, 2027");
  });
});
