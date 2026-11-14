import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { apiFetch, type User } from "./api";
import { getSessionToken } from "./session";

/**
 * Data Access Layer: the one place that turns the session cookie into a user.
 * The backend validates the JWT (signature, expiry, security stamp) on every call,
 * so a forged or revoked cookie never yields a user. Deduped per request with `cache`.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const token = await getSessionToken();
  if (!token) return null;

  const result = await apiFetch<User>("/api/auth/me", { token });
  return result.ok ? result.data : null;
});

/** Like `getCurrentUser`, but sends signed-out visitors to the login page. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}
