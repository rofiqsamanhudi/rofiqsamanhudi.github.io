// Data dokumentasi teknis untuk 5 Sistem Otomasi Python & Data Engineering
// yang dibangun oleh Rofiq Samanhudi di PT. Kilap Global Group (KGG) & PT Kilapkan Seluruh Bangsa (KSB).
// Seluruh data angka dan ID spreadsheet pada pratinjau ini adalah 100% simulasi (dummy).

export const PYTHON_SYSTEMS = [
  {
    id: 'forecast-fg',
    number: '01',
    title: 'Forecast FG & Multi-Level BOM Breakdown',
    subtitle: 'Sistem Perencanaan Produksi Bulanan Finished Goods & Kebutuhan Bahan Baku',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'PPIC, Produksi & Supply Chain',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Forecast FG',
    entryFile: 'Perencanaan Produksi FG.ipynb',
    environment: 'Python 3.11, Google Colaboratory & JupyterLab',
    stack: ['Python', 'Pandas', 'NumPy', 'Decimal (ROUND_HALF_UP)', 'OpenPyXL', 'Matplotlib', 'Google Sheets Live CSV'],
    summary:
      'Mengotomatiskan perhitungan rencana produksi 3 bulan ke depan untuk puluhan SKU lintas 7 brand (Kilap Premium, Kilap Lab, Purfress, Beenteles, Dakter Living, Konsinyasi, Reselling) dengan menggabungkan tren historis Weighted Moving Average (WMA), buffer kapasitas pabrik, dan permintaan DSO, lalu memecahnya menjadi kebutuhan komponen kemasan serta literasi cairan.',
    metrics: [
      { label: 'Cakupan Brand', value: '7 Brand KGG' },
      { label: 'Horizon Proyeksi', value: '3 Bulan (M4 - M6)' },
      { label: 'Metode Pembulatan', value: 'ROUND_HALF_UP (Setara ROUND Excel)' },
    ],
    problemStatement:
      'Perencanaan produksi bulanan sebelumnya disusun manual di banyak sheet terpisah. Perbedaan cara pembulatan angka desimal antara proyeksi penjualan, buffer pabrik, dan rincian Bill of Materials (BOM) kerap memicu selisih stok pengadaan botol, tutup botol, stiker, kardus box, serta bahan kimia cairan.',
    workflowSteps: [
      {
        step: '1. Unggah Histori Penjualan & Permintaan DSO',
        detail:
          'Pengguna mengunggah berkas Excel input bulanan yang memuat histori penjualan 3 bulan terakhir (t-3, t-2, t-1) serta proyeksi permintaan tim Direct Selling / B2B (DSO) untuk 3 bulan berikutnya.',
      },
      {
        step: '2. Kalkulasi WMA 3-Bulan & Baseline Pabrik',
        detail:
          'Sistem menghitung rata-rata tertimbang 3 bulan dengan bobot (0.2, 0.3, 0.5), kemudian mengalikan hasilnya dengan Faktor Pengali Baseline Pabrik sebesar 1.15 (buffer kapasitas 115%).',
      },
      {
        step: '3. Kombinasi Rencana Produksi & Pembulatan ROUND_HALF_UP',
        detail:
          'Target produksi final dihitung dari proporsi 60% Baseline Pabrik + 40% Permintaan DSO. Seluruh nilai dibulatkan menggunakan fungsi excel_round berbasis modul Decimal(ROUND_HALF_UP) agar identik dengan rumus ROUND() di Microsoft Excel.',
      },
      {
        step: '4. Penarikan Live BOM & Resep dari Google Sheets',
        detail:
          'Notebook mengunduh tabel master ALL FG (BOM DETAIL) per brand dan sheet RESEP secara langsung dari Google Spreadsheet tanpa perlu mengunduh file master manual.',
      },
      {
        step: '5. Klasifikasi Material & Ekspor Laporan Excel 5 Sheet',
        detail:
          'Setiap SKU hasil proyeksi dipecah ke level komponen (Botol, Tutup Botol, Stiker/Label, Box, Plastik, dan Volume Cairan mL) lalu diekspor ke berkas Excel 5 sheet lengkap dengan grafik dan format tabel korporat.',
      },
    ],
    technicalRules: [
      {
        title: 'Rumus Weighted Moving Average (WMA) & Rencana Produksi',
        formula: 'WMA = (0.2 * M_t3) + (0.3 * M_t2) + (0.5 * M_t1) | Baseline = WMA * 1.15 | Rencana = (0.6 * Baseline) + (0.4 * DSO)',
        explanation:
          'Memberikan bobot tertinggi (50%) pada bulan penjualan terbaru agar proyeksi responsif terhadap tren terkini, ditambah buffer kapasitas pabrik 15%.',
      },
      {
        title: 'Pembulatan Setara Excel (Anti Banker Rounding)',
        formula: "Decimal(str(round(val, 8))).quantize(Decimal('1'), rounding=ROUND_HALF_UP)",
        explanation:
          'Fungsi round() bawaan Python menggunakan round-half-to-even yang sering berbeda 1 unit dari Excel saat nilai desimal tepat .5. Implementasi Decimal memastikan kecocokan 100% dengan lembar kerja tim PPIC.',
      },
      {
        title: 'Deteksi Otomatis Kategori Kemasan & Takaran Cairan',
        formula: 'Prefix FD/FE/FC/FA -> BOTOL | OD/OG/OE/OC -> TUTUP BOTOL | DD/GH/GE -> STIKER | 100 ML -> 120 mL | 400 ML -> 420 mL',
        explanation:
          'Mengklasifikasikan ratusan kode item bahan baku secara otomatis menggunakan pola prefix kode barang dan regex volume.',
      },
    ],
    codeSnippetTitle: 'Perencanaan Produksi FG.ipynb (Kalkulasi WMA & Presisi Pembulatan)',
    codeSnippet: `from decimal import Decimal, ROUND_HALF_UP

# Parameter Peramalan Produksi KGG
BOBOT_WMA = (0.2, 0.3, 0.5)      # Bobot WMA 3-Bulan [t-3, t-2, t-1]
PENGALI_BASELINE = 1.15          # Faktor pengali baseline pabrik (115%)
BOBOT_RENCANA = (0.6, 0.4)       # Proporsi [60% Baseline Pabrik, 40% Permintaan DSO]

def excel_round(val):
    d = Decimal(str(round(val, 8))) if isinstance(val, (int, float)) else Decimal(str(val))
    return int(d.quantize(Decimal('1'), rounding=ROUND_HALF_UP))

def get_bb_category(item_code_or_name):
    raw = str(item_code_or_name).strip()
    u = re.sub(r'^\\d+\\s*ML\\s*', '', raw).upper()
    if u.startswith(('FD', 'FE', 'FC', 'FA', 'ED05')): return 'BOTOL'
    if u.startswith(('OD', 'OG', 'OE', 'OC', 'DA', 'OM')): return 'TUTUP BOTOL'
    if u.startswith(('DD', 'GH', 'GE', 'GF', 'ED12')): return 'STIKER/LABEL'
    if u.startswith(('GI', 'GD', 'OF')): return 'BOX'
    if u.startswith(('PM', 'PL', 'MF')): return 'PLASTIK'
    return 'LAINNYA'`,
    sampleInputHeaders: ['SKU', 'Nama Produk FG', 'Brand', 'Sales Jan (t-3)', 'Sales Feb (t-2)', 'Sales Mar (t-1)', 'Request DSO Apr'],
    sampleInputRows: [
      ['KP-EXT-250', 'Kilap Premium Quick Shine 250mL', 'KILAP PREMIUM', '1.200', '1.450', '1.800', '950'],
      ['PF-HLM-100', 'Purfress Helmet Perfume 100mL', 'PURFRESS', '980', '1.120', '1.340', '600'],
      ['KL-waterspot', 'Kilap Lab Waterspot Remover 250mL', 'KILAP LAB', '640', '710', '890', '420'],
    ],
    sampleOutputHeaders: ['SKU', 'WMA Dasar', 'Baseline Pabrik (115%)', 'Rencana Produksi Final', 'Kebutuhan Botol (PCS)', 'Kebutuhan Tutup (PCS)', 'Volume Cairan (Liter)'],
    sampleOutputRows: [
      ['KP-EXT-250', '1.575', '1.811', '1.467', '1.467 (FD-250)', '1.467 (OD-TRG)', '366,75 L'],
      ['PF-HLM-100', '1.202', '1.382', '1.069', '1.069 (FE-100)', '1.069 (OG-SPR)', '128,28 L'],
      ['KL-waterspot', '786', '904', '710', '710 (FC-250)', '710 (OC-CAP)', '177,50 L'],
    ],
  },
  {
    id: 'laporan-kardus-fg',
    number: '02',
    title: 'Otomasi Kardus Packing & Rekapitulasi FG Logistik',
    subtitle: 'Rule Engine Penentuan Jenis Kardus Pesanan Marketplace & Kalkulasi Omzet FG',
    entity: 'PT Kilapkan Seluruh Bangsa (KSB)',
    division: 'Logistik & Operasional (Gudang Kilap Malang)',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Laporan Kardus dan FG Logistik',
    entryFile: 'main.py & src/kardus_engine.py',
    environment: 'Modular Python Package (CLI, VS Code Jupyter, Google Colab)',
    stack: ['Python CLI (argparse)', 'Pandas', 'OpenPyXL', 'Regex Bundle Parser', 'Google Sheets Master Sync'],
    summary:
      'Memproses ribuan baris pesanan marketplace untuk menentukan ukuran dan SKU kardus packing yang tepat pada setiap nomor pesanan (baik pesanan satuan maupun kombinasi multi-item), sekaligus menghitung kuantitas keluar dan estimasi omzet Finished Goods (FG) per kategori kardus.',
    metrics: [
      { label: 'Arsitektur Kode', value: '5 Modul Python (src/)' },
      { label: 'Tabel Master Live', value: '6 Sheet Acuan' },
      { label: 'Gudang Target', value: 'Gudang Kilap Malang' },
    ],
    problemStatement:
      'Berkas ekspor pesanan marketplace memiliki sel Nomor Pesanan yang tergabung (merged cells) untuk pesanan multi-item. Menentukan kardus ukuran apa yang dipakai untuk kombinasi beberapa produk serta memisahkan omzet produk satuan (PCS) vs paket/bundling membutuhkan waktu berjam-jam jika dikerjakan dengan rumus spreadsheet biasa.',
    workflowSteps: [
      {
        step: '1. Sinkronisasi 6 Tabel Master dari Google Sheets (data_loader.py)',
        detail:
          'Sistem mengunduh 6 tabel referensi secara otomatis: Master Kardus (Sheet1), Aturan Kombinasi Kardus, Detail Slot Kombinasi, Pemetaan SKU, Daftar SKU FG, dan Rumus Harga Offline.',
      },
      {
        step: '2. Unmerge & Prapemrosesan Transaksi (preprocessor.py)',
        detail:
          'Melakukan forward-fill (ffill) pada kolom level pesanan (Order ID, Gudang, Kurir) tanpa mengubah baris level item produk, membersihkan string harga menjadi numerik float, dan memfilter pesanan khusus Gudang Kilap Malang.',
      },
      {
        step: '3. Mesin Penentuan Kardus Packing (kardus_engine.py)',
        detail:
          'Untuk pesanan 1 item dengan Qty = 1, sistem langsung memetakan SKU ke kardus tunggal (SINGLE_MATCH). Untuk pesanan multi-item atau Qty > 1, sistem mengekspansi daftar kardus dasar, mengurutkannya (sorted_order_kardus), dan mencocokkannya dengan aturan kombinasi serta slot SKU.',
      },
      {
        step: '4. Kalkulasi Kuantitas & Omzet FG (fg_engine.py)',
        detail:
          'Mengagregasi pemakaian produk per jenis kardus dengan memisahkan Kuantitas PCS vs Kuantitas Paket/Bundling (mendeteksi prefix regex ^[3456789]-) beserta nilai omzet masing-masing.',
      },
      {
        step: '5. Ekspor Laporan Multi-Sheet (exporter.py)',
        detail:
          'Menghasilkan file Laporan Kardus dan FG Logistik.xlsx yang berisi Sheet MASTER transaksi, Sheet rincian produk, dan Sheet Rekapitulasi Kardus FG.',
      },
    ],
    technicalRules: [
      {
        title: 'Algoritma Pencocokan Kombinasi Kardus Multi-Item',
        formula: 'expanded_kardus_list -> sorted(expanded_kardus_list) == rule["components_sorted"] + Validasi Slot SKU',
        explanation:
          'Menjamin urutan input barang dalam satu keranjang belanja tidak memengaruhi hasil penentuan kardus packing selama kombinasi komponennya sesuai aturan.',
      },
      {
        title: 'Pemisahan Otomatis Satuan (PCS) vs Paket/Bundling',
        formula: 'Regex Pattern: re.compile(r"^[3456789]-") & Tabel Pemetaan Kolom Bundling',
        explanation:
          'Mendeteksi SKU paket hemat/bundling agar konsumsi unit botol fisik di gudang dan nilai omzetnya tercatat secara proporsional.',
      },
    ],
    codeSnippetTitle: 'src/kardus_engine.py & main.py (Penentuan Kardus per Order)',
    codeSnippet: `def determine_kardus_for_order(items, parsed_rules, sku_to_kardus, kardus_to_sku):
    total_qty = sum(item["qty"] for item in items)

    # KASUS 1: Single item & Qty = 1
    if len(items) == 1 and total_qty == 1:
        sku = items[0]["sku"]
        kardus = sku_to_kardus.get(sku, "UNMAPPED")
        sku_kardus = kardus_to_sku.get(kardus, "UNMAPPED")
        return {
            "kardus": kardus,
            "sku_kardus": sku_kardus,
            "status": "SINGLE_MATCH" if kardus != "UNMAPPED" else "UNMAPPED_SKU",
        }

    # KASUS 2: Multi-item / Multi-qty -> Uji Aturan Kombinasi
    expanded_kardus_list = []
    for item in items:
        k = sku_to_kardus.get(item["sku"], "UNMAPPED")
        expanded_kardus_list.extend([k] * item["qty"])

    sorted_order_kardus = sorted(expanded_kardus_list)
    for rule in parsed_rules:
        if rule["components_sorted"] == sorted_order_kardus:
            return {"kardus": rule["target_kardus"], "sku_kardus": rule["sku_kardus"], "status": "COMBO_MATCH"}`,
    sampleInputHeaders: ['No. Pesanan', 'Nama Gudang', 'SKU Referensi', 'Nama Produk', 'Jumlah', 'Product Discounted Total Price'],
    sampleInputRows: [
      ['260401992811', 'Gudang Kilap Malang', 'KP-EXT-250', 'Kilap Premium Quick Shine 250mL', '1', 'Rp 65.000'],
      ['260401992845', 'Gudang Kilap Malang', 'KP-EXT-250', 'Kilap Premium Quick Shine 250mL', '1', 'Rp 65.000'],
      ['(merged above)', '(merged above)', 'PF-HLM-100', 'Purfress Helmet Spray 100mL', '1', 'Rp 45.000'],
    ],
    sampleOutputHeaders: ['Order ID', 'Daftar SKU Pesanan', 'Total Qty', 'Jenis Kardus Terpilih', 'SKU Kardus', 'Status Matching', 'Total Omzet FG'],
    sampleOutputRows: [
      ['260401992811', 'KP-EXT-250 (1)', '1', 'KARDUS B1 REGULER', 'BOX-B1', 'SINGLE_MATCH', 'Rp 65.000'],
      ['260401992845', 'KP-EXT-250 (1) + PF-HLM-100 (1)', '2', 'KARDUS B2 MEDIUM COMBO', 'BOX-B2', 'COMBO_MATCH', 'Rp 110.000'],
    ],
  },
  {
    id: 'rekonsiliasi-stok-rak',
    number: '03',
    title: 'Rekonsiliasi Stok Rak Fisik vs Master Spreadsheet',
    subtitle: 'Sistem Audit Stok Opname Lapangan & Generator Mutasi Berpasangan (11 Kolom)',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'Warehouse & Inventory Control',
    localPath: 'C:\\Rofiq\\KGG\\Project\\NEW STOK & INVENTARIS',
    entryFile: 'project1/Rekonsiliasi_Stok_Lapangan.ipynb & project2/Rekonsiliasi_Stok_Colab.ipynb',
    environment: 'Python, Google Colaboratory & Local Jupyter Notebook',
    stack: ['Python', 'Pandas', 'OpenPyXL', 'Regex Batch Normalizer', 'Google Sheets API'],
    summary:
      'Membandingkan hasil penghitungan fisik barang di rak gudang (Actual) terhadap data acuan master spreadsheet (Sheet Rak) secara real-time, menormalisasi format kode batch kadaluarsa, mengisolasi hanya rak yang sedang diaudit, serta menghasilkan jurnal mutasi berpasangan (+Delta dan -Delta) dalam format standar 11 kolom.',
    metrics: [
      { label: 'Format Output', value: '11 Kolom Standar KGG' },
      { label: 'Logika Jurnal', value: 'Mutasi Berpasangan (+/-)' },
      { label: 'Proteksi Rak', value: 'Isolasi Rak Audit Aktif' },
    ],
    problemStatement:
      'Saat tim gudang melakukan stok opname parsial (hanya beberapa rak tertentu per hari), perbandingan manual sering kali salah mengenali kode batch karena perbedaan penulisan (misal OKT_26 vs OKT-2026) dan berisiko mengubah stok rak lain yang tidak diaudit menjadi nol.',
    workflowSteps: [
      {
        step: '1. Penarikan Data Master Rak dari Google Spreadsheet',
        detail:
          'Sistem mengunduh posisi stok sistem terkini dari sheet Rak (kolom RAK dan BARANG) dan mem-parsing nama produk, kode batch, serta kuantitas sistem per alamat rak.',
      },
      {
        step: '2. Pembacaan Berkas Audit Fisik Lapangan (Actual)',
        detail:
          'Pengguna mengunggah berkas Excel hasil perhitungan fisik lapangan (misal Actual 31Oct.xlsx) yang memuat kolom ALAMAT rak, PRODUK, BATCH, dan QTY FISIK.',
      },
      {
        step: '3. Normalisasi Kode Batch & Isolasi Rak Aktif',
        detail:
          'Fungsi normalize_batch menyeragamkan variasi penulisan bulan/tahun batch. Sistem hanya mengevaluasi alamat rak yang muncul pada berkas Actual sehingga rak lain di master database tetap terlindungi.',
      },
      {
        step: '4. Pembentukan Baris Mutasi Berpasangan (Double-Entry)',
        detail:
          'Untuk setiap selisih Delta = QTY Actual - QTY Sistem yang tidak sama dengan nol, sistem membuat 2 baris berurutan: baris pertama berisi +Delta pada lokasi rak terkait, diikuti baris penyeimbang -Delta tanpa lokasi.',
      },
      {
        step: '5. Ekspor Excel UPDATE HARIAN STOK',
        detail:
          'Mengekspor berkas Penyesuaian2_31Oct.xlsx dengan sheet UPDATE HARIAN STOK berformat 11 kolom standar beserta styling header biru korporat.',
      },
    ],
    technicalRules: [
      {
        title: 'Isolasi Rak Audit (Safe Partial Opname)',
        formula: 'Target_Racks = set(df_actual["ALAMAT"].dropna().unique())',
        explanation:
          'Memastikan stok opname harian dapat dilakukan per blok/lorong rak tanpa mengganggu saldo rak gudang lainnya. Namun jika di dalam rak yang diaudit ada produk sistem yang tidak ditemukan secara fisik, sistem otomatis mencatat mutasi keluar sebesar stok sistem.',
      },
      {
        title: 'Pasangan Baris Mutasi & Penyeimbang',
        formula: 'Baris 1: (JUMLAH = +Delta, LOKASI = Rak, BATCH = Exp) | Baris 2: (JUMLAH = -Delta, LOKASI = "", BATCH = "")',
        explanation:
          'Memenuhi struktur rumus buku besar stok harian KGG agar perpindahan saldo antar-rak dan penyesuaian fisik langsung seimbang.',
      },
    ],
    codeSnippetTitle: 'project2/Rekonsiliasi_Stok_Colab.ipynb (Normalisasi Batch & Mutasi Berpasangan)',
    codeSnippet: `def normalize_batch(b):
    """Standardisasi kode bulan pada batch agar seragam."""
    if not b:
        return ''
    b = str(b).strip().upper()
    if b in ['-', 'NAN', 'NONE', '[]', '']:
        return ''
    m = re.search(r'([A-Z]+)[_-](\\d+)', b)
    if m:
        month, year = m.group(1)[:3], m.group(2)[-2:]
        return f"{month}_{year}"
    return b

# Pembentukan 2 baris mutasi berpasangan untuk setiap selisih Delta != 0
for (nama, exp), qty_act in act_items.items():
    qty_sys = sys_items.get((nama, exp), 0)
    delta = qty_act - qty_sys
    if delta != 0:
        # 1. Baris mutasi rak spesifik
        rows_mutasi.append([TANGGAL_MUTASI, nama, '', '', '', '', delta, '', '', rak, exp])
        # 2. Baris penyeimbang
        rows_mutasi.append([TANGGAL_MUTASI, nama, '', '', '', '', -delta, '', '', '', ''])`,
    sampleInputHeaders: ['ALAMAT (Rak)', 'PRODUK', 'BATCH (Input Lapangan)', 'QTY FISIK (Actual)', 'QTY SISTEM (Master Sheet)'],
    sampleInputRows: [
      ['RAK-A01-02', 'KILAP PREMIUM QUICK SHINE 250ML', 'OKT-2026', '145', '140'],
      ['RAK-A01-02', 'KILAP PREMIUM TIRE GEL 250ML', 'SEP_26', '82', '90'],
      ['RAK-B03-01', 'PURFRESS HELMET SPRAY 100ML', 'NOV-26', '0 (Tidak Ada Fisik)', '12'],
    ],
    sampleOutputHeaders: ['TANGGAL', 'NEW PRODUCT FG', 'JUMLAH', 'LOKASI', 'KODE BATCH', 'Peran Baris'],
    sampleOutputRows: [
      ['31-Okt-2026', 'KILAP PREMIUM QUICK SHINE 250ML', '+5', 'RAK-A01-02', 'OKT_26', 'Baris 1: Penyesuaian Rak'],
      ['31-Okt-2026', 'KILAP PREMIUM QUICK SHINE 250ML', '-5', '(Kosong)', '(Kosong)', 'Baris 2: Penyeimbang'],
      ['31-Okt-2026', 'KILAP PREMIUM TIRE GEL 250ML', '-8', 'RAK-A01-02', 'SEP_26', 'Baris 1: Penyesuaian Rak'],
      ['31-Okt-2026', 'KILAP PREMIUM TIRE GEL 250ML', '+8', '(Kosong)', '(Kosong)', 'Baris 2: Penyeimbang'],
    ],
  },
  {
    id: 'penyesuaian-bb',
    number: '04',
    title: 'Sistem Penyesuaian Kuantitas Bahan Baku (Penyesuaian BB)',
    subtitle: 'Generator Otomatis 4 Berkas Item Adjustment Bulanan (Basah, Kering & Produksi)',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'Inventory Accounting & Gudang Bahan Baku',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Penyesuaian BB',
    entryFile: 'main.py, src/transformer.py & config/settings.py',
    environment: 'Python CLI (Batch Multi-Periode) & Jupyter/Colab',
    stack: ['Python 3', 'OpenPyXL', 'Modular ETL (extractor/transformer/exporter)', 'Argparse CLI'],
    summary:
      'Mengolah laporan mentah Kuantitas Barang per Gudang setiap akhir periode bulanan menjadi 4 berkas Excel Item Adjustment siap impor (Gudang BB Basah, Gudang BB Kering, Gudang Produksi Basah, dan Gudang Produksi Kering) sesuai aturan satuan kimia cair vs kemasan padat.',
    metrics: [
      { label: 'Output per Periode', value: '4 File Excel (.xlsx)' },
      { label: 'Struktur Output', value: '15 Kolom ERP Standar' },
      { label: 'Mode Eksekusi', value: 'Single & Batch (--all)' },
    ],
    problemStatement:
      'Setiap penutupan buku bulanan, staf inventaris harus memisahkan ratusan item bahan baku dari satu tabel lebar (25+ kolom) menjadi 4 file terpisah berdasarkan jenis gudang dan kategori satuan (cair vs non-cair), mengubah angka selisih negatif menjadi nilai positif bertipe Pengurangan, serta mengosongkan kolom Unit khusus untuk barang kering.',
    workflowSteps: [
      {
        step: '1. Deteksi Otomatis Periode & Validasi Sheet (extractor.py)',
        detail:
          'Mendeteksi label periode dari nama folder/berkas (misal 2026-04-apr -> APR-2026) dan membaca sheet Kuantitas Barang per Gudang mulai baris ke-3 sambil mengabaikan baris kosong atau baris ringkasan Total.',
      },
      {
        step: '2. Pemetaan Indeks Kolom Selisih 3 Gudang (settings.py)',
        detail:
          'Mengekstrak Nama Barang (Kolom A), Kode (Kolom B), Satuan (Kolom C), Selisih Gudang BB Basah (Kolom I / idx 8), Selisih Gudang BB Kering (Kolom Q / idx 16), dan Selisih Gudang Produksi (Kolom Y / idx 24).',
      },
      {
        step: '3. Pemisahan Bahan Baku Basah vs Kering (transformer.py)',
        detail:
          'Item dengan satuan di dalam himpunan {"ML", "GRAM", "LITER", "KG"} diklasifikasikan sebagai BASAH (kolom Unit diisi satuan asli), sedangkan satuan lain (PCS, CM, ROLL) masuk kategori KERING (kolom Unit dikosongkan / None).',
      },
      {
        step: '4. Penentuan Tipe Penyesuaian & Nilai Absolut',
        detail:
          'Selisih < 0 dikonversi menjadi Tipe = "Pengurangan" dengan Kuantitas = abs(selisih). Selisih > 0 menjadi Tipe = "Penambahan". Selisih = 0 dilewati otomatis.',
      },
      {
        step: '5. Ekspor 4 File Standar 15 Kolom (exporter.py)',
        detail:
          'Menghasilkan 4 berkas: item-adjustment-{BULAN}-BASAH.xlsx, KERING.xlsx, PRODUKSI-BASAH.xlsx, dan PRODUKSI-KERING.xlsx dengan auto-fit lebar kolom dan border standar korporat.',
      },
    ],
    technicalRules: [
      {
        title: 'Klasifikasi Satuan Basah vs Kering & Aturan Kolom Unit',
        formula: 'SATUAN_BASAH = {"ML", "GRAM", "LITER", "KG"} -> Unit = Satuan Asli | Selain itu (KERING) -> Unit = None',
        explanation:
          'Sistem ERP/Akuntansi perusahaan mewajibkan kolom Unit dikosongkan untuk komponen kemasan padat (PCS/CM), tetapi wajib terisi untuk bahan kimia/cair.',
      },
      {
        title: 'Transformasi Selisih ke Struktur 15 Kolom',
        formula: 'diff < 0 -> ("Pengurangan", abs(diff)) | diff > 0 -> ("Penambahan", diff) | diff == 0 -> Skip',
        explanation:
          'Menghilangkan risiko kesalahan input tanda minus saat impor jurnal penyesuaian persediaan.',
      },
    ],
    codeSnippetTitle: 'src/transformer.py (Pemisahan Basah/Kering & Gudang Produksi)',
    codeSnippet: `SATUAN_BASAH = {"ML", "GRAM", "LITER", "KG"}

def is_basah(satuan: str | None) -> bool:
    return (satuan or "").strip().upper() in SATUAN_BASAH

def transform_produksi(items: list[dict]) -> tuple[list[tuple], list[tuple]]:
    """Memisahkan selisih GUDANG PRODUKSI menjadi file PRODUKSI-BASAH dan PRODUKSI-KERING."""
    rows_basah, rows_kering = [], []
    for item in items:
        diff = item["selisih_produksi"]
        if diff is None or diff == 0:
            continue
        tipe = "Pengurangan" if diff < 0 else "Penambahan"
        qty = abs(diff)
        if is_basah(item["satuan"]):
            rows_basah.append(create_row(item["nama"], item["kode"], item["satuan"], qty, GUDANG_PRODUKSI, tipe))
        else:
            rows_kering.append(create_row(item["nama"], item["kode"], None, qty, GUDANG_PRODUKSI, tipe))
    return rows_basah, rows_kering`,
    sampleInputHeaders: ['Nama Barang (Kol A)', 'Kode (Kol B)', 'Satuan (Kol C)', 'Selisih BB Basah (Kol I)', 'Selisih BB Kering (Kol Q)', 'Selisih Produksi (Kol Y)'],
    sampleInputRows: [
      ['SILICONE EMULSION HV-60', 'BB-CHM-014', 'KG', '-12.5', '0', '+4.0'],
      ['BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', 'PCS', '0', '-45', '-18'],
      ['PARFUM BUBBLEGUM GRADE A', 'BB-PRF-009', 'ML', '+250', '0', '-80'],
    ],
    sampleOutputHeaders: ['File Output Tujuan', 'Nama Barang', 'Kode', 'Unit', 'Kuantitas', 'Gudang', 'Tipe Penyesuaian'],
    sampleOutputRows: [
      ['item-adjustment-APR-2026-BASAH.xlsx', 'SILICONE EMULSION HV-60', 'BB-CHM-014', 'KG', '12.5', 'GUDANG BAHAN BAKU BASAH', 'Pengurangan'],
      ['item-adjustment-APR-2026-KERING.xlsx', 'BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', '(Kosong / None)', '45', 'GUDANG BAHAN BAKU KERING', 'Pengurangan'],
      ['item-adjustment-APR-2026-PRODUKSI-BASAH.xlsx', 'PARFUM BUBBLEGUM GRADE A', 'BB-PRF-009', 'ML', '80', 'GUDANG PRODUKSI', 'Pengurangan'],
      ['item-adjustment-APR-2026-PRODUKSI-KERING.xlsx', 'BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', '(Kosong / None)', '18', 'GUDANG PRODUKSI', 'Pengurangan'],
    ],
  },
  {
    id: 'append-report-weekly',
    number: '05',
    title: 'Pipeline ETL Laporan Mingguan 7 Channel (AppendReport_Weekly)',
    subtitle: 'Konsolidasi Transaksi Multi-Marketplace, Perbaikan Bug XML TikTok & Standardisasi SKU/Provinsi',
    entity: 'PT. Kilap Global Group (KGG) & PT Kilapkan Seluruh Bangsa (KSB)',
    division: 'Data Analytics & R&D',
    localPath: 'C:\\Rofiq\\KGG\\Internal Code\\AppendReport_Weekly.ipynb',
    entryFile: 'AppendReport_Weekly.ipynb',
    environment: 'Python, Pandas, OpenPyXL Full-DOM Parser',
    stack: ['Python', 'Pandas', 'OpenPyXL (read_only=False)', 'Google Sheets CSV Merge'],
    summary:
      'Menggabungkan dan menstandardisasi 5 berkas ekspor mentah mingguan (Lazada, Shopee Kilap Premium, Shopee Pusat Pengkilap, TikTok/Tokopedia Kilap Premium, TikTok/Tokopedia Pusat Pengkilap) menjadi 1 dataset bersih 7 channel (23 kolom), dilengkapi parser tahan bug metadata XML TikTok serta pencocokan otomatis SKU terbaru dan nama provinsi se-Indonesia.',
    metrics: [
      { label: 'Channel Marketplace', value: '7 Kanal Toko Resmi' },
      { label: 'Skema Konsolidasi', value: '23 Kolom Terstandardisasi' },
      { label: 'Fitur Rekayasa Data', value: 'Anti-Bug XML Dimension' },
    ],
    problemStatement:
      'Berkas ekspor pesanan dari TikTok Shop/Tokopedia memiliki dua kendala teknis: (1) baris ke-2 berisi deskripsi teks yang harus dihapus manual setiap minggu, dan (2) metadata XML <dimension ref="A1"/> pada file .xlsx sering rusak sehingga pandas.read_excel() standar hanya membaca 1 kolom saja dari total 63 kolom. Selain itu, kode SKU lama dan penulisan nama provinsi antar-marketplace tidak seragam.',
    workflowSteps: [
      {
        step: '1. Pembacaan 5 Berkas Mentah & Anti-Bug TikTok Parser (baca_file_tiktok)',
        detail:
          'Membaca file Lazada dan Shopee, serta memproses file TikTok/Tokopedia menggunakan openpyxl dalam mode read_only=False (full DOM) agar seluruh 63 kolom tetap terbaca meskipun tag XML dimension rusak, sekaligus membuang baris deskripsi ke-2 secara otomatis.',
      },
      {
        step: '2. Pemisahan Otomatis TikTok vs Tokopedia (proses_tiktok_tokopedia)',
        detail:
          'Satu file ekspor TikTok memuat transaksi gabungan TikTok dan Tokopedia. Sistem otomatis memecahnya menjadi 2 dataframe terpisah berdasarkan kolom Purchase Channel serta menambahkan prefix internal_order_id (TTKP-, TPKP-, TTPP-, TPPP-, SPKP-, SPPP-, LZKP-).',
      },
      {
        step: '3. Normalisasi Tipe Data Harga & Penggabungan 7 Channel (pd.concat)',
        detail:
          'Membersihkan tanda titik pemisah ribuan pada kolom harga dan ongkir Shopee, menyamakan nama kolom ke dalam 23 atribut standar, dan menggabungkan ketujuh kanal penjualan.',
      },
      {
        step: '4. Translasi SKU v1/v2 ke SKU v3 & Normalisasi Provinsi via Google Sheets',
        detail:
          'Melakukan left-join terhadap tabel online NEW_SKU untuk memetakan kode SKU lama ke sku_v3 terbaru, serta left-join terhadap tabel online REAL_PRV untuk menstandardisasi nama provinsi pengiriman.',
      },
      {
        step: '5. Klasifikasi Status Pembatalan & Brand Otomatis',
        detail:
          'Mendeteksi kata kunci (gagal, fail, cancel, batal) menjadi cancelation_status = Yes/No, mengidentifikasi brand Purfress dari substring PF pada sku_v3, dan mengekspor master mingguan siap pakai untuk dashboard analitik.',
      },
    ],
    technicalRules: [
      {
        title: 'Solusi Kerusakan Metadata XML <dimension ref="A1"/> pada Ekspor TikTok',
        formula: 'openpyxl.load_workbook(file_path, read_only=False, data_only=True) + Filter Numerik Order ID',
        explanation:
          'pandas.read_excel() secara default memakai mode read_only=True yang memercayai tag XML dimension. Dengan memaksa pembacaan full-mode di openpyxl dan memvalidasi Order ID numerik, seluruh 63 kolom x puluhan ribu baris selalu terbaca utuh tanpa perlu membuka dan menyimpan ulang file di Excel.',
      },
      {
        title: 'Translasi Berlapis SKU (sku_v1 -> sku_v2 -> sku_v3) & Deteksi Brand',
        formula: "gabungan['sku_v3'] = gabungan['new_sku'].fillna(gabungan['sku_v2']) | sku_v3 contains 'PF' -> Brand = 'Purfress'",
        explanation:
          'Menjaga jejak audit kode SKU asli dari marketplace (sku_v1) sembari menyediakan kode SKU master terbaru (sku_v3) untuk pelaporan lintas divisi.',
      },
    ],
    codeSnippetTitle: 'AppendReport_Weekly.ipynb (Parser Anti-Bug XML TikTok & Enrichment SKU)',
    codeSnippet: `def baca_file_tiktok(file_path):
    """Membaca ekspor TikTok/Tokopedia dengan aman meskipun metadata XML
    <dimension ref="A1"/> rusak, serta otomatis membuang baris deskripsi kedua."""
    wb = openpyxl.load_workbook(file_path, read_only=False, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    wb.close()

    headers = [str(h).strip() if h is not None else f"col_{i}" for i, h in enumerate(rows[0])]
    df = pd.DataFrame(rows[1:], columns=headers)

    # Buang baris deskripsi bawaan export (Order ID bukan angka)
    df = df[df['Order ID'].astype(str).str.strip().str.isdigit()]. reset_index(drop=True)
    return df

# Left-join dengan Master SKU terbaru & Master Provinsi dari Google Sheets
gabungan = pd.merge(gabungan, df_newsku, how='left', left_on='sku_v2', right_on='updated_sku')
gabungan['sku_v3'] = gabungan['new_sku'].fillna(gabungan['sku_v2'])
gabungan.loc[gabungan['sku_v3'].str.contains('PF', case=False, na=False), 'brand'] = 'Purfress'`,
    sampleInputHeaders: ['File Sumber', 'Order ID / No. Pesanan', 'Purchase Channel', 'Seller SKU (Lama)', 'Provinsi Mentah', 'Status Asli'],
    sampleInputRows: [
      ['tiktok_kp.xlsx', '579281004921', 'TikTok', 'OLD-KP-QS250', 'Jawa Timur (East Java)', 'Completed'],
      ['tiktok_kp.xlsx', '579281008834', 'Tokopedia', 'PF_HELM_100_V1', 'DKI Jakarta', 'Cancelled by buyer'],
      ['shopee_pp.xlsx', '260809KGG112', 'Shopee', 'KP-TIRE-250', 'DI YOGYAKARTA', 'Selesai'],
    ],
    sampleOutputHeaders: ['internal_order_id', 'platform', 'brand', 'sku_v1', 'sku_v3 (Standardized)', 'prv (Normalized)', 'cancelation_status'],
    sampleOutputRows: [
      ['TTKP-579281004921', 'TikTok Kilap Premium', 'Kilap Premium', 'OLD-KP-QS250', 'KP-EXT-250', 'Jawa Timur', 'No'],
      ['TPKP-579281008834', 'Tokopedia Kilap Premium', 'Purfress', 'PF_HELM_100_V1', 'PF-HLM-100', 'DKI Jakarta', 'Yes'],
      ['SPPP-260809KGG112', 'Shopee Pusat Pengkilap', 'Kilap Premium', 'KP-TIRE-250', 'KP-TRG-250', 'DI Yogyakarta', 'No'],
    ],
  },
];

