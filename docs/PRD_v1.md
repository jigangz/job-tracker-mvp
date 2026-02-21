# Job Tracker MVP — Product Requirements Document (v1)

## What I'm building

A simple web app to track my job applications in one place. I want to see what I've applied to, where I'm at in the process, and get a quick overview of my pipeline.

## Why

Spreadsheets suck for this. I want something clean, fast, and purpose-built.

## Scope (P0 — must ship)

- **Auth**: Register with email/password, login, stay logged in via JWT
- **Job CRUD**: Add, edit, delete job applications
  - Fields: company, role, link, status, applied date, notes
  - Status options: `applied`, `phone_screen`, `interview`, `offer`, `rejected`
- **Filter + Search**: Filter by status, search by company/role keyword
- **Dashboard**: Show counts — how many applied, interviewing, rejected, offered
- **Deploy**: Frontend on Vercel, backend + DB on Railway. Publicly accessible.

## Out of scope (for now)

- OAuth / social login
- Email verification
- Multi-user teams / sharing
- Resume upload
- Job board scraping or auto-import
- Notifications (P1)
- Kanban drag-and-drop (P1)
- CSV export (P1)

## Users

Me, plus 5-10 friends/peers who are also job hunting. I want real feedback.

## User flows

### Registration
1. Land on `/register`
2. Enter email + password
3. Account created → redirect to dashboard

### Login
1. Go to `/login`
2. Enter credentials
3. JWT stored in localStorage → redirect to dashboard

### Managing applications
1. From dashboard, click "Add Application"
2. Fill in company, role, link, status, date, notes
3. Save → appears in list
4. Can edit or delete from the list
5. Can filter by status dropdown or type a keyword to search

### Dashboard
1. Top of page shows summary cards: Applied (count), Interview (count), Offer (count), Rejected (count)
2. Below that, the filterable list of all applications

## Status flow

No strict state machine. Users can set any status at any time. Real job hunting is messy — I'm not going to enforce a linear flow.

## Success criteria

- [ ] A new user can register, log in, and stay logged in
- [ ] Can create, read, update, delete a job application
- [ ] Can filter by status and search by keyword
- [ ] Dashboard shows accurate counts
- [ ] Deployed and accessible via public URL
- [ ] At least 5 real people have used it and given feedback

## Tech stack

- Frontend: Next.js 15 + TypeScript + Tailwind CSS
- Backend: FastAPI + SQLAlchemy + Alembic
- Database: PostgreSQL 16
- Deploy: Vercel (frontend) + Railway (backend + DB)

## Timeline

14 days. See `docs/PLAN.md` for the day-by-day breakdown.
