import { describe, expect, it } from "vitest";
import { buildRequestMessage, whatsappLink } from "./request";

describe("solicitud", () => {
  const s = { intro: "Hola, quisiera una consulta.", serviceLine: "Servicio", whenLine: "Me viene bien" };
  it("arma el mensaje en tres líneas", () => {
    expect(buildRequestMessage(s, "Seguros de vida", "lo antes posible")).toBe(
      "Hola, quisiera una consulta.\nServicio: Seguros de vida\nMe viene bien: lo antes posible",
    );
  });
  it("codifica el enlace de WhatsApp", () => {
    expect(whatsappLink("15551234567", "a b\nc")).toBe("https://wa.me/15551234567?text=a%20b%0Ac");
  });
});
