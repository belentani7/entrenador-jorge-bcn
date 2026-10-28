import { describe, expect, it, vi } from "vitest";
import { postPublicProcedure, resolvePublicEndpoint } from "./publicBookingApi";

const pages = { pageOrigin: "https://belentani7.github.io", staticFrontend: true };

describe("static booking transport", () => {
  it("never posts visitor data to a static Pages host without a backend", async () => {
    const request = vi.fn();
    expect(resolvePublicEndpoint("leads.create", pages)).toBeNull();
    await expect(postPublicProcedure("leads.create", { email: "private@example.com" }, pages, request))
      .rejects.toThrow("no está conectado");
    expect(request).not.toHaveBeenCalled();
  });

  it.each(["http://api.example.com", "https://belentani7.github.io", "https://localhost", "https://user:pass@api.example.com", "https://api.example.com/private", "https://api.example.com/?key=secret"])(
    "rejects unsafe or ambiguous backend %s", backendOrigin => {
      expect(resolvePublicEndpoint("bookings.create", { ...pages, backendOrigin })).toBeNull();
    }
  );

  it("allows only explicit HTTPS backend and does not forward cross-origin cookies", async () => {
    const config = { ...pages, backendOrigin: "https://booking.example.com" };
    const request = vi.fn(async (_url: RequestInfo | URL, _options?: RequestInit) => new Response(
      JSON.stringify([{ result: { data: { json: { success: true } } } }]),
      { status: 200, headers: { "content-type": "application/json" } }
    ));
    expect(resolvePublicEndpoint("leads.create", config)?.toString())
      .toBe("https://booking.example.com/api/trpc/leads.create?batch=1");
    await expect(postPublicProcedure("leads.create", { name: "Ana" }, config, request))
      .resolves.toEqual({ success: true });
    expect(request).toHaveBeenCalledOnce();
    expect(request.mock.calls[0][1]).toMatchObject({ credentials: "omit", method: "POST" });
  });

  it("keeps same-origin full-stack requests functional", async () => {
    const config = { pageOrigin: "https://studio.example.com", staticFrontend: false };
    const request = vi.fn(async (_url: RequestInfo | URL, _options?: RequestInit) => new Response(
      JSON.stringify([{ result: { data: { json: { success: true } } } }]),
      { headers: { "content-type": "application/json" } }
    ));
    await expect(postPublicProcedure("bookings.create", { date: "2026-11-01" }, config, request))
      .resolves.toEqual({ success: true });
    expect(request.mock.calls[0][1]).toMatchObject({ credentials: "same-origin" });
  });

  it("rejects HTML fallbacks instead of treating them as booking confirmation", async () => {
    const config = { pageOrigin: "https://studio.example.com", staticFrontend: false };
    const request = vi.fn(async (_url: RequestInfo | URL, _options?: RequestInit) => new Response("<html>not an API</html>", {
      headers: { "content-type": "text/html" }
    }));
    await expect(postPublicProcedure("leads.create", {}, config, request))
      .rejects.toThrow("respuesta válida");
  });

  it.each(["leads.create", "bookings.create"] as const)(
    "never confirms %s when HTTP 200 lacks explicit boolean success",
    async procedure => {
      const config = { pageOrigin: "https://studio.example.com", staticFrontend: false };
      for (const json of [{ success: false }, { id: 123 }, null, { success: "true" }]) {
        const request = vi.fn(async () => new Response(
          JSON.stringify([{ result: { data: { json } } }]),
          { status: 200, headers: { "content-type": "application/json" } }
        ));
        await expect(postPublicProcedure(procedure, {}, config, request))
          .rejects.toThrow("No se pudo completar la solicitud.");
      }
    }
  );

  it("rejects a tRPC error even when a success object is also present", async () => {
    const config = { pageOrigin: "https://studio.example.com", staticFrontend: false };
    const request = vi.fn(async () => new Response(JSON.stringify([{
      result: { data: { json: { success: true } } },
      error: { message: "No permitido" },
    }]), { headers: { "content-type": "application/json" } }));
    await expect(postPublicProcedure("bookings.create", {}, config, request))
      .rejects.toThrow("No permitido");
  });
});
