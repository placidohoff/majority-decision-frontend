import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: React.ReactNode;
  children: React.ReactNode;
};

/** Centered card layout shared by the login and register pages. */
export function AuthShell({ eyebrow, title, subtitle, footer, children }: AuthShellProps) {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[700px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(224,51,43,0.14),transparent_65%)]"
      />
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-sm bg-accent font-display text-sm text-white"
          >
            C
          </span>
          <span className="font-display text-lg uppercase tracking-tight">
            Majority Decision<span className="text-accent">.</span>
          </span>
        </Link>

        <div className="rounded-sm border border-border bg-surface p-6 sm:p-10">
          <Eyebrow dot>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-3xl uppercase leading-none tracking-tight sm:text-4xl">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>

        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
      </div>
    </main>
  );
}
