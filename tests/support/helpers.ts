import { test, expect, type Page } from '@playwright/test';

/** Halaman yang menjadi cakupan pengujian (sesuai sitemap publik). */
export const SCOPE_PAGES = [
  { path: '/', name: 'Beranda', h1: /Haji & Umroh Terpercaya/i },
  { path: '/profil', name: 'Profil', h1: /Profil/i },
  { path: '/products', name: 'Paket Perjalanan', h1: /Paket Perjalanan/i },
  { path: '/artikel', name: 'Artikel', h1: /Artikel/i },
  { path: '/galeri', name: 'Galeri', h1: /Galeri/i },
  { path: '/testimonials', name: 'Testimoni', h1: /Testimoni/i },
  { path: '/daftar-agen', name: 'Daftar Agen', h1: /Daftar Agen/i },
  { path: '/agen-resmi', name: 'Agen Resmi', h1: /Agen Resmi/i },
  { path: '/privacy', name: 'Kebijakan Privasi', h1: /privasi|privacy/i },
  { path: '/terms', name: 'Syarat & Ketentuan', h1: /syarat|ketentuan|terms/i },
];

/** Menangkap error console dan error runtime JavaScript dari halaman. */
export function watchConsole(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));
  return errors;
}

/** Buka menu navigasi mobile bila tombol toggle tersedia. */
export async function openNavIfCollapsed(page: Page) {
  const toggle = page.getByRole('button', { name: /toggle menu|menu/i }).first();
  if (await toggle.isVisible().catch(() => false)) {
    await toggle.click();
    await page.waitForTimeout(400);
  }
}

export type Heading = { level: number; text: string };

export async function headings(page: Page): Promise<Heading[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map((h) => ({
      level: Number(h.tagName.substring(1)),
      text: (h.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90),
    })),
  );
}

export async function duplicateIds(page: Page): Promise<{ id: string; count: number }[]> {
  return page.evaluate(() => {
    const counts = new Map<string, number>();
    document.querySelectorAll('[id]').forEach((el) => {
      const id = el.getAttribute('id') || '';
      if (!id) return;
      counts.set(id, (counts.get(id) || 0) + 1);
    });
    return [...counts.entries()].filter(([, c]) => c > 1).map(([id, count]) => ({ id, count }));
  });
}

export async function unlabeledFormControls(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const controls = Array.from(
      document.querySelectorAll('input:not([type="hidden"]), select, textarea'),
    ) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
    const problems: string[] = [];
    for (const el of controls) {
      const id = el.getAttribute('id');
      const aria = el.getAttribute('aria-label') || el.getAttribute('aria-labelledby');
      const byFor = id ? document.querySelector(`label[for="${CSS.escape(id)}"]`) : null;
      const wrapped = el.closest('label');
      if (!aria && !byFor && !wrapped) {
        problems.push(`${el.tagName.toLowerCase()}[type=${el.getAttribute('type') || 'text'}] placeholder="${el.getAttribute('placeholder') || ''}"`);
      }
    }
    return problems;
  });
}

export async function imagesWithoutAlt(page: Page): Promise<string[]> {
  return page.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .filter((img) => !img.hasAttribute('alt'))
      .map((img) => img.getAttribute('src') || '(tanpa src)'),
  );
}

export async function waitForImages(page: Page) {
  await page.evaluate(async () => {
    const imgs = Array.from(document.querySelectorAll('img'));
    imgs.forEach((img) => {
      if (img.loading === 'lazy') img.loading = 'eager';
    });
    await Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) return resolve();
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
            setTimeout(resolve, 8000);
          }),
      ),
    );
  });
}

/** Tulis ringkasan metrik ke reports/ agar dapat dikutip di laporan. */
export async function writeMetric(name: string, data: unknown) {
  const { mkdir, writeFile } = await import('node:fs/promises');
  await mkdir('reports/metrics', { recursive: true });
  await writeFile(`reports/metrics/${name}.json`, JSON.stringify(data, null, 2), 'utf8');
}

export async function median(values: number[]): Promise<number> {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export { test, expect };
