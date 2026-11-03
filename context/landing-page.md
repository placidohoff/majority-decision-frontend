# Landing Page
## Goals
Please create the homepage. References:
     @screenshots/landing-0.png (top)
     @screenshots/landing-1.png (middle)
     @screenshots/landing-2.png (bottom)


## Implementation

Maps to the **Home / Browse Fights** page in `overview.md` (use case 3.1, FR-1), plus teasers for scorecards (3.7, 3.10) and round comments (3.9). There is no backend yet, so all content comes from typed mock data that a real API can replace later.

### 1. Design foundations
- **Theme:** dark only (near-black `#111214`-ish background, slightly lighter section bands, 1px dividers between sections). Replace the light/dark tokens in `src/app/globals.css` with a single dark palette exposed through Tailwind `@theme`:
  - `--color-bg`, `--color-surface` (cards), `--color-border`
  - `--color-fg` (off-white `#f3efe6`-ish), `--color-muted` (grey body text)
  - `--color-accent` (red `#e0332b`-ish, used for eyebrows, highlights, primary CTA)
  - `--color-gold` (win/result labels, "78% aligned" pill)
  - `--color-paper` (cream scorecard background)
- **Fonts** (via `next/font/google` in `layout.tsx`):
  - Display: heavy, tight-tracked sans for headlines and the logo (e.g. *Archivo Black*), uppercase.
  - Body: *Geist* (already installed) for paragraphs.
  - Labels: small, wide-letter-spaced uppercase. Use the display or body font with `tracking-[0.2em]`.
  - Mono: *Geist Mono* for round numbers and score digits.
- **Layout:** centered container around 1190px wide (`max-w-6xl` plus padding). Each section has generous vertical padding and a top border.
- Update the `metadata` title and description in `layout.tsx` to "Majority Decision".

### 2. Mock data — `src/lib/mock-data.ts`
Types follow the entities in `overview.md` §7, kept to what this page needs:
- `Fighter { name, initials, color }`
- `Fight { id, fighterA, fighterB, date, venue, city, status: "upcoming" | "final", cardCount, result? }` (`result` is e.g. "Crawford W · UD")
- `FeaturedFight { fight, consensusLabel, alignedPct, roundLean: number[] /* 12 values, -1..1 */, fanTotal, officialTotal }`
- `CommunityComment { round?: number, fightLabel, body, author, reactions }`
- Data seeded from the screenshots (Davis vs Stevenson, Canelo vs Crawford, Beterbiev vs Bivol).

### 3. Components — `src/components/landing/`
Shared UI goes in `src/components/ui/`.

| Component | Screenshot | Notes |
|---|---|---|
| `SiteHeader` | top | Red square "C" logo, wordmark "MAJORITY DECISION.", nav (Fights active / Scorecards / Community), bell icon button, red "+ SCORE A FIGHT" button. Sticky with a bottom border. Collapses to a menu button on mobile. |
| `Hero` | top | Eyebrow with a red dot ("THE FIGHT NIGHT COMPANION"), headline "SCORE EVERY / ROUND." with the second line in red, subcopy, a cream "START A SCORECARD →" button, an outlined "BROWSE FIGHTS" button, and a faint red radial glow at the top right. |
| `HeroScorecard` | top | Cream "paper" card rotated about -3°: "UNOFFICIAL SCORECARD", title, Davis/Stevenson columns, rounds 01–04 in mono, ruled lines, "CURRENT TOTAL 39 — 38", trophy icon, and a red "YOUR CALL MATTERS" tag in the corner. Hidden or moved below the hero copy on small screens. |
| `FightBrowser` (client) | middle | Eyebrow "THE SCHEDULE", "FIND YOUR FIGHT", a search input (fighters/venue), and tabs All fights / Upcoming / Completed (the active tab gets a red underline). Filters the mock list on the client. Shows an empty state when nothing matches. |
| `FightCard` | middle | Status label (red UPCOMING / grey FINAL), date and location, two avatar circles with initials in the fighter colors, "VS", names, a divider, venue, "N CARDS", then a footer of either red "⏱ OPEN FOR PREDICTIONS →" or a gold "🏆 WINNER · METHOD" result. Upcoming cards get a red border. Grid of 3 columns on desktop, 1 on mobile. |
| `FeaturedFight` | middle/bottom | Left: eyebrow "FEATURED FIGHT · OCTOBER 31", "WHAT DID YOU SEE?", copy, an overlapping avatar stack plus "Join 8.9k scorekeepers", and a red "SCORE THIS FIGHT →" link. Right: `ConsensusPanel`. |
| `ConsensusPanel` | bottom | "COMMUNITY CONSENSUS", "CRAWFORD BY DECISION", a gold "78% ALIGNED" pill, the round-by-round lean chart, the axis labels "ROUND 1 · FAN ROUND-BY-ROUND LEAN · ROUND 12", and a stats row (Fan total / Official / Cards) with left borders. |
| `RoundLeanChart` | bottom | The chart area is empty in the screenshot. The plan is 12 diverging bars from a centre baseline, one per round: up means fighter B, down means fighter A, and the height is the share of fans. Drawn as inline SVG with no chart library. |
| `CommunityFeed` | bottom | Eyebrow "AROUND THE ROPES", "THE COMMUNITY IS TALKING", a "SEE ALL DISCUSSION →" link, and three `CommentCard`s. |
| `CommentCard` | bottom | Red label ("ROUND 7 · DAVIS VS STEVENSON"), speech-bubble icon, quoted body, a divider, the @author, and "🔥 N REACTIONS". |
| `ui/Avatar`, `ui/Eyebrow`, `ui/Button` | — | Shared primitives: initials avatar, red tracked-out label, and the button variants (primary red, cream, outline). |

Icons: use `lucide-react` (bell, plus, arrow-right, search, clock, trophy, message-circle, flame).

### 4. Page assembly — `src/app/page.tsx`
Server component rendering `SiteHeader` → `Hero` → `FightBrowser` → `FeaturedFight` → `CommunityFeed`. Only `FightBrowser` and the mobile nav toggle are client components.

### 5. Links (routes don't exist yet)
These links point at future pages from `overview.md` §4 and will 404 for now:
- Score a fight / Start a scorecard / Score this fight → `/scorecards/new`
- Browse fights / Fights nav → `#fights` (anchor to `FightBrowser`); later `/fights`
- Fight card → `/fights/[id]`
- Scorecards nav → `/scorecards`; Community nav / See all discussion → `/community`

### 6. Responsive & accessibility
- Mobile first (the overview calls out phone scoring). Hero stacks, the fight grid goes to 1 column, the consensus panel goes below the copy, and the header gets a menu toggle.
- Use semantic landmarks (`header`, `nav`, `main`, `section` with `aria-labelledby`) and a labelled search input. The tabs use `role="tablist"`. Decorative icons get `aria-hidden`. The chart has a text alternative. Keep text contrast at AA or better on the dark surfaces.

### 7. Verification
- `npm run lint` and `npm run build` pass.
- `npm run dev`: compare against the three screenshots at about 1650px wide, then check 390px mobile width.
- Search and tabs filter the fight cards correctly, including the empty state.

### Open questions
- Exact display font and colour values: should we match the screenshots by eye, or are there brand assets?
- What should `RoundLeanChart` look like? It's blank in the mockup.
- Should the header and bell be wired to auth later? The bell does nothing for now.
