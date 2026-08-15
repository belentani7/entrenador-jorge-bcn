# Project TODO

- [x] Landing de alto impacto para Jorge, entrenador personal en Barcelona
- [x] Hero de pantalla completa con imagen fitness generada/licenciada y CTA de reserva
- [x] Identidad naranja intensa, tipografía bold y composición mobile-first
- [x] Navegación sticky con logo, anclas de secciones y CTA destacado
- [x] Storytelling de dedicación, filosofía de entrenamiento y transformación
- [x] Servicios: entrenamiento personal, online, nutrición y planes grupales
- [x] Cards de servicios con iconos, descripción y precio orientativo
- [ ] Galería antes/después con slider interactivo y aviso de consentimiento
- [ ] Testimonios con carrusel, fotos reales solo si existen y valoraciones verificables
- [x] Formulario de leads con nombre, email, teléfono, objetivo y horario preferido
- [ ] Validación de formulario y confirmación automática de envío
- [x] Sistema de reserva de prueba gratuita con selección de fecha y hora
- [x] Prevención de solapamiento de reservas y confirmación de reserva
- [ ] Notificación automática al propietario Jorge en cada reserva confirmada
- [x] SEO local Barcelona: title, description, Open Graph, JSON-LD y datos de contacto
- [x] Sección de ubicación con mapa de Barcelona integrado
- [x] Animaciones GSAP/ScrollTrigger: parallax, reveals, contadores y transiciones
- [x] Respeto de prefers-reduced-motion y accesibilidad básica
- [x] Responsive 100% mobile-first y verificación visual en desktop/móvil
- [x] Tests Vitest para validación y procedimientos de captación/reserva
- [ ] Revisión de rendimiento, errores de consola y build: build OK; falta cerrar la revisión histórica de consola
- [ ] Checkpoint final antes de entregar
- [ ] Implementar confirmación automática real por email al usuario tras lead/reserva
- [ ] Sustituir galería genérica por módulo de antes/después con consentimiento visible
- [ ] Implementar carrusel de testimonios sin inventar citas, fotos ni valoraciones
- [ ] Configurar canal explícito para Jorge y gestionar fallos de notificación
- [x] Optimizar bundle y revisar rendimiento: chunk principal reducido a ~505 kB y warning eliminado del build

## Notas de contenido

- Todos los textos de la interfaz estarán en español.
- No se fabricarán testimonios, valoraciones ni fotos de clientes reales. Se usarán únicamente materiales proporcionados, generados como material ilustrativo claramente etiquetado o recursos con licencia verificable.
- Las automatizaciones de email/notificación dependerán de los servicios y secretos disponibles en el proyecto; si falta una credencial, se documentará como requisito de configuración.
- El hero podrá usar una imagen generada de un hombre adulto con ropa de gimnasio, abdomen marcado, piel canela y sin vello, evitando presentar la imagen como cliente real.

## Historial

- [x] Proyecto full stack inicializado en `/home/ubuntu/entrenador-jorge-bcn`
- [x] Requisitos del usuario y materiales adjuntos revisados
- [ ] Activar al final el email transaccional de confirmación al usuario y aviso por correo a Jorge mediante proveedor configurado
- [ ] Último paso manual para Jorge: introducir RESEND_API_KEY y JORGE_EMAIL cuando decida activar los emails
- [x] Revisar repos propias; belentani-099 no contiene licencia de terceros y se usa como repo del usuario
- [ ] Confirmar el nuevo nombre exacto de marca si Jorge quiere sustituir “JORGE”
- [x] Editar el hero para mostrar solo el cuerpo del modelo sin la cabeza
- [x] Verificar que GSAP/ScrollTrigger y el responsive siguen funcionando tras los cambios
- [x] Publicar la versión de Jorge en la rama `manus-jorge-landing` de la repo propia belentani-099
- [ ] Confirmar el nuevo nombre exacto de marca si Jorge quiere sustituir “JORGE”
- [x] Editar el hero para mostrar solo el cuerpo del modelo sin la cabeza
- [x] Verificar que GSAP/ScrollTrigger y el responsive siguen funcionando tras los cambios
- [x] Localizar una repo propia existente y vacía para publicar la landing
- [x] Renombrar la repo vacía con un nombre disponible para el proyecto de Jorge
- [x] Publicar y verificar la landing en la repo renombrada
- [x] Auditoría completa de TypeScript, tests, build, esquema y migraciones
- [x] Auditoría de GitHub, rama publicada y repo propia seleccionada
- [x] Auditoría visual desktop y móvil, incluyendo hero sin cabeza
- [ ] Auditoría runtime: consola, red, GSAP/ScrollTrigger y formularios; falta una prueba de interacción real en navegador
- [ ] Auditoría SEO, accesibilidad, responsive y rendimiento; falta revisión automatizada completa de accesibilidad
- [x] Corregir fallos detectados por los checks: formato, fallback de mapa y división de chunks
- [x] Documentar resultados y guardar checkpoint auditado
