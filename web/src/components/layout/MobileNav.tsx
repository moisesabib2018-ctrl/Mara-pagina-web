"use client";

import { useEffect, useState } from "react";
import { Close, Menu } from "@/components/ui/Icons";

type Item = { href: string; label: string };

export function MobileNav({
  items,
  ctaHref,
  ctaLabel,
  openLabel,
  closeLabel,
}: {
  items: Item[];
  ctaHref: string;
  ctaLabel: string;
  openLabel: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? closeLabel : openLabel}
        className="flex size-11 items-center justify-center rounded-md border border-line text-navy"
      >
        {open ? <Close /> : <Menu />}
      </button>
      {open ? (
        <nav id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-white shadow-sm">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center border-b border-line/70 text-base font-medium text-navy"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center justify-center rounded-md bg-gold font-semibold text-navy"
              >
                {ctaLabel}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
