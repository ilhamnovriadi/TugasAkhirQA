#!/usr/bin/env node
/**
 * Merender seluruh diagram Mermaid di diagrams/*.mmd menjadi gambar PNG
 * (diagrams/*.png) memakai Chromium dari Playwright yang sudah terpasang,
 * sehingga tidak perlu memasang mermaid-cli, Java, atau PlantUML.
 *
 * Pustaka Mermaid diambil dari CDN (butuh koneksi internet saat regenerasi).
 * Hasil PNG dipakai langsung oleh README.md dan docs/08.
 */
import { readFile, readdir, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIR = path.join(ROOT, 'diagrams');
const MERMAID_CDN = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
const SCALE = Number(process.env.DIAGRAM_SCALE ?? 2);

const CONFIG = {
  startOnLoad: false,
  securityLevel: 'loose',
  theme: 'base',
  themeVariables: {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontSize: '14px',
    primaryColor: '#e0e7ff',
    primaryTextColor: '#1f2937',
    primaryBorderColor: '#6366f1',
    secondaryColor: '#e0f2fe',
    tertiaryColor: '#f8fafc',
    lineColor: '#94a3b8',
    edgeLabelBackground: '#ffffff',
    clusterBkg: '#f8fafc',
    titleColor: '#0f172a',
    taskBkgColor: '#c7d2fe',
    taskBorderColor: '#6366f1',
    taskTextColor: '#1e1b4b',
    taskTextOutsideColor: '#334155',
    taskTextLightColor: '#334155',
    taskTextDarkColor: '#1e1b4b',
    sectionBkgColor: '#f8fafc',
    altSectionBkgColor: '#eef2ff',
    gridColor: '#e2e8f0',
    doneTaskBkgColor: '#a5b4fc',
    doneTaskBorderColor: '#4f46e5',
    critBkgColor: '#fecaca',
    critBorderColor: '#ef4444',
    todayLineColor: '#ef4444',
  },
  flowchart: {
    htmlLabels: false,
    useMaxWidth: false,
    curve: 'basis',
    padding: 18,
    nodeSpacing: 55,
    rankSpacing: 65,
  },
  gantt: {
    useMaxWidth: false,
    useWidth: 2400,
    leftPadding: 260,
    rightPadding: 60,
    gridLineStartPadding: 55,
    fontSize: 15,
    sectionFontSize: 15,
    barHeight: 26,
    barGap: 6,
    topPadding: 70,
    titleTopMargin: 20,
  },
  timeline: { useMaxWidth: false, padding: 12 },
};

const HTML = `<!doctype html>
<html><head><meta charset="utf-8" />
<style>
  html, body { margin: 0; padding: 0; background: #ffffff; }
  body { width: max-content; }
  #out { display: inline-block; padding: 32px 36px; background: #ffffff; }
  #out svg { display: block; max-width: none !important; height: auto; }
</style>
<script type="module">
  import mermaid from '${MERMAID_CDN}';
  mermaid.initialize(${JSON.stringify(CONFIG)});
  window.renderDiagram = async (text, id) => {
    const { svg } = await mermaid.render(id, text);
    const out = document.getElementById('out');
    out.innerHTML = svg;
    const el = out.querySelector('svg');
    el.removeAttribute('style');
    const box = el.viewBox && el.viewBox.baseVal;
    if (box && box.width && box.height) {
      el.setAttribute('width', String(box.width));
      el.setAttribute('height', String(box.height));
    }
    await document.fonts.ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    return { width: box ? box.width : 0, height: box ? box.height : 0 };
  };
</script>
</head><body><div id="out"></div></body></html>`;

async function main() {
  await mkdir(DIR, { recursive: true });
  const sources = (await readdir(DIR)).filter((f) => f.endsWith('.mmd')).sort();
  if (sources.length === 0) {
    throw new Error(`Tidak ada berkas .mmd di ${DIR}`);
  }

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      deviceScaleFactor: SCALE,
      viewport: { width: 3600, height: 2400 },
    });
    const page = await context.newPage();
    page.on('pageerror', (err) => console.error('  [halaman]', err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') console.error('  [console]', msg.text());
    });

    await page.setContent(HTML, { waitUntil: 'load' });
    await page.waitForFunction(
      () => typeof window.renderDiagram === 'function',
      undefined,
      { timeout: 90_000 },
    );

    for (const file of sources) {
      const source = await readFile(path.join(DIR, file), 'utf8');
      const id = `diagram-${file.replace(/[^a-z0-9]+/gi, '-')}`;
      const size = await page.evaluate(
        ([text, diagramId]) => window.renderDiagram(text, diagramId),
        [source, id],
      );
      const svgBox = await page.locator('#out svg').boundingBox();
      if (!svgBox || svgBox.width < 40 || svgBox.height < 40) {
        throw new Error(`Diagram ${file} dirender kosong (${JSON.stringify(svgBox)})`);
      }
      const target = path.join(DIR, file.replace(/\.mmd$/, '.png'));
      await page.locator('#out').screenshot({ path: target });
      const info = await stat(target);
      console.log(
        `✓ ${file} → ${path.basename(target)} ` +
          `(${Math.round(size.width)}×${Math.round(size.height)} pt, ` +
          `${(info.size / 1024).toFixed(0)} KB, ${SCALE}×)`,
      );
    }
    console.log(`\nSelesai: ${sources.length} diagram PNG di diagrams/`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(`Gagal merender diagram: ${err.message}`);
  process.exitCode = 1;
});
