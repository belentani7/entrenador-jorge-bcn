

<!-- repo-forge:docs-arquitectura:inicio -->
# Arquitectura

## Tipo

aplicación web con build (Next/Vite/Expo)

## Piezas observadas

| Pieza | Evidencia |
|---|---|
| Lenguajes | JavaScript 47.2%, TypeScript 20.8%, YAML 17.3%, CSS 7.9%, HTML 3.8%, JSON 1.7% |
| Puntos de entrada | ninguno detectado |
| Páginas HTML | 8 |
| Tests | 6 archivos |
| Dependencias de paquete | 65 |

## Capas propuestas

```text
contenido/      datos y textos versionados
plataforma/     ficha, diseño y contrato del producto
brand/          tokens, marca y activos
scripts/        verificación y operación
tests/          pruebas ejecutables
```

La propuesta no mueve archivos existentes: describe dónde debe vivir lo nuevo para que
el repositorio siga siendo legible.

## Deuda declarada

- 6 lenguajes: coste de contexto alto.

<!-- repo-forge:arquitectura -->
<!-- repo-forge:docs-arquitectura:fin -->
