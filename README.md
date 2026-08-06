# Playwright E2E Test Suite

End-to-end tests for login, cart, and checkout flows, built against
[SauceDemo](https://www.saucedemo.com) as a placeholder target. Swap `BASE_URL`
in `.env` (copy from `.env.example`) to point at your real site.

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Run tests

```bash
npm test              # run all tests headless
npm run test:headed   # watch the browser while it runs
npm run test:ui       # interactive UI mode (best for debugging)
npm run test:debug    # step through with the inspector
npm run report        # open the last HTML report
```

## Project structure

```
playwright-e2e/
├── playwright.config.js   # base URL, browsers, retries, reporters
├── pages/                 # Page Object Model — one class per page/component
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   └── CheckoutPage.js    # CartPage + CheckoutPage
├── tests/
│   ├── fixtures.js        # shared test data (users)
│   ├── login.spec.js
│   └── checkout.spec.js
└── .env.example
```

## Adapting this to your real site

1. Update `BASE_URL` in `.env`.
2. Rewrite the locators in `pages/*.js` to match your site's DOM
   (inspect with `npx playwright codegen <your-url>` — it records your
   clicks and generates selectors for you).
3. Update `tests/fixtures.js` with real (or test-environment) credentials —
   never commit real prod credentials; use env vars for anything sensitive.
4. Add more page objects/spec files following the same pattern as flows grow.

## Notes on the Page Object Model pattern used here

Each page object wraps the locators and actions for one page/section of the
UI. Tests read like a script of user actions and stay stable even if the
underlying HTML changes — you only update the page object, not every test.
