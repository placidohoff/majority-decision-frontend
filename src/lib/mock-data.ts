// Placeholder content for the landing page until a backend exists.

export type Fighter = {
  name: string;
  initials: string;
  /** Avatar background colour */
  color: string;
};

export type FightStatus = "upcoming" | "final";

export type Fight = {
  id: string;
  fighterA: Fighter;
  fighterB: Fighter;
  /** Display date, e.g. "Sat, Nov 14 · 9:00 PM ET" */
  date: string;
  venue: string;
  city: string;
  status: FightStatus;
  cardCount: number;
  /** Official result for completed fights, e.g. "Crawford W · UD" */
  result?: string;
};

export type FeaturedFight = {
  fight: Fight;
  /** Short matchup name, e.g. "Canelo vs Crawford" */
  matchup: string;
  dateLabel: string;
  consensusLabel: string;
  alignedPct: number;
  /**
   * Fan lean per round, from -1 (all fans scored it for fighter A)
   * to 1 (all fans scored it for fighter B).
   */
  roundLean: number[];
  fanTotal: string;
  officialTotal: string;
  scorekeepers: Fighter[];
};

export type CommunityComment = {
  id: string;
  label: string;
  body: string;
  author: string;
  reactions: number;
};

const fighters = {
  davis: { name: "Gervonta Davis", initials: "GD", color: "#c4161c" },
  stevenson: { name: "Shakur Stevenson", initials: "SS", color: "#33415c" },
  canelo: { name: "Canelo Alvarez", initials: "CA", color: "#c2570c" },
  crawford: { name: "Terence Crawford", initials: "TC", color: "#3438c2" },
  beterbiev: { name: "Artur Beterbiev", initials: "AB", color: "#57534e" },
  bivol: { name: "Dmitry Bivol", initials: "DB", color: "#0f6b47" },
} satisfies Record<string, Fighter>;

export const fights: Fight[] = [
  {
    id: "davis-stevenson",
    fighterA: fighters.davis,
    fighterB: fighters.stevenson,
    date: "Sat, Nov 14 · 9:00 PM ET",
    venue: "MGM Grand Garden Arena",
    city: "Las Vegas",
    status: "upcoming",
    cardCount: 1248,
  },
  {
    id: "canelo-crawford",
    fighterA: fighters.canelo,
    fighterB: fighters.crawford,
    date: "Sat, Oct 31 · Las Vegas",
    venue: "T-Mobile Arena",
    city: "Las Vegas",
    status: "final",
    cardCount: 8942,
    result: "Crawford W · UD",
  },
  {
    id: "beterbiev-bivol",
    fighterA: fighters.beterbiev,
    fighterB: fighters.bivol,
    date: "Sat, Oct 24 · Riyadh",
    venue: "ANB Arena",
    city: "Riyadh",
    status: "final",
    cardCount: 4109,
    result: "Beterbiev W · SD",
  },
];

export const featuredFight: FeaturedFight = {
  fight: fights[1],
  matchup: "Canelo vs Crawford",
  dateLabel: "October 31",
  consensusLabel: "Crawford by decision",
  alignedPct: 78,
  roundLean: [-0.4, -0.2, 0.3, 0.5, 0.6, -0.1, 0.4, 0.7, 0.2, 0.8, 0.5, 0.1],
  fanTotal: "116 — 112",
  officialTotal: "116 — 112",
  scorekeepers: [
    { name: "MK", initials: "MK", color: "#c4161c" },
    { name: "JR", initials: "JR", color: "#3438c2" },
    { name: "AL", initials: "AL", color: "#c2570c" },
    { name: "TS", initials: "TS", color: "#0f6b47" },
  ],
};

export const communityComments: CommunityComment[] = [
  {
    id: "c1",
    label: "Round 7 · Davis vs Stevenson",
    body: "The body shots are being slept on. Davis controlled the pace even when he wasn't throwing.",
    author: "southpaw_sam",
    reactions: 142,
  },
  {
    id: "c2",
    label: "Round 10 · Canelo vs Crawford",
    body: "Crawford's adjustment was textbook. He took away the left hook completely.",
    author: "thecounterpunch",
    reactions: 98,
  },
  {
    id: "c3",
    label: "Overall · Beterbiev vs Bivol",
    body: "A true 50/50 fight. My card was 115-113 Bivol, but I understand the split.",
    author: "ringside_ray",
    reactions: 76,
  },
];

export const heroScorecard = {
  title: "Davis vs Stevenson",
  fighterA: "Davis",
  fighterB: "Stevenson",
  rounds: [
    [10, 9],
    [9, 10],
    [10, 9],
    [10, 9],
  ] as const,
};
