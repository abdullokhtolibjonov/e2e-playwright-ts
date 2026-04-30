import { chromium } from '@playwright/test';
import fs from 'fs';
import { ENV } from './utils/env';

const AUTH_FILE = 'playwright/.auth/user.json';

export default async function globalSetup() {
  fs.mkdirSync('playwright/.auth', { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(ENV.BASE_URL);
  await page.getByPlaceholder('Username').fill(ENV.STANDARD_USER);
  await page.getByPlaceholder('Password').fill(ENV.PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForURL('**/inventory.html');

  await page.context().storageState({ path: AUTH_FILE });
  await browser.close();
}
