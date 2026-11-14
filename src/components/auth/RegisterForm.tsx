"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import { FormField, FormMessage, SubmitButton } from "./FormField";

export function RegisterForm() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      <FormMessage message={state?.message} />
      <FormField
        label="Username"
        name="username"
        autoComplete="username"
        defaultValue={state?.values?.username}
        errors={state?.errors?.username}
        hint="Shown on your scorecards and comments."
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        defaultValue={state?.values?.email}
        errors={state?.errors?.email}
      />
      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        errors={state?.errors?.password}
        hint="At least 8 characters, including a lowercase letter and a number."
      />
      <FormField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        errors={state?.errors?.confirmPassword}
      />
      <SubmitButton pending={pending}>Create account</SubmitButton>
    </form>
  );
}
