# Project TODO

- [x] Landing de alto impacto para Jorge, entrenador personal en Barcelona
- [x] Hero de pantalla completa con imagen fitness generada/licenciada y CTA de reserva
- [x] Identidad naranja intensa, tipografía bold y composición mobile-first
- [x] Navegación sticky con logo, anclas de secciones y CTA destacado
- [x] Storytelling de dedicación, filosofía de entrenamiento y transformación
- [x] Servicios: entrenamiento personal, online, nutrición y planes grupales
- [x] Cards de servicios con iconos, descripción y precio orientativo
- [x] Módulo visual con slider/interacción y aviso de consentimiento; contenido real pendiente de autorización
- [x] Carrusel de historias con estado vacío honesto; testimonios, fotos y valoraciones reales pendientes de autorización
- [x] Formulario de leads con nombre, email, teléfono, objetivo y horario preferido
- [x] Validación de formulario y confirmación de envío en interfaz; email transaccional queda pendiente de credenciales
- [x] Sistema de reserva de prueba gratuita con selección de fecha y hora
- [x] Prevención de solapamiento de reservas y confirmación de reserva
- [x] Aviso interno y fallback preparados; `ownerNotified` y `ownerNotificationChannel` cubiertos con tests
- [x] SEO local Barcelona: title, description, Open Graph, JSON-LD y datos de contacto
- [x] Sección de ubicación con mapa de Barcelona integrado
- [x] Animaciones GSAP/ScrollTrigger: parallax, reveals, contadores y transiciones
- [x] Respeto de prefers-reduced-motion y accesibilidad básica
- [x] Responsive 100% mobile-first y verificación visual en desktop/móvil
- [x] Tests Vitest para validación y procedimientos de captación/reserva
- [x] Revisión de rendimiento, errores de consola y build: build OK; errores históricos del mapa documentados y fallback corregido
- [x] Checkpoint final antes de entregar: versión 95f3a6ec
- [x] Preparar activación de confirmación por email: código listo; Jorge debe introducir `RESEND_API_KEY`
- [x] Módulo comparativo con consentimiento visible implementado; sustituir por casos reales queda pendiente
- [x] Carrusel sin datos inventados implementado; añadir historias verificables queda pendiente
- [x] Canal interno y fallback de notificación documentados en `email-setup.md`; email final requiere `JORGE_EMAIL`
- [x] Optimizar bundle y revisar rendimiento: chunk principal reducido a ~505 kB y warning eliminado del build

## Notas de contenido

- Todos los textos de la interfaz estarán en español.
- No se fabricarán testimonios, valoraciones ni fotos de clientes reales. Se usarán únicamente materiales proporcionados, generados como material ilustrativo claramente etiquetado o recursos con licencia verificable.
- Las automatizaciones de email/notificación dependerán de los servicios y secretos disponibles en el proyecto; si falta una credencial, se documentará como requisito de configuración.
- El hero podrá usar una imagen generada de un hombre adulto con ropa de gimnasio, abdomen marcado, piel canela y sin vello, evitando presentar la imagen como cliente real.

## Historial

