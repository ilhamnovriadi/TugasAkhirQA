# 09 - Wawancara Praktisi QA: Azhar Antasena Khadafi (rencana)

Dokumen ini menyiapkan wawancara dengan praktisi QA untuk melengkapi pengujian teknis pada
[docs/04](04-hasil-manual.md), [docs/05](05-hasil-otomasi.md), dan [docs/07](07-daftar-insiden.md):
bagaimana pengujian dijalankan di industri, seberapa menjanjikan karier di bidang *testing*, dan
kendala nyata di lapangan. Wawancara disusun semi-terstruktur dengan empat pertanyaan dan dijadwalkan
pada minggu 8 ([docs/08 §8.1](08-timeline-dan-pembagian-tugas.md#81-timeline-mingguan)).

| Item | Keterangan |
|---|---|
| Narasumber | **Azhar Antasena Khadafi** |
| Posisi saat ini | QA Engineer di **IDEKU** (Oktober 2024 - sekarang), Jakarta Barat |
| Pengalaman | ± 5 tahun: Tokopedia (2021-2023), PHINCON (2023-2024), IDEKU (2024-sekarang) |
| Domisili | Serpong, Banten, Indonesia |
| Pendidikan | S1 Informatika, Universitas Pamulang (2016-2020) |
| Profil publik | [linkedin.com/in/azhar-a-a6ba5b1b7](https://www.linkedin.com/in/azhar-a-a6ba5b1b7/) |
| Metode | Wawancara semi-terstruktur, 4 pertanyaan, Bahasa Indonesia |
| Status | **Belum dilaksanakan** - jawaban pada §9.1-§9.6 masih kosong |
| Sumber data profil | Profil LinkedIn publik narasumber, diakses November 2026 |

> **Status dokumen: BELUM TERLAKSANA.** Wawancara dengan narasumber belum dilakukan. Satu-satunya
> data yang berasal dari narasumber adalah **data profil** pada §9.1, yang diambil dari profil LinkedIn
> publiknya. Seluruh bagian "Jawaban narasumber" sengaja dikosongkan. Jangan mengutip dokumen ini
> sebagai pernyataan Azhar, dan jangan menarik kesimpulan wawancara, sebelum wawancara benar-benar
> dilakukan dan jawabannya ditulis pada tempat yang disediakan.

## 9.1 Pertanyaan 1 - Profil tester yang diwawancarai

**Data profil (sumber: LinkedIn, bukan hasil wawancara):**

| Periode | Perusahaan | Peran | Fokus utama |
|---|---|---|---|
| Agu 2021 - Jul 2023 | PT Tokopedia | Manual Quality Assurance Tester | *Test case* manual, regression/smoke/sanity, bug reporting, web & mobile |
| Jul 2023 - Jul 2024 | PHINCON | Software Quality Assurance | *Test plan*/skenario, SIT-UAT-FUT, memimpin tim QA, Scrum |
| Okt 2024 - sekarang | IDEKU | QA Engineer | Kualitas produk menyeluruh, kolaborasi dengan developer & produk |

**Pertanyaan yang diajukan:**

1. Bisa diceritakan latar belakang pendidikan dan perjalanan karier Anda sampai menjadi QA Engineer?
2. Apa perbedaan tugas paling terasa antara menjadi *manual tester* di Tokopedia, memimpin tim QA di
   PHINCON, dan menjadi QA Engineer di IDEKU?
3. Perangkat, teknik, dan ritme kerja apa yang paling sering Anda pakai sehari-hari (Jira, Scrum,
   SIT/UAT/FUT, otomasi)?

**Jawaban narasumber:**

> _(diisi saat wawancara - belum ada jawaban)_

## 9.2 Pertanyaan 2 - Kondisi pengujian di lapangan saat ini

**Pertanyaan yang diajukan:**

1. Bagaimana kondisi *testing* di lapangan saat ini, khususnya di perusahaan tempat Anda bekerja?
2. Apakah pengujian manual masih dibutuhkan ketika otomasi sudah berjalan? Bagian mana yang tetap
   manual dan bagian mana yang diserahkan ke otomasi?
3. Siapa yang menentukan keputusan rilis (*go/no-go*), dan sejauh mana QA ikut menentukan?

**Kisi-kisi yang ingin digali (catatan pewawancara, bukan pernyataan narasumber):**

- Pergeseran QA ke kiri: keterlibatan pada *requirement review* dan penyusunan *acceptance criteria*.
- Pembagian kerja manual vs otomasi: regresi berulang dan *smoke test* di pipeline vs eksplorasi dan
  penilaian yang butuh konteks bisnis.
- Peran QA dalam keputusan rilis dan kriteria keluar.

**Jawaban narasumber:**

> _(diisi saat wawancara - belum ada jawaban)_

## 9.3 Pertanyaan 3 - Apakah masih menjanjikan berkarir sebagai tester?

**Pertanyaan yang diajukan:**

1. Menurut Anda, apakah masih menjanjikan berkarir sebagai seorang tester?
2. Bagaimana jenjang karier QA yang Anda lihat di lapangan (QA Engineer, Senior/Lead, SDET,
   QA Architect, atau jalur menyamping ke *business analyst*/*product owner*)?
3. Saran konkret apa yang Anda berikan untuk mahasiswa yang ingin masuk ke bidang QA?

**Kisi-kisi yang ingin digali (catatan pewawancara, bukan pernyataan narasumber):**

- Perubahan permintaan pasar: *manual tester* murni vs peran yang menuntut otomasi, API, kinerja, dan
  dasar keamanan.
- Pengaruh alat bantu berbasis AI terhadap pekerjaan tester.
- Nilai portofolio artefak (test plan, test case, bukti eksekusi, daftar cacat) dibanding sertifikat.

**Jawaban narasumber:**

> _(diisi saat wawancara - belum ada jawaban)_

## 9.4 Pertanyaan 4 - Kendala yang dialami di lapangan

**Pertanyaan yang diajukan:**

1. Ketika di lapangan, seperti apa kendala yang Anda alami?
2. Kendala mana yang paling sering muncul, dan bagaimana Anda menyiasatinya?
3. Bagaimana Anda bersikap ketika akses ke sistem (panel admin, integrasi pihak ketiga) tidak
   diberikan, atau ketika ada tekanan untuk meloloskan rilis?

**Kendala yang akan dikonfirmasi (kolom terakhir diisi setelah wawancara):**

| # | Kendala yang ditanyakan | Relevansi untuk tugas akhir | Dialami narasumber? |
|---|---|---|---|
| 1 | *Requirement* ambigu atau berubah di tengah sprint | Menentukan keandalan *test case* manual dan otomatis | _(kosong)_ |
| 2 | Waktu pengujian dipadatkan di akhir sprint | Alasan regresi perlu diotomasi | _(kosong)_ |
| 3 | Lingkungan dan data uji tidak representatif | Konteks pengujian pada situs produksi *read-only* | _(kosong)_ |
| 4 | Akses terbatas ke sistem pihak ketiga | Panel admin tidak dapat diuji ([docs/07 §7.2](07-daftar-insiden.md#72-insiden-yang-tidak-dapat-diuji-blocked)) | _(kosong)_ |
| 5 | Otomasi rapuh (*flaky*) | Perbedaan cacat produk vs kesalahan skrip ([docs/07](07-daftar-insiden.md)) | _(kosong)_ |
| 6 | Tekanan untuk meloloskan rilis | Penanganan 15 kegagalan yang dipertahankan sebagai defect | _(kosong)_ |
| 7 | Dokumentasi tidak dipelihara | Pemeliharaan matriks keterlacakan [docs/03](03-test-design.md) | _(kosong)_ |

**Jawaban narasumber:**

> _(diisi saat wawancara - belum ada jawaban)_

## 9.5 Kaitan dengan temuan tugas akhir

Bagian ini menghubungkan jawaban narasumber dengan temuan pada [docs/07](07-daftar-insiden.md).
Kolom "Jawaban narasumber" masih kosong; kolom bukti berisi fakta yang sudah diverifikasi di
repositori ini.

| Bukti pada repositori ini | Pertanyaan lanjutan untuk narasumber | Jawaban narasumber |
|---|---|---|
| Harga tidak tampil pada daftar paket (INC-13) hanya tertangkap lewat pemeriksaan manual bertarget, bukan oleh 86 test otomatis ([docs/05](05-hasil-otomasi.md)) | Bagian mana dari pengujian yang menurut Anda tidak bisa digantikan skrip? | _(kosong)_ |
| Tautan `/paket-umroh` dan `/kontak` 404 (INC-14) serta `href="#"` di footer (INC-16) berdampak langsung pada calon pelanggan | Seberapa jauh QA perlu menilai dampak bisnis, bukan hanya kesesuaian teknis? | _(kosong)_ |
| Header keamanan tidak lengkap (INC-07) dan HTTP tanpa pengalihan HTTPS (INC-08) ditemukan lewat *grey box* | Sejauh mana dasar keamanan menjadi bagian pekerjaan QA di tempat Anda? | _(kosong)_ |
| Panel admin setelah login dicatat *blocked* ([docs/07 §7.2](07-daftar-insiden.md#72-insiden-yang-tidak-dapat-diuji-blocked)) | Bagaimana Anda menangani sistem yang tidak boleh atau tidak dapat diakses? | _(kosong)_ |
| 86 test otomatis selesai 163,7 detik, sementara 13 skenario manual menangani hal yang tidak bisa dinilai skrip ([docs/04](04-hasil-manual.md)) | Bagaimana Anda membagi waktu antara menulis otomasi dan menguji manual? | _(kosong)_ |

## 9.6 Kesimpulan wawancara

Belum dapat disimpulkan. Bagian ini diisi setelah wawancara, dengan poin-poin berikut:

1. Kondisi pengujian di lapangan menurut narasumber - _(kosong)_
2. Pembagian peran manual dan otomasi menurut narasumber - _(kosong)_
3. Penilaian narasumber atas prospek karier QA - _(kosong)_
4. Kendala lapangan yang dikonfirmasi narasumber - _(kosong)_

## 9.7 Catatan penyusunan dan etika

- **Wawancara belum dilakukan.** Data profil (§9.1) bersumber dari profil LinkedIn publik narasumber
  dan tidak diubah; seluruh jawaban masih kosong dan tidak boleh diisi atas nama narasumber.
- Setelah wawancara, isi setiap blok "Jawaban narasumber" dengan catatan/transkrip, lalu minta
  narasumber menyetujui kutipan yang akan dipakai. Simpan rekaman atau tangkapan layar pertemuan
  sebagai lampiran bila wawancara berlangsung daring.
- Perbarui baris **Status** pada tabel §9.1 menjadi "Sudah dilaksanakan" beserta tanggal wawancara.
- Kutipan yang dipakai di [docs/06](06-laporan-evaluasi.md) harus merujuk nomor bagian pada dokumen ini
  agar dapat ditelusuri.
