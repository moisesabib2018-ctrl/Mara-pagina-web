import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "outline-light";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-navy hover:bg-gold-light",
  outline: "border border-navy/30 text-navy hover:border-navy hover:bg-navy-50",
  "outline-light": "border border-white/40 text-white hover:border-white hover:bg-white/10",
};
const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClass({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors",
    variants[variant],
    sizes[size],
    className,
  );
}

type CommonProps = { variant?: Variant; size?: Size; className?: string; children: React.ReactNode };

/** Enlace interno (Next) o externo/ancla (a), con estilo de botón. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  external,
  children,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<React.ComponentProps<"a">, "href" | "className" | "children">) {
  const cls = buttonClass({ variant, size, className });
  if (external || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
