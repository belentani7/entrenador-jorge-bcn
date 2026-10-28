import { describe, expect, it } from "vitest";
import {
  BookingSlotConflictError,
  hasConfirmedSlotUniqueIndex,
  isBookingSlotDuplicate,
} from "./booking-constraints";

describe("atomic MySQL booking constraint", () => {
  it("recognizes duplicate-key error codes and mysql2 errno", () => {
    expect(isBookingSlotDuplicate({ code: "ER_DUP_ENTRY" })).toBe(true);
    expect(isBookingSlotDuplicate({ errno: 1062 })).toBe(true);
    expect(isBookingSlotDuplicate({ code: "ER_LOCK_DEADLOCK", errno: 1213 })).toBe(false);
  });

  it("recognizes nested driver causes without looping on cyclic errors", () => {
    expect(isBookingSlotDuplicate({ cause: { errno: 1062 } })).toBe(true);
    const cyclic: { cause?: unknown } = {};
    cyclic.cause = cyclic;
    expect(isBookingSlotDuplicate(cyclic)).toBe(false);
  });

  it("requires exactly one unique confirmedSlot index column", () => {
    expect(hasConfirmedSlotUniqueIndex([{ indexCount: 1, correctCount: 1 }])).toBe(true);
    expect(hasConfirmedSlotUniqueIndex([{ indexCount: "1", correctCount: "1" }])).toBe(true);
    expect(hasConfirmedSlotUniqueIndex([{ indexCount: 0, correctCount: 0 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ indexCount: 2, correctCount: 1 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ indexCount: 1, correctCount: 0 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex(null)).toBe(false);
  });

  it("returns a non-sensitive customer-facing conflict message", () => {
    const error = new BookingSlotConflictError();
    expect(error.name).toBe("BookingSlotConflictError");
    expect(error.message).toContain("horario ya está reservado");
  });
});
