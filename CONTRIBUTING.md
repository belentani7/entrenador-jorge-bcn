# Contribuir

## Flujo

1. Abre un issue describiendo el problema o la propuesta.
2. Crea una rama corta: `feat/...`, `fix/...` o `docs/...`.
3. Aplica el protocolo spec-first y añade tests.
4. Ejecuta la verificación local.
5. Abre un PR completando la checklist de `.github/pull_request_template.md`.

## Comandos

- `dev`: `NODE_ENV=development tsx watch server/_core/index.ts`
- `build`: `vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- `start`: `NODE_ENV=production node dist/index.js`
- `check`: `tsc --noEmit`
- `format`: `prettier --write .`
- `format:check`: `prettier --check 'client/src/**/*.{ts,tsx,css}' 'server/**/*.{ts,tsx}' 'shared/**/*.{ts,tsx}' '*.json' '*.ts' '*.yaml'`
- `test`: `vitest run`
- `quality`: `pnpm check && pnpm test && pnpm build && pnpm format:check`
- `db:push`: `drizzle-kit generate && drizzle-kit migrate`

## Reglas

- Conventional commits.
- Sin secretos ni credenciales.
- Un cambio reversible por PR.
- Revisión de `@belentani7` y CI verde.
