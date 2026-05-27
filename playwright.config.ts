import { defineConfig, devices } from '@playwright/test';

const localChannel = process.env.CI
  ? undefined
  : process.platform === 'win32'
  ? 'msedge'
  : 'chrome';

export default defineConfig({
  testDir: './e2e',
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: !!process.env.CI,
  workers: process.env.CI ? undefined : 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(localChannel ? { channel: localChannel } : {}),
      },
    },
  ],
  webServer: {
    command: process.env.CI ? 'npm run start' : 'npm run dev:quick',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});