import './globals.css';

export const metadata = {
  title: 'Rofiq Samanhudi | Research & Data Analyst, Data Engineer Portfolio',
  description:
    'Professional portfolio of Rofiq Samanhudi, Research & Data Analyst and Data Engineer. Featuring technical documentation on automated ETL pipelines, statistical modeling, operational reconciliation, and analytical dashboards.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
