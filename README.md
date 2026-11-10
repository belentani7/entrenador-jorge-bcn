# Entrenador Web Jorge · Barcelona

Landing premium para Jorge, entrenador personal en Barcelona. El proyecto combina React 19, Vite, Tailwind CSS 4, GSAP/ScrollTrigger, tRPC, Drizzle ORM y un asistente fitness local en español.

## Desarrollo local

```bash
pnpm install
pnpm dev
```

Checks principales:

```bash
pnpm check
pnpm test
pnpm build
```

`pnpm dev` arranca el frontend y el servidor full stack usando la configuración de WebDev. El código de aplicación no fija puertos.

## Estructura

| Ruta | Responsabilidad |
|---|---|
| `client/src/pages/Home.tsx` | Landing, storytelling, formularios y animaciones |
| `client/src/components/AssistantWidget.tsx` | Asistente fitness flotante |
| `client/src/main.tsx` | Bootstrap de React, tRPC y React Query |
| `server/routers.ts` | Procedimientos públicos de leads y reservas |
| `server/db.ts` | Conexión y acceso Drizzle/MySQL |
| `server/email.ts` | Notificaciones y fallback de correo |
| `drizzle/schema.ts` | Modelo de datos |
| `drizzle/*.sql` | Migraciones versionadas |
| `.github/workflows/pages.yml` | Build y publicación de GitHub Pages |

## Funcionalidad publicada

La landing incluye hero sin rostro, identidad naranja intensa, navegación responsive, storytelling, servicios, GSAP/ScrollTrigger, SEO local de Barcelona, mapa, asistente fitness con límites de seguridad, captación de leads y reserva de sesión. No se publican testimonios, valoraciones ni transformaciones inventadas.

La versión completa con backend, base de datos y notificaciones se sirve en Manus. GitHub Pages publica únicamente el frontend estático desde `dist/public`; sus formularios necesitan el dominio full stack de Manus para persistir datos.

## Emails de producción

La activación de correo requiere `RESEND_API_KEY` y `JORGE_EMAIL` en los secretos del proyecto. El detalle operativo está en [`email-setup.md`](./email-setup.md). Nunca se versionan secretos ni se incluyen en el frontend.

## Publicación

Manus publica mediante checkpoints. GitHub Pages se construye desde `main` mediante GitHub Actions:

```bash
git status
git add .
git commit -m "Describe el cambio"
git push origin main
```

## Criterios de contenido

Los textos, fotografías de clientes, historias, valoraciones y resultados deben proceder de materiales reales autorizados por Jorge. Las imágenes ilustrativas no deben presentarse como clientes ni como resultados verificables.

## Firma técnica

La firma discreta del proyecto es `belentani.eu · Pedro Belentani · noiacore.com` y aparece en el frontend y en la identificación técnica del servidor.

<!-- repo-forge:readme:inicio -->
## Qué es

**Jorge · Entrenador** — landing premium con asistente fitness.

Decir la verdad del precio, el plazo y el resultado, y hacer que dar el paso sea fácil.

## Estado medido

| Dato | Valor |
|---|---|
| Lenguajes | JavaScript, TypeScript, YAML, CSS, HTML, JSON |
| Archivos / líneas | 174 / 27493 |
| Páginas HTML | 8 |
| Tests detectados | 6 |
| Cumplimiento de reglas | 37/37 (100.0%) |

Todo lo anterior se midió en disco el 2026-11-10; no es una estimación.

## Uso

```bash
npm install
npm run dev
```

## Estructura

```
assets/
brand/
client/
data/
docs/
drizzle/
magic/
patches/
plataforma/
producto/
```

## Diseño de plataforma

- Hero
- Programas
- Casos
- Asistente
- Reserva

La ficha completa —máximo potencial, marca, fases de monetización y recursos— vive en
[`plataforma/FICHA.md`](plataforma/FICHA.md). Los tokens de marca están en
[`brand/tokens.css`](brand/tokens.css).

## Reglas del proyecto

Este repositorio sigue el catálogo oficial del ecosistema (`GH-*`, `WEB-*`, `ACC-*`,
`SEO-*`, `COH-*`, `DEV-*`). El gate se ejecuta con:

```bash
python scripts/doctor.py
```

## Licencia

MIT. Ver [`LICENSE`](LICENSE).
<!-- repo-forge:readme:fin -->
<!-- repo-forge:readme:fin -->
<!-- repo-forge:readme:fin -->
<!-- repo-forge:readme:fin -->

## Producto

Oferta, precio y cobro: [`producto/OFERTA.md`](producto/OFERTA.md) · [`producto/precios.json`](producto/precios.json) · [`producto/landing.html`](producto/landing.html)
