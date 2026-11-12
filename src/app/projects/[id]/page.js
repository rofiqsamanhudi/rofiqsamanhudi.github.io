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
      title: `Project Not Found | ${PROFILE_DATA.name}`,
    };
  }

  return {
    title: `${item.title} | ${PROFILE_DATA.name}`,
    description: item.subtitle || item.problemStatement,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const index = ALL_CASES.findIndex((c) => c.id === id);

  if (index === -1) {
    notFound();
  }

  const item = ALL_CASES[index];
  const prevItem = index > 0 ? ALL_CASES[index - 1] : null;
  const nextItem = index < ALL_CASES.length - 1 ? ALL_CASES[index + 1] : null;
  const categoryLabel =
    item.groupType === 'python'
      ? 'Python Pipeline'
      : item.groupType === 'web'
      ? 'Web & Analytics'
      : 'Machine Learning & AI';

  return (
    <div className="ap-standalone-shell">
      <header className="ap-standalone-header">
        <div className="ap-standalone-header-inner">
          <div className="ap-standalone-brand">
            <a href="/#home" className="ap-header-logo" aria-label="Home">
              <span className="mn-brand-luxury">Fiq</span>
              <span className="mn-brand-dot">.</span>
            </a>
            <span className="ap-header-sep" aria-hidden="true" />
            <a href="/#projects" className="ap-back-btn">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to Projects
            </a>
          </div>
          <div className="ap-header-meta">
            <span className="ap-header-cat-pill">{categoryLabel}</span>
            <span className="ap-sim-badge">Project {item.code} of {String(ALL_CASES.length).padStart(2, '0')}</span>
          </div>
        </div>
      </header>

      <main className="ap-standalone-main" aria-label={`Technical Project Overview: ${item.title}`}>
        <article className="ap-case-detail-view">
          <div className="ap-detail-header-block">
            <div className="ap-detail-meta-row">
              <span className="ap-code-badge">{item.code}</span>
              <span className="ap-detail-entity-badge">{item.entity}</span>
              <span>&bull;</span>
              <span>{item.division || item.category}</span>
              <span className="ap-cat-tag">{categoryLabel}</span>
            </div>
            <h1 className="ap-detail-title">{item.title}</h1>
            <p className="ap-detail-subtitle">{item.subtitle}</p>

            {(item.githubUrl || item.liveUrl) && (
              <div className="ap-header-actions">
                {item.githubUrl && (
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mn-card-icon-action"
                    style={{ padding: '7px 14px', fontSize: '13px' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    </svg>
                    <span>View Repository on GitHub</span>
                  </a>
                )}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mn-card-icon-action mn-card-live-pill"
                    style={{ padding: '7px 14px', fontSize: '13px' }}
                  >
                    <span className="mn-live-indicator-dot" aria-hidden="true" />
                    <span>Open Live Streamlit Application</span>
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

          <section className="ap-detail-block" aria-labelledby="sec-challenge">
            <h2 id="sec-challenge" className="ap-detail-block-title">
              <span className="ap-step-num-badge">01</span>
              {item.groupType === 'academic' ? 'Research & Engineering Challenge' : 'Business & Operational Challenge'}
            </h2>
            <div className="ap-problem-callout">
              <p style={{ margin: 0 }}>{item.problemStatement}</p>
            </div>
          </section>

          {item.sampleInputHeaders && (
            <section className="ap-detail-block" aria-labelledby="sec-input">
              <h2 id="sec-input" className="ap-detail-block-title">
                <span className="ap-step-num-badge">02</span>
                Input Data Structure &amp; Format
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

          <section className="ap-detail-block" aria-labelledby="sec-workflow">
            <h2 id="sec-workflow" className="ap-detail-block-title">
              <span className="ap-step-num-badge">03</span>
              System Architecture &amp; Workflow ({item.workflowSteps.length} Steps)
            </h2>
            <div className="ap-sys-steps">
              {item.workflowSteps.map((ws, idx) => (
                <div key={ws.step} className="ap-sys-step-card">
                  <h3 className="ap-sys-step-head">
                    <span className="ap-step-mini-num">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span>{ws.step.replace(/^\d+\.\s*/, '')}</span>
                  </h3>
                  <p className="ap-sys-step-body">{ws.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="ap-detail-block" aria-labelledby="sec-logic">
            <h2 id="sec-logic" className="ap-detail-block-title">
              <span className="ap-step-num-badge">04</span>
              Calculation Logic, Formulas &amp; Algorithms
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
              <div className="ap-code-wrapper">
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
                Output Data Structure &amp; Analytical Results
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

          <nav className="ap-standalone-pager" aria-label="Project Navigation">
            <div className="ap-pager-prev">
              {prevItem && (
                <a href={`/projects/${prevItem.id}`} className="ap-pager-btn" title={prevItem.title}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                  <span>Prev: {prevItem.title}</span>
                </a>
              )}
            </div>

            <div className="ap-pager-center">
              <a href="/#projects" className="ap-pager-btn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span>All {ALL_CASES.length} Projects</span>
              </a>
            </div>

            <div className="ap-pager-next">
              {nextItem && (
                <a href={`/projects/${nextItem.id}`} className="ap-pager-btn" title={nextItem.title}>
                  <span>Next: {nextItem.title}</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              )}
            </div>
          </nav>
        </article>
      </main>

      <footer className="ap-standalone-footer">
        <div className="ap-standalone-footer-inner">
          <div className="ap-footer-left">
            <span className="mn-brand-luxury">Fiq</span>
            <span className="mn-brand-dot">.</span>
            <span>{PROFILE_DATA.name} &bull; {PROFILE_DATA.role}</span>
          </div>
          <div className="ap-footer-right">
            <span>System Architecture &amp; Data Analysis Documentation &bull; Technical Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

