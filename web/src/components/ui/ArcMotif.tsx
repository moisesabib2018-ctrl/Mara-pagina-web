import { cn } from "@/lib/cn";

/** Motivo gráfico: arcos del aro del logo (azul y dorado). Decorativo, solo SVG. `light` para fondos oscuros. */
export function ArcMotif({ className, variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  const main = variant === "light" ? "#ffffff" : "#041b3c";
  return (
    <svg viewBox="0 0 800 800" fill="none" aria-hidden="true" focusable="false" className={cn("pointer-events-none", className)}>
      <g transform="rotate(-24 400 400)">
        <circle cx="400" cy="400" r="340" stroke={main} strokeOpacity={variant === "light" ? 0.5 : 0.9} strokeWidth="3" strokeDasharray="1180 956" strokeLinecap="round" />
        <circle cx="400" cy="400" r="340" stroke="#b78b40" strokeWidth="3" strokeDasharray="860 1276" strokeDashoffset="-1330" strokeLinecap="round" />
        <circle cx="400" cy="400" r="262" stroke="#b78b40" strokeOpacity="0.35" strokeWidth="1.5" />
        <circle cx="400" cy="400" r="184" stroke={main} strokeOpacity={variant === "light" ? 0.2 : 0.12} strokeWidth="1.5" />
      </g>
    </svg>
  );
}
