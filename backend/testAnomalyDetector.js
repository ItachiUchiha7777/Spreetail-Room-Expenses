const { detectAnomalies } = require('./utils/anomalyDetector');

// Standard seeded members list for testing
const mockMembers = [
  { id: 1, name: 'Aisha', joinedAt: new Date('2026-02-01'), leftAt: null },
  { id: 2, name: 'Rohan', joinedAt: new Date('2026-02-01'), leftAt: null },
  { id: 3, name: 'Priya', joinedAt: new Date('2026-02-01'), leftAt: null },
  { id: 4, name: 'Meera', joinedAt: new Date('2026-02-01'), leftAt: new Date('2026-03-31') },
  { id: 5, name: 'Sam', joinedAt: new Date('2026-04-08'), leftAt: null },
  { id: 6, name: 'Dev', joinedAt: new Date('2026-02-08'), leftAt: new Date('2026-02-08') }, // First visit
  { id: 6, name: 'Dev', joinedAt: new Date('2026-03-08'), leftAt: new Date('2026-03-14') }, // Second visit
  { id: 7, name: 'Kabir', joinedAt: new Date('2026-03-11'), leftAt: new Date('2026-03-11') }, // Guest stint
];

// Helper to run a test and print outcome
let testsFailed = 0;
function assertAnomaly(testName, rows, expectedType) {
  const result = detectAnomalies(rows, mockMembers);
  const found = result.anomalies.some(an => an.type === expectedType);
  if (found) {
    console.log(`[PASS] ${testName}`);
  } else {
    console.error(`[FAIL] ${testName} - Expected anomaly type "${expectedType}" not found!`);
    console.error('Detected anomalies:', result.anomalies);
    testsFailed++;
  }
}

console.log('Running Anomaly Detection Engine Tests...');

// 1. Duplicate checks (#1)
assertAnomaly('Exact Duplicate detection', [
  { date: '08-02-2026', description: 'Dinner Marina Bites', paid_by: 'Dev', amount: '3200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan;Dev' },
  { date: '08-02-2026', description: 'dinner - marina bites', paid_by: 'Dev', amount: '3200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan;Dev' }
], '#1');

