# Sitio comercial de entrenamiento — Plan de implementación

> Para agentes: ejecutar cada tarea de forma secuencial; no añadir migraciones fuera del alcance.

**Objetivo:** dejar coherente y utilizable el embudo comercial existente de entrenamiento personal de Jorge.

**Arquitectura:** React/Vite continúa sirviendo la landing; Express/tRPC conserva la captación. Las solicitudes de reserva se guardan como pendientes y el contenido público evita señales no verificadas.

**Stack:** React 19, TypeScript, Vite, Express, tRPC, Drizzle/MySQL.

**Spec:** docs/product/DESIGN.md

## Restricciones globales
- Conservar los procedimientos leads.create y bookings.create.
- No añadir testimonios, resultados, contacto o identidad no verificados.
- Mantener el movimiento reducido y la accesibilidad de la interfaz.

## Archivos
- Modificar client/src/pages/Home.tsx y client/src/index.css: copy, datos estructurados, visual de progreso y estados de reserva.
- Modificar server/routers.ts y server/email.ts: avisar a Jorge por el canal interno o email; persistir las nuevas reservas como pendientes; escapar los detalles incluidos en email HTML.
- Modificar server/db.ts: considerar solicitudes activas al revisar una franja.
- Crear este conjunto de documentos de producto.
- No tocar los HTML duplicados que ya están modificados en el árbol de trabajo.

## Tareas
1. Actualizar Home.tsx: retirar datos públicos de ejemplo, corregir JSON-LD, reemplazar el comparador de fotos por una presentación honesta del método y alinear los mensajes de reserva con una solicitud pendiente.
2. Actualizar server/routers.ts y server/email.ts para notificar consultas y reservas, y guardar reservas nuevas en estado pending.
3. Actualizar server/db.ts para que solicitudes pendientes o confirmadas impidan ofrecer la misma franja; las canceladas liberan la franja.
4. Revisar la diferencia y ejecutar pnpm check y pnpm build si las dependencias están disponibles. No ejecutar pruebas en este trabajo.

## Revisión final
- No queda el teléfono, email o dominio de demostración en la página React ni en sus datos estructurados.
- El comparador de stock ya no afirma que las imágenes sean transformaciones de clientes.
- Las solicitudes nuevas se escriben como pending.
- Se conserva la notificación y respuesta de éxito/error de cada formulario.
