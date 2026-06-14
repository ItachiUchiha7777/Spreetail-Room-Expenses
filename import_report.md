# CSV Import & Anomaly Detection Report

This report lists the details of CSV file imports, every anomaly detected, and the resolution or action taken.

## Import Batch #4: Expenses Export.csv
- **Imported At:** 2026-06-13T18:25:07.087Z
- **Status:** pending_review
- **Total Anomalies Flagged:** 206

| Anomaly Code | Row Ref | Description | Action / Policy | Status | Map Type |
| --- | --- | --- | --- | --- | --- |
| **#22** | N/A | Guest "Aisha" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Rohan" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Priya" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Dev" has non-contiguous participation dates (active around 2/8/2026 and again around 3/8/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#18** | Row 2 | Row 2: Ambiguous date format "01-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 2 | Row 2: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 3 | Row 3: Ambiguous date format "03-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 3 | Row 3: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 4 | Row 4: Ambiguous date format "05-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 4 | Row 4: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 5 | Row 5: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 5 | Row 5: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#1** | Row 5 | Row 5 ("Dinner at Marina Bites") and Row 6 ("dinner - marina bites") are exact duplicate expenses. | Keep first occurrence, drop duplicate Row. | `pending_approval` | Action Required |
| **#18** | Row 6 | Row 6: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 6 | Row 6: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#2** | Row 7 | Row 7: Amount contains commas ("1,200"). | Strip commas from amount string. | `auto_handled` | Auto Resolved |
| **#18** | Row 7 | Row 7: Ambiguous date format "10-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 7 | Row 7: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 8 | Row 8: Ambiguous date format "12-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 8 | Row 8: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#4** | Row 10 | Row 10: Excess decimal precision in amount "899.995". | Round excess decimals to 2 decimal places. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#6** | Row 12 | Row 12: Non-standard split type "unequal". | Map non-canonical split_type "unequal" -> "exact". | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#7** | Row 13 | Row 13: Payer name is blank. Description: "House cleaning supplies". | Stage row; prompt human reviewer to assign payer. | `pending_approval` | Action Required |
| **#11** | Row 13 | Row 13: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#8** | Row 14 | Row 14: Settlement logged as an expense (blank split_type, single name in split_with). | Reclassify settlement row from expense to settlements table. | `auto_handled` | Auto Resolved |
| **#11** | Row 14 | Row 14: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 15 | Row 15: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#18** | Row 16 | Row 16: Ambiguous date format "01-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 16 | Row 16: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 17 | Row 17: Ambiguous date format "03-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 17 | Row 17: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 18 | Row 18: Ambiguous date format "05-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 18 | Row 18: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 19 | Row 19: Ambiguous date format "08-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 19 | Row 19: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 20 | Row 20: USD/Foreign currency transaction found (540 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 20 | Row 20: Ambiguous date format "09-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 20 | Row 20: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 21 | Row 21: USD/Foreign currency transaction found (84 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 21 | Row 21: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 21 | Row 21: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 22 | Row 22: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 22 | Row 22: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 23 | Row 23: USD/Foreign currency transaction found (150 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 23 | Row 23: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 23 | Row 23: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev's friend Kabir" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 24 | Row 24: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 24 | Row 24: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#12** | Row 24 | Row 24 ("Dinner at Thalassa" paid by Aisha ₹2400) and Row 25 ("Thalassa dinner" paid by Rohan ₹2450) look like conflicting duplicates for the same event. | Flag conflicting duplicates; prompt reviewer to pick/merge. | `pending_approval` | Action Required |
| **#18** | Row 25 | Row 25: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 25 | Row 25: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#13** | Row 26 | Row 26: Negative amount found (-30). | Treat negative amount as negative expense (refund). | `auto_handled` | Auto Resolved |
| **#10** | Row 26 | Row 26: USD/Foreign currency transaction found (-30 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 26 | Row 26: Ambiguous date format "12-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 26 | Row 26: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#14** | Row 27 | Row 27: Date has non-standard format "Mar-14". | Infer missing year in date from surrounding rows. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#16** | Row 28 | Row 28: Currency is missing. | Default missing currency to "INR". | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#17** | Row 31 | Row 31: Zero amount expense "Dinner order Swiggy". | Import with zero splits for auditing purposes. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 32 | Row 32: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#11** | Row 33 | Row 33: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 34 | Row 34: Ambiguous date format "04-05-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 34 | Row 34: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 35 | Row 35: Ambiguous date format "01-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 35 | Row 35: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 36 | Row 36: Ambiguous date format "02-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 36 | Row 36: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 37 | Row 37: Ambiguous date format "05-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 37 | Row 37: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 38 | Row 38: Ambiguous date format "08-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#21** | Row 38 | Row 38: Personal transfer logged as group expense ("Sam deposit share"). | Reclassify personal transfer row to settlements. | `pending_approval` | Action Required |
| **#11** | Row 38 | Row 38: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 39 | Row 39: Ambiguous date format "10-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 39 | Row 39: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 40 | Row 40: Ambiguous date format "12-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 40 | Row 40: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#20** | Row 42 | Row 42: Split type is "equal" but "split_details" lists individual shares. | Ignore redundant split details and split equally. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |

