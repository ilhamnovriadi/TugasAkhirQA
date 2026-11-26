# 03 - Desain Tes, Teknik, dan Matriks Keterlacakan

Fase **“menyusun spesifikasi evaluasi”** (ISO/IEC 25040:2024 §7.3) dan **“merancang evaluasi”**
(§7.4). Teknik desain mengikuti taksonomi ISO/IEC/IEEE 29119-1:2022; struktur otomasi mengikuti
ISO/IEC/IEEE 29119-5:2024 (keyword-driven).

## 3.1 Teknik desain yang dipakai

| Teknik (29119-1:2022) | Diterapkan pada | Contoh |
|---|---|---|
| **Equivalence partitioning** | Input kode reservasi, email, pencarian | Kode valid / format salah / kosong; email valid vs `bukan-email` |
| **Boundary value analysis** | Panjang meta description (50-170), ukuran viewport (375/768/1280/1920) | TC-GB-14, TC-NF-04 |
| **Decision table** | Validasi formulir agen, cek reservasi | Kombinasi field kosong × tombol submit × pesan validasi |
| **Use case / scenario testing** | Alur pengguna beranda → paket → detail → CTA | TC-BB-05, 23, 24, 26 |
| **State transition** | Menu mobile (tertutup/terbuka), dropdown kategori, slider | TC-BB-10, 14, 15 |
| **Structural / code coverage (white box)** | Bundel `_app/immutable`, DOM | TC-WB-10, WB-01…WB-09 |
| **Error guessing & exploratory** | Header keamanan, noindex admin, mixed content | TC-GB-02, 07, 19, 22 |

## 3.2 Modul dan cakupan

| Modul | Halaman | Test case fungsional | Kategori manual |
|---|---|---|---|
| Beranda & hero | `/` | TC-BB-01…08, 14, 15, 16 | MT-BB-01, MT-BB-03 |
| Navigasi & footer | semua | TC-BB-09…13, 27 | MT-BB-02, MT-BB-05 |
| Paket perjalanan | `/products`, `/product/*` | TC-BB-17, 23, 24, 25 | MT-BB-03, MT-BB-07 |
| Cek reservasi | `/` (kartu reservasi) | TC-BB-20…22 | MT-BB-04 |
| Artikel | `/artikel`, `/artikel/*` | TC-BB-18, 26 | - |
| Galeri & testimoni | `/galeri`, `/testimonials` | TC-BB-32…34 | - |
| Pendaftaran agen | `/daftar-agen` | TC-BB-28…31 | MT-BB-06 |
| Agen resmi & profil | `/agen-resmi`, `/profil` | TC-BB-19, 35 | - |
| Markup & kode klien | semua | TC-WB-01…13 | MT-WB-01, MT-WB-02 |
| Konfigurasi server | - | TC-GB-01…23 | MT-GB-01, MT-GB-02 |
| Non-fungsional | - | TC-NF-01…10 | MT-NF-01, MT-NF-02 |

## 3.3 Desain test case - black box (fungsional)

