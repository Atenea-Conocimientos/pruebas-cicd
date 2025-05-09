import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL || '';

test('has title', async ({ page }) => {
  await page.goto(baseUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto(baseUrl);

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
