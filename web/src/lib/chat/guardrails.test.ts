import { describe, expect, it } from "vitest";
import { containsSensitiveData } from "./guardrails";

describe("containsSensitiveData", () => {
  it.each(["123-45-6789", "mi ssn es 123456789", "4111 1111 1111 1111", "EIN 12-3456789"])("bloquea %s", (t) => {
    expect(containsSensitiveData(t)).toBe(true);
  });
  it.each(["¿Cuánto dura la consulta de 45 minutos?", "Quiero agendar el 12 de marzo", "I need an ITIN"])("permite %s", (t) => {
    expect(containsSensitiveData(t)).toBe(false);
  });
});
