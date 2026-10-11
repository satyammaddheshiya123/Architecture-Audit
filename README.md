# Accessibility Baseline & Repository Architecture Audit

A real public service website (**India.gov.in, Directory page**) audited for accessibility, and the findings turned into a maintainable full-stack foundation whose **first feature** is an accessible issue tracker that serves the audit itself.

## What is in this repo

| Deliverable | Where |
|---|---|
| Audit report (5 issues, evidence, priority) | [`docs/audit/audit-report.md`](docs/audit/audit-report.md) |
| Audit worksheet (official CSV template format) | [`docs/audit/accessibility-audit.csv`](docs/audit/accessibility-audit.csv) |
| Lighthouse + keyboard-pass procedures | [`docs/audit/`](docs/audit/) |
| Screenshots | [`docs/screenshots/`](docs/screenshots/README.md) |
| Architecture tree | [`docs/architecture/architecture-tree.md`](docs/architecture/architecture-tree.md) |
| Decision record | [`docs/adr/0001-zero-dependency-baseline.md`](docs/adr/0001-zero-dependency-baseline.md) |
| Working skeleton | `client/`, `server/`, `tests/` |

## Local setup

Requires **Node 20+** (see `.nvmrc`). There are no third-party dependencies, so no install step is needed.

```bash
git clone <your-repo-url>
cd a11y-audit-foundation
npm run dev        # API on :3000, client on :5173
# open http://localhost:5173
npm test           # 9 tests: CSV parser, API, audit completeness, HTML a11y baseline
```

Run pieces separately: `npm run start:server`, `npm run start:client`. Copy `.env.example` to `.env` to change ports (export the variables in your shell; the project does not load `.env` automatically).

## Architecture and boundaries

```
Browser ──> client (static UI) ──HTTP /api──> server ──> data (CSV in docs/audit)
```

| Area | Owns | Must not |
|---|---|---|
| `client/` | Markup, styles, rendering, user events | Read files, contain business rules, import from `server/` |
| `server/routes` | HTTP concerns: parsing, validation, status codes | Contain business logic or file access |
| `server/services` | Business logic and data access | Know about HTTP requests/responses |
| `server/lib` | Generic helpers (CSV parser) | Know about this app's domain |
| `docs/` | Audit evidence, ADRs | Hold code |
| `tests/` | Cross-cutting checks | Duplicate unit tests in `server/test` |

Rules of thumb:
1. **client and server talk only through the JSON API.** No shared code; the API contract is the interface.
2. **One reason to change per layer:** UI change > `client/`; URL or status code change > `routes/`; rule change > `services/`.
3. **Text from the API is inserted with `textContent`**, never `innerHTML`.

Full tree: [`docs/architecture/architecture-tree.md`](docs/architecture/architecture-tree.md).

## First vertical slice: Accessibility Issue Tracker

One thin feature that touches every layer:

1. **Data:** `docs/audit/accessibility-audit.csv` is the single source of truth.
2. **Service:** `issuesService.list({ severity })` parses and maps rows.
3. **Route:** `GET /api/issues?severity=High|Medium|Low` (400 on invalid value) and `GET /api/health`.
4. **Client:** a labelled severity filter and a data table showing ID, component, WCAG criterion, severity and fix.
5. **Tests:** parser unit tests, API tests (filter, validation, 404), and a check that the audit CSV has at least 5 evidenced issues.

### Accessibility baseline built into the slice (definition of done for every future feature)
- `lang` attribute, unique `<title>`, skip link, `<main>` landmark, one `<h1>`.
- Every form control has a `<label>`; tables use `<caption>` and `<th scope>`.
- Visible `:focus-visible` outline; works with keyboard only.
- Result changes announced via `role="status"` (polite live region).
- Colours chosen for AA contrast in light and dark; severity is shown in **text**, not colour alone.
- `prefers-color-scheme` and `prefers-reduced-motion` respected.
- Fixes for the audited site's mistakes are avoided here on purpose: no "Loading…" in link names, unique link text, no duplicate headings, decorative images with `alt=""`.

## Next slices (roadmap)
1. Add/edit an issue (POST/PATCH) with accessible form validation and error summary.
2. Replace CSV with SQLite behind the same `issuesService` interface.
3. Automate axe-core checks in CI.
4. Swap in Vite/Express per ADR 0001 once a second feature needs it.

## Submission checklist
- [ ] Run Lighthouse and fill section 2 of the audit report
- [ ] Complete the keyboard checklist
- [ ] Add screenshots listed in `docs/screenshots/README.md`
- [ ] `npm test` passes
- [ ] Push to GitHub; confirm the CI badge/run is green
