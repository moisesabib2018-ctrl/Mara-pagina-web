import type { NextConfig } from "next";
import { legalIds, legalSlugs, serviceIds, serviceSlugs } from "./src/config/service-slugs";

const nextConfig: NextConfig = {
  // 75 = por defecto; 90 = retrato de la asesora (evita compresión excesiva de una foto ya comprimida).
  images: { qualities: [75, 90] },
  // Pantalla 404 con la marca para TODA URL inexistente (la raíz es [locale]). Función experimental documentada para este caso.
  experimental: { globalNotFound: true },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // URLs en inglés (/en/services/individual-taxes) sirven la ruta canónica (/en/servicios/taxes-individuales).
  async rewrites() {
    return [
      ...serviceIds.map((id) => ({
        source: `/en/services/${serviceSlugs[id].en}`,
        destination: `/en/servicios/${id}`,
      })),
      ...legalIds.map((id) => ({ source: `/en/${legalSlugs[id].en}`, destination: `/en/${legalSlugs[id].es}` })),
    ];
  },
};

export default nextConfig;
