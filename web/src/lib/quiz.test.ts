import { describe, expect, it } from "vitest";
import { serviceIds } from "@/config/service-slugs";
import { NONE, emptyQuiz, firstOptions, getResult, isComplete, reconcile, secondOptions, type Who } from "./quiz";

const whos: Who[] = ["personal", "business", "both"];

describe("cuestionario", () => {
  it("solo ofrece los seis servicios existentes", () => {
    for (const who of whos) for (const id of firstOptions(who)) expect(serviceIds).toContain(id);
    expect(firstOptions("both")).toHaveLength(6);
  });
  it("personal y negocio ofrecen servicios distintos", () => {
    expect(firstOptions("personal")).toContain("taxes-individuales");
    expect(firstOptions("personal")).not.toContain("taxes-corporativos");
    expect(firstOptions("business")).toContain("creacion-de-empresas");
    expect(firstOptions("business")).not.toContain("itin");
  });
  it("la pregunta 3 no repite la 2", () => {
    for (const who of whos) for (const first of firstOptions(who)) expect(secondOptions(who, first)).not.toContain(first);
  });
  it("cambiar una respuesta descarta las siguientes que ya no aplican", () => {
    const s = reconcile({ who: "business", first: "itin", second: "seguros-de-vida" });
    expect(s).toEqual({ who: "business", first: null, second: null });
    const t = reconcile({ who: "both", first: "itin", second: "itin" });
    expect(t.second).toBeNull();
    expect(reconcile({ who: "both", first: "itin", second: NONE }).second).toBe(NONE);
    expect(reconcile({ who: null, first: "itin", second: NONE })).toEqual(emptyQuiz);
  });
  it("el resultado pone primero el servicio principal", () => {
    expect(getResult({ who: "personal", first: "itin", second: "seguros-de-salud" })).toEqual(["itin", "seguros-de-salud"]);
    expect(getResult({ who: "personal", first: "itin", second: NONE })).toEqual(["itin"]);
    expect(getResult(emptyQuiz)).toEqual([]);
  });
  it("solo está completo con las tres respuestas", () => {
    expect(isComplete({ who: "both", first: "itin", second: NONE })).toBe(true);
    expect(isComplete({ who: "both", first: "itin", second: null })).toBe(false);
  });
});
