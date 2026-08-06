class InventoryPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  addItemToCart(itemName) {
    // e.g. itemName = 'sauce-labs-backpack'
    return this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
