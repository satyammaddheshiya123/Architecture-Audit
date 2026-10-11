import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCsv, parseCsvToObjects } from '../src/lib/csv.js';

test('parses commas, escaped quotes and newlines inside quoted fields', () => {
  const rows = parseCsv('a,b\n"x, y","say ""hi"""\n"line1\nline2",z\n');
  assert.deepEqual(rows, [['a', 'b'], ['x, y', 'say "hi"'], ['line1\nline2', 'z']]);
});

test('maps rows to objects by header and tolerates CRLF', () => {
  const out = parseCsvToObjects('id,name\r\n1,Ada\r\n2,Linus\r\n');
  assert.deepEqual(out, [{ id: '1', name: 'Ada' }, { id: '2', name: 'Linus' }]);
});
