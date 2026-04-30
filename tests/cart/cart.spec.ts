import { test } from '../../src/fixtures/test';
import { PRODUCTS } from '../../src/test-data/products';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.expectLoaded();
  });

  test('user can see selected product in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(PRODUCTS.BACKPACK);
    await cartPage.expectProductCount(1);
  });

  test('user can continue shopping from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
  });
});