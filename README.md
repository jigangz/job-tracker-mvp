# Job Tracker MVP

I built this to stop tracking job applications in a messy spreadsheet. It's a simple, clean app to manage my job hunt pipeline.

## What it does
- Register / login (JWT auth)
- Add, edit, delete job applications
- Filter by status, search by company or role
- Dashboard with pipeline stats at a glance

## Stack
- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Backend:** FastAPI + SQLAlchemy + Alembic
- **Database:** PostgreSQL 16
- **Deploy:** Vercel (frontend) + Railway (backend + DB)

## Project structure
```
apps/web    — Next.js frontend
apps/api    — FastAPI backend
docs/       — PRD, data dictionary, user flows, execution plan
```

## Docs
- [PRD](docs/PRD_v1.md) — what I'm building and why
- [Data Dictionary](docs/DATA_DICTIONARY.md) — tables, fields, status enum
- [User Flow](docs/USER_FLOW.md) — pages, routes, API endpoints
- [Plan](docs/PLAN.md) — 14-day execution plan

## Local quick start

### 1) API
```bash
cd apps/api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2) Web
```bash
cd apps/web
npm install
npm run dev
```

## Environment
Copy examples:
- `apps/api/.env.example` -> `apps/api/.env`
- `apps/web/.env.example` -> `apps/web/.env.local`