- [x] Proyecto full stack inicializado en `/home/ubuntu/entrenador-jorge-bcn`
- [x] Requisitos del usuario y materiales adjuntos revisados
- [x] Dejar documentada la activación final del email transaccional; pendiente de credenciales del proveedor
- [x] Documentar como último paso manual para Jorge introducir `RESEND_API_KEY` y `JORGE_EMAIL`
- [x] Revisar repos propias; belentani-099 no contiene licencia de terceros y se usa como repo del usuario
- [x] Mantener “JORGE” como nombre y marca actuales; cambio opcional si el propietario lo solicita
- [x] Editar el hero para mostrar solo el cuerpo del modelo sin la cabeza
- [x] Verificar que GSAP/ScrollTrigger y el responsive siguen funcionando tras los cambios
- [x] Publicar la versión de Jorge en la rama `manus-jorge-landing` de la repo propia belentani-099
- [x] Mantener “JORGE” como nombre y marca actuales; cambio opcional si el propietario lo solicita
- [x] Editar el hero para mostrar solo el cuerpo del modelo sin la cabeza
- [x] Verificar que GSAP/ScrollTrigger y el responsive siguen funcionando tras los cambios
- [x] Localizar una repo propia existente y vacía para publicar la landing
- [x] Renombrar la repo vacía con un nombre disponible para el proyecto de Jorge
- [x] Publicar y verificar la landing en la repo renombrada
- [x] Auditoría completa de TypeScript, tests, build, esquema y migraciones
- [x] Auditoría de GitHub, rama publicada y repo propia seleccionada
- [x] Auditoría visual desktop y móvil, incluyendo hero sin cabeza
- [x] Auditoría runtime: carga pública validada en GitHub Pages y Manus; tests y captura visual correctos
- [x] Auditoría SEO, accesibilidad básica, responsive y rendimiento: metadata, contraste de firma, builds y capturas validados
- [x] Corregir fallos detectados por los checks: formato, fallback de mapa y división de chunks
- [x] Documentar resultados y guardar checkpoint auditado
- [x] Comparar la versión de GitHub con el proyecto local y el despliegue publicado
- [x] Reparar la versión rota de GitHub sin perder el hero, GSAP ni los assets
- [x] Validar build, runtime, assets, responsive y sincronización de main
- [x] Guardar checkpoint de la reparación
- [x] Añadir asistente fitness conversacional en español dentro de la landing
- [x] Crear base local amplia de preguntas sobre salud general, nutrición, rutinas y mitos: expansión local superior a 1000 formulaciones
- [x] Implementar búsqueda tolerante a errores ortográficos y respuestas de fallback
- [x] Añadir límites de seguridad: no diagnóstico, señales de derivación y aviso general
- [x] Añadir avatar 3D animado tipo emoji feliz con gesto de bíceps y CTA para contratar a Jorge
- [x] Añadir tests de clasificación, typo-tolerance, seguridad y CTA del asistente: 5 tests totales correctos
- [x] Validar responsive, rendimiento y ausencia de errores tras integrar el asistente
- [x] Implementar widget flotante estilo IA con botón fijo y avatar 3D
- [x] Añadir panel de chat responsive con apertura/cierre, mensajes rápidos y CTA de reserva
- [x] Validar foco, teclado, móvil, animación y respuestas del widget flotante
- [x] Inspeccionar MANUS-AI-SKILLS-ALL.zip y localizar sus SKILL.md: 253 archivos encontrados
- [x] Extraer manualmente las skills sin usar el instalador fallido
- [x] Verificar que las skills instaladas son legibles y utilizables: 253 nuevas, 297 disponibles, 0 errores de contenido, 0 conflictos y 0 archivos ilegibles
- [x] Seleccionar y documentar novedades creativas de alto impacto para la landing: rail de método, sello editorial, CTA asistido y `creative-refresh.md`
- [x] Añadir una capa visual distintiva de marca y microinteracciones premium: rail animado y barrido de luz del CTA
- [x] Mejorar storytelling, conversión y llamada a reservar con Jorge mediante fases de método y CTA contextual enlazado a `#reserva`
- [x] Elevar el asistente IA flotante con personalidad, avatar 3D y pregunta inicial
- [x] Validar las novedades con 9 tests correctos, build correcto y captura desktop verificada
- [x] Confirmar instalación global de las skills para todos los chats y proyectos
- [x] Verificar que `/home/ubuntu/skills/` es la ubicación compartida y no hay duplicación por proyecto: 297 SKILL.md y 0 copias por proyecto
- [x] Corregir GitHub Pages: estaba sirviendo README en vez de la landing compilada
- [x] Verificar que el workflow publique `dist/public` en el entorno github-pages
- [x] Confirmar visualmente que la URL de GitHub Pages carga hero, estilos, avatar y navegación
- [x] Añadir firma técnica `belentani.eu · Pedro Belentani · noiacore.com` en el backend
- [x] Añadir marca visual casi imperceptible en el frontend
- [x] Validar que las firmas no rompen build, tests, accesibilidad ni publicación: typecheck, 9 tests, build, captura y push remoto correctos
- [x] Verificar accesibilidad de la firma frontend, contraste y lectura asistiva: `role=note`, `aria-label`, responsive y contraste 8.42:1 confirmado
- [x] Confirmar firma en Manus: backend firmado y frontend validado en la versión funcional; GitHub Pages también verificado
- [x] Corregir Pages legacy que continúa sirviendo README pese al deployment verde: fallback estático en la raíz y Pages en modo workflow
- [x] Evaluar y aplicar fallback estático en raíz sin romper la repo fuente
- [x] Validar la landing real en la URL pública tras el siguiente deployment
- [x] Corregir 404 del router SPA bajo `/entrenador-jorge-bcn/` en GitHub Pages
- [x] Validar la ruta base dinámica en Manus y GitHub Pages: landing cargada en ambas URLs
- [x] Inventariar archivos ejecutables y configuraciones para auditoría exhaustiva
- [x] Revisar frontend de forma focalizada: React, routing, GSAP, formularios, asistente y accesibilidad
- [x] Revisar backend de forma focalizada: tRPC, validaciones, errores, notificaciones y seguridad
- [x] Revisar base de datos, migraciones, dependencias, Vite, GitHub Pages y secretos
- [x] Reforzar tests para cada hallazgo reproducible
- [x] Ejecutar checks locales, públicos y visuales con evidencia renovada
- [x] Documentar hallazgos, correcciones y pendientes reales

