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

  it("requires a single unique stored-generated confirmedSlot with the expected expression", () => {
    const valid = {
      indexCount: 1,
      correctCount: 1,
      generatedExtra: "STORED GENERATED",
      generationExpression: "CASE WHEN (`status` = 'confirmed') THEN CONCAT(`date`, 'T', `time`) ELSE NULL END",
      columnType: "varchar",
      columnLength: 16,
      nullable: "YES",
    };
    expect(hasConfirmedSlotUniqueIndex([valid])).toBe(true);
    expect(hasConfirmedSlotUniqueIndex([{
      ...valid,
      indexCount: "1",
      correctCount: "1",
      columnLength: "16",
      generationExpression: "case when (`status` = _utf8mb4'confirmed') then concat(`date`,_utf8mb4'T',`time`) else NULL end",
    }])).toBe(true);

    // An ordinary writable column with a matching unique index is not safe.
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, generatedExtra: "", generationExpression: "" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, generatedExtra: "VIRTUAL GENERATED" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, columnLength: 8 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, nullable: "NO" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, columnType: "text" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, indexCount: 2 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, correctCount: 0 }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, indexCount: true }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, indexCount: "1e0" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, generationExpression:
      "CASE WHEN status = 'pending' THEN CONCAT(date,'T',time) ELSE NULL END" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([{ ...valid, generationExpression:
      "CASE WHEN status = 'confirmed' THEN CONCAT(date,'T',email) ELSE NULL END" }])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex([])).toBe(false);
    expect(hasConfirmedSlotUniqueIndex(null)).toBe(false);
  });

  it("returns a non-sensitive customer-facing conflict message", () => {
    const error = new BookingSlotConflictError();
    expect(error.name).toBe("BookingSlotConflictError");
    expect(error.message).toContain("horario ya está reservado");
  });
});
