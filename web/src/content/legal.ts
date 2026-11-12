import type { LegalId } from "@/config/service-slugs";
import type { Localized } from "@/types/service";

/*
 * BORRADORES de textos legales, redactados en términos generales según lo que el sitio hace HOY.
 * No sustituyen asesoría legal: un abogado debe revisarlos antes del lanzamiento (ver aviso en pantalla).
 * No incluyen jurisdicción, licencias ni plazos de conservación concretos: esos datos están pendientes.
 */
export type LegalSection = { title: Localized; paragraphs: Localized<string[]>; bullets?: Localized<string[]> };
export type LegalDoc = { title: Localized; intro: Localized; sections: LegalSection[] };

export const legalDocs: Record<LegalId, LegalDoc> = {
  privacy: {
    title: { es: "Aviso de privacidad", en: "Privacy notice" },
    intro: {
      es: "Explicamos qué información recibimos cuando usas este sitio, para qué la usamos y con quién la compartimos.",
      en: "We explain what information we receive when you use this website, what we use it for, and who we share it with.",
    },
    sections: [
      {
        title: { es: "Quiénes somos", en: "Who we are" },
        paragraphs: {
          es: ["Este sitio pertenece a Blanchard Group LLC, que atiende en Houston, Texas, en español e inglés."],
          en: ["This website belongs to Blanchard Group LLC, which serves clients in Houston, Texas, in English and Spanish."],
        },
      },
      {
        title: { es: "Qué información recibimos", en: "What information we receive" },
        paragraphs: { es: ["Solo recibimos lo que tú escribes en el sitio:"], en: ["We only receive what you type into the website:"] },
        bullets: {
          es: [
            "Formulario de contacto: nombre, apellido, correo electrónico, teléfono (opcional), servicio de interés y tu mensaje.",
            "Solicitud de cita: día y hora elegidos, modalidad (llamada o videollamada), nombre, teléfono y, si eliges videollamada, correo electrónico.",
            "Asistente virtual: los mensajes que escribes en el chat.",
            "Datos técnicos básicos que registra el servidor (por ejemplo, dirección IP y tipo de navegador) para que el sitio funcione y para prevenir abusos.",
          ],
          en: [
            "Contact form: first name, last name, email, phone (optional), service of interest, and your message.",
            "Appointment request: chosen day and time, format (phone call or video call), name, phone and, if you choose a video call, email.",
            "Virtual assistant: the messages you type in the chat.",
            "Basic technical data the server records (for example, IP address and browser type) so the site works and to prevent abuse.",
          ],
        },
      },
      {
        title: { es: "Información que no debes enviar", en: "Information you should not send" },
        paragraphs: {
          es: ["Por tu seguridad, no escribas números de seguro social, ITIN, datos médicos, cuentas bancarias ni tarjetas en el formulario, el chat ni la solicitud de cita. Si hacen falta, te indicaremos cómo entregarlos por un medio seguro."],
          en: ["For your safety, do not enter Social Security numbers, ITINs, medical details, bank accounts, or cards in the form, the chat, or the appointment request. If they are needed, we will tell you how to provide them through a secure channel."],
        },
      },
      {
        title: { es: "Para qué la usamos", en: "What we use it for" },
        paragraphs: { es: ["Usamos tu información para:"], en: ["We use your information to:"] },
        bullets: {
          es: ["responder tus preguntas y dudas;", "coordinar tu cita y comunicarnos contigo en la modalidad que elegiste;", "mantener la seguridad del sitio y prevenir mensajes automáticos o abusivos."],
          en: ["answer your questions and concerns;", "arrange your appointment and contact you in the format you chose;", "keep the website secure and prevent automated or abusive messages."],
        },
      },
      {
        title: { es: "Con quién la compartimos", en: "Who we share it with" },
        paragraphs: {
          es: [
            "No vendemos tu información. La compartimos únicamente con los proveedores que hacen funcionar el sitio, solo para ese fin: el servicio de alojamiento, el servicio de correo electrónico que entrega tu mensaje a la asesora y, cuando estén activos, Google (calendario y Google Meet) y el proveedor de inteligencia artificial del asistente virtual.",
          ],
          en: [
            "We do not sell your information. We share it only with the providers that make the website work, and only for that purpose: the hosting service, the email service that delivers your message to the advisor and, when active, Google (calendar and Google Meet) and the artificial intelligence provider behind the virtual assistant.",
          ],
        },
      },
      {
        title: { es: "Cookies y analítica", en: "Cookies and analytics" },
        paragraphs: {
          es: ["En este momento el sitio no usa cookies de publicidad ni herramientas de analítica. Si esto cambia, lo actualizaremos en este aviso."],
          en: ["At this time the website does not use advertising cookies or analytics tools. If this changes, we will update this notice."],
        },
      },
      {
        title: { es: "Cuánto tiempo la conservamos", en: "How long we keep it" },
        paragraphs: {
          es: ["Conservamos tu información solo el tiempo necesario para atender tu consulta y cumplir las obligaciones que correspondan."],
          en: ["We keep your information only as long as needed to handle your inquiry and meet any applicable obligations."],
        },
      },
      {
        title: { es: "Tus derechos y cómo contactarnos", en: "Your rights and how to contact us" },
        paragraphs: {
          es: ["Puedes pedirnos que te mostremos, corrijamos o eliminemos la información que nos enviaste. Escríbenos por el formulario de contacto de este sitio."],
          en: ["You can ask us to show, correct, or delete the information you sent us. Write to us through the contact form on this website."],
        },
      },
      {
        title: { es: "Menores de edad", en: "Minors" },
        paragraphs: {
          es: ["Este sitio no está dirigido a menores de 18 años."],
          en: ["This website is not directed to people under 18."],
        },
      },
      {
        title: { es: "Cambios a este aviso", en: "Changes to this notice" },
        paragraphs: {
          es: ["Podemos actualizar este aviso. La versión vigente es la publicada en esta página."],
          en: ["We may update this notice. The current version is the one published on this page."],
        },
      },
    ],
  },
  terms: {
    title: { es: "Términos de uso", en: "Terms of use" },
    intro: {
      es: "Al usar este sitio aceptas estas condiciones generales.",
      en: "By using this website you accept these general conditions.",
    },
    sections: [
      {
        title: { es: "Información general", en: "General information" },
        paragraphs: {
          es: ["El contenido de este sitio es de carácter general y no constituye asesoría legal, fiscal, financiera ni de seguros personalizada. Navegar por el sitio, usar el chat o enviar un formulario no crea por sí solo una relación profesional."],
          en: ["The content of this website is general in nature and is not personalized legal, tax, financial, or insurance advice. Browsing the site, using the chat, or submitting a form does not by itself create a professional relationship."],
        },
      },
      {
        title: { es: "Servicios y resultados", en: "Services and results" },
        paragraphs: {
          es: ["Las descripciones de los servicios son orientativas. Los requisitos, plazos y resultados dependen de cada caso y de terceros (por ejemplo, el IRS, las aseguradoras y las autoridades estatales). No garantizamos resultados."],
          en: ["Service descriptions are for guidance. Requirements, timelines, and outcomes depend on each case and on third parties (for example, the IRS, insurers, and state authorities). We do not guarantee results."],
        },
      },
      {
        title: { es: "Citas y comunicaciones", en: "Appointments and communications" },
        paragraphs: {
          es: ["Los horarios mostrados están sujetos a confirmación. Las consultas pueden realizarse por llamada telefónica o videollamada, según lo que elijas. No envíes datos sensibles por el sitio."],
          en: ["The times shown are subject to confirmation. Consultations may be held by phone call or video call, as you choose. Do not send sensitive data through the website."],
        },
      },
      {
        title: { es: "Asistente virtual", en: "Virtual assistant" },
        paragraphs: {
          es: ["El asistente virtual ofrece orientación general automatizada. Puede cometer errores y no sustituye a la asesora. Para tu caso particular, agenda una consulta."],
          en: ["The virtual assistant offers general automated guidance. It can make mistakes and does not replace the advisor. For your particular case, book a consultation."],
        },
      },
      {
        title: { es: "Uso adecuado del sitio", en: "Proper use of the website" },
        paragraphs: {
          es: ["No uses el sitio para fines ilegales ni intentes interferir con su funcionamiento, enviar mensajes automáticos o hacerte pasar por otra persona."],
          en: ["Do not use the website for unlawful purposes or try to interfere with its operation, send automated messages, or impersonate someone else."],
        },
      },
      {
        title: { es: "Propiedad intelectual", en: "Intellectual property" },
        paragraphs: {
          es: ["El nombre, el logotipo y los textos del sitio pertenecen a Blanchard Group LLC. Las fotografías de terceros se acreditan donde aparecen."],
          en: ["The name, logo, and texts of this website belong to Blanchard Group LLC. Third-party photographs are credited where they appear."],
        },
      },
      {
        title: { es: "Enlaces y servicios de terceros", en: "Third-party links and services" },
        paragraphs: {
          es: ["El sitio puede enlazar o apoyarse en servicios de terceros (por ejemplo, WhatsApp, Instagram o Google). Su uso se rige por sus propios términos."],
          en: ["The website may link to or rely on third-party services (for example, WhatsApp, Instagram, or Google). Their use is governed by their own terms."],
        },
      },
      {
        title: { es: "Limitación de responsabilidad", en: "Limitation of liability" },
        paragraphs: {
          es: ["En la medida permitida por la ley, Blanchard Group LLC no será responsable por decisiones tomadas únicamente con base en la información general de este sitio."],
          en: ["To the extent permitted by law, Blanchard Group LLC will not be liable for decisions made solely on the basis of the general information on this website."],
        },
      },
      {
        title: { es: "Cambios y contacto", en: "Changes and contact" },
        paragraphs: {
          es: ["Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Para cualquier duda, escríbenos por el formulario de contacto."],
          en: ["We may update these terms; the current version is the one published on this page. For any questions, write to us through the contact form."],
        },
      },
    ],
  },
};
