import { describe, expect, it } from "vitest";
import { nowInZone } from "./dates";
import { dayStartTimes, endTime, isValidEmail, isValidPhone, maxBookableDate, monthGrid, shiftMonth, slotsForDate, type Availability } from "./scheduler";

const a: Availability = { weekdays: [1, 2, 3, 4, 5], firstHour: 9, lastHour: 16, stepMinutes: 60, consultationMinutes: 45, minNoticeMinutes: 120, maxAdvanceMonths: 3 };
const NOW = "2026-11-12T10:00"; // jueves

describe("horarios", () => {
  it("inicia cada 60 min (45 de consulta + 15 de descanso oculto)", () => {
    expect(dayStartTimes(a)).toEqual(["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"]);
    expect(endTime("09:00", a)).toBe("09:45");
  });
  it("hoy solo ofrece horas con el aviso mínimo", () => {
    expect(slotsForDate("2026-11-12", NOW, a)).toEqual(["12:00", "13:00", "14:00", "15:00", "16:00"]);
    expect(slotsForDate("2026-11-12", "2026-11-12T17:30", a)).toEqual([]);
  });
  it("sin horarios en fines de semana ni en días pasados", () => {
    expect(slotsForDate("2026-11-14", NOW, a)).toEqual([]); // sábado
    expect(slotsForDate("2026-11-15", NOW, a)).toEqual([]); // domingo
    expect(slotsForDate("2026-11-11", NOW, a)).toEqual([]);
  });
  it("un día laborable futuro tiene el día completo", () => {
    expect(slotsForDate("2026-11-16", NOW, a)).toHaveLength(8);
  });
  it("respeta el máximo de meses adelante", () => {
    expect(maxBookableDate("2026-11-12", 3)).toBe("2027-02-12");
    expect(maxBookableDate("2026-11-30", 3)).toBe("2027-02-28");
    expect(slotsForDate("2027-02-12", NOW, a)).toHaveLength(8); // viernes, último día
    expect(slotsForDate("2027-02-15", NOW, a)).toEqual([]);
  });
});

describe("mes", () => {
  it("noviembre 2026 empieza en domingo (semana desde lunes: 6 huecos)", () => {
    const g = monthGrid(2026, 10, 1);
    expect(g[0].filter((d) => d === null)).toHaveLength(6);
    expect(g[0][6]).toBe("2026-11-01");
    expect(g.every((w) => w.length === 7)).toBe(true);
    expect(g.flat().filter(Boolean)).toHaveLength(30);
  });
  it("con semana desde domingo, noviembre 2026 empieza en la primera columna", () => {
    expect(monthGrid(2026, 10, 0)[0][0]).toBe("2026-11-01");
  });
  it("cambia de mes cruzando el año", () => {
    expect(shiftMonth("2026-12", 1)).toBe("2027-01");
    expect(shiftMonth("2027-01", -1)).toBe("2026-12");
  });
});

describe("zona horaria y datos", () => {
  it("'ahora' se calcula en Houston", () => {
    expect(nowInZone("America/Chicago", new Date("2026-11-13T03:05:00Z"))).toBe("2026-11-12T21:05");
    expect(nowInZone("America/Chicago", new Date("2026-07-01T05:00:00Z"))).toBe("2026-07-01T00:00");
  });
  it("valida teléfono y correo", () => {
    expect(isValidPhone("(713) 555-0123")).toBe(true);
    expect(isValidPhone("+52 55 1234 5678")).toBe(true);
    expect(isValidPhone("12345")).toBe(false);
    expect(isValidPhone("abc7135550123")).toBe(false);
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("a@b")).toBe(false);
  });
});
