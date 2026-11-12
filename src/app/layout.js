import './globals.css';

export const metadata = {
  title: 'Rofiq Samanhudi | Portfolio',
  description: 'Data engineering, automation pipelines, and machine learning projects.',
  openGraph: {
    title: 'Rofiq Samanhudi | Portfolio',
    description: 'Data engineering, automation pipelines, and machine learning projects.',
    url: 'https://rofiqsamanhudi.github.io',
    siteName: 'Rofiq Samanhudi Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Rofiq Samanhudi | Portfolio',
    description: 'Data engineering, automation pipelines, and machine learning projects.',
  },
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
