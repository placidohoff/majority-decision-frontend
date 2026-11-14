import type { Metadata } from "next";
import { Suspense } from "react";
import { LogOut, Plus } from "lucide-react";
import { logout } from "@/app/actions/auth";
import { AccountNav, AccountNavFallback } from "@/components/auth/AccountNav";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Avatar } from "@/components/ui/Avatar";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { requireUser } from "@/lib/auth/dal";

export const metadata: Metadata = {
  title: "Dashboard · Majority Decision",
};

export default function DashboardPage() {
  return (
    <>
      <SiteHeader
        account={
          <Suspense fallback={<AccountNavFallback />}>
            <AccountNav />
          </Suspense>
        }
      />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Suspense fallback={<DashboardSkeleton />}>
            <Dashboard />
          </Suspense>
        </div>
      </main>
    </>
  );
}

async function Dashboard() {
  const user = await requireUser();
  const memberSince = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <section aria-labelledby="dashboard-heading" className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex items-center gap-5">
          <Avatar initials={user.username.slice(0, 2).toUpperCase()} color="var(--accent)" />
          <div>
            <Eyebrow>Your corner</Eyebrow>
            <h1 id="dashboard-heading" className="mt-2 font-display text-4xl uppercase leading-none tracking-tight sm:text-5xl">
              {user.username}
            </h1>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3.5 font-display text-xs uppercase tracking-[0.15em] text-fg transition-colors hover:border-fg/40 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <LogOut aria-hidden className="size-4" />
            Log out
          </button>
        </form>
      </section>

      <div className="mt-12 grid gap-4 md:grid-cols-[2fr_1fr]">
        <section aria-labelledby="scorecards-heading" className="rounded-sm border border-border bg-surface p-6 sm:p-8">
          <h2 id="scorecards-heading" className="font-display text-sm uppercase tracking-[0.15em]">
            Your scorecards
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            You haven&apos;t scored a fight yet. Pick a fight and score it round by round to see how your card
            stacks up against the judges and the community.
          </p>
          <ButtonLink href="/scorecards/new" className="mt-8">
            <Plus aria-hidden className="size-4" />
            Score a fight
          </ButtonLink>
        </section>

        <section aria-labelledby="account-heading" className="rounded-sm border border-border bg-surface p-6 sm:p-8">
          <h2 id="account-heading" className="font-display text-sm uppercase tracking-[0.15em]">
            Account
          </h2>
          <dl className="mt-6 space-y-4 text-sm">
            <div>
              <dt className="text-subtle">Email</dt>
              <dd className="mt-1 break-all">{user.email}</dd>
            </div>
            <div>
              <dt className="text-subtle">Member since</dt>
              <dd className="mt-1">{memberSince}</dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  );
}

function DashboardSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading your dashboard" className="animate-pulse">
      <div className="flex items-center gap-5">
        <div className="size-12 rounded-full bg-surface" />
        <div className="h-10 w-56 rounded-sm bg-surface" />
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="h-56 rounded-sm bg-surface" />
        <div className="h-56 rounded-sm bg-surface" />
      </div>
    </div>
  );
}
