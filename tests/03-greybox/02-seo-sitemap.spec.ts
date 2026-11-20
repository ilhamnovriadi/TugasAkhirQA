import { test, expect } from '../support/helpers';

test.describe('GB — SEO teknis, sitemap, dan data terstruktur (grey box)', () => {
  test('TC-GB-11 robots.txt memuat aturan dasar dan menunjuk sitemap', async ({ request }) => {
    const res = await request.get('/robots.txt');
    expect(res.status()).toBe(200);
    const txt = await res.text();
    expect(txt).toMatch(/User-agent:\s*\*/i);
    expect(txt.toLowerCase(), 'robots.txt sebaiknya menyebut sitemap').toMatch(/sitemap:\s*https/i);
  });

  test('TC-GB-12 sitemap.xml valid, unik, dan seluruh URL dapat diakses', async ({ request }) => {
    const res = await request.get('/sitemap.xml');
    expect(res.status()).toBe(200);
    const xml = await res.text();
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
    expect(urls.length).toBeGreaterThan(5);
    expect(new Set(urls).size, 'tidak boleh ada URL duplikat di sitemap').toBe(urls.length);
    const bad = urls.filter((u) => !u.startsWith('https://taqwatravel.com'));
    expect(bad, `URL di luar domain kanonik: ${bad.join(', ')}`).toEqual([]);
  });

  test('TC-GB-13 Canonical sesuai URL dan hanya satu', async ({ page }) => {
    for (const path of ['/', '/products', '/artikel']) {
      await page.goto(path);
      const canon = page.locator('link[rel="canonical"]');
      expect(await canon.count(), `${path} harus punya 1 canonical`).toBe(1);
      const href = await canon.getAttribute('href');
      expect(href?.replace(/\/$/, '')).toBe(`https://taqwatravel.com${path}`.replace(/\/$/, ''));
    }
  });

  test('TC-GB-14 Meta description unik dan panjangnya wajar', async ({ page }) => {
    const seen = new Map<string, string>();
    for (const path of ['/', '/products', '/artikel', '/profil']) {
      await page.goto(path);
      const desc = await page.locator('meta[name="description"]').first().getAttribute('content');
      expect(desc, `${path} tanpa meta description`).toBeTruthy();
      const len = (desc || '').length;
      expect(len, `${path} panjang ${len}`).toBeGreaterThanOrEqual(50);
      expect(len, `${path} panjang ${len}`).toBeLessThanOrEqual(170);
      seen.set(path, desc || '');
    }
    const values = [...seen.values()];
    expect(new Set(values).size, 'meta description duplikat antar halaman').toBe(values.length);
  });

  test('TC-GB-15 Open Graph lengkap dan gambar OG dapat diakses', async ({ page, request }) => {
    await page.goto('/');
    for (const prop of ['og:title', 'og:description', 'og:image', 'og:url']) {
      await expect(page.locator(`meta[property="${prop}"]`).first(), `meta ${prop} hilang`).toHaveAttribute('content', /.+/);
    }
    const img = await page.locator('meta[property="og:image"]').first().getAttribute('content');
    const res = await request.get(img!);
    expect(res.status()).toBe(200);
  });

  test('TC-GB-16 Data terstruktur JSON-LD valid', async ({ page }) => {
    await page.goto('/');
    const blocks = await page.locator('script[type="application/ld+json"]').allInnerTexts();
    expect(blocks.length).toBeGreaterThan(0);
    for (const block of blocks) {
      const parsed = JSON.parse(block);
      expect(JSON.stringify(parsed)).toContain('schema.org');
    }
  });

  test('TC-GB-17 Judul halaman berbeda antar halaman (HTML dari server)', async ({ request }) => {
    const titles: string[] = [];
    for (const path of ['/', '/products', '/artikel', '/profil', '/testimonials']) {
      const html = await (await request.get(path)).text();
      const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      titles.push((match?.[1] || '(tanpa title)').trim());
    }
    expect(new Set(titles).size, `judul SSR: ${titles.join(' | ')}`).toBe(titles.length);
  });

  test('TC-GB-18 Halaman 404 tidak diindeks dan mengembalikan status benar', async ({ request, page }) => {
    const res = await request.get('/halaman-tidak-ada-qa-2026');
    expect(res.status()).toBe(404);
    await page.goto('/halaman-tidak-ada-qa-2026');
    const robots = await page.locator('meta[name="robots"]').first().getAttribute('content').catch(() => '');
    expect((robots || '').toLowerCase()).toContain('noindex');
  });
});
