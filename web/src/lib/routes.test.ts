import { describe, expect, it } from "vitest";
import { servicePath, switchLocalePath } from "./routes";

describe("routes", () => {
  it("construye rutas de servicio por idioma", () => {
    expect(servicePath("es", "taxes-individuales")).toBe("/es/servicios/taxes-individuales");
    expect(servicePath("en", "taxes-individuales")).toBe("/en/services/individual-taxes");
  });
  it("traduce la ruta actual al cambiar de idioma", () => {
    expect(switchLocalePath("/es/servicios/seguros-de-vida", "en")).toBe("/en/services/life-insurance");
    expect(switchLocalePath("/en/services/business-formation", "es")).toBe("/es/servicios/creacion-de-empresas");
    expect(switchLocalePath("/es", "en")).toBe("/en");
  });
});
