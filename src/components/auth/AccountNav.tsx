import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { getCurrentUser } from "@/lib/auth/dal";

/** Header account control. Reads the session, so render it inside <Suspense>. */
export async function AccountNav() {
  const user = await getCurrentUser();

  if (!user) {
    return <AccountNavFallback />;
  }

  return (
    <Link
      href="/dashboard"
      aria-label={`Dashboard for ${user.username}`}
      className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <Avatar initials={user.username.slice(0, 2).toUpperCase()} color="var(--accent)" size="sm" />
    </Link>
  );
}

export function AccountNavFallback() {
  return (
    <Link
      href="/login"
      className="font-display text-[11px] uppercase tracking-[0.15em] text-muted transition-colors hover:text-fg"
    >
      Log in
    </Link>
  );
}
