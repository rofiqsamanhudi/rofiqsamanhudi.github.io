# Rofiq Samanhudi | Data Analyst & Operations Automation Portfolio

Portofolio pribadi **Rofiq Samanhudi** (Data Analyst & Operations Automation, S1 Informatika Peminatan Data Science Universitas Muhammadiyah Malang, IPK `3.82 / 4.00`).

Repositori ini menyajikan profil profesional, Curriculum Vitae resmi, serta **10 sistem nyata** yang dirancang dan dikembangkan pada **PT. Kilap Global Group (KGG)** dan **PT Kilapkan Seluruh Bangsa (KSB)** (terdiri dari **5 Aplikasi Web Interaktif berbasis Next.js** dan **5 Sistem Otomasi & Pipeline ETL berbasis Python**). Seluruh data transaksi, harga, dan identitas perpajakan di dalam repositori ini menggunakan **100% data simulasi (dummy)** tanpa kunci API internal.

---

## Profil & Kontak Resmi

- **Nama Lengkap**: Rofiq Samanhudi
- **Domisili**: Malang, Jawa Timur
- **WhatsApp**: [+62 823-4236-4044](https://wa.me/6282342364044)
- **Email**: [rofiqsamanhudizz@gmail.com](mailto:rofiqsamanhudizz@gmail.com)
- **LinkedIn**: [linkedin.com/in/rofiqsamanhudi](https://www.linkedin.com/in/rofiqsamanhudi/)
- **GitHub**: [github.com/rofiqsamanhudi](https://github.com/rofiqsamanhudi)
- **Instagram**: [instagram.com/rofiqsamanhudi_](https://www.instagram.com/rofiqsamanhudi_/)
- **Curriculum Vitae (PDF)**: `/profile/CV-Rofiq-Samanhudi-Data-Analyst.pdf`

---

## 1. Lima Aplikasi Web Interaktif (Next.js Live Demo)

1. **KSB & KGG Executive Financial Control** (`/dashboard-finance` | folder: `portfolio-dashboard-finance`)
   - Konsolidasi anggaran vs realisasi kas tahun 2024, 2025, dan 2026 lintas entitas (PT Kilapkan Seluruh Bangsa & PT Kilap Global Group).
2. **HR & Talent Acquisition Portal** (`/dashboard-hr` | folder: `portfolio-dashboard-hr`)
   - Manajemen pipeline rekrutmen 6 tahap, papan Kanban, dan ekstraksi CV PDF/DOCX dengan opsi input Gemini API Key milik pengguna sendiri.
3. **KSB CostMatrix & HPP Tracker** (`/costmatrix` | folder: `portfolio-costmatrix`)
   - Kalkulator Harga Pokok Penjualan (HPP) produk jadi, bundling, paket hemat, resep cairan (Batch 5.000 mL), master bahan baku PO 2026 & fallback 2025, serta simulasi R&D produk baru.
4. **CoreTax Enterprise XML & CSV Converter** (`/coretax-converter` | folder: `portfolio-coretax-converter`)
   - Konversi faktur penjualan Excel ke format XML CoreTax DJP v1.6.1 dan CSV dengan penguncian Master Lock NPWP 16 digit & NITKU 22 digit serta saklar Include/Exclude Pajak.
5. **Kopaskap Clipper Affiliate Analyzer** (`/kopaskap-converter` | folder: `portfolio-kopaskap-converter`)
   - Ekstraksi screenshot analitik video TikTok & Instagram kreator afiliasi dengan struktur 6 tier komisi, koreksi views langsung di tabel, generator laporan WhatsApp, dan panduan SOP Screenshot.

---

## 2. Lima Sistem Otomasi & Pipeline Data Engineering (Python / ETL)

1. **Forecast FG & Multi-Level BOM Breakdown** (`/systems/forecast-fg`)
   - Perencanaan produksi Finished Goods 3 bulan ke depan menggunakan *Weighted Moving Average* (`0.2, 0.3, 0.5`), faktor baseline pabrik (`115%`), kombinasi `60% Baseline + 40% DSO`, pembulatan presisi `ROUND_HALF_UP`, serta pemecahan komponen kemasan dan literasi cairan otomatis dari Google Sheets.
2. **Otomasi Kardus Packing & Rekapitulasi FG Logistik** (`/systems/laporan-kardus-fg`)
   - Paket Python modular (`data_loader`, `preprocessor`, `kardus_engine`, `fg_engine`, `exporter`) untuk melakukan *unmerge* pesanan marketplace, menentukan jenis kardus packing pesanan tunggal maupun kombinasi multi-item, serta menghitung omzet FG satuan vs bundling.
3. **Rekonsiliasi Stok Rak Fisik vs Master Spreadsheet** (`/systems/rekonsiliasi-stok-rak`)
   - Sistem stok opname yang menormalisasi penulisan kode batch kadaluarsa, mengisolasi hanya alamat rak yang sedang diaudit pada hari terkait, dan menghasilkan jurnal mutasi berpasangan (`+Delta` dan `-Delta`) dalam format 11 kolom standar KGG.
4. **Sistem Penyesuaian Kuantitas Bahan Baku (Penyesuaian BB)** (`/systems/penyesuaian-bb`)
   - Orkestrator CLI & Notebook yang memisahkan laporan mentah kuantitas barang bulanan menjadi 4 berkas *Item Adjustment* (Gudang BB Basah, Gudang BB Kering, Gudang Produksi Basah, dan Gudang Produksi Kering) lengkap dengan aturan pengisian satuan cair vs pengosongan unit barang kering.
5. **Pipeline ETL Laporan Mingguan 7 Channel (`AppendReport_Weekly`)** (`/systems/append-report-weekly`)
   - Konsolidasi mingguan 5 berkas ekspor mentah dari 7 toko resmi marketplace (*Lazada, Shopee KP, Shopee PP, TikTok KP, TikTok PP, Tokopedia KP, Tokopedia PP*) dengan parser `openpyxl` (`read_only=False`) yang kebal terhadap kerusakan metadata XML `<dimension ref="A1"/>` pada ekspor TikTok, ditambah standardisasi otomatis `sku_v3` dan provinsi Indonesia via Google Sheets.

---

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` di browser Anda.
