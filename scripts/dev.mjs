// Starts API (port 3000) and client (port 5173) together. Ctrl+C stops both.
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const procs = [
  spawn(process.execPath, ['server/src/index.js'], { cwd: root, stdio: 'inherit' }),
  spawn(process.execPath, ['client/serve.mjs'], { cwd: root, stdio: 'inherit' }),
];
const stop = () => procs.forEach((p) => p.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
procs.forEach((p) => p.on('exit', stop));
