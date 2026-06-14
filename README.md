# Shared Flatmate Expenses App

A relational, timeline-aware expense sharing web application built with **React**, **Node.js (Express)**, **Prisma ORM**, and **PostgreSQL**. Features support for advanced split types, currency conversion, greedy debt simplification, and a robust 22-anomaly CSV import pipeline.

## Features

- **Auth System**: Login and Signup using JWT and bcrypt hashing.
- **Relational Timeline**: Group memberships track start/end dates. Members are only charged for expenses during their active periods. Dev's non-contiguous visits and Kabir's guest stint are supported.
- **Dynamic Splits**: Logs manual or imported expenses with `equal`, `percentage`, `share`, and `exact` models.
- **Greedy Debt Simplification**: Computes net balances (paid - owed + settlements) and simplifies transactions to a minimum pay list.
- **Rohan's Audit Trail**: Clear drill-down logs showing every single transaction contributing to a member's balance.
- **CSV Import Wizard**: Runs 22 checks against `expenses_export.csv`, displays a color-coded warning report, prompts for foreign exchange conversion rates, and features a human-in-the-loop wizard to resolve anomalies before committing.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (Neon DB or local)

### Installation

1. **Clone & Extract** the repository.
2. **Setup Environment**:
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_XCY5We4cJvEr@ep-lingering-river-ahab5yiv-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
   JWT_SECRET="supersecretkeyforflatmatesapp123!"
   PORT=5000
   ```

### Running the App

#### 1. Database Initialization & Seeding
From the `backend/` directory:
```bash
# Push schema to PostgreSQL
npx prisma db push

# Seed users and group memberships timeline
npx prisma db seed
```

#### 2. Start Backend API Server
From the `backend/` directory:
```bash
npm run dev
```
The server will start at `http://localhost:5000`.

#### 3. Start Frontend App
From the `frontend/` directory:
```bash
# Install frontend packages
npm install

# Start Vite server
npm run dev
```
The client app will open at `http://localhost:5173`.

---

## Seeding & Test Credentials
Seeding generates a group containing standard flatmates (Aisha, Rohan, Priya, Meera, Sam, Dev, Kabir) with passwords defaulted to:
- **Password:** `Password123`
- **User Emails:**
  - `aisha@example.com`
  - `rohan@example.com`
  - `priya@example.com`
  - `meera@example.com`
  - `sam@example.com`
  - `dev@example.com`
  - `kabir@example.com`

---

## Testing

To run the automated check verification suite for the 22 CSV anomalies:
```bash
cd backend
node testAnomalyDetector.js
```
All tests should return `[PASS]` and confirm zero error flags.

---

## AI Prompts Log

Below are the development and audit prompts used for building and testing this application:

1. **Scaffold & Architecture Setup**
   > "Scaffold planning for Node + Express backend + React Frontend + Prisma PostgreSQL."
2. **CSV Import Anomaly Detection Rules**
   > "Setup 22 anomaly detection rules with exact specifications for `auto_handled` vs `requires_approval` modes."
3. **Debt Simplification Engine**
   > "Implement greedy debt-simplification algorithm for net group balances."
4. **Import Report & Log Documentation**
   > "Please share the file Import report — produced by your app when it ingests the CSV, listing every anomaly detected and the action taken as per the  Assignment Task shared in the Drive notice ? and also write all my prompts in readme.md and all"

