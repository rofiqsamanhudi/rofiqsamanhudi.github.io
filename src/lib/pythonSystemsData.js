// Technical documentation dataset for Python Data Engineering & Web Analytics Systems
// developed by Rofiq Samanhudi.
// All numerical figures and spreadsheet IDs in this showcase are 100% simulated (dummy) datasets.

export const PYTHON_SYSTEMS = [
  {
    id: 'forecast-fg',
    number: '01',
    title: 'Finished Goods Forecasting & Multi-Level BOM Breakdown',
    subtitle: 'Automated Monthly Production Planning & Raw Material Requirement System',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'PPIC, Production & Supply Chain',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Forecast FG',
    entryFile: 'Perencanaan Produksi FG.ipynb',
    environment: 'Python 3.11, Google Colaboratory & JupyterLab',
    stack: ['Python', 'Pandas', 'NumPy', 'Decimal (ROUND_HALF_UP)', 'OpenPyXL', 'Matplotlib', 'Google Sheets Live CSV'],
    summary:
      'Automated 3-month rolling production forecasts across 7 brand lines by synthesizing historical Weighted Moving Average (WMA) trends, factory capacity buffers, and direct sales requests, subsequently breaking down targets into packaging component counts and chemical liquid volume.',
    metrics: [
      { label: 'Brand Scope', value: '7 Corporate Brands' },
      { label: 'Projection Horizon', value: '3 Months Rolling' },
      { label: 'Rounding Method', value: 'ROUND_HALF_UP (Excel Parity)' },
    ],
    problemStatement:
      'Monthly production planning was previously managed through disconnected spreadsheets. Decimal rounding discrepancies between sales projections, plant buffers, and multi-level Bill of Materials (BOM) led to recurring variances in ordering bottles, trigger caps, labels, boxes, and bulk liquids.',
    workflowSteps: [
      {
        step: '1. Ingest Historical Sales & Direct Sales Requests',
        detail:
          'Uploads monthly Excel workbooks containing 3-month sales histories (t-3, t-2, t-1) alongside forward projections from direct-selling and B2B channels.',
      },
      {
        step: '2. Compute 3-Month WMA & Plant Capacity Buffer',
        detail:
          'Calculates a weighted moving average with weights (0.2, 0.3, 0.5) emphasizing recent demand, multiplied by a 1.15 factory buffer factor.',
      },
      {
        step: '3. Formulate Production Plan with Decimal Rounding Parity',
        detail:
          'Blends baseline production (60%) and direct sales demand (40%), using Decimal(ROUND_HALF_UP) to match Excel mathematical rounding.',
      },
      {
        step: '4. Sync Live BOM & Master Formulations from Google Sheets',
        detail:
          'Directly queries live master BOM tables per brand and liquid formulation sheets via Google Sheets CSV endpoints without manual file transfers.',
      },
      {
        step: '5. Classify Materials & Export Multi-Sheet Report',
        detail:
          'Deconstructs each projected SKU into component counts (bottles, caps, labels, boxes, polybags, and liquid mL), outputting an audit-ready multi-sheet Excel report.',
      },
    ],
    technicalRules: [
      {
        title: 'Weighted Moving Average (WMA) & Production Plan Formula',
        formula: 'WMA = (0.2 * M_t3) + (0.3 * M_t2) + (0.5 * M_t1) | Baseline = WMA * 1.15 | Production Target = (0.6 * Baseline) + (0.4 * Direct Demand)',
        explanation:
          'Assigns the highest weight (50%) to the most recent month to remain sensitive to short-term trends while incorporating a 15% plant capacity reserve.',
      },
      {
        title: 'Mathematical Rounding Parity (Anti-Banker Rounding)',
        formula: "Decimal(str(round(val, 8))).quantize(Decimal('1'), rounding=ROUND_HALF_UP)",
        explanation:
          'Standard Python round() applies round-half-to-even, which can deviate by 1 unit from Excel at .5 boundaries. Decimal quantization ensures 100% agreement with PPIC workbooks.',
      },
      {
        title: 'Automated Material Classification & Liquid Volume Parsing',
        formula: 'Prefix FD/FE/FC/FA -> BOTTLE | OD/OG/OE/OC -> CAP | DD/GH/GE -> LABEL | 100 ML -> 120 mL | 400 ML -> 420 mL',
        explanation:
          'Automatically categorizes raw material SKU codes and extracts liquid dosages via regex pattern matching.',
      },
    ],
    codeSnippetTitle: 'Perencanaan Produksi FG.ipynb (WMA Calculation & Rounding Precision)',
    codeSnippet: `from decimal import Decimal, ROUND_HALF_UP

# KGG Production Forecasting Parameters
BOBOT_WMA = (0.2, 0.3, 0.5)      # 3-Month WMA Weights [t-3, t-2, t-1]
PENGALI_BASELINE = 1.15          # Factory baseline buffer multiplier (115%)
BOBOT_RENCANA = (0.6, 0.4)       # Proportions [60% Factory Baseline, 40% Direct Sales Demand]

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
    sampleInputHeaders: ['SKU', 'Finished Good Product', 'Brand', 'Sales Jan (t-3)', 'Sales Feb (t-2)', 'Sales Mar (t-1)', 'Direct Demand Apr'],
    sampleInputRows: [
      ['KP-EXT-250', 'Kilap Premium Quick Shine 250mL', 'KILAP PREMIUM', '1,200', '1,450', '1,800', '950'],
      ['PF-HLM-100', 'Purfress Helmet Perfume 100mL', 'PURFRESS', '980', '1,120', '1,340', '600'],
      ['KL-waterspot', 'Kilap Lab Waterspot Remover 250mL', 'KILAP LAB', '640', '710', '890', '420'],
    ],
    sampleOutputHeaders: ['SKU', 'Base WMA', 'Plant Baseline (115%)', 'Final Production Plan', 'Bottle Requirement (PCS)', 'Cap Requirement (PCS)', 'Liquid Volume (L)'],
    sampleOutputRows: [
      ['KP-EXT-250', '1,575', '1,811', '1,467', '1,467 (FD-250)', '1,467 (OD-TRG)', '366.75 L'],
      ['PF-HLM-100', '1,202', '1,382', '1,069', '1,069 (FE-100)', '1,069 (OG-SPR)', '128.28 L'],
      ['KL-waterspot', '786', '904', '710', '710 (FC-250)', '710 (OC-CAP)', '177.50 L'],
    ],
  },
  {
    id: 'laporan-kardus-fg',
    number: '02',
    title: 'Packaging Box Automation & Logistics FG Recap',
    subtitle: 'Marketplace Packaging Box Rule Engine & Finished Goods Revenue Aggregator',
    entity: 'PT Kilapkan Seluruh Bangsa (KSB)',
    division: 'Logistics & Warehouse Operations (Kilap Malang Warehouse)',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Laporan Kardus dan FG Logistik',
    entryFile: 'main.py & src/kardus_engine.py',
    environment: 'Modular Python Package (CLI, VS Code Jupyter, Google Colab)',
    stack: ['Python CLI (argparse)', 'Pandas', 'OpenPyXL', 'Regex Bundle Parser', 'Google Sheets Master Sync'],
    summary:
      'Processes thousands of e-commerce order rows to determine the appropriate packing box size and SKU for each order (handling both single-item and complex multi-item baskets) while calculating dispatched quantities and estimated Finished Goods revenue per box category.',
    metrics: [
      { label: 'Code Architecture', value: '5 Python Modules (src/)' },
      { label: 'Live Master Tables', value: '6 Reference Sheets' },
      { label: 'Target Facility', value: 'Kilap Malang Warehouse' },
    ],
    problemStatement:
      'Exported marketplace transaction sheets contain vertically merged cells for multi-item orders. Selecting the optimal packing box for varied product combinations and separating loose unit sales from multi-pack bundles previously required hours of tedious manual spreadsheet work.',
    workflowSteps: [
      {
        step: '1. Synchronize 6 Live Master Tables from Google Sheets (data_loader.py)',
        detail:
          'Downloads reference sheets including Box Master, Box Combination Rules, Combination Slot Details, SKU Mappings, FG SKU Catalogs, and Offline Pricing Formulations.',
      },
      {
        step: '2. Unmerge Cells & Preprocess Transactions (preprocessor.py)',
        detail:
          'Applies forward-fill (ffill) across order-level columns (Order ID, Warehouse, Courier) without corrupting item-level lines, cleans currency strings into floats, and isolates orders assigned to the target warehouse.',
      },
      {
        step: '3. Packing Box Decision Engine (kardus_engine.py)',
        detail:
          'For single-item orders with Qty = 1, directly maps the SKU to standard single packaging (SINGLE_MATCH). For multi-item or multi-quantity baskets, expands base box requirements, sorts components (sorted_order_kardus), and matches them against combination rules and slot constraints.',
      },
      {
        step: '4. Aggregate Dispatched Quantities & FG Revenue (fg_engine.py)',
        detail:
          'Summarizes item consumption per packaging type, separating loose unit sales from bundles (identified via regex prefix ^[3456789]-) along with corresponding revenue totals.',
      },
      {
        step: '5. Multi-Sheet Excel Report Generation (exporter.py)',
        detail:
          'Generates a standardized workbook featuring Master Transaction logs, detailed item breakdowns, and executive summary tables.',
      },
    ],
    technicalRules: [
      {
        title: 'Multi-Item Packaging Combination Algorithm',
        formula: 'expanded_kardus_list -> sorted(expanded_kardus_list) == rule["components_sorted"] + Slot Constraints',
        explanation:
          'Ensures the sequence in which items are placed into a shopping cart does not affect box selection as long as the component set matches defined operational rules.',
      },
      {
        title: 'Automated Unit (PCS) vs Bundle Separation',
        formula: 'Regex Pattern: re.compile(r"^[3456789]-") & Bundle Column Mapping',
        explanation:
          'Distinguishes bundle packs from standalone bottles to preserve inventory balance and track accurate revenue attribution.',
      },
    ],
    codeSnippetTitle: 'src/kardus_engine.py & main.py (Packaging Determination per Order)',
    codeSnippet: `def determine_kardus_for_order(items, parsed_rules, sku_to_kardus, kardus_to_sku):
    total_qty = sum(item["qty"] for item in items)

    # CASE 1: Single item & Qty = 1
    if len(items) == 1 and total_qty == 1:
        sku = items[0]["sku"]
        kardus = sku_to_kardus.get(sku, "UNMAPPED")
        sku_kardus = kardus_to_sku.get(kardus, "UNMAPPED")
        return {
            "kardus": kardus,
            "sku_kardus": sku_kardus,
            "status": "SINGLE_MATCH" if kardus != "UNMAPPED" else "UNMAPPED_SKU",
        }

    # CASE 2: Multi-item / Multi-qty -> Test Combination Rules
    expanded_kardus_list = []
    for item in items:
        k = sku_to_kardus.get(item["sku"], "UNMAPPED")
        expanded_kardus_list.extend([k] * item["qty"])

    sorted_order_kardus = sorted(expanded_kardus_list)
    for rule in parsed_rules:
        if rule["components_sorted"] == sorted_order_kardus:
            return {"kardus": rule["target_kardus"], "sku_kardus": rule["sku_kardus"], "status": "COMBO_MATCH"}`,
    sampleInputHeaders: ['Order ID', 'Warehouse Name', 'Reference SKU', 'Product Name', 'Quantity', 'Product Discounted Total Price'],
    sampleInputRows: [
      ['260401992811', 'Gudang Kilap Malang', 'KP-EXT-250', 'Kilap Premium Quick Shine 250mL', '1', 'Rp 65,000'],
      ['260401992845', 'Gudang Kilap Malang', 'KP-EXT-250', 'Kilap Premium Quick Shine 250mL', '1', 'Rp 65,000'],
      ['(merged above)', '(merged above)', 'PF-HLM-100', 'Purfress Helmet Spray 100mL', '1', 'Rp 45,000'],
    ],
    sampleOutputHeaders: ['Order ID', 'Order SKU Summary', 'Total Qty', 'Selected Packaging Box', 'Box SKU', 'Matching Status', 'Total FG Revenue'],
    sampleOutputRows: [
      ['260401992811', 'KP-EXT-250 (1)', '1', 'BOX B1 REGULAR', 'BOX-B1', 'SINGLE_MATCH', 'Rp 65,000'],
      ['260401992845', 'KP-EXT-250 (1) + PF-HLM-100 (1)', '2', 'BOX B2 MEDIUM COMBO', 'BOX-B2', 'COMBO_MATCH', 'Rp 110,000'],
    ],
  },
  {
    id: 'rekonsiliasi-stok-rak',
    number: '03',
    title: 'Physical Warehouse Rack Stock Reconciliation',
    subtitle: 'Field Stock-Count Audit Engine & Paired Double-Entry Mutation Generator (11 Columns)',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'Warehouse & Inventory Control',
    localPath: 'C:\\Rofiq\\KGG\\Project\\NEW STOK & INVENTARIS',
    entryFile: 'project1/Rekonsiliasi_Stok_Lapangan.ipynb & project2/Rekonsiliasi_Stok_Colab.ipynb',
    environment: 'Python, Google Colaboratory & Local Jupyter Notebook',
    stack: ['Python', 'Pandas', 'OpenPyXL', 'Regex Batch Normalizer', 'Google Sheets API'],
    summary:
      'Compares physical inventory counts across warehouse storage racks against live master spreadsheet records, normalizes irregular expiration batch notations, isolates active audit zones, and generates paired double-entry stock adjustment journals (+Delta and -Delta) adhering to the standard 11-column corporate ledger format.',
    metrics: [
      { label: 'Output Layout', value: 'Standard 11 Columns' },
      { label: 'Journal Architecture', value: 'Paired Double-Entry (+/-)' },
      { label: 'Audit Safety', value: 'Active Rack Isolation' },
    ],
    problemStatement:
      'During partial daily cycle counts (auditing selected racks per day), manual reconciliation frequently misidentified batch codes due to formatting variations (e.g., OKT_26 vs OKT-2026) and risked overwriting non-audited rack balances in the master database.',
    workflowSteps: [
      {
        step: '1. Ingest Master Rack Database from Google Sheets',
        detail:
          'Extracts live inventory balances from master sheets, parsing SKU names, batch codes, and system quantities per designated rack address.',
      },
      {
        step: '2. Parse Field Audit Workbook (Actual Counts)',
        detail:
          'Ingests user-uploaded physical count spreadsheets detailing rack addresses, product identifiers, batch strings, and physical quantities.',
      },
      {
        step: '3. Normalize Batch Formats & Isolate Target Racks',
        detail:
          'Applies normalize_batch to unify month/year variations and restricts processing strictly to audited rack addresses, safeguarding untouched warehouse zones.',
      },
      {
        step: '4. Generate Paired Double-Entry Adjustments',
        detail:
          'For every non-zero variance (Delta = Physical Qty - System Qty), creates two sequential records: +Delta assigned to the specific rack, followed by an offsetting -Delta balancing entry.',
      },
      {
        step: '5. Export Standardized Daily Stock Update Workbook',
        detail:
          'Outputs the final Excel report with proper headers, formula balances, and corporate formatting.',
      },
    ],
    technicalRules: [
      {
        title: 'Audited Rack Isolation (Safe Partial Opname)',
        formula: 'Target_Racks = set(df_actual["ALAMAT"].dropna().unique())',
        explanation:
          'Allows cycle audits to proceed aisle by aisle without disturbing other rack balances, while correctly marking missing physical units in audited racks as outbound adjustments.',
      },
      {
        title: 'Paired Double-Entry Journaling',
        formula: 'Row 1: (QTY = +Delta, LOCATION = Rack, BATCH = Exp) | Row 2: (QTY = -Delta, LOCATION = "", BATCH = "")',
        explanation:
          'Complies with internal inventory ledger rules so warehouse transfers and physical count reconciliations remain self-balancing.',
      },
    ],
    codeSnippetTitle: 'project2/Rekonsiliasi_Stok_Colab.ipynb (Batch Normalization & Double-Entry Journaling)',
    codeSnippet: `def normalize_batch(b):
    """Standardizes month notation in batch codes."""
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

# Generate 2 paired mutation rows for each non-zero Delta
for (nama, exp), qty_act in act_items.items():
    qty_sys = sys_items.get((nama, exp), 0)
    delta = qty_act - qty_sys
    if delta != 0:
        # 1. Rack-specific adjustment row
        rows_mutasi.append([TANGGAL_MUTASI, nama, '', '', '', '', delta, '', '', rak, exp])
        # 2. Balancing row
        rows_mutasi.append([TANGGAL_MUTASI, nama, '', '', '', '', -delta, '', '', '', ''])`,
    sampleInputHeaders: ['Rack Address', 'Product Name', 'Batch Code (Field Count)', 'Physical Qty (Actual)', 'System Qty (Master Sheet)'],
    sampleInputRows: [
      ['RAK-A01-02', 'KILAP PREMIUM QUICK SHINE 250ML', 'OKT-2026', '145', '140'],
      ['RAK-A01-02', 'KILAP PREMIUM TIRE GEL 250ML', 'SEP_26', '82', '90'],
      ['RAK-B03-01', 'PURFRESS HELMET SPRAY 100ML', 'NOV-26', '0 (Missing Physical)', '12'],
    ],
    sampleOutputHeaders: ['Date', 'Product FG Name', 'Quantity', 'Location Address', 'Batch Code', 'Journal Entry Role'],
    sampleOutputRows: [
      ['31-Oct-2026', 'KILAP PREMIUM QUICK SHINE 250ML', '+5', 'RAK-A01-02', 'OKT_26', 'Row 1: Rack Adjustment'],
      ['31-Oct-2026', 'KILAP PREMIUM QUICK SHINE 250ML', '-5', '(Blank)', '(Blank)', 'Row 2: Balancing Entry'],
      ['31-Oct-2026', 'KILAP PREMIUM TIRE GEL 250ML', '-8', 'RAK-A01-02', 'SEP_26', 'Row 1: Rack Adjustment'],
      ['31-Oct-2026', 'KILAP PREMIUM TIRE GEL 250ML', '+8', '(Blank)', '(Blank)', 'Row 2: Balancing Entry'],
    ],
  },
  {
    id: 'penyesuaian-bb',
    number: '04',
    title: 'Raw Material Inventory Adjustment System (Penyesuaian BB)',
    subtitle: 'Automated 4-File Monthly Item Adjustment Generator (Wet, Dry & Production)',
    entity: 'PT. Kilap Global Group (KGG)',
    division: 'Inventory Accounting & Raw Material Warehousing',
    localPath: 'C:\\Rofiq\\KGG\\Project\\Penyesuaian BB',
    entryFile: 'main.py, src/transformer.py & config/settings.py',
    environment: 'Python CLI (Batch Multi-Periode) & Jupyter/Colab',
    stack: ['Python 3', 'OpenPyXL', 'Modular ETL (extractor/transformer/exporter)', 'Argparse CLI'],
    summary:
      'Transforms raw month-end multi-warehouse quantity reports into 4 clean, ERP-importable Item Adjustment Excel files (Wet Raw Material, Dry Raw Material, Wet Production, and Dry Production) based on chemical liquid versus dry solid packaging classification rules.',
    metrics: [
      { label: 'Output per Period', value: '4 Excel Workbooks (.xlsx)' },
      { label: 'Output Schema', value: '15 Standard ERP Columns' },
      { label: 'Execution Mode', value: 'Single & Batch (--all)' },
    ],
    problemStatement:
      'At every monthly financial close, inventory accountants manually parsed hundreds of raw material items from a wide 25+ column sheet into 4 separate files by warehouse and unit type, converted negative variances into positive values with a Reduction classification, and cleared the Unit field for dry packaging items.',
    workflowSteps: [
      {
        step: '1. Period Auto-Detection & Sheet Validation (extractor.py)',
        detail:
          'Infers the target period from folder/file naming conventions (e.g., 2026-04-apr -> APR-2026) and loads the multi-warehouse quantity sheet starting from row 3 while omitting blank or summary lines.',
      },
      {
        step: '2. Multi-Warehouse Variance Mapping (settings.py)',
        detail:
          'Extracts Item Name (Col A), Item Code (Col B), Unit (Col C), Wet Raw Material Variance (Col I / idx 8), Dry Raw Material Variance (Col Q / idx 16), and Production Variance (Col Y / idx 24).',
      },
      {
        step: '3. Wet vs Dry Unit Classification (transformer.py)',
        detail:
          'Items with units in {"ML", "GRAM", "LITER", "KG"} are designated as WET (retaining original units), whereas dry goods (PCS, CM, ROLL) are classified as DRY (with Unit set to None).',
      },
      {
        step: '4. Adjustment Type Determination & Absolute Value Conversion',
        detail:
          'Variances < 0 convert to Type = "Pengurangan" (Reduction) with absolute quantities; variances > 0 convert to Type = "Penambahan" (Addition); zero variances are skipped.',
      },
      {
        step: '5. Export 4 Standard 15-Column Workbooks (exporter.py)',
        detail:
          'Generates 4 formatted files: item-adjustment-{MONTH}-BASAH.xlsx, KERING.xlsx, PRODUKSI-BASAH.xlsx, and PRODUKSI-KERING.xlsx with auto-fitted column widths and standard corporate styling.',
      },
    ],
    technicalRules: [
      {
        title: 'Wet vs Dry Unit Classification & Unit Column Rule',
        formula: 'SATUAN_BASAH = {"ML", "GRAM", "LITER", "KG"} -> Unit = Original Unit | Otherwise (DRY) -> Unit = None',
        explanation:
          'The corporate ERP system requires the Unit column to be left blank for dry packaging components (PCS/CM), but mandates explicit units for chemical liquids.',
      },
      {
        title: 'Variance Transformation into 15-Column Schema',
        formula: 'diff < 0 -> ("Pengurangan", abs(diff)) | diff > 0 -> ("Penambahan", diff) | diff == 0 -> Skip',
        explanation:
          'Eliminates human error during journal imports by separating directional sign from absolute volume.',
      },
    ],
    codeSnippetTitle: 'src/transformer.py (Wet/Dry Separation & Production Warehousing)',
    codeSnippet: `SATUAN_BASAH = {"ML", "GRAM", "LITER", "KG"}

def is_basah(satuan: str | None) -> bool:
    return (satuan or "").strip().upper() in SATUAN_BASAH

def transform_produksi(items: list[dict]) -> tuple[list[tuple], list[tuple]]:
    """Separates PRODUCTION WAREHOUSE variances into PRODUCTION-WET and PRODUCTION-DRY workbooks."""
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
    sampleInputHeaders: ['Item Name (Col A)', 'Code (Col B)', 'Unit (Col C)', 'Wet RM Variance (Col I)', 'Dry RM Variance (Col Q)', 'Production Variance (Col Y)'],
    sampleInputRows: [
      ['SILICONE EMULSION HV-60', 'BB-CHM-014', 'KG', '-12.5', '0', '+4.0'],
      ['BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', 'PCS', '0', '-45', '-18'],
      ['PARFUM BUBBLEGUM GRADE A', 'BB-PRF-009', 'ML', '+250', '0', '-80'],
    ],
    sampleOutputHeaders: ['Target Output File', 'Item Name', 'Code', 'Unit', 'Quantity', 'Warehouse', 'Adjustment Type'],
    sampleOutputRows: [
      ['item-adjustment-APR-2026-BASAH.xlsx', 'SILICONE EMULSION HV-60', 'BB-CHM-014', 'KG', '12.5', 'GUDANG BAHAN BAKU BASAH', 'Pengurangan'],
      ['item-adjustment-APR-2026-KERING.xlsx', 'BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', '(Blank / None)', '45', 'GUDANG BAHAN BAKU KERING', 'Pengurangan'],
      ['item-adjustment-APR-2026-PRODUKSI-BASAH.xlsx', 'PARFUM BUBBLEGUM GRADE A', 'BB-PRF-009', 'ML', '80', 'GUDANG PRODUKSI', 'Pengurangan'],
      ['item-adjustment-APR-2026-PRODUKSI-KERING.xlsx', 'BOTOL TRIGGER 250ML HITAM', 'FD-250-BLK', '(Blank / None)', '18', 'GUDANG PRODUKSI', 'Pengurangan'],
    ],
  },
  {
    id: 'append-report-weekly',
    number: '05',
    title: '7-Channel Weekly Multi-Marketplace ETL Pipeline',
    subtitle: 'Multi-Platform Transaction Consolidation, TikTok XML Dimension Bug Fix & SKU/Province Normalizer',
    entity: 'PT. Kilap Global Group (KGG) & PT Kilapkan Seluruh Bangsa (KSB)',
    division: 'Data Analytics & Commercial Intelligence',
    localPath: 'C:\\Rofiq\\KGG\\Internal Code\\AppendReport_Weekly.ipynb',
    entryFile: 'AppendReport_Weekly.ipynb',
    environment: 'Python, Pandas, OpenPyXL Full-DOM Parser',
    stack: ['Python', 'Pandas', 'OpenPyXL (read_only=False)', 'Google Sheets CSV Merge'],
    summary:
      'Consolidates and standardizes 5 raw weekly export files (Lazada, Shopee Kilap Premium, Shopee Pusat Pengkilap, TikTok/Tokopedia Kilap Premium, TikTok/Tokopedia Pusat Pengkilap) into a single 23-column cleaned dataset across 7 official e-commerce channels, incorporating a parser that resolves truncated TikTok XML dimensions alongside automated SKU mapping and province standardization.',
    metrics: [
      { label: 'Marketplace Scope', value: '7 Official Store Channels' },
      { label: 'Schema Layout', value: '23 Standardized Columns' },
      { label: 'Engineering Feature', value: 'Corrupt XML Dimension Patch' },
    ],
    problemStatement:
      'Export files from TikTok Shop/Tokopedia present two technical challenges: (1) a descriptive subheader on row 2 that must be excised weekly, and (2) corrupted XML <dimension ref="A1"/> metadata causing standard pandas.read_excel() to load only 1 column out of 63. Additionally, legacy SKU variants and disparate province spellings across platforms hindered automated reporting.',
    workflowSteps: [
      {
        step: '1. Ingest Raw Files & Anti-Bug TikTok XML Parser (baca_file_tiktok)',
        detail:
          'Loads Lazada and Shopee files, while parsing TikTok workbooks using openpyxl in read_only=False (full DOM) mode so all 63 columns are recovered despite corrupted XML dimension tags, simultaneously removing extraneous descriptive rows.',
      },
      {
        step: '2. Disaggregate TikTok vs Tokopedia Channels (proses_tiktok_tokopedia)',
        detail:
          'Splits bundled TikTok exports into distinct TikTok Shop and Tokopedia dataframes based on purchase channel tags and prepends internal order prefixes (TTKP-, TPKP-, SPKP-, etc.).',
      },
      {
        step: '3. Normalize Price Datatypes & Concatenate 7 Channels (pd.concat)',
        detail:
          'Cleans thousand-separator formatting across pricing and freight columns, maps fields into 23 standard attributes, and merges the 7 sales channels.',
      },
      {
        step: '4. Translate SKU v1/v2 to SKU v3 & Standardize Provinces',
        detail:
          'Executes left-joins against online reference sheets to reconcile legacy SKU codes to current masters and standardize Indonesian delivery province names.',
      },
      {
        step: '5. Classify Cancellation Status & Automatic Brand Tagging',
        detail:
          'Detects cancellation keywords (failed, cancel, returned) to assign canonical cancelation_status values, attributes parent brand identifiers from SKU prefixes, and exports a production-ready weekly master table.',
      },
    ],
    technicalRules: [
      {
        title: 'Full-DOM XML Dimension Recovery Algorithm',
        formula: 'openpyxl.load_workbook(file_path, read_only=False, data_only=True) + Numeric Order ID Filtering',
        explanation:
          'By forcing full-DOM parsing and filtering for numeric Order IDs, all 63 columns across tens of thousands of rows are reliably loaded without manual Excel re-saving.',
      },
      {
        title: 'Multi-Tier SKU Translation (sku_v1 -> sku_v2 -> sku_v3) & Brand Attribution',
        formula: "gabungan['sku_v3'] = gabungan['new_sku'].fillna(gabungan['sku_v2']) | sku_v3 contains 'PF' -> Brand = 'Purfress'",
        explanation:
          'Preserves original marketplace SKU audit trails while standardizing against current master inventories for cross-departmental reporting.',
      },
    ],
    codeSnippetTitle: 'AppendReport_Weekly.ipynb (Corrupted XML Dimension Recovery & SKU Enrichment)',
    codeSnippet: `def baca_file_tiktok(file_path):
    """Parses TikTok/Tokopedia exports safely despite corrupted XML
    <dimension ref="A1"/> metadata, automatically omitting descriptive headers."""
    wb = openpyxl.load_workbook(file_path, read_only=False, data_only=True)
    ws = wb.active
    rows = list(ws.iter_rows(values_only=True))
    wb.close()

    headers = [str(h).strip() if h is not None else f"col_{i}" for i, h in enumerate(rows[0])]
    df = pd.DataFrame(rows[1:], columns=headers)

    # Remove non-numeric descriptive row
    df = df[df['Order ID'].astype(str).str.strip().str.isdigit()].reset_index(drop=True)
    return df

# Left-join with updated master SKU catalog and province reference
gabungan = pd.merge(gabungan, df_newsku, how='left', left_on='sku_v2', right_on='updated_sku')
gabungan['sku_v3'] = gabungan['new_sku'].fillna(gabungan['sku_v2'])
gabungan.loc[gabungan['sku_v3'].str.contains('PF', case=False, na=False), 'brand'] = 'Purfress'`,
    sampleInputHeaders: ['Source File', 'Platform Order ID', 'Purchase Channel', 'Raw Seller SKU', 'Raw Province', 'Raw Order Status'],
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
    subtitle: 'Corporate Budget Consolidation, Cash Flow Monitoring & Departmental Expense Analytics',
    entity: 'PT Kilapkan Seluruh Bangsa & PT. Kilap Global Group',
    division: 'Financial Modeling & Executive Analytics',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Decimal.js', 'Recharts', 'Google Sheets Integration', 'Financial Modeling'],
    summary:
      'Developed an internal financial control web system to track 12-month rolling cash flow (Cash In vs Cash Out across 2024-2026), multi-departmental budget matrices, and corporate variance analysis across two business entities.',
    metrics: [
      { label: 'Time Horizon', value: '3 Years (2024-2026)' },
      { label: 'Financial Entities', value: '2 Corporate Entities' },
      { label: 'Chart Structure', value: 'Budget Matrix & CoA' },
    ],
    problemStatement:
      'Departmental budget allocations and daily cash transactions were previously stored in disjointed spreadsheets. Finance leadership spent excessive time consolidating multi-entity records, comparing budget limits against actual spending, and producing standardized monthly P&L summaries.',
    workflowSteps: [
      {
        step: '1. Aggregate & Clean Daily Cash Transactions',
        detail:
          'Consolidates bank mutations and daily petty cash entries, normalizing transaction dates and mapping entries to standardized Chart of Accounts (CoA) codes.',
      },
      {
        step: '2. Map Departmental Budget Matrix',
        detail:
          'Categorizes monthly spending caps across Marketing, Warehouse Operations, R&D, Logistics, and General Administration across parent and manufacturing entities.',
      },
      {
        step: '3. Compute Variances & Over-Budget Alerts',
        detail:
          'Calculates budget variances and flags departments exceeding 90% utilization or running deficits.',
      },
      {
        step: '4. Executive Reporting & Visual Summaries',
        detail:
          'Generates EBITDA margins, net cash flow trends, and P&L summaries filterable by month, quarter, and year.',
      },
    ],
    technicalRules: [
      {
        title: 'Budget Variance & Utilization Formulas',
        formula: 'Variance = Budget Cap - Actual Spending | % Utilization = (Actual / Budget) * 100%',
        explanation:
          'Positive variance indicates remaining budget; negative variance triggers management review.',
      },
      {
        title: 'Net Cash Flow Formula',
        formula: 'Net Cash Flow = Total Cash Inflow - Total Cash Outflow',
        explanation:
          'Determines the closing cash balance at the end of each corporate accounting cycle.',
      },
    ],
    sampleInputHeaders: ['Date', 'Entity', 'Department', 'Account Code (CoA)', 'Monthly Budget Cap', 'Actual Spending'],
    sampleInputRows: [
      ['2026-03-31', 'PT KGG', 'Marketing & Ads', '6102-ADS', 'Rp 120,000,000', 'Rp 114,500,000'],
      ['2026-03-31', 'PT KSB', 'Plant Operations', '5201-OPR', 'Rp 85,000,000', 'Rp 89,200,000'],
      ['2026-03-31', 'PT KGG', 'R&D Formulation', '6301-RND', 'Rp 25,000,000', 'Rp 19,800,000'],
    ],
    sampleOutputHeaders: ['Entity', 'Department', 'Variance', 'Utilization Ratio (%)', 'Budget Status'],
    sampleOutputRows: [
      ['PT KGG', 'Marketing & Ads', '+Rp 5,500,000', '95.42%', 'Warning (>90%)'],
      ['PT KSB', 'Plant Operations', '-Rp 4,200,000', '104.94%', 'Over-Budget'],
      ['PT KGG', 'R&D Formulation', '+Rp 5,200,000', '79.20%', 'On Track'],
    ],
  },
  {
    id: 'dashboard-hr',
    number: '02',
    code: 'WEB-02',
    title: 'HR & Talent Acquisition Portal',
    subtitle: 'Integrated Kanban Recruitment Pipeline & Candidate Resume Parser',
    entity: 'PT. Kilap Global Group',
    division: 'Human Resources & Talent Analytics',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Kanban State Machine', 'Gemini AI API / Regex Parser', 'XLSX Export'],
    summary:
      'Designed an internal recruitment portal to manage talent acquisition workflows, organizing job applicants across 6 Kanban stages, tracking open requisition quotas, and extracting structured information from candidate resumes.',
    metrics: [
      { label: 'Selection Funnel', value: '6 Kanban Stages' },
      { label: 'Candidate Ingestion', value: 'Resume Parser & Forms' },
      { label: 'Reporting Format', value: 'XLSX Export' },
    ],
    problemStatement:
      'The HR department received hundreds of job applications across multiple job boards without a central tracker. This caused delays in tracking urgent vacancies, elevated the risk of misplaced resumes, and slowed down interview scheduling across hiring managers.',
    workflowSteps: [
      {
        step: '1. Requisition Quota Monitoring (Outstanding Positions)',
        detail:
          'Displays active job openings, department requisitions, target fulfillment dates, and hiring priority levels.',
      },
      {
        step: '2. Resume Document Ingestion & Parsing',
        detail:
          'Extracts applicant contact details, educational background, work history, and primary technical competencies.',
      },
      {
        step: '3. 6-Stage Kanban Pipeline Management',
        detail:
          'Manages candidate progression through 6 phases: Application -> Screening -> HR Interview -> User Interview/Test -> Offer -> Onboarding.',
      },
      {
        step: '4. Centralized Candidate Database & Excel Export',
        detail:
          'Maintains interview notes, evaluation ratings, and hiring records with search filters and Excel export capabilities.',
      },
    ],
    technicalRules: [
      {
        title: '6-Stage Funnel State Machine',
        formula: 'Status: [Admin, Screening, HR Interview, User Test, Offering, Onboarding]',
        explanation:
          'Enforces sequential candidate progression through verification gates.',
      },
      {
        title: 'Standardized Rating & Phone Normalization',
        formula: 'Rating: 1-5 Scale | Phone Sanitization: 08xx -> 628xx (wa.me click-to-chat)',
        explanation:
          'Normalizes telephone numbers for instant recruiter outreach via WhatsApp.',
      },
    ],
    sampleInputHeaders: ['Resume File', 'Target Position', 'Department', 'Education', 'Raw Contact'],
    sampleInputRows: [
      ['CV_Andi_Pratama.pdf', 'Staff PPIC', 'Supply Chain', 'B.S. Industrial Engineering', '0812-3456-7890'],
      ['CV_Siti_Rahma.pdf', 'Warehouse Admin', 'Logistics', 'A.S. Business Administration', '+62 857 9900 1122'],
    ],
    sampleOutputHeaders: ['Candidate ID', 'Applicant Name', 'Target Position', 'Current Stage', 'Evaluation Score', 'Formatted WhatsApp'],
    sampleOutputRows: [
      ['CND-2601', 'Andi Pratama', 'Staff PPIC', 'User Interview / Test', '4.5 / 5.0', 'wa.me/6281234567890'],
      ['CND-2602', 'Siti Rahma', 'Warehouse Admin', 'Screening CV', '4.0 / 5.0', 'wa.me/6285799001122'],
    ],
  },
  {
    id: 'costmatrix',
    number: '03',
    code: 'WEB-03',
    title: 'CostMatrix & Manufacturing Cost (COGS) Tracker',
    subtitle: 'Multi-Level BOM Cost of Goods Sold Calculator & Chemical Formulation Margin Simulator',
    entity: 'PT Kilapkan Seluruh Bangsa & PT. Kilap Global Group',
    division: 'Manufacturing Cost Accounting & BOM',
    stack: ['Next.js 14', 'React', 'Decimal.js', 'Tailwind CSS', 'Multi-Level BOM Engine', 'Batch Recipe Simulator'],
    summary:
      'Developed a manufacturing cost calculator to determine unit Cost of Goods Sold (COGS) for finished goods, promotional bundles, and bulk 5,000 mL chemical formulations based on multi-level BOM hierarchies, packaging components, and direct labor allocations.',
    metrics: [
      { label: 'Batch Formulation Base', value: '5,000 mL (5 Liters)' },
      { label: 'Cost Hierarchy', value: 'Liquid + Packaging + Labor' },
      { label: 'Pricing Simulation', value: 'Gross Margin vs MSRP' },
    ],
    problemStatement:
      'Frequent price fluctuations in raw chemicals, PET/HDPE bottles, trigger sprayers, and corrugated cartons created difficulties in updating unit product margins. Secondary packaging and kitting labor were also frequently overlooked when pricing promotional bundles.',
    workflowSteps: [
      {
        step: '1. Master Material Pricing Management',
        detail:
          'Maintains unit procurement costs for raw chemicals (per mL/g), bottles, trigger caps, front-back labels, and corrugated shipper cartons.',
      },
      {
        step: '2. Bulk Formulation Simulation per 5,000 mL Batch',
        detail:
          'Calculates batch formulation cost for 5,000 mL batches and allocates costs proportionately to bottle sizes (100 mL, 250 mL, 500 mL).',
      },
      {
        step: '3. Multi-Level BOM Consolidation for Finished Goods',
        detail:
          'Combines liquid cost, bottle, cap, adhesive label, induction seal, and assembly labor to derive pure unit COGS.',
      },
      {
        step: '4. Bundle Kit Pricing & Retail Margin Calculator',
        detail:
          'Combines multi-SKU promotional bundles with combo carton costs to evaluate gross profit margins against suggested retail prices (MSRP).',
      },
    ],
    technicalRules: [
      {
        title: 'Liquid Formulation Cost Allocation per Unit',
        formula: 'Liquid Cost = (Total Batch Cost / 5,000 mL) * Bottle Volume (mL)',
        explanation:
          'Allocates chemical batch costs proportionately to packaged net content volume.',
      },
      {
        title: 'Unit Finished Good COGS & Gross Margin',
        formula: 'Unit COGS = Liquid + Bottle + Cap + Label + Direct Labor | Gross Margin (%) = ((MSRP - COGS) / MSRP) * 100%',
        explanation:
          'Ensures direct material and assembly labor are accounted for prior to establishing commercial pricing.',
      },
    ],
    sampleInputHeaders: ['Product SKU', '5,000 mL Batch Cost', 'Bottle Net Volume', 'Bottle + Cap Cost', 'Label + Labor Cost', 'Retail MSRP'],
    sampleInputRows: [
      ['KP-EXT-250', 'Rp 185,000', '250 mL', 'Rp 4,800', 'Rp 2,450', 'Rp 65,000'],
      ['PF-HLM-100', 'Rp 240,000', '100 mL', 'Rp 3,100', 'Rp 2,100', 'Rp 45,000'],
    ],
    sampleOutputHeaders: ['Product SKU', 'Liquid Cost / Bottle', 'Total Unit COGS', 'Retail MSRP', 'Gross Profit / Unit', 'Gross Margin (%)'],
    sampleOutputRows: [
      ['KP-EXT-250', 'Rp 9,250', 'Rp 16,500', 'Rp 65,000', 'Rp 48,500', '74.62%'],
      ['PF-HLM-100', 'Rp 4,800', 'Rp 10,000', 'Rp 45,000', 'Rp 35,000', '77.78%'],
    ],
  },
  {
    id: 'coretax-converter',
    number: '04',
    code: 'WEB-04',
    title: 'CoreTax Enterprise XML & CSV Converter',
    subtitle: 'Commercial Invoice to Indonesian Tax Authority (DJP) CoreTax v1.6.1 XML Converter',
    entity: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
    division: 'Tax Compliance & XML Schema Automation',
    stack: ['Next.js 14', 'React', 'XML DOM Builder', 'Decimal.js', 'CSV Parser', 'DJP CoreTax XML Schema v1.6.1'],
    summary:
      'Built an enterprise invoice converter transforming sales invoices into valid DJP CoreTax XML documents (schema v1.6.1) and bulk CSV upload files, incorporating 11/12 tax base calculations and 16-digit tax ID validation.',
    metrics: [
      { label: 'Tax Authority Schema', value: 'CoreTax XML v1.6.1' },
      { label: 'Tax Base Logic', value: 'Other Value 11/12 (12% VAT)' },
      { label: 'Identity Validation', value: '16-Digit NPWP & National ID' },
    ],
    problemStatement:
      'The Indonesian tax administration requires output tax invoices in valid v1.6.1 XML schema format. Generating XML manually for hundreds of monthly commercial transactions introduced high risks of schema rejection, arithmetic errors in 11/12 tax base conversions, or truncated leading zeros on 16-digit tax IDs.',
    workflowSteps: [
      {
        step: '1. Ingest Commercial Sales Invoice Records',
        detail:
          'Loads invoice logs containing document numbers, buyer tax identities, product line items, and gross transaction values.',
      },
      {
        step: '2. Clean & Validate 16-Digit Taxpayer Numbers',
        detail:
          'Strips punctuation from NPWP/NIK numbers, ensures leading zero preservation, and validates 16-digit length requirements.',
      },
      {
        step: '3. Calculate Tax Base (DPP Nilai Lain) & 12% VAT',
        detail:
          'Computes the statutory 11/12 tax base and 12% VAT amount for each line item using precise decimal arithmetic.',
      },
      {
        step: '4. Serialize DJP v1.6.1 XML Schema & Generate CSV',
        detail:
          'Compiles XML documents with XML character entity escaping (&, <, >, ", \') ready for direct upload to the tax portal.',
      },
    ],
    technicalRules: [
      {
        title: 'Tax Base (DPP Nilai Lain) & VAT Formulation',
        formula: 'Tax Base = (11 / 12) * Gross Selling Price | VAT = 12% * Tax Base',
        explanation:
          'Leverages Decimal.js to eliminate floating-point rounding discrepancies on commercial tax filings.',
      },
      {
        title: 'XML Character Entity Sanitization',
        formula: '& -> &amp; | < -> &lt; | > -> &gt; | " -> &quot; | \' -> &apos;',
        explanation:
          'Prevents parser failures when company names or addresses contain ampersands or quotation marks.',
      },
    ],
    sampleInputHeaders: ['Invoice No', 'Date', 'Buyer Name', 'Raw Tax ID (NPWP)', 'Gross Price (IDR)'],
    sampleInputRows: [
      ['INV/2026/04/101', '2026-04-05', 'CV Maju Bersama & Co', '09.123.456.7-651.000', '12,000,000'],
      ['INV/2026/04/102', '2026-04-06', 'PT Sentosa Otomotif', '0081928374650001', '24,000,000'],
    ],
    sampleOutputHeaders: ['Invoice No', 'Validated 16-Digit Tax ID', 'Tax Base (11/12)', 'VAT Amount (12%)', 'XML Schema Status'],
    sampleOutputRows: [
      ['INV/2026/04/101', '0091234567651000', 'Rp 11,000,000', 'Rp 1,320,000', 'VALID (Escaped &amp;)'],
      ['INV/2026/04/102', '0081928374650001', 'Rp 22,000,000', 'Rp 2,640,000', 'VALID'],
    ],
  },
  {
    id: 'kopaskap-converter',
    number: '05',
    code: 'WEB-05',
    title: 'Kopaskap Creator Affiliate Analyzer',
    subtitle: 'Affiliate Video Performance Analytics & 6-Tier Commission Engine',
    entity: 'PT. Kilap Global Group',
    division: 'Creator Analytics & Tiered Payroll',
    stack: ['Next.js 14', 'React', 'Tailwind CSS', 'Heuristic OCR Parser', 'Gemini Multimodal API', 'Tiering Commission Engine'],
    summary:
      'Designed an affiliate verification tool to audit creator video performance across TikTok and Instagram Reels, verifying posting compliance, extracting organic view counts, and computing tiered commissions across 6 payout tiers.',
    metrics: [
      { label: 'Commission Structure', value: '6 Tiers (Tier 1 - 6)' },
      { label: 'Compliance Verification', value: 'Hashtag & Product Tag Audit' },
      { label: 'Final Deliverable', value: 'Audited Payment Recap' },
    ],
    problemStatement:
      'The affiliate marketing team spent hours weekly manually inspecting creator analytics screenshots and looking up view tiers. Manual transcriptions caused data errors and delayed creator payouts.',
    workflowSteps: [
      {
        step: '1. Ingest Video Analytics Screenshot Files',
        detail:
          'Accepts uploaded screenshots of creator analytics submitted as proof of performance.',
      },
      {
        step: '2. Extract Engagement & View Metrics',
        detail:
          'Extracts view counts, likes, comments, watch time, and product link interactions.',
      },
      {
        step: '3. Verify Content Guidelines & Posting Window',
        detail:
          'Validates minimum requirements: mandatory promotional hashtags, embedded product links, and minimum view thresholds (10,000 views).',
      },
      {
        step: '4. Execute 6-Tier Commission Calculation',
        detail:
          'Maps verified views to Tiers 1 through 6, computes incentive payouts per creator, and generates payment export files.',
      },
    ],
    technicalRules: [
      {
        title: '6-Tier Commission Scale',
        formula: 'T1: 10k-50k | T2: 50k-100k | T3: 100k-250k | T4: 250k-500k | T5: 500k-1M | T6: >1M Views',
        explanation:
          'Applies fixed payout brackets determined by strict threshold limits.',
      },
      {
        title: 'Minimum Compliance Verification',
        formula: 'Eligible = (Official_Hashtag == True) & (Product_Tag == True) & (Views >= 10,000)',
        explanation:
          'Flags non-compliant video submissions for manual review prior to disbursement.',
      },
    ],
    sampleInputHeaders: ['Creator Handle', 'Platform', 'Detected Views', 'Campaign Hashtag', 'Product Basket Tag'],
    sampleInputRows: [
      ['@garasi_kilap_id', 'TikTok', '142,800', 'Compliant', 'Active'],
      ['@review_motor_mlg', 'Instagram Reels', '64,200', 'Compliant', 'Active'],
      ['@daily_ride_sub', 'TikTok', '8,400', 'Compliant', 'Active'],
    ],
    sampleOutputHeaders: ['Creator Handle', 'Compliance Status', 'Assigned Tier', 'Approved Commission', 'Audit Note'],
    sampleOutputRows: [
      ['@garasi_kilap_id', 'Compliant', 'Tier 3 (100k - 250k)', 'Rp 350,000', 'Approved for Transfer'],
      ['@review_motor_mlg', 'Compliant', 'Tier 2 (50k - 100k)', 'Rp 175,000', 'Approved for Transfer'],
      ['@daily_ride_sub', 'Ineligible', 'Below Tier 1 (<10k)', 'Rp 0', 'Views below 10,000 threshold'],
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
  cvPdfUrl: '/profile/CV-Rofiq-Samanhudi-Research-and-Data-Analyst.pdf',
  photos: {
    casual: '/profile/foto-casual.jpeg',
    formal: '/profile/foto-formal.jpg',
    profile: '/profile/foto-profil.jpg',
    landscape: '/profile/foto-bromo.jpeg',
  },
  summary:
    'Informatics graduate specializing in Data Science from Universitas Muhammadiyah Malang (GPA 3.82 / 4.00). Bridges quantitative research rigor with practical data engineering, from statistical classification and hypothesis testing to automated Python ETL pipelines, SQL data modeling, and executive Looker Studio dashboards. Proven track record in multi-channel e-commerce data consolidation, demand forecasting, and operational reconciliation.',
  skillGroups: [
    {
      category: 'Statistical Research & Quantitative Analysis',
      items: [
        'Quantitative & Qualitative Research Methods',
        'Classification Analysis & Machine Learning',
        'Descriptive & Inferential Statistics',
        'Statistical Software: R, JASP, SPSS, Python Stats',
        'Data Interpretation & Hypothesis Testing',
        'Data Modeling & Metric Validation',
      ],
    },
    {
      category: 'Data Engineering & Python Automation',
      items: [
        'Python (Pandas, NumPy, OpenPyXL)',
        'Automated ETL Pipelines & Data Cleaning',
        'SQL & Relational Databases (Oracle, MySQL)',
        'Anomaly, Duplicate, & Missing Value Auditing',
        'DJP CoreTax XML & Transaction Reconciliation',
        'Advanced Spreadsheets & Formulas (Dynamic Array, XLOOKUP)',
      ],
    },
    {
      category: 'Business Intelligence & Web Analytics',
      items: [
        'Looker Studio Interactive Dashboards',
        'Exploratory Data Analysis (EDA)',
        'Capacity Planning & Demand Forecasting (WMA)',
        'Next.js (React) Internal Analytics Tools',
        'Executive Data Reporting & Technical Documentation',
      ],
    },
  ],
  experiences: [
    {
      role: 'Data Analyst Intern',
      company: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
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
      company: 'PT. Kilap Global Group & PT Kilapkan Seluruh Bangsa',
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
    degree: 'Bachelor of Science in Informatics (Data Science Concentration)',
    gpa: '3.82 / 4.00',
    period: '2022 - 2026',
    details: [
      'Academic Focus: Specialized in Data Science, focusing on quantitative research, statistical analysis, database architecture, and machine learning.',
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
  ...PYTHON_SYSTEMS.map((s) => ({ ...s, groupType: 'python', code: s.code || `PY-${s.number}` })),
  ...WEB_SYSTEMS.map((s) => ({ ...s, groupType: 'web', code: s.code || `WEB-${s.number}` })),
];


