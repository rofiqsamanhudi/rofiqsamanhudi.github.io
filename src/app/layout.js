import './globals.css';

export const metadata = {
  title: 'Rofiq Samanhudi | Data Engineer & Data Analyst Portfolio',
  description:
    'Portofolio profesional Rofiq Samanhudi (Data Engineer & Data Analyst). Berisi penjelasan arsitektur sistem otomasi data, pipeline ETL, pemodelan data, formulasi perhitungan, dan metodologi pengerjaan.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
