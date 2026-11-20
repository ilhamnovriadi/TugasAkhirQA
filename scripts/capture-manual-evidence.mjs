#!/usr/bin/env node
/**
 * Menjalankan skenario pengujian manual pada peramban dan menyimpan tangkapan layar
 * sebagai bukti (qa-evidence/MT-xx/). Setiap berkas dinamai agar terbaca mandiri.
 */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const BASE = 'https://taqwatravel.com';
const out = (dir) => `qa-evidence/${dir}`;

const browser = await chromium.launch();
const measurements = {};

// ---------- Desktop 1280x800 ----------
const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 }, locale: 'id-ID' });

await mkdir(out('MT-BB-01'), { recursive: true });
await desktop.goto(BASE, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(2000);
await desktop.screenshot({ path: `${out('MT-BB-01')}/beranda-desktop-1280x800.png` });
measurements['MT-BB-01'] = await desktop.evaluate(() => ({
  title: document.title,
  h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim()),
  heroCta: [...document.querySelectorAll('button')].map((b) => b.textContent.trim()).filter((t) => /Lihat Paket|Konsultasi/.test(t)).slice(0, 2),
  packages: [...document.querySelectorAll('button')].filter((b) => /Lihat Detail/.test(b.textContent || '')).length,
}));

await mkdir(out('MT-BB-03'), { recursive: true });
await desktop.locator('button:visible', { hasText: 'Pilih kategori' }).first().click();
await desktop.waitForTimeout(900);
await desktop.screenshot({ path: `${out('MT-BB-03')}/dropdown-kategori-terbuka-1280x800.png` });
measurements['MT-BB-03'] = await desktop.evaluate(() => ({
  listbox: !!document.querySelector('[role="listbox"]'),
  options: [...document.querySelectorAll('[role="option"]')].map((o) => o.textContent.trim()),
}));
await desktop.keyboard.press('Escape');

await mkdir(out('MT-BB-04'), { recursive: true });
const kode = desktop.locator('input[placeholder*="TQW-2025-001234"]:visible').first();
await kode.scrollIntoViewIfNeeded();
await kode.fill('TQW-9999-999999');
await desktop.getByRole('button', { name: /Cek Reservasi/i }).first().click();
await desktop.waitForTimeout(3500);
await desktop.screenshot({ path: `${out('MT-BB-04')}/cek-reservasi-kode-tidak-valid-1280x800.png` });
measurements['MT-BB-04'] = await desktop.evaluate(() => ({
  visibleText: document.body.innerText.split('\n').filter((l) => /tidak|gagal|ditemukan|error|periksa/i.test(l)).slice(0, 5),
  url: location.href,
}));

await mkdir(out('MT-BB-05'), { recursive: true });
const res404 = await desktop.goto(`${BASE}/halaman-tidak-ada-qa-2026`, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(800);
await desktop.screenshot({ path: `${out('MT-BB-05')}/halaman-404.png` });
measurements['MT-BB-05'] = {
  status: res404?.status(),
  heading: await desktop.locator('h1').first().textContent().catch(() => null),
  robotsMeta: await desktop.locator('meta[name="robots"]').first().getAttribute('content').catch(() => null),
};

await mkdir(out('MT-BB-06'), { recursive: true });
await desktop.goto(`${BASE}/daftar-agen`, { waitUntil: 'networkidle' });
await desktop.getByRole('button', { name: /daftar|kirim|submit/i }).first().click();
await desktop.waitForTimeout(1500);
await desktop.screenshot({ path: `${out('MT-BB-06')}/form-agen-submit-kosong-1280x800.png`, fullPage: false });
measurements['MT-BB-06'] = await desktop.evaluate(() => ({
  invalidFields: document.querySelectorAll('input:invalid, [aria-invalid="true"]').length,
  requiredFields: document.querySelectorAll('form [required], form input[required]').length,
  url: location.pathname,
}));

await mkdir(out('MT-GB-02'), { recursive: true });
await desktop.goto(`${BASE}/dashboard`, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(800);
await desktop.screenshot({ path: `${out('MT-GB-02')}/dashboard-login-admin-1280x800.png` });
measurements['MT-GB-02'] = await desktop.evaluate(() => ({
  h1: document.querySelector('h1')?.textContent.trim(),
  robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || null,
  hasPasswordField: !!document.querySelector('input[type="password"]'),
}));

await mkdir(out('MT-BB-07'), { recursive: true });
await desktop.goto(`${BASE}/products`, { waitUntil: 'networkidle' });
await desktop.waitForTimeout(2500);
await desktop.screenshot({ path: `${out('MT-BB-07')}/daftar-paket-tanpa-harga-1280x800.png` });
measurements['MT-BB-07'] = await desktop.evaluate(() => ({
  cards: document.querySelectorAll('main h3').length,
  hasHargaText: /Rp|\$/.test(document.body.innerText),
  priceSamples: (document.body.innerText.match(/(Rp|\$)\s?[\d.,]+/g) || []).slice(0, 3),
}));

// ---------- Mobile 390x844 ----------
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: 'id-ID' });
await mkdir(out('MT-BB-02'), { recursive: true });
await mobile.goto(BASE, { waitUntil: 'networkidle' });
await mobile.waitForTimeout(1500);
await mobile.screenshot({ path: `${out('MT-BB-02')}/beranda-mobile-390x844.png` });
await mobile.getByRole('button', { name: /toggle menu/i }).first().click();
await mobile.waitForTimeout(700);
await mobile.screenshot({ path: `${out('MT-BB-02')}/menu-mobile-terbuka-390x844.png` });
measurements['MT-BB-02'] = await mobile.evaluate(() => ({
  menuLinks: [...document.querySelectorAll('header a')].filter((a) => a.offsetWidth > 0).map((a) => a.textContent.trim()).filter(Boolean),
  overflowX: document.documentElement.scrollWidth - window.innerWidth,
}));

await writeFile('qa-evidence/measurements.json', JSON.stringify(measurements, null, 2), 'utf8');
await browser.close();
console.log(JSON.stringify(measurements, null, 2));
