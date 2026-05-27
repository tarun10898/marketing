import { expect, test } from '@playwright/test';

test.setTimeout(120_000);

test('loads the main strategy pages and exposes the expected navigation links', async ({ page }) => {
  await page.goto('/product-strategy/competitor-scan');
  await expect(page).toHaveURL(/\/product-strategy\/competitor-scan$/);
  await expect(page.getByRole('heading', { name: 'Competitor Scan' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Position · Promotion · Price →' })).toHaveAttribute(
    'href',
    '/product-strategy/positioning'
  );

  await page.goto('/product-strategy/positioning');
  await expect(page).toHaveURL(/\/product-strategy\/positioning$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Position');
  await expect(page.getByRole('link', { name: '← Competitor Scan' })).toHaveAttribute(
    'href',
    '/product-strategy/competitor-scan'
  );
  await expect(page.getByRole('link', { name: 'Resources →' })).toHaveAttribute(
    'href',
    '/product-strategy/resources'
  );

  await page.goto('/product-strategy/resources');
  await expect(page).toHaveURL(/\/product-strategy\/resources$/);
  await expect(page.getByRole('heading', { name: 'Resources' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Feedback Links →' })).toHaveAttribute(
    'href',
    '/product-strategy/feedback'
  );

  await page.goto('/product-strategy/feedback');
  await expect(page).toHaveURL(/\/product-strategy\/feedback$/);
  await expect(page.getByRole('heading', { name: 'Feedback Links' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Strategy Overview →' })).toHaveAttribute(
    'href',
    '/product-strategy'
  );
});