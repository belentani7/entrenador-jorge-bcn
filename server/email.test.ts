import { describe, expect, it, vi } from "vitest";
import { confirmationEmail, sendTransactionalEmail } from "./email";
import { resolveOwnerNotification } from "./routers";

describe("transactional email fallback", () => {
  it("does not send without the final owner credential", async () => {
    const previous = process.env.RESEND_API_KEY;
    delete process.env.RESEND_API_KEY;
    await expect(
      sendTransactionalEmail({
        to: "test@example.com",
        subject: "Test",
        html: confirmationEmail("Jorge"),
      })
    ).resolves.toBe(false);
    if (previous) process.env.RESEND_API_KEY = previous;
  });

  it("reports the internal channel when the owner notification succeeds", () => {
    expect(resolveOwnerNotification(true, false)).toEqual({
      notified: true,
      channel: "internal",
    });
  });

  it("reports email fallback and no-channel states accurately", () => {
    expect(resolveOwnerNotification(false, true)).toEqual({
      notified: true,
      channel: "email",
    });
    expect(resolveOwnerNotification(false, false)).toEqual({
      notified: false,
      channel: "none",
    });
  });

  it("builds a Spanish confirmation message without interpolating HTML", () => {
    const html = confirmationEmail("<Jorge>", "2026-08-20", "18:00");
    expect(html).toContain("&lt;Jorge&gt;");
    expect(html).not.toContain("<p>Hola <Jorge>");
    expect(html).toContain("He recibido tus datos");
  });

  it("returns false instead of throwing when the provider network fails", async () => {
    const previousKey = process.env.RESEND_API_KEY;
    process.env.RESEND_API_KEY = "test-key";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockRejectedValueOnce(new Error("offline"));
    const warningSpy = vi
      .spyOn(console, "warn")
      .mockImplementation(() => undefined);
    await expect(
      sendTransactionalEmail({
        to: "test@example.com",
        subject: "Test",
        html: "<p>Test</p>",
      })
    ).resolves.toBe(false);
    fetchSpy.mockRestore();
    warningSpy.mockRestore();
    if (previousKey) process.env.RESEND_API_KEY = previousKey;
    else delete process.env.RESEND_API_KEY;
  });
});