export const WEB_SYSTEMS = [
  {
    id: 'dashboard-finance',
    number: '01',
    code: 'WEB-01',
    title: 'Executive Financial Control & Multi-Entity Cash Flow',
    subtitle: 'Sistem Konsolidasi Anggaran Korporat, Realisasi Arus Kas & Analisis Beban Departemen',
    entity: 'PT Kilapkan Seluruh Bangsa & PT. Kilap Global Group',
    division: 'Financial Modeling & Executive Analytics',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Decimal.js', 'Recharts', 'Google Sheets Integration', 'Financial Modeling'],
    summary:
      'Saya membangun sistem kendali keuangan untuk memantau arus kas (Cash In vs Cash Out) 12 bulan (2024-2026), matriks anggaran belanja multi-departemen, serta analisis varians dan laba rugi lintas dua entitas usaha.',
    metrics: [
      { label: 'Cakupan Waktu', value: '3 Tahun (2024-2026)' },
      { label: 'Entitas Finansial', value: '2 Entitas Korporat' },
      { label: 'Struktur Akun', value: 'Matriks RAB & CoA' },
    ],
    problemStatement:
      'Pencatatan anggaran belanja (RAB) dan transaksi arus kas harian sebelumnya tersebar di berbagai berkas spreadsheet yang tidak terhubung. Manajemen kesulitan membandingkan secara langsung antara plafon alokasi anggaran dengan realisasi belanja aktual di tiap departemen, serta membutuhkan waktu lama untuk menyusun laporan laba rugi konsolidasian.',
    workflowSteps: [
      {
        step: '1. Agregasi & Pembersihan Transaksi Kas Harian',
        detail:
          'Sistem mengonsolidasi mutasi rekening koran dan pencatatan kas kecil harian. Data dibersihkan, distandardisasi tanggal transaksinya, dan dipetakan ke Kode Akun Akuntansi (Chart of Accounts / CoA).',
      },
      {
        step: '2. Pemetaan Matriks Anggaran (Budget Matrix)',
        detail:
          'Alokasi plafon biaya per departemen (Pemasaran, Operasional Gudang, R&D, Logistik, dan Umum) diklasifikasikan ke dalam 12 periode bulan dengan pemisahan buku entitas induk dan manufaktur.',
      },
      {
        step: '3. Kalkulasi Varians & Deteksi Over-Budget',
        detail:
          'Menghitung selisih matematis antara anggaran vs realisasi secara otomatis. Sistem memberikan penanda status jika serapan dana suatu divisi melebihi 90% atau mengalami defisit anggaran.',
      },
      {
        step: '4. Pelaporan Konsolidasi & Visualisasi Eksekutif',
        detail:
          'Menghasilkan ringkasan Laba Rugi, margin EBITDA, dan arus kas bersih (Net Cash Flow) yang dapat difilter berdasarkan bulan, kuartal, atau tahun.',
      },
    ],
    technicalRules: [
      {
        title: 'Formula Selisih Anggaran (Budget Variance)',
        formula: 'Variance = Plafon Anggaran - Realisasi Aktual | % Serapan = (Realisasi / Anggaran) * 100%',
        explanation:
          'Nilai positif menandakan sisa plafon anggaran (under-budget), sedangkan nilai negatif mengindikasikan over-budget yang memerlukan persetujuan direksi.',
      },
      {
        title: 'Arus Kas Bersih Konsolidasian (Net Cash Flow)',
        formula: 'Net Cash Flow = Total Kas Masuk (Inflow) - Total Kas Keluar (Outflow)',
        explanation:
          'Menghitung posisi kas bersih pada akhir setiap periode penutupan buku korporat.',
      },
    ],
    sampleInputHeaders: ['Tanggal', 'Entitas', 'Departemen', 'Kode Akun (CoA)', 'Plafon RAB Bulanan', 'Realisasi Aktual'],
    sampleInputRows: [
      ['2026-03-31', 'PT KGG', 'Marketing & Ads', '6102-ADS', 'Rp 120.000.000', 'Rp 114.500.000'],
      ['2026-03-31', 'PT KSB', 'Operasional Pabrik', '5201-OPR', 'Rp 85.000.000', 'Rp 89.200.000'],
      ['2026-03-31', 'PT KGG', 'R&D Formulasi', '6301-RND', 'Rp 25.000.000', 'Rp 19.800.000'],
    ],
    sampleOutputHeaders: ['Entitas', 'Departemen', 'Selisih (Variance)', 'Rasio Serapan (%)', 'Status Anggaran'],
    sampleOutputRows: [
      ['PT KGG', 'Marketing & Ads', '+Rp 5.500.000', '95,42%', 'Waspada (>90%)'],
      ['PT KSB', 'Operasional Pabrik', '-Rp 4.200.000', '104,94%', 'Over-Budget'],
      ['PT KGG', 'R&D Formulasi', '+Rp 5.200.000', '79,20%', 'Aman'],
    ],
  },
  {
    id: 'dashboard-hr',
    number: '02',
    code: 'WEB-02',
    title: 'HR & Talent Acquisition Portal',
    subtitle: 'Sistem Manajemen Pipeline Rekrutmen Kanban & Parser Berkas Kandidat Terintegrasi',
    entity: 'PT. Kilap Global Group',
    division: 'Human Resources & Talent Analytics',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Kanban State Machine', 'Gemini AI API / Regex Parser', 'XLSX Export'],
    summary:
      'Saya merancang portal internal untuk mengelola siklus rekrutmen, memetakan pelamar kerja ke dalam 6 tahapan Kanban, memantau posisi kosong (Outstanding Positions), serta mengekstrak informasi CV pelamar.',
    metrics: [
      { label: 'Tahap Seleksi', value: '6 Kolom Kanban' },
      { label: 'Input Kandidat', value: 'Parser PDF CV & Form' },
      { label: 'Format Laporan', value: 'Ekspor Tabel XLSX' },
    ],
    problemStatement:
      'Tim HR menerima puluhan berkas lamaran kerja melalui berbagai kanal tanpa papan pelacakan terpadu. Hal ini menyulitkan pemantauan posisi kosong yang mendesak, meningkatkan risiko berkas pelamar tercecer, dan memperlambat koordinasi status seleksi antar pewawancara.',
    workflowSteps: [
      {
        step: '1. Pemantauan Matriks Lowongan (Outstanding Positions)',
        detail:
          'Menyajikan daftar lowongan pekerjaan yang sedang dibuka, target kuota pemenuhan, departemen pemohon, serta status urgensi kebutuhan kandidat.',
      },
      {
        step: '2. Ingesti & Penguraian Berkas CV',
        detail:
          'Berkas PDF pelamar diuraikan untuk mengambil nama lengkap, nomor WhatsApp, email, pendidikan terakhir, pengalaman kerja, serta keahlian teknis.',
      },
      {
        step: '3. Manajemen Papan Kanban 6 Fase Seleksi',
        detail:
          'Kandidat dipetakan ke dalam kolom: Administrasi -> Screening CV -> Interview HR -> User Interview / Tes -> Offering -> Onboarding.',
      },
      {
        step: '4. Database Terpusat & Ekspor Rekap Rekrutmen',
        detail:
          'Rekam jejak, catatan wawancara, dan skor kandidat disimpan dalam tabel dengan multi-filter dan dapat diunduh ke Excel.',
      },
    ],
    technicalRules: [
      {
        title: '6-Stage Funnel State Machine',
        formula: 'Status: [Admin, Screening, Interview HR, User Test, Offering, Onboarding]',
        explanation:
          'Menjaga alur status pelamar tetap berurutan dari seleksi berkas hingga penerimaan.',
      },
      {
        title: 'Standardisasi Penilaian & Normalisasi Nomor Kontak',
        formula: 'Rating: Skala 1-5 | Sanitasi Nomor: Prefiks 08xx -> 628xx (Tautan wa.me)',
        explanation:
          'Nomor telepon pelamar dinormalisasi agar tim HR dapat langsung menghubungi kandidat dari tabel.',
      },
    ],
    sampleInputHeaders: ['Berkas CV', 'Posisi Dilamar', 'Divisi', 'Pendidikan', 'Kontak Mentah'],
    sampleInputRows: [
      ['CV_Andi_Pratama.pdf', 'Staff PPIC', 'Supply Chain', 'S1 Teknik Industri', '0812-3456-7890'],
      ['CV_Siti_Rahma.pdf', 'Admin Gudang', 'Logistik', 'D3 Administrasi Bisnis', '+62 857 9900 1122'],
    ],
    sampleOutputHeaders: ['ID Kandidat', 'Nama', 'Posisi', 'Tahap Kanban Aktif', 'Skor Evaluasi', 'WhatsApp Terformat'],
    sampleOutputRows: [
      ['CND-2601', 'Andi Pratama', 'Staff PPIC', 'User Interview / Tes', '4,5 / 5,0', 'wa.me/6281234567890'],
      ['CND-2602', 'Siti Rahma', 'Admin Gudang', 'Screening CV', '4,0 / 5,0', 'wa.me/6285799001122'],
    ],
  },
  {
    id: 'costmatrix',
    number: '03',
    code: 'WEB-03',
    title: 'CostMatrix & Manufacturing HPP Tracker',
    subtitle: 'Sistem Kalkulasi Harga Pokok Penjualan (HPP) Multi-Level BOM & Simulasi Margin Resep',
    entity: 'PT Kilapkan Seluruh Bangsa & PT. Kilap Global Group',
    division: 'Manufacturing Cost Accounting & BOM',
    stack: ['Next.js 14', 'React', 'Decimal.js', 'Tailwind CSS', 'Multi-Level BOM Engine', 'Batch Recipe Simulator'],
    summary:
      'Saya mengembangkan kalkulator Harga Pokok Penjualan (HPP) Finished Goods (FG), paket bundling, dan formulasi resep cairan kimia per batch 5.000 mL berbasis hierarki Bill of Materials (BOM) beserta biaya kemasan dan tenaga kerja.',
    metrics: [
      { label: 'Basis Batch Resep', value: '5.000 mL (5 Liter)' },
      { label: 'Struktur Biaya', value: 'Cairan + Kemasan + Labor' },
      { label: 'Simulasi Harga', value: 'Gross Margin terhadap HET' },
    ],
    problemStatement:
      'Perubahan harga beli bahan kimia cair, botol plastik (PET/HDPE), sprayer, stiker label, dan kardus karton menyulitkan pembaruan HPP per produk. Biaya kemasan sekunder dan tenaga kerja juga kerap terlewat saat menghitung harga pokok paket promosi bundling.',
    workflowSteps: [
      {
        step: '1. Manajemen Master Biaya Komponen Material',
        detail:
          'Mencatat harga beli bahan baku per satuan: bahan kimia per gram/mL, botol satuan, tutup trigger/spray, stiker depan-belakang, dus satuan, dan outer box.',
      },
      {
        step: '2. Simulasi Formula Resep Cairan per Batch 5.000 mL',
        detail:
          'Menghitung biaya modal bahan kimia untuk 5.000 mL larutan, lalu membaginya secara proporsional sesuai volume botol produk akhir (100 mL, 250 mL, 500 mL).',
      },
      {
        step: '3. Konsolidasi Multi-Level BOM Finished Goods (FG)',
        detail:
          'Menggabungkan biaya formula cairan, botol, tutup, label stiker, segel plastik, dan biaya tenaga kerja per botol untuk menghasilkan HPP murni per unit.',
      },
      {
        step: '4. Kalkulator HPP Bundling & Margin Keuntungan Ritel',
        detail:
          'Mengombinasikan beberapa SKU FG ke dalam paket bundling ditambah biaya kardus kombo dan bubble wrap, lalu menghitung margin kotor terhadap Harga Eceran Tertinggi (HET).',
      },
    ],
    technicalRules: [
      {
        title: 'Formula Alokasi Biaya Formula Cairan per Unit',
        formula: 'Biaya Cairan = (Total Biaya Resep Batch 5.000 mL / 5.000) * Isi Kemasan (mL)',
        explanation:
          'Mengalokasikan biaya larutan kimia secara proporsional ke setiap ukuran botol kemasan.',
      },
      {
        title: 'Kalkulasi HPP Finished Goods & Margin Kotor',
        formula: 'HPP Unit = Biaya Cairan + Botol + Tutup + Label + Tenaga Kerja | Margin (%) = ((HET - HPP) / HET) * 100%',
        explanation:
          'Memastikan seluruh biaya langsung (direct material dan direct labor) masuk ke perhitungan sebelum menetapkan harga jual.',
      },
    ],
    sampleInputHeaders: ['SKU Produk', 'Biaya Batch 5.000 mL', 'Volume Botol', 'Harga Botol + Trigger', 'Stiker + Labor', 'HET Ritel'],
    sampleInputRows: [
      ['KP-EXT-250', 'Rp 185.000', '250 mL', 'Rp 4.800', 'Rp 2.450', 'Rp 65.000'],
      ['PF-HLM-100', 'Rp 240.000', '100 mL', 'Rp 3.100', 'Rp 2.100', 'Rp 45.000'],
    ],
    sampleOutputHeaders: ['SKU Produk', 'Biaya Cairan / Botol', 'HPP Total / Unit', 'HET Ritel', 'Laba Kotor / Unit', 'Gross Margin (%)'],
    sampleOutputRows: [
      ['KP-EXT-250', 'Rp 9.250', 'Rp 16.500', 'Rp 65.000', 'Rp 48.500', '74,62%'],
      ['PF-HLM-100', 'Rp 4.800', 'Rp 10.000', 'Rp 45.000', 'Rp 35.000', '77,78%'],
    ],
  },
  {
    id: 'coretax-converter',
    number: '04',
    code: 'WEB-04',
    title: 'CoreTax Enterprise XML & CSV Converter',
    subtitle: 'Konverter Faktur Komersial ke Skema Resmi DJP CoreTax v1.6.1 & Rekonsiliasi Pajak DPP 11/12',
    entity: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
    division: 'Tax Compliance & XML Schema Automation',
    stack: ['Next.js 14', 'React', 'XML DOM Builder', 'Decimal.js', 'CSV Parser', 'Skema CoreTax DJP v1.6.1'],
    summary:
      'Saya membangun konverter faktur komersial Excel/CSV menjadi dokumen XML CoreTax DJP (skema v1.6.1) dan CSV siap impor dengan perhitungan DPP Nilai Lain (11/12) serta validasi NPWP 16 digit.',
    metrics: [
      { label: 'Skema DJP', value: 'CoreTax XML v1.6.1' },
      { label: 'Logika DPP', value: 'Nilai Lain 11/12 (PPN 12%)' },
      { label: 'Validasi Identitas', value: 'NPWP 16 Digit & NIK' },
    ],
    problemStatement:
      'Sistem perpajakan CoreTax DJP mewajibkan format dokumen XML faktur pajak keluaran dengan skema v1.6.1. Penyusunan XML manual untuk ratusan faktur penjualan bulanan berisiko gagal validasi skema, salah hitung DPP Nilai Lain, atau terpotong angka nol di depan NPWP 16 digit.',
    workflowSteps: [
      {
        step: '1. Ingesti File Rekapitulasi Invoice Penjualan',
        detail:
          'Menerima file Excel atau CSV rekap transaksi penjualan yang memuat nomor faktur, identitas pembeli, rincian barang, dan harga bruto.',
      },
      {
        step: '2. Pembersihan & Validasi Nomor Identitas Pajak',
        detail:
          'Membersihkan tanda baca titik/strip pada NPWP atau NIK pembeli dan mengunci panjang string tepat 16 digit.',
      },
      {
        step: '3. Perhitungan Otomatis DPP Nilai Lain & PPN 12%',
        detail:
          'Menerapkan formula tarif pajak DPP Nilai Lain 11/12 untuk setiap baris barang menggunakan aritmetika Decimal.js.',
      },
      {
        step: '4. Serialisasi Skema XML DJP v1.6.1 & Ekspor CSV',
        detail:
          'Mengompilasi struktur XML dengan sanitasi karakter khusus (&, <, >, ", \') sehingga berkas siap diunggah ke portal CoreTax DJP.',
      },
    ],
    technicalRules: [
      {
        title: 'Formula DPP Nilai Lain & Tarif Pajak',
        formula: 'DPP Nilai Lain = (11 / 12) * Harga Jual Bruto | PPN = 12% * DPP Nilai Lain',
        explanation:
          'Menggunakan modul Decimal.js agar pembulatan nilai Dasar Pengenaan Pajak dan PPN sesuai ketentuan faktur pajak keluaran.',
      },
      {
        title: 'Sanitasi Karakter Khusus XML (Entity Escape)',
        formula: '& -> &amp; | < -> &lt; | > -> &gt; | " -> &quot; | \' -> &apos;',
        explanation:
          'Mencegah kegagalan baca pada parser XML DJP saat nama barang atau alamat memuat simbol ampersand atau tanda kutip.',
      },
    ],
    sampleInputHeaders: ['No. Invoice', 'Tanggal', 'Nama Pembeli', 'NPWP Mentah', 'Harga Bruto (Rp)'],
    sampleInputRows: [
      ['INV/2026/04/101', '2026-04-05', 'CV Maju Bersama & Co', '09.123.456.7-651.000', '12.000.000'],
      ['INV/2026/04/102', '2026-04-06', 'PT Sentosa Otomotif', '0081928374650001', '24.000.000'],
    ],
    sampleOutputHeaders: ['No. Invoice', 'NPWP 16 Digit Terkunci', 'DPP Nilai Lain (11/12)', 'PPN (12% dari DPP)', 'Status XML v1.6.1'],
    sampleOutputRows: [
      ['INV/2026/04/101', '0091234567651000', 'Rp 11.000.000', 'Rp 1.320.000', 'VALID (Escaped &amp;)'],
      ['INV/2026/04/102', '0081928374650001', 'Rp 22.000.000', 'Rp 2.640.000', 'VALID'],
    ],
  },
  {
    id: 'kopaskap-converter',
    number: '05',
    code: 'WEB-05',
    title: 'Kopaskap Clipper Affiliate Analyzer',
    subtitle: 'Sistem Analitik Kinerja Kreator Afiliasi Video & Kalkulator Komisi Berjenjang (6 Tier)',
    entity: 'PT. Kilap Global Group',
    division: 'Creator Analytics & Tiered Payroll',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Heuristic OCR Parser', 'Gemini Multimodal API', 'Tiering Commission Engine'],
    summary:
      'Saya merancang alat bantu verifikasi tangkapan layar (screenshot) performa video kreator afiliasi TikTok & Instagram untuk mengecek kelayakan SOP tayang, mengekstrak jumlah views, dan menghitung komisi 6 tier.',
    metrics: [
      { label: 'Struktur Komisi', value: '6 Jenjang (Tier 1 - 6)' },
      { label: 'Validasi SOP', value: 'Cek Tagar & Keranjang' },
      { label: 'Output Akhir', value: 'Rekapitulasi Pembayaran' },
    ],
    problemStatement:
      'Tim pemasaran afiliasi harus memeriksa ratusan screenshot bukti tayang dari kreator setiap minggu satu per satu. Pencocokan jumlah views ke tabel komisi berjenjang secara manual rawan salah ketik dan memperlambat pencairan insentif kreator.',
    workflowSteps: [
      {
        step: '1. Unggah Berkas Tangkapan Layar Metrik Video',
        detail:
          'Pengguna mengunggah gambar screenshot analitik video yang dikirimkan oleh mitra afiliasi ke dalam antarmuka pemeriksaan.',
      },
      {
        step: '2. Ekstraksi Metrik Views & Interaksi',
        detail:
          'Sistem membaca angka penayangan (views), likes, komentar, durasi tonton, dan omzet keranjang kuning dari gambar.',
      },
      {
        step: '3. Validasi SOP Konten & Tanggal Tayang',
        detail:
          'Memeriksa pemenuhan syarat minimum: penggunaan tagar kampanye, tautan keranjang produk, dan batas minimal 10.000 views.',
      },
      {
        step: '4. Eksekusi Rule Engine Komisi 6 Jenjang (Tier)',
        detail:
          'Memetakan capaian views ke dalam Tier 1 hingga Tier 6, menghitung nominal insentif per video, lalu mengekspor daftar pembayaran.',
      },
    ],
    technicalRules: [
      {
        title: 'Matriks Jenjang Komisi (6 Tier System)',
        formula: 'T1: 10k-50k | T2: 50k-100k | T3: 100k-250k | T4: 250k-500k | T5: 500k-1M | T6: >1M Views',
        explanation:
          'Setiap rentang penayangan memiliki tarif insentif tetap yang otomatis ditentukan oleh batas ambang bawah dan atas.',
      },
      {
        title: 'Validasi Kepatuhan SOP Minimum',
        formula: 'Eligible = (Hashtag_Resmi == True) & (Keranjang_Kuning == True) & (Views >= 10.000)',
        explanation:
          'Unggahan yang belum memenuhi syarat SOP ditandai untuk ditinjau ulang sebelum masuk ke daftar transfer.',
      },
    ],
    sampleInputHeaders: ['Username Kreator', 'Platform', 'Views Terbaca', 'Tagar Resmi', 'Keranjang Kuning'],
    sampleInputRows: [
      ['@garasi_kilap_id', 'TikTok', '142.800', 'Lengkap', 'Aktif'],
      ['@review_motor_mlg', 'Instagram Reels', '64.200', 'Lengkap', 'Aktif'],
      ['@daily_ride_sub', 'TikTok', '8.400', 'Lengkap', 'Aktif'],
    ],
    sampleOutputHeaders: ['Username Kreator', 'Status SOP', 'Kategori Tier', 'Komisi Disetujui', 'Catatan Audit'],
    sampleOutputRows: [
      ['@garasi_kilap_id', 'Memenuhi Syarat', 'Tier 3 (100k - 250k)', 'Rp 350.000', 'Siap Transfer'],
      ['@review_motor_mlg', 'Memenuhi Syarat', 'Tier 2 (50k - 100k)', 'Rp 175.000', 'Siap Transfer'],
      ['@daily_ride_sub', 'Belum Memenuhi', 'Di Bawah Tier 1 (<10k)', 'Rp 0', 'Views belum mencapai 10.000'],
    ],
  },
];

