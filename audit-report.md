# Auditoría de la landing de Jorge

## Alcance

Se revisaron el código TypeScript, los tests, el build de producción, el esquema y las tablas de base de datos, la sincronización con GitHub, la publicación en `belentani7/entrenador-jorge-bcn`, la composición visual desktop y móvil, el hero sin cabeza, los metadatos SEO, GSAP/ScrollTrigger, los formularios, los logs de consola y red, el formato del código y la ausencia de secretos rastreados.

## Resultados técnicos

| Comprobación | Resultado | Evidencia |
|---|---|---|
| TypeScript | OK | `pnpm check` sin errores |
| Tests | OK | 2 archivos, 3 tests correctos |
| Build | OK | `pnpm build` correcto |
| Bundle | Mejorado | Chunk principal reducido de aproximadamente 806 kB a aproximadamente 505 kB; se añadieron chunks manuales para React, tRPC, motion, iconos y UI |
| Formato | OK | Prettier sin advertencias después de la corrección |
| Diff | OK | `git diff --check` sin errores |
| Base de datos | OK | Tablas `users`, `leads`, `bookings` y migraciones presentes |
| GitHub | OK | Repo renombrada a `belentani7/entrenador-jorge-bcn`; `main` apunta al commit publicado más reciente |
| Hero | OK | Imagen generada de cuerpo desde cuello hacia abajo, sin cabeza ni rostro visible |
| Responsive | OK visual | Capturas desktop 1280×720 y móvil 390×844 |
| SEO | OK básico | `lang=es`, title, description, Open Graph y JSON-LD de negocio local |
| GSAP | Parcial verificado | Dependencia, registro de plugin y hooks de ScrollTrigger presentes; las animaciones se revisaron visualmente en preview |
| Consola | Sin errores nuevos observados | Los logs conservan errores históricos del antiguo Google Maps; el componente ya fue sustituido por fallback accesible |

## Pendientes deliberados

La activación del email transaccional queda para el último paso de Jorge mediante `RESEND_API_KEY` y `JORGE_EMAIL`. También se mantienen pendientes los materiales reales autorizados para testimonios y transformaciones, porque no se deben inventar fotos, citas ni valoraciones. El nuevo nombre de marca distinto de “JORGE” requiere que Jorge indique el texto exacto.

## Publicación

La versión auditada se publicó en la rama principal de la repo renombrada: `https://github.com/belentani7/entrenador-jorge-bcn`.
