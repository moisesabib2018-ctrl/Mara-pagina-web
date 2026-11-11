import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm sm:px-6">
        © {siteConfig.name}
      </div>
    </footer>
  );
}
