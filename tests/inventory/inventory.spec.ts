import { test, expect } from '../../src/fixtures/test';
import { PRODUCTS } from '../../src/test-data/products';

test.describe('Inventory', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.expectLoaded();
  });

  test('user can add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);

    await inventoryPage.expectCartBadgeCount(1);
  });

  test('user can remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.removeProductFromCart(PRODUCTS.BACKPACK);

    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('user can sort products from A to Z', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('az');

    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();

    expect(productNames).toEqual(sortedNames);
  });

  test('user can sort products by price low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');

    const prices = await inventoryPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });
});