| ID | Tujuan | Data uji | Hasil yang diharapkan | Prio |
|---|---|---|---|---|
| TC-BB-01 | Beranda dapat dimuat | - | HTTP 200, `<title>` memuat “Taqwa Travel”, H1 “Haji & Umroh Terpercaya” | P1 |
| TC-BB-02 | CTA hero tersedia | - | Tombol “Lihat Paket” & “Konsultasi Gratis” terlihat | P1 |
| TC-BB-03 | Nilai jual tampil | - | 6 kartu keunggulan terlihat | P2 |
| TC-BB-04 | Slider paket berfungsi | - | ≥ 2 kartu “Lihat Detail” + harga tampil | P1 |
| TC-BB-05 | CTA “Lihat Semua Paket” | - | Navigasi ke `/products`, H1 “Paket Perjalanan” | P1 |
| TC-BB-06 | Seksi konten beranda | - | Heading galeri, testimoni, artikel terlihat | P2 |
| TC-BB-07 | Footer informasi | - | Email, Privacy Policy, Terms of Service tampil | P2 |
| TC-BB-08 | Stabilitas runtime | - | Tidak ada error JavaScript saat muat | P1 |
| TC-BB-09 | Header & navigasi | - | Logo + ≥ 4 tautan navigasi, tautan “Profil” | P1 |
| TC-BB-10 | Menu mobile | viewport 390×844 | Menu terbuka, tautan Beranda/Profil/Artikel terlihat | P1 |
| TC-BB-11 | Tautan legal | - | Privacy → `/privacy`, Terms → `/terms` | P2 |
| TC-BB-12 | Ketersediaan halaman | 10 path | Semua 200 dan memiliki H1 | P1 |
| TC-BB-13 | Halaman 404 | `/halaman-tidak-ada-qa-2026` | Status 404 + pesan “tidak ditemukan” | P1 |
| TC-BB-14 | Dropdown kategori | klik trigger | Listbox muncul, pilihan “Umroh” mengubah nilai | P1 |
| TC-BB-15 | Dropdown bulan | klik trigger | ≥ 2 opsi bulan, nilai terpilih berubah | P2 |
| TC-BB-16 | Tombol “Cari Paket” | - | Navigasi ke `/products` | P1 |
| TC-BB-17 | Filter paket | `thaif` | Hasil menyempit, memuat “Thaif” | P1 |
| TC-BB-18 | Pencarian artikel | `haji` | Hasil menyempit, judul memuat “haji” | P2 |
| TC-BB-19 | Pencarian agen | `palembang` | Daftar dapat difilter tanpa error | P3 |
| TC-BB-20 | Cek reservasi kosong | `''` | Tidak ada permintaan, pesan validasi muncul | P1 |
| TC-BB-21 | Cek reservasi salah | `TQW-9999-999999` | Umpan balik “tidak ditemukan/gagal”, bukan error server | P1 |
| TC-BB-22 | Input kode reservasi | `TQW-2025-001234` | Nilai tersimpan di field | P2 |
| TC-BB-23 | Daftar paket | - | ≥ 3 kartu, harga tampil, “5 Paket Ditemukan” | P1 |
| TC-BB-24 | Buka detail paket | klik kartu | URL `/product/*`, H1, harga, CTA pesan | P1 |
| TC-BB-25 | Isi detail paket | slug tetap | Deskripsi/fasilitas/itinerary > 1000 karakter | P2 |
| TC-BB-26 | Detail artikel | klik kartu | URL `/artikel/*`, isi naratif > 1200 karakter | P2 |
| TC-BB-27 | Audit tautan internal | semua href internal | 0 tautan 4xx/5xx | P1 |
| TC-BB-28 | Formulir agen tampil | - | ≥ 4 field + tombol daftar | P3 |
| TC-BB-29 | Submit kosong | semua field kosong | Tetap di halaman, validasi tampil | P1 |
| TC-BB-30 | Email tidak valid | `bukan-email` | `checkValidity()` = false | P2 |
| TC-BB-31 | Tipe input email | - | `type="email"` | P3 |
| TC-BB-32 | Galeri termuat | - | Semua `img` termuat (`naturalWidth > 0`) | P2 |
| TC-BB-33 | Kartu testimoni | - | Teks testimoni + nama jamaah tampil | P2 |
| TC-BB-34 | Testimoni beranda | - | Nama jamaah tampil setelah seksi di-scroll | P3 |
| TC-BB-35 | Halaman profil | - | Memuat “PT Taqwa Cahaya Semesta”, > 1500 karakter | P3 |

## 3.4 Desain test case - white box (struktural)

| ID | Aturan struktural | Dasar |
|---|---|---|
| TC-WB-01 | Tepat satu `<h1>` per halaman | Satu judul utama per dokumen (WCAG 1.3.1, maintainability) |
| TC-WB-02 | Heading tidak melompati level (h1→h3) | Struktur informasi |
| TC-WB-03 | Tidak ada `id` duplikat | Validitas DOM & perilaku `label[for]` |
| TC-WB-04 | Setiap `<img>` punya `alt` | Aksesibilitas 1.1.1 |
| TC-WB-05 | Setiap kontrol punya label/aria | Aksesibilitas 1.3.1, 4.1.2 |
| TC-WB-06 | Hanya satu `<title>` | Metadata dokumen |
| TC-WB-07 | `lang="id"` | Bahasa halaman (3.1.1) |
| TC-WB-08 | Node DOM < 2500 | Anggaran performa render |
| TC-WB-09 | Tidak ada aset 4xx/5xx | Integritas bundel |
| TC-WB-10 | Cakupan eksekusi JS terukur; bundel sendiri < 1,5 MB | Code coverage (white box) |
| TC-WB-11 | Total CSS < 600 KB | Anggaran sumber daya |
| TC-WB-12 | Tidak ada error konsol JavaScript | Stabilitas klien |
| TC-WB-13 | Hidrasi SvelteKit berjalan | Keterujian komponen |

## 3.5 Desain test case - grey box (HTTP/konfigurasi)

| ID | Pemeriksaan | Ambang |
|---|---|---|
| TC-GB-01 | Semua halaman cakupan 200 | 100% |
| TC-GB-02 | Header keamanan (nosniff, frame-ancestors, referrer, HSTS, CSP) | Semua ada |
| TC-GB-03 | `Content-Type` HTML + charset | `text/html; charset=utf-8` |
| TC-GB-04 | Ukuran HTML beranda | < 200 KB |
| TC-GB-05 | Cache-Control aset statis | memuat `max-age` |
| TC-GB-06 | HTTP→HTTPS dan `www` | 301/308 ke HTTPS; www terjangkau |
| TC-GB-07 | `/dashboard` tidak diindeks | `noindex` |
| TC-GB-08 | `/api/` tidak terbuka | 401/403/404/405 |
| TC-GB-09 | Kompresi HTML | gzip/br/zstd |
| TC-GB-10 | TTFB rata-rata 3 sampel | < 1200 ms |
| TC-GB-11 | robots.txt + direktif sitemap | ada |
| TC-GB-12 | sitemap.xml valid & unik | > 5 URL, tanpa duplikat |
| TC-GB-13 | Canonical tunggal & sesuai URL | 1 per halaman |
| TC-GB-14 | Meta description unik 50-170 karakter | 100% |
| TC-GB-15 | Open Graph lengkap + gambar OG 200 | 100% |
| TC-GB-16 | JSON-LD valid schema.org | 100% |
| TC-GB-17 | `<title>` unik antar halaman | 100% |
| TC-GB-18 | 404 berstatus 404 + noindex | ya |
| TC-GB-19 | Tanpa mixed content | 0 |
| TC-GB-20 | Cookie `Secure` | 100% |
| TC-GB-21 | Tidak ada kredensial di HTML admin | 0 |
| TC-GB-22 | Panel admin butuh autentikasi | ya |
| TC-GB-23 | Tanpa stack trace / nama vendor internal | 0 |

