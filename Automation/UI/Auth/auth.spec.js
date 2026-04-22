import { test, expect } from '@playwright/test';
import { apiPost, validateSuccess, validateLoginBody, validateSecurity, validateFailure } from './utils/api-helper.js';


import { LoginPage } from '../../../pages/LoginPage';
import { DashboardPage } from '../../../pages/DashboardPage';
import { ENV } from '../../../config/env';


let page = "https://app.lawvriksh.com/login"

test.describe('Login', () => {

  // All login tests run with a fresh browser — no saved session
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertOnLoginPage();
  });


 test('TC01 - should login with valid email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(ENV.USER_EMAIL, ENV.USER_PASSWORD);

    await expect(page).toHaveURL(/dashboard\/professional/);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  
});



test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

