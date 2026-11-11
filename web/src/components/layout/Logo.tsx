import Image from "next/image";
import { siteConfig } from "@/config/site";

/** Usa el logo original sin alterar proporciones; texto solo mientras falte el archivo. */
export function Logo({ className }: { className?: string }) {
  const { logo, name } = siteConfig;
  if (!logo) {
    return <span className={className}>{name}</span>;
  }
  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt={name}
      className={className}
      style={{ height: "auto", width: "auto", objectFit: "contain" }}
      priority
    />
  );
}
