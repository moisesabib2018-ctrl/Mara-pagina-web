import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/layout/Logo";
import { NotFoundContent } from "@/components/layout/NotFoundContent";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: `404 | ${siteConfig.name}`,
  robots: { index: false, follow: false },
};

/**
 * 404 de toda URL inexistente (Next la devuelve con estado HTTP 404). Como la raíz de la web es `[locale]`, esta página
 * incluye su propio <html> y no usa el encabezado ni el pie del sitio.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="min-h-screen">
        <header className="border-b border-line bg-white py-4">
          <div className="mx-auto flex max-w-6xl items-center px-5 sm:px-8">
            <Logo size={56} priority />
            <span translate="no" className="ml-3 font-serif text-lg text-navy">
              {siteConfig.name}
            </span>
          </div>
        </header>
        <main className="min-h-[calc(100vh-5.5rem)] bg-ivory">
          <NotFoundContent />
        </main>
      </body>
    </html>
  );
}
