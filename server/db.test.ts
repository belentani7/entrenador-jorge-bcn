import { afterEach, describe, expect, it } from "vitest";
import { createLead, getDb } from "./db";

describe("database availability boundary", () => {
  const previousDatabaseUrl = process.env.DATABASE_URL;

  afterEach(() => {
    if (previousDatabaseUrl) process.env.DATABASE_URL = previousDatabaseUrl;
    else delete process.env.DATABASE_URL;
  });

  it("does not create a driver when DATABASE_URL is absent", async () => {
    delete process.env.DATABASE_URL;
    expect(await getDb()).toBeNull();
  });

  it("fails explicitly before attempting a lead insert without a database", async () => {
    delete process.env.DATABASE_URL;
    await expect(
      createLead({
        name: "QA",
        email: "qa@example.com",
        phone: "+34600000000",
        goal: "Prueba",
        preferredTime: "Flexible",
      })
    ).rejects.toThrow("Database is not configured or unavailable.");
  });
});
