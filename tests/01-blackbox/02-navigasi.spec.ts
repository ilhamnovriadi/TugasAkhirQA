import { test, expect, SCOPE_PAGES } from '../support/helpers';

test.describe('BB — Navigasi & penanganan 404 (black box)', () => {
  test('TC-BB-09 Header memiliki logo dan navigasi utama yang dapat diakses', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header').first();
    await expect(header.getByRole('link', { name: /Taqwa Travel Logo/i })).toBeVisible();
    const navLinks = header.locator('nav a');
    expect(await navLinks.count(), 'header harus memuat tautan navigasi').toBeGreaterThanOrEqual(4);
    await expect(header.getByRole('link', { name: /^Profil$/i }).first()).toBeVisible();
  });

  test('TC-BB-10 Menu navigasi mobile dapat dibuka dan memuat tautan utama', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.getByRole('button', { name: /toggle menu/i }).first().click();
    const header = page.locator('header');
    await expect(header.getByRole('link', { name: /^Beranda$/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /^Profil$/i }).first()).toBeVisible();
    await expect(header.getByRole('link', { name: /^Artikel$/i }).first()).toBeVisible();
  });

  test('TC-BB-11 Tautan legal footer membuka halaman yang benar', async ({ page }) => {
    await page.goto('/');
    await page.locator('footer').getByRole('link', { name: /Privacy Policy/i }).click();
    await expect(page).toHaveURL(/\/privacy/);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await page.goBack();
    await page.locator('footer').getByRole('link', { name: /Terms of Service/i }).click();
    await expect(page).toHaveURL(/\/terms/);
  });

  test('TC-BB-12 Setiap halaman dalam cakupan dapat dibuka dan punya H1', async ({ page }) => {
    for (const target of SCOPE_PAGES) {
      const res = await page.goto(target.path);
      expect(res?.status(), `${target.path} harus 200`).toBe(200);
      await expect(page.getByRole('heading', { level: 1 }).first(), `${target.path} butuh H1`).toBeVisible();
    }
  });

  test('TC-BB-13 URL tidak dikenal menampilkan halaman 404 dengan status 404', async ({ page }) => {
    const res = await page.goto('/halaman-tidak-ada-qa-2026');
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/tidak ditemukan|not found|404/i).first()).toBeVisible();
  });
});
