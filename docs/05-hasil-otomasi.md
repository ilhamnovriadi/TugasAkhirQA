# 05 - Hasil Pengujian Otomatis

Dihasilkan otomatis oleh [`scripts/summarize.mjs`](../scripts/summarize.mjs) dari [`reports/results.json`](../reports/results.json).

- Tanggal eksekusi: 2026-11-26
- Perintah: `npm test` (Playwright, Chromium headless, 2 worker)
- Total test case otomatis: **86**
- Lulus: **71** | Gagal: **15** | Tingkat kelulusan: **82.6%**
- Total durasi eksekusi: 163.7 detik

## 5.1 Rekapitulasi per berkas uji

| Berkas | Kategori | Jumlah | Lulus | Gagal |
|---|---|---:|---:|---:|
| `01-blackbox/01-beranda.spec.ts` | 01-blackbox/01-beranda.spec.ts | 8 | 8 | 0 |
| `01-blackbox/02-navigasi.spec.ts` | 01-blackbox/02-navigasi.spec.ts | 5 | 5 | 0 |
| `01-blackbox/03-pencarian.spec.ts` | 01-blackbox/03-pencarian.spec.ts | 6 | 6 | 0 |
| `01-blackbox/04-reservasi.spec.ts` | 01-blackbox/04-reservasi.spec.ts | 3 | 3 | 0 |
| `01-blackbox/05-paket-detail.spec.ts` | 01-blackbox/05-paket-detail.spec.ts | 5 | 3 | 2 |
| `01-blackbox/06-daftar-agen.spec.ts` | 01-blackbox/06-daftar-agen.spec.ts | 4 | 4 | 0 |
| `01-blackbox/07-konten-media.spec.ts` | 01-blackbox/07-konten-media.spec.ts | 4 | 4 | 0 |
| `02-whitebox/01-struktur-dom.spec.ts` | 02-whitebox/01-struktur-dom.spec.ts | 9 | 4 | 5 |
| `02-whitebox/02-kode-klien.spec.ts` | 02-whitebox/02-kode-klien.spec.ts | 4 | 4 | 0 |
| `03-greybox/01-http-header.spec.ts` | 03-greybox/01-http-header.spec.ts | 10 | 6 | 4 |
| `03-greybox/02-seo-sitemap.spec.ts` | 03-greybox/02-seo-sitemap.spec.ts | 8 | 5 | 3 |
| `03-greybox/03-keamanan-dasar.spec.ts` | 03-greybox/03-keamanan-dasar.spec.ts | 5 | 5 | 0 |
| `04-nonfungsional/01-kinerja.spec.ts` | 04-nonfungsional/01-kinerja.spec.ts | 3 | 3 | 0 |
| `04-nonfungsional/02-responsif.spec.ts` | 04-nonfungsional/02-responsif.spec.ts | 7 | 7 | 0 |
| `04-nonfungsional/03-aksesibilitas.spec.ts` | 04-nonfungsional/03-aksesibilitas.spec.ts | 5 | 4 | 1 |
| **Total** | | **86** | **71** | **15** |

## 5.2 Rincian seluruh test case

