import { test, expect, SCOPE_PAGES } from '../support/helpers';

test.describe('BB — Daftar & detail paket (black box)', () => {
  test('TC-BB-23 Halaman paket menampilkan kartu paket dengan harga', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('main h3');
    expect(await cards.count(), 'kartu paket tidak tampil').toBeGreaterThanOrEqual(3);
    await expect(page.getByText(/Rp\s?[\d.]+/).first()).toBeVisible();
    await expect(page.getByText(/Paket Ditemukan/i).first()).toBeVisible();
  });

  test('TC-BB-24 Detail paket dapat dibuka dari kartu dan memuat informasi utama', async ({ page }) => {
    await page.goto('/products');
    await page.waitForLoadState('networkidle');
    const card = page.locator('main button').filter({ hasText: /Umrah|HAJI/i }).first();
    await card.click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/(Rp|\$)\s?[\d.,]+/).first(), 'harga paket tidak tampil di halaman detail').toBeVisible();
    const cta = page.getByRole('button', { name: /whatsapp|pesan|daftar|booking/i }).first();
    await expect(cta).toBeVisible();
  });

  test('TC-BB-25 Detail paket menampilkan fasilitas dan itinerary', async ({ page }) => {
    await page.goto('/product/umrah-plus-thaif-12-hari-keberangkatan-13-september-2025');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const body = await page.locator('body').innerText();
    expect(body.length).toBeGreaterThan(1000);
    expect(body).toMatch(/fasilitas|itinerary|program|hotel/i);
  });

  test('TC-BB-26 Halaman artikel membuka detail artikel', async ({ page }) => {
    await page.goto('/artikel');
    const link = page.locator('a[href^="/artikel/"]').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/\/artikel\/.+/);
    await page.waitForLoadState('domcontentloaded');
    const isi = await page.locator('main').first().innerText();
    expect(isi.length, 'artikel harus punya isi naratif').toBeGreaterThan(1200);
  });

  test('TC-BB-27 Tidak ada tautan internal yang rusak pada halaman cakupan', async ({ page, request }) => {
    const links = new Set<string>();
    for (const target of SCOPE_PAGES) {
      await page.goto(target.path);
      const hrefs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href^="/"]')).map((a) => a.getAttribute('href') || ''),
      );
      hrefs
        .filter((h) => h && !h.startsWith('//') && !h.includes('#'))
        .forEach((h) => links.add(h.split('?')[0]));
    }
    const broken: string[] = [];
    for (const href of [...links]) {
      const res = await request.get(href, { maxRedirects: 5 });
      if (res.status() >= 400) broken.push(`${href} -> ${res.status()}`);
    }
    expect(broken, `tautan rusak: ${broken.join(', ')}`).toEqual([]);
  });
});
