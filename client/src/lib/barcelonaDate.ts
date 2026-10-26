/** Booking dates must follow the studio's Europe/Madrid calendar, not the visitor's device timezone. */
const barcelonaDateFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Madrid",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function barcelonaCalendarDate(now: Date = new Date()): string {
  const parts = Object.fromEntries(
    barcelonaDateFormatter.formatToParts(now).map(part => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}
