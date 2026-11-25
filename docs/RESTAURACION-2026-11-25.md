# Restauración total · entrenador-jorge-bcn · 2026-11-25

Informe de las seis fases ejecutadas sobre el commit `651d8554f206e2bf945346020aa4c7fcc43a0d48`.
Rama de trabajo: `arena/eea7ff9d-entrenador-jorge-bcn`.

## FASE 1 · Diagnóstico (evidencia)

Comandos ejecutados desde la raíz del repo con Node v22.22.3, pnpm 10.4.1 (Corepack) y Python 3.11.2.
Instalación: `corepack pnpm install --frozen-lockfile` → `Done in 20.8s using pnpm v10.4.1` (aviso: `Ignored build scripts: @tailwindcss/oxide, esbuild`).

| ID  | Severidad   | Hallazgo                                  | Error exacto / evidencia                                                                                                                                                                                                                                                         | Causa raíz probable                                                                                                                                                                      | Fix propuesto                                                                                      |
| --- | ----------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| F1  | **Crítico** | El build no genera la aplicación React    | `Unable to parse HTML; parse5 error code invalid-first-character-of-tag-name at client/index.html:136:597`; `Generated an empty chunk: "react"`, `"trpc"`, `"motion"`, `"icons"`, `"ui"`; `dist/public/index.html 379.08 kB`                                                     | `client/index.html` es una plantilla estática mezclada con un fragmento GLSL truncado fuera de `<script>`; no contiene `<div id="root">` ni `<script type="module" src="/src/main.tsx">` | Reemplazar el entry por HTML válido y semántico que monte `main.tsx`                               |
| F2  | Alto        | `pnpm check` falla con 9 errores          | `client/src/hooks/useComposition.ts(36,43): error TS2345: Argument of type '(e: React.CompositionEvent<T>) => void' is not assignable to parameter of type 'noop'.`; ídem líneas 49 y 59; `vite.config.ts(112..119): error TS18046: 'payload' is of type 'unknown'.` (6 errores) | `usePersistFn` restringe los argumentos a `unknown[]` (incompatible por contravarianza) y `handlePayload` no tipa su parámetro                                                           | Corregir la firma genérica y tipar el payload del plugin de logs                                   |
| F3  | Alto        | `pnpm format:check` falla                 | `Code style issues found in 89 files. Run Prettier with --write to fix.`                                                                                                                                                                                                         | El repo se importó sin aplicar Prettier                                                                                                                                                  | Aplicar `pnpm format` y verificar el diff                                                          |
| F4  | Medio       | `python3 scripts/doctor.py` falla         | `43/47 comprobaciones en verde`; `FALTA` de `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`; `FALLA catalogo.json válido`; `FALLA README cita la ficha`                                                                                                                                  | Generación incompleta de archivos de gobierno y catálogos divergentes                                                                                                                    | Añadir los documentos, sincronizar `catalogo.json` con `catalogo.mjs` y citar la ficha en README   |
| F5  | Medio       | `node scripts/validate-catalog.mjs` falla | `FALLA` / `json y mjs no coinciden`                                                                                                                                                                                                                                              | `data/catalogo.json` (metadatos repo-forge) y `data/catalogo.mjs` (canónico con `nombre`) describen esquemas distintos                                                                   | Añadir al JSON los campos canónicos esperados por el validador                                     |
| F6  | Medio       | CI no verifica nada                       | `.github/workflows/ci.yml`: `- run: echo "CI placeholder"`                                                                                                                                                                                                                       | Workflow sustituido por un stub                                                                                                                                                          | Ejecutar doctor, validador, typecheck, tests, build y formato en CI                                |
| F7  | Medio       | Sin test end-to-end                       | `python -m unittest discover -s tests -v` → `Ran 0 tests in 0.000s`; `client/tests/test_basic.py` solo contiene `assert True`; Vitest cubre 17 tests unitarios                                                                                                                   | No hay infraestructura de DOM ni prueba del camino feliz                                                                                                                                 | Añadir test de reserva con DOM simulado y excluir el stub inútil                                   |
| F8  | Medio       | Preview bloqueado por Vite                | `server.allowedHosts` solo incluye dominios Manus/localhost; el preview usa `*.e2b.app`                                                                                                                                                                                          | Config heredada sin el host del entorno                                                                                                                                                  | Añadir `.e2b.app` a la lista explícita (sin `true`, por seguridad)                                 |
| F9  | Bajo        | Documentación de comandos contradictoria  | README indica `npm install && npm test` tras documentar pnpm; `package-lock.json` contiene `{}`                                                                                                                                                                                  | Capas de documentación generadas sucesivamente                                                                                                                                           | Unificar en pnpm y documentar `verify` con `--help`                                                |
| F10 | Bajo        | Sin auditoría de navegador reproducible   | No hay binario de Chrome/Chromium en el sandbox (`command -v` vacío para chromium, google-chrome y firefox)                                                                                                                                                                      | Entorno de ejecución sin navegador                                                                                                                                                       | Reportar métricas de artefactos + accesibilidad estructural; declarar Lighthouse como no ejecutado |

