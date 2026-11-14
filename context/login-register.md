# Login & Register
## Goals
Users must be able to log in and register with the power of the asp.net backend. Once logged in, they can access their dashboard.

## Implementation
### Overview
```
Browser ──form POST──▶ Next.js Server Action ──JSON──▶ ASP.NET API (/api/auth/*)
                              │                              │
                              │◀──── { token, expiresAt } ───┘
                              ▼
               httpOnly cookie `md_session` (JWT)
```
The browser never sees the JWT and never calls the backend directly. Next.js talks to the API server-side and keeps the token in an httpOnly cookie.

### Backend (`majority-decision-backend`, branch `feature/login-register`)
- **ASP.NET Core Identity** (`IdentityDbContext<ApplicationUser, IdentityRole<int>, int>`) stores users in `AspNetUsers` and hashes passwords. Migration: `AddIdentity`.
- **JWT bearer auth.** `TokenService` signs HS256 tokens (7-day expiry) with `sub`, `unique_name`, `email` and the user's security stamp. On each request the API checks the stamp against the database, so tokens stop working after a password change or account deletion.
- **Endpoints** (`AuthController`):
  - `POST /api/auth/register` → `201 { token, expiresAt, user }`, or `400` validation problem details keyed by field.
  - `POST /api/auth/login` (username *or* email) → `{ token, expiresAt, user }`. Returns `401` for wrong credentials, with the same message whether or not the user exists. Returns `423` after 5 failed attempts (5-minute lockout).
  - `GET /api/auth/me` (Bearer) → current user.
- **Rules:** usernames are 3–32 characters of letters, digits, `.` `_` `-` (no `@`, so the login field can tell usernames from emails). Emails are unique. Passwords need 8+ characters with a lowercase letter and a digit.
- **Signing key** is in user-secrets (`Jwt:Key`), never in `appsettings.json`. Startup fails if it's missing.

### Frontend (`majority-decision-frontend`, branch `feature/login-register`)
| File | Role |
|---|---|
| `src/app/actions/auth.ts` | Server Actions `register`, `login`, `logout`. They validate input, call the API, set or delete the cookie, and redirect to `/dashboard` or `/login`. |
| `src/lib/auth/session.ts` | Cookie helpers. `md_session` is httpOnly, `SameSite=Lax`, `Secure` in production, and expires with the token. |
| `src/lib/auth/api.ts` | Server-only `fetch` wrapper for the API (`API_URL` env var, default `http://localhost:5148`). |
| `src/lib/auth/dal.ts` | Data Access Layer. `getCurrentUser()` validates the cookie by calling `/api/auth/me` (deduped per request). `requireUser()` redirects to `/login` if there's no valid user. |
| `src/proxy.ts` | Quick guard: `/dashboard/*` without a cookie redirects to `/login`. The real check is in the DAL. |
| `src/app/login`, `src/app/register` | Static pages with client forms (`useActionState`) that show field errors and keep the entered values. They also work without JavaScript. |
| `src/app/dashboard` | Reads the user behind `<Suspense>` (required with Cache Components). Shows the username, account details, a scorecards placeholder and Log out. |
| `src/components/auth/AccountNav.tsx` | Header slot showing "Log in" or the user's avatar (links to the dashboard). |

### Running locally
1. Backend: `dotnet tool restore`, `dotnet user-secrets set "Jwt:Key" "<random 32+ chars>"`, `dotnet tool run dotnet-ef database update`, `dotnet run --launch-profile http`.
2. Frontend: copy `.env.example` to `.env.local`, then `npm run dev`.

### Not yet
Password reset / email confirmation, roles (admin/moderator), linking scorecards to their owner, "remember me" / refresh tokens.
