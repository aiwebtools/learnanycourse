export type RunIdFetch = {
  fetch: typeof fetch;
  getRunId: () => string | undefined;
};

export function getLovableAiGatewayRunId(request: Request): string | undefined {
  return request.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
}

export function createLovableAiGatewayRunIdFetch(initialRunId?: string): RunIdFetch {
  let runId = initialRunId;

  return {
    fetch: async (input, init = {}) => {
      const headers = new Headers(init.headers);
      if (runId) {
        headers.set("X-Lovable-AIG-Run-ID", runId);
      }

      const response = await fetch(input, { ...init, headers });
      const nextRunId = response.headers.get("X-Lovable-AIG-Run-ID");
      if (nextRunId) {
        runId = nextRunId;
      }

      return response;
    },
    getRunId: () => runId,
  };
}

export function getLovableAiGatewayResponseHeaders(
  _error?: unknown,
  headers: HeadersInit = {},
): HeadersInit {
  return headers;
}

export function withLovableAiGatewayRunIdHeader(
  response: Response,
  runIdFetch: RunIdFetch,
  extraHeaders: HeadersInit = {},
): Response {
  const headers = new Headers(response.headers);
  new Headers(extraHeaders).forEach((value, key) => headers.set(key, value));

  const runId = runIdFetch.getRunId();
  if (runId) {
    headers.set("X-Lovable-AIG-Run-ID", runId);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
