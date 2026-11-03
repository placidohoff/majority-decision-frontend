import type { Fighter } from "@/lib/mock-data";

type RoundLeanChartProps = {
  lean: number[];
  fighterA: Fighter;
  fighterB: Fighter;
};

const HEIGHT = 120;
const MID = HEIGHT / 2;
const SLOT = 20;
const BAR = 12;

function describe(value: number, a: Fighter, b: Fighter) {
  const pct = Math.round(Math.abs(value) * 100);
  if (pct === 0) return "even";
  return `${value > 0 ? b.name : a.name} by ${pct}%`;
}

/** Diverging bars per round: up leans to fighter B, down to fighter A. */
export function RoundLeanChart({ lean, fighterA, fighterB }: RoundLeanChartProps) {
  const width = lean.length * SLOT;
  const summary = lean.map((v, i) => `Round ${i + 1}: ${describe(v, fighterA, fighterB)}`).join("; ");

  return (
    <figure>
      <div className="flex items-center gap-4 font-display text-[9px] uppercase tracking-[0.15em] text-subtle">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: fighterB.color }} />
          {fighterB.name}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="size-2 rounded-full" style={{ backgroundColor: fighterA.color }} />
          {fighterA.name}
        </span>
      </div>
      <svg
        role="img"
        aria-label={`Fan round-by-round lean. ${summary}`}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="mt-3 h-32 w-full border-l border-border"
      >
        <line x1={0} x2={width} y1={MID} y2={MID} stroke="var(--border)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        {lean.map((value, i) => {
          const h = Math.abs(value) * (MID - 4);
          const x = i * SLOT + (SLOT - BAR) / 2;
          return (
            <rect
              key={i}
              x={x}
              y={value > 0 ? MID - h : MID}
              width={BAR}
              height={h}
              rx={1}
              fill={value > 0 ? fighterB.color : fighterA.color}
            >
              <title>{`Round ${i + 1}: ${describe(value, fighterA, fighterB)}`}</title>
            </rect>
          );
        })}
      </svg>
      <figcaption className="mt-3 flex justify-between border-t border-border pt-3 font-display text-[9px] uppercase tracking-[0.15em] text-subtle">
        <span>Round 1</span>
        <span>Fan round-by-round lean</span>
        <span>Round {lean.length}</span>
      </figcaption>
    </figure>
  );
}
