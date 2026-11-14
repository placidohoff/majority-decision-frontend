import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in · Majority Decision",
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Log in"
      subtitle="Pick up your scorecards where you left off."
      footer={
        <>
          New to Majority Decision?{" "}
          <Link href="/register" className="text-fg underline underline-offset-4 hover:text-accent">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
