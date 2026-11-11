# SRS — Sitio comercial de entrenamiento

## Superficie
La aplicación React/Vite servida por client/src; Express/tRPC y MySQL permanecen como backend de captación.

## Requisitos funcionales
1. La página principal presenta servicios y precios ya existentes, método de trabajo, zona de atención, formulario de consulta y solicitud de sesión.
2. El formulario de consulta invoca leads.create, notifica a Jorge por el canal interno o email, informa si falla la notificación y solo se limpia después de guardar.
3. El formulario de sesión invoca bookings.create; no anuncia confirmación de cita antes de que Jorge confirme disponibilidad.
4. Las horas solicitadas siguen limitadas a las franjas soportadas por el servidor.
5. La galería no etiqueta imágenes ilustrativas como transformaciones o casos reales.
6. El asistente responde con orientación general, muestra sus límites y enlaza con la reserva cuando corresponde.
7. La navegación y acciones son utilizables por teclado y en pantallas pequeñas; las animaciones respetan movimiento reducido.

## Requisitos de calidad
- Mantener React, TypeScript, Vite, Express, tRPC y MySQL.
- No introducir datos personales, credenciales o afirmaciones comerciales no verificadas.
- Mantener el contraste y el tamaño mínimo de objetivos táctiles descritos en AGENTS.md.
- Una instalación configurada debe poder compilar el frontend y el servidor con el comando documentado.

## Restricciones operativas
La persistencia exige DATABASE_URL. El email de producción requiere las variables documentadas en email-setup.md. La identidad pública completa, dirección de contacto y materiales autorizados dependen de Jorge.
