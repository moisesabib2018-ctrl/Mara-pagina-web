import { describe, expect, it } from "vitest";
import { getBookingTarget } from "./booking";

describe("getBookingTarget", () => {
  it("sin enlace no hay calendario", () => {
    expect(getBookingTarget(null).kind).toBe("none");
  });
  it("incrusta páginas de citas de Google y agrega gv=true", () => {
    const t = getBookingTarget("https://calendar.google.com/calendar/appointments/schedules/ABC");
    expect(t.kind).toBe("embed");
    if (t.kind === "embed") expect(t.src).toContain("gv=true");
  });
  it("enlaces cortos de Google solo como enlace", () => {
    expect(getBookingTarget("https://calendar.app.google/xyz").kind).toBe("link");
  });
  it("rechaza http y otros dominios", () => {
    expect(getBookingTarget("http://calendar.google.com/calendar/appointments/x").kind).toBe("none");
    expect(getBookingTarget("https://evil.example.com/calendar/appointments/x").kind).toBe("none");
    expect(getBookingTarget("no es una url").kind).toBe("none");
  });
});