| # | Test case | Berkas | Status | Durasi (ms) |
|---:|---|---|---|---:|
| 1 | TC-BB-01 Beranda mengembalikan 200 dan menampilkan identitas halaman | `01-beranda.spec.ts` | ✅ Lulus | 972 |
| 2 | TC-BB-02 Hero menampilkan dua CTA utama | `01-beranda.spec.ts` | ✅ Lulus | 697 |
| 3 | TC-BB-03 Enam nilai jual layanan tampil | `01-beranda.spec.ts` | ✅ Lulus | 942 |
| 4 | TC-BB-04 Slider paket menampilkan kartu, harga, dan tombol detail | `01-beranda.spec.ts` | ✅ Lulus | 1249 |
| 5 | TC-BB-05 Tombol "Lihat Semua Paket" membuka halaman paket | `01-beranda.spec.ts` | ✅ Lulus | 1596 |
| 6 | TC-BB-06 Bagian galeri, testimoni, dan artikel beranda tampil | `01-beranda.spec.ts` | ✅ Lulus | 673 |
| 7 | TC-BB-07 Footer menampilkan kontak dan tautan legal | `01-beranda.spec.ts` | ✅ Lulus | 655 |
| 8 | TC-BB-08 Tidak ada error runtime JavaScript saat beranda dimuat | `01-beranda.spec.ts` | ✅ Lulus | 2884 |
| 9 | TC-BB-09 Header memiliki logo dan navigasi utama yang dapat diakses | `02-navigasi.spec.ts` | ✅ Lulus | 964 |
| 10 | TC-BB-10 Menu navigasi mobile dapat dibuka dan memuat tautan utama | `02-navigasi.spec.ts` | ✅ Lulus | 766 |
| 11 | TC-BB-11 Tautan legal footer membuka halaman yang benar | `02-navigasi.spec.ts` | ✅ Lulus | 1993 |
| 12 | TC-BB-12 Setiap halaman dalam cakupan dapat dibuka dan punya H1 | `02-navigasi.spec.ts` | ✅ Lulus | 3682 |
| 13 | TC-BB-13 URL tidak dikenal menampilkan halaman 404 dengan status 404 | `02-navigasi.spec.ts` | ✅ Lulus | 673 |
| 14 | TC-BB-14 Pencarian hero: kategori paket dapat dipilih | `03-pencarian.spec.ts` | ✅ Lulus | 1355 |
| 15 | TC-BB-15 Pencarian hero: bulan keberangkatan dapat dipilih | `03-pencarian.spec.ts` | ✅ Lulus | 1339 |
| 16 | TC-BB-16 Tombol "Cari Paket" membawa pengguna ke daftar paket | `03-pencarian.spec.ts` | ✅ Lulus | 1673 |
| 17 | TC-BB-17 Filter teks pada halaman paket menyaring kartu | `03-pencarian.spec.ts` | ✅ Lulus | 2724 |
| 18 | TC-BB-18 Pencarian artikel menyaring daftar artikel | `03-pencarian.spec.ts` | ✅ Lulus | 1723 |
| 19 | TC-BB-19 Pencarian agen resmi menyaring daftar agen | `03-pencarian.spec.ts` | ✅ Lulus | 1863 |
| 20 | TC-BB-20 Cek reservasi dengan kode kosong tidak memproses permintaan | `04-reservasi.spec.ts` | ✅ Lulus | 2483 |
| 21 | TC-BB-21 Cek reservasi dengan kode tidak valid menampilkan pesan, bukan error server | `04-reservasi.spec.ts` | ✅ Lulus | 3614 |
| 22 | TC-BB-22 Kolom kode reservasi menerima input dan mempertahankan nilainya | `04-reservasi.spec.ts` | ✅ Lulus | 450 |
| 23 | TC-BB-23 Halaman paket menampilkan kartu paket dengan harga | `05-paket-detail.spec.ts` | ❌ Gagal | 11392 |
| 24 | TC-BB-24 Detail paket dapat dibuka dari kartu dan memuat informasi utama | `05-paket-detail.spec.ts` | ✅ Lulus | 2033 |
| 25 | TC-BB-25 Detail paket menampilkan fasilitas dan itinerary | `05-paket-detail.spec.ts` | ✅ Lulus | 732 |
| 26 | TC-BB-26 Halaman artikel membuka detail artikel | `05-paket-detail.spec.ts` | ✅ Lulus | 694 |
| 27 | TC-BB-27 Tidak ada tautan internal yang rusak pada halaman cakupan | `05-paket-detail.spec.ts` | ❌ Gagal | 5040 |
| 28 | TC-BB-28 Formulir pendaftaran agen menampilkan field wajib | `06-daftar-agen.spec.ts` | ✅ Lulus | 377 |
| 29 | TC-BB-29 Submit kosong tidak mengirim data dan menampilkan validasi | `06-daftar-agen.spec.ts` | ✅ Lulus | 1925 |
| 30 | TC-BB-30 Email tidak valid ditolak oleh validasi | `06-daftar-agen.spec.ts` | ✅ Lulus | 465 |
| 31 | TC-BB-31 Field email menggunakan tipe input yang tepat | `06-daftar-agen.spec.ts` | ✅ Lulus | 427 |
| 32 | TC-BB-32 Galeri menampilkan gambar yang benar-benar termuat | `07-konten-media.spec.ts` | ✅ Lulus | 398 |
| 33 | TC-BB-33 Halaman testimoni menampilkan kartu testimoni jamaah | `07-konten-media.spec.ts` | ✅ Lulus | 1126 |
| 34 | TC-BB-34 Testimoni beranda menampilkan nama jamaah | `07-konten-media.spec.ts` | ✅ Lulus | 3360 |
| 35 | TC-BB-35 Halaman profil memuat legalitas perusahaan | `07-konten-media.spec.ts` | ✅ Lulus | 642 |
| 36 | TC-WB-01 Setiap halaman memiliki tepat satu H1 | `01-struktur-dom.spec.ts` | ❌ Gagal | 3182 |
| 37 | TC-WB-02 Hierarki heading tidak melompati level | `01-struktur-dom.spec.ts` | ❌ Gagal | 1979 |
| 38 | TC-WB-03 Tidak ada atribut id duplikat di DOM | `01-struktur-dom.spec.ts` | ✅ Lulus | 2950 |
| 39 | TC-WB-04 Semua elemen img memiliki atribut alt | `01-struktur-dom.spec.ts` | ✅ Lulus | 3162 |
| 40 | TC-WB-05 Semua kontrol formulir memiliki label yang terasosiasi | `01-struktur-dom.spec.ts` | ❌ Gagal | 2305 |
| 41 | TC-WB-06 Dokumen hanya memiliki satu elemen title | `01-struktur-dom.spec.ts` | ❌ Gagal | 966 |
| 42 | TC-WB-07 Atribut lang dokumen terisi dengan kode bahasa valid | `01-struktur-dom.spec.ts` | ❌ Gagal | 1641 |
| 43 | TC-WB-08 Jumlah node DOM dalam anggaran performa | `01-struktur-dom.spec.ts` | ✅ Lulus | 511 |
| 44 | TC-WB-09 Bundel CSS dan JS tidak memuat berkas yang gagal (4xx/5xx) | `01-struktur-dom.spec.ts` | ✅ Lulus | 2380 |
| 45 | TC-WB-10 Cakupan eksekusi bundel JavaScript terukur | `02-kode-klien.spec.ts` | ✅ Lulus | 5391 |
| 46 | TC-WB-11 Bundel CSS yang dikirim berada di bawah anggaran | `02-kode-klien.spec.ts` | ✅ Lulus | 508 |
| 47 | TC-WB-12 Tidak ada error konsol pada tiga halaman utama | `02-kode-klien.spec.ts` | ✅ Lulus | 5484 |
| 48 | TC-WB-13 Hidrasi SvelteKit selesai dan interaksi berjalan | `02-kode-klien.spec.ts` | ✅ Lulus | 502 |
| 49 | TC-GB-01 Semua halaman cakupan merespons 200 | `01-http-header.spec.ts` | ✅ Lulus | 1823 |
| 50 | TC-GB-02 Header keamanan dasar tersedia | `01-http-header.spec.ts` | ❌ Gagal | 162 |
| 51 | TC-GB-03 Content-Type HTML menyertakan charset | `01-http-header.spec.ts` | ❌ Gagal | 176 |
| 52 | TC-GB-04 Ukuran dokumen HTML di bawah anggaran | `01-http-header.spec.ts` | ✅ Lulus | 195 |
| 53 | TC-GB-05 Aset statis memakai cache yang sesuai | `01-http-header.spec.ts` | ✅ Lulus | 152 |
| 54 | TC-GB-06 HTTP dialihkan ke HTTPS dan www dinormalisasi | `01-http-header.spec.ts` | ❌ Gagal | 322 |
| 55 | TC-GB-07 Halaman administrasi tidak dapat diindeks mesin pencari | `01-http-header.spec.ts` | ❌ Gagal | 16069 |
| 56 | TC-GB-08 Tidak ada direktori API publik yang dapat diakses tanpa izin | `01-http-header.spec.ts` | ✅ Lulus | 164 |
| 57 | TC-GB-09 Respons HTML dikompresi saat klien mendukung | `01-http-header.spec.ts` | ✅ Lulus | 203 |
| 58 | TC-GB-10 Waktu respons server (TTFB) dalam batas | `01-http-header.spec.ts` | ✅ Lulus | 558 |
| 59 | TC-GB-11 robots.txt memuat aturan dasar dan menunjuk sitemap | `02-seo-sitemap.spec.ts` | ✅ Lulus | 163 |
| 60 | TC-GB-12 sitemap.xml valid, unik, dan seluruh URL dapat diakses | `02-seo-sitemap.spec.ts` | ✅ Lulus | 128 |
| 61 | TC-GB-13 Canonical sesuai URL dan hanya satu | `02-seo-sitemap.spec.ts` | ❌ Gagal | 1623 |
| 62 | TC-GB-14 Meta description unik dan panjangnya wajar | `02-seo-sitemap.spec.ts` | ✅ Lulus | 1966 |
| 63 | TC-GB-15 Open Graph lengkap dan gambar OG dapat diakses | `02-seo-sitemap.spec.ts` | ✅ Lulus | 1038 |
| 64 | TC-GB-16 Data terstruktur JSON-LD valid | `02-seo-sitemap.spec.ts` | ✅ Lulus | 552 |
| 65 | TC-GB-17 Judul halaman berbeda antar halaman (HTML dari server) | `02-seo-sitemap.spec.ts` | ❌ Gagal | 781 |
| 66 | TC-GB-18 Halaman 404 tidak diindeks dan mengembalikan status benar | `02-seo-sitemap.spec.ts` | ❌ Gagal | 15861 |
| 67 | TC-GB-19 Tidak ada mixed content pada halaman HTTPS | `03-keamanan-dasar.spec.ts` | ✅ Lulus | 3210 |
| 68 | TC-GB-20 Cookie yang dikirim memakai atribut Secure | `03-keamanan-dasar.spec.ts` | ✅ Lulus | 426 |
| 69 | TC-GB-21 Halaman admin tidak membocorkan sesi atau kredensial di HTML | `03-keamanan-dasar.spec.ts` | ✅ Lulus | 576 |
| 70 | TC-GB-22 Panel admin tidak dapat diakses tanpa autentikasi | `03-keamanan-dasar.spec.ts` | ✅ Lulus | 1112 |
| 71 | TC-GB-23 Tidak ada kebocoran stack trace pada respons error | `03-keamanan-dasar.spec.ts` | ✅ Lulus | 711 |
| 72 | TC-NF-01 LCP dan TTFB beranda dalam anggaran | `01-kinerja.spec.ts` | ✅ Lulus | 2034 |
| 73 | TC-NF-02 Berat halaman dan jumlah request dalam anggaran | `01-kinerja.spec.ts` | ✅ Lulus | 2427 |
| 74 | TC-NF-03 Halaman paket dan artikel termuat di bawah 5 detik | `01-kinerja.spec.ts` | ✅ Lulus | 1468 |
| 75 | TC-NF-04 Tidak ada overflow horizontal pada mobile (375px) | `02-responsif.spec.ts` | ✅ Lulus | 1322 |
| 76 | TC-NF-04 Tidak ada overflow horizontal pada tablet (768px) | `02-responsif.spec.ts` | ✅ Lulus | 1321 |
| 77 | TC-NF-04 Tidak ada overflow horizontal pada desktop (1280px) | `02-responsif.spec.ts` | ✅ Lulus | 1407 |
| 78 | TC-NF-04 Tidak ada overflow horizontal pada wide (1920px) | `02-responsif.spec.ts` | ✅ Lulus | 1614 |
| 79 | TC-NF-05 Tombol menu mobile memiliki target sentuh memadai | `02-responsif.spec.ts` | ✅ Lulus | 417 |
| 80 | TC-NF-06 Judul hero tetap terbaca pada layar mobile | `02-responsif.spec.ts` | ✅ Lulus | 393 |
| 81 | TC-NF-07 Tata letak tidak rusak saat zoom 200% (viewport 640px) | `02-responsif.spec.ts` | ✅ Lulus | 376 |
| 82 | TC-NF-08 Pemindaian axe beranda: tidak ada pelanggaran critical | `03-aksesibilitas.spec.ts` | ❌ Gagal | 4445 |
| 83 | TC-NF-08 Pemindaian axe products: tidak ada pelanggaran critical | `03-aksesibilitas.spec.ts` | ✅ Lulus | 1859 |
| 84 | TC-NF-08 Pemindaian axe daftar-agen: tidak ada pelanggaran critical | `03-aksesibilitas.spec.ts` | ✅ Lulus | 1210 |
| 85 | TC-NF-09 Skip link tersedia dan berfungsi | `03-aksesibilitas.spec.ts` | ✅ Lulus | 474 |
| 86 | TC-NF-10 Fokus keyboard terlihat pada elemen interaktif | `03-aksesibilitas.spec.ts` | ✅ Lulus | 469 |

