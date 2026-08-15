import { describe, expect, it } from "vitest";
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

  it("builds a Spanish confirmation message", () => {
    expect(confirmationEmail("Jorge", "2026-08-20", "18:00")).toContain(
      "He recibido tus datos"
    );
  });
});
