# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository purpose

Cypress end-to-end test suite for the Creatics web app (`https://testing.creatics.org` by default; specs may also target `creatics.org`, `mobile.creatics.org`, and `mobilej21.creatics.org`).

## Commands

- `npm run cypress:open` — opens the Cypress Test Runner. The script sets `NODE_OPTIONS=--max_old_space_size=8192` (Windows `set` syntax) because some specs are memory-heavy.
- `npx cypress run` — headless run of all specs matching `cypress/e2e/**/*.cy.js`.
- `npx cypress run --spec "cypress/e2e/userSignInFlow/signIn.cy.js"` — run a single spec file.
- `npx cypress run --spec "cypress/e2e/userSignInFlow/signIn.cy.js" --browser chrome` — pick a browser (`electron` default; `webkit` is enabled via `experimentalWebKitSupport` and `playwright-webkit` is installed as a devDependency).
- There is no `npm test`, lint, or build step — `package.json#scripts.test` is a placeholder.

Reports land in `cypress/reports/` (mochawesome HTML+JSON, screenshots embedded inline). Videos/screenshots/downloads/reports are gitignored.

## Architecture

Standard Cypress layout with a Page Object Model.

- `cypress.config.js` — single source of config: `baseUrl: https://testing.creatics.org`, `defaultCommandTimeout: 10000`, `pageLoadTimeout: 60000`, `retries: 2`, `chromeWebSecurity: false`, `experimentalModifyObstructiveThirdPartyCode: true`, `experimentalWebKitSupport: true`. Cypress Cloud `projectId: 3uirpk`. Mochawesome reporter is wired in `setupNodeEvents`.
- `cypress/e2e/<flow>/*.cy.js` — specs grouped by user flow (`userSignInFlow`, `newUserSignUpFlow`, `resetPasswordFlow`, `onBoardingFlow`, `profilePageFlow`, `myAccountFlow`, `cinejoyFlow`, `Hitmaker`, `promptScripts`). Each spec imports a page object and drives it.
- `cypress/pageObjectModule/*.js` — page object classes (e.g. `loginPage.js`, `signUpPage.js`, `onboardingPages.js`, `hitmakerPage.js`, `cinejoyHomepage.js`, `spotlightPage.js`, `showcasePage.js`, `profilePage.js`, `emailVerification.js`, `resetPasswordPage.js`/`resetVerifyPage.js`/`resetConfirmPage.js`). Subfolders `commonComponent/` (header) and `myAccount/` group reusable areas. Specs typically hard-code test data (URLs, usernames, passwords) at the top of the `describe` and call page-object methods that wrap selectors + actions.
- `cypress/support/e2e.js` — global setup; imports `commands.js` and registers `cypress-mochawesome-reporter`. Also injects CSS to hide request/xhr entries from the Cypress command log.
- `cypress/support/commands.js` — custom commands. Notable:
  - Global `Cypress.on("uncaught:exception")` swallows the specific `classList`-undefined error from the app under test; other exceptions still fail tests.
  - `cy.dismissPopup()` — clicks `.custom-button` if a `.custom-dialog-container` is present.
  - MailSlurp commands (`initializeMailSlurp`, `getLatestEmail`, `extractVerifyLink`, `getOTPFromInbox`) used by signup/reset/verification flows. The MailSlurp API key is currently hard-coded in `commands.js` — when modifying, prefer moving it to `Cypress.env`/`.env` rather than committing a new key.
- `cypress/fixtures/images` and `cypress/fixtures/videos` hold upload fixtures (including a `50mb.jpg`). Per `.gitignore`, image/video binaries are NOT tracked — local files are required for upload-bearing specs to run.

### Spec conventions

- Most specs declare URL/credential constants inside `describe`, set a `BASE_URL`/`logInURL` pair, and switch environments by reassigning those constants (see `userSignInFlow/signIn.cy.js`). When changing the target environment, edit those constants rather than `cypress.config.js`.
- `beforeEach` typically calls `LoginPage.visit(BASE_URL)` then waits for a known element to be visible before asserting URL. Reuse this pattern when adding specs.
- `promptScripts/` uses Cypress's `cy.prompt([...])` AI-driven steps (Cypress 15+) — these are experimental natural-language tests, not page-object based; keep them isolated from the rest of the suite.

## Things to know before editing

- `package.json` has `"type": "commonjs"` but specs and page objects use ES module `import`/`export` — Cypress's bundler handles this; do not switch to `require` in spec/support/page-object files.
- `cypress.config.js` contains a large commented-out alternate config block; the active export is the first `module.exports`. Don't accidentally edit the commented copy.
- Retries are set to 2 globally — flaky-looking failures may already be the third attempt.
- The repo targets a live remote environment; there is no local server to start before running tests.
