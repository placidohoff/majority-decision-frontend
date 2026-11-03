import { Trophy } from "lucide-react";
import { heroScorecard } from "@/lib/mock-data";

export function HeroScorecard() {
  const { title, fighterA, fighterB, rounds } = heroScorecard;
  const totalA = rounds.reduce((sum, [a]) => sum + a, 0);
  const totalB = rounds.reduce((sum, [, b]) => sum + b, 0);

  return (
    <figure className="relative mx-auto w-full max-w-md -rotate-3 rounded-sm bg-paper px-6 pt-8 pb-6 text-ink shadow-2xl shadow-black/60 sm:px-8">
      <span className="absolute -top-4 -right-4 rotate-6 rounded-sm bg-accent px-4 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-white shadow-lg">
        Your call matters
      </span>
      <Trophy aria-hidden className="absolute top-8 right-8 size-5 text-accent" />

      <p className="font-display text-[10px] uppercase tracking-[0.25em] text-ink/60">
        Unofficial scorecard
      </p>
      <figcaption className="mt-1 border-b-2 border-ink pb-3 font-display text-xl uppercase tracking-tight">
        {title}
      </figcaption>

      <table className="mt-4 w-full">
        <caption className="sr-only">
          Round-by-round scores for {title}
        </caption>
        <thead>
          <tr className="font-display text-xs uppercase">
            <th scope="col" className="pb-2 text-left text-[10px] tracking-[0.2em] text-ink/60">
              Round
            </th>
            <th scope="col" className="w-24 pb-2 text-center text-accent">
              {fighterA}
            </th>
            <th scope="col" className="w-24 pb-2 text-right">
              {fighterB}
            </th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {rounds.map(([a, b], i) => (
            <tr key={i} className="border-t border-ink/15">
              <th scope="row" className="py-3 text-left text-xs font-normal text-ink/60">
                {String(i + 1).padStart(2, "0")}
              </th>
              <td className="py-3 text-center text-sm font-bold text-accent">{a}</td>
              <td className="py-3 text-right text-sm font-bold">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-2 flex items-end justify-between border-t-2 border-ink pt-4">
        <span className="font-display text-[10px] uppercase tracking-[0.25em] text-ink/60">
          Current total
        </span>
        <span className="font-mono text-2xl font-bold">
          {totalA} — {totalB}
        </span>
      </div>
    </figure>
  );
}
