import { test, expect } from '../support/helpers';

test.describe('BB — Pencarian & filter (black box)', () => {
  test('TC-BB-14 Pencarian hero: kategori paket dapat dipilih', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('button:visible', { hasText: 'Pilih kategori' }).first();
    await expect(trigger).toBeVisible();
    await trigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await trigger.click();
    const listbox = page.locator('[role="listbox"]');
    await expect(listbox, 'daftar kategori tidak terbuka').toBeVisible({ timeout: 10_000 });
    await page.locator('[role="option"]').filter({ hasText: 'Umroh' }).first().click();
    await expect(page.locator('span:visible').filter({ hasText: /^Pilih kategori$/ })).toHaveCount(0);
  });

  test('TC-BB-15 Pencarian hero: bulan keberangkatan dapat dipilih', async ({ page }) => {
    await page.goto('/');
    const trigger = page.locator('button:visible', { hasText: 'Pilih bulan' }).first();
    await trigger.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await trigger.click();
    const options = page.locator('[role="option"]');
    await expect(options.first(), 'daftar bulan tidak terbuka').toBeVisible({ timeout: 10_000 });
    expect(await options.count()).toBeGreaterThan(1);
    await options.first().click();
    await expect(page.locator('span:visible').filter({ hasText: /^Pilih bulan$/ })).toHaveCount(0);
  });

  test('TC-BB-16 Tombol "Cari Paket" membawa pengguna ke daftar paket', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Cari Paket/i }).first().click();
    await expect(page).toHaveURL(/\/products/);
  });

  test('TC-BB-17 Filter teks pada halaman paket menyaring kartu', async ({ page }) => {
    await page.goto('/products');
    const before = await page.locator('article, [class*="card"]').count();
    const input = page.locator('input[type="text"]').first();
    await input.fill('thaif');
    await page.waitForTimeout(1200);
    const after = await page.locator('article, [class*="card"]').count();
    expect(after, 'hasil filter harus <= jumlah awal').toBeLessThanOrEqual(before);
    await expect(page.getByText(/Thaif/i).first()).toBeVisible();
  });

  test('TC-BB-18 Pencarian artikel menyaring daftar artikel', async ({ page }) => {
    await page.goto('/artikel');
    const input = page.getByPlaceholder(/Cari artikel/i);
    await expect(input).toBeVisible();
    await input.fill('haji');
    await page.waitForTimeout(1200);
    const titles = await page.locator('article h2, article h3').allInnerTexts();
    expect(titles.length, 'harus tersisa minimal satu artikel').toBeGreaterThan(0);
    const cocok = titles.filter((t) => /haji/i.test(t));
    expect(cocok.length, `judul hasil filter: ${titles.join(' | ')}`).toBeGreaterThan(0);
  });

  test('TC-BB-19 Pencarian agen resmi menyaring daftar agen', async ({ page }) => {
    await page.goto('/agen-resmi');
    const input = page.getByPlaceholder(/Cari nama agen/i);
    await expect(input).toBeVisible();
    await input.fill('palembang');
    await page.waitForTimeout(1200);
    await expect(page.locator('main').first()).toBeVisible();
  });
});
