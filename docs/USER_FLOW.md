# User Flow

## Page Map

```
/login          — Email + password form
/register       — Email + password + confirm form
/dashboard      — Stats cards + job list (main page after login)
/jobs/new       — Add new application form
/jobs/:id/edit  — Edit existing application
```

## Flow Diagram (text)

```
[Landing /login]
    |
    ├── Have account? → Enter credentials → POST /api/auth/login
    |       |
    |       ├── Success → Store JWT → Redirect /dashboard
    |       └── Fail → Show error, stay on page
    |
    └── No account? → Click "Register" → /register
            |
            └── Fill form → POST /api/auth/register
                    |
                    ├── Success → Auto-login → Redirect /dashboard
                    └── Fail (email taken, etc.) → Show error

[Dashboard /dashboard]
    |
    ├── Stats bar: [Applied: N] [Interview: N] [Offer: N] [Rejected: N]
    |
    ├── Filter dropdown: All / Applied / Phone Screen / Interview / Offer / Rejected
    ├── Search box: type to filter by company or role
    |
    ├── Job list (table or cards)
    |       |
    |       ├── Click row → /jobs/:id/edit (inline or page)
    |       ├── Delete button → Confirm → DELETE /api/jobs/:id
    |       └── Status badge (colored by status)
    |
    └── "+ Add Application" button → /jobs/new

[Add Job /jobs/new]
    |
    └── Form: company*, role*, link, status, applied_date*, notes
            |
            ├── Submit → POST /api/jobs → Redirect /dashboard
            └── Cancel → Back to /dashboard

[Edit Job /jobs/:id/edit]
    |
    └── Pre-filled form → PUT /api/jobs/:id → Redirect /dashboard
```

## API Endpoints (overview)

```
POST   /api/auth/register     — Create account
POST   /api/auth/login        — Get JWT token
GET    /api/auth/me           — Get current user

GET    /api/jobs              — List jobs (supports ?status=&q=)
POST   /api/jobs              — Create job
GET    /api/jobs/:id          — Get single job
PUT    /api/jobs/:id          — Update job
DELETE /api/jobs/:id          — Delete job

GET    /api/jobs/stats        — Dashboard counts by status
```

## Auth Strategy

- JWT in `Authorization: Bearer <token>` header
- Token stored in `localStorage` on the frontend
- All `/api/jobs/*` endpoints require auth
- Token expires in 24h, user has to re-login (good enough for MVP)
