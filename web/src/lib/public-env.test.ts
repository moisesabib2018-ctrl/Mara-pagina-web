import { describe, expect, it } from "vitest";
import { cleanEmail, cleanHttpsUrl, cleanPhone, cleanWhatsapp } from "./public-env";
import { buildWhatsappHref } from "./contact";

describe("limpieza de datos públicos", () => {
  it("WhatsApp: normaliza a dígitos y rechaza valores inválidos", () => {
    expect(cleanWhatsapp("+1 (555) 123-4567")).toBe("15551234567");
    expect(cleanWhatsapp("3462822240")).toBe("13462822240"); // 10 dígitos de EE. UU.: se agrega el código de país
    expect(cleanWhatsapp("(346) 282-2240")).toBe("13462822240");
    expect(cleanWhatsapp("123")).toBeNull();
    expect(cleanWhatsapp("")).toBeNull();
    expect(cleanWhatsapp(undefined)).toBeNull();
  });
  it("URLs: solo https", () => {
    expect(cleanHttpsUrl("https://instagram.com/x/")).toBe("https://instagram.com/x");
    expect(cleanHttpsUrl("http://instagram.com/x")).toBeNull();
    expect(cleanHttpsUrl("javascript:alert(1)")).toBeNull();
    expect(cleanHttpsUrl("no es url")).toBeNull();
  });
  it("correo y teléfono", () => {
    expect(cleanEmail("a@b.co")).toBe("a@b.co");
    expect(cleanEmail("a@b")).toBeNull();
    expect(cleanPhone("(555) 123-4567")).toBe("(555) 123-4567");
    expect(cleanPhone("12")).toBeNull();
  });
  it("enlace de WhatsApp con mensaje codificado", () => {
    expect(buildWhatsappHref("15551234567", "Hola, ¿qué tal?")).toBe("https://wa.me/15551234567?text=Hola%2C%20%C2%BFqu%C3%A9%20tal%3F");
  });
});
