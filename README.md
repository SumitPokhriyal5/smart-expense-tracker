# Smart Expense Tracker with Analytics Dashboard

A full-stack web application that helps users record income and expenses, set monthly budgets, and understand their financial habits through an interactive analytics dashboard with smart, automatically generated insights.

**Live Demo:** https://smart-expense-tracker-sigma-jade.vercel.app
**API:** https://smart-expense-tracker-ez5t.onrender.com

> Demo credentials — `test@example.com` / `123456` (pre-seeded with sample data)

---

## Features

- **Authentication** — Secure JWT-based register/login with hashed passwords.
- **Transactions** — Full CRUD with category, payment method, tags, notes, and date. Search, multi-filter, sort, and pagination.
- **Budgets** — Set monthly limits per category with live spent-vs-limit progress and over-budget warnings.
- **Smart Insights Engine** — Auto-computed savings rate, month-over-month change, top spending category, daily burn, and end-of-month projection, with human-readable advice messages.
- **Interactive Dashboard** — Date-range filter (this month / last month), summary cards, insight cards, smart messages, budget health widget, and three chart types (pie, line, bar).
- **Recurring Transactions** — Templates for monthly items (rent, salary) with one-click generation.
- **CSV Export** — Download filtered transactions for personal records.
- **Dark Mode** — System-preference aware, persisted across sessions.
- **Responsive** — Works on mobile, tablet, and desktop.
- **Landing Page** — Marketing-style home with animated hero, scroll-revealed stats and features.

---

## Tech Stack

**Frontend:** React 18 · TypeScript · Vite · Tailwind CSS · React Router · Recharts
**Backend:** Node.js · Express · MongoDB (Mongoose) · JWT · bcrypt
**Deployment:** Vercel (frontend) · Render (backend) · MongoDB Atlas (database)

---

## Architecture

┌───────────────┐ HTTPS / JSON ┌──────────────────┐
│ Frontend │ ───────────────────────────▶ │ Backend │
│ React + TS │ │ Express + Node │
│ (Vercel) │ ◀─────────────────────────── │ (Render) │
└───────────────┘ JWT in Authorization └────────┬─────────┘
│
│ Mongoose
▼
┌──────────────────┐
│ MongoDB Atlas │
│ users · txns · │
│ budgets · rec. │
└──────────────────┘

**Request flow:** the frontend stores the JWT in `localStorage` after login; a fetch wrapper attaches it as `Authorization: Bearer <token>` to every API call. The backend's `protect` middleware verifies the token, loads the user, and attaches them to `req.user`. Every controller scopes its queries to that user, so users can never read or modify another user's data.

---

## Project Structure

smart-expense-tracker/
├── backend/
│ ├── config/ # DB connection, JWT helper
│ ├── controllers/ # auth, transactions, budgets, analytics, insights, recurring
│ ├── middleware/ # JWT auth middleware
│ ├── models/ # User, Transaction, Budget, RecurringTransaction
│ ├── routes/ # Express routers
│ ├── seed.js # Sample data seeder
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/ # UI primitives, charts, modals, layout
│ │ ├── context/ # auth, theme, toast, date-range
│ │ ├── hooks/ # custom hooks
│ │ ├── lib/ # api wrapper, shared types
│ │ └── pages/ # Landing, Login, Register, Dashboard, Transactions, Budgets, Recurring, Settings
│ └── vite.config.ts
└── README.md

---

## Local Setup

**Prerequisites:** Node.js 18+, npm, a MongoDB Atlas account (free tier works).

### Backend

```bash
cd backend
npm install
```

Create `.env`:
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_long_random_string
CLIENT_URL=http://localhost:5173

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `.env`:
VITE_API_URL=http://localhost:5001/api

```bash
npm run dev
```

Open `http://localhost:5173`.

### Seed sample data (optional)

After registering `test@example.com` once via the UI:

```bash
cd backend && node seed.js
```

This inserts 22 transactions, 5 budgets, and 2 recurring rules across three months.

---

## API Overview

All endpoints under `/api`. Routes marked 🔒 require `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint         | Purpose                       |
| ------ | ---------------- | ----------------------------- |
| POST   | `/auth/register` | Create account, returns token |
| POST   | `/auth/login`    | Log in, returns token         |
| GET    | `/auth/profile`  | 🔒 Current user info          |
| PUT    | `/auth/profile`  | 🔒 Update name                |
| DELETE | `/auth/account`  | 🔒 Delete account (cascades)  |

### Transactions

| Method | Endpoint               | Purpose                                                                                        |
| ------ | ---------------------- | ---------------------------------------------------------------------------------------------- |
| GET    | `/transactions`        | 🔒 List with `search`, `type`, `category`, `paymentMethod`, `sortBy`, `order`, `page`, `limit` |
| POST   | `/transactions`        | 🔒 Create                                                                                      |
| PUT    | `/transactions/:id`    | 🔒 Update (ownership-checked)                                                                  |
| DELETE | `/transactions/:id`    | 🔒 Delete (ownership-checked)                                                                  |
| GET    | `/transactions/export` | 🔒 CSV download (respects filters)                                                             |

### Budgets

| Method | Endpoint          | Purpose                                            |
| ------ | ----------------- | -------------------------------------------------- |
| GET    | `/budgets`        | 🔒 List for `?month=YYYY-MM`                       |
| GET    | `/budgets/status` | 🔒 Budget vs actual with `state` (ok/warning/over) |
| POST   | `/budgets`        | 🔒 Set/update (upsert per category-month)          |
| DELETE | `/budgets/:id`    | 🔒 Delete                                          |

### Analytics & Insights

| Method | Endpoint              | Purpose                                |
| ------ | --------------------- | -------------------------------------- |
| GET    | `/analytics/summary`  | 🔒 Lifetime income, expense, balance   |
| GET    | `/analytics/category` | 🔒 Expense totals by category          |
| GET    | `/analytics/monthly`  | 🔒 Monthly income vs expense series    |
| GET    | `/insights`           | 🔒 Smart insights for `?month=YYYY-MM` |

### Recurring

| Method | Endpoint                  | Purpose                               |
| ------ | ------------------------- | ------------------------------------- |
| GET    | `/recurring`              | 🔒 List recurring rules               |
| POST   | `/recurring`              | 🔒 Create rule                        |
| POST   | `/recurring/:id/generate` | 🔒 Generate a transaction from a rule |
| DELETE | `/recurring/:id`          | 🔒 Delete rule                        |

---

## Security & Engineering Notes

- Passwords hashed with bcrypt (10 rounds) via a Mongoose `pre("save")` hook.
- JWTs signed with a server-only secret, expire in 30 days.
- Every protected controller scopes queries to `req.user._id`, preventing cross-user access.
- Compound unique index on `Budget(user, month, category)` enforces one-budget-per-category-per-month at the database level.
- Search/filter inputs are debounced on the frontend (300ms) to avoid request floods.
- Optimistic UI for delete with rollback on failure.
- Race conditions on rapid date-range changes are handled with a `cancelled` flag in fetch effects.
- CORS allowlists the frontend origin only.

---

## Future Scope

- Mobile app (React Native).
- AI-based expense prediction and budget recommendations.
- Automated recurring transaction generation via a scheduled job.
- Email/push budget alerts.
- Bank API integration for auto-import.
- Multi-currency support.

---

## Author

**Sumit Pokhriyal** — Final semester project, Vivekananda Global University.