---

## Import Batch #3: Expenses Export.csv
- **Imported At:** 2026-06-13T18:21:45.427Z
- **Status:** pending_review
- **Total Anomalies Flagged:** 206

| Anomaly Code | Row Ref | Description | Action / Policy | Status | Map Type |
| --- | --- | --- | --- | --- | --- |
| **#22** | N/A | Guest "Aisha" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Rohan" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Priya" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Dev" has non-contiguous participation dates (active around 2/8/2026 and again around 3/8/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#18** | Row 2 | Row 2: Ambiguous date format "01-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 2 | Row 2: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 3 | Row 3: Ambiguous date format "03-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 3 | Row 3: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 4 | Row 4: Ambiguous date format "05-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 4 | Row 4: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 5 | Row 5: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 5 | Row 5: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#1** | Row 5 | Row 5 ("Dinner at Marina Bites") and Row 6 ("dinner - marina bites") are exact duplicate expenses. | Keep first occurrence, drop duplicate Row. | `pending_approval` | Action Required |
| **#18** | Row 6 | Row 6: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 6 | Row 6: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#2** | Row 7 | Row 7: Amount contains commas ("1,200"). | Strip commas from amount string. | `auto_handled` | Auto Resolved |
| **#18** | Row 7 | Row 7: Ambiguous date format "10-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 7 | Row 7: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 8 | Row 8: Ambiguous date format "12-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 8 | Row 8: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#4** | Row 10 | Row 10: Excess decimal precision in amount "899.995". | Round excess decimals to 2 decimal places. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#6** | Row 12 | Row 12: Non-standard split type "unequal". | Map non-canonical split_type "unequal" -> "exact". | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#7** | Row 13 | Row 13: Payer name is blank. Description: "House cleaning supplies". | Stage row; prompt human reviewer to assign payer. | `pending_approval` | Action Required |
| **#11** | Row 13 | Row 13: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#8** | Row 14 | Row 14: Settlement logged as an expense (blank split_type, single name in split_with). | Reclassify settlement row from expense to settlements table. | `auto_handled` | Auto Resolved |
| **#11** | Row 14 | Row 14: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 15 | Row 15: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#18** | Row 16 | Row 16: Ambiguous date format "01-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 16 | Row 16: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 17 | Row 17: Ambiguous date format "03-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 17 | Row 17: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 18 | Row 18: Ambiguous date format "05-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 18 | Row 18: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 19 | Row 19: Ambiguous date format "08-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 19 | Row 19: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 20 | Row 20: USD/Foreign currency transaction found (540 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 20 | Row 20: Ambiguous date format "09-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 20 | Row 20: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 21 | Row 21: USD/Foreign currency transaction found (84 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 21 | Row 21: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 21 | Row 21: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 22 | Row 22: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 22 | Row 22: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 23 | Row 23: USD/Foreign currency transaction found (150 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 23 | Row 23: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 23 | Row 23: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev's friend Kabir" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 24 | Row 24: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 24 | Row 24: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#12** | Row 24 | Row 24 ("Dinner at Thalassa" paid by Aisha ₹2400) and Row 25 ("Thalassa dinner" paid by Rohan ₹2450) look like conflicting duplicates for the same event. | Flag conflicting duplicates; prompt reviewer to pick/merge. | `pending_approval` | Action Required |
| **#18** | Row 25 | Row 25: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 25 | Row 25: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#13** | Row 26 | Row 26: Negative amount found (-30). | Treat negative amount as negative expense (refund). | `auto_handled` | Auto Resolved |
| **#10** | Row 26 | Row 26: USD/Foreign currency transaction found (-30 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 26 | Row 26: Ambiguous date format "12-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 26 | Row 26: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#14** | Row 27 | Row 27: Date has non-standard format "Mar-14". | Infer missing year in date from surrounding rows. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#16** | Row 28 | Row 28: Currency is missing. | Default missing currency to "INR". | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#17** | Row 31 | Row 31: Zero amount expense "Dinner order Swiggy". | Import with zero splits for auditing purposes. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 32 | Row 32: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#11** | Row 33 | Row 33: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 34 | Row 34: Ambiguous date format "04-05-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 34 | Row 34: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 35 | Row 35: Ambiguous date format "01-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 35 | Row 35: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 36 | Row 36: Ambiguous date format "02-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 36 | Row 36: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 37 | Row 37: Ambiguous date format "05-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 37 | Row 37: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 38 | Row 38: Ambiguous date format "08-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#21** | Row 38 | Row 38: Personal transfer logged as group expense ("Sam deposit share"). | Reclassify personal transfer row to settlements. | `pending_approval` | Action Required |
| **#11** | Row 38 | Row 38: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 39 | Row 39: Ambiguous date format "10-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 39 | Row 39: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 40 | Row 40: Ambiguous date format "12-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 40 | Row 40: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#20** | Row 42 | Row 42: Split type is "equal" but "split_details" lists individual shares. | Ignore redundant split details and split equally. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |

