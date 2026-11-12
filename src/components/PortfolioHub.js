'use client';

import React, { useState, useEffect } from 'react';
import { ALL_CASES, PYTHON_SYSTEMS, WEB_SYSTEMS, PROFILE_DATA } from '../lib/pythonSystemsData';

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function PortfolioHub() {
  const [activeSection, setActiveSection] = useState('home');
  const [projectFilter, setProjectFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter projects by category: all, python, web
  const filteredProjects = ALL_CASES.filter((p) => {
    if (projectFilter === 'python') return p.groupType === 'python';
    if (projectFilter === 'web') return p.groupType === 'web';
    return true;
  });

  // Scroll spy to highlight active nav link
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < 80) {
        setActiveSection('home');
        return;
      }
      const sections = NAV_LINKS.map((item) => document.getElementById(item.id)).filter(Boolean);

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop - 120 <= scrollY) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Alternating section tone:
  // tone-alt: white sections ('about', 'experience', 'contact') -> navbar adapts to soft slate #f4f4f6
  // tone-default: off-white sections ('home', 'projects', 'skills') -> navbar adapts to pure white #ffffff
  const isWhiteSection = ['about', 'experience', 'contact'].includes(activeSection);

  return (
    <div className="mn-shell">
      {/* FLOATING CENTER PILL NAVBAR (WITH DYNAMIC ALTERNATING BACKGROUND) */}
      <header className="mn-nav-wrapper">
        <nav
          className={`mn-nav-pill ${isWhiteSection ? 'mn-nav-pill-alt' : 'mn-nav-pill-default'}`}
          aria-label="Main Navigation"
        >
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, 'home')}
            className="mn-nav-brand"
            aria-label="Back to top"
          >
            <span className="mn-brand-luxury">Fiq</span>
            <span className="mn-brand-dot">.</span>
          </a>

          <ul className="mn-nav-links">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className={`mn-nav-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="mn-nav-action">
            <a
              href={PROFILE_DATA.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mn-btn-resume"
              title="Download CV of Rofiq Samanhudi (PDF)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span>Resume</span>
            </a>

            <button
              type="button"
              className="mn-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 12h16M4 6h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="mn-mobile-dropdown">
            {NAV_LINKS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`mn-mobile-link ${activeSection === item.id ? 'active' : ''}`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* FLOATING RIGHT SOCIAL BUBBLES (4 BUBBLES) */}
      <aside className="mn-floating-dock" aria-label="Direct Contact">
        <a
          href={PROFILE_DATA.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mn-dock-bubble"
          aria-label="LinkedIn Profile"
          title="LinkedIn: in/rofiqsamanhudi"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>

        <a
          href={PROFILE_DATA.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mn-dock-bubble"
          aria-label="GitHub Profile"
          title="GitHub: github.com/rofiqsamanhudi"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>
        </a>

        <a
          href={PROFILE_DATA.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mn-dock-bubble"
          aria-label={`Instagram: ${PROFILE_DATA.instagramHandle}`}
          title={`Instagram: ${PROFILE_DATA.instagramHandle}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        <a
          href={PROFILE_DATA.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mn-dock-bubble"
          aria-label={`WhatsApp: ${PROFILE_DATA.phoneDisplay}`}
          title={`WhatsApp: ${PROFILE_DATA.phoneDisplay}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>

        <a
          href={`mailto:${PROFILE_DATA.email}`}
          className="mn-dock-bubble"
          aria-label={`Email: ${PROFILE_DATA.email}`}
          title={`Email: ${PROFILE_DATA.email}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
      </aside>

      <main>
        {/* HERO SECTION - SPLIT EDITORIAL SHOWCASE (OPTION 1) */}
        <section id="home" className="mn-hero-section">
          <div className="mn-container mn-hero-split-grid">
            {/* Left Column: Narrative, Typography & Direct Actions */}
            <div className="mn-hero-text-col">
              <div className="mn-status-pill">
                <span className="mn-status-dot" aria-hidden="true" />
                <span>Available for Career Opportunities &bull; Research &amp; Data Analyst</span>
              </div>

              <h1 className="mn-hero-display-title">Hello.</h1>

              <div className="mn-hero-byline-bar">
                <span className="mn-hairline" aria-hidden="true" />
                <span className="mn-byline-text">It&apos;s Rofiq, a Data Analyst &amp; Research Specialist</span>
              </div>

              <p className="mn-hero-summary">
                Informatics student specializing in Data Science at Universitas Muhammadiyah Malang. Focused on quantitative research, statistical classification, Python and R data analysis, automated ETL pipelines, and structured business dashboards.
              </p>

              <div className="mn-hero-cta">
                <a
                  href="#projects"
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className="mn-btn-primary"
                >
                  Explore Featured Projects
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>

                <a
                  href={PROFILE_DATA.cvPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mn-btn-secondary"
                >
                  Download Resume (PDF)
                </a>
              </div>

              <div className="mn-hero-highlights">
                <div className="mn-highlight-item">
                  <strong>10 Projects</strong>
                  <span>Completed Systems</span>
                </div>
                <span className="mn-highlight-sep">&bull;</span>
                <div className="mn-highlight-item">
                  <strong>Research &amp; Analysis</strong>
                  <span>Statistics &amp; Classification</span>
                </div>
              </div>
            </div>

            {/* Right Column: High-Definition Clean Sketch Artwork */}
            <div className="mn-hero-visual-col">
              <div className="mn-hero-sketch-frame">
                <img
                  src="/profile/rofiq-sketch-clean.jpg"
                  alt="Rofiq Samanhudi - Hand-drawn graphite pencil portrait"
                  width="764"
                  height="1024"
                  fetchPriority="high"
                  className="mn-hero-sketch-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION - REFINED EDITORIAL OVERVIEW */}
        <section id="about" className="mn-section mn-section-about">
          <div className="mn-container">
            <div className="mn-section-kicker">About Me.</div>
            <h2 className="mn-section-title">
              Bridging quantitative research and automated data engineering to turn raw numbers into dependable business decisions.
            </h2>

            <div className="mn-about-grid">
              {/* Left Column: Narrative & Focus Pillars */}
              <div className="mn-about-narrative-col">
                <p className="mn-about-lead">
                  I am an Informatics student specializing in Data Science at Universitas Muhammadiyah Malang. I specialize in structuring complex transactional data into verifiable analytical models, from exploratory hypothesis testing to statistical classification, SQL data modeling, and automated ETL pipelines.
                </p>

                <p className="mn-about-body">
                  During my industrial internships in manufacturing and e-commerce retail, I tackled real operational bottlenecks: building automated Python pipelines that consolidated sales across 7 marketplace platforms, implementing rolling inventory demand forecasts, and resolving warehouse inventory discrepancies with zero variance.
                </p>

                {/* Core Competency Checklist */}
                <div className="mn-about-competencies">
                  <div className="mn-competency-item">
                    <span className="mn-comp-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <strong>Automated ETL &amp; Integration:</strong> Python workflows consolidating multi-channel transactions without manual re-entry.
                    </div>
                  </div>

                  <div className="mn-competency-item">
                    <span className="mn-comp-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <strong>Quantitative Forecasting:</strong> Weighted Moving Average algorithms synchronizing purchasing with factory throughput.
                    </div>
                  </div>

                  <div className="mn-competency-item">
                    <span className="mn-comp-icon" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <div>
                      <strong>Audited Ledger Accuracy:</strong> Stock reconciliations cross-referencing multi-level BOMs with accounting records.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Grounded Professional Highlights */}
              <div className="mn-about-metrics-col">
                <div className="mn-impact-card">
                  <div className="mn-impact-badge">Core Stack</div>
                  <div className="mn-impact-stat">Python &amp; SQL</div>
                  <div className="mn-impact-title">Analysis &amp; ETL Pipelines</div>
                  <p className="mn-impact-desc">
                    Specialized in data manipulation with Pandas, automated batch ETL scripting, database schema querying, and Looker Studio decision dashboards.
                  </p>
                </div>

                <div className="mn-impact-card">
                  <div className="mn-impact-badge">Track Record</div>
                  <div className="mn-impact-stat">10 Projects</div>
                  <div className="mn-impact-title">Practical Systems Built</div>
                  <p className="mn-impact-desc">
                    Engineered operational solutions across factory demand forecasting, multi-channel marketplace data consolidation, warehouse inventory reconciliations, and tax data converters.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="mn-section mn-section-projects">
          <span id="studi-kasus" style={{ position: 'relative', top: '-100px', visibility: 'hidden' }} />

          <div className="mn-container">
            <div className="mn-projects-head">
              <div>
                <div className="mn-section-kicker">Projects.</div>
                <h2 className="mn-section-title-large">Featured Projects.</h2>
                <p className="mn-section-desc">
                  A curated collection of data engineering pipelines, operational calculators, and analytical tools built to resolve real-world challenges.
                </p>
              </div>

              <div className="mn-filter-tabs" role="tablist" aria-label="Project Category Filter">
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'all'}
                  onClick={() => setProjectFilter('all')}
                  className={`mn-filter-btn ${projectFilter === 'all' ? 'active' : ''}`}
                >
                  All ({ALL_CASES.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'python'}
                  onClick={() => setProjectFilter('python')}
                  className={`mn-filter-btn ${projectFilter === 'python' ? 'active' : ''}`}
                >
                  Python Pipelines ({PYTHON_SYSTEMS.length})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={projectFilter === 'web'}
                  onClick={() => setProjectFilter('web')}
                  className={`mn-filter-btn ${projectFilter === 'web' ? 'active' : ''}`}
                >
                  Web &amp; Analytics ({WEB_SYSTEMS.length})
                </button>
              </div>
            </div>

            {/* High-Craft Architectural Showcase Cards */}
            <div className="mn-projects-grid">
              {filteredProjects.map((item) => {
                const caseHref = `/kasus/${item.id}`;
                const badgeLabel = item.groupType === 'python' ? 'Python Pipeline' : 'Web & Analytics';

                return (
                  <article key={item.id} className="mn-project-card">
                    <div>
                      <div className="mn-card-header">
                        <div className="mn-card-tags">
                          <span className="mn-badge-code">{item.code}</span>
                          <span className="mn-badge-cat">{badgeLabel}</span>
                        </div>
                        <span className="mn-card-entity">{item.division || item.entity}</span>
                      </div>

                      <h3 className="mn-card-title">
                        <a href={caseHref} className="mn-card-title-link">
                          {item.title}
                        </a>
                      </h3>

                      <p className="mn-card-subtitle">{item.subtitle}</p>

                      <div className="mn-card-problem">
                        <span className="mn-problem-kicker">Operational Challenge</span>
                        <p>{item.problemStatement}</p>
                      </div>

                      {/* Key Project Scale Metrics */}
                      {item.metrics && item.metrics.length > 0 && (
                        <div className="mn-card-metrics-row">
                          {item.metrics.slice(0, 2).map((m) => (
                            <div key={m.label} className="mn-card-mini-metric">
                              <span className="mn-mini-val">{m.value}</span>
                              <span className="mn-mini-lbl">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mn-card-stack">
                        {item.stack.slice(0, 5).map((stk) => (
                          <span key={stk} className="mn-stack-tag">
                            {stk}
                          </span>
                        ))}
                        {item.stack.length > 5 && (
                          <span className="mn-stack-tag-more">+{item.stack.length - 5} more</span>
                        )}
                      </div>
                    </div>

                    <div className="mn-card-footer">
                      <a href={caseHref} className="mn-card-action">
                        <span>Explore Technical Workflow &amp; Logic</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION SECTION - SPLIT TIMELINE SHOWCASE */}
        <section id="experience" className="mn-section mn-section-experience">
          <div className="mn-container">
            <div className="mn-section-kicker">Resume.</div>
            <h2 className="mn-section-title-large">Professional Journey.</h2>
            <p className="mn-section-desc">
              Practical industry internships, university laboratory mentorship, and formal academic background.
            </p>

            <div className="mn-journey-grid">
              {/* LEFT COLUMN: WORK EXPERIENCE TIMELINE */}
              <div className="mn-journey-column">
                <div className="mn-journey-section-title">
                  <span className="mn-column-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="14" x="2" y="7" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  <span>Work Experience</span>
                </div>

                <div className="mn-journey-timeline">
                  <div className="mn-journey-line" aria-hidden="true" />

                  {PROFILE_DATA.experiences.map((exp) => (
                    <div key={`${exp.company}-${exp.role}-${exp.period}`} className="mn-journey-item">
                      <div className="mn-journey-node" aria-hidden="true">
                        <span className="mn-node-inner" />
                      </div>

                      <div className="mn-journey-head">
                        <div className="mn-journey-role-wrap">
                          <h3 className="mn-journey-role">{exp.role}</h3>
                          <span className="mn-journey-badge">{exp.period}</span>
                        </div>

                        <div className="mn-journey-meta">
                          <span className="mn-meta-org">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <rect width="16" height="20" x="4" y="2" rx="2" />
                              <path d="M9 22v-4h6v4" />
                              <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
                            </svg>
                            <span>{exp.company}</span>
                          </span>
                          <span className="mn-meta-sep">&bull;</span>
                          <span className="mn-meta-loc">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="mn-journey-card">
                        <ul className="mn-journey-checklist">
                          {(exp.highlights || []).map((h) => (
                            <li key={h} className="mn-journey-check-item">
                              <span className="mn-check-circle" aria-hidden="true">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </span>
                              <span className="mn-check-text">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: EDUCATION & CERTIFICATIONS */}
              <div className="mn-journey-sidebar">
                {/* EDUCATION BLOCK */}
                <div className="mn-sidebar-block">
                  <div className="mn-journey-section-title">
                    <span className="mn-column-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
                        <path d="M22 10v6" />
                        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
                      </svg>
                    </span>
                    <span>Education</span>
                  </div>

                  <div className="mn-education-card">
                    <h3 className="mn-education-degree">{PROFILE_DATA.education.degree}</h3>
                    <div className="mn-education-school">{PROFILE_DATA.education.institution}</div>
                    
                    <div className="mn-education-strip">
                      <span className="mn-edu-period">{PROFILE_DATA.education.period}</span>
                      <span className="mn-edu-sep">&bull;</span>
                      <span className="mn-edu-gpa">GPA: <strong>{PROFILE_DATA.education.gpa}</strong></span>
                    </div>

                    <ul className="mn-education-details">
                      {(PROFILE_DATA.education.details || []).map((d) => (
                        <li key={d} className="mn-edu-detail-item">
                          <span className="mn-check-circle" aria-hidden="true">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                          <span className="mn-edu-detail-text">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CERTIFICATIONS BLOCK */}
                <div className="mn-sidebar-block">
                  <div className="mn-journey-section-title">
                    <span className="mn-column-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
                        <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
                      </svg>
                    </span>
                    <span>Verified Certifications</span>
                  </div>

                  <div className="mn-cert-stack">
                    {PROFILE_DATA.certifications.map((cert) => (
                      <div key={cert.title} className="mn-cert-row">
                        <div className="mn-cert-title">{cert.title}</div>
                        <div className="mn-cert-meta">
                          <span>{cert.issuer}</span>
                          <span className="mn-meta-sep">&bull;</span>
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="mn-section mn-section-skills">
          <div className="mn-container">
            <div className="mn-section-kicker">Skills.</div>
            <h2 className="mn-section-title-large">Skills &amp; Technologies.</h2>
            <p className="mn-section-desc">
              Technical tools, programming languages, and analytical methodologies applied across projects.
            </p>

            <div className="mn-skills-grid">
              {PROFILE_DATA.skillGroups.map((grp) => (
                <div key={grp.category} className="mn-skill-box">
                  <h3 className="mn-skill-title">{grp.category}</h3>
                  <div className="mn-skill-tags">
                    {grp.items.map((it) => (
                      <span key={it} className="mn-skill-tag">
                        {it}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="mn-section mn-section-contact">
          <div className="mn-container mn-contact-wrap">
            <div className="mn-section-kicker">Get in touch.</div>
            <h2 className="mn-contact-title">
              Let&apos;s build something impactful.
            </h2>
            <p className="mn-contact-desc">
              Open to career opportunities as a Research &amp; Data Analyst and Data Engineer, data automation initiatives, and collaborative technical projects.
            </p>

            <div className="mn-contact-grid">
              {/* Row 1: Direct Communication Channels */}
              <div className="mn-contact-row-primary">
                <a href={`mailto:${PROFILE_DATA.email}`} className="mn-contact-card">
                  <div className="mn-contact-card-top">
                    <div className="mn-contact-icon-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <span className="mn-contact-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  <div className="mn-contact-label">Email</div>
                  <div className="mn-contact-val">{PROFILE_DATA.email}</div>
                </a>

                <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="mn-contact-card">
                  <div className="mn-contact-card-top">
                    <div className="mn-contact-icon-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span className="mn-contact-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  <div className="mn-contact-label">WhatsApp</div>
                  <div className="mn-contact-val">{PROFILE_DATA.phoneDisplay}</div>
                </a>
              </div>

              {/* Row 2: Professional Profiles & Socials */}
              <div className="mn-contact-row-secondary">
                <a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" className="mn-contact-card">
                  <div className="mn-contact-card-top">
                    <div className="mn-contact-icon-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <span className="mn-contact-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  <div className="mn-contact-label">LinkedIn</div>
                  <div className="mn-contact-val">in/rofiqsamanhudi</div>
                </a>

                <a href={PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer" className="mn-contact-card">
                  <div className="mn-contact-card-top">
                    <div className="mn-contact-icon-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    </div>
                    <span className="mn-contact-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  <div className="mn-contact-label">GitHub</div>
                  <div className="mn-contact-val">github.com/rofiqsamanhudi</div>
                </a>

                <a href={PROFILE_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="mn-contact-card">
                  <div className="mn-contact-card-top">
                    <div className="mn-contact-icon-badge">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </div>
                    <span className="mn-contact-arrow" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  <div className="mn-contact-label">Instagram</div>
                  <div className="mn-contact-val">{PROFILE_DATA.instagramHandle}</div>
                </a>
              </div>
            </div>

            <div className="mn-contact-cta">
              <a
                href={PROFILE_DATA.cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mn-btn-primary mn-btn-large"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Curriculum Vitae (PDF)
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mn-footer">
        <div className="mn-container mn-footer-flex">
          <div className="mn-footer-left">
            <span className="mn-footer-brand">
              <span className="mn-brand-luxury">Fiq</span>
              <span className="mn-brand-dot">.</span>
            </span>
            <span>Rofiq Samanhudi &bull; Research &amp; Data Analyst | Data Engineer</span>
          </div>
          <div className="mn-footer-right">
            &copy; {new Date().getFullYear()} Rofiq Samanhudi. All sample datasets labeled as technical simulations.
          </div>
        </div>
      </footer>
    </div>
  );
}
