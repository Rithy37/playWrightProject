![Playwright Tests](https://github.com/Rithy37/playWrightProject/actions/workflows/playwright.yml/badge.svg)
# Playwright E2E Test Suite Learning Project

I'm using this repo to learn [Playwright](https://playwright.dev) by building
a real end-to-end test suite. It currently covers login, cart, and checkout
flows against [SauceDemo](https://www.saucedemo.com) as a placeholder target,
structured with the Page Object Model so it's easy to point at a real site
later.

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

## What's covered so far

- [x] Login — valid user, locked-out user, invalid credentials, empty fields
- [x] Checkout — full add-to-cart → checkout → order-complete flow
- [x] Checkout field validation
- [x] Cart badge state (add/remove items)
- [ ] CI (GitHub Actions) to run tests on every push
- [ ] Point the suite at a real site instead of SauceDemo
- [ ] Visual regression / screenshot testing

## Adapting this to a real site

1. Update `BASE_URL` in `.env` (copy from `.env.example`).
2. Rewrite the locators in `pages/*.js` to match the real site's DOM —
   `npx playwright codegen <url>` records clicks and generates selectors.
3. Update `tests/fixtures.js` with real (or test-environment) credentials.
   Never commit real prod credentials — use env vars for anything sensitive.
4. Add more page objects/spec files following the same pattern as flows grow.

## Notes on the Page Object Model pattern

Each page object wraps the locators and actions for one page/section of the
UI. Tests read like a script of user actions and stay stable even if the
underlying HTML changes — only the page object needs updating, not every
test that touches that page.

## Why this pattern (notes to self)

- One locator change (e.g. a renamed `data-test` attribute) only needs
  fixing in one page object file, not in every test that uses it.
- Tests become readable as plain English steps: `login()`, `addItemToCart()`,
  `goToCheckout()` — the DOM details stay hidden inside the page object.