import { describe, expect, it } from "vitest";
import { resolveTestimonials } from "./testimonials";
import type { Testimonial } from "@/content/testimonials";

const t = (id: string): Testimonial => ({ id, quote: { es: "a", en: "a" }, name: { es: "n", en: "n" } });

describe("resolveTestimonials", () => {
  it("usa los reales y nunca los de ejemplo si existen", () => {
    expect(resolveTestimonials([t("r")], [t("s")], true)).toEqual({ items: [t("r")], sample: false });
  });
  it("muestra los de ejemplo, marcados, solo con la vista previa activa", () => {
    expect(resolveTestimonials([], [t("s")], true)).toEqual({ items: [t("s")], sample: true });
  });
  it("sin reales y sin vista previa no muestra nada", () => {
    expect(resolveTestimonials([], [t("s")], false)).toEqual({ items: [], sample: false });
  });
});
