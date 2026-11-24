// Technical documentation dataset for PT. Kilap Global Group systems
// developed by Rofiq Samanhudi.
// Dates reflect the original project folder creation dates. All sample table rows are simulated.

export const PYTHON_SYSTEMS = [
  {
    id: 'forecast-fg',
    date: '18 Sep 2026',
    title: 'Finished Goods Forecasting & Multi-Level BOM Breakdown',
    subtitle: '3-month rolling production plan and automatic packaging/liquid BOM calculator across 7 brands.',
    entity: 'PT. Kilap Global Group',
    division: 'PPIC & Production',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Forecast FG',
    entryFile: 'Perencanaan Produksi FG.ipynb',
    stack: ['Python', 'Pandas', 'NumPy', 'OpenPyXL', 'Google Sheets', 'Google Colab'],
    metrics: [
      { label: 'Brand Scope', value: '7 Brands' },
      { label: 'Horizon', value: '3 Months Rolling' },
      { label: 'Output', value: '5-Sheet Excel' },
    ],
    problemStatement:
      'Monthly production planning lived in disconnected spreadsheets. Rounding differences between sales targets, factory buffers, and multi-level Bill of Materials (BOM) caused recurring variances when ordering bottles, caps, labels, boxes, and bulk liquids.',
    workflowSteps: [
      {
        step: '1. Ingest Monthly Sales & Direct Demand',
        detail:
          'Reads monthly Excel workbooks containing 3-month historical sales (t-3, t-2, t-1) alongside forward direct-selling demand.',
      },
      {
        step: '2. Compute WMA & Plant Buffer',
        detail:
          'Applies Weighted Moving Average weights (0.2, 0.3, 0.5) to recent sales and multiplies by a 1.15 plant capacity buffer.',
      },
      {
        step: '3. Blend Plan with Excel Rounding Parity',
        detail:
          'Combines 60% factory baseline and 40% direct demand using Decimal(ROUND_HALF_UP) so totals match PPIC Excel workbooks.',
      },
      {
        step: '4. Sync Live BOM & Liquid Formulations',
        detail:
          'Fetches live brand BOM sheets and liquid recipes directly from Google Sheets without manual CSV exports.',
      },
      {
        step: '5. Export 5-Sheet Production Workbook',
        detail:
          'Classifies raw materials by SKU prefix and exports Forecasting Produksi.xlsx with bottle, cap, label, box, and liter requirements.',
      },
    ],
    technicalRules: [
      {
        title: 'Weighted Moving Average & Production Blend',
        formula: 'WMA = (0.2 * M_t3) + (0.3 * M_t2) + (0.5 * M_t1) | Plan = 0.6 * (WMA * 1.15) + 0.4 * Direct',
        explanation:
          'Prioritizes the most recent month (50%) while reserving a 15% buffer for factory capacity.',
      },
      {
        title: 'Anti-Banker Rounding Parity',
        formula: "Decimal(str(round(val, 8))).quantize(Decimal('1'), rounding=ROUND_HALF_UP)",
        explanation:
          'Avoids Python round-half-to-even drift at .5 boundaries so counts stay identical to Excel.',
      },
    ],
    codeSnippetTitle: 'Perencanaan Produksi FG.ipynb (Rounding & Material Classifier)',
    codeSnippet: `from decimal import Decimal, ROUND_HALF_UP
import re

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
    sampleInputHeaders: ['SKU', 'Product (Sample)', 'Brand', 't-3', 't-2', 't-1', 'Direct Demand'],
    sampleInputRows: [
      ['KP-EXT-250', 'Quick Shine 250mL', 'KILAP PREMIUM', '1,200', '1,450', '1,800', '950'],
      ['PF-HLM-100', 'Helmet Perfume 100mL', 'PURFRESS', '980', '1,120', '1,340', '600'],
    ],
    sampleOutputHeaders: ['SKU', 'WMA', 'Baseline (115%)', 'Final Plan', 'Bottles (PCS)', 'Liquid (L)'],
    sampleOutputRows: [
      ['KP-EXT-250', '1,575', '1,811', '1,467', '1,467', '366.75 L'],
      ['PF-HLM-100', '1,192', '1,371', '1,063', '1,063', '127.56 L'],
    ],
  },
  {
    id: 'laporan-kardus-fg',
    date: '18 Sep 2026',
    title: 'Logistics Packaging Box & Finished Goods Recap Automation',
    subtitle: 'Automated marketplace order unmerging, box-type matching, and FG revenue summary.',
    entity: 'PT. Kilap Global Group',
    division: 'Logistics & Operations',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Laporan Kardus dan FG Logistik',
    entryFile: 'main.py',
    stack: ['Python', 'Pandas', 'OpenPyXL', 'CLI', 'Jupyter / Colab'],
    metrics: [
      { label: 'Architecture', value: '5 Python Modules' },
      { label: 'Execution', value: 'CLI & Google Colab' },
      { label: 'Output', value: 'Box & FG Workbook' },
    ],
    problemStatement:
      'Marketplace order exports use merged cells for multi-item orders, forcing logistics staff to unmerge rows by hand before determining carton box sizes and summarizing daily Finished Goods revenue.',
    workflowSteps: [
      {
        step: '1. Load Master Dictionaries & Raw Orders',
        detail:
          'data_loader.py reads carton box rules, SKU mappings, and raw marketplace Excel exports.',
      },
      {
        step: '2. Preprocess & Unmerge Multi-Item Orders',
        detail:
          'preprocessor.py filters by target warehouse and propagates order IDs across merged multi-SKU rows.',
      },
      {
        step: '3. Match Carton Box Rules',
        detail:
          'kardus_engine.py assigns single-item or multi-item combination boxes based on order contents.',
      },
      {
        step: '4. Calculate FG Summary & Export',
        detail:
          'fg_engine.py aggregates unit vs bundle turnover and exporter.py writes the formatted Excel report.',
      },
    ],
    technicalRules: [
      {
        title: 'Modular Pipeline Execution',
        formula: 'load_master_data() -> preprocess_orders() -> process_kardus_packing() -> calculate_fg_summary()',
        explanation:
          'Separates ingestion, unmerging, carton matching, and reporting so rules can be updated without touching the CLI or Colab notebooks.',
      },
    ],
    codeSnippetTitle: 'main.py (Logistics Pipeline Orchestrator)',
    codeSnippet: `def run(input_file: str = None, output_file: str = DEFAULT_OUTPUT_FILE, warehouse: str = DEFAULT_WAREHOUSE):
    master_data = load_master_data()
    df_raw, _ = load_transaction_data(input_file)
    master_dicts = parse_master_dictionaries(master_data)
    df_clean = preprocess_orders(df_raw, warehouse_filter=warehouse)
    df_master = process_kardus_packing(df_clean, master_dicts)
    dict_sheet_fg, df_total_fg = calculate_fg_summary(df_master, master_dicts, master_data)
    export_logistics_report(df_master, dict_sheet_fg, df_total_fg, output_file)`,
    sampleInputHeaders: ['Order ID (Sample)', 'Warehouse', 'SKU', 'Qty', 'Order Type'],
    sampleInputRows: [
      ['ORD-2609-001', 'Malang Utama', 'KP-EXT-250', '1', 'Single SKU'],
      ['ORD-2609-002', 'Malang Utama', 'KP-EXT-250 + PF-HLM-100', '2', 'Multi-Item Merged'],
    ],
    sampleOutputHeaders: ['Order ID (Sample)', 'Assigned Box', 'Total FG Qty', 'Category'],
    sampleOutputRows: [
      ['ORD-2609-001', 'Kardus Single 250mL', '1', 'Satuan'],
      ['ORD-2609-002', 'Kardus Kombinasi M', '2', 'Bundling'],
    ],
  },
  {
    id: 'penyesuaian-bb',
    date: '18 Sep 2026',
    title: 'Raw Material Stock Adjustment Splitter',
    subtitle: 'Splits monthly warehouse variance sheets into 4 audit-ready Excel adjustment files.',
    entity: 'PT. Kilap Global Group',
    division: 'Warehouse & Inventory',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Penyesuaian BB',
    entryFile: 'main.py',
    stack: ['Python', 'OpenPyXL', 'Modular ETL', 'CLI & Colab'],
    metrics: [
      { label: 'Outputs / Period', value: '4 Excel Files' },
      { label: 'Schema', value: '15 Standard Columns' },
      { label: 'Zero Variance', value: 'Auto-Skipped' },
    ],
    problemStatement:
      'Monthly raw material variance reports combined liquid/chemical materials and dry packaging across two warehouse groups, each requiring different unit-column formatting for accounting import.',
    workflowSteps: [
      {
        step: '1. Extract Monthly Variance Workbook',
        detail:
          'extractor.py reads raw monthly stock comparison sheets from data/raw/ and validates column headers.',
      },
      {
        step: '2. Route by Warehouse & Unit Type',
        detail:
          'transformer.py separates wet/chemical units (ML, GRAM, LITER, KG) from dry units (PCS, CM) across Raw Material and Production warehouses.',
      },
      {
        step: '3. Apply Sign & Unit Formatting Rules',
        detail:
          'Skips zero-variance rows, maps negative diffs to Pengurangan with abs(diff), positive diffs to Penambahan, and clears unit cells for dry items.',
      },
      {
        step: '4. Export 4 Corporate-Styled Workbooks',
        detail:
          'exporter.py generates BASAH, KERING, PRODUKSI-BASAH, and PRODUKSI-KERING .xlsx files.',
      },
    ],
    technicalRules: [
      {
        title: 'Wet vs Dry Unit Classification',
        formula: 'is_basah(unit) -> unit in {ML, GRAM, LITER, KG} | KERING -> unit = None',
        explanation:
          'Ensures accounting import templates receive explicit units for liquid materials and blank unit cells for piece-based packaging.',
      },
    ],
    codeSnippetTitle: 'src/transformer.py (Wet Material Adjustment Routing)',
    codeSnippet: `def is_basah(satuan: str | None) -> bool:
    return (satuan or "").strip().upper() in SATUAN_BASAH

def transform_basah(items: list[dict]) -> list[tuple]:
    rows = []
    for item in items:
        diff = item["selisih_basah"]
        if diff is None or not is_basah(item["satuan"]):
            continue
        tipe = "Pengurangan" if diff < 0 else "Penambahan"
        rows.append(create_row(
            item["nama"], item["kode"], item["satuan"],
            abs(diff), GUDANG_BAHAN_BAKU_BASAH, tipe
        ))
    return rows`,
    sampleInputHeaders: ['Material (Sample)', 'Warehouse', 'Unit', 'Variance'],
    sampleInputRows: [
      ['Silicone Emulsion', 'GUDANG BAHAN BAKU', 'LITER', '-1.5'],
      ['Trigger Cap 28mm', 'GUDANG BAHAN BAKU', 'PCS', '+12'],
      ['HDPE Bottle 250mL', 'GUDANG PRODUKSI', 'PCS', '0'],
    ],
    sampleOutputHeaders: ['Target File', 'Type', 'Qty', 'Unit Cell'],
    sampleOutputRows: [
      ['item-adjustment-BASAH.xlsx', 'Pengurangan', '1.5', 'LITER'],
      ['item-adjustment-KERING.xlsx', 'Penambahan', '12', '(Blank)'],
    ],
  },
  {
    id: 'rekonsiliasi-stok-rak',
    date: '28 Oct 2026',
    title: 'Field Rack Stock Reconciliation vs Master Spreadsheet',
    subtitle: 'Matches physical warehouse rack counts against live Google Sheets master stock.',
    entity: 'PT. Kilap Global Group',
    division: 'Warehouse & Inventory Audit',
    localPath: 'C:\\Rofiq\\KGG\\Project\\NEW STOK & INVENTARIS',
    entryFile: 'Rekonsiliasi_Stok_Colab.ipynb',
    stack: ['Python', 'Pandas', 'OpenPyXL', 'Google Sheets', 'Google Colab'],
    metrics: [
      { label: 'Master Source', value: 'Live Sheet (Rak)' },
      { label: 'Scope Guard', value: 'Audited Racks Only' },
      { label: 'Output', value: 'Adjustment Excel' },
    ],
    problemStatement:
      'Field stock opname sheets recorded expiry batches in inconsistent text formats and only covered a subset of warehouse racks per day, causing false variances if compared against the entire warehouse master.',
    workflowSteps: [
      {
        step: '1. Pull Live Master Rack Sheet',
        detail:
          'Authenticates in Google Colab and fetches the official Rak sheet directly from Google Sheets.',
      },
      {
        step: '2. Normalize Expiry Batch Codes',
        detail:
          'Standardizes inconsistent batch/month strings and empty markers (-, NAN, NONE, []) via normalize_batch().',
      },
      {
        step: '3. Isolate Audited Rack Addresses',
        detail:
          'Restricts comparison strictly to rack locations present in the day field count file.',
      },
      {
        step: '4. Export Stock Adjustment Report',
        detail:
          'Generates styled Excel adjustment outputs (PENYESUAIAN_STOK) highlighting exact rack variances.',
      },
    ],
    technicalRules: [
      {
        title: 'Batch Code Normalization',
        formula: "normalize_batch(b) -> '' if b in {'-', 'NAN', 'NONE', '[]', ''} else regex_month_year(b)",
        explanation:
          'Prevents identical batches written with different spacing or casing from appearing as split stock lines.',
      },
    ],
    codeSnippetTitle: 'Rekonsiliasi_Stok_Colab.ipynb (Master Sync & Batch Normalizer)',
    codeSnippet: `SPREADSHEET_URL = "https://docs.google.com/spreadsheets/d/1_Qaqk8jGsMshCwXMPV0eY0yiZRVOl7EN9to0oDb20WM/edit?gid=1857499693"
SHEET_GID = 1857499693

def normalize_batch(b):
    if not b:
        return ''
    b = str(b).strip().upper()
    if b in ['-', 'NAN', 'NONE', '[]', '']:
        return ''
    return b`,
    sampleInputHeaders: ['Rack (Sample)', 'SKU', 'Batch', 'Master Qty', 'Field Count'],
    sampleInputRows: [
      ['R-A1-02', 'KP-EXT-250', 'NOV 2026', '120', '118'],
      ['R-B2-01', 'PF-HLM-100', 'nov26', '80', '80'],
    ],
    sampleOutputHeaders: ['Rack (Sample)', 'SKU', 'Delta', 'Action'],
    sampleOutputRows: [
      ['R-A1-02', 'KP-EXT-250', '-2', 'Adjustment Required'],
      ['R-B2-01', 'PF-HLM-100', '0', 'Matched'],
    ],
  },
];

export const WEB_SYSTEMS = [
  {
    id: 'coretax-converter',
    date: '18 Sep 2026',
    title: 'CoreTax DJP v1.6.1 XML & Excel Invoice Converter',
    subtitle: 'Converts Accurate sales reports and POs into CoreTax-compliant XML and Excel exports.',
    entity: 'PT. Kilap Global Group',
    division: 'Tax & Finance Compliance',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Coretax Converter',
    entryFile: 'gas-converter/backend/Code.gs',
    stack: ['Google Apps Script', 'HTML/CSS/JS', 'ExcelJS', 'Google Sheets', 'CoreTax XML v1.6.1'],
    metrics: [
      { label: 'Compliance', value: 'CoreTax v1.6.1' },
      { label: 'Identity Lock', value: '22-Digit NITKU' },
      { label: 'Exports', value: 'Bulk XML & XLSX' },
    ],
    problemStatement:
      'Preparing outbound tax invoices from Purchase Orders and Accurate sales reports required manual NPWP/NITKU formatting, footer-total cleanup, and 11/12 DPP Nilai Lain tax calculations.',
    workflowSteps: [
      {
        step: '1. Parse PO, Accurate Export, or CoreTax XML',
        detail:
          'Extracts invoice headers, buyer profiles, and line items while stripping aggregate footer rows from multi-invoice Accurate files.',
      },
      {
        step: '2. Validate Tax IDs & Entity Locks',
        detail:
          'Matches 15/16-digit NPWP against Google Sheets and formats 22-digit NITKU (NPWP16 + 000000) with role locks (A-01 seller, A-02 dual, A-03+ buyer).',
      },
      {
        step: '3. Compute DPP Nilai Lain & PPN 12%',
        detail:
          'Calculates DPP = (11 / 12) * Base Price and PPN = 12% * DPP for Transaction Code 04.',
      },
      {
        step: '4. Preview & Export Bulk XML / Excel',
        detail:
          'Displays an interactive filterable table before exporting TaxInvoiceBulk XML and CoreTax v1.6.1 ExcelJS workbooks.',
      },
    ],
    technicalRules: [
      {
        title: 'DPP Nilai Lain & PPN 12% Formula (Code 04)',
        formula: 'DPP_Nilai_Lain = (11 / 12) * Base_Price | PPN = DPP_Nilai_Lain * 0.12 | NITKU = NPWP16 + "000000"',
        explanation:
          'Standardizes tax base calculation and 22-digit sub-unit IDs required by DJP CoreTax v1.6.1.',
      },
    ],
    codeSnippetTitle: 'PANDUAN_SKEMA_PAJAK.md / ScriptPartials (Tax & NITKU Rules)',
    codeSnippet: `// CoreTax DJP v1.6.1 Tax & NITKU Standardization
const nitku = npwp16.padEnd(22, '0'); // NPWP 16-digit + 000000
const dppNilaiLain = (11 / 12) * baseAmount;
const ppn12 = dppNilaiLain * 0.12;`,
    sampleInputHeaders: ['Source (Sample)', 'Entity Role', 'NPWP16', 'Base Amount (IDR)'],
    sampleInputRows: [
      ['PO-4101762557', 'A-01 Seller (KGG)', '0000000000000001', '12,000,000'],
      ['Accurate Multi-Invoice', 'A-03 Buyer', '0000000000000002', '6,000,000'],
    ],
    sampleOutputHeaders: ['NITKU (22-Digit)', 'DPP Nilai Lain (11/12)', 'PPN 12%', 'Format'],
    sampleOutputRows: [
      ['0000000000000001000000', '11,000,000', '1,320,000', 'XML + XLSX v1.6.1'],
      ['0000000000000002000000', '5,500,000', '660,000', 'XML + XLSX v1.6.1'],
    ],
  },
  {
    id: 'ksb-costmatrix',
    date: '18 Sep 2026',
    title: 'KGG CostMatrix: COGS, BOM Audit & R&D Simulator',
    subtitle: 'Full-stack manufacturing cost calculator syncing 6 Google Spreadsheets with BigQuery sales.',
    entity: 'PT. Kilap Global Group',
    division: 'Finance, PPIC & R&D',
    localPath: 'C:\\Rofiq\\KGG\\Project\\KSB CostMatrix',
    entryFile: 'api/initial-data.js',
    stack: ['Vite 6', 'JavaScript', 'Vercel Serverless', 'Google Sheets API', 'IndexedDB', 'BigQuery'],
    metrics: [
      { label: 'Catalog Scope', value: '690+ FG SKUs' },
      { label: 'Formulas', value: '64 Liquid Recipes' },
      { label: 'Data Sources', value: '6 Master Sheets' },
    ],
    problemStatement:
      'Calculating unit COGS (HPP) across 7 brands required combining live PO prices, mixed purchase units, 64 liquid formulas, 178 machine depreciations, and outer carton BOMs.',
    workflowSteps: [
      {
        step: '1. Live Sync 6 Master Google Spreadsheets',
        detail:
          'Server endpoints (/api/initial-data, /api/simulasi) compile PO history, FG catalogs, BOMs, asset depreciation, and BigQuery sales snapshots.',
      },
      {
        step: '2. Client IndexedDB Cache (AppCache)',
        detail:
          'Stores compiled master data in IndexedDB so repeat visits load instantly while syncing updates in the background.',
      },
      {
        step: '3. Single-Pass Unit Conversion (Converter BB)',
        detail:
          'Normalizes mixed PO units (LEMBAR/PCS, KG/GRAM, DRUM/LITER) into BOM usage units without double division.',
      },
      {
        step: '4. 3-Mode R&D Simulator & Sales Reconciliation',
        detail:
          'Simulates Liquid Recipes, Finished Goods, and Bundling (with outer-box deduplication), and reconciles MKP sales against live COGS.',
      },
    ],
    technicalRules: [
      {
        title: '3-Layer FG Cost Structure',
        formula: 'HPP_FG = Liquid_Cost + Packaging_BOM + (Box + Wraps + Machine_Dep + Labor + Logistics + Guarantee)',
        explanation:
          'Combines formula batch cost, primary packaging, and 6 uniform factory overhead components plus brand guarantee kits.',
      },
    ],
    codeSnippetTitle: 'api/initial-data.js & lib/liveEngine.js (Architecture Summary)',
    codeSnippet: `// Sync flow: 6 Google Spreadsheets -> Vercel Serverless -> IndexedDB AppCache
// Modes: 1) Liquid Formula Simulator -> 2) FG Cost Calculator -> 3) Bundle Deduplication`,
  },
  {
    id: 'kopaskap-converter',
    date: '06 Oct 2026',
    title: 'Kopaskap Affiliate Screenshot & Reward Calculator',
    subtitle: 'Extracts TikTok & Instagram video views from ZIP screenshot batches using Gemini AI.',
    entity: 'PT. Kilap Global Group',
    division: 'Affiliate & Creator Growth',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Kopaskap Converter',
    entryFile: 'gas/Code.gs',
    stack: ['Google Apps Script', 'HTML/CSS/JS', 'Gemini AI', 'Google Sheets', 'JSZip'],
    metrics: [
      { label: 'Reward Structure', value: '6 View Tiers' },
      { label: 'Input', value: 'ZIP Screenshot Batch' },
      { label: 'Output', value: 'CSV, Sheets & WA' },
    ],
    problemStatement:
      'Verifying creator affiliate payouts meant manually opening dozens of TikTok/Instagram analytics screenshots per creator and matching view counts to 6 reward tiers.',
    workflowSteps: [
      {
        step: '1. Upload Creator ZIP Archive',
        detail:
          'Unpacks creator screenshot batches in the browser and downscales images before processing.',
      },
      {
        step: '2. Extract View Counts via Gemini AI',
        detail:
          'Sends screenshots to Gemini AI using the user-supplied API key and populates an editable recap table.',
      },
      {
        step: '3. Apply 6-Tier Reward Rules',
        detail:
          'Automatically maps each video view count to its payout tier (from 600-999 views at Rp 5,000 up to 1,000,000+ at Rp 1,000,000).',
      },
      {
        step: '4. Export CSV, WhatsApp Chat, or Google Sheets',
        detail:
          'Generates formatted payout summaries ready to copy into WhatsApp or save directly to Google Sheets.',
      },
    ],
    technicalRules: [
      {
        title: '6-Tier Video View Payout Table',
        formula: '<600: Rp 0 | 600-999: Rp 5k | 1k-9.9k: Rp 15k | 10k-99.9k: Rp 50k | 100k-999.9k: Rp 100k | 1M+: Rp 1M',
        explanation:
          'Calculates rewards per individual video with no minimum upload count requirement.',
      },
    ],
    codeSnippetTitle: 'data/information.txt (Verified Payout Tier Specification)',
    codeSnippet: `- Views 600 - 999         -> Rp 5.000
- Views 1.000 - 9.999     -> Rp 15.000
- Views 10.000 - 99.999   -> Rp 50.000
- Views 100.000 - 999.999 -> Rp 100.000
- Views >= 1.000.000      -> Rp 1.000.000`,
  },
  {
    id: 'dashboard-hr',
    date: '08 Oct 2026',
    title: 'HR & Talent Acquisition Portal (ATS)',
    subtitle: 'Kanban recruitment pipeline, Google Drive CV archive, and Gemini AI CV parser.',
    entity: 'PT. Kilap Global Group',
    division: 'HR & Talent Acquisition',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Dashboard HR',
    entryFile: 'pages/index.js',
    stack: ['Next.js 16', 'React', 'Google Sheets API', 'Google Drive API', 'Gemini Flash', 'Vercel'],
    metrics: [
      { label: 'Sync Interval', value: '15s Auto-Poll' },
      { label: 'Concurrency', value: '4 Recruiters' },
      { label: 'CV Parser', value: 'Gemini Flash' },
    ],
    problemStatement:
      'Managing applicants across spreadsheets risked row overwrites when multiple recruiters edited simultaneously, while reading PDF/DOCX CVs manually delayed shortlisting.',
    workflowSteps: [
      {
        step: '1. Two-Way Google Sheets & Drive Sync',
        detail:
          'Polls Google Drive metadata (/api?action=checkDataVersion) every 15 seconds and listens to Apps Script onSpreadsheetEditTrigger webhooks.',
      },
      {
        step: '2. Anti-Overwrite Row Verification',
        detail:
          'Verifies candidate identity before writing updates so concurrent edits across 4 recruiters never overwrite another applicant.',
      },
      {
        step: '3. AI CV Extraction & Drive Archiving',
        detail:
          'Extracts name, WhatsApp, email, location, education, and skills from PDF/DOCX/image CVs using Gemini Flash and files them by job opening.',
      },
      {
        step: '4. Responsive Kanban & Mobile Bottom Nav',
        detail:
          'Provides drag/stage Kanban columns on desktop and 86vw snap-carousel + bottom-sheet drawers on mobile.',
      },
    ],
    technicalRules: [
      {
        title: 'Quota-Safe Version Polling',
        formula: 'GET /api?action=checkDataVersion -> compare Drive (version, modifiedTime) every 15s',
        explanation:
          'Fetches full sheet rows only when Drive metadata indicates an actual change, keeping API usage low.',
      },
    ],
    codeSnippetTitle: 'api/index.js (Sync & Anti-Overwrite Flow)',
    codeSnippet: `// 1) Check Drive file version & modifiedTime
// 2) Match candidate ID before row mutation to prevent concurrent overwrite
// 3) Archive uploaded CV to position-specific Google Drive folder`,
  },
  {
    id: 'dashboard-finance',
    date: '26 Oct 2026',
    title: 'KGG & KSB Executive Finance Monitoring Dashboard',
    subtitle: 'Budget (RAB) vs actual cash-out tracker across entities, divisions, and brands.',
    entity: 'PT. Kilap Global Group',
    division: 'Finance & Executive',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Dashboard Finance',
    entryFile: 'src/app/page.js',
    stack: ['Next.js 16', 'React 19', 'Recharts', 'ExcelJS', 'Google Sheets', 'HMAC Auth'],
    metrics: [
      { label: 'Entities', value: 'KGG & KSB' },
      { label: 'Views', value: '5 Analytical Tabs' },
      { label: 'Access', value: 'HMAC Cookie Auth' },
    ],
    problemStatement:
      'Management needed a unified view of budget allocations (RAB) versus realized cash outflows across PT Kilap Global Group (KGG) and PT Kilapkan Seluruh Bangsa (KSB) without exposing raw sheets.',
    workflowSteps: [
      {
        step: '1. Authenticate via HMAC Cookie Gate',
        detail:
          'Protects financial endpoints with full-access and department-restricted login levels via /api/auth.',
      },
      {
        step: '2. Fetch & Normalize RAB + Realization Sheets',
        detail:
          'Pulls RAB KGG, RAB KSB, Rincian Realisasi KGG, and Rincian Realisasi KSB from Google Sheets with server-side caching.',
      },
      {
        step: '3. Multi-Dimensional Aggregation',
        detail:
          'Filters by entity, period (YTD, Quarter, Month, Year, Custom), division, brand, and RAB approval status.',
      },
      {
        step: '4. Drill-Down Charts & Multi-Sheet Excel Export',
        detail:
          'Renders KPI cards, Recharts cash-flow trends, Budget Matrix modals, Realization Ledger, and formatted ExcelJS reports.',
      },
    ],
    technicalRules: [
      {
        title: 'Dual-Tier Access Control',
        formula: 'DASHBOARD_PASSWORD -> Full Access | DASHBOARD_RESTRICTED_PASSWORD -> Excludes SDM HR (KSB)',
        explanation:
          'Separates executive full-entity visibility from restricted departmental views at the API layer.',
      },
    ],
    codeSnippetTitle: 'src/lib/aggregate.js & src/lib/auth.js (Dashboard Flow)',
    codeSnippet: `// Server-side HMAC session verification -> Google Sheets GViz/CSV fetch
// -> normalize transactions -> aggregate KPIs, Budget Matrix & ExcelJS export`,
  },
];