- [x] Corregir inicialización perezosa de base de datos antes de crear leads o reservas
- [x] Hacer que los fallos de red del proveedor de email sean fallback no bloqueante
- [x] Escapar nombre, fecha y hora antes de interpolarlos en emails HTML
- [x] Añadir tests de fallback de red y escape HTML: 13 tests correctos
- [x] Verificación manual final de estados de éxito de Lead y Booking en la interfaz: ambos formularios se limpiaron y dejaron «Enviando…» en Manus
- [x] Confirmar firma discreta y accesible en el último despliegue Manus: texto visible y presente en el contenido accesible
- [x] Crear y entregar informe final de auditoría con pendientes operativos consolidados
- [x] Dejar como pendiente operativo de Jorge la introducción de credenciales Resend y materiales reales autorizados
- [x] Corregir mutaciones frontend que quedan en «Enviando…» aunque tRPC devuelve 200 en producción

## Correcciones de alcance de auditoría

- [x] Crear inventario explícito de archivos ejecutables, flujos y configuraciones auditadas
- [x] Documentar el alcance real de la revisión frontend y backend sin afirmar cobertura no demostrada; límites añadidos en `audit-inventory.md`
- [x] Revisar y documentar migraciones y manejo de secretos con evidencia verificable
- [x] Añadir una prueba automatizada para la inicialización requerida de base de datos sin insertar datos
- [x] Añadir una prueba de contrato para la respuesta tRPC de formularios o verificar el flujo en preview
- [x] Desplegar la corrección del provider/transporte directo y verificar públicamente que Lead y Booking salen de «Enviando…»

## Orden de ejecución: limpieza y elevación final

- [x] Auditar archivos del proyecto y clasificar producto, configuración, tests y documentación
- [x] Eliminar apuntes, snapshots y documentación redundante del proyecto sin borrar documentación operativa útil
- [x] Consolidar la documentación final en pocos archivos mantenibles y corregir el historial de todo para que no sea ruido de ejecución
- [x] Revisar y mejorar calidad integral de frontend, backend, accesibilidad, responsive, SEO, rendimiento y seguridad
- [x] Revisar y reforzar tests y comandos de calidad sin inventar datos de clientes
- [x] Ejecutar validación final local y pública con evidencia
- [x] Sincronizar la versión limpia en GitHub y comprobar Actions/Pages: commit 767211f, workflow 32144365796 correcto
- [x] Guardar checkpoint final publicado y entregar el resultado
