# Quantium QA Take-Home Exercise

UI test automation for the 14 Quantium QA assignments, written in TypeScript with Playwright.

## Test Execution & Results

**Environment:** `qa-exercise.quantiumtech.net` · Chromium · Executed 26 September 2026

| Metric | Value |
|---|---|
| Total assignments | 14 |
| ✅ Passed | 14 |
| ❌ Failed | 0 |
| Total execution time | 3m 36s |

### Results by assignment

| # | Assignment | Result | Duration |
|---|---|---|---|
| 01 | Text Input | ✅ Passed | 3.6s |
| 02 | Client Side Delay | ✅ Passed | 42.8s |
| 03 | AJAX Data | ✅ Passed | 41.9s |
| 04 | Scrollbars | ✅ Passed | 3.1s |
| 05 | Dynamic Table | ✅ Passed | 3.6s |
| 06 | Progress Bar | ✅ Passed | 10.3s |
| 07 | Visibility | ✅ Passed | 3.4s |
| 08 | Overlapped Element | ✅ Passed | 2.9s |
| 09 | Shadow DOM | ✅ Passed | 2.9s |
| 10 | File Upload | ✅ Passed | 3.1s |
| 11 | Mystery Button | ✅ Passed | 2.8s |
| 12 | Disabled Input | ✅ Passed | 42.9s |
| 13 | Chart Interaction | ✅ Passed | 5.8s |
| 14 | Auto Wait | ✅ Passed | 44.1s |

The full interactive HTML report — including a step-by-step trace, screenshots, and video for every run — is attached alongside this submission as `quantium-test-report.zip`. It can also be regenerated locally at any time via `npm run test:report` after running the suite.

## What each assignment is testing

| # | Assignment | What it's actually checking |
|---|---|---|
| 01 | Text Input | Basic fill + assert |
| 02 | Client Side Delay | Waiting for an async result instead of a fixed sleep |
| 03 | AJAX Data | Capturing a real network response (`waitForResponse`) instead of guessing a delay |
| 04 | Scrollbars | Letting Playwright auto-scroll a target into view rather than computing scroll offsets manually |
| 05 | Dynamic Table | Reading a table cell by column identity (`data-col`), not by column position, since column order changes on every render |
| 06 | Progress Bar | Stopping an animated value at an exact number — needed tight polling (`waitForFunction` with `raf`) to avoid overshooting |
| 07 | Visibility | An element can be hidden via `display`, `visibility`, `opacity`, off-screen position, zero size, or z-index overlap — Playwright's built-in `toBeVisible()` only catches half of these, so this one uses a custom visibility check that covers all six |
| 08 | Overlapped Element | A field partly covered by a sticky header — filling it directly silently no-ops; it has to be clicked first to focus correctly |
| 09 | Shadow DOM | Interacting with a custom element's internals; Playwright pierces open shadow roots automatically, so the actual trap here is remembering to submit, not the shadow boundary itself |
| 10 | File Upload | Setting a file directly on the hidden `<input type="file">` rather than trying to interact with the drop-zone UI |
| 11 | Mystery Button | The clickable control lives inside an `<iframe>` while the element it affects lives in the parent document — needs `frameLocator()` |
| 12 | Disabled Input | Waiting for a field to actually become enabled before typing into it |
| 13 | Chart Interaction | Hovering each bar of a Google Charts column chart and reading back the app's own hover-readout element instead of the chart library's internal tooltip DOM |
| 14 | Auto Wait | A button that becomes clickable before it's actually correct to click — has to wait for the exact ready-state label, not just for the element to be enabled, and must be clicked exactly once |

## Project layout

```
pages/login.ts        one place that knows how to log in; every test reuses it
config/settings.ts     reads BASE_URL / credentials from .env
cases/                 one file per assignment — pure logic, no test framework code
runner/run-all.spec.ts the only file Playwright actually treats as a test suite
test-data/              fixture file used by the upload assignment
```

Each `cases/NN-*.ts` file exports a single async function that takes a `page` and drives + asserts that one scenario. `runner/run-all.spec.ts` logs in once per test (via `pages/login.ts`) and calls each case function inside its own `test(...)` block, so every assignment still runs in full isolation.

## Running it

```bash
npm install
npx playwright install chromium

# create a .env file in the project root with:
#   BASE_URL="https://qa-exercise.quantiumtech.net/"
#   LOGIN_USERNAME="..."
#   LOGIN_PASSWORD="..."

npm test                # run everything
npm run test:headed     # same, with the browser visible
npx playwright test -g "06-Progress_Bar"   # run a single assignment
npm run test:report     # open the HTML report after a run
```
