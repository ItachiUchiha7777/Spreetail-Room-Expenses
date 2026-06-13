# AI Usage & Corrections Log

This log documents the AI tools utilized, key prompts, and specific cases where AI generation required corrections during the development of the Shared Flatmate Expenses App.

## 1. AI Tools & Key Prompts
- **AI Tool:** Antigravity (Powered by Gemini 3.5 Flash)
- **Key Prompts:**
  - Scaffold planning for Node + Express backend + React Frontend + Prisma PostgreSQL.
  - Setup 22 anomaly detection rules with exact specifications for `auto_handled` vs `requires_approval` modes.
  - Implement greedy debt-simplification algorithm for net group balances.

---

## 2. AI Corrections Catalog (Concrete Bug Fixes)

### Case #1: Substring Matching Failure on Settlement Descriptions
- **What was generated:** The importer scanned for settlement descriptions using a simple contiguous substring check: `fuzzyMatch(descriptionRaw, 'paid back')`.
- **Why it was wrong:** For the row "Rohan paid Aisha back", the normalized string became `rohanpaidaishaback`. Because "paid" and "back" were separated by "aisha", the substring check for `paidback` failed, resulting in the row not being reclassified as a settlement.
- **How it was caught:** The automated test runner (`testAnomalyDetector.js`) flagged a failure on `Settlement back detection`.
- **How it was fixed:** Refactored the keyword scanner to check for word presence rather than contiguous substrings:
  ```javascript
  const normDesc = (descriptionRaw || '').toLowerCase();
  const descMatchesSettlement = (normDesc.includes('paid') && normDesc.includes('back')) || ...
  ```

### Case #2: Reversed Word Order Description Matching Failure
- **What was generated:** Fuzzy description matching for duplicates checked if one normalized string was a substring of the other: `n1.includes(n2) || n2.includes(n1)`.
- **Why it was wrong:** It failed to match rows with reversed word order, such as "Dinner at Thalassa" vs "Thalassa dinner".
- **How it was caught:** The automated test runner flagged a failure on `Thalassa conflicting duplicates`.
- **How it was fixed:** Replaced the simple substring match with a word-overlap count algorithm. The function now splits description strings into words and checks if they share a high percentage of words:
  ```javascript
  const overlap = words1.filter(w => words2.includes(w));
  return overlap.length >= 2 || (overlap.length >= 1 && minOverlap === 1);
  ```

### Case #3: Interactive CLI Hang in Dev Migration
- **What was generated:** Proposed running database migration using `npx prisma migrate dev --name init`.
- **Why it was wrong:** The command hung indefinitely in the background environment because it expected terminal interaction to confirm database configuration.
- **How it was caught:** Checked background tasks and observed that the migration script had been running for several minutes with no progress logs beyond database connection.
- **How it was fixed:** Terminated the interactive command and used the non-interactive `npx prisma db push` command to sync schema modifications immediately.

### Case #4: ENOSPC Disk Space Limitation on Package Install
- **What was generated:** Instructed to install the `firebase` npm library on the React frontend using `npm install firebase`.
- **Why it was wrong:** The execution failed with `ENOSPC: no space left on device` due to disk space limitations on the user's workspace.
- **How it was caught:** Inspected logs for `npm install firebase` and witnessed a write error indicating no space remained.
- **How it was fixed:** Bypassed the installation package phase entirely by loading the Firebase Core and Auth Compatibility SDKs through CDN scripts in `index.html`, then resolving Firebase reference globally via `window.firebase` inside `firebase.js`.