---

## Import Batch #2: Expenses Export.csv
- **Imported At:** 2026-06-13T18:18:57.414Z
- **Status:** pending_review
- **Total Anomalies Flagged:** 206

| Anomaly Code | Row Ref | Description | Action / Policy | Status | Map Type |
| --- | --- | --- | --- | --- | --- |
| **#22** | N/A | Guest "Aisha" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Rohan" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Priya" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Dev" has non-contiguous participation dates (active around 2/8/2026 and again around 3/8/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#18** | Row 2 | Row 2: Ambiguous date format "01-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 2 | Row 2: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 3 | Row 3: Ambiguous date format "03-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 3 | Row 3: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 4 | Row 4: Ambiguous date format "05-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 4 | Row 4: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 5 | Row 5: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 5 | Row 5: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#1** | Row 5 | Row 5 ("Dinner at Marina Bites") and Row 6 ("dinner - marina bites") are exact duplicate expenses. | Keep first occurrence, drop duplicate Row. | `pending_approval` | Action Required |
| **#18** | Row 6 | Row 6: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 6 | Row 6: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#2** | Row 7 | Row 7: Amount contains commas ("1,200"). | Strip commas from amount string. | `auto_handled` | Auto Resolved |
| **#18** | Row 7 | Row 7: Ambiguous date format "10-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 7 | Row 7: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 8 | Row 8: Ambiguous date format "12-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 8 | Row 8: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#4** | Row 10 | Row 10: Excess decimal precision in amount "899.995". | Round excess decimals to 2 decimal places. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#6** | Row 12 | Row 12: Non-standard split type "unequal". | Map non-canonical split_type "unequal" -> "exact". | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#7** | Row 13 | Row 13: Payer name is blank. Description: "House cleaning supplies". | Stage row; prompt human reviewer to assign payer. | `pending_approval` | Action Required |
| **#11** | Row 13 | Row 13: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#8** | Row 14 | Row 14: Settlement logged as an expense (blank split_type, single name in split_with). | Reclassify settlement row from expense to settlements table. | `auto_handled` | Auto Resolved |
| **#11** | Row 14 | Row 14: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 15 | Row 15: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#18** | Row 16 | Row 16: Ambiguous date format "01-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 16 | Row 16: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 17 | Row 17: Ambiguous date format "03-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 17 | Row 17: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 18 | Row 18: Ambiguous date format "05-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 18 | Row 18: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 19 | Row 19: Ambiguous date format "08-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 19 | Row 19: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 20 | Row 20: USD/Foreign currency transaction found (540 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 20 | Row 20: Ambiguous date format "09-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 20 | Row 20: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 21 | Row 21: USD/Foreign currency transaction found (84 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 21 | Row 21: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 21 | Row 21: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 22 | Row 22: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 22 | Row 22: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 23 | Row 23: USD/Foreign currency transaction found (150 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 23 | Row 23: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 23 | Row 23: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev's friend Kabir" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 24 | Row 24: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 24 | Row 24: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#12** | Row 24 | Row 24 ("Dinner at Thalassa" paid by Aisha ₹2400) and Row 25 ("Thalassa dinner" paid by Rohan ₹2450) look like conflicting duplicates for the same event. | Flag conflicting duplicates; prompt reviewer to pick/merge. | `pending_approval` | Action Required |
| **#18** | Row 25 | Row 25: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 25 | Row 25: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#13** | Row 26 | Row 26: Negative amount found (-30). | Treat negative amount as negative expense (refund). | `auto_handled` | Auto Resolved |
| **#10** | Row 26 | Row 26: USD/Foreign currency transaction found (-30 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 26 | Row 26: Ambiguous date format "12-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 26 | Row 26: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#14** | Row 27 | Row 27: Date has non-standard format "Mar-14". | Infer missing year in date from surrounding rows. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#16** | Row 28 | Row 28: Currency is missing. | Default missing currency to "INR". | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#17** | Row 31 | Row 31: Zero amount expense "Dinner order Swiggy". | Import with zero splits for auditing purposes. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 32 | Row 32: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#11** | Row 33 | Row 33: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 34 | Row 34: Ambiguous date format "04-05-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 34 | Row 34: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 35 | Row 35: Ambiguous date format "01-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 35 | Row 35: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 36 | Row 36: Ambiguous date format "02-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 36 | Row 36: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 37 | Row 37: Ambiguous date format "05-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 37 | Row 37: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 38 | Row 38: Ambiguous date format "08-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#21** | Row 38 | Row 38: Personal transfer logged as group expense ("Sam deposit share"). | Reclassify personal transfer row to settlements. | `pending_approval` | Action Required |
| **#11** | Row 38 | Row 38: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 39 | Row 39: Ambiguous date format "10-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 39 | Row 39: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 40 | Row 40: Ambiguous date format "12-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 40 | Row 40: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#20** | Row 42 | Row 42: Split type is "equal" but "split_details" lists individual shares. | Ignore redundant split details and split equally. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |

---

## Import Batch #1: Expenses Export.csv
- **Imported At:** 2026-06-13T18:17:49.771Z
- **Status:** pending_review
- **Total Anomalies Flagged:** 206

| Anomaly Code | Row Ref | Description | Action / Policy | Status | Map Type |
| --- | --- | --- | --- | --- | --- |
| **#22** | N/A | Guest "Aisha" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Rohan" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Priya" has non-contiguous participation dates (active around 4/20/2026 and again around 5/4/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#22** | N/A | Guest "Dev" has non-contiguous participation dates (active around 2/8/2026 and again around 3/8/2026). | Auto-create distinct membership windows for non-contiguous visits. | `auto_handled` | Auto Resolved |
| **#18** | Row 2 | Row 2: Ambiguous date format "01-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 2 | Row 2: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 2 | Row 2: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 3 | Row 3: Ambiguous date format "03-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 3 | Row 3: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 3 | Row 3: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 4 | Row 4: Ambiguous date format "05-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 4 | Row 4: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 4 | Row 4: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 5 | Row 5: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 5 | Row 5: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 5 | Row 5: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#1** | Row 5 | Row 5 ("Dinner at Marina Bites") and Row 6 ("dinner - marina bites") are exact duplicate expenses. | Keep first occurrence, drop duplicate Row. | `pending_approval` | Action Required |
| **#18** | Row 6 | Row 6: Ambiguous date format "08-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 6 | Row 6: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 6 | Row 6: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#2** | Row 7 | Row 7: Amount contains commas ("1,200"). | Strip commas from amount string. | `auto_handled` | Auto Resolved |
| **#18** | Row 7 | Row 7: Ambiguous date format "10-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 7 | Row 7: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 7 | Row 7: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 8 | Row 8: Ambiguous date format "12-02-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 8 | Row 8: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 8 | Row 8: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 9 | Row 9: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#4** | Row 10 | Row 10: Excess decimal precision in amount "899.995". | Round excess decimals to 2 decimal places. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 10 | Row 10: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 11 | Row 11: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#6** | Row 12 | Row 12: Non-standard split type "unequal". | Map non-canonical split_type "unequal" -> "exact". | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 12 | Row 12: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#7** | Row 13 | Row 13: Payer name is blank. Description: "House cleaning supplies". | Stage row; prompt human reviewer to assign payer. | `pending_approval` | Action Required |
| **#11** | Row 13 | Row 13: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 13 | Row 13: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#8** | Row 14 | Row 14: Settlement logged as an expense (blank split_type, single name in split_with). | Reclassify settlement row from expense to settlements table. | `auto_handled` | Auto Resolved |
| **#11** | Row 14 | Row 14: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 15 | Row 15: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 15 | Row 15: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#18** | Row 16 | Row 16: Ambiguous date format "01-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 16 | Row 16: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 16 | Row 16: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 17 | Row 17: Ambiguous date format "03-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 17 | Row 17: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 17 | Row 17: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 18 | Row 18: Ambiguous date format "05-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 18 | Row 18: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 18 | Row 18: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 19 | Row 19: Ambiguous date format "08-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 19 | Row 19: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 19 | Row 19: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 20 | Row 20: USD/Foreign currency transaction found (540 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 20 | Row 20: Ambiguous date format "09-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 20 | Row 20: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 20 | Row 20: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 21 | Row 21: USD/Foreign currency transaction found (84 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 21 | Row 21: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 21 | Row 21: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 21 | Row 21: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 22 | Row 22: Ambiguous date format "10-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 22 | Row 22: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 22 | Row 22: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#10** | Row 23 | Row 23: USD/Foreign currency transaction found (150 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 23 | Row 23: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 23 | Row 23: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 23 | Row 23: Non-member guest "Dev's friend Kabir" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 24 | Row 24: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 24 | Row 24: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 24 | Row 24: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#12** | Row 24 | Row 24 ("Dinner at Thalassa" paid by Aisha ₹2400) and Row 25 ("Thalassa dinner" paid by Rohan ₹2450) look like conflicting duplicates for the same event. | Flag conflicting duplicates; prompt reviewer to pick/merge. | `pending_approval` | Action Required |
| **#18** | Row 25 | Row 25: Ambiguous date format "11-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 25 | Row 25: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 25 | Row 25: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#13** | Row 26 | Row 26: Negative amount found (-30). | Treat negative amount as negative expense (refund). | `auto_handled` | Auto Resolved |
| **#10** | Row 26 | Row 26: USD/Foreign currency transaction found (-30 USD) with no exchange rate in CSV. | Prompt reviewer for foreign exchange conversion rate. | `pending_approval` | Action Required |
| **#18** | Row 26 | Row 26: Ambiguous date format "12-03-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 26 | Row 26: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 26 | Row 26: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#14** | Row 27 | Row 27: Date has non-standard format "Mar-14". | Infer missing year in date from surrounding rows. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 27 | Row 27: Non-member guest "Dev" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#16** | Row 28 | Row 28: Currency is missing. | Default missing currency to "INR". | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 28 | Row 28: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 29 | Row 29: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 30 | Row 30: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#17** | Row 31 | Row 31: Zero amount expense "Dinner order Swiggy". | Import with zero splits for auditing purposes. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 31 | Row 31: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 32 | Row 32: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#9** | Row 32 | Row 32: Percentage split details sum to 110% (Pizza/Brunch rows), not 100%. | Proportionally normalize percentage splits to sum to 100%. | `pending_approval` | Action Required |
| **#11** | Row 33 | Row 33: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 33 | Row 33: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 34 | Row 34: Ambiguous date format "04-05-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 34 | Row 34: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 34 | Row 34: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 35 | Row 35: Ambiguous date format "01-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 35 | Row 35: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 35 | Row 35: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 36 | Row 36: Ambiguous date format "02-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 36 | Row 36: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 36 | Row 36: Non-member guest "Meera" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 37 | Row 37: Ambiguous date format "05-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 37 | Row 37: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 37 | Row 37: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 38 | Row 38: Ambiguous date format "08-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#21** | Row 38 | Row 38: Personal transfer logged as group expense ("Sam deposit share"). | Reclassify personal transfer row to settlements. | `pending_approval` | Action Required |
| **#11** | Row 38 | Row 38: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 39 | Row 39: Ambiguous date format "10-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 39 | Row 39: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 39 | Row 39: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#18** | Row 40 | Row 40: Ambiguous date format "12-04-2026" (could be DD-MM or MM-DD). | Prompt reviewer to select date interpretation (DD-MM vs MM-DD). | `pending_approval` | Action Required |
| **#11** | Row 40 | Row 40: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 40 | Row 40: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 41 | Row 41: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#20** | Row 42 | Row 42: Split type is "equal" but "split_details" lists individual shares. | Ignore redundant split details and split equally. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 42 | Row 42: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Aisha" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Rohan" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Priya" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |
| **#11** | Row 43 | Row 43: Non-member guest "Sam" listed in splits. | Auto-create temporary guest membership on split date. | `auto_handled` | Auto Resolved |

---

