Login Test Cases — 8 

TC01 - Valid email + valid password → lands on dashboard
TC02 - Login with Enter key instead of clicking button

Negative Cases 
TC03 - Wrong email + wrong password → error message shows
TC04 - Valid email + wrong password → error message shows
TC05 - Empty email + valid password → validation error
TC06 - Valid email + empty password → validation error
TC07 - Empty both fields → validation error

Edge Cases
TC08 - Already logged in → visiting /login redirects to dashboard

TC09 - SQL injection in email field → doesn't crash
TC10 - Very long string in password field → handled gracefully
TC11 - Session expires → redirected back to login
TC12 - Forgot password link → navigates correctly




TC	What it tests	Tag
TC01	Valid credentials -> dashboard	@smoke
TC02	Login with Enter key	@smoke
TC03	Wrong email + wrong password	@regression
TC04	Valid email + wrong password	@regression
TC05	Empty email field	@regression
TC06	Empty password field	@regression
TC07	Both fields empty	@regression
TC08	Already logged in -> redirects	@regression
TC09	SQL injection in email	@regression
TC10	500 char password (stress)	@regression

TC	What it tests	Tag
TC01	Logout successfully	@smoke
TC02	Login page shows after logout	@smoke
TC03	Can't access dashboard after logout	@regression
TC04	Auth cookies cleared after logout	@regression
TC05	Can login again after logout	@regression






// tests/UI/auth/auth.spec.ts
// All authentication test cases — Login + Logout combined

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { DashboardPage } from '../../../pages/DashboardPage';
import { ENV } from '../../../config/env';

// ================================================================
//  LOGIN TEST CASES
// ================================================================
test.describe('Login', () => {

  // All login tests run with a fresh browser — no saved session
  test.use({ storageState: { cookies: [], origins: [] } });

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertOnLoginPage();
  });

  // ── Happy Path ────────────────────────────────────────────────

  test('TC01 - should login with valid email and password @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(ENV.USER_EMAIL, ENV.USER_PASSWORD);

    await expect(page).toHaveURL(/dashboard\/professional/);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  test('TC02 - should login using Enter key instead of clicking button @smoke', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithEnter(ENV.USER_EMAIL, ENV.USER_PASSWORD);

    await expect(page).toHaveURL(/dashboard\/professional/);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });

  // ── Negative Cases ────────────────────────────────────────────

  test('TC03 - should show error for wrong email and wrong password @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginExpectError('wrong@email.com', 'wrongpassword123');

    await loginPage.assertErrorVisible();
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('TC04 - should show error for valid email but wrong password @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginExpectError(ENV.USER_EMAIL, 'wrongpassword123');

    await loginPage.assertErrorVisible();
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('TC05 - should show validation error for empty email @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.passwordInput.fill(ENV.USER_PASSWORD);
    await loginPage.submitButton.click();

    // Either browser native validation or app-level error
    const isInvalid = await loginPage.emailInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid || await loginPage.errorMessage.isVisible()).toBeTruthy();
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('TC06 - should show validation error for empty password @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.emailInput.fill(ENV.USER_EMAIL);
    await loginPage.submitButton.click();

    const isInvalid = await loginPage.passwordInput.evaluate(
      (el: HTMLInputElement) => !el.validity.valid
    );
    expect(isInvalid || await loginPage.errorMessage.isVisible()).toBeTruthy();
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('TC07 - should show validation error when both fields are empty @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.submitButton.click();

    // Should stay on login page — nothing should happen
    await expect(page).toHaveURL(/login/);
  });

  // ── Edge Cases ────────────────────────────────────────────────

  test('TC08 - should redirect to dashboard if user is already logged in @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(ENV.USER_EMAIL, ENV.USER_PASSWORD);
    await expect(page).toHaveURL(/dashboard\/professional/);

    // Try visiting login page again while logged in
    await page.goto('/login');

    // Should bounce back to dashboard
    await expect(page).toHaveURL(/dashboard\/professional/);
  });

  test('TC09 - should not allow SQL injection in email field @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginExpectError(`' OR '1'='1`, 'anypassword');

    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('TC10 - should handle very long password input gracefully @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const longPassword = 'a'.repeat(500);
    await loginPage.loginExpectError(ENV.USER_EMAIL, longPassword);

    // App should not crash or freeze
    await expect(page).toHaveURL(/login/);
  });
});

// ================================================================
//  LOGOUT TEST CASES
// ================================================================
test.describe('Logout', () => {

  // Logout tests start authenticated — storageState injected by playwright.config.ts
  test.beforeEach(async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.goto();
    await dashboard.assertOnDashboard();
  });

  // ── Happy Path ────────────────────────────────────────────────

  test('TC01 - should logout successfully @smoke', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();

    await expect(page).toHaveURL(/login/);
  });

  test('TC02 - should show login page after logout @smoke', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();

    const loginPage = new LoginPage(page);
    await loginPage.assertOnLoginPage();
    await expect(loginPage.submitButton).toBeVisible();
  });

  // ── Negative / Security Cases ─────────────────────────────────

  test('TC03 - should not be able to access dashboard after logout @regression', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();

    // Try to navigate directly to dashboard
    await page.goto('/dashboard/professional');

    // Should redirect to login — not show dashboard
    await expect(page).toHaveURL(/login/);
  });

  test('TC04 - should clear auth session/cookies after logout @regression', async ({ page, context }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();

    // Check that auth-related cookies are cleared
    const cookies = await context.cookies();
    const authCookie = cookies.find(c =>
      c.name.toLowerCase().includes('token') ||
      c.name.toLowerCase().includes('session') ||
      c.name.toLowerCase().includes('auth')
    );
    expect(authCookie).toBeUndefined();
  });

  test('TC05 - should be able to login again after logout @regression', async ({ page }) => {
    // Step 1: Logout
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
    await expect(page).toHaveURL(/login/);

    // Step 2: Login again with same credentials
    const loginPage = new LoginPage(page);
    await loginPage.login(ENV.USER_EMAIL, ENV.USER_PASSWORD);

    // Step 3: Should be back on dashboard
    await expect(page).toHaveURL(/dashboard\/professional/);
    await expect(page.locator('text=Welcome back')).toBeVisible();
  });
});