**Estado inicial:** build «verde» pero inútil (HTML roto y cero código de app), typecheck roto, formato roto, doctor roto, validador de catálogo roto, CI stub, 17 tests unitarios en verde, 0 tests E2E.

## FASE 2 · Investigación (fuentes verificadas)

Versiones confirmadas en el lockfile/install: Vite 7.1.9, React/React DOM 19.2.1, Tailwind CSS 4.1.14, Vitest 4.1.11, TypeScript 5.9.3, pnpm 10.4.1, Node 22.22.3.

1. Vite trata `index.html` como código fuente y punto de entrada del grafo; los `<script type="module">` se procesan y rebasan en build. https://vite.dev/guide/
2. React 19: `createRoot(document.getElementById("root"))` es la API oficial para montar una app completa. https://react.dev/reference/react-dom/client/createRoot
3. Tailwind CSS 4 con Vite requiere el plugin `@tailwindcss/vite` y `@import "tailwindcss";` (ya presentes en el repo). https://tailwindcss.com/docs/installation/using-vite
4. Vitest 4: `happy-dom` y `jsdom` se instalan por separado y se activan con `test.environment`. https://v4.vitest.dev/guide/features
5. MDN: `visibilitychange` + `document.hidden` es el patrón oficial para pausar trabajo en pestañas ocultas; `requestAnimationFrame` se usa para animaciones sincronizadas. https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals · https://developer.mozilla.org/en-US/blog/using-the-page-visibility-api/
6. Vite `server.allowedHosts`: lista explícita de hosts; `true` habilita DNS rebinding y está desaconsejado. https://vite.dev/config/server-options

## FASE 3 · Plan priorizado

| #   | Cambio                                                                           | Riesgo                                 | Verificación                                                                 |
| --- | -------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | Restaurar `client/index.html` como entry React válido, con SEO y fallback sin JS | Medio: cambia el HTML servido en Pages | `pnpm build` sin errores parse5, chunks no vacíos, test E2E monta la landing |
| 2   | Corregir tipado de `usePersistFn` y del plugin de logs de Vite                   | Bajo                                   | `pnpm check` con 0 errores                                                   |
| 3   | Tipar payload del colector y añadir hosts de preview                             | Bajo                                   | `pnpm check` + arranque real del dev server                                  |
| 4   | Sincronizar catálogos y añadir documentos de gobierno                            | Bajo                                   | `scripts/doctor.py` 47/47 y `validate-catalog.mjs` en verde                  |
| 5   | Aplicar Prettier a todo el conjunto versionado                                   | Medio: diff amplio, puramente formato  | `pnpm format:check`, build y tests tras el cambio                            |
| 6   | Sustituir CI stub por pipeline real                                              | Bajo                                   | YAML válido + mismos comandos en local                                       |
| 7   | Añadir test E2E del camino feliz de reserva con DOM simulado                     | Medio: dependencia nueva y timers      | `pnpm test` en verde con el nuevo test                                       |
| 8   | Añadir `scripts/verify.mjs --help` para centralizar verificaciones y métricas    | Bajo                                   | `node scripts/verify.mjs --help` y ejecución completa                        |
| 9   | Documentar estado final, métricas ANTES/DESPUÉS y límites                        | Bajo                                   | Este informe + README                                                        |

