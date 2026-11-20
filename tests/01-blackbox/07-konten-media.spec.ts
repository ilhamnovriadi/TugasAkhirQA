import { test, expect, waitForImages } from '../support/helpers';

test.describe('BB — Galeri, testimoni, dan media (black box)', () => {
  test('TC-BB-32 Galeri menampilkan gambar yang benar-benar termuat', async ({ page }) => {
    await page.goto('/galeri');
    await waitForImages(page);
    const stats = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return {
        total: imgs.length,
        broken: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      };
    });
    expect(stats.total).toBeGreaterThan(0);
    expect(stats.broken, 'ada gambar gagal dimuat').toBe(0);
  });

  test('TC-BB-33 Halaman testimoni menampilkan kartu testimoni jamaah', async ({ page }) => {
    await page.goto('/testimonials');
    await page.waitForLoadState('networkidle');
    const body = await page.locator('body').innerText();
    expect(body.length).toBeGreaterThan(800);
    expect(body).toMatch(/testimoni|jamaah/i);
    expect(body, 'kutipan testimoni tidak tampil').toMatch(/Abdul Rais|Kartika/i);
  });

  test('TC-BB-34 Testimoni beranda menampilkan nama jamaah', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('heading', { name: /Video Testimoni/i }).scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    const body = await page.locator('body').innerText();
    expect(body, 'nama jamaah tidak tampil pada bagian testimoni').toMatch(/Abdul Rais|Kartika/i);
  });

  test('TC-BB-35 Halaman profil memuat legalitas perusahaan', async ({ page }) => {
    await page.goto('/profil');
    const body = await page.locator('body').innerText();
    expect(body).toMatch(/PT\.?\s*Taqwa Cahaya Semesta/i);
    expect(body.length).toBeGreaterThan(1500);
  });
});