export const ACADEMIC_SYSTEMS = [
  {
    id: 'tpe-melanoma-ensemble',
    date: '2026',
    title: 'Melanoma Classification with Bayesian TPE & Ensemble Transfer Learning',
    subtitle: 'Undergraduate Thesis (Skripsi): Bayesian TPE optimization across 4 CNN and ViT architectures.',
    entity: 'Universitas Muhammadiyah Malang (UMM)',
    division: 'Undergraduate Thesis (Skripsi)',
    githubUrl: 'https://github.com/rofiqsamanhudi/Tree-Structured-Parzen-Estimator',
    eprintsUrl: 'https://eprints.umm.ac.id/id/eprint/34406/',
    stack: ['PyTorch', 'Vision Transformer (ViT)', 'DenseNet-121', 'InceptionV3', 'Xception', 'Bayesian Optimization (TPE)'],
    metrics: [
      { label: 'Backbones', value: '4 CNN & ViT Models' },
      { label: 'Optimizer', value: 'Bayesian TPE' },
      { label: 'Checkpoint', value: 'ensemble_best.pth' },
    ],
    problemStatement:
      'Dermoscopic melanoma classification varies widely across single-model backbones due to receptive field differences and hyperparameter sensitivity. Manual grid or random search consumes heavy GPU compute without guaranteeing optimal ensemble weights.',
    workflowSteps: [
      {
        step: '1. Multi-Resolution Dermoscopic Preprocessing',
        detail:
          'Normalizes dermoscopic images with ImageNet statistics and resizes to 224x224 (DenseNet-121, ViT) and 299x299 (InceptionV3, Xception).',
      },
      {
        step: '2. Bayesian Optimization per Backbone (TPE)',
        detail:
          'Uses Tree-Structured Parzen Estimator to optimize learning rates, weight decay, and dropout ratios per architecture.',
      },
      {
        step: '3. Weighted Probability Ensemble Fusion',
        detail:
          'Combines calibrated softmax predictions from all 4 tuned backbones into a single portable ensemble_best.pth checkpoint.',
      },
    ],
    technicalRules: [
      {
        title: 'Bayesian Expected Improvement & Weighted Ensemble',
        formula: 'P_ens(c) = sum(w_k * Softmax(z_k)_c) for k in {DenseNet-121, InceptionV3, Xception, ViT}',
        explanation:
          'Tunes each backbone independently via TPE Expected Improvement, then fuses class probabilities with convex weights summing to 1.0.',
      },
    ],
  },
  {
    id: 'alzheimer-mri-detection',
    date: '2025',
    title: 'Brain MRI Alzheimer Disease Multiclass Detection',
    subtitle: 'Comparative study of classical texture descriptors, CNNs, and Vision Transformers with LoRA fine-tuning.',
    entity: 'Universitas Muhammadiyah Malang (UMM)',
    division: 'Biomedical Computer Vision',
    githubUrl: 'https://github.com/rofiqsamanhudi/alzheimer-detection',
    liveUrl: 'https://alzheimer-detection-rofiqsamanhudi.streamlit.app/',
    stack: ['PyTorch', 'Vision Transformer (ViT-B/16)', 'LoRA Fine-Tuning', 'ResNet-50', 'EfficientFormer', 'Streamlit'],
    metrics: [
      { label: 'ViT-B/16 Accuracy', value: '96.57%' },
      { label: 'ResNet-50 LoRA', value: '95.45%' },
      { label: 'Classes', value: '4 Alzheimer Stages' },
    ],
    problemStatement:
      'Differentiating subtle brain tissue atrophy across 4 Alzheimer stages (Non-Demented, Very Mild, Mild, Moderate Demented) from MRI scans requires benchmarking whether Vision Transformers and parameter-efficient LoRA adapters outperform classical texture descriptors.',
    workflowSteps: [
      {
        step: '1. Brain MRI Normalization',
        detail:
          'Standardizes axial MRI slices with contrast adjustment and background noise removal.',
      },
      {
        step: '2. Classical Descriptors vs Deep Backbones',
        detail:
          'Evaluates hand-crafted features (FFT, GLCM, HOG, Hu, LBP, Wavelet, Zernike, GIST) alongside CNNs, EfficientFormer, and ViT-B/16.',
      },
      {
        step: '3. Parameter-Efficient LoRA & Streamlit Deployment',
        detail:
          'Applies low-rank LoRA adapters to ResNet-50 (95.45% accuracy) and deploys interactive MRI inference on Streamlit.',
      },
    ],
    technicalRules: [
      {
        title: 'LoRA Low-Rank Adaptation',
        formula: 'W = W_0 + (alpha / r) * (B * A) | ViT-B/16 = 96.57% | ResNet-50 LoRA = 95.45%',
        explanation:
          'Freezes pretrained backbone weights W_0 and trains compact low-rank matrices A and B for efficient medical image fine-tuning.',
      },
    ],
  },
  {
    id: 'skin-disease-detection',
    date: '2025',
    title: 'Multiclass Dermatological Disease Classification & Web App',
    subtitle: 'End-to-end deep learning classification across 22 skin disease categories with Streamlit UI.',
    entity: 'Universitas Muhammadiyah Malang (UMM)',
    division: 'Machine Learning Practicum (UAP)',
    githubUrl: 'https://github.com/rofiqsamanhudi/skin-disease-detection',
    liveUrl: 'https://skin-disease-detection-sdszshzhy4kvvgmrcxynnq.streamlit.app/',
    stack: ['Python 3.12', 'PyTorch', 'Streamlit', 'OpenCV', 'ResNet-101', 'ConvNeXt-Base'],
    metrics: [
      { label: 'Disease Classes', value: '22 Categories' },
      { label: 'Models Tested', value: 'CNN, ResNet-101, ConvNeXt' },
      { label: 'Deployment', value: 'Streamlit Cloud' },
    ],
    problemStatement:
      'Visual triage across 22 skin conditions (including Eczema, Psoriasis, Melanoma, Basal Cell Carcinoma, and Impetigo) requires handling varied lighting and skin tones while keeping inference lightweight for web deployment.',
    workflowSteps: [
      {
        step: '1. 22-Class Dataset Curation & Augmentation',
        detail:
          'Maps lesion categories and applies random rotation, affine transforms, color jitter, and Gaussian blur.',
      },
      {
        step: '2. Backbone Benchmarking',
        detail:
          'Trains and compares a custom CNN, ResNet-101, and ConvNeXt-Base using multi-class cross-entropy loss.',
      },
      {
        step: '3. Interactive Streamlit Inference',
        detail:
          'Outputs top-k differential probability rankings so users can inspect confidence across candidate conditions.',
      },
    ],
    technicalRules: [
      {
        title: 'Top-k Differential Classification',
        formula: 'Softmax(z)_c -> Top-k ranked probabilities across 22 dermatological classes',
        explanation:
          'Presents calibrated top-k predictions rather than a single opaque label to support visual screening.',
      },
    ],
  },
  {
    id: 'cbr-supreme-court-precedents',
    date: '2025',
    title: 'Case-Based Reasoning & NLP for Supreme Court Decisions',
    subtitle: 'Automated judicial PDF extraction, case indexing, and legal precedent retrieval engine.',
    entity: 'Universitas Muhammadiyah Malang (UMM)',
    division: 'Legal NLP & Case-Based Reasoning',
    githubUrl: 'https://github.com/rofiqsamanhudi/CBR_putusan-MA',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NLP', 'TF-IDF', 'Cosine Similarity', 'SVM'],
    metrics: [
      { label: 'Accuracy', value: '90.0% (TF-IDF + Cosine)' },
      { label: 'Precision', value: '1.00' },
      { label: 'F1-Score', value: '0.947' },
    ],
    problemStatement:
      'Analyzing Indonesian Supreme Court civil rulings on Perbuatan Melawan Hukum (PMH) manually from lengthy PDF documents takes hours when searching for matching legal precedents.',
    workflowSteps: [
      {
        step: '1. Supreme Court PDF Ingestion',
        detail:
          'Extracts raw judicial text from Indonesian Supreme Court civil dispute PDFs.',
      },
      {
        step: '2. Legal Text Cleaning & Structuring',
        detail:
          'Strips procedural boilerplate and segments legal facts (posita) and rulings (petitum) into a structured case base.',
      },
      {
        step: '3. Precedent Retrieval & Classification',
        detail:
          'Ranks similar historical cases with TF-IDF + Cosine Similarity (90.0% accuracy, 1.00 precision, 0.947 F1) and benchmarks against SVM (85.0% accuracy).',
      },
    ],
    technicalRules: [
      {
        title: 'TF-IDF Cosine Similarity vs SVM Benchmark',
        formula: 'TF-IDF + Cosine: Acc 0.900, Prec 1.000, F1 0.947 | TF-IDF + SVM: Acc 0.850, F1 0.862',
        explanation:
          'Vectorizes legal case representations to retrieve the closest matching Supreme Court precedents.',
      },
    ],
  },
];

