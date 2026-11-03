import Link from "next/link";
import { ArrowRight, Clock, Trophy } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import type { Fight, Fighter } from "@/lib/mock-data";

function Corner({ fighter, align }: { fighter: Fighter; align: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-3 ${align === "left" ? "items-start" : "items-end text-right"}`}>
      <Avatar initials={fighter.initials} color={fighter.color} />
      <span className="font-display text-sm tracking-tight">{fighter.name}</span>
    </div>
  );
}

export function FightCard({ fight }: { fight: Fight }) {
  const upcoming = fight.status === "upcoming";

  return (
    <Link
      href={`/fights/${fight.id}`}
      className={`group flex flex-col rounded-md border bg-surface p-5 transition-colors hover:border-fg/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        upcoming ? "border-accent/70" : "border-border"
      }`}
    >
      <div className="flex items-center justify-between gap-4 font-display text-[10px] uppercase tracking-[0.15em]">
        <span className={upcoming ? "text-accent" : "text-muted"}>{upcoming ? "Upcoming" : "Final"}</span>
        <span className="text-subtle">{fight.date}</span>
      </div>

      <div className="mt-6 flex items-start justify-between gap-2">
        <Corner fighter={fight.fighterA} align="left" />
        <span aria-hidden className="mt-3 font-serif text-lg text-subtle italic">
          VS
        </span>
        <Corner fighter={fight.fighterB} align="right" />
      </div>
      <span className="sr-only">
        {fight.fighterA.name} versus {fight.fighterB.name}
      </span>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-4 font-display text-[10px] uppercase tracking-[0.12em] text-subtle">
        <span>
          {fight.venue} · {fight.city}
        </span>
        <span className="shrink-0">{fight.cardCount.toLocaleString("en-US")} cards</span>
      </div>

      <div className="mt-4 flex items-center gap-2 font-display text-xs uppercase tracking-[0.15em]">
        {upcoming ? (
          <>
            <Clock aria-hidden className="size-3.5 text-accent" />
            <span className="text-accent">Open for predictions</span>
            <ArrowRight
              aria-hidden
              className="ml-auto size-3.5 text-accent transition-transform group-hover:translate-x-1"
            />
          </>
        ) : (
          <>
            <Trophy aria-hidden className="size-3.5 text-gold" />
            <span className="text-gold">{fight.result}</span>
          </>
        )}
      </div>
    </Link>
  );
}
