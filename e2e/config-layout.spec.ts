import { expect, test } from '@playwright/test';

test('navigates into config layout and preserves route navigation contracts', async ({ page }) => {
  await page.goto('/config-layout');
  await expect(page).toHaveURL(/\/config-layout$/);
  await expect(page.getByRole('heading', { name: 'Config Layout' })).toBeVisible();
  await expect(page.getByText('Single source of truth')).toBeVisible();
  await expect(page.getByText('Tailwind and global CSS already read from this file.')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Go to strategy overview' })).toHaveAttribute(
    'href',
    '/product-strategy'
  );

  await page.getByRole('button', { name: 'Toggle dark mode' }).click();
  await expect(page.locator('html')).toHaveClass(/dark/);

  const competitorScanLink = page.getByRole('link', { name: /Competitor Scan/i }).first();
  await expect(competitorScanLink).toHaveAttribute('href', '/product-strategy/competitor-scan');
});