import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { FeaturedFight as FeaturedFightData } from "@/lib/mock-data";
import { ConsensusPanel } from "./ConsensusPanel";

function compactCount(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function FeaturedFight({ featured }: { featured: FeaturedFightData }) {
  const { fight, matchup } = featured;

  return (
    <section aria-labelledby="featured-heading" className="border-t border-border bg-bg-alt">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>Featured fight · {featured.dateLabel}</Eyebrow>
          <h2 id="featured-heading" className="mt-3 font-display text-4xl leading-none uppercase tracking-tight sm:text-5xl">
            What did
            <br />
            you see?
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-muted">
            {fight.cardCount.toLocaleString("en-US")} fans scored {matchup}. The community had a clear read — but
            not on every round.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-2">
              {featured.scorekeepers.map((person) => (
                <Avatar key={person.initials} initials={person.initials} color={person.color} size="sm" />
              ))}
            </div>
            <span className="text-xs text-muted">Join {compactCount(fight.cardCount)} scorekeepers</span>
          </div>

          <Link
            href={`/fights/${fight.id}`}
            className="group mt-10 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.15em] text-accent"
          >
            Score this fight
            <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ConsensusPanel featured={featured} />
      </div>
    </section>
  );
}
