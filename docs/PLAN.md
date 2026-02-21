# 14-Day Execution Plan

Solo dev. One person, two weeks, ship it.

## Week 1 — Core backend + frontend scaffold

### Day 1 — Requirements freeze + info architecture
- [x] Write PRD (scope, non-scope, user flows)
- [x] Define page list: login, register, dashboard, add/edit job
- [x] Define data model, field dictionary, status enum
- [x] Freeze P0 scope — no new features after this

### Day 2 — Database + Auth backend
- [ ] Set up Alembic migrations
- [ ] Create `users` and `job_applications` tables
- [ ] Implement register endpoint (hash password, create user)
- [ ] Implement login endpoint (verify password, return JWT)
- [ ] Implement `/auth/me` endpoint
- [ ] Test with httpie or Postman

### Day 3 — Job CRUD backend
- [ ] POST /api/jobs — create job (auth required)
- [ ] GET /api/jobs — list jobs with ?status= and ?q= filters
- [ ] GET /api/jobs/:id — single job
- [ ] PUT /api/jobs/:id — update job (owner only)
- [ ] DELETE /api/jobs/:id — delete job (owner only)
- [ ] GET /api/jobs/stats — counts grouped by status

### Day 4 — Frontend auth pages
- [ ] Login page with form + validation
- [ ] Register page
- [ ] JWT storage + auth context/provider
- [ ] Protected route wrapper (redirect to /login if no token)
- [ ] Basic layout component (nav bar with logout)

### Day 5 — Frontend job list + dashboard
- [ ] Dashboard page with stat cards
- [ ] Job list table/cards
- [ ] Status filter dropdown
- [ ] Search input
- [ ] Wire up to backend API

### Day 6 — Frontend add/edit forms
- [ ] Add job form page
- [ ] Edit job form page (pre-filled)
- [ ] Delete confirmation
- [ ] Form validation
- [ ] Success/error toasts

### Day 7 — Integration + polish
- [ ] End-to-end flow testing (register → add jobs → filter → dashboard)
- [ ] Fix bugs from the week
- [ ] Responsive design pass (mobile-friendly)
- [ ] Loading states and error handling

## Week 2 — Deploy + polish + P1

### Day 8 — Deploy backend
- [ ] Set up Railway project (PostgreSQL + FastAPI)
- [ ] Configure env vars
- [ ] Verify API works on Railway URL
- [ ] Set up CORS for production frontend URL

### Day 9 — Deploy frontend
- [ ] Deploy to Vercel
- [ ] Point to Railway backend URL
- [ ] Verify full flow works in production
- [ ] Custom domain if I have one

### Day 10 — Bug fixes + UX polish
- [ ] Fix any deploy-related bugs
- [ ] Improve form UX (better date picker, autofocus, etc.)
- [ ] Empty states ("No applications yet — add your first one!")
- [ ] Better error messages

### Day 11 — P1: Kanban board (if time)
- [ ] Kanban view with columns per status
- [ ] Drag-and-drop to change status (dnd-kit)
- [ ] Toggle between list view and kanban view

### Day 12 — P1: Reminders + CSV export (if time)
- [ ] Interview reminder logic (24h before)
- [ ] CSV export button on dashboard
- [ ] Email or in-app notification for reminders

### Day 13 — User testing
- [ ] Share with 5-10 friends
- [ ] Collect feedback (bugs, UX issues, feature requests)
- [ ] Fix critical bugs same day

### Day 14 — Final polish + wrap up
- [ ] Address user feedback
- [ ] Final README update
- [ ] Record a quick demo / screenshot for portfolio
- [ ] Write a short retrospective
