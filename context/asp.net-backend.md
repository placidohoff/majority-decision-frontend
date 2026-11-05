# ASP.NET Database/Backend
## Goals
Create an ASP.NET API project as the backend. I would like to use Entity Framework migrations. This new project should exist as a sibling to the majority-decision-frontend.

## Implementation
- Project: `../majority-decision-backend` (`MajorityDecision.sln` / `MajorityDecision.Api.csproj`), .NET 9 Web API with controllers.
- Database: SQL Server LocalDB via EF Core 9 (`Microsoft.EntityFrameworkCore.SqlServer`). Connection string in `appsettings.json`.
- Migrations: `dotnet-ef` 9.0.22 pinned as a local tool (`.config/dotnet-tools.json`); migrations live in `Data/Migrations` (`InitialCreate`).
- Initial model (from the Create Scorecard workflow): `Fighter` (first/last name, suffix), `Fight` (two fighters, scheduled rounds, weight class, meeting number, optional date/venue/referee), `Scorecard` (official flag, judge name), `RoundScore` (per-fighter score, knockdowns, deductions).
  - Unique index on (FighterA, FighterB, MeetingNumber); unique round number per scorecard.
- Endpoints: `GET /api/fighters?q=` (autocomplete), `GET /api/fighters/{id}`, `POST /api/fighters`.
- CORS allows `http://localhost:3000` (Next.js dev server). API runs at `http://localhost:5148`.
- Not yet: users/auth, comments, votes, fight endpoints.