export const PROFILE_DATA = {
  name: 'Rofiq Samanhudi',
  role: 'Data Engineer / Data Analyst',
  location: 'Malang, Jawa Timur, Indonesia',
  phoneDisplay: '+62 823-4236-4044',
  phoneRaw: '6282342364044',
  whatsappUrl: 'https://wa.me/6282342364044',
  email: 'rofiqsamanhudizz@gmail.com',
  githubUrl: 'https://github.com/rofiqsamanhudi',
  githubHandle: 'github.com/rofiqsamanhudi',
  linkedinUrl: 'https://www.linkedin.com/in/rofiqsamanhudi/',
  linkedinHandle: 'linkedin.com/in/rofiqsamanhudi',
  instagramUrl: 'https://www.instagram.com/rofiqsamanhudi_/',
  instagramHandle: '@rofiqsamanhudi_',
  cvPdfUrl: '/profile/CV-Rofiq-Samanhudi-Data-Analyst.pdf',
  photos: {
    casual: '/profile/foto-casual.jpeg',
    formal: '/profile/foto-formal.jpg',
    landscape: '/profile/foto-bromo.jpeg',
  },
  summary:
    'Lulusan S1 Informatika Universitas Muhammadiyah Malang (Peminatan Data Science, IPK 3.82) dengan fokus utama pada Data Engineering dan Data Analytics. Terbiasa membangun pipeline ETL data operasional berskala besar, pemodelan data relasional (SQL), otomatisasi Python (Pandas, OpenPyXL), analisis data bisnis presisi, serta perancangan dashboard interaktif dan tools internal berbasis Next.js.',
  skillGroups: [
    {
      category: 'Data Analysis & Spreadsheet Engineering',
      items: ['Advanced Excel & Google Sheets', 'XLOOKUP / VLOOKUP & Array Formula', 'Pivot Tables & Data Validation', 'Spreadsheet Macro & Apps Script', 'Cost Control Produksi & Material'],
    },
    {
      category: 'Data Engineering & Python Automation',
      items: ['Python (Pandas, NumPy, OpenPyXL)', 'ETL Pipeline & Data Cleansing', 'SQL & Relational Databases', 'Anomaly & Missing Value Audit', 'DJP CoreTax XML & Tax Reconciliation'],
    },
    {
      category: 'Business Intelligence & Web Systems',
      items: ['Looker Studio Dashboards', 'Next.js (React) Internal Tools', 'Financial & Budget Consolidation', 'Demand Forecasting (WMA)', 'Git & Google Colaboratory'],
    },
  ],
  experiences: [
    {
      role: 'Data Analyst Intern',
      company: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
      period: 'Juli 2026 - November 2026',
      location: 'Malang, Jawa Timur',
      highlights: [
        'Mengembangkan automasi sistem Cost Control Produksi dan kalkulasi biaya material/inventaris operasional ke dalam sistem tracker terstruktur (CostMatrix & Forecast FG).',
        'Merancang skrip ETL dan konverter data transaksi perpajakan (PPN & PPh / CoreTax XML v1.6.1) serta penganalisis komisi kreator afiliasi (Kopaskap) guna mempercepat proses rekonsiliasi data dan mengatasi diskrepansi antar sumber.',
        'Mengolah, membersihkan, dan memvalidasi dataset operasional berskala besar (7 kanal marketplace mingguan, rekonsiliasi stok rak fisik, dan penyesuaian bahan baku) menggunakan Python, SQL, dan Advanced Spreadsheet.',
        'Merancang dan mengembangkan dashboard interaktif menggunakan Looker Studio untuk divisi Finance serta sistem web internal Next.js untuk divisi Finance dan HR guna memantau anggaran vs realisasi kas dan efisiensi operasional.',
        'Menyusun laporan analisis berkala (weekly, monthly, dan kuartalan) untuk tim R&D, Host Live, dan Data guna mengevaluasi performa produk, efektivitas sesi live streaming, serta akurasi data lintas divisi.',
      ],
    },
    {
      role: 'Data Analyst Intern (Magang SKS)',
      company: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
      period: 'Juli 2025 - September 2025',
      location: 'Malang, Jawa Timur',
      highlights: [
        'Merancang dan membangun dashboard interaktif menggunakan Looker Studio untuk divisi B2B guna memantau performa penjualan mitra, tren pesanan, dan capaian target distribusi.',
        'Menyusun laporan analisis berkala (weekly, monthly, dan kuartalan) untuk mendukung evaluasi performa pada tim R&D, Host Live, dan Data.',
        'Melaksanakan pembersihan, standardisasi, dan rekonsiliasi data transaksi operasional multi-channel marketplace serta audit kesesuaian kartu stok gudang.',
      ],
    },
    {
      role: 'Laboratory Assistant',
      company: 'Biro Informasi dan Komunikasi (Infokom) Universitas Muhammadiyah Malang',
      period: '2025',
      location: 'Malang, Jawa Timur',
      highlights: [
        'Memfasilitasi dan membimbing mahasiswa baru lintas program studi dalam memahami konsep dasar Computational Thinking, algoritma dasar, dan manipulasi data terstruktur menggunakan Python.',
        'Memandu jalannya sesi praktikum interaktif dan asistensi teknis langsung dalam penyelesaian mini project pemrograman berbasis studi kasus riil.',
        'Melakukan audit data tugas, review kode, dan penilaian objektif dengan ketelitian tinggi serta memberikan feedback konstruktif guna menjaga akurasi hasil praktikan.',
      ],
    },
  ],
  education: {
    institution: 'Universitas Muhammadiyah Malang (UMM)',
    degree: 'S1 Informatika (Peminatan Data Science)',
    gpa: '3.82 / 4.00',
    period: '2022 - 2026',
    details: [
      'Fokus Keilmuan: Mengambil peminatan Data Science, mendalami analisis data, manajemen data, algoritma pemodelan, serta pengelolaan basis data relasional.',
      'Mata Kuliah Relevan: Basis Data (SQL), Penggalian Data (Data Mining), Pembelajaran Mesin (Machine Learning), dan Statistik & Probabilitas.',
      'Aktivitas Kampus: Terpilih sebagai Asisten Pelatihan Dasar Teknologi Digital (PDTD) di bawah Biro Infokom UMM untuk materi Python dan Computational Thinking.',
    ],
  },
  certifications: [
    { title: 'Database Foundations', issuer: 'Oracle Academy', date: 'Juli 2024', category: 'Relational Database & SQL' },
    { title: 'Foreign Languages for Specific Purposes (FLSP)', issuer: 'Language Center Universitas Muhammadiyah Malang', date: 'Mei 2024', category: 'Language Proficiency' },
    { title: 'CCNAv7: Switching, Routing, and Wireless Essentials', issuer: 'Cisco Networking Academy', date: 'Februari 2024', category: 'Computer Networks' },
    { title: 'CCNAv7: Introduction to Networks', issuer: 'Cisco Networking Academy', date: 'Februari 2024', category: 'Computer Networks' },
    { title: 'Java Fundamentals', issuer: 'Oracle Academy', date: 'Juni 2023', category: 'Software Engineering' },
    { title: 'Java Foundations', issuer: 'Oracle Academy', date: 'April 2023', category: 'Software Engineering' },
    { title: 'Python - Data Science', issuer: 'Sanbercode', date: '2023', category: 'Data Science & Python' },
    { title: 'Guide to Learn Python with AI', issuer: 'DQLab x Xeratic', date: '2023', category: 'Python & Analytics' },
  ],
};

export const ALL_CASES = [
  ...PYTHON_SYSTEMS.map((s) => ({ ...s, groupType: 'python', code: s.code || `PY-${s.number}` })),
  ...WEB_SYSTEMS.map((s) => ({ ...s, groupType: 'web', code: s.code || `WEB-${s.number}` })),
];


