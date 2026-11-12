# Blanchard Group LLC — sitio web

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4. Decisiones de arquitectura, identidad visual y reglas del proyecto: [`../CLAUDE.md`](../CLAUDE.md).

## Ejecutar en tu computadora

### 1. Instalar una sola vez
- **Node.js 22** (mínimo 20.9): <https://nodejs.org> (descarga la versión LTS).
- **Git**: <https://git-scm.com/downloads> (en Mac se instala al ejecutar `git --version` por primera vez).

Comprueba:
```bash
node -v && git --version
```

### 2. Descargar el proyecto
```bash
git clone https://github.com/moisesabib2018-ctrl/Mara-pagina-web.git
```
```bash
cd Mara-pagina-web
```
```bash
git checkout claude/relaxed-maxwell-h1phb8
```

### 3. Instalar y abrir
```bash
cd web
```
```bash
npm install
```
```bash
npm run dev
```
Abre <http://localhost:3000> (redirige a `/es`; el inglés está en `/en`). Los cambios en el código se ven al guardar, sin reiniciar.

### Actualizar cuando haya cambios nuevos
Desde la carpeta `Mara-pagina-web`:
```bash
git pull
```
Si `package.json` cambió, vuelve a ejecutar `npm install` dentro de `web/`.

## Activar WhatsApp, calendario, Instagram y chatbot
Copia la plantilla y completa solo lo que tengas (lo vacío no se muestra):
```bash
cp .env.example .env.local
```
Edita `.env.local` y reinicia `npm run dev`. Qué hace cada variable: comentarios en `.env.example`. **Nunca subas `.env.local` a GitHub** (ya está ignorado).

## Comandos
| Comando | Para qué |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` · `npm run start` | Compilar y servir la versión de producción |
| `npm run lint` | Revisar el código |
| `npm run typecheck` | Revisar los tipos |
| `npm test` | Pruebas automáticas |

## Problemas frecuentes
- **`command not found: node`**: instala Node.js y abre una terminal nueva.
- **El puerto 3000 está ocupado**: `npm run dev -- -p 3001` y abre <http://localhost:3001>.
- **Se ve la página sin estilos o con errores raros tras actualizar**: detén el servidor (Ctrl+C), borra la caché con `rm -rf .next` y vuelve a `npm run dev`.
- **Chrome traduce la página**: el sitio ya es bilingüe; si aparece el aviso de traducir, ignóralo.
