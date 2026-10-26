/** Fail-closed public form transport: static Pages never receives visitor PII. */
export type PublicProcedure = "leads.create" | "bookings.create";

export type PublicApiConfig = {
  pageOrigin: string;
  staticFrontend: boolean;
  backendOrigin?: string;
};

type PublicProcedureResponse<T> = {
  result?: { data?: { json?: T; error?: { message?: string } } };
  error?: { message?: string; json?: { message?: string } };
};

/** Static frontends need an explicit, separate HTTPS backend origin. */
export function resolvePublicEndpoint(
  procedure: PublicProcedure,
  config: PublicApiConfig
): URL | null {
  if (procedure !== "leads.create" && procedure !== "bookings.create") return null;
  try {
    const page = new URL(config.pageOrigin);
    if (!/^https?:$/.test(page.protocol)) return null;
    let base = page;
    if (config.staticFrontend) {
      if (!config.backendOrigin) return null;
      base = new URL(config.backendOrigin);
      if (
        base.protocol !== "https:" ||
        base.origin === page.origin ||
        base.username ||
        base.password ||
        base.pathname !== "/" ||
        base.search ||
        base.hash ||
        /^(localhost|127(?:\.\d{1,3}){3}|0\.0\.0\.0|\[::1\])$/i.test(base.hostname)
      ) return null;
    }
    return new URL(`/api/trpc/${procedure}?batch=1`, base.origin);
  } catch {
    return null;
  }
}

export function runtimePublicApiConfig(): PublicApiConfig {
  return {
    pageOrigin: window.location.origin,
    staticFrontend:
      import.meta.env.VITE_STATIC_FRONTEND === "true" ||
      import.meta.env.BASE_URL !== "/",
    backendOrigin: import.meta.env.VITE_PUBLIC_API_ORIGIN,
  };
}

export function publicFormsAvailable(): boolean {
  return resolvePublicEndpoint("leads.create", runtimePublicApiConfig()) !== null;
}

export async function postPublicProcedure<T>(
  procedure: PublicProcedure,
  input: unknown,
  config: PublicApiConfig = runtimePublicApiConfig(),
  request: typeof fetch = fetch
): Promise<T> {
  const endpoint = resolvePublicEndpoint(procedure, config);
  if (!endpoint) {
    throw new Error("El formulario no está conectado a un servidor de reservas verificado.");
  }
  const response = await request(endpoint.toString(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // Public endpoints do not need to forward cookies to a separate origin.
    credentials: endpoint.origin === new URL(config.pageOrigin).origin ? "same-origin" : "omit",
    body: JSON.stringify({ 0: { json: input } }),
  });
  if (!response.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    throw new Error("El servicio de reservas no devolvió una respuesta válida.");
  }
  const payload = (await response.json()) as PublicProcedureResponse<T>[];
  const first = Array.isArray(payload) ? payload[0] : undefined;
  const data = first?.result?.data?.json;
  const message = first?.error?.json?.message ?? first?.error?.message ??
    first?.result?.data?.error?.message ?? "No se pudo completar la solicitud.";
  if (!response.ok || data === undefined) throw new Error(message);
  return data;
}
