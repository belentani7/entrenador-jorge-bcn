// @vitest-environment happy-dom
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { toast } from "sonner";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import Home from "@/pages/Home";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
  },
}));

describe("camino feliz de la landing", () => {
  beforeAll(() => {
    // satisfy prefers-reduced-motion: GSAP writes inline styles that would
    // otherwise hide elements (and animate) inside the simulated DOM.
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("monta la landing, expone el contenido accesible y reserva una sesión", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
        {
          result: {
            data: { json: { success: true, ownerNotified: true } },
          },
        },
      ],
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 }).textContent).toContain(
      "Tu mejor versión",
    );
    expect(
      screen
        .getByRole("link", { name: "Saltar al contenido" })
        .getAttribute("href"),
    ).toBe("#contenido");
    expect(document.querySelector("main#contenido")).not.toBeNull();
    expect(
      screen
        .getAllByRole("img")
        .every((image) => image.getAttribute("alt") !== null),
    ).toBe(true);

    const form = document.querySelector("form.booking-form");
    expect(form).not.toBeNull();
    const fields = within(form as HTMLElement);

    fireEvent.change(fields.getByLabelText("Nombre"), {
      target: { value: "Ana" },
    });
    fireEvent.change(fields.getByLabelText("Email"), {
      target: { value: "ana@example.com" },
    });
    fireEvent.change(fields.getByLabelText("Teléfono"), {
      target: { value: "+34 600 000 000" },
    });
    fireEvent.change(fields.getByLabelText("Fecha"), {
      target: { value: "2026-12-15" },
    });
    fireEvent.change(fields.getByLabelText("Hora"), {
      target: { value: "18:00" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /Solicitar mi sesión/ }),
    );

    await vi.waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/trpc/bookings.create?batch=1",
        expect.objectContaining({ method: "POST" }),
      );
    });

    await vi.waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        expect.stringContaining("Solicitud recibida"),
      );
    });

    expect((fields.getByLabelText("Nombre") as HTMLInputElement).value).toBe(
      "",
    );
  });
});
