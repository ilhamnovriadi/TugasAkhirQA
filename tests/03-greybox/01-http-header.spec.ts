import { test, expect, SCOPE_PAGES } from '../support/helpers';

test.describe('GB — HTTP, header, dan konfigurasi server (grey box)', () => {
  test('TC-GB-01 Semua halaman cakupan merespons 200', async ({ request }) => {
    const failures: string[] = [];
    for (const target of SCOPE_PAGES) {
      const res = await request.get(target.path);
      if (res.status() !== 200) failures.push(`${target.path} -> ${res.status()}`);
    }
    expect(failures, failures.join(', ')).toEqual([]);
  });

  test('TC-GB-02 Header keamanan dasar tersedia', async ({ request }) => {
    const res = await request.get('/');
    const h = res.headers();
    const missing: string[] = [];
    if (!h['x-content-type-options']) missing.push('X-Content-Type-Options');
    if (!h['x-frame-options'] && !/frame-ancestors/i.test(h['content-security-policy'] || '')) missing.push('X-Frame-Options/CSP frame-ancestors');
    if (!h['referrer-policy']) missing.push('Referrer-Policy');
    if (!h['strict-transport-security']) missing.push('Strict-Transport-Security');
    if (!h['content-security-policy']) missing.push('Content-Security-Policy');
    expect(missing, `header tidak ada: ${missing.join(', ')}`).toEqual([]);
  });

  test('TC-GB-03 Content-Type HTML menyertakan charset', async ({ request }) => {
    const res = await request.get('/');
    expect(res.headers()['content-type'] || '').toMatch(/text\/html;\s*charset=utf-8/i);
  });

  test('TC-GB-04 Ukuran dokumen HTML di bawah anggaran', async ({ request }) => {
    const res = await request.get('/');
    const body = await res.body();
    expect(body.byteLength, `${(body.byteLength / 1024).toFixed(0)} KB`).toBeLessThan(200 * 1024);
  });

  test('TC-GB-05 Aset statis memakai cache yang sesuai', async ({ request }) => {
    const res = await request.get('/favicon.ico');
    expect(res.status()).toBe(200);
    const cc = res.headers()['cache-control'] || '';
    expect(cc, 'aset statis sebaiknya memiliki cache-control').toMatch(/max-age/i);
  });

  test('TC-GB-06 HTTP dialihkan ke HTTPS dan www dinormalisasi', async ({ page, request }) => {
    const http = await request.get('http://taqwatravel.com/', { maxRedirects: 0 });
    expect([301, 302, 307, 308], `HTTP tidak dialihkan ke HTTPS (status ${http.status()})`).toContain(http.status());
    const www = await request
      .get('https://www.taqwatravel.com/', { maxRedirects: 0, timeout: 15_000 })
      .catch(() => null);
    expect(www, 'www.taqwatravel.com tidak dapat diakses').not.toBeNull();
    expect(www!.status(), `status www = ${www!.status()}`).toBeLessThan(400);
    await page.goto('https://taqwatravel.com/');
    expect(page.url()).toMatch(/^https:\/\/taqwatravel\.com/);
  });

  test('TC-GB-07 Halaman administrasi tidak dapat diindeks mesin pencari', async ({ page }) => {
    await page.goto('/dashboard');
    const robots = await page.locator('meta[name="robots"]').first().getAttribute('content').catch(() => null);
    const xrt = (await page.request.get('/dashboard')).headers()['x-robots-tag'];
    expect(`${robots || ''} ${xrt || ''}`.toLowerCase(), 'halaman login admin harus noindex').toMatch(/noindex/);
  });

  test('TC-GB-08 Tidak ada direktori API publik yang dapat diakses tanpa izin', async ({ request }) => {
    const res = await request.get('/api/');
    expect([401, 403, 404, 405]).toContain(res.status());
  });

  test('TC-GB-09 Respons HTML dikompresi saat klien mendukung', async ({ request }) => {
    const res = await request.get('/', { headers: { 'Accept-Encoding': 'gzip, br' } });
    const enc = (res.headers()['content-encoding'] || '').toLowerCase();
    expect(['gzip', 'br', 'zstd']).toContain(enc);
  });

  test('TC-GB-10 Waktu respons server (TTFB) dalam batas', async ({ request }) => {
    const samples: number[] = [];
    for (let i = 0; i < 3; i++) {
      const started = Date.now();
      await request.get('/');
      samples.push(Date.now() - started);
    }
    const avg = samples.reduce((a, b) => a + b, 0) / samples.length;
    expect(avg, `rata-rata ${avg.toFixed(0)} ms`).toBeLessThan(1200);
  });
});
