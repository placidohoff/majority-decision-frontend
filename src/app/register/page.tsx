import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create account · Majority Decision",
};

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="Join the community"
      title="Create account"
      subtitle="Score fights round by round, compare your cards with the judges, and join the debate."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="text-fg underline underline-offset-4 hover:text-accent">
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
