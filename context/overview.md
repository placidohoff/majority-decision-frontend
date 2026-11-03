# Use Case Diagram
![[Pasted image 20261102142159.png]]


# Requirements
# Fan Boxing Scorecard App (Majority Decision) — Requirements Outline

> Draft derived from the use case diagram (v0). Items marked **[?]** are open questions.

## 1. Overview

A web app where fans score boxing matches round by round, compare their scorecards with the official judges' cards and other fans' cards, and discuss individual rounds.

### System boundary

- **In scope:** fights, fight metadata, user scorecards, round scoring, official scorecards, comments, voting, aggregate scores.
- **Out of scope (for now) [?]:** live streaming, betting/odds, fighter records beyond what's needed for a fight.

## 2. Actors

|Actor|Description|
|---|---|
|**Fan (User)**|The only actor in the current diagram. Browses fights, creates scorecards, scores rounds, comments, and votes.|
|**Guest** [?]|Not logged in. Can likely browse and view, but not score, comment, or vote.|
|**Admin / Moderator** [?]|Enters official scorecards, verifies fight metadata, moderates comments and duplicate fights.|

## 3. Use Cases

### 3.1 Browse fights

- Browse/search by fighter name(s), judges, referee, venue, etc.
- **Required by:** Select Fight

### 3.2 Select fight

- Choose a fight from browse/search results.
- **Requires:** Browse Fights
- **Required by:** Add Metadata, View Scorecards, View Round Comments/Scores

### 3.3 Create scorecard

- Entry point for scoring a fight.
- Flow:
    1. User starts a new scorecard.
    2. System asks whether the fight already exists.
    3. **Yes →** user selects the fight (3.2).
    4. **No →** user creates the fight (3.4).
    5. User scores each round (3.5).

### 3.4 Create fight (with metadata)

- Add a new fight when it isn't in the system.
- Fields: fighters, date, venue/location, referee, judges, weight class, scheduled rounds [?]
- **Preventing duplicates [?]:** how do we stop two users creating the same fight?

### 3.5 Score each round

- Enter a score for each round (e.g., 10-9, 10-8).
- Fields per round: score per fighter, optional knockdowns/point deductions, optional comment [?]
- **Questions [?]:** can scorecards be edited after submission? Scoring only during/after a live fight, or any time?

### 3.6 Add metadata to fight

- Add or edit location, referee, judges, etc. on an existing fight.
- **Requires:** Select Fight
- **[?]** Who can edit — anyone, the fight creator, or admins only? Is there an edit history?

### 3.7 View official and unofficial (user) scorecards

- Compare the official judges' cards with fan scorecards for a fight.
- **Requires:** Select Fight
- **Required by:** Vote on Scorecard, View Round Comments/Scores
- **[?]** Where do official scores come from (manual admin entry, external source)?

### 3.8 Vote up/down a user's scorecard

- **Requires:** View Scorecards
- **[?]** One vote per user per scorecard? Can users vote on their own card?

### 3.9 View comments and/or scores for a round

- See all comments and scores for a single round.
- **Requires:** View Scorecards (also linked to Select Fight in the diagram)
- **Required by:** See Majority Totals/Averages, Comment on a Comment

### 3.10 See majority score totals and averages

- Aggregate fan scores per round and for the whole fight (majority winner, average score).
- **Requires:** View Round Comments/Scores

### 3.11 Comment on a comment

- Threaded replies on round comments.
- **Requires:** View Round Comments/Scores
- **[?]** Reply depth limit? Moderation/reporting?

## 4. Pages

|Page|Purpose|Use cases covered|
|---|---|---|
|**Home / Browse Fights**|Search and filter fights; list upcoming and recent fights|3.1|
|**Fight Detail**|Fight info and metadata, official card, fan card summary, links to rounds|3.2, 3.7, 3.10|
|**Create Fight**|Form for a new fight and its metadata|3.4|
|**Edit Fight Metadata**|Add/edit location, referee, judges, etc.|3.6|
|**Create Scorecard (Scoring)**|Pick or create the fight, then score round by round|3.3, 3.5|
|**Scorecard View**|One user's full scorecard, with voting|3.7, 3.8|
|**Scorecards List**|All official and fan scorecards for a fight, sortable by votes|3.7, 3.8|
|**Round Detail**|Scores, averages, and threaded comments for one round|3.9, 3.10, 3.11|
|**Sign Up / Log In** [?]|Implied by voting, commenting, and owning scorecards|—|
|**User Profile** [?]|A user's scorecards and activity|—|
|**Admin Dashboard** [?]|Official scores, merging duplicate fights, moderation|—|

## 5. Functional Requirements (draft)

- **FR-1** Users can search fights by fighter, judge, referee, and venue.
- **FR-2** Users can create a fight if it doesn't already exist.
- **FR-3** Users can add or edit metadata on an existing fight.
- **FR-4** Users can create one scorecard per fight and score each round.
- **FR-5** Users can view official and fan scorecards for a fight.
- **FR-6** Users can up/down vote other users' scorecards.
- **FR-7** Users can view scores and comments for each round.
- **FR-8** Users can reply to comments.
- **FR-9** The system shows majority winner and average scores per round and per fight.

## 6. Non-Functional Requirements (to define)

- Authentication and authorization
- Performance under load during big fights
- Mobile-friendly scoring (fans score on phones while watching)
- Content moderation and abuse prevention
- Data integrity for official scores

## 7. Data Entities (preliminary)

- **User** — id, username, email, role
- **Fight** — id, fighters, date, venue, referee, judges, weight class, scheduled rounds
- **Scorecard** — id, fight, owner (user or official judge), is_official, created/updated
- **RoundScore** — scorecard, round number, fighter A score, fighter B score, knockdowns, deductions
- **Comment** — id, fight, round, user, parent comment, body, timestamp
- **Vote** — user, scorecard, value (+1 / −1)

## 8. Open Questions / Diagram Notes

1. **Decision diamond:** "Does fight already exist?" is activity-diagram notation. In a use case diagram this is usually modeled as _Create Scorecard_ «include» _Select Fight_, with _Create Fight_ «extend» for when the fight isn't found. The branching logic can live in an activity diagram or in the use case's main flow.
2. **"requires" labels:** standard UML uses «include» (always needed) and «extend» (optional). Most of these read as «include» or as preconditions.
3. **Arrow directions** are mixed (some point to the dependency, some from it); worth making consistent.
4. **Score each round** connects to both _Create Fight_ and _Select Fight_; it likely belongs under _Create Scorecard_ instead.
5. **Additional actors:** guest vs. registered user, and an admin/moderator role.
6. **Official scores source:** manual entry or external data?
7. **Scorecard privacy:** can users keep a scorecard private or hide others' cards until they submit their own (to avoid bias)?