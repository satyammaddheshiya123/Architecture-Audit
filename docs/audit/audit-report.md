# Accessibility Audit Report: National Portal of India (Directory page)

| | |
|---|---|
| **Site audited** | India.gov.in, Directory page: <https://www.india.gov.in/directory> |
| **Why this site** | Public-facing government service portal used by citizens (NIC, MeitY) |
| **Audit date** | 11 October 2026 |
| **Standard** | WCAG 2.2 Level AA |
| **Worksheet** | [`accessibility-audit.csv`](accessibility-audit.csv) (official template format) |

## 1. Method (read this honestly before you submit)

| Step | Status | Notes |
|---|---|---|
| Static review of the rendered page content and link/heading/image structure | Done | Performed 11 Oct 2026 on the page text and markup structure returned for the Directory page. Evidence in section 3 is quoted from it. |
| Lighthouse (Chrome DevTools) run | **To record** | Run it yourself, then fill the table in section 2. Steps in [`lighthouse-howto.md`](lighthouse-howto.md). |
| Keyboard-only navigation pass | **To record** | Follow [`keyboard-pass-checklist.md`](keyboard-pass-checklist.md) and tick the results. |
| Screenshots | **To capture** | List of required files in [`../screenshots/README.md`](../screenshots/README.md). |

The five findings below come from the static review. Lighthouse and the keyboard pass will either confirm them or add more. Add anything new as `WEB-006`, `WEB-007`, … in the CSV.

## 2. Lighthouse scores (fill in after your run)

| Category | Mobile | Desktop |
|---|---|---|
| Performance | __ | __ |
| **Accessibility** | __ | __ |
| Best Practices | __ | __ |
| SEO | __ | __ |

Failed Lighthouse accessibility audits (copy the names): ________________

## 3. Findings (5), ordered by remediation priority

| Priority | ID | Severity | Issue | WCAG | Effort |
|---|---|---|---|---|---|
| P1 | WEB-001 | High | Web Directory links carry "Loading..." inside their accessible name | 4.1.2, 2.4.4 | Low |
| P2 | WEB-002 | Medium | Six "Explore" links share identical text; purpose only in `title` | 2.4.4, 2.4.9 | Low |
| P2 | WEB-003 | Medium | Four identical "Toggle FAQ Section" headings, no FAQ text | 1.3.1, 2.4.6 | Medium |
| P3 | WEB-004 | Low | Decorative images have meaningless alt text ("Green Vector Image", "left-vector2") | 1.1.1 | Low |
| P3 | WEB-005 | Low | Social links use raw URLs as link text | 2.4.4 | Low |

Priority = severity first, then effort (quick high-impact fixes before slow ones).

### WEB-001: "Loading..." inside link names (High, P1)
- **Evidence:** Web Directory links read `Loading... Apex Bodies`, `Loading... Legislature`, `Loading... States/UTs`, `Loading... Indian Missions Abroad`, `Loading... Districts`, `Loading... Union Government`, `Loading... Judiciary`.
- **Impact:** Screen readers announce "Loading" before every link; voice-control users cannot activate a link by its visible name.
- **Fix:** Keep the spinner outside the link's accessible name (`aria-hidden="true"` sibling) and remove it when data arrives.

### WEB-002: Repeated "Explore" link text (Medium, P2)
- **Evidence:** Links to Who's Who, Contact Directory, Web Directory, Helpline Numbers and Public Utilities all read "Explore"; destinations exist only in `title` attributes (e.g. `title="Explore whos who"`).
- **Impact:** A screen-reader links list shows identical entries; `title` is not reliably announced.
- **Fix:** Unique visible text ("Explore Who's Who") or a hidden suffix that begins with the visible text.

### WEB-003: Duplicate, content-less FAQ headings (Medium, P2)
- **Evidence:** Four headings read "Toggle FAQ Section"; no question/answer text follows.
- **Impact:** Heading navigation is useless in that region and describes an action, not a topic.
- **Fix:** Heading text = the FAQ question; inside it a `<button aria-expanded aria-controls>`.

### WEB-004: Noisy alt text on decorative images (Low, P3)
- **Evidence:** alt values `Green Vector Image` (two), `left-vector2`, `left-vector3`, `Directorybg`; asset URL `Rectangle 4812.svg` contains a space.
- **Fix:** `alt=""` for decoration; rename assets.

### WEB-005: URL as link text (Low, P3)
- **Evidence:** Footer links display `https://www.facebook.com/nationalportalofindia` and `https://x.com/indiagovin`.
- **Fix:** Descriptive name ("National Portal of India on X").

## 4. Positives observed
- A "Skip to main content" link exists.
- A built-in accessibility toolbar (contrast, text size, text spacing, line height, hide images, big cursor).
- Page has a unique, descriptive `<title>` and a viewport meta tag.
- The logo image has meaningful alt text.

## 5. Things to verify in the browser (not yet confirmed)
- Is the skip link the **first** focusable element, or do the search controls come before it?
- The calendar widget rendered only a day-name header row with no dates in the fetched content: is it JavaScript-dependent or empty for keyboard/screen-reader users?
- Search markup appears twice in the page content: check for duplicate IDs / duplicate landmarks.
- Visible focus indicator on every control; colour contrast on the accessibility toolbar.

## 6. Limits
Static review cannot measure colour contrast, focus order, or real screen-reader output. That is exactly why the Lighthouse run and keyboard pass in section 1 are part of the deliverable.
