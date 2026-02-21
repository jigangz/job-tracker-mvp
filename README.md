# Job Tracker MVP

Monorepo for a job application tracker.

## Stack
- Frontend: Next.js + TypeScript + Tailwind CSS
- Backend: FastAPI + SQLAlchemy
- Database: PostgreSQL
- Deploy: Vercel (web) + Railway (api/db)

## Structure
- `apps/web` - Next.js frontend
- `apps/api` - FastAPI backend

## Week 1-2 MVP
- JWT auth (register/login)
- Job application CRUD
- Filter/search by status
- Dashboard stats

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
