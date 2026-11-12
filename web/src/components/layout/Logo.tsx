import Image from "next/image";
import { siteConfig } from "@/config/site";

/** Logo original sin deformar: el alto se calcula con la proporción real del archivo. */
export function Logo({ size = 56, className, priority, alt }: { size?: number; className?: string; priority?: boolean; alt?: string }) {
  const { logo, name } = siteConfig;
  const height = Math.round((size * logo.height) / logo.width);
  return (
    <Image
      src={logo.src}
      width={size}
      height={height}
      sizes={`${size}px`}
      alt={alt ?? name}
      className={className}
      style={{ width: size, height: "auto", objectFit: "contain" }}
      priority={priority}
    />
  );
}
