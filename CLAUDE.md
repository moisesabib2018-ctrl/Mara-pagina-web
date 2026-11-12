# Blanchard Group LLC — sitio web oficial

Proyecto Next.js en `web/`. La carpeta `referencias/` (prototipo v3) es de solo lectura: **no modificar**.
`web/AGENTS.md` avisa que esta versión de Next tiene cambios: leer `web/node_modules/next/dist/docs/` antes de escribir código de framework.

## Stack y decisiones de arquitectura
- Next.js 16 (App Router, `src/`), React 19, TypeScript estricto, Tailwind CSS 4, ESLint. Sin WordPress.
- Alias `@/*` → `web/src/*`. Zod para validar entradas y entorno.
- Estructura: `src/app` (rutas), `src/components/{ui,layout,sections}`, `src/content` (contenido tipado), `src/config` (sitio y env), `src/lib`, `src/styles/tokens.css` (colores), `src/types`, `public/brand` (logo), `public/images`.
- Contenido en archivos tipados y bilingües (es/en); nada de textos hardcodeados en componentes finales.
- Secretos solo en servidor; `.env.example` documenta variables, `.env.local` no se sube.
- i18n propio (sin `next-intl`): rutas `/es` y `/en` bajo `src/app/[locale]`, textos en `src/content/ui.ts`, servicios en `src/content/services.ts`. `src/proxy.ts` (antes `middleware`) redirige a `/es` o `/en` según `Accept-Language`.
- URLs de servicio traducidas: `/es/servicios/taxes-individuales`, `/en/services/individual-taxes`. La ruta canónica interna es `/[locale]/servicios/[id]`; el inglés se sirve con `rewrites` en `next.config.ts` a partir de `src/config/service-slugs.ts`.
- `cacheComponents` está activo: no usar `new Date()`/datos dinámicos al prerenderizar; páginas con `generateStaticParams`.
- Pruebas: `npm test` (Vitest, 37): enlace de calendario, chat (respuestas, rechazo, datos sensibles, límite de uso), datos públicos y rutas. Auditorías manuales hechas: axe (0 violaciones, es/en, escritorio/celular) y Lighthouse móvil (rendimiento 96–97, accesibilidad 100, buenas prácticas 100).
- Limitación conocida: con `cacheComponents` no existe `dynamicParams`, así que una URL de servicio inexistente muestra la pantalla 404 pero con estado HTTP 200.

## Dirección visual: A "Estudio financiero" (elegida)
Editorial y luminosa. Hero v6: base **marfil cálido** (`ivory`, `ivory-200`), titular grande con énfasis en cursiva y subrayado dorado y un mensaje emocional de un párrafo, **sin botones, sin foto y sin franja de estadísticas** (la reserva está en el botón del menú superior, la barra inferior móvil y la sección de agenda); **a la derecha (solo escritorio ≥1024 px) el círculo de aros del logo (`ArcMotif`) con 6 ilustraciones SVG originales formando un anillo sobre el aro interior y el logo original en un medallón al centro** (`HeroVisual.tsx`; posiciones en % del lienzo; verificado por geometría en 1024–1920 px: anillo perfecto, tarjetas dentro del aro exterior y sin tocar el medallón; bajo 1280 px el nombre pasa a `title`/lectores de pantalla). Al pasar el mouse o enfocar con teclado la tarjeta "salta" (sube 8 px, escala 1,15, gira 2°, borde dorado); cada una enlaza a su página de servicio. Título: «…con atención personalizada.» Bajo 1024 px solo unos aros suaves en la esquina. Sin fotos de terceros: evita derechos de imagen y créditos. Si se prefieren fotos, deben ser propias o con licencia comprobada. **No mencionar la duración de las consultas en la portada.** **La presentación de la asesora vive en su propia sección (`AdvisorIntro`), inmediatamente después de la portada y antes de los servicios** (foto a la izquierda en escritorio, primero en celular; sin degradado encima, marco blanco suave, recorte 4:5 que no deforma). No duplicarla en la portada. Orden de la página: Portada → Asesora → Servicios → Proceso → Fechas clave → Agenda → Preguntas → Contacto → Houston → pie. El azul marino fuerte se limita a esa tarjeta, la banda de agenda y el pie; dorado solo en filetes, numeración y botón principal. Animación `.rise` (CSS ligero, respeta `prefers-reduced-motion`) solo en la tarjeta del hero: NO animar el texto principal desde opacidad 0 (retrasa el LCP). `google: notranslate` y `translate="no"` en la marca evitan que Chrome traduzca el sitio. Tipografías: Fraunces (títulos, serif) e Inter (texto), vía `next/font`. Esquinas poco redondeadas, líneas finas, sin animaciones pesadas, objetivos táctiles ≥ 44 px. Logo (JPG cuadrado con fondo blanco) solo sobre fondo blanco: encabezado claro y, en el pie oscuro, dentro de un recuadro blanco; nunca recortado ni deformado. El dorado `#B78B40` sobre blanco no cumple contraste para texto pequeño: usar `gold-dark` (`#7F5C1F`).

