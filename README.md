# Activity Tracker

Clean MVP for tracking daily activities with a simple calendar flow.

## Stack

- Next.js App Router
- TypeScript
- NextAuth credentials auth
- Prisma
- PostgreSQL
- shadcn/ui
- Tailwind CSS

## What is implemented

- Registration with `POST /api/auth/register`
- Login with NextAuth credentials
- Activity calendar with one selected day
- Create, update, and delete activities
- Category CRUD for organizing activities
- Dashboard stats:
  - current streak
  - this week
  - total activities

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` with at least:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/activity_tracker"
AUTH_SECRET="replace-with-a-long-random-secret"
```

3. Start PostgreSQL with Docker:

```bash
docker compose up -d
```

4. Run Prisma migrations:

```bash
npx prisma migrate dev
```

5. Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Project structure

- `app/api` keeps route handlers thin and HTTP-focused
- `features/auth` contains auth forms, hooks, validation, and API helpers
- `features/activities` contains calendar UI, activity forms, validation, and helpers
- `features/categories` contains category management and validation
- `features/dashboard` contains dashboard UI and stats logic
- `components/ui` stores shared shadcn primitives
- `components/layout` stores shared layout pieces

## Current MVP notes

- Activities are stored as day-based records.
- Dashboard weekly stats count activities from Monday through the current week.
- Current streak is counted from today backward.

## Useful commands

```bash
npm run dev
npm run lint
npx prisma migrate dev
npx prisma studio
```
