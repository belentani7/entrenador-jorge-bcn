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


## Horario real y garantías de reservas (octubre de 2026)

Los formularios se verifican en `Europe/Madrid` con fechas de calendario reales, teniendo en cuenta los cambios de horario de invierno/verano. No se permiten franjas de hoy que ya han pasado en Barcelona. Las plantillas HTML de notificación al entrenador escapan los datos introducidos por el visitante. La CI de Pages ahora exige el chequeo de tipos y los tests antes de publicar la página estática.

**Límite conocido y bloqueo de producción:** el modelo actual verifica `hasBooking` y crea una reserva en dos consultas independientes. Esa combinación no es transaccional; con peticiones simultáneas aún podría duplicar la misma franja. Se necesita una restricción única de slots activos respaldada por una migración y un test MySQL concurrente antes de publicitar reserva automática garantizada. Hasta entonces, las reservas deben revisarse en el backend operativo. GitHub Pages no almacena leads por sí solo.
