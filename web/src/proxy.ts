import { NextResponse, type NextRequest } from "next/server";

const locales = ["es", "en"];

function preferredLocale(request: NextRequest): "es" | "en" {
  const first = request.headers.get("accept-language")?.split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("en") ? "en" : "es";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Excluye API, internos de Next y archivos con extensión (logo, imágenes, etc.)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
