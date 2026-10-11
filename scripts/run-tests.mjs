// Collects every *.test.js in server/test and tests/, then runs them with the built-in Node test runner.
// Done in a script so it works the same on Windows, macOS and Linux (no shell globs).
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dirs = ['server/test', 'tests'];
const files = dirs.flatMap((d) =>
  readdirSync(path.join(root, d))
    .filter((f) => f.endsWith('.test.js'))
    .map((f) => path.join(root, d, f))
);
const result = spawnSync(process.execPath, ['--test', ...files], { stdio: 'inherit' });
process.exit(result.status ?? 1);
