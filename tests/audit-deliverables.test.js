import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { parseCsvToObjects } from '../server/src/lib/csv.js';

const csv = parseCsvToObjects(readFileSync(new URL('../docs/audit/accessibility-audit.csv', import.meta.url), 'utf-8'));
const html = readFileSync(new URL('../client/public/index.html', import.meta.url), 'utf-8');

test('audit worksheet documents at least five issues, each with evidence and a fix', () => {
  assert.ok(csv.length >= 5);
  for (const row of csv) {
    assert.match(row.issue_id, /^WEB-\d{3}$/);
    assert.ok(row.evidence.length > 20, `${row.issue_id} needs evidence`);
    assert.ok(row.recommended_fix.length > 10, `${row.issue_id} needs a fix`);
    assert.ok(['High', 'Medium', 'Low'].includes(row.severity), `${row.issue_id} severity`);
  }
});

test('client page meets the project accessibility baseline', () => {
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="skip-link" href="#main"/);
  assert.match(html, /<main id="main"/);
  assert.match(html, /<label for="severity">/);
  assert.match(html, /role="status"/);
  assert.match(html, /<th scope="col">/);
});
