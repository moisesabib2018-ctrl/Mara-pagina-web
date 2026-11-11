import type { Service } from "@/types/service";
import type { ServiceId } from "@/config/service-slugs";

/*
 * BORRADOR de contenido: descripciones generales y conservadoras.
 * Sin precios, garantías, plazos ni credenciales. La asesora debe revisarlas y aprobarlas.
 */
export const services: Service[] = [
  {
    id: "taxes-individuales",
    name: { es: "Taxes individuales", en: "Individual taxes" },
    short: {
      es: "Preparación de tu declaración de impuestos personal.",
      en: "Preparation of your personal tax return.",
    },
    lead: {
      es: "Preparamos tu declaración de impuestos personal para que presentes tu información de forma ordenada y completa.",
      en: "We prepare your personal tax return so your information is organized and complete.",
    },
    forWhom: {
      es: ["Personas con ingresos de empleo (W-2)", "Trabajadores independientes o con ingresos 1099", "Familias con dependientes"],
      en: ["People with employment income (W-2)", "Self-employed workers or those with 1099 income", "Families with dependents"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Revisamos tu situación y qué información necesitas reunir." },
        { title: "Recopilación", text: "Reúnes tus documentos de ingresos, gastos y dependientes." },
        { title: "Preparación", text: "Preparamos tu declaración con la información que entregas." },
        { title: "Revisión contigo", text: "Repasamos el resultado juntos y definimos los siguientes pasos." },
      ],
      en: [
        { title: "Initial consultation", text: "We review your situation and what information you need to gather." },
        { title: "Gathering", text: "You collect your income, expense, and dependent documents." },
        { title: "Preparation", text: "We prepare your return with the information you provide." },
        { title: "Review with you", text: "We go over the result together and define the next steps." },
      ],
    },
    bring: {
      es: ["Identificación", "SSN o ITIN tuyo, de tu cónyuge y de tus dependientes", "Formularios W-2, 1099 y otros comprobantes de ingresos", "Gastos, deducciones o créditos que quieras revisar", "Tu declaración del año anterior, si la tienes"],
      en: ["Identification", "SSN or ITIN for you, your spouse, and your dependents", "W-2, 1099, and other income statements", "Expenses, deductions, or credits you want reviewed", "Last year's return, if you have it"],
    },
  },
  {
    id: "taxes-corporativos",
    name: { es: "Taxes corporativos", en: "Corporate taxes" },
    short: {
      es: "Declaraciones de impuestos para tu empresa.",
      en: "Tax returns for your business.",
    },
    lead: {
      es: "Preparamos las declaraciones de impuestos de tu empresa, según su tipo de entidad y su actividad.",
      en: "We prepare your business tax returns, based on its entity type and activity.",
    },
    forWhom: {
      es: ["Dueños de LLC, corporaciones y otros negocios", "Empresas nuevas que presentarán su primera declaración", "Negocios que necesitan ordenar su información para impuestos"],
      en: ["Owners of LLCs, corporations, and other businesses", "New businesses filing their first return", "Businesses that need to organize their information for taxes"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Identificamos el tipo de entidad de tu empresa y sus obligaciones." },
        { title: "Información financiera", text: "Reúnes ingresos, gastos y demás registros del negocio." },
        { title: "Preparación", text: "Preparamos las declaraciones que corresponden a tu empresa." },
        { title: "Revisión contigo", text: "Revisamos juntos el resultado y los siguientes pasos." },
      ],
      en: [
        { title: "Initial consultation", text: "We identify your business's entity type and its obligations." },
        { title: "Financial information", text: "You gather income, expenses, and other business records." },
        { title: "Preparation", text: "We prepare the returns that apply to your business." },
        { title: "Review with you", text: "We review the result and next steps together." },
      ],
    },
    bring: {
      es: ["EIN de la empresa", "Documentos de constitución o tipo de entidad", "Ingresos y gastos del año", "Información de nómina y pagos a contratistas, si aplica", "Declaración anterior, si existe"],
      en: ["Business EIN", "Formation documents or entity type", "Income and expenses for the year", "Payroll and contractor payment information, if applicable", "Prior return, if one exists"],
    },
    note: {
      es: "Las declaraciones y obligaciones dependen del tipo de entidad y del estado.",
      en: "Returns and obligations depend on the entity type and the state.",
    },
  },
  {
    id: "creacion-de-empresas",
    name: { es: "Creación de empresas", en: "Business formation" },
    short: {
      es: "Orientación para constituir tu empresa paso a paso.",
      en: "Step-by-step guidance to form your business.",
    },
    lead: {
      es: "Te orientamos en los pasos para constituir tu empresa, desde elegir el tipo de entidad hasta los trámites iniciales.",
      en: "We guide you through the steps to form your business, from choosing an entity type to the initial filings.",
    },
    forWhom: {
      es: ["Emprendedores que van a abrir un negocio", "Personas que quieren formalizar una actividad que ya realizan", "Quienes dudan entre distintos tipos de entidad"],
      en: ["Entrepreneurs about to start a business", "People who want to formalize an activity they already carry out", "Anyone unsure between different entity types"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Conversamos sobre tu idea, tus objetivos y tus opciones." },
        { title: "Tipo de entidad", text: "Te explicamos las opciones generales para que elijas con más información." },
        { title: "Registro y trámites", text: "Te orientamos en el registro y los trámites iniciales, como el EIN." },
        { title: "Siguientes pasos", text: "Repasamos las obligaciones que vienen después de constituir la empresa." },
      ],
      en: [
        { title: "Initial consultation", text: "We discuss your idea, your goals, and your options." },
        { title: "Entity type", text: "We explain the general options so you can choose with more information." },
        { title: "Registration and filings", text: "We guide you through registration and initial filings, such as the EIN." },
        { title: "Next steps", text: "We go over the obligations that follow once the business is formed." },
      ],
    },
    bring: {
      es: ["Nombre o nombres que te gustaría usar para la empresa", "Estado donde quieres registrarla", "Nombres de los dueños o miembros", "Descripción de la actividad del negocio", "Identificación de los dueños"],
      en: ["Name or names you would like for the business", "State where you want to register it", "Names of the owners or members", "Description of the business activity", "Owners' identification"],
    },
    note: {
      es: "Los requisitos y trámites varían según el estado.",
      en: "Requirements and filings vary by state.",
    },
  },
  {
    id: "itin",
    name: { es: "ITIN", en: "ITIN" },
    short: {
      es: "Asistencia con el trámite de tu ITIN.",
      en: "Help with your ITIN application.",
    },
    lead: {
      es: "Te acompañamos en el trámite del ITIN, el Número de Identificación Personal del Contribuyente que emite el IRS para quienes no pueden obtener un número de Seguro Social.",
      en: "We assist you with the ITIN process. The ITIN is the Individual Taxpayer Identification Number the IRS issues to people who cannot get a Social Security number.",
    },
    forWhom: {
      es: ["Personas que deben presentar impuestos y no pueden obtener SSN", "Cónyuges o dependientes que necesitan un ITIN", "Quienes necesitan renovar un ITIN vencido"],
      en: ["People who must file taxes and cannot get an SSN", "Spouses or dependents who need an ITIN", "Anyone who needs to renew an expired ITIN"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Confirmamos si el ITIN aplica a tu caso." },
        { title: "Documentos", text: "Revisamos qué documentos de identidad acepta el IRS en tu situación." },
        { title: "Solicitud", text: "Te ayudamos a preparar la solicitud (Formulario W-7)." },
        { title: "Siguientes pasos", text: "Te explicamos cómo continúa el proceso una vez presentada la solicitud." },
      ],
      en: [
        { title: "Initial consultation", text: "We confirm whether an ITIN applies to your case." },
        { title: "Documents", text: "We review which identity documents the IRS accepts in your situation." },
        { title: "Application", text: "We help you prepare the application (Form W-7)." },
        { title: "Next steps", text: "We explain how the process continues once the application is submitted." },
      ],
    },
    bring: {
      es: ["Pasaporte u otros documentos de identidad que acepta el IRS", "Documentos que respalden tu situación, si aplican", "Tu declaración de impuestos, si corresponde", "Tu ITIN anterior, si vas a renovarlo"],
      en: ["Passport or other identity documents the IRS accepts", "Documents supporting your situation, if applicable", "Your tax return, if applicable", "Your previous ITIN, if renewing"],
    },
    note: {
      es: "La aprobación y los tiempos dependen del IRS.",
      en: "Approval and timing are determined by the IRS.",
    },
  },
  {
    id: "seguros-de-vida",
    name: { es: "Seguros de vida", en: "Life insurance" },
    short: {
      es: "Orientación para proteger a tu familia.",
      en: "Guidance to help protect your family.",
    },
    lead: {
      es: "Te orientamos para que entiendas cómo funciona un seguro de vida y qué opciones existen para proteger a tu familia.",
      en: "We help you understand how life insurance works and what options exist to protect your family.",
    },
    forWhom: {
      es: ["Personas con dependientes", "Quienes quieren planear la protección de su familia", "Dueños de negocio que desean conocer sus opciones"],
      en: ["People with dependents", "Anyone who wants to plan protection for their family", "Business owners who want to understand their options"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Conversamos sobre tu situación y tus objetivos de protección." },
        { title: "Opciones generales", text: "Te explicamos cómo funcionan los tipos de seguro de vida." },
        { title: "Tus dudas", text: "Resolvemos tus preguntas con calma y sin compromiso de decisión inmediata." },
        { title: "Siguientes pasos", text: "Defines cómo quieres continuar." },
      ],
      en: [
        { title: "Initial consultation", text: "We talk about your situation and your protection goals." },
        { title: "General options", text: "We explain how the types of life insurance work." },
        { title: "Your questions", text: "We answer your questions calmly, with no pressure to decide right away." },
        { title: "Next steps", text: "You decide how you want to continue." },
      ],
    },
    bring: {
      es: ["Quiénes dependen económicamente de ti", "Lo que quieres proteger y por cuánto tiempo", "Seguros que ya tienes, si los hay", "Las preguntas que quieras resolver"],
      en: ["Who depends on you financially", "What you want to protect and for how long", "Insurance you already have, if any", "The questions you want answered"],
    },
    note: {
      es: "La disponibilidad y las condiciones dependen de cada aseguradora y de tu caso.",
      en: "Availability and terms depend on each insurer and on your case.",
    },
  },
  {
    id: "seguros-de-salud",
    name: { es: "Seguros de salud", en: "Health insurance" },
    short: {
      es: "Orientación para entender tus opciones de salud.",
      en: "Guidance to understand your health coverage options.",
    },
    lead: {
      es: "Te orientamos para que entiendas tus opciones de seguro de salud y elijas con más información.",
      en: "We help you understand your health insurance options so you can choose with more information.",
    },
    forWhom: {
      es: ["Personas y familias sin seguro de salud", "Quienes quieren revisar su cobertura actual", "Trabajadores independientes y dueños de negocio"],
      en: ["Individuals and families without health insurance", "Anyone who wants to review their current coverage", "Self-employed workers and business owners"],
    },
    steps: {
      es: [
        { title: "Consulta inicial", text: "Conversamos sobre tu hogar y lo que necesitas de tu cobertura." },
        { title: "Opciones generales", text: "Te explicamos cómo funcionan los planes y los términos más comunes." },
        { title: "Periodos de inscripción", text: "Revisamos si aplica algún periodo de inscripción en tu caso." },
        { title: "Siguientes pasos", text: "Defines cómo quieres continuar." },
      ],
      en: [
        { title: "Initial consultation", text: "We talk about your household and what you need from your coverage." },
        { title: "General options", text: "We explain how plans work and the most common terms." },
        { title: "Enrollment periods", text: "We check whether an enrollment period applies in your case." },
        { title: "Next steps", text: "You decide how you want to continue." },
      ],
    },
    bring: {
      es: ["Cuántas personas forman tu hogar", "Un estimado de los ingresos del hogar", "Tu seguro actual, si lo tienes", "Tus prioridades de cobertura"],
      en: ["How many people are in your household", "An estimate of your household income", "Your current insurance, if any", "Your coverage priorities"],
    },
    note: {
      es: "Algunas inscripciones solo están disponibles en ciertos periodos, y las condiciones dependen de cada plan.",
      en: "Some enrollments are only available during certain periods, and terms depend on each plan.",
    },
  },
];

export const getService = (id: string): Service | undefined => services.find((s) => s.id === id);
export const isServiceId = (id: string): id is ServiceId => services.some((s) => s.id === id);
