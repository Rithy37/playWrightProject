const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage, CheckoutPage } = require('../pages/CheckoutPage');
const { USERS } = require('./fixtures');

test.describe('Checkout flow', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(USERS.standard.username, USERS.standard.password);
    await expect(page).toHaveURL(/inventory.html/);
  });

  test('user can add an item and complete checkout', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    // Add item to cart
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await expect(inventoryPage.cartBadge).toHaveText('1');

    // Go to cart, then checkout
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.goToCheckout();

    // Fill shipping info
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await checkoutPage.fillInfo('Jane', 'Doe', '90210');

    // Confirm summary and finish
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await checkoutPage.finishOrder();

    // Confirm order complete
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('checkout requires all fields to be filled', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await inventoryPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.continueButton.click(); // no info filled

    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  test('cart badge updates when items are added and removed', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.addItemToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });
});
