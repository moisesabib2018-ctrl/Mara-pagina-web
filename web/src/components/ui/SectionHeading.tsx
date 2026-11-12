import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark before:h-px before:w-8 before:bg-current before:opacity-70 before:content-['']",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  light,
  className,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow className={light ? "text-gold-light" : undefined}>{eyebrow}</Eyebrow>
      <h2 id={id} className={cn("mt-4 text-balance font-serif text-[2rem] leading-[1.1] tracking-tight sm:text-5xl", light ? "text-white" : "text-navy")}>
        {title}
      </h2>
      {text ? <p className={cn("mt-4 text-base leading-relaxed sm:text-lg", light ? "text-white/75" : "text-ink-soft")}>{text}</p> : null}
    </div>
  );
}
