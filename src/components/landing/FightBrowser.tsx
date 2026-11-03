"use client";

import { useId, useState } from "react";
import { Search } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { Fight, FightStatus } from "@/lib/mock-data";
import { FightCard } from "./FightCard";

type Filter = "all" | FightStatus;

const tabs: { value: Filter; label: string }[] = [
  { value: "all", label: "All fights" },
  { value: "upcoming", label: "Upcoming" },
  { value: "final", label: "Completed" },
];

function matchesQuery(fight: Fight, query: string) {
  const haystack = [fight.fighterA.name, fight.fighterB.name, fight.venue, fight.city]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export function FightBrowser({ fights }: { fights: Fight[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const id = useId();

  const normalizedQuery = query.trim().toLowerCase();
  const visible = fights.filter(
    (fight) =>
      (filter === "all" || fight.status === filter) &&
      (!normalizedQuery || matchesQuery(fight, normalizedQuery)),
  );

  return (
    <section id="fights" aria-labelledby="fights-heading" className="scroll-mt-20 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>The schedule</Eyebrow>
            <h2 id="fights-heading" className="mt-3 font-display text-4xl uppercase tracking-tight sm:text-5xl">
              Find your fight
            </h2>
          </div>
          <div className="relative sm:w-52">
            <label htmlFor={`${id}-search`} className="sr-only">
              Search fighters or venue
            </label>
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-3.5 -translate-y-1/2 text-subtle" />
            <input
              id={`${id}-search`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fighters, venue..."
              className="w-full rounded-sm border border-border bg-transparent py-3 pr-4 pl-10 text-sm placeholder:text-subtle focus:border-fg/40 focus:outline-none"
            />
          </div>
        </div>

        <div role="tablist" aria-label="Filter fights" className="mt-8 flex gap-6 border-b border-border">
          {tabs.map((tab) => {
            const selected = tab.value === filter;
            return (
              <button
                key={tab.value}
                type="button"
                role="tab"
                id={`${id}-tab-${tab.value}`}
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                onClick={() => setFilter(tab.value)}
                className={`-mb-px border-b-2 pb-3 font-display text-xs tracking-[0.08em] transition-colors ${
                  selected ? "border-accent text-fg" : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel`}
          aria-labelledby={`${id}-tab-${filter}`}
          className="mt-6"
        >
          {visible.length > 0 ? (
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((fight) => (
                <li key={fight.id} className="flex [&>a]:flex-1">
                  <FightCard fight={fight} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-md border border-dashed border-border px-6 py-12 text-center text-sm text-muted">
              No fights match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
