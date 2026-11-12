import { type Locale } from "@/config/site";
import { services } from "@/content/services";
import { getDictionary } from "@/content/ui";
import { getChannels } from "@/lib/contact";
import { ContactForm } from "@/components/forms/ContactForm";
import { Container } from "@/components/ui/Container";
import { channelIcon } from "@/components/ui/channel-icons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const channels = getChannels(locale);
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="view bg-ivory py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionHeading id="contacto-title" eyebrow={dict.contact.eyebrow} title={dict.contact.title} text={dict.contact.text} />
          {channels.length > 0 ? (
            <div className="mt-8">
              <p className="text-sm font-semibold text-navy">{dict.contact.channels}</p>
              <ul className="mt-3 space-y-1">
                {channels.map((c) => {
                  const Icon = channelIcon[c.key];
                  return (
                    <li key={c.key}>
                      <a
                        href={c.href}
                        {...(c.href.startsWith("https://") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="inline-flex min-h-11 items-center gap-3 text-ink-soft transition-colors hover:text-navy"
                      >
                        <Icon className="text-gold-dark" />
                        {c.value}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_22px_44px_-30px_rgba(4,27,60,0.35)] sm:p-8">
          <ContactForm locale={locale} labels={dict.contact} services={services.map((s) => ({ id: s.id, name: s.name[locale] }))} />
        </div>
      </Container>
    </section>
  );
}
