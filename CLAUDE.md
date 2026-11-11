# Blanchard Group LLC — sitio web oficial

Proyecto Next.js en `web/`. La carpeta `referencias/` (prototipo v3) es de solo lectura: **no modificar**.
`web/AGENTS.md` avisa que esta versión de Next tiene cambios: leer `web/node_modules/next/dist/docs/` antes de escribir código de framework.

## Stack y decisiones de arquitectura
- Next.js 16 (App Router, `src/`), React 19, TypeScript estricto, Tailwind CSS 4, ESLint. Sin WordPress.
- Alias `@/*` → `web/src/*`. Zod para validar entradas y entorno.
- Estructura: `src/app` (rutas), `src/components/{ui,layout,sections}`, `src/content` (contenido tipado), `src/config` (sitio y env), `src/lib`, `src/styles/tokens.css` (colores), `src/types`, `public/brand` (logo), `public/images`.
- Contenido en archivos tipados y bilingües (es/en); nada de textos hardcodeados en componentes finales.
- Secretos solo en servidor; `.env.example` documenta variables, `.env.local` no se sube.
- Plan: i18n con rutas `/es` y `/en` (`next-intl`), 6 páginas de servicio, sección de la asesora, FAQ, contacto, agenda, chatbot, SEO técnico/local. En Next 16 el antiguo `middleware` se llama `proxy`.

## Identidad visual
Nombre: Blanchard Group LLC. Navy `#041B3C`, azul profundo `#082650`, dorado `#B78B40`, blanco `#FFFFFF`, fondos secundarios en grises muy claros. Tokens en `src/styles/tokens.css`. El logo original se usa tal cual, sin recortar ni deformar (`components/layout/Logo.tsx`).

## Servicios (exactamente seis)
Taxes individuales · Taxes corporativos · Creación de empresas · ITIN · Seguros de vida · Seguros de salud.

## Calendario (Google Calendar)
Consultas de 45 min + 15 min de descanso (interno, **nunca mostrar**). La asesora gestiona disponibilidad solo desde Google Calendar: calendario dedicado de "ventanas disponibles" menos `freebusy` de su calendario. El cliente ve solo horarios reales y puede navegar a meses futuros. Revalidar al reservar para evitar dobles reservas.

## Reglas / limitaciones
- **No inventar** nombres, licencias, testimonios, precios, teléfonos ni enlaces. Dato pendiente = `null` y no se renderiza.
- Calendario, panel de administración y chatbot del prototipo son **simulaciones**: no presentarlos como servicios reales hasta integrarlos y probarlos.
- Chatbot (API de Claude, servidor): solo contenido aprobado, aviso de que es IA, sin asesoría personalizada fiscal/de seguros.
- Sitio no publicado: `robots` en noindex hasta el lanzamiento. No desplegar sin pedido explícito.

## Pendiente
Prototipo v3 y logo original (no estaban en el repo), datos de la asesora, textos de servicios, contacto/WhatsApp/Instagram, FAQ, zona horaria, cuenta de Google, dominio, proveedor de email, textos legales y licencias.

## Comandos (en `web/`)
`npm run dev` · `npm run lint` · `npm run typecheck` · `npm run build`
