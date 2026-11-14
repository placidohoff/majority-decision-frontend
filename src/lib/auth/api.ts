import "server-only";

/** Base URL of the ASP.NET backend. Server-side only; the browser never talks to it directly. */
const API_URL = process.env.API_URL ?? "http://localhost:5148";

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
};

export type AuthResponse = {
  token: string;
  expiresAt: string;
  user: User;
};

/** RFC 9457 problem details, as returned by ASP.NET for 4xx responses. */
export type ProblemDetails = {
  title?: string;
  status?: number;
  errors?: Record<string, string[]>;
};

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; problem: ProblemDetails };

export async function apiFetch<T>(
  path: string,
  init: RequestInit & { token?: string } = {},
): Promise<ApiResult<T>> {
  const { token, headers, ...rest } = init;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...rest,
      cache: "no-store",
      headers: {
        Accept: "application/json",
        ...(rest.body ? { "Content-Type": "application/json" } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    });
  } catch {
    return { ok: false, status: 503, problem: { title: "Can't reach the server. Please try again shortly." } };
  }

  if (res.ok) {
    return { ok: true, data: (await res.json()) as T };
  }

  const problem: ProblemDetails = await res.json().catch(() => ({}));
  return { ok: false, status: res.status, problem };
}
