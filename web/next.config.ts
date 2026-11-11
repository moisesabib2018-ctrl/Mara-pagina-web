import type { NextConfig } from "next";
import { serviceIds, serviceSlugs } from "./src/config/service-slugs";

const nextConfig: NextConfig = {
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
    return serviceIds.map((id) => ({
      source: `/en/services/${serviceSlugs[id].en}`,
      destination: `/en/servicios/${id}`,
    }));
  },
};

export default nextConfig;
