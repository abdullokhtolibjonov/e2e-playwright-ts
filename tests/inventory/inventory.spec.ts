import { test, expect } from '../../src/fixtures/test';
import { USERS } from '../../src/test-data/users';

test.describe('Inventory', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await inventoryPage.expectLoaded();
  });

  test('user can add product to cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await inventoryPage.expectCartBadgeCount(1);
  });

  test('user can remove product from cart', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.expectCartBadgeCount(1);

    await inventoryPage.removeProductFromCart('Sauce Labs Backpack');

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