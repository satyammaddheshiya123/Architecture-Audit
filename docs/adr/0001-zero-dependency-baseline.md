# ADR 0001: Zero-dependency baseline with npm workspaces

- **Status:** Accepted · **Date:** 2026-10-11

## Context
The foundation must be setup-ready on any machine with only Node installed, and every line should be explainable in a viva or review.

## Decision
- npm workspaces (`client`, `server`) in one repo; no shared runtime code between them.
- Server: Node's built-in `http` + `node:test`. Client: plain ES modules served from `client/public`.
- Tests run via `scripts/run-tests.mjs` so they behave the same on Windows, macOS and Linux.

## Consequences
- `npm install` is not needed to run or test the project.
- Trade-off: routing, validation and bundling are hand-written. When the second feature slice arrives, swap in Express/Fastify (server) and Vite (client) behind the same folder boundaries; nothing outside `server/src/app.js` and `client/serve.mjs` has to change.
