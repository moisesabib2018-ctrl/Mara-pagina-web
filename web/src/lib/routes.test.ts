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

import { isInvalidPublicPath } from "@/config/service-slugs";
import { legalPath } from "./routes";

describe("páginas legales y URLs inválidas", () => {
  it("rutas públicas por idioma", () => {
    expect(legalPath("es", "privacy")).toBe("/es/privacidad");
    expect(legalPath("en", "privacy")).toBe("/en/privacy");
    expect(legalPath("en", "terms")).toBe("/en/terms");
  });
  it("cambiar de idioma conserva la página legal", () => {
    expect(switchLocalePath("/es/privacidad", "en")).toBe("/en/privacy");
    expect(switchLocalePath("/en/terms", "es")).toBe("/es/terminos");
  });
  it("detecta URLs inválidas que darían 200", () => {
    expect(isInvalidPublicPath("/es/servicios/no-existe")).toBe(true);
    expect(isInvalidPublicPath("/en/servicios/itin")).toBe(true);
    expect(isInvalidPublicPath("/en/privacidad")).toBe(true);
  });
  it("no bloquea las URLs válidas", () => {
    expect(isInvalidPublicPath("/es/servicios/itin")).toBe(false);
    expect(isInvalidPublicPath("/en/services/itin")).toBe(false);
    expect(isInvalidPublicPath("/es/privacidad")).toBe(false);
    expect(isInvalidPublicPath("/en/privacy")).toBe(false);
    expect(isInvalidPublicPath("/es")).toBe(false);
  });
});
