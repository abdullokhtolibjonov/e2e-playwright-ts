import { test } from '../../src/fixtures/test';
import { PRODUCTS } from '../../src/test-data/products';
import { CHECKOUT_CUSTOMER } from '../../src/test-data/checkoutData';
import { CHECKOUT_MESSAGES } from '../../src/constants/messages';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.open();
    await inventoryPage.expectLoaded();
  });

  test('user can complete checkout successfully', async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    await inventoryPage.openCart();

    await cartPage.expectLoaded();
    await cartPage.expectProductInCart(PRODUCTS.BACKPACK);
    await cartPage.checkout();

    await checkoutPage.expectInformationPageLoaded();
    await checkoutPage.fillCustomerInformation(CHECKOUT_CUSTOMER);
    await checkoutPage.continue();

    await checkoutPage.expectOverviewPageLoaded();
    await checkoutPage.finishOrder();

    await checkoutPage.expectOrderComplete(CHECKOUT_MESSAGES.COMPLETE_HEADER);
  });
});