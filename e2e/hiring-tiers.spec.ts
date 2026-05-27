import { expect, test } from '@playwright/test';

test('filters and expands hiring tier content', async ({ page }) => {
  await page.goto('/product-strategy/hiring-tiers');

  const searchInput = page.getByRole('textbox');
  await searchInput.fill('sde2');
  await expect(page.getByText(/SDE 2/i).first()).toBeVisible();

  await page.getByRole('button', { name: 'Clear search' }).click();
  await expect(searchInput).toHaveValue('');

  await page.getByRole('button').filter({ hasText: /Tier.?1/i }).first().click();
  await page.getByRole('button', { name: /Razorpay/i }).first().click();

  await expect(page.getByText('No negative marking')).toBeVisible();
  await expect(page.getByText('Exam Pattern', { exact: true })).toBeVisible();
  await expect(page.getByText('Interview Focus', { exact: true })).toBeVisible();
});