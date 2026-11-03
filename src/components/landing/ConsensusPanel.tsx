import type { FeaturedFight } from "@/lib/mock-data";
import { RoundLeanChart } from "./RoundLeanChart";

export function ConsensusPanel({ featured }: { featured: FeaturedFight }) {
  const { fight } = featured;
  const stats = [
    { label: "Fan total", value: featured.fanTotal },
    { label: "Official", value: featured.officialTotal },
    { label: "Cards", value: fight.cardCount.toLocaleString("en-US") },
  ];

  return (
    <div className="rounded-md border border-border bg-bg p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.2em] text-subtle">Community consensus</p>
          <p className="mt-1 font-display text-lg uppercase tracking-tight">{featured.consensusLabel}</p>
        </div>
        <span className="shrink-0 rounded-full bg-gold/10 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.1em] text-gold">
          {featured.alignedPct}% aligned
        </span>
      </div>

      <div className="mt-6">
        <RoundLeanChart lean={featured.roundLean} fighterA={fight.fighterA} fighterB={fight.fighterB} />
      </div>

      <dl className="mt-8 grid grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border-l border-border pl-3">
            <dt className="text-[10px] uppercase tracking-[0.1em] text-subtle">{stat.label}</dt>
            <dd className="mt-1 font-mono text-base font-bold sm:text-lg">{stat.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
