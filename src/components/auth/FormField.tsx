type FormFieldProps = {
  label: string;
  name: string;
  type?: "text" | "email" | "password";
  autoComplete?: string;
  defaultValue?: string;
  errors?: string[];
  hint?: string;
  required?: boolean;
};

export function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  defaultValue,
  errors,
  hint,
  required = true,
}: FormFieldProps) {
  const id = `field-${name}`;
  const describedBy = errors?.length ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div>
      <label htmlFor={id} className="font-display text-[11px] uppercase tracking-[0.15em] text-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={errors?.length ? true : undefined}
        aria-describedby={describedBy}
        className="mt-2 block w-full rounded-sm border border-border bg-bg px-4 py-3 text-base text-fg placeholder:text-subtle transition-colors focus:border-fg/40 focus:outline-2 focus:outline-offset-2 focus:outline-accent aria-invalid:border-accent"
      />
      {errors?.length ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-accent">
          {errors.join(" ")}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs text-subtle">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function FormMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-sm border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-fg">
      {message}
    </p>
  );
}

export function SubmitButton({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-accent px-5 py-3.5 font-display text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
