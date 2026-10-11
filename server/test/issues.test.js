import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { config } from '../src/config.js';

let server;
let base;

before(async () => {
  server = createApp({ issuesCsvPath: config.issuesCsvPath });
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});
after(() => new Promise((resolve) => server.close(resolve)));

test('GET /api/health', async () => {
  const res = await fetch(`${base}/api/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('GET /api/issues returns the audited issues', async () => {
  const body = await (await fetch(`${base}/api/issues`)).json();
  assert.ok(body.count >= 5);
  assert.equal(body.count, body.issues.length);
  assert.ok(body.issues[0].id.startsWith('WEB-'));
});

test('GET /api/issues?severity=High filters', async () => {
  const body = await (await fetch(`${base}/api/issues?severity=High`)).json();
  assert.ok(body.issues.length > 0);
  assert.ok(body.issues.every((i) => i.severity === 'High'));
});

test('rejects unknown severity with 400', async () => {
  const res = await fetch(`${base}/api/issues?severity=Banana`);
  assert.equal(res.status, 400);
});

test('unknown route returns JSON 404', async () => {
  const res = await fetch(`${base}/api/nope`);
  assert.equal(res.status, 404);
  assert.equal((await res.json()).error, 'Not found');
});