## 5.3 Test case yang gagal (temuan)

| Test case | Pesan kegagalan (ringkas) |
|---|---|
| TC-BB-23 Halaman paket menampilkan kartu paket dengan harga | `Error: [2mexpect([22m[31mlocator[39m[2m).[22mtoBeVisible[2m([22m[2m)[22m failed` |
| TC-BB-27 Tidak ada tautan internal yang rusak pada halaman cakupan | `Error: tautan rusak: /paket-umroh -> 404, /kontak -> 404` |
| TC-WB-01 Setiap halaman memiliki tepat satu H1 | `Error: jumlah H1 tidak tepat: / = 2 H1` |
| TC-WB-02 Hierarki heading tidak melompati level | `Error: /artikel: h1 -> h3 ("Tim Kemenag Bertemu Pusat Edukasi Jemaah Kemenhaj, Bahas Evaluasi Layanan Informasi Haji 2")` |
| TC-WB-05 Semua kontrol formulir memiliki label yang terasosiasi | `Error: /: input[type=text] placeholder="TQW-2025-001234", input[type=text] placeholder="Contoh: TQW-2025-001234" \| /daftar-agen: input[type=text] placeholder="Masukkan nama lengkap Anda", input[type=email] placeholder="contoh@email.com", input[type=text] placeholder="08xxxxxxxxxx", input[type=text]` |
| TC-WB-06 Dokumen hanya memiliki satu elemen title | `Error: ditemukan lebih dari satu <title>` |
| TC-WB-07 Atribut lang dokumen terisi dengan kode bahasa valid | `Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m` |
| TC-GB-02 Header keamanan dasar tersedia | `Error: header tidak ada: X-Content-Type-Options, X-Frame-Options/CSP frame-ancestors, Referrer-Policy, Strict-Transport-Security, Content-Security-Policy` |
| TC-GB-03 Content-Type HTML menyertakan charset | `Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoMatch[2m([22m[32mexpected[39m[2m)[22m` |
| TC-GB-06 HTTP dialihkan ke HTTPS dan www dinormalisasi | `Error: HTTP tidak dialihkan ke HTTPS (status 200)` |
| TC-GB-07 Halaman administrasi tidak dapat diindeks mesin pencari | `Error: halaman login admin harus noindex` |
| TC-GB-13 Canonical sesuai URL dan hanya satu | `Error: /products harus punya 1 canonical` |
| TC-GB-17 Judul halaman berbeda antar halaman (HTML dari server) | `Error: judul SSR: Taqwa Travel Haji dan Umroh - Taqwa Group \| Taqwa Travel Haji dan Umroh - Taqwa Group \| Taqwa Travel Haji dan Umroh - Taqwa Group \| Taqwa Travel Haji dan Umroh - Taqwa Group \| Taqwa Travel Haji dan Umroh - Taqwa Group` |
| TC-GB-18 Halaman 404 tidak diindeks dan mengembalikan status benar | `Error: [2mexpect([22m[31mreceived[39m[2m).[22mtoContain[2m([22m[32mexpected[39m[2m) // indexOf[22m` |
| TC-NF-08 Pemindaian axe beranda: tidak ada pelanggaran critical | `Error: critical: button-name \| serious: color-contrast` |

