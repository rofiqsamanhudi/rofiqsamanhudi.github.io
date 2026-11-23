# Rofiq Samanhudi | Portfolio

Personal portfolio of **Rofiq Samanhudi** (Research & Data Analyst, Data Engineer, S1 Informatics specializing in Data Science at Universitas Muhammadiyah Malang, GPA `3.82 / 4.00`).

Built with **Next.js** (App Router, static export for GitHub Pages) to showcase technical case studies across **Python Data Engineering Pipelines**, **Web & Analytics Systems**, and **Machine Learning & AI Research**. All numerical samples and spreadsheet IDs in the project showcases are simulated datasets.

## Profile & Contact

- **Full Name**: Rofiq Samanhudi
- **Location**: Malang, East Java, Indonesia
- **Email**: [rofiqsamanhudizz@gmail.com](mailto:rofiqsamanhudizz@gmail.com)
- **WhatsApp**: [+62 823-4236-4044](https://wa.me/6282342364044)
- **LinkedIn**: [linkedin.com/in/rofiqsamanhudi](https://www.linkedin.com/in/rofiqsamanhudi/)
- **GitHub**: [github.com/rofiqsamanhudi](https://github.com/rofiqsamanhudi)
- **Instagram**: [instagram.com/rofiqsamanhudi_](https://www.instagram.com/rofiqsamanhudi_/)
- **Curriculum Vitae (PDF)**: `/profile/CV-Rofiq-Samanhudi-Research-and-Data-Analyst.pdf`

## Project Structure

- `src/app/page.js`: Home page rendering `PortfolioHub`.
- `src/components/PortfolioHub.js`: Main portfolio layout, category filter, slide-over project detail drawer, experience timeline, skills, and contact section.
- `src/lib/pythonSystemsData.js`: Structured dataset for all projects and profile details.
- `public/profile/`: Hero sketch image and downloadable CV PDF.

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

Generates the static export in `out/`, deployed via `.github/workflows/deploy.yml`.
