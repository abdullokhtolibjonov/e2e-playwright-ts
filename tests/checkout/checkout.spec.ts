import { test } from '../../src/fixtures/test';
import { USERS } from '../../src/test-data/users';
import { CHECKOUT_CUSTOMER } from '../../src/test-data/checkoutData';
import { CHECKOUT_MESSAGES } from '../../src/constants/messages';

test.describe('Checkout', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    await inventoryPage.expectLoaded();
  });

  test('user can complete checkout successfully', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart('Sauce Labs Backpack');
    await cartPage.checkout();

    await checkoutPage.expectInformationPageLoaded();
    await checkoutPage.fillCustomerInformation(CHECKOUT_CUSTOMER);
    await checkoutPage.continue();

    await checkoutPage.expectOverviewPageLoaded();
    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete(CHECKOUT_MESSAGES.COMPLETE_HEADER);
  });
});