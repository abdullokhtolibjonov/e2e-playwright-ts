import { test, expect } from '../../src/fixtures/test';
import { USERS } from '../../src/test-data/users';
import { ERROR_MESSAGES } from '../../src/constants/messages';

test.describe('Login', () => {
  // Clear auth state so these tests always start from the login page
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('standard user can login successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);

    await inventoryPage.expectLoaded();
  });

  test('locked out user cannot login', async ({ loginPage }) => {
    await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);

    await loginPage.expectErrorMessage(ERROR_MESSAGES.LOCKED_OUT_USER);
  });

  test('user cannot login without username', async ({ loginPage }) => {
    await loginPage.login('', USERS.STANDARD.password);

    await loginPage.expectErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test('user cannot login without password', async ({ loginPage }) => {
    await loginPage.login(USERS.STANDARD.username, '');

    await loginPage.expectErrorMessage(ERROR_MESSAGES.PASSWORD_REQUIRED);
  });
});