import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const context = {
  user: null,
  req: {} as TrpcContext["req"],
  res: {} as TrpcContext["res"],
} as TrpcContext;

describe("public lead and booking flows", () => {
  it("rejects incomplete lead data", async () => {
    const caller = appRouter.createCaller(context);
    await expect(
      caller.leads.create({
        name: "A",
        email: "not-an-email",
        phone: "",
        goal: "",
        preferredTime: "",
      })
    ).rejects.toThrow();
  });

  it("rejects malformed booking dates", async () => {
    const caller = appRouter.createCaller(context);
    await expect(
      caller.bookings.create({
        name: "Jorge",
        email: "jorge@example.com",
        phone: "+34600000000",
        date: "mañana",
        time: "18h",
      })
    ).rejects.toThrow();
  });

  it("rejects past dates and unsupported time slots", async () => {
    const caller = appRouter.createCaller(context);
    await expect(
      caller.bookings.create({
        name: "Jorge",
        email: "jorge@example.com",
        phone: "+34600000000",
        date: "2000-01-01",
        time: "18:15",
      })
    ).rejects.toThrow();
  });
});