## 3.6 Desain test case - non-fungsional

| ID | Metrik | Ambang |
|---|---|---|
| TC-NF-01 | TTFB, LCP, DCL beranda | < 1500 / 4000 / 4000 ms |
| TC-NF-02 | Jumlah request & berat transfer | < 150 / < 6000 KB |
| TC-NF-03 | Waktu muat `/products`, `/artikel` | < 5000 ms |
| TC-NF-04 | Overflow horizontal @375/768/1280/1920 | 0 px |
| TC-NF-05 | Target sentuh tombol menu mobile | ≥ 40×40 px |
| TC-NF-06 | Ukuran font H1 mobile | ≥ 24 px |
| TC-NF-07 | Layout pada zoom 200% (640 px) | tanpa overflow |
| TC-NF-08 | Pelanggaran axe (WCAG 2.0/2.1 A-AA) | 0 critical & 0 serious |
| TC-NF-09 | Skip link berfungsi | ya |
| TC-NF-10 | Indikator fokus keyboard terlihat | ya |

## 3.7 Desain test case manual

| ID | Kategori | Skenario | Bukti |
|---|---|---|---|
| MT-BB-01 | Black box | Muat beranda desktop 1280×800, verifikasi hero, CTA, nilai jual, slider | `qa-evidence/MT-BB-01/` |
| MT-BB-02 | Black box | Buka menu mobile 390×844 | `qa-evidence/MT-BB-02/` |
| MT-BB-03 | Black box | Buka dropdown kategori lalu cari paket | `qa-evidence/MT-BB-03/` |
| MT-BB-04 | Black box | Cek reservasi dengan kode `TQW-9999-999999` | `qa-evidence/MT-BB-04/` |
| MT-BB-05 | Black box | Akses URL tidak dikenal | `qa-evidence/MT-BB-05/` |
| MT-BB-06 | Black box | Submit formulir agen kosong | `qa-evidence/MT-BB-06/` |
| MT-BB-07 | Black box | Buka `/products`, hitung kartu paket dan kemunculan teks harga | `qa-evidence/MT-BB-07/`, `qa-evidence/measurements.json` |
| MT-WB-01 | White box | Inspeksi `head`: jumlah `<title>`, `<h1>`, `lang`, canonical | `reports/results.json` (TC-WB-01/06/07), `qa-evidence/measurements.json` |
| MT-WB-02 | White box | Inspeksi label, `alt`, dan `role` kontrol formulir | `reports/results.json` (TC-WB-05), `reports/metrics/axe-beranda.json` |
| MT-GB-01 | Grey box | Inspeksi header HTTP, robots.txt, sitemap.xml | `reports/results.json` (TC-GB-02/03/06) |
| MT-GB-02 | Grey box | Akses `/dashboard` tanpa login | `qa-evidence/MT-GB-02/` |
| MT-NF-01 | Non-fungsional | Layout 375 px & 1280 px | `reports/metrics/overflow-*.json` |
| MT-NF-02 | Non-fungsional | Ukur TTFB/LCP lewat Performance API | `reports/metrics/kinerja-beranda.json` |

## 3.8 Matriks keterlacakan (ISO/IEC 25010:2023 → test case)

| Karakteristik | Test case | Hasil (ringkas) |
|---|---|---|
| Functional suitability | TC-BB-01…35 | 33/35 lulus (lihat dok. 05) |
| Performance efficiency | TC-NF-01…03, TC-WB-08, 10, 11 | Lulus dengan catatan berat JS |
| Compatibility | TC-GB-19, TC-BB-32 | Lulus |
| Interaction capability | TC-NF-08…10, TC-WB-04, 05 | **Gagal** - axe critical/serious & label |
| Reliability | TC-BB-08, TC-GB-23, TC-WB-09, 12 | Lulus |
| Security | TC-GB-02, 06, 07, 20, 21, 22 | **Gagal** - header & HTTPS |
| Maintainability | TC-WB-01, 02, 03, 06, 07 | **Gagal** - H1 ganda, `lang`, `<title>` ganda |
| Flexibility | TC-NF-04…07 | Lulus |
| Safety | TC-BB-20, 21, 29 | Lulus |
| Quality-in-use (25019) | MT-BB-01…06 | Lulus dengan temuan UX |
