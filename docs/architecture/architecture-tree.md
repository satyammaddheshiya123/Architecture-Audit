# Architecture tree

```
a11y-audit-foundation/
├── client/                    Browser UI (no server code here)
│   ├── public/
│   │   ├── index.html         Semantic page: skip link, main, labelled filter, table
│   │   ├── css/styles.css     Design tokens, focus styles, light/dark, reduced motion
│   │   └── js/
│   │       ├── api.js         Only file that knows the API URLs
│   │       ├── render.js      DOM rendering (textContent only, no innerHTML)
│   │       └── main.js        Wiring: events > api > render
│   └── serve.mjs              Dev static server + /api proxy
├── server/                    HTTP API (no browser code here)
│   ├── src/
│   │   ├── index.js           Entry point
│   │   ├── app.js             HTTP server + route table + error handling
│   │   ├── config.js          Env-based settings
│   │   ├── routes/issues.js   HTTP layer: parse query, validate, shape response
│   │   ├── services/issuesService.js   Business logic: read + map + filter
│   │   └── lib/csv.js         Generic CSV parser
│   └── test/                  Unit + API tests
├── docs/
│   ├── audit/                 audit-report.md, accessibility-audit.csv, how-to + checklist
│   ├── screenshots/           Proof images (see README there)
│   ├── architecture/          This file
│   └── adr/                   Architecture decision records
├── tests/                     Cross-cutting checks (audit completeness, a11y baseline of HTML)
├── scripts/                   dev.mjs, run-tests.mjs
├── .github/workflows/ci.yml   Runs npm test on every push
└── package.json               Workspaces + root scripts
```

**Request flow (first vertical slice):**
`Browser` > `client/js/main.js` > `api.js` > `GET /api/issues` (via client proxy) > `routes/issues.js` > `issuesService.js` > `docs/audit/accessibility-audit.csv`
