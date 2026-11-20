import { test, expect, watchConsole } from '../support/helpers';

test.describe('BB — Beranda (black box, fungsional)', () => {
  test('TC-BB-01 Beranda mengembalikan 200 dan menampilkan identitas halaman', async ({ page }) => {
    const res = await page.goto('/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle(/Taqwa Travel/i);
    await expect(page.locator('h1').first()).toContainText(/Haji & Umroh Terpercaya/i);
  });

  test('TC-BB-02 Hero menampilkan dua CTA utama', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('button', { name: /Lihat Paket/i }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Konsultasi Gratis/i }).first()).toBeVisible();
  });

  test('TC-BB-03 Enam nilai jual layanan tampil', async ({ page }) => {
    await page.goto('/');
    for (const label of [
      'Terpercaya & Berlisensi',
      'Bimbingan Spiritual',
      'Pelayanan Premium',
      'Support 24/7',
      'Harga Transparan',
      'Pengalaman Berkesan',
    ]) {
      await expect(page.getByText(label).first()).toBeVisible();
    }
  });

  test('TC-BB-04 Slider paket menampilkan kartu, harga, dan tombol detail', async ({ page }) => {
    await page.goto('/');
    const details = page.getByText(/^Lihat Detail$/i);
    await expect(details.first(), 'kartu paket tidak muncul di beranda').toBeVisible({ timeout: 25_000 });
    expect(await details.count(), 'slider seharusnya memuat beberapa paket').toBeGreaterThanOrEqual(2);
    await expect(page.getByText(/Rp\s?[\d.]+/).first()).toBeVisible();
  });

  test('TC-BB-05 Tombol "Lihat Semua Paket" membuka halaman paket', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /Lihat Semua Paket/i }).first().click();
    await expect(page).toHaveURL(/\/products/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Paket Perjalanan/i);
  });

  test('TC-BB-06 Bagian galeri, testimoni, dan artikel beranda tampil', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Galeri Foto Jamaah/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Video Testimoni/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Artikel & Panduan/i })).toBeVisible();
  });

  test('TC-BB-07 Footer menampilkan kontak dan tautan legal', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer.getByText(/taqwatravel\.pusat@gmail\.com/i)).toBeVisible();
    await expect(footer.getByRole('link', { name: /Privacy Policy/i })).toBeVisible();
    await expect(footer.getByRole('link', { name: /Terms of Service/i })).toBeVisible();
  });

  test('TC-BB-08 Tidak ada error runtime JavaScript saat beranda dimuat', async ({ page }) => {
    const errors = watchConsole(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors, `console errors: ${errors.join(' | ')}`).toEqual([]);
  });
});
