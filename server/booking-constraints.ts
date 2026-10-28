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

/**
 * Require the actual generated expression, not merely an index with a matching
 * name. A writable or incorrectly generated column would allow two confirmed
 * bookings for the same time while passing a name-only metadata check.
 */
export function hasConfirmedSlotUniqueIndex(rows: unknown): boolean {
  if (!Array.isArray(rows) || rows.length !== 1) return false;
  const row = rows[0];
  if (!row || typeof row !== "object") return false;
  const result = row as Record<string, unknown>;
  const countIsOne = (value: unknown) => value === 1 || value === "1";
  if (!countIsOne(result.indexCount) || !countIsOne(result.correctCount)) return false;
  if (typeof result.generatedExtra !== "string" ||
      !/\bstored\s+generated\b/i.test(result.generatedExtra)) return false;
  if (result.columnType !== "varchar" || !(
    result.columnLength === 16 || result.columnLength === "16"
  ) || result.nullable !== "YES") return false;
  if (typeof result.generationExpression !== "string") return false;

  // MySQL can add charset introducers, backticks and grouping parentheses to
  // the canonical expression returned by information_schema.COLUMNS.
  const expression = result.generationExpression
    .toLowerCase()
    .replace(/_utf8mb[34]/g, "")
    .replace(/[`\s()]/g, "");
  return expression === "casewhenstatus='confirmed'thenconcatdate,'t',timeelsenullend";
}
