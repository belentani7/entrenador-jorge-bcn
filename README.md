# Entrenador Jorge · Barcelona

Landing de alto impacto para Jorge, entrenador personal en Barcelona. El proyecto combina React, Vite, Tailwind, tRPC, Drizzle, GSAP y ScrollTrigger.

## Ejecutar localmente

Instala dependencias con `pnpm install` y arranca el entorno full stack con `pnpm dev`. Para verificar el proyecto usa `pnpm check`, `pnpm test` y `pnpm build`.

## Publicación

La versión completa con backend, reservas, leads y fallback de email se ejecuta en Manus. La repo también incluye `.github/workflows/pages.yml`, que construye el frontend estático para GitHub Pages en cada push a `main`. En GitHub Pages no se ejecutan el servidor Express, tRPC ni la base de datos; por eso las reservas y formularios requieren el dominio full stack de Manus.

El hero usa un asset HTTPS estable del dominio publicado para no depender de la ruta interna `/manus-storage` cuando el frontend se sirve desde GitHub Pages.

## Estado funcional

La landing incluye hero sin rostro, navegación sticky, storytelling, servicios, GSAP/ScrollTrigger, SEO local, formularios, reserva, base de datos y diseño responsive. Los emails transaccionales quedan preparados para activarse cuando Jorge introduzca las credenciales correspondientes.