## Identidad visual
Nombre: Blanchard Group LLC. Navy `#041B3C`, azul profundo `#082650`, dorado `#B78B40`, blanco `#FFFFFF`, fondos secundarios en grises muy claros. Tokens en `src/styles/tokens.css`. El logo original se usa tal cual, sin recortar ni deformar (`components/layout/Logo.tsx`).

## Servicios (exactamente seis)
Taxes individuales · Taxes corporativos · Creación de empresas · ITIN · Seguros de vida · Seguros de salud.

## Calendario (Google Calendar Appointment Schedules)
Decisión vigente: se incrusta/enlaza la **página de citas oficial de Google** (sin API ni credenciales). La asesora configura en Google Calendar: 45 min por cita, 15 min de margen (*buffer*, nunca visible), días, horarios, vacaciones y bloqueos. Google muestra solo horarios libres y permite navegar por meses. Limitaciones: el marco de Google no se puede estilizar y su idioma depende del navegador. El enlace va en `siteConfig.booking.url`; `src/lib/booking.ts` solo acepta https `calendar.google.com/calendar/appointments/...` (incrusta) o `calendar.app.google` (solo enlace). Sin enlace, la sección muestra "próximamente": nunca horarios ni reservas simuladas.

## Activación sin tocar código (variables de entorno)
Todo dato pendiente se activa pegando su valor en `web/.env.local` (local/Codespaces) o en el panel del hosting; plantilla en `web/.env.example`. Valor vacío o inválido = no se muestra (`src/lib/public-env.ts` valida y normaliza). `NEXT_PUBLIC_*` se incrustan al compilar (recompilar al cambiarlas): `WHATSAPP`, `INSTAGRAM_URL`, `CONTACT_EMAIL`, `PHONE`, `BOOKING_URL`, `SITE_URL`, `INDEXABLE`. WhatsApp abre con un mensaje inicial en el idioma del visitante. Secretos de servidor (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `CHAT_ENABLED`, `CHAT_DAILY_LIMIT`) se leen en ejecución. Con `SITE_URL` + `INDEXABLE=true` se activan sitemap, hreflang, JSON-LD y se permite indexar; sin eso `robots.txt` bloquea todo.

## Chatbot (implementado, falta la clave)
`/api/chat` usa `@anthropic-ai/sdk` en el servidor: contenido aprobado (`lib/chat/knowledge.ts`), esfuerzo bajo, rechazo del modelo manejado, mensajes con datos sensibles bloqueados y omitidos del historial, límite 12 mensajes/10 min por visitante y tope diario global (en memoria por instancia: "mejor esfuerzo"; para tope estricto usar almacén compartido o firewall del hosting). Modelo por defecto `claude-opus-5-5`; para un chat público conviene `ANTHROPIC_MODEL=claude-haiku-5-5` (costo mucho menor). No se activó `fallbacks` del lado del servidor (rechazos improbables en un chat de preguntas frecuentes; se maneja `stop_reason: "refusal"`). Probado con un servidor falso de la API (`ANTHROPIC_BASE_URL`), no con la API real.

