"use server";

import { redirect } from "next/navigation";
import { apiFetch, type AuthResponse, type ProblemDetails } from "@/lib/auth/api";
import { createSession, deleteSession } from "@/lib/auth/session";

export type AuthFormState =
  | {
      /** Field-level messages, keyed by input name. */
      errors?: Record<string, string[]>;
      /** Message not tied to a single field. */
      message?: string;
      /** Echo non-secret inputs so the form keeps them after a failed submit. */
      values?: Record<string, string>;
    }
  | undefined;

const USERNAME_PATTERN = /^[A-Za-z0-9._-]{3,32}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

/** Turns ASP.NET validation problem details into form state (keys normalised to input names). */
function fromProblem(problem: ProblemDetails, values: Record<string, string>): AuthFormState {
  const errors: Record<string, string[]> = {};
  let message: string | undefined;

  for (const [key, messages] of Object.entries(problem.errors ?? {})) {
    const name = key.charAt(0).toLowerCase() + key.slice(1);
    if (name) {
      (errors[name] ??= []).push(...messages);
    } else {
      message = messages.join(" ");
    }
  }

  if (!message && Object.keys(errors).length === 0) {
    message = problem.title ?? "Something went wrong. Please try again.";
  }
  return { errors, message, values };
}

export async function register(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const username = field(formData, "username");
  const email = field(formData, "email");
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  const values = { username, email };

  const errors: Record<string, string[]> = {};
  if (!USERNAME_PATTERN.test(username)) {
    errors.username = ["3–32 characters: letters, numbers, dots, dashes or underscores."];
  }
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = ["Enter a valid email address."];
  }
  if (password.length < 8 || !/[a-z]/.test(password) || !/\d/.test(password)) {
    errors.password = ["At least 8 characters, including a lowercase letter and a number."];
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = ["Passwords don't match."];
  }
  if (Object.keys(errors).length > 0) {
    return { errors, values };
  }

  const result = await apiFetch<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
  if (!result.ok) {
    return fromProblem(result.problem, values);
  }

  await createSession(result.data.token, result.data.expiresAt);
  redirect("/dashboard");
}

export async function login(_state: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const usernameOrEmail = field(formData, "usernameOrEmail");
  const password = formData.get("password")?.toString() ?? "";
  const values = { usernameOrEmail };

  if (!usernameOrEmail || !password) {
    return { message: "Enter your username or email and your password.", values };
  }

  const result = await apiFetch<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ usernameOrEmail, password }),
  });
  if (!result.ok) {
    return fromProblem(result.problem, values);
  }

  await createSession(result.data.token, result.data.expiresAt);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
