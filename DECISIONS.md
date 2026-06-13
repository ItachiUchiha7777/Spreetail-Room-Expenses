# Architectural Decisions Log

This document records the architectural and design decisions made during the construction of the Shared Flatmate Expenses App.

## 1. Database & ORM Selection: PostgreSQL + Prisma ORM
- **Options Considered:**
  1. PostgreSQL with raw SQL (`pg` driver).
  2. PostgreSQL with Prisma ORM.
- **Decision:** PostgreSQL with Prisma ORM.
- **Why:** Prisma provides an excellent developer experience with typed queries, automated schema migrations, and a clean schema configuration file (`schema.prisma`). It makes inspecting generated SQL queries simple and fits the relational requirement of the specification perfectly.

## 2. Membership Timeline Model for Non-Continuous Guests (Dev & Kabir)
- **Options Considered:**
  1. **Option A:** Allow multiple `GroupMembership` rows per `(user_id, group_id)`. Active status on date $D$ is defined as the existence of a membership row where $joined\_at \le D \le left\_at$ (or null).
  2. **Option B:** Treat Dev and Kabir as non-members entirely, creating a lightweight "guest participant" concept outside of standard group views.
- **Decision:** **Option A**.
- **Why:** Option A is clean and uniform. It models Dev's two separate visits (Weekend visit in Feb, Goa trip in March) and Kabir's one-day guest stint naturally using the same table structure without adding special-cased "guest" entities. It allows guest balances to automatically flow into the group balance/debt simplification screens.

## 3. Settlements Persistence
- **Options Considered:**
  1. Store settlements in the `Expense` table with a flag `isSettlement = true`.
  2. Store settlements in a separate dedicated `Settlement` table.
- **Decision:** Separate `Settlement` table (Option 2).
- **Why:** A separate table avoids column pollution on the `Expense` table (which requires payer, currency, exchange rate, split type, splits, etc.) and keeps queries on both tables straightforward. Settlements only need: group_id, paid_by, paid_to, amount, currency, settled_date, note.

## 4. Staging Strategy for Pending CSV Imports
- **Options Considered:**
  1. Keep pending imports in-memory or in the client session state.
  2. Persist staging records in temporary JSON or staging tables in PostgreSQL.
- **Decision:** Persist pending imports in `ImportBatch` with a structured `rawData` JSON column, along with individual anomalies tracked in `ImportAnomaly`.
- **Why:** This ensures that imports do not get lost if a user closes their browser or refreshes the page mid-review. They can resume resolving errors at any time. Once approved, the importer parses the staged JSON, applies the resolutions, and commits final rows in a single db transaction.

## 5. Currency Conversion Policy
- **Options Considered:**
  1. Automatically query an external API for historical exchange rates.
  2. Prompt the user for a single exchange rate per import batch.
- **Decision:** Prompt the user once for a single batch-wide conversion rate (e.g. USD -> INR) during the import review step.
- **Why:** The CSV has no exchange-rate column, and automated rates might mismatch the group's actual agreed rate. A single prompt balances automation with human-in-the-loop accuracy.

## 6. Firebase CDN Loading for Zero-Install Google OAuth
- **Options Considered:**
  1. Force dependency installations locally using standard npm commands.
  2. Load Firebase SDK Web Compatibility bundles via CDN script injections.
- **Decision:** Load Firebase SDK through CDN scripts in `index.html` and resolve via global `window.firebase`.
- **Why:** The user's system ran out of disk space (`ENOSPC`), failing local packages installations. CDN scripts solve this constraint beautifully without consuming any disk storage.

## 7. Date Normalized Midnight Math for Active Check
- **Options Considered:**
  1. Compare dates directly using standard Date objects (`joinedAt <= selectedDate`).
  2. Normalize all compare dates to midnight (`00:00:00.000`) before comparing.
- **Decision:** Normalize dates to midnight before comparing.
- **Why:** Join timestamps have time-of-day offsets, causing midnight-parsed selected dates to incorrectly register users as inactive on the day they joined. Normalizing to midnight ignores timestamps and compares solely on years/months/days.