## FASE 4 · Construcción (cambios atómicos verificados)

1. `client/index.html`: sustituido por entry React válido (`#root` + `script type="module"`), metadatos ES, favicon/OG locales, `noscript`, CSS crítico y preconnect útil. Verificado: `pnpm build` sin `parse5` y 7 chunks reales.
2. `client/public/favicon.svg`, `client/public/og-image.svg`, `client/public/robots.txt`, `client/public/sitemap.xml`: copiados/creados para que Vite los publique. Verificado: Lighthouse SEO 100 y `/robots.txt` con contenido textual.
3. `client/src/hooks/usePersistFn.ts`: firma `AnyFunction` que respeta la contravarianza de los handlers de React. Verificado: 3 errores TS2345 eliminados.
4. `vite.config.ts`: payload tipado en el colector de logs, `.e2b.app` en `allowedHosts`, y configuración condicional (función `defineConfig`) para excluir el runtime de Manus del build de producción. Verificado: 6 errores TS18046 eliminados; HTML inline de 367.081 bytes → 0.
5. `server/_core/vite.ts`: se invoca la config condicional en lugar de hacer spread de una función, y `serveStatic` usa `dist/public` desde `cwd` (funciona con `tsx` y con `dist/index.js`). Verificado: dev HTTP 200 con `#root` y `/src/main.tsx`; producción HTTP 200 en `/` y en un asset.
6. `client/src/pages/Home.tsx` + `client/src/index.css`: skip-link accesible, `main#contenido`, y guard de `prefers-reduced-motion` para GSAP (que escribe estilos inline). Verificado: Lighthouse accesibilidad 100 y E2E con `matchMedia` reducido.
7. `data/catalogo.json`: campos canónicos de `data/catalogo.mjs` fusionados. Verificado: `validate-catalog.mjs` → `OK entrenador-jorge-bcn: 174 archivos`.
8. `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`: documentación de gobierno real y específica del repo. Verificado: `doctor.py` 47/47.
9. `vitest.config.ts`, `client/tests/booking.e2e.test.tsx`: plugin React para JSX en tests y camino feliz de reserva con `happy-dom` + Testing Library (fetch simulado, aserciones de a11y y limpieza del formulario). Verificado: 18/18 tests.
10. `scripts/verify.mjs` + `package.json`: CLI con `--help` y `--metrics-only` que ejecuta todas las comprobaciones y mide artefactos; `format`/`format:check` se limitan a los patrones versionados y excluyen el lockfile generado. Verificado: `node scripts/verify.mjs --help` → 0 y ejecución completa en verde.
11. `.github/workflows/ci.yml`: pipeline real en push/PR con doctor, catálogo, typecheck, tests, build, formato y artefacto. `README.md`: comandos pnpm coherentes y flujo PR → `main`.

## FASE 5 · Verificación y métricas ANTES / DESPUÉS

Mediciones con Node 22.22.3, pnpm 10.4.1, Vite 7.1.9, Lighthouse 13.6.0 y Chromium aislado 158.0.8127.0 obtenido de `@sparticuz/chromium@158.0.0` (fuera del repo). El primer intento de Lighthouse sin navegador devolvió el error exacto: `Runtime error encountered: The CHROME_PATH environment variable must be set to a Chrome/Chromium executable no older than Chrome stable.`

