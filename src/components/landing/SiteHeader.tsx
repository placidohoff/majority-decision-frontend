"use client";

import Link from "next/link";
import { useState } from "react";
import { Bell, Menu, Plus, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

const navItems = [
  { label: "Fights", href: "#fights", active: true },
  { label: "Scorecards", href: "/scorecards" },
  { label: "Community", href: "/community" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-10 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
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

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`font-display text-[11px] uppercase tracking-[0.15em] transition-colors hover:text-fg ${
                    item.active ? "text-fg" : "text-muted"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-fg"
          >
            <Bell aria-hidden className="size-4" />
          </button>
          <ButtonLink href="/scorecards/new" className="hidden sm:inline-flex">
            <Plus aria-hidden className="size-4" />
            Score a fight
          </ButtonLink>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex size-9 items-center justify-center rounded-sm border border-border md:hidden"
          >
            {menuOpen ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-border px-4 pb-6 md:hidden">
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block border-b border-border py-4 font-display text-sm uppercase tracking-[0.15em]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/scorecards/new" className="mt-6 w-full">
            <Plus aria-hidden className="size-4" />
            Score a fight
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
