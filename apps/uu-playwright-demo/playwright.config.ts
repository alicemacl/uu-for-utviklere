import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  expect: { timeout: 2000 },
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Bare nødvendig i miljøer med en ferdig installert Chromium – lokalt kan du se bort fra denne linjen.
        launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
      },
    },
  ],
  webServer: {
    // Testene kjører mot et produksjonsbygg, slik siden blir på Vercel
    command: 'pnpm build && pnpm start',
    url: 'http://localhost:4173/fixed',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
