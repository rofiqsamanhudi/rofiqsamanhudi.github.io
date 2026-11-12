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
      title: `Case Study Not Found | ${PROFILE_DATA.name}`,
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Main Portfolio
            </a>
            <span className="ap-standalone-author">
              {PROFILE_DATA.name} &bull; {PROFILE_DATA.role}
            </span>
          </div>
          <div className="ap-case-meta" style={{ marginTop: 0 }}>
            <span className="ap-sim-badge">System Workflow &amp; Formulas</span>
          </div>
        </div>
      </header>

      <main className="ap-standalone-main" aria-label={`Technical Case Study: ${item.title}`}>
        <article className="ap-case-detail-view">
          <div className="ap-detail-header-block">
            <div className="ap-detail-meta-row">
              <span className="ap-detail-entity-badge">{item.entity}</span>
              <span>&bull;</span>
              <span>{item.division || item.category}</span>
              {item.category && (
                <>
                  <span>&bull;</span>
                  <span className="ap-code-badge">{item.category}</span>
                </>
              )}
            </div>
            <h1 className="ap-detail-title">{item.title}</h1>
            <p className="ap-detail-subtitle">{item.subtitle}</p>

            {(item.githubUrl || item.liveUrl) && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mn-card-icon-action"
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    <span>View Source Repository on GitHub</span>
                  </a>
                )}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mn-card-icon-action mn-card-live-pill"
                    style={{ padding: '6px 14px', fontSize: '13px' }}
                  >
                    <span className="mn-live-indicator-dot" aria-hidden="true" />
                    <span>Launch Live Streamlit Application</span>
                  </a>
                )}
              </div>
            )}
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

          <section className="ap-detail-block" aria-labelledby="sec-masalah">
            <h2 id="sec-masalah" className="ap-detail-block-title">
              <span className="ap-step-num-badge">01</span>
              Business &amp; Operational Challenge
            </h2>
            <div className="ap-problem-callout">
              <p style={{ margin: 0 }}>{item.problemStatement}</p>
            </div>
          </section>

          {item.sampleInputHeaders && (
            <section className="ap-detail-block" aria-labelledby="sec-input">
              <h2 id="sec-input" className="ap-detail-block-title">
                <span className="ap-step-num-badge">02</span>
                Input Data Structure (Simulated Sample)
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

          <section className="ap-detail-block" aria-labelledby="sec-alur">
            <h2 id="sec-alur" className="ap-detail-block-title">
              <span className="ap-step-num-badge">03</span>
              System Workflow ({item.workflowSteps.length} Steps)
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

          <section className="ap-detail-block" aria-labelledby="sec-rumus">
            <h2 id="sec-rumus" className="ap-detail-block-title">
              <span className="ap-step-num-badge">04</span>
              Calculation Logic &amp; Formulas
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
              <div style={{ marginTop: '12px' }}>
                <div className="ap-code-header-bar">
                  <span>{item.codeSnippetTitle || 'Automation Code & Core Logic'}</span>
                  <span className="ap-code-badge">
                    {item.entryFile || (item.groupType === 'python' ? 'Python' : 'Next.js')}
                  </span>
                </div>
                <pre className="ap-sys-code">
                  <code>{item.codeSnippet}</code>
                </pre>
              </div>
            )}
          </section>

          {item.sampleOutputHeaders && (
            <section className="ap-detail-block" aria-labelledby="sec-output">
              <h2 id="sec-output" className="ap-detail-block-title">
                <span className="ap-step-num-badge">05</span>
                Output Data Structure (Simulated Sample)
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

          <section className="ap-detail-block" aria-labelledby="sec-tools">
            <h2 id="sec-tools" className="ap-detail-block-title">
              <span className="ap-step-num-badge">06</span>
              Tools &amp; Technologies Used
            </h2>
            <div className="ap-tag-row">
              {item.stack.map((stk) => (
                <span key={stk} className="ap-tag">
                  {stk}
                </span>
              ))}
            </div>
          </section>

          <nav className="ap-standalone-pager" aria-label="Case Study Navigation">
            <div>
              {prevItem ? (
                <a href={`/kasus/${prevItem.id}`} className="ap-back-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Previous: {prevItem.title}
                </a>
              ) : (
                <a href="/#studi-kasus" className="ap-back-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  Back to Portfolio
                </a>
              )}
            </div>

            <a href="/#studi-kasus" className="ap-back-btn ap-back-home-center">
              All Projects &amp; System Architecture
            </a>

            <div>
              {nextItem ? (
                <a href={`/kasus/${nextItem.id}`} className="ap-back-btn">
                  Next: {nextItem.title}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              ) : (
                <a href="/#studi-kasus" className="ap-back-btn">
                  Back to Portfolio
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
            System Architecture &amp; Data Analysis Documentation (Simulated Sample Data)
          </span>
        </div>
      </footer>
    </div>
  );
}
