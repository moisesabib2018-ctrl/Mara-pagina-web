import type { Testimonial } from "@/content/testimonials";

/**
 * Decide qué comentarios mostrar. Los reales siempre ganan; los de ejemplo solo salen con la vista previa activa
 * y se marcan como `sample` para que la tarjeta lo diga. Sin ninguno, devuelve `items: []` (la sección no se muestra).
 */
export function resolveTestimonials(
  real: Testimonial[],
  samples: Testimonial[],
  preview: boolean,
): { items: Testimonial[]; sample: boolean } {
  if (real.length > 0) return { items: real, sample: false };
  if (preview) return { items: samples, sample: true };
  return { items: [], sample: false };
}
