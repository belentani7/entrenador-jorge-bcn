# Inventario de auditoría final

## Archivos ejecutables y entrypoints

client/src/App.tsx
client/src/\_core/hooks/useAuth.ts
client/src/components/AIChatBox.tsx
client/src/components/AssistantWidget.tsx
client/src/components/DashboardLayout.tsx
client/src/components/DashboardLayoutSkeleton.tsx
client/src/components/ErrorBoundary.tsx
client/src/components/ManusDialog.tsx
client/src/components/Map.tsx
client/src/components/ui/accordion.tsx
client/src/components/ui/alert-dialog.tsx
client/src/components/ui/alert.tsx
client/src/components/ui/aspect-ratio.tsx
client/src/components/ui/avatar.tsx
client/src/components/ui/badge.tsx
client/src/components/ui/breadcrumb.tsx
client/src/components/ui/button-group.tsx
client/src/components/ui/button.tsx
client/src/components/ui/calendar.tsx
client/src/components/ui/card.tsx
client/src/components/ui/carousel.tsx
client/src/components/ui/chart.tsx
client/src/components/ui/checkbox.tsx
client/src/components/ui/collapsible.tsx
client/src/components/ui/command.tsx
client/src/components/ui/context-menu.tsx
client/src/components/ui/dialog.tsx
client/src/components/ui/drawer.tsx
client/src/components/ui/dropdown-menu.tsx
client/src/components/ui/empty.tsx
client/src/components/ui/field.tsx
client/src/components/ui/form.tsx
client/src/components/ui/hover-card.tsx
client/src/components/ui/input-group.tsx
client/src/components/ui/input-otp.tsx
client/src/components/ui/input.tsx
client/src/components/ui/item.tsx
client/src/components/ui/kbd.tsx
client/src/components/ui/label.tsx
client/src/components/ui/menubar.tsx
client/src/components/ui/navigation-menu.tsx
client/src/components/ui/pagination.tsx
client/src/components/ui/popover.tsx
client/src/components/ui/progress.tsx
client/src/components/ui/radio-group.tsx
client/src/components/ui/resizable.tsx
client/src/components/ui/scroll-area.tsx
client/src/components/ui/select.tsx
client/src/components/ui/separator.tsx
client/src/components/ui/sheet.tsx
client/src/components/ui/sidebar.tsx
client/src/components/ui/skeleton.tsx
client/src/components/ui/slider.tsx
client/src/components/ui/sonner.tsx
client/src/components/ui/spinner.tsx
client/src/components/ui/switch.tsx
client/src/components/ui/table.tsx
client/src/components/ui/tabs.tsx
client/src/components/ui/textarea.tsx
client/src/components/ui/toggle-group.tsx
client/src/components/ui/toggle.tsx
client/src/components/ui/tooltip.tsx
client/src/const.ts
client/src/contexts/ThemeContext.tsx
client/src/hooks/useComposition.ts
client/src/hooks/useMobile.tsx
client/src/hooks/usePersistFn.ts
client/src/lib/fitnessAssistant.test.ts
client/src/lib/fitnessAssistant.ts
client/src/lib/trpc.ts
client/src/lib/utils.ts
client/src/main.tsx
client/src/pages/ComponentShowcase.tsx
client/src/pages/Home.tsx
client/src/pages/NotFound.tsx
server/\_core/context.ts
server/\_core/cookies.ts
server/\_core/dataApi.ts
server/\_core/env.ts
server/\_core/heartbeat.ts
server/\_core/imageGeneration.ts
server/\_core/index.ts
server/\_core/llm.ts
server/\_core/map.ts
server/\_core/notification.ts
server/\_core/oauth.ts
server/\_core/sdk.ts
server/\_core/storageProxy.ts
server/\_core/systemRouter.ts
server/\_core/trpc.ts
server/\_core/types/cookie.d.ts
server/\_core/types/manusTypes.ts
server/\_core/vite.ts
server/\_core/voiceTranscription.ts
server/auth.logout.test.ts
server/db.ts
server/email.test.ts
server/email.ts
server/publicFlows.test.ts
server/routers.ts
server/storage.ts
shared/\_core/errors.ts
shared/const.ts
shared/types.ts

## Configuración y CI

./.github/workflows/pages.yml
./drizzle.config.ts
./node_modules/.modules.yaml
./node_modules/.pnpm/lock.yaml
./package.json
./pnpm-lock.yaml
./tsconfig.json
./vite.config.ts
./vite.config.ts.bak

## Esquema y migraciones

drizzle/0000_smart_hardball.sql
drizzle/0001_ancient_cerebro.sql
drizzle/meta/0000_snapshot.json
drizzle/meta/0001_snapshot.json
drizzle/meta/\_journal.json
drizzle/migrations/.gitkeep
drizzle/relations.ts
drizzle/schema.ts

## Tests

./client/src/lib/fitnessAssistant.test.ts
./server/auth.logout.test.ts
./server/email.test.ts
./server/publicFlows.test.ts

## Flujos revisados

- Captura de lead: client/src/pages/Home.tsx -> leads.create -> server/db.ts -> server/email.ts
- Reserva: client/src/pages/Home.tsx -> bookings.create -> hasBooking/createBooking -> notification/email fallback
- Asistente: client/src/components/AssistantWidget.tsx -> client/src/lib/fitnessAssistant.ts
- Publicación: .github/workflows/pages.yml + static fallback + Manus server build

## Secretos documentados

DATABASE_URL
EMAIL_FROM
JORGE_EMAIL
RESEND_API_KEY

## Alcance y límites de la revisión

La auditoría frontend fue focalizada sobre `client/src/main.tsx`, `client/src/pages/Home.tsx`, `client/src/components/AssistantWidget.tsx`, `client/src/lib/fitnessAssistant.ts`, el routing de la aplicación, el contrato de los formularios y los estados visibles en Manus. También se ejecutaron typecheck, build, tests y comprobaciones de consola y red. No se afirma una revisión manual de cada línea de todos los componentes UI generados por la plantilla.

La auditoría backend fue focalizada sobre `server/routers.ts`, `server/db.ts`, `server/email.ts`, `server/_core/notification.ts`, el esquema Drizzle y las migraciones. Se verificaron validaciones, persistencia, solapamiento de reservas, fallback de notificación, escape HTML y ausencia de credenciales en el repositorio. No se afirma una revisión manual exhaustiva de cada módulo interno de la plantilla ni una auditoría de infraestructura externa fuera de los endpoints comprobados.

La verificación pública confirmó que Manus responde correctamente a peticiones tRPC directas con HTTP 200 y JSON válido. La verificación interactiva previa mostró que ambos botones podían permanecer en «Enviando…»; se corrigió el orden de los providers de React Query/tRPC, pero esa corrección queda pendiente de despliegue y revalidación pública antes del checkpoint final.
