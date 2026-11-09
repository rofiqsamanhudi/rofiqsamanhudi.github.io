# Design Decisions: Rofiq Samanhudi Portfolio (Forest & Brass Palette + AcademicPages 2-Column Shell)

## 1. Identity, Audience & Dials
- **Owner**: Rofiq Samanhudi (Data Engineer / Data Analyst, Malang, Jawa Timur)
- **Target Audience**: Data engineering and data analytics recruiters, hiring managers, and operational stakeholders
- **Character & Mood**: Calm, structured analyst notebook in a dark study room: deep forest dark (`#0B0F0D`), dark pine surface (`#1F2A1F`), muted moss line (`#3E5A3F`), sage secondary text (`#8CA98C`), warm parchment primary text (`#D9C7A3`), and antique brass accent (`#B08D57`)
- **Layout Reference**: `academicpages.github.io` 2-column viewport-locked shell (`height: 100vh` on desktop) where the Left Profile Sidebar and Right Section Header stay stationary and **only the inner right workspace scrolls**
- **Dial**: `ENERGY 2 / RHYTHM 2 / MOTION 1` (hover, focus, and panel transitions only; respects `prefers-reduced-motion`)
- **Theme Strategy**: Single dark theme derived directly from the owner's 6-swatch reference palette. Light mode is intentionally omitted because the brass accent (`#B08D57`) on parchment (`#D9C7A3`) yields 1.86:1 contrast (FAIL WCAG AA).

## 2. Color Tokens & Verified Contrast Ratios (WCAG AA/AAA)
All pairings were verified with `contrast-check.py`:
- `--bg`: `#0B0F0D` (Deep Forest Night canvas)
- `--surface`: `#1F2A1F` (Dark Pine surface for sidebar, detail panels, and tables)
- `--line`: `#3E5A3F` (Moss structural border and divider line only; 2.52:1 on `#0B0F0D`, never used for text)
- `--text`: `#D9C7A3` (Warm Parchment primary text and headings)
  - `#D9C7A3` on `#0B0F0D`: **11.62:1** (PASS AAA)
  - `#D9C7A3` on `#1F2A1F`: **8.98:1** (PASS AAA)
- `--text-2`: `#8CA98C` (Sage secondary text, metadata, captions)
  - `#8CA98C` on `#0B0F0D`: **7.51:1** (PASS AAA)
  - `#8CA98C` on `#1F2A1F`: **5.80:1** (PASS AA)
- `--accent`: `#B08D57` (Antique Brass deliberate focal accent: active nav indicator, active filter, and primary CV download button)
  - `#B08D57` on `#0B0F0D`: **6.24:1** (PASS AA)
  - `#B08D57` on `#1F2A1F`: **4.82:1** (PASS AA)
  - `#0B0F0D` text on `#B08D57` button fill: **6.24:1** (PASS AA)

## 3. One-Line Reasons for Major Visual Decisions (R-31)
- **Full-Width Viewport-Locked Shell (`.ap-shell` & `.ap-frame`)**: Spans 100% left-to-right (`width: 100%`, `height: 100vh`, `overflow: hidden`) so the left profile sidebar and top section bar stay stationary while only `.ap-workspace-scroll` scrolls.
- **Stationary Left Profile Sidebar (`.ap-sidebar-fixed`, 320px width)**: Centers the formal circular portrait (`124px x 124px`), displays role and single-line contact links (`Email`, `WhatsApp`, `LinkedIn`, `GitHub`, `Instagram`), and provides a single primary CTA (`Unduh CV (PDF)`).
- **Single-Responsibility Brass Accent (`--accent: #B08D57`)**: Restricted to the active navigation state, active tab state, chart comparison highlight, and the primary CV download CTA so the accent draws the eye immediately without clutter (R-29).
- **Flat Academic Case Study List + Dedicated Standalone Route (`/kasus/[id]`)**: Lists all 10 systems (5 Python ETL pipelines and 5 Web systems) as scannable rows with problem statement and tools; clicking the project title or `Lihat alur & rumus` opens a dedicated static page (`/kasus/[id]`) in a new browser tab (`target="_blank"`) containing the 6 structured sections (`01` Masalah, `02` Data Masuk, `03` Alur Kerja, `04` Rumus & Kode, `05` Data Keluar, `06` Tools) so the main portfolio page remains clean and uninterrupted.
- **Per-Project Analysis Integration**: Sample analysis charts and business findings are designated per individual project within their respective case details (`/kasus/[id]`) rather than as an overarching separate homepage section, keeping the primary workspace clean and focused on direct systems documentation (`R-17`, `R-31`).
- **Step Number Badges Instead of Left Color Stripes**: Workflow steps and formula cards use numbered monospace badges (`01`, `02`) and `1px` structural borders (`#3E5A3F`) rather than decorative colored left stripes (`R-01`, `R-31`).
- **Typography (`Plus Jakarta Sans` + `JetBrains Mono`)**: `Plus Jakarta Sans` provides clean Indonesian editorial legibility while `JetBrains Mono` (`tabular-nums`) aligns system codes (`PY-01`, `WEB-01`), formulas, and table numbers (`R-06`).
