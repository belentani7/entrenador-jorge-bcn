/** Booking uniqueness must be enforced by MySQL, never by a preflight SELECT. */
export const BOOKING_SLOT_INDEX = "bookings_confirmedSlot_unique";

export class BookingSlotConflictError extends Error {
  constructor() {
    super("Ese horario ya está reservado. Elige otro momento.");
    this.name = "BookingSlotConflictError";
  }
}

/** mysql2/Drizzle can wrap the original duplicate-key error in `cause`. */
export function isBookingSlotDuplicate(error: unknown): boolean {
  const visited = new Set<unknown>();
  let current = error;
  while (current && typeof current === "object" && !visited.has(current)) {
    visited.add(current);
    const value = current as { code?: unknown; errno?: unknown; cause?: unknown };
    if (value.code === "ER_DUP_ENTRY" || value.errno === 1062) return true;
    current = value.cause;
  }
  return false;
}

/** Fail closed if the migration has not installed the expected unique index. */
export function hasConfirmedSlotUniqueIndex(rows: unknown): boolean {
  if (!Array.isArray(rows) || rows.length !== 1) return false;
  const row = rows[0];
  if (!row || typeof row !== "object") return false;
  const result = row as { indexCount?: unknown; correctCount?: unknown };
  return Number(result.indexCount) === 1 && Number(result.correctCount) === 1;
}
