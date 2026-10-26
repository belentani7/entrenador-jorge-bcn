import { describe, expect, it } from "vitest";
import { barcelonaCalendarDate } from "./barcelonaDate";

describe("Barcelona booking date", () => {
  it.each([
    ["2026-03-28T23:30:00Z", "2026-03-29"],
    ["2026-03-29T22:30:00Z", "2026-03-30"],
    ["2026-10-24T22:30:00Z", "2026-10-25"],
    ["2026-10-25T23:30:00Z", "2026-10-26"],
    ["2026-10-26T00:30:00Z", "2026-10-26"],
  ])("uses the Barcelona calendar at %s", (timestamp, expected) => {
    expect(barcelonaCalendarDate(new Date(timestamp))).toBe(expected);
  });
});
