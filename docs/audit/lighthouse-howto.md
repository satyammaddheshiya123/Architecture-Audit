# Lighthouse run: how to record it

1. Open Chrome in an **Incognito** window (extensions skew results).
2. Go to <https://www.india.gov.in/directory>.
3. DevTools (F12) > **Lighthouse** tab > tick **Accessibility** (and the others if you like) > run once for **Mobile**, once for **Desktop**.
4. Screenshot each result summary: `docs/screenshots/lighthouse-mobile.png`, `lighthouse-desktop.png`.
5. Expand **Accessibility > Failing elements**; screenshot it as `lighthouse-a11y-failures.png`.
6. Copy the scores into the table in `audit-report.md` section 2.
7. For each failing audit, add a row to `accessibility-audit.csv` if it is not already covered.

CLI alternative: `npx lighthouse https://www.india.gov.in/directory --only-categories=accessibility --output=html --output-path=./lighthouse-reports/directory.html`
