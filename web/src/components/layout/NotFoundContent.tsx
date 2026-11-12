import Link from "next/link";
import { dictionaries } from "@/content/ui";
import { buttonClass } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Pantalla 404 en ambos idiomas (no se conoce el idioma de una URL inexistente). */
export function NotFoundContent() {
  return (
    <Container className="py-24 text-center">
      {(["es", "en"] as const).map((l) => (
        <div key={l} lang={l} className="mb-10">
          <h1 className="font-serif text-3xl text-navy">{dictionaries[l].notFound.title}</h1>
          <p className="mt-3 text-ink-soft">{dictionaries[l].notFound.text}</p>
          <Link href={`/${l}`} className={buttonClass({ className: "mt-5" })}>
            {dictionaries[l].notFound.home}
          </Link>
        </div>
      ))}
    </Container>
  );
}
