import { test } from '../../src/fixtures/test';
import { USERS } from '../../src/test-data/users';

test.describe('Cart', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await inventoryPage.expectLoaded();
  });

  test('user can see selected product in cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart('Sauce Labs Backpack');
    await cartPage.expectProductCount(1);
  });

  test('user can continue shopping from cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.continueShopping();

    await inventoryPage.expectLoaded();
  });
});