## Reglas / limitaciones
- **No inventar** nombres, licencias, testimonios, precios, teléfonos ni enlaces. Dato pendiente = `null` y no se renderiza.
- Calendario, panel de administración y chatbot del prototipo son **simulaciones**: no presentarlos como servicios reales hasta integrarlos y probarlos.
- Chatbot: interfaz lista (`components/chat`), `/api/chat` valida, bloquea datos sensibles (`lib/chat/guardrails.ts`) y responde 503/501 hasta conectar un proveedor de IA; base de conocimiento y prompt en `lib/chat/knowledge.ts`. El widget consulta `GET /api/chat` en tiempo de ejecución (la clave `ANTHROPIC_API_KEY` se puede agregar sin recompilar); sin clave lo dice y no simula respuestas.
- Formulario: `/api/contact` valida (Zod + honeypot) y responde 503/501 hasta conectar proveedor de email (`siteConfig.contactForm.enabled`).
- WhatsApp, Instagram, email y teléfono solo aparecen si están en `siteConfig.contact`.
- **Datos aportados por el cliente** (no inventados): asesora **Marianna Blanchard Hernandez** (ortografía confirmar con el cliente: antes se escribió "Mariamna"; se cambia en `siteConfig.advisor.name`) y su foto (`web/public/images/advisor-portrait.jpg`, 1600×1066 y muy comprimida: conviene pedir el original de mayor calidad); atiende **en persona en Houston, Texas** (dirección exacta pendiente) y en **español o inglés**. Biografía y credenciales: pendientes.
- Contacto: mientras no haya proveedor de correo, la sección muestra el **generador de solicitud** (`RequestBuilder`): arma el texto, lo copia o lo abre en WhatsApp (si hay número). No envía ni guarda nada. Con proveedor conectado se usa `ContactForm`.
- **Fechas clave** (`content/key-dates.ts`): datos POR AÑO que la asesora debe revisar cada temporada. Medicare 15 oct–7 dic verificada; el cierre del Mercado de salud (Obamacare) está sin fecha porque las fuentes difieren (15 dic / 15 ene) y varía por estado; fecha límite de taxes 15 abr 2027. El estado ("abierto ahora", "cierra en N días") se calcula en el navegador con la hora de Houston y las fechas vencidas se ocultan solas.
- **Foto de "De Houston, para Houston"** (`web/public/images/houston-skyline.jpg`): David Daniel Turner, **CC BY 4.0**, vía Wikimedia Commons. La licencia exige mantener el crédito visible (autor, licencia, enlace y aviso de recorte/capa de color): está en `siteConfig.location.photo.credit` y se muestra en el banner. Si se reemplaza por una foto propia, poner `credit: undefined`. No usar fotos sin licencia comprobada.
- Estilo de tarjetas (v4): bordes sutiles `border-line`, `rounded-2xl`, sombra suave, insignia numerada dorada, borde dorado para lo "abierto/activo"; encabezados de sección con línea dorada (`Eyebrow`). Solo cambió la presentación, no los textos.
- Textos tomados del prototipo del cliente (a aprobar): "Nada de call centers ni respuestas copiadas — una asesora real, cerca de ti".
- Los textos de servicios, proceso y FAQ son **borradores** generales sin precios, garantías ni credenciales: la asesora debe aprobarlos (sobre todo seguros y ITIN).
- Sitio no publicado: `robots` en noindex hasta el lanzamiento. No desplegar sin pedido explícito.

## Pendiente
Cuestionario interactivo «¿Qué necesitas realmente?» (3 preguntas; existe en el prototipo antiguo Mara LLC pero NO en este proyecto: no construido). Prototipo v3 y documentos Markdown de la empresa (no están en el repo; el logo `447460.jpg` se subió a `main` y se copió a `web/public/brand/`), enlace de Google Appointment Schedules, datos de la asesora, textos de servicios, contacto/WhatsApp/Instagram, FAQ, zona horaria, cuenta de Google, dominio, proveedor de email, textos legales y licencias.

## Comandos (en `web/`)
`npm run dev` · `npm run lint` · `npm run typecheck` · `npm test` · `npm run build`
