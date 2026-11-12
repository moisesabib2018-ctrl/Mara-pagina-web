"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/config/site";
import { switchLocalePath } from "@/lib/routes";
import { cn } from "@/lib/cn";

const options: { locale: Locale; label: string; name: string }[] = [
  { locale: "es", label: "ES", name: "Español" },
  { locale: "en", label: "EN", name: "English" },
];

export function LanguageSwitch({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname();
  return (
    <div role="group" aria-label={label} className={cn("flex items-center rounded-md border border-line text-xs font-semibold", className)}>
      {options.map((o) => {
        const active = o.locale === locale;
        return (
          <Link
            key={o.locale}
            href={switchLocalePath(pathname, o.locale)}
            hrefLang={o.locale}
            lang={o.locale}
            aria-label={`${o.label} – ${o.name}`}
            aria-current={active ? "true" : undefined}
            className={cn(
              "flex min-h-9 min-w-10 items-center justify-center px-2.5 transition-colors first:rounded-l-[5px] last:rounded-r-[5px]",
              active ? "bg-navy text-white" : "text-navy hover:bg-mist-100",
            )}
          >
            {o.label}
          </Link>
        );
      })}
    </div>
  );
}
