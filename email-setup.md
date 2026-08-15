# Activación de emails

La web ya tiene preparado el flujo de confirmación al usuario y aviso al propietario. Sin credenciales, el sistema no intenta enviar correos y conserva el fallback interno.

## Variables necesarias

`RESEND_API_KEY`: clave de API del proveedor Resend.

`JORGE_EMAIL`: dirección que recibirá los avisos de nuevas reservas.

`EMAIL_FROM`: remitente opcional. Si se omite, el sistema usa `Jorge Performance <onboarding@resend.dev>` para el modo de prueba del proveedor.

## Estados devueltos

El backend informa `emailSent` para la confirmación del usuario, `ownerNotified` para el aviso a Jorge y `ownerNotificationChannel` con uno de estos valores: `internal`, `email` o `none`.

Mientras no existan credenciales, los formularios muestran su confirmación de interfaz, la reserva se guarda y el sistema devuelve `none` para el canal externo sin lanzar un envío ficticio.

## Pendiente de Jorge

Introducir las credenciales desde la gestión de secretos del proyecto y realizar una reserva de prueba con una dirección controlada. No publicar credenciales en GitHub ni en archivos `.env` versionados.
