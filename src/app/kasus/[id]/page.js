import React from 'react';
import { notFound } from 'next/navigation';
import { ALL_CASES, PROFILE_DATA } from '../../../lib/pythonSystemsData';

export function generateStaticParams() {
  return ALL_CASES.map((item) => ({
    id: item.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const item = ALL_CASES.find((c) => c.id === id);

  if (!item) {
    return {
      title: `Studi Kasus Tidak Ditemukan | ${PROFILE_DATA.name}`,
    };
  }

  return {
    title: `${item.title} | ${PROFILE_DATA.name}`,
    description: item.problemStatement,
  };
}

export default async function CaseStudyPage({ params }) {
  const { id } = await params;
  const index = ALL_CASES.findIndex((c) => c.id === id);

  if (index === -1) {
    notFound();
  }

  const item = ALL_CASES[index];
  const prevItem = index > 0 ? ALL_CASES[index - 1] : null;
  const nextItem = index < ALL_CASES.length - 1 ? ALL_CASES[index + 1] : null;

  return (
    <div className="ap-standalone-shell">
      <header className="ap-standalone-header">
        <div className="ap-standalone-header-inner">
          <div className="ap-standalone-brand">
            <a href="/#studi-kasus" className="ap-back-btn">
              Kembali ke Portofolio Utama
            </a>
            <span className="ap-standalone-author">
              {PROFILE_DATA.name} &bull; {PROFILE_DATA.role}
            </span>
          </div>
          <div className="ap-case-meta" style={{ marginTop: 0 }}>
            <span className="ap-sim-badge">Dokumentasi Alur &amp; Rumus</span>
          </div>
        </div>
      </header>

      <main className="ap-standalone-main" aria-label={`Rincian Studi Kasus ${item.title}`}>
        <article className="ap-case-detail-view">
          <div className="ap-detail-header-block">
            <div className="ap-case-meta" style={{ marginTop: 0, marginBottom: '4px' }}>
              <span>{item.entity}</span>
              <span>&bull;</span>
              <span>{item.division || item.category}</span>
            </div>
            <h1 className="ap-detail-title">{item.title}</h1>
            <p className="ap-detail-subtitle">{item.subtitle}</p>
          </div>

          {item.metrics && item.metrics.length > 0 && (
            <div className="ap-sys-metrics">
              {item.metrics.map((m) => (
                <div key={m.label} className="ap-sys-metric-box">
                  <span className="ap-meta-label">{m.label}</span>
                  <span className="ap-sys-metric-val">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* 01. Masalah Bisnis & Operasional */}
          <section className="ap-detail-block" aria-labelledby="sec-masalah">
            <h2 id="sec-masalah" className="ap-detail-block-title">
              <span className="ap-step-num-badge">01</span>
              Masalah Bisnis &amp; Operasional
            </h2>
            <p className="ap-prose">{item.problemStatement}</p>
          </section>

          {/* 02. Struktur Data Masuk */}
          {item.sampleInputHeaders && (
            <section className="ap-detail-block" aria-labelledby="sec-input">
              <h2 id="sec-input" className="ap-detail-block-title">
                <span className="ap-step-num-badge">02</span>
                Struktur Data Masuk (Contoh Simulasi Input)
              </h2>
              <div className="ap-table-wrap">
                <table className="ap-table">
                  <thead>
                    <tr>
                      {item.sampleInputHeaders.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.sampleInputRows.map((row, rIdx) => (
                      <tr key={`in-${rIdx}`}>
                        {row.map((cell, cIdx) => (
                          <td key={`in-${rIdx}-${cIdx}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 03. Alur Kerja Sistem */}
          <section className="ap-detail-block" aria-labelledby="sec-alur">
            <h2 id="sec-alur" className="ap-detail-block-title">
              <span className="ap-step-num-badge">03</span>
              Alur Kerja Sistem ({item.workflowSteps.length} Langkah)
            </h2>
            <div className="ap-sys-steps">
              {item.workflowSteps.map((ws, idx) => (
                <div key={ws.step} className="ap-sys-step-card">
                  <h3 className="ap-sys-step-head">
                    <span className="ap-step-num-badge">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{ws.step.replace(/^\d+\.\s*/, '')}</span>
                  </h3>
                  <p className="ap-sys-step-body">{ws.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 04. Logika Perhitungan & Rumus */}
          <section className="ap-detail-block" aria-labelledby="sec-rumus">
            <h2 id="sec-rumus" className="ap-detail-block-title">
              <span className="ap-step-num-badge">04</span>
              Logika Perhitungan &amp; Rumus
            </h2>
            <div className="ap-sys-steps">
              {item.technicalRules.map((rule) => (
                <div key={rule.title} className="ap-sys-step-card">
                  <h3 className="ap-sys-step-head">{rule.title}</h3>
                  <div className="ap-sys-formula">{rule.formula}</div>
                  <p className="ap-sys-step-body">{rule.explanation}</p>
                </div>
              ))}
            </div>

            {item.codeSnippet && (
              <div style={{ marginTop: '8px' }}>
                <div className="ap-meta-label" style={{ marginBottom: '6px' }}>
                  Cuplikan Kode Inti: {item.codeSnippetTitle || 'Logika Utama'}
                </div>
                <pre className="ap-sys-code">
                  <code>{item.codeSnippet}</code>
                </pre>
              </div>
            )}
          </section>

          {/* 05. Struktur Data Keluar */}
          {item.sampleOutputHeaders && (
            <section className="ap-detail-block" aria-labelledby="sec-output">
              <h2 id="sec-output" className="ap-detail-block-title">
                <span className="ap-step-num-badge">05</span>
                Struktur Data Keluar (Contoh Simulasi Output)
              </h2>
              <div className="ap-table-wrap">
                <table className="ap-table">
                  <thead>
                    <tr>
                      {item.sampleOutputHeaders.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.sampleOutputRows.map((row, rIdx) => (
                      <tr key={`out-${rIdx}`}>
                        {row.map((cell, cIdx) => (
                          <td key={`out-${rIdx}-${cIdx}`}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* 06. Tools & Teknologi */}
          <section className="ap-detail-block" aria-labelledby="sec-tools">
            <h2 id="sec-tools" className="ap-detail-block-title">
              <span className="ap-step-num-badge">06</span>
              Tools &amp; Teknologi yang Dipakai
            </h2>
            <div className="ap-tag-row">
              {item.stack.map((stk) => (
                <span key={stk} className="ap-tag">
                  {stk}
                </span>
              ))}
            </div>
          </section>

          <nav className="ap-standalone-pager" aria-label="Navigasi Antar Studi Kasus">
            <div>
              {prevItem ? (
                <a href={`/kasus/${prevItem.id}`} className="ap-back-btn">
                  Sebelumnya: {prevItem.title}
                </a>
              ) : (
                <a href="/#studi-kasus" className="ap-back-btn">
                  Kembali ke Daftar Studi Kasus
                </a>
              )}
            </div>
            <div>
              {nextItem ? (
                <a href={`/kasus/${nextItem.id}`} className="ap-back-btn">
                  Selanjutnya: {nextItem.title}
                </a>
              ) : (
                <a href="/#studi-kasus" className="ap-back-btn">
                  Kembali ke Daftar Studi Kasus
                </a>
              )}
            </div>
          </nav>
        </article>
      </main>

      <footer className="ap-standalone-footer">
        <div className="ap-standalone-footer-inner">
          <span>
            &copy; {new Date().getFullYear()} <strong>{PROFILE_DATA.name}</strong>
          </span>
          <span>
            Dokumentasi Sistem &amp; Analisis Data (Angka Contoh Berlabel Data Simulasi)
          </span>
        </div>
      </footer>
    </div>
  );
}

