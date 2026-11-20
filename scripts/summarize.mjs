#!/usr/bin/env node
/**
 * Mengubah reports/results.json (reporter JSON Playwright) menjadi tabel Markdown
 * untuk laporan tugas akhir. Keluaran:
 *   - reports/SUMMARY.md
 *   - docs/05-hasil-otomasi.md
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const results = JSON.parse(readFileSync('reports/results.json', 'utf8'));

const rows = [];
function walk(suite) {
  for (const spec of suite.specs || []) {
    for (const test of spec.tests || []) {
      const last = test.results[test.results.length - 1] || {};
      rows.push({
        file: spec.file || suite.file || '',
        title: spec.title,
        status: last.status || 'unknown',
        duration: last.duration || 0,
        error: (last.error?.message || '').split('\n')[0].trim(),
      });
    }
  }
  for (const child of suite.suites || []) walk(child);
}
for (const s of results.suites || []) walk(s);

const total = rows.length;
const passed = rows.filter((r) => r.status === 'passed').length;
const failed = rows.filter((r) => r.status !== 'passed');
const duration = rows.reduce((a, r) => a + r.duration, 0);

const suiteName = (file) =>
  ({
    '01-blackbox': 'Black box (fungsional)',
    '02-whitebox': 'White box (struktural)',
    '03-greybox': 'Grey box (HTTP/konfigurasi)',
    '04-nonfungsional': 'Non-fungsional (kinerja, responsif, aksesibilitas)',
  })[file.split('/')[1]] || file;

const files = [...new Set(rows.map((r) => r.file))];
const perFile = files
  .map((f) => {
    const rs = rows.filter((r) => r.file === f);
    return {
      file: f,
      name: suiteName(f),
      total: rs.length,
      pass: rs.filter((r) => r.status === 'passed').length,
      fail: rs.filter((r) => r.status !== 'passed').length,
    };
  })
  .sort((a, b) => a.file.localeCompare(b.file));

let metrics = {};
const metricsDir = 'reports/metrics';
if (existsSync(metricsDir)) {
  for (const f of readdirSync(metricsDir).filter((f) => f.endsWith('.json'))) {
    metrics[f.replace('.json', '')] = JSON.parse(readFileSync(join(metricsDir, f), 'utf8'));
  }
}

const icon = (s) => (s === 'passed' ? '✅ Lulus' : '❌ Gagal');
const esc = (s) => (s || '').replace(/\|/g, '\\|');

let md = `# 05 — Hasil Pengujian Otomatis\n\n`;
md += `Dihasilkan otomatis oleh \`scripts/summarize.mjs\` dari \`reports/results.json\`.\n\n`;
md += `- Tanggal eksekusi: ${new Date().toISOString().slice(0, 10)}\n`;
md += `- Perintah: \`npm test\` (Playwright, Chromium headless, 2 worker)\n`;
md += `- Total test case otomatis: **${total}**\n`;
md += `- Lulus: **${passed}** | Gagal: **${failed.length}** | Tingkat kelulusan: **${((passed / total) * 100).toFixed(1)}%**\n`;
md += `- Total durasi eksekusi: ${(duration / 1000).toFixed(1)} detik\n\n`;

md += `## 5.1 Rekapitulasi per berkas uji\n\n| Berkas | Kategori | Jumlah | Lulus | Gagal |\n|---|---|---:|---:|---:|\n`;
for (const p of perFile) {
  md += `| \`${p.file}\` | ${p.name} | ${p.total} | ${p.pass} | ${p.fail} |\n`;
}
md += `| **Total** | | **${total}** | **${passed}** | **${failed.length}** |\n\n`;

md += `## 5.2 Rincian seluruh test case\n\n| # | Test case | Berkas | Status | Durasi (ms) |\n|---:|---|---|---|---:|\n`;
rows.forEach((r, i) => {
  md += `| ${i + 1} | ${esc(r.title)} | \`${r.file.split('/').pop()}\` | ${icon(r.status)} | ${Math.round(r.duration)} |\n`;
});

md += `\n## 5.3 Test case yang gagal (temuan)\n\n`;
if (!failed.length) {
  md += `Tidak ada kegagalan.\n`;
} else {
  md += `| Test case | Pesan kegagalan (ringkas) |\n|---|---|\n`;
  for (const f of failed) md += `| ${esc(f.title)} | \`${esc(f.error).slice(0, 300)}\` |\n`;
}

md += `\n## 5.4 Metrik non-fungsional terukur\n\n\`\`\`json\n${JSON.stringify(metrics, null, 2).slice(0, 6000)}\n\`\`\`\n`;

writeFileSync('docs/05-hasil-otomasi.md', md, 'utf8');
writeFileSync('reports/SUMMARY.md', md, 'utf8');

console.log(`Total ${total} | lulus ${passed} | gagal ${failed.length} | ${(duration / 1000).toFixed(1)}s`);
console.log('Ditulis: docs/05-hasil-otomasi.md, reports/SUMMARY.md');
