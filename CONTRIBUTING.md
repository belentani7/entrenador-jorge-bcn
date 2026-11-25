# Contribuir a entrenador-jorge-bcn

Gracias por ayudar a mantener la landing de Jorge. Este documento describe el flujo mínimo de trabajo y las comprobaciones que deben pasar antes de abrir una PR.

## Antes de empezar

1. Lee `BIBLIA.md`, `plataforma/FICHA.md` y `AGENTS.md`.
2. Instala las dependencias con `corepack pnpm install --frozen-lockfile` (Node 22, ver `.nvmrc`).
3. Crea una rama desde `main` con nombre descriptivo, por ejemplo `fix/formulario-reserva`.

## Comandos

| Comando | Qué hace |
|---|---|
| `pnpm dev` | Arranca Vite y el servidor Express en modo desarrollo. |
| `pnpm check` | Typecheck estricto de `client`, `server` y `shared`. |
| `pnpm test` | Suite Vitest (unitaria + DOM del camino feliz). |
| `pnpm build` | Compila el frontend y empaqueta el servidor con esbuild. |
| `pnpm format:check` | Comprueba el formato con Prettier. |
| `python3 scripts/doctor.py` | Auditoría de estructura del repositorio. |
| `node scripts/validate-catalog.mjs` | Comprueba que `data/catalogo.json` y `data/catalogo.mjs` coinciden. |
| `node scripts/verify.mjs` | Ejecuta todo lo anterior y muestra métricas de artefactos (`--help`). |

## Protocolo de cambio

- Un cambio, un resultado verificable. No mezcles refactors con correcciones funcionales.
- Sigue spec-first cuando el cambio afecte al producto: PRD → SRS → diseño → ADR → plan → tests GWT.
- Añade o actualiza tests para toda lógica modificada.
- No subas secretos, claves ni datos personales de clientes. Si necesitas credenciales, usa variables de entorno y documenta el nombre, nunca el valor.
- Usa commits convencionales: `type(scope): resumen` (`feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`, `style`).
- Abre la PR contra `main`. El workflow de CI debe estar en verde antes de fusionar.

## Contenido

No se publican testimonios, valoraciones ni transformaciones inventadas. Las imágenes ilustrativas no deben presentarse como clientes reales. La firma técnica del proyecto es `belentani.eu · Pedro Belentani · noiacore.com`.

## Reportar problemas

Usa las plantillas de `.github/ISSUE_TEMPLATE/` e incluye comandos ejecutados, error exacto y versión de Node/pnpm. Para cuestiones de seguridad, sigue `SECURITY.md` en lugar de abrir un issue público.
