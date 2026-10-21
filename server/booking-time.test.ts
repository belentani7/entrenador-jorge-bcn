import {describe,it,expect} from "vitest";
import {barcelonaNow,isBookableSlot,validCalendarDate} from "./booking-time";

describe("Barcelona studio appointment clock",()=>{
  it("rejects impossible calendar days",()=>{
    expect(validCalendarDate("2026-02-30")).toBe(false);
    expect(validCalendarDate("2026-13-01")).toBe(false);
    expect(validCalendarDate("2026-10-21")).toBe(true);
  });
  it("uses local calendar date instead of UTC near midnight",()=>{
    const afterMidnight=new Date("2026-10-21T22:45:00Z");
    expect(barcelonaNow(afterMidnight)).toEqual({date:"2026-10-22",time:"00:45"});
    expect(isBookableSlot("2026-10-21","19:30",afterMidnight)).toBe(false);
    expect(isBookableSlot("2026-10-22","09:00",afterMidnight)).toBe(true);
  });
  it("uses standard-time clock in winter",()=>{
    expect(barcelonaNow(new Date("2026-12-01T23:30:00Z")))
      .toEqual({date:"2026-12-02",time:"00:30"});
  });
  it("rejects elapsed same-day time slots",()=>{
    const now=new Date("2026-10-21T06:05:00Z");
    expect(isBookableSlot("2026-10-21","07:00",now)).toBe(false);
    expect(isBookableSlot("2026-10-21","09:00",now)).toBe(true);
  });
});