// 2. Comma formatted amount (#2)
assertAnomaly('Comma formatted amount', [
  { date: '08-02-2026', description: 'Rent payment', paid_by: 'Aisha', amount: '1,200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#2');

// 3. Name casing (#3)
assertAnomaly('Lowercase name casing', [
  { date: '08-02-2026', description: 'Groceries', paid_by: 'priya', amount: '500', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#3');

// 4. Excess decimal precision (#4)
assertAnomaly('Excess decimal precision', [
  { date: '08-02-2026', description: 'Gas refill', paid_by: 'Priya', amount: '899.995', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#4');

// 5. Name variant with extra characters (#5)
assertAnomaly('Name variant Priya S', [
  { date: '08-02-2026', description: 'Cafe bites', paid_by: 'Priya S', amount: '350', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#5');

// 6. Non-standard split type unequal (#6)
assertAnomaly('Unequal split mapping', [
  { date: '08-02-2026', description: 'Cake', paid_by: 'Aisha', amount: '1500', currency: 'INR', split_type: 'unequal', split_with: 'Rohan;Priya;Meera', split_details: 'Rohan 700; Priya 400; Meera 400' }
], '#6');

// 7. Missing payer name (#7)
assertAnomaly('Blank payer name', [
  { date: '08-02-2026', description: 'Soap', paid_by: '', amount: '150', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#7');

// 8. Settlement logged as expense (#8)
assertAnomaly('Settlement back detection', [
  { date: '08-02-2026', description: 'Rohan paid Aisha back', paid_by: 'Rohan', amount: '5000', currency: 'INR', split_type: '', split_with: 'Aisha' }
], '#8');

// 9. Percentage sum mismatch 110% (#9)
assertAnomaly('Pizza 110% percentage sum', [
  { date: '08-02-2026', description: 'Pizza Friday', paid_by: 'Aisha', amount: '1800', currency: 'INR', split_type: 'percentage', split_with: 'Aisha;Rohan;Priya;Meera', split_details: 'Aisha 30%; Rohan 30%; Priya 30%; Meera 20%' }
], '#9');

// 10. Foreign currency no rate (#10)
assertAnomaly('USD entry with no rate', [
  { date: '09-03-2026', description: 'Scuba Diving', paid_by: 'Rohan', amount: '540', currency: 'USD', split_type: 'equal', split_with: 'Aisha;Rohan;Priya;Meera' }
], '#10');

// 11. Non-member guest Kabir (#11)
assertAnomaly('Non-member guest Kabir', [
  { date: '11-03-2026', description: 'Parasailing', paid_by: 'Dev', amount: '150', currency: 'USD', split_type: 'equal', split_with: 'Dev;Dev\'s friend Kabir' }
], '#11');

// 12. Conflicting duplicate event (#12)
assertAnomaly('Thalassa conflicting duplicates', [
  { date: '11-03-2026', description: 'Dinner at Thalassa', paid_by: 'Aisha', amount: '2400', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' },
  { date: '11-03-2026', description: 'Thalassa dinner', paid_by: 'Rohan', amount: '2450', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#12');

// 13. Negative amount refund (#13)
assertAnomaly('Negative amount refund', [
  { date: '12-03-2026', description: 'Parasailing refund', paid_by: 'Dev', amount: '-30', currency: 'USD', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#13');

// 14. Date missing year (#14)
assertAnomaly('Date format Mar-14', [
  { date: '08-03-2026', description: 'Standard row', paid_by: 'Aisha', amount: '200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' },
  { date: 'Mar-14', description: 'Goa dinner', paid_by: 'Rohan', amount: '1200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#14');

// 15. Whitespace in name (#15)
assertAnomaly('Trailing space name', [
  { date: '14-03-2026', description: 'Dinner', paid_by: 'rohan ', amount: '800', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#15');

// 16. Missing currency fallback (#16)
assertAnomaly('Blank currency string', [
  { date: '15-03-2026', description: 'Groceries', paid_by: 'Priya', amount: '1200', currency: '', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#16');

// 17. Zero-amount expense (#17)
assertAnomaly('Zero amount logging', [
  { date: '15-03-2026', description: 'Swiggy order', paid_by: 'Priya', amount: '0', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#17');

// 18. Ambiguous date format (#18)
assertAnomaly('Ambiguous date 04-05-2026', [
  { date: '04-05-2026', description: 'May bill', paid_by: 'Aisha', amount: '3500', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan' }
], '#18');

// 19. Departed member in split_with (#19)
assertAnomaly('Departed member Meera in April', [
  { date: '02-04-2026', description: 'Groceries BigBasket', paid_by: 'Aisha', amount: '2640', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan;Priya;Meera' }
], '#19');

// 20. Equal split details redundancy (#20)
assertAnomaly('Redundant split details with equal', [
  { date: '02-04-2026', description: 'Furniture', paid_by: 'Aisha', amount: '8000', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan;Priya;Sam', split_details: 'Aisha 1; Rohan 1; Priya 1; Sam 1' }
], '#20');

// 21. Personal transfer mislabeled (#21)
assertAnomaly('Personal transfer Sam deposit', [
  { date: '08-04-2026', description: 'Sam deposit share', paid_by: 'Sam', amount: '15000', currency: 'INR', split_type: 'equal', split_with: 'Aisha' }
], '#21');

// 22. Non-contiguous guest visit Dev (#22)
assertAnomaly('Dev non-contiguous dates gap', [
  { date: '08-02-2026', description: 'Marina Bites', paid_by: 'Dev', amount: '3200', currency: 'INR', split_type: 'equal', split_with: 'Aisha;Rohan;Dev' },
  { date: '09-03-2026', description: 'Goa scuba', paid_by: 'Rohan', amount: '540', currency: 'USD', split_type: 'equal', split_with: 'Aisha;Rohan;Dev' }
], '#22');

console.log(`\nTests execution complete. Errors found: ${testsFailed}`);
if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('All anomaly check assertions passed successfully!');
  process.exit(0);
}
