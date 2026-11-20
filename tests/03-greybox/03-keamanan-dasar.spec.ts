import { test, expect } from '../support/helpers';

test.describe('GB — Pemeriksaan keamanan dasar (grey box)', () => {
  test('TC-GB-19 Tidak ada mixed content pada halaman HTTPS', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const insecure = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img[src^="http:"], script[src^="http:"], link[href^="http:"]')).map(
        (el) => el.getAttribute('src') || el.getAttribute('href') || '',
      ),
    );
    expect(insecure).toEqual([]);
  });

  test('TC-GB-20 Cookie yang dikirim memakai atribut Secure', async ({ request }) => {
    const res = await request.get('/');
    const setCookie = res.headersArray().filter((h) => h.name.toLowerCase() === 'set-cookie');
    const withoutSecure = setCookie.filter((c) => !/;\s*secure/i.test(c.value));
    expect(withoutSecure.map((c) => c.value)).toEqual([]);
  });

  test('TC-GB-21 Halaman admin tidak membocorkan sesi atau kredensial di HTML', async ({ page }) => {
    const res = await page.goto('/dashboard');
    const html = (await res?.text()) || '';
    expect(html.toLowerCase()).not.toContain('password:');
    expect(html.toLowerCase()).not.toContain('bearer ');
    expect(html.toLowerCase()).not.toContain('service_role');
  });

  test('TC-GB-22 Panel admin tidak dapat diakses tanpa autentikasi', async ({ page }) => {
    for (const path of ['/dashboard', '/dashboard/paket', '/dashboard/reservasi']) {
      const res = await page.goto(path);
      const body = (await page.locator('body').innerText()).toLowerCase();
      const isLogin = /login|masuk|password|email/i.test(body);
      const isApp = /kelola|dashboard|statistik|reservasi terbaru/i.test(body);
      expect(
        isLogin || (res?.status() ?? 200) >= 400,
        `${path} menampilkan panel tanpa login (status ${res?.status()})`,
      ).toBe(true);
      expect(isApp, `${path} tampak membuka data admin tanpa login`).toBe(false);
    }
  });

  test('TC-GB-23 Tidak ada kebocoran stack trace pada respons error', async ({ page, request }) => {
    const res = await request.get('/halaman-error-qa-2026');
    const body = await res.text();
    expect(body.toLowerCase()).not.toContain('at Object.');
    expect(body.toLowerCase()).not.toContain('node_modules');
    await page.goto('/dashboard');
    expect((await page.locator('body').innerText()).toLowerCase()).not.toContain('supabase');
  });
});
