import { describe, expect, it } from "vitest";
import { buildContactEmail, contactSchema } from "./contact-mail";
import { formatPhoneDisplay } from "./contact";

const valid = { firstName: "Ana", lastName: "Pérez", email: "ana@ejemplo.com", phone: "(713) 555-0123", service: "itin", message: "Quisiera saber qué necesito para el ITIN.", locale: "es" };

describe("contactSchema", () => {
  it("acepta datos válidos y el servicio 'otro'", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, service: "otro" }).success).toBe(true);
  });
  it("el teléfono es opcional pero, si se escribe, debe ser válido", () => {
    expect(contactSchema.safeParse({ ...valid, phone: "" }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, phone: undefined }).success).toBe(true);
    expect(contactSchema.safeParse({ ...valid, phone: "123" }).success).toBe(false);
  });
  it("rechaza nombre corto, correo inválido, servicio inexistente y mensaje muy corto", () => {
    expect(contactSchema.safeParse({ ...valid, firstName: "A" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, email: "ana@x" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, service: "hackeo" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "hola" }).success).toBe(false);
  });
});

describe("buildContactEmail", () => {
  const data = contactSchema.parse(valid);
  const mail = buildContactEmail(data, "Web <web@ejemplo.com>", "mara@ejemplo.com");
  it("va a la asesora y responde directo a la persona", () => {
    expect(mail.to).toEqual(["mara@ejemplo.com"]);
    expect(mail.reply_to).toBe("ana@ejemplo.com");
    expect(mail.subject).toBe("Nueva consulta web: ITIN — Ana Pérez");
    expect(mail.text).toContain("Teléfono: (713) 555-0123");
    expect(mail.text).toContain("Quisiera saber qué necesito para el ITIN.");
  });
  it("escapa el HTML del mensaje (sin inyección)", () => {
    const evil = buildContactEmail(contactSchema.parse({ ...valid, message: "<script>alert(1)</script> hola mundo" }), "a@b.co", "c@d.co");
    expect(evil.html).not.toContain("<script>");
    expect(evil.html).toContain("&lt;script&gt;");
  });
});

describe("formatPhoneDisplay", () => {
  it("formatea números de EE. UU.", () => {
    expect(formatPhoneDisplay("17135550123")).toBe("+1 (713) 555-0123");
    expect(formatPhoneDisplay("7135550123")).toBe("(713) 555-0123");
    expect(formatPhoneDisplay("5215512345678")).toBe("+5215512345678");
  });
});