## 5.4 Metrik non-fungsional terukur

```json
{
  "axe-beranda": {
    "violations": [
      {
        "id": "button-name",
        "impact": "critical",
        "help": "Buttons must have discernible text",
        "nodes": 2,
        "sample": [
          ".left-2",
          ".right-2"
        ]
      },
      {
        "id": "color-contrast",
        "impact": "serious",
        "help": "Elements must meet minimum color contrast ratio thresholds",
        "nodes": 1,
        "sample": [
          ".bg-green-600"
        ]
      },
      {
        "id": "meta-viewport",
        "impact": "moderate",
        "help": "Zooming and scaling must not be disabled",
        "nodes": 1,
        "sample": [
          "meta[name=\"viewport\"]"
        ]
      }
    ],
    "passes": 23,
    "incomplete": 2
  },
  "axe-daftar-agen": {
    "violations": [
      {
        "id": "meta-viewport",
        "impact": "moderate",
        "help": "Zooming and scaling must not be disabled",
        "nodes": 1,
        "sample": [
          "meta[name=\"viewport\"]"
        ]
      }
    ],
    "passes": 20,
    "incomplete": 1
  },
  "axe-products": {
    "violations": [
      {
        "id": "meta-viewport",
        "impact": "moderate",
        "help": "Zooming and scaling must not be disabled",
        "nodes": 1,
        "sample": [
          "meta[name=\"viewport\"]"
        ]
      }
    ],
    "passes": 20,
    "incomplete": 1
  },
  "berat-beranda": {
    "requests": 92,
    "transferKB": 376,
    "images": 18,
    "scripts": 58
  },
  "css-size": {
    "files": 3,
    "totalBytes": 10983
  },
  "js-coverage": {
    "filesTotal": 96,
    "filesOwn": 58,
    "ownTotalBytes": 484205,
    "ownTotalFunctions": 1937,
    "ownFunctionsCalled": 1340,
    "ownFunctionCoveragePercent": 69.18,
    "top": [
      {
        "url": "/_app/immutable/chunks/D8J_gqhc.js",
        "bytes": 102097,
        "functions": 381,
        "functionsCalled": 311,
        "functionCoveragePercent": 81.6,
        "byteRangesExecuted": 102097
      },
      {
        "url": "/_app/immutable/chunks/C1ahHjKc.js",
        "bytes": 63458,
        "functions": 153,
        "functionsCalled": 102,
        "functionCoveragePercent": 66.7,
        "byteRangesExecuted": 63458
      },
      {
        "url": "/_app/immutable/nodes/29.pWaZJUBi.js",
        "bytes": 57116,
        "functions": 177,
        "functionsCalled": 107,
        "functionCoveragePercent": 60.5,
        "byteRangesExecuted": 57116
      },
      {
        "url": "/_app/immutable/chunks/Bfpp4jOx.js",
        "bytes": 42793,
        "functions": 320,
        "functionsCalled": 206,
        "functionCoveragePercent": 64.4,
        "byteRangesExecuted": 42793
      },
      {
        "url": "/_app/immutable/chunks/BBF0KuLD.js",
        "bytes": 35252,
        "functions": 208,
        "functionsCalled": 122,
        "functionCoveragePercent": 58.7,
        "byteRangesExecuted": 35252
      },
      {
        "url": "/_app/immutable/chunks/Nhiy5h4_.js",
        "bytes": 27064,
        "functions": 121,
        "functionsCalled": 99,
        "functionCoveragePercent": 81.8,
        "byteRangesExecuted": 27064
      },
      {
        "url": "/_app/immutable/chunks/xf0BWGTx.js",
        "bytes": 20222,
        "functions": 11,
        "functionsCalled": 1,
        "functionCoveragePercent": 9.1,
        "byteRangesExecuted": 20222
      },
      {
        "url": "/_app/immutable/entry/app.q4i9VFzz.js",
        "bytes": 16133,
        "functions": 107,
        "functionsCalled": 59,
        "functionCoveragePercent": 55.1,
        "byteRangesExecuted": 16133
      },
      {
        "url": "/_app/immutable/chunks/pxYGkfdS.js",
        "bytes": 11170,
        "functions": 32,
        "functionsCalled": 1,
        "functionCoveragePercent": 3.1,
        "byteRangesExecuted": 11170
      },
      {
        "url": "/_app/immutable/nodes/4.HoKuXkHR.js",
        "bytes": 11118,
        "functions": 45,
        "functionsCalled": 45,
        "functionCoveragePercent": 100,
        "byteRangesExecuted": 11118
      },
      {
        "url": "/_app/immutable/chunks/BenH0A9o.js",
        "bytes": 7736,
        "functions": 45,
        "functionsCalled": 23,
        "functionCoveragePercent": 51.1,
        "byteRangesExecuted": 7736
      },
      {
        "url": "/_app/immutable/chunks/D4pkWFp2.js",
        "bytes": 7170,
        "functions": 40,
        "functionsCalled": 28,
        "functionCoveragePercent": 70,
        "byteRangesExecuted": 7170
      },
      {
        "url": "/_app/immutable/chunks/DCx-N-Pj.js",
        "bytes": 7084,
        "functions": 39,
        "functionsCalled": 30,
        "functionCoveragePercent": 76.9,
        "byteRangesExecuted": 7084
      },
      {
        "url": "/_app/immutable/chunks/ByCN0Pm2.js",
        "bytes": 6163,
        "functions": 3,
        "functionsCalled": 1,
        "functionCoveragePercent": 33.3,
        "byteRangesExecuted": 6163
      },
      {
        "url": "/_app/immutable/nodes/1.B-OY6ncp.js",
        "bytes": 4271,
        "functions": 3,
        "functionsCalled": 1,
        "functionCoveragePercent": 33.3,
        "byteRangesExecuted": 4271
      }
    ]
  },
  "kinerja-beranda": {
    "lcp": 348,
    "ttfb": 150,
    "dcl": 266,
    "load": 307
  },
  "overflow-1280": {
    "scrollWidth": 1280,
    "innerWidth": 1280,
    "offenders": [
      "div.flex",
      "div.flex-shrink-0",
      "div.rounded-xl",
      "div.relative",
      "img.w-full"
    ]
  },
  "overflow-1920": {
    "scrollWidth": 1920,
    "innerWidth": 1920,
    "offenders": []
  },
  "overflow-375": {
    "scrollWidth": 375,
    "innerWidth": 375,
    "offenders": [
      "div.flex",
      "div.flex-shrink-0",
      "div.rounded-xl",
      "div.relative",
      "img.w-full"
    ]
  },
  "overflow-768": {
    "scrollWidth": 768,
    "innerWidth": 768,
    "offenders": [
      "div.flex",
      "div.flex-shrink-0",
      "div.rounded-xl",
      "div.relative",
      "img.w-full"
    ]
  }
}
```