export const PROFILE_DATA = {
  name: 'Rofiq Samanhudi',
  role: 'Research & Data Analyst',
  targetRole: 'Research and Data Analyst / Data Engineer',
  location: 'Malang, East Java, Indonesia (Open to Relocation / Bandung & Jakarta)',
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
  cvPdfUrl: '/profile/CV-Rofiq-Samanhudi.pdf',
  summary:
    'Informatics graduate specializing in Data Science from Universitas Muhammadiyah Malang (GPA 3.82 / 4.00). Bridges quantitative research rigor with practical data engineering, from statistical classification and hypothesis testing to automated Python ETL/ELT pipelines, SQL data modeling, and executive Looker Studio dashboards. Proven track record in multi-channel e-commerce data consolidation, demand forecasting, and operational reconciliation.',
  skillGroups: [
    {
      category: 'Data Engineering & Automation',
      items: [
        'Python',
        'Pandas & NumPy',
        'PyTorch & Scikit-Learn',
        'ETL & ELT Pipelines',
        'OpenPyXL (Excel Automation)',
        'Google Apps Script',
        'Data Cleaning & Regex',
        'Google Sheets API',
      ],
    },
    {
      category: 'Analysis & Operations',
      items: [
        'Exploratory Data Analysis (EDA)',
        'Demand Forecasting',
        'Bill of Materials (BOM)',
        'Inventory Reconciliation',
        'Multi-Channel Sales Aggregation',
        'Cost of Goods Sold (COGS)',
      ],
    },
    {
      category: 'Database & Visualization',
      items: [
        'SQL (MySQL)',
        'Google BigQuery',
        'Advanced Excel & Pivot Tables',
        'Looker Studio',
        'Streamlit',
        'Data Visualization (Matplotlib)',
        'Next.js & React',
        'Vercel (Hosting & Deployment)',
        'DJP CoreTax XML',
      ],
    },
  ],
  experiences: [
    {
      role: 'Data Analyst Intern',
      company: 'PT. Kilap Global Group',
      period: 'July 2026 - November 2026',
      location: 'Malang, East Java, Indonesia',
      highlights: [
        'Developed automated production cost-control systems and material inventory tracking models (CostMatrix & Finished Goods Forecast).',
        'Engineered ETL scripts and data converters for statutory tax filings (CoreTax XML v1.6.1) and creator affiliate commission audits, accelerating cross-departmental reconciliation.',
        'Cleaned, audited, and validated large-scale operational datasets across 7 e-commerce marketplace channels, physical rack stocks, and raw material adjustments using Python, SQL, and advanced spreadsheets.',
        'Built interactive Looker Studio dashboards and internal Next.js web applications for Finance and HR to track budget allocations versus actual cash flow and hiring pipelines.',
        'Prepared recurring weekly, monthly, and quarterly performance analyses for R&D, live streaming, and data teams to evaluate product traction and data consistency.',
      ],
    },
    {
      role: 'Data Analyst Intern (Academic Internship)',
      company: 'PT. Kilap Global Group',
      period: 'July 2025 - September 2025',
      location: 'Malang, East Java, Indonesia',
      highlights: [
        'Designed and deployed interactive Looker Studio dashboards for the B2B division to track partner sales performance, order momentum, and territory targets.',
        'Produced periodic analytical reports supporting strategic review sessions across R&D, live streaming operations, and inventory control.',
        'Conducted data standardization, cleansing, and multi-channel reconciliation for e-commerce transactions alongside warehouse inventory verification.',
      ],
    },
    {
      role: 'Laboratory Teaching Assistant',
      company: 'Biro Informasi dan Komunikasi (Infokom), Universitas Muhammadiyah Malang',
      period: '2025',
      location: 'Malang, East Java, Indonesia',
      highlights: [
        'Mentored undergraduate students across academic disciplines in fundamental Computational Thinking, algorithmic problem-solving, and structured data manipulation using Python.',
        'Facilitated interactive laboratory sessions and provided hands-on guidance on practical programming projects based on real-world case studies.',
        'Reviewed code submissions and conducted objective technical evaluations with rigorous attention to detail, providing constructive feedback.',
      ],
    },
  ],
  education: {
    institution: 'Universitas Muhammadiyah Malang (UMM)',
    degree: 'Informatics (Data Science Specialization)',
    gpa: '3.82 / 4.00',
    period: '2022 - 2026',
    details: [
      'Academic Major: Informatics with specialization in Data Science, focusing on quantitative research, statistical analysis, database architecture, and machine learning.',
      'Relevant Coursework: Relational Databases (SQL), Data Mining, Machine Learning, and Probability & Statistics.',
      'Campus Leadership: Selected as Teaching Assistant for Basic Digital Technology Training (PDTD) under Biro Infokom Universitas Muhammadiyah Malang, mentoring students in Python.',
    ],
  },
  certifications: [
    { title: 'Database Foundations', issuer: 'Oracle Academy', date: 'July 2024', category: 'Relational Database & SQL' },
    { title: 'Foreign Languages for Specific Purposes (FLSP)', issuer: 'Language Center Universitas Muhammadiyah Malang', date: 'May 2024', category: 'Language Proficiency' },
    { title: 'CCNAv7: Switching, Routing, and Wireless Essentials', issuer: 'Cisco Networking Academy', date: 'February 2024', category: 'Computer Networks' },
    { title: 'CCNAv7: Introduction to Networks', issuer: 'Cisco Networking Academy', date: 'February 2024', category: 'Computer Networks' },
    { title: 'Java Fundamentals', issuer: 'Oracle Academy', date: 'June 2023', category: 'Software Engineering' },
    { title: 'Java Foundations', issuer: 'Oracle Academy', date: 'April 2023', category: 'Software Engineering' },
    { title: 'Python - Data Science', issuer: 'Sanbercode', date: '2023', category: 'Data Science & Python' },
    { title: 'Guide to Learn Python with AI', issuer: 'DQLab x Xeratic', date: '2023', category: 'Python & Analytics' },
  ],
};

export const ALL_CASES = [
  ...PYTHON_SYSTEMS.map((s, idx) => ({
    ...s,
    groupType: 'python',
    number: String(idx + 1).padStart(2, '0'),
    code: String(idx + 1).padStart(2, '0'),
  })),
  ...WEB_SYSTEMS.map((s, idx) => ({
    ...s,
    groupType: 'web',
    number: String(PYTHON_SYSTEMS.length + idx + 1).padStart(2, '0'),
    code: String(PYTHON_SYSTEMS.length + idx + 1).padStart(2, '0'),
  })),
  ...ACADEMIC_SYSTEMS.map((s, idx) => ({
    ...s,
    groupType: 'academic',
    number: String(PYTHON_SYSTEMS.length + WEB_SYSTEMS.length + idx + 1).padStart(2, '0'),
    code: String(PYTHON_SYSTEMS.length + WEB_SYSTEMS.length + idx + 1).padStart(2, '0'),
  })),
];
