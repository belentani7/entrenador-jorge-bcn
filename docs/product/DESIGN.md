# Diseño — Canal comercial de Jorge

## Intención y enfoque
Se conserva la aplicación full stack existente, que ya concentra la landing y los flujos tRPC. La intervención aclara la oferta y el estado de la reserva, elimina datos públicos inventados y evita que las imágenes de archivo parezcan evidencia de resultados.

## Alternativas consideradas
- Crear una aplicación SaaS separada: no encaja con la marca, la landing ni el backend de captación existente.
- Sustituirlo por páginas HTML estáticas: perdería los formularios y la integración tRPC ya implementados.
- Completar el embudo existente: elegido por conservar el producto, el stack y las rutas funcionales.

## Estructura de experiencia
- Inicio y CTA de reserva.
- Historia y método.
- Servicios con precios publicados.
- Bloque informativo de progreso sin comparaciones visuales que sugieran resultados reales.
- Solicitud de sesión y consulta.
- Historias reales únicamente cuando haya contenido autorizado.
- Ubicación general y asistente.

## Decisiones
- Una solicitud de sesión queda pending hasta confirmación del entrenador.
- No se publica teléfono, email, URL ni perfil social sin verificar.
- Los resultados, testimonios y fotografías de clientes no se inventan.
- Se mantienen las rutas y procedimientos tRPC actuales.

## Límites
La identidad fiscal, contacto para derechos de privacidad, políticas comerciales finales, disponibilidad real, email saliente y materiales autorizados no se pueden inferir del repositorio.
