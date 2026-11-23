# Rofiq Samanhudi | Portfolio

Personal portfolio of **Rofiq Samanhudi**, Informatics graduate specializing in Data Science from Universitas Muhammadiyah Malang (GPA `3.82 / 4.00`).

**Live Site:** [https://rofiqsamanhudi.github.io](https://rofiqsamanhudi.github.io)

Built with **Next.js** (App Router, static export for GitHub Pages) to present data engineering pipelines, internal analytics applications, and applied machine learning research. All sample dataset figures in the project documentation are simulated.

## Projects Included

### Python Pipelines (PT. Kilap Global Group)
1. **Finished Goods Forecasting & Multi-Level BOM Breakdown** (`18 Sep 2026`)
2. **Logistics Packaging Box & Finished Goods Recap Automation** (`18 Sep 2026`)
3. **Raw Material Stock Adjustment Splitter** (`18 Sep 2026`)
4. **Field Rack Stock Reconciliation vs Master Spreadsheet** (`28 Oct 2026`)

### Web & Analytics Systems (PT. Kilap Global Group)
1. **CoreTax DJP v1.6.1 XML & Excel Invoice Converter** (`18 Sep 2026`)
2. **KGG CostMatrix: COGS, BOM Audit & R&D Simulator** (`18 Sep 2026`)
3. **Kopaskap Affiliate Screenshot & Reward Calculator** (`06 Oct 2026`)
4. **HR & Talent Acquisition Portal (ATS)** (`08 Oct 2026`)
5. **KGG & KSB Executive Finance Monitoring Dashboard** (`26 Oct 2026`)

### Machine Learning & AI (Universitas Muhammadiyah Malang)
1. **Melanoma Classification with Bayesian TPE & Ensemble Transfer Learning** (`2026`, Undergraduate Thesis): [GitHub](https://github.com/rofiqsamanhudi/Tree-Structured-Parzen-Estimator) | [UMM E-Repository](https://eprints.umm.ac.id/id/eprint/34406/)
2. **Brain MRI Alzheimer Disease Multiclass Detection** (`2025`): [GitHub](https://github.com/rofiqsamanhudi/alzheimer-detection) | [Live App](https://alzheimer-detection-rofiqsamanhudi.streamlit.app/)
3. **Multiclass Dermatological Disease Classification & Web App** (`2025`): [GitHub](https://github.com/rofiqsamanhudi/skin-disease-detection) | [Live App](https://skin-disease-detection-sdszshzhy4kvvgmrcxynnq.streamlit.app/)
4. **Case-Based Reasoning & NLP for Supreme Court Decisions** (`2025`): [GitHub](https://github.com/rofiqsamanhudi/CBR_putusan-MA)

## Contact & Links

- **Website**: [https://rofiqsamanhudi.github.io](https://rofiqsamanhudi.github.io)
- **Email**: [rofiqsamanhudizz@gmail.com](mailto:rofiqsamanhudizz@gmail.com)
- **WhatsApp**: [+62 823-4236-4044](https://wa.me/6282342364044)
- **LinkedIn**: [linkedin.com/in/rofiqsamanhudi](https://www.linkedin.com/in/rofiqsamanhudi/)
- **GitHub**: [github.com/rofiqsamanhudi](https://github.com/rofiqsamanhudi)
- **Instagram**: [instagram.com/rofiqsamanhudi_](https://www.instagram.com/rofiqsamanhudi_/)
- **Curriculum Vitae (PDF)**: `/profile/CV-Rofiq-Samanhudi-Research-and-Data-Analyst.pdf`

## Project Structure

- `src/app/page.js`: Home page rendering `PortfolioHub`.
- `src/components/PortfolioHub.js`: Main layout, category filters, slide-over project detail drawer, experience timeline, skills, contact section, and mobile bottom bar.
- `src/lib/pythonSystemsData.js`: Structured dataset for all 13 projects and profile details.
- `public/profile/`: Hero portrait and downloadable CV PDF.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Production Build

```bash
npm run build
```

Generates the static export in `out/`, deployed to GitHub Pages via `.github/workflows/deploy.yml`.
