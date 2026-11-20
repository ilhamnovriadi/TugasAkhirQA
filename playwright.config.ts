import { defineConfig, devices } from '@playwright/test';

/**
 * Konfigurasi eksekusi test untuk taqwatravel.com.
 * Acuan: ISO/IEC/IEEE 29119-1:2022 (konsep & proses test) dan
 * ISO/IEC 25040:2024 (kerangka evaluasi kualitas).
 */
export default defineConfig({
  testDir: './tests',
  outputDir: './reports/artifacts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  workers: 2,
  retries: 0,
  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/results.json' }],
    ['html', { outputFolder: 'reports/html', open: 'never' }],
  ],
  use: {
    baseURL: 'https://taqwatravel.com',
    locale: 'id-ID',
    timezoneId: 'Asia/Jakarta',
    viewport: { width: 1280, height: 800 },
    actionTimeout: 15_000,
    navigationTimeout: 45_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 QA-TugasAkhir/1.0',
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
  ],
});
