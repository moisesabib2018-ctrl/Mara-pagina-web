import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { ServiceGrid } from "@/components/sections/ServiceGrid";

export default function Home() {
  return (
    <>
      <section className="bg-deep py-16 text-white">
        <Container>
          <h1 className="text-3xl font-semibold sm:text-4xl">{siteConfig.name}</h1>
          <p className="mt-3 text-gold">Sitio en construcción · Site under construction</p>
        </Container>
      </section>
      <ServiceGrid locale={siteConfig.defaultLocale} />
    </>
  );
}
