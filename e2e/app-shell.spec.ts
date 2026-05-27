import { expect, test } from '@playwright/test';

test('redirects the root route to the strategy dashboard and toggles dark mode', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveURL(/\/product-strategy$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('EasyLoops');
  await expect(page.getByRole('link', { name: /Competitor Scan/i }).first()).toBeVisible();

  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);
});