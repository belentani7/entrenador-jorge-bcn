# Entrenador Web Jorge · Barcelona

Landing premium para Jorge, entrenador personal en Barcelona. El proyecto combina React 19, Vite 7, Tailwind CSS 4, GSAP/ScrollTrigger, tRPC, Drizzle ORM y un asistente fitness local en español.

## Estado

`main` publica el frontend estático en GitHub Pages desde `dist/public`. El backend full stack (tRPC + base de datos + notificaciones) se despliega por separado. La landing incluye hero, storytelling, servicios, método, reserva, mapa, asistente fitness con límites de seguridad y SEO local de Barcelona. No se publican testimonios, valoraciones ni transformaciones inventadas.

La ficha de producto y el contrato comercial están en [`plataforma/FICHA.md`](plataforma/FICHA.md), [`plataforma/OFERTA.md`](plataforma/OFERTA.md) y [`plataforma/precios.json`](plataforma/precios.json). El informe de restauración de 2026-11-25 está en [`docs/RESTAURACION-2026-11-25.md`](docs/RESTAURACION-2026-11-25.md).

## Desarrollo local

Requiere Node 22 (ver `.nvmrc`) y pnpm 10 vía Corepack.

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

`pnpm dev` arranca el frontend y el servidor full stack. El dev server escucha en todas las interfaces y admite los hosts de Manus y de la vista previa de Arena (`.e2b.app`).

## Comandos de calidad

```bash
pnpm check                      # TypeScript estricto, sin emitir
pnpm test                       # Vitest: lógica crítica + camino feliz con DOM
pnpm build                      # Vite + esbuild
pnpm format:check               # Prettier
python3 scripts/doctor.py       # Auditoría de estructura (47 comprobaciones)
node scripts/validate-catalog.mjs
pnpm verify                     # Todo lo anterior + métricas de dist/public
node scripts/verify.mjs --help  # Ayuda de la herramienta de verificación
```

`pnpm verify` imprime tamaño raw/gzip de `index.html` y de cada asset, número de chunks y si el runtime de Manus se ha filtrado al build de producción (debe decir `no`).

## Estructura

| Ruta                                        | Responsabilidad                                        |
| ------------------------------------------- | ------------------------------------------------------ |
| `client/index.html`                         | Entry de Vite: monta React desde `client/src/main.tsx` |
| `client/src/pages/Home.tsx`                 | Landing, storytelling, formularios y animaciones       |
| `client/src/components/AssistantWidget.tsx` | Asistente fitness flotante                             |
| `client/src/main.tsx`                       | Bootstrap de React, tRPC y React Query                 |
| `client/tests/booking.e2e.test.tsx`         | Test del camino feliz de reserva en DOM simulado       |
| `server/routers.ts`                         | Procedimientos públicos de leads y reservas            |
| `server/db.ts`                              | Conexión y acceso Drizzle/MySQL                        |
| `server/email.ts`                           | Notificaciones y fallback de correo                    |
| `drizzle/schema.ts`                         | Modelo de datos                                        |
| `.github/workflows/ci.yml`                  | Verificación completa en push y PR                     |
| `.github/workflows/pages.yml`               | Build y publicación de GitHub Pages desde `main`       |

## Emails de producción

La activación de correo requiere `RESEND_API_KEY` y `JORGE_EMAIL` en los secretos del proyecto. El detalle operativo está en [`email-setup.md`](email-setup.md). Nunca se versionan secretos ni se incluyen en el frontend.

## Publicación

Trabaja en una rama desde `main`, abre una PR y espera a que CI esté en verde. Al fusionar la PR en `main`, GitHub Actions construye `dist/public` y publica en GitHub Pages:

```bash
git status
git add .
git commit -m "fix(landing): describe el cambio"
git push origin <nombre-de-la-rama>
# Abrir PR contra main y fusionarla desde GitHub
```

Manus publica el stack completo mediante checkpoints. GitHub Pages publica únicamente el frontend estático; sus formularios necesitan el dominio full stack de Manus para persistir datos.

## Criterios de contenido

Los textos, fotografías de clientes, historias, valoraciones y resultados deben proceder de materiales reales autorizados por Jorge. Las imágenes ilustrativas no deben presentarse como clientes ni como resultados verificables.

## Firma técnica

La firma discreta del proyecto es `belentani.eu · Pedro Belentani · noiacore.com` y aparece en el frontend y en la identificación técnica del servidor.

## Colaboración

Lee [`CONTRIBUTING.md`](CONTRIBUTING.md) y [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) antes de abrir una PR.
