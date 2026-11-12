import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Mientras el sitio no sea público (NEXT_PUBLIC_INDEXABLE != "true") se bloquea todo. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    ...(siteConfig.url ? { sitemap: `${siteConfig.url}/sitemap.xml` } : {}),
  };
}
