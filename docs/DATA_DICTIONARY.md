# Data Dictionary

## Tables

### `users`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PK, default gen | Using uuid4 |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Lowercased on insert |
| `password_hash` | VARCHAR(255) | NOT NULL | bcrypt hashed |
| `created_at` | TIMESTAMPTZ | NOT NULL, default now | |

### `job_applications`

| Column | Type | Constraints | Notes |
|--------|------|-------------|-------|
| `id` | UUID | PK, default gen | |
| `user_id` | UUID | FK → users.id, NOT NULL | ON DELETE CASCADE |
| `company` | VARCHAR(200) | NOT NULL | |
| `role` | VARCHAR(200) | NOT NULL | Job title / position |
| `link` | VARCHAR(500) | nullable | URL to posting |
| `status` | VARCHAR(20) | NOT NULL, default `applied` | See enum below |
| `applied_date` | DATE | NOT NULL | When I applied |
| `notes` | TEXT | nullable | Free-form notes |
| `created_at` | TIMESTAMPTZ | NOT NULL, default now | |
| `updated_at` | TIMESTAMPTZ | NOT NULL, auto-update | |

## Status Enum

Stored as lowercase strings in the DB. Frontend maps them to display labels.

| DB Value | Display Label | Color (suggestion) |
|----------|--------------|-------------------|
| `applied` | Applied | Blue |
| `phone_screen` | Phone Screen | Yellow |
| `interview` | Interview | Orange |
| `offer` | Offer 🎉 | Green |
| `rejected` | Rejected | Red |

No enforced transitions — users can set any status at any time.

## Indexes

- `users.email` — unique index (implicit from constraint)
- `job_applications.user_id` — regular index for fast lookups
- `job_applications.status` — regular index for filtering
