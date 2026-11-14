"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import { FormField, FormMessage, SubmitButton } from "./FormField";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <FormMessage message={state?.message} />
      <FormField
        label="Username or email"
        name="usernameOrEmail"
        autoComplete="username"
        defaultValue={state?.values?.usernameOrEmail}
        errors={state?.errors?.usernameOrEmail}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        errors={state?.errors?.password}
      />
      <SubmitButton pending={pending}>Log in</SubmitButton>
    </form>
  );
}