| Métrica | ANTES | DESPUÉS |
|---|---|---|
| Build HTML | error `parse5 invalid-first-character-of-tag-name`, `index.html 379.08 kB / gzip 109.67 kB`, 5 chunks vacíos, app no montada | sin errores, `index.html 2.23 KiB / gzip 0.89 KiB`, 7 chunks reales, 1715 módulos transformados |
| Runtime Manus inline | 367.081 bytes de React duplicado en cada HTML | 0 bytes (`runtime Manus inline: no`) |
| `pnpm check` | 9 errores (3 TS2345 + 6 TS18046), exit 2 | 0 errores, exit 0 |
| `pnpm test` | 17 tests / 5 archivos, 0 E2E | 18 tests / 6 archivos, 1 E2E del camino feliz |
| `python3 scripts/doctor.py` | 43/47, exit 1 | 47/47, exit 0 |
| `validate-catalog.mjs` | `FALLA / json y mjs no coinciden`, exit 1 | `OK entrenador-jorge-bcn: 174 archivos`, exit 0 |
| `pnpm format:check` | 89 archivos con aviso, exit 1 | 0 avisos, exit 0 |
| CI | `echo "CI placeholder"` | 9 pasos verificables + artefacto |
| Servidor producción | `serveStatic` apuntaba a `server/public` inexistente | `/` y assets HTTP 200 con `NODE_ENV=production` |
| Lighthouse móvil (default throttling) | no medible: la app no se montaba | performance 89 · accesibilidad 100 · prácticas 96 · SEO 100 |
| Lighthouse desktop | no medible | performance 100 · accesibilidad 100 · prácticas 96 · SEO 100 |
| Lighthouse FCP / LCP / TBT / CLS (desktop) | no medible | 0,6 s / 0,6 s / 0 ms / 0 |
| Lighthouse FCP / LCP / TBT / CLS (móvil) | no medible | 3,0 s / 3,0 s / 60 ms / 0 |
| Artefactos totales | 379,08 kB HTML útil + 5 chunks vacíos | 2,23 KiB HTML + 671,86 KiB assets (201,59 KiB gzip) |

Comando de verificación único: `node scripts/verify.mjs` → seis comprobaciones en verde, 17,46 s.

### Nota sobre el objetivo Lighthouse ≥ 95 en móvil

No se alcanza con la configuración por defecto de Lighthouse (89). Evidencia de la causa: FCP observado 187 ms pero FCP simulado 3,0 s bajo throttling móvil, con ~180 KiB gzip de JavaScript inicial y tres solicitudes a hosts externos bloqueados en este sandbox (`ERR_CONNECTION_CLOSED` en `fonts.googleapis.com`, `images.unsplash.com` y `jorgefit-zvv3n2zn.manus.space`). Se probaron dos alternativas reales: quitar el `@import` remoto de fuentes (780 ms menos de bloqueo, SEO y estabilidad ganados) y añadir un shell estático del hero (empeoró LCP a 5,5 s por sustitución de contenido; revertido). La app es client-side rendering y no hay SSR en el stack actual; alcanzar 95 en móvil exigiría prerenderizado o reducir el JS inicial, cambios de arquitectura fuera del alcance de una reparación sin regresiones. Se entrega desktop 100 y accesibilidad 100 como alternativa verificable.

## FASE 6 · Entrega

Contrato cumplido: build limpio, tests verdes, doctor y catálogo en verde, formato limpio, CI real, HTML de entrada reparado, servidor de producción funcional, métricas documentadas y publicación preparada desde la rama de trabajo contra `main`.

Riesgos pendientes: credenciales de Resend/Base de datos/OAuth fuera del repo (necesarias para notificaciones y backend), dependencia de hosts de imágenes externos, aviso de peer dependency preexistente de `@builder.io/vite-plugin-jsx-loc` con Vite 7, aviso de deprecación de Recharts 2, y `gitleaks` no instalado localmente (sí se ejecuta en el workflow `hygiene.yml` de CI).
