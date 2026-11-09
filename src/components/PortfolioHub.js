'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ALL_CASES, PROFILE_DATA } from '../lib/pythonSystemsData';

const NAV_ITEMS = [
  { id: 'ringkasan', label: 'Ringkasan' },
  { id: 'studi-kasus', label: 'Studi Kasus' },
  { id: 'keahlian', label: 'Keahlian & Tools' },
  { id: 'cv', label: 'Pengalaman & Pendidikan' },
];

function ProfileSidebar() {
  return (
    <aside className="ap-sidebar-fixed" aria-label="Profil dan Kontak Rofiq Samanhudi">
      <div className="ap-sidebar-top">
        <div className="ap-avatar-circle-wrap">
          <img
            src={PROFILE_DATA.photos.formal}
            alt="Foto formal Rofiq Samanhudi"
            width="130"
            height="130"
            fetchPriority="high"
            className="ap-avatar-circle"
          />
        </div>

        <div className="ap-sidebar-header-info">
          <h1 className="ap-sidebar-name">{PROFILE_DATA.name}</h1>
          <div className="ap-sidebar-role">{PROFILE_DATA.role}</div>
        </div>

        <p className="ap-sidebar-bio">
          Data Engineer &amp; Analyst yang berfokus pada otomasi pipeline ETL Python, sistem cost control produksi manufaktur, serta dashboard analitik operasional untuk industri e-commerce.
        </p>

        <ul className="ap-sidebar-links" aria-label="Daftar Kontak">
          <li>
            <div className="ap-sidebar-link-item" title="Domisili">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="ap-sidebar-link-text">Malang, Jawa Timur, Indonesia</span>
            </div>
          </li>
          <li>
            <a href={`mailto:${PROFILE_DATA.email}`} className="ap-sidebar-link-item" title="Kirim Email">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="ap-sidebar-link-text">{PROFILE_DATA.email}</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_DATA.whatsappUrl} target="_blank" rel="noopener noreferrer" className="ap-sidebar-link-item" title="Chat WhatsApp">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="ap-sidebar-link-text">{PROFILE_DATA.phoneDisplay}</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_DATA.linkedinUrl} target="_blank" rel="noopener noreferrer" className="ap-sidebar-link-item" title="Profil LinkedIn">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="ap-sidebar-link-text">in/rofiqsamanhudi</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_DATA.githubUrl} target="_blank" rel="noopener noreferrer" className="ap-sidebar-link-item" title="Profil GitHub">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span className="ap-sidebar-link-text">github.com/rofiqsamanhudi</span>
            </a>
          </li>
          <li>
            <a href={PROFILE_DATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="ap-sidebar-link-item" title="Profil Instagram">
              <svg className="ap-sidebar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              <span className="ap-sidebar-link-text">{PROFILE_DATA.instagramHandle}</span>
            </a>
          </li>
        </ul>

        <div className="ap-sidebar-skills" aria-label="Keahlian Inti">
          <span className="ap-sidebar-skill-tag">Cost Control</span>
          <span className="ap-sidebar-skill-tag">Python (ETL)</span>
          <span className="ap-sidebar-skill-tag">SQL</span>
          <span className="ap-sidebar-skill-tag">Looker Studio</span>
          <span className="ap-sidebar-skill-tag">Next.js</span>
        </div>
      </div>

      <div className="ap-sidebar-bottom">
        <a
          href={PROFILE_DATA.cvPdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ap-btn-primary"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Unduh CV (PDF)
        </a>
      </div>
    </aside>
  );
}

function SectionNav({ activeSection, onNavigate }) {
  return (
    <header className="ap-workspace-header">
      <nav className="ap-section-nav" aria-label="Navigasi Bagian Portofolio">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => onNavigate(e, item.id)}
              className={`ap-nav-link ${isActive ? 'active' : ''}`}
              aria-current={isActive ? 'location' : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}

function CaseRow({ item }) {
  const caseHref = `/kasus/${item.id}`;

  return (
    <article className="ap-case-row">
      <div className="ap-case-row-top">
        <div>
          <h3>
            <a
              href={caseHref}
              target="_blank"
              rel="noopener noreferrer"
              className="ap-case-title-btn"
            >
              {item.title}
            </a>
          </h3>
          <div className="ap-case-meta">
            <span>{item.entity}</span>
            <span>&bull;</span>
            <span>{item.division || item.category}</span>
          </div>
        </div>

        <a
          href={caseHref}
          target="_blank"
          rel="noopener noreferrer"
          className="ap-open-case-btn"
        >
          Lihat alur &amp; rumus
        </a>
      </div>

      <p className="ap-case-problem">{item.problemStatement}</p>

      <div className="ap-case-footer">
        <div className="ap-tag-row">
          {item.stack.map((stk) => (
            <span key={stk} className="ap-tag">
              {stk}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function PortfolioHub() {
  const [activeSection, setActiveSection] = useState('ringkasan');
  const scrollContainerRef = useRef(null);

  // Sync URL hash (#<section>) on load and hashchange
  useEffect(() => {
    const applyHash = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      if (NAV_ITEMS.some((n) => n.id === rawHash)) {
        setActiveSection(rawHash);
      }
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  // Scroll-spy for section navigation inside .ap-workspace-scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      let currentId = 'ringkasan';
      for (const item of NAV_ITEMS) {
        const sectionEl = document.getElementById(item.id);
        if (sectionEl) {
          const rect = sectionEl.getBoundingClientRect();
          if (rect.top - containerRect.top <= 120) {
            currentId = item.id;
          }
        }
      }
      setActiveSection(currentId);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (e, sectionId) => {
    e.preventDefault();
    setActiveSection(sectionId);
    window.history.pushState(null, '', `#${sectionId}`);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const pythonCases = ALL_CASES.filter((c) => c.groupType === 'python');
  const webCases = ALL_CASES.filter((c) => c.groupType === 'web');

  return (
    <div className="ap-shell">
      <div className="ap-frame">
        <ProfileSidebar />

        <main className="ap-workspace" aria-label="Dokumentasi Portofolio dan Hasil Analisis">
          <SectionNav activeSection={activeSection} onNavigate={handleNavigate} />

          <div className="ap-workspace-scroll" ref={scrollContainerRef}>
            {/* 1. RINGKASAN */}
            <section id="ringkasan" className="ap-section" aria-labelledby="heading-ringkasan">
              <div className="ap-section-header">
                <h2 id="heading-ringkasan" className="ap-section-title">
                  Ringkasan Kerja
                </h2>
                <span className="ap-section-subtitle">
                  Data Engineering, Otomasi Pipeline ETL &amp; Analisis Operasional
                </span>
              </div>

              <div className="ap-summary-grid">
                <div className="ap-summary-main">
                  <p className="ap-prose">
                    Saya <strong>Rofiq Samanhudi</strong>, lulusan S1 Informatika (Peminatan Data Science) Universitas Muhammadiyah Malang dengan IPK <strong>3,82 / 4,00</strong>. Saya berfokus pada <strong>Data Engineering</strong> dan <strong>Data Analytics</strong> untuk menyelesaikan tantangan operasional riil, menjembatani data mentah menjadi keputusan bisnis yang presisi.
                  </p>
                  <p className="ap-prose">
                    Melalui pengalaman kerja dan magang di <strong>PT. Kilap Global Group &amp; PT Kilapkan Seluruh Bangsa</strong>, saya membangun skrip otomasi <strong>Python (Pandas, NumPy, OpenPyXL)</strong>, query basis data <strong>SQL</strong>, serta model kalkulasi <strong>Cost Control Produksi (Analisis Biaya Material &amp; HPP)</strong> untuk mengeliminasi rekapitulasi manual yang rawan diskrepansi. Saya juga merancang dashboard interaktif <strong>Looker Studio</strong> untuk divisi B2B dan Finance, mengembangkan tools web internal berbasis <strong>Next.js</strong>, serta mengeksekusi analisis performa berkala (weekly, monthly, dan kuartalan) lintas divisi bersama tim R&amp;D, Host Live, dan Data.
                  </p>
                </div>

                <div className="ap-summary-cards">
                  <div className="ap-summary-card">
                    <span className="ap-summary-card-num">01</span>
                    <div>
                      <h3 className="ap-summary-card-title">Otomasi Pipeline ETL &amp; Rekonsiliasi</h3>
                      <p className="ap-summary-card-desc">
                        Standardisasi data multi-channel marketplace, generator XML DJP CoreTax, audit stok gudang fisik vs sistem, serta integrasi spreadsheet terstruktur.
                      </p>
                    </div>
                  </div>

                  <div className="ap-summary-card">
                    <span className="ap-summary-card-num">02</span>
                    <div>
                      <h3 className="ap-summary-card-title">Cost Control &amp; Biaya Produksi</h3>
                      <p className="ap-summary-card-desc">
                        Pengendalian biaya dan estimasi kebutuhan komponen kemasan (botol, tutup, stiker, kardus) serta formula cairan dengan presisi standar keuangan pabrik.
                      </p>
                    </div>
                  </div>

                  <div className="ap-summary-card">
                    <span className="ap-summary-card-num">03</span>
                    <div>
                      <h3 className="ap-summary-card-title">Analitik Bisnis &amp; Evaluasi Lintas Tim</h3>
                      <p className="ap-summary-card-desc">
                        Dashboard Looker Studio (Finance &amp; B2B) dan penyusunan insight rutin mingguan, bulanan, serta kuartalan untuk tim R&amp;D, Host Live, dan Data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. STUDI KASUS */}
            <section id="studi-kasus" className="ap-section" aria-labelledby="heading-studi-kasus">
              <div className="ap-section-header">
                <div>
                  <h2 id="heading-studi-kasus" className="ap-section-title">
                    Studi Kasus &amp; Arsitektur Sistem
                  </h2>
                  <span className="ap-section-subtitle">
                    Pilih judul proyek atau tombol Lihat alur &amp; rumus untuk membuka rincian teknis di tab baru
                  </span>
                </div>
              </div>

              <div>
                <div className="ap-group-subheading">
                  <span>Pipeline ETL &amp; Otomasi Operasional Python</span>
                  <span>5 Studi Kasus</span>
                </div>
                <div className="ap-case-list">
                  {pythonCases.map((item) => (
                    <CaseRow key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <div className="ap-group-subheading">
                  <span>Sistem Internal &amp; Kalkulator Web (Next.js)</span>
                  <span>5 Studi Kasus</span>
                </div>
                <div className="ap-case-list">
                  {webCases.map((item) => (
                    <CaseRow key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </section>

            {/* 3. KEAHLIAN & TOOLS */}
            <section id="keahlian" className="ap-section" aria-labelledby="heading-keahlian">
              <div className="ap-section-header">
                <h2 id="heading-keahlian" className="ap-section-title">
                  Keahlian &amp; Instrumen Teknis
                </h2>
                <span className="ap-section-subtitle">
                  Kelompok Alat Kerja yang Dipakai pada Proyek di Atas
                </span>
              </div>

              <div className="ap-skills-grid">
                {PROFILE_DATA.skillGroups.map((grp) => (
                  <div key={grp.category} className="ap-skill-group-card">
                    <h3 className="ap-skill-group-title">{grp.category}</h3>
                    <div className="ap-tag-row">
                      {grp.items.map((it) => (
                        <span key={it} className="ap-tag">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. PENGALAMAN & PENDIDIKAN */}
            <section id="cv" className="ap-section" aria-labelledby="heading-cv">
              <div className="ap-section-header">
                <h2 id="heading-cv" className="ap-section-title">
                  Pengalaman, Pendidikan &amp; Sertifikasi
                </h2>
                <span className="ap-section-subtitle">
                  Riwayat Kerja, Akademik &amp; Pelatihan
                </span>
              </div>

              <div className="ap-case-list">
                {PROFILE_DATA.experiences.map((exp) => (
                  <article key={`${exp.company}-${exp.role}-${exp.period}`} className="ap-case-row">
                    <div>
                      <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text)' }}>
                        {exp.role}
                      </h3>
                      <div className="ap-case-meta">
                        <strong>{exp.company}</strong>
                        <span>&bull;</span>
                        <span>{exp.location}</span>
                        <span>&bull;</span>
                        <span className="ap-code-badge">{exp.period}</span>
                      </div>
                    </div>
                    <ul className="ap-bullet-list">
                      {(exp.highlights || []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}

                <article className="ap-case-row">
                  <div>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text)' }}>
                      {PROFILE_DATA.education.degree}
                    </h3>
                    <div className="ap-case-meta">
                      <strong>{PROFILE_DATA.education.institution}</strong>
                      <span>&bull;</span>
                      <span>{PROFILE_DATA.education.period}</span>
                      <span>&bull;</span>
                      <span className="ap-code-badge">IPK: {PROFILE_DATA.education.gpa}</span>
                    </div>
                  </div>
                  <ul className="ap-bullet-list">
                    {(PROFILE_DATA.education.details || []).map((dt) => (
                      <li key={dt}>{dt}</li>
                    ))}
                  </ul>
                </article>

                <article className="ap-case-row" style={{ borderBottom: 'none' }}>
                  <div>
                    <h3 style={{ fontSize: '15.5px', fontWeight: 800, color: 'var(--text)' }}>
                      Sertifikasi &amp; Pelatihan
                    </h3>
                  </div>
                  <ul className="ap-bullet-list">
                    {PROFILE_DATA.certifications.map((cert) => (
                      <li key={cert.title}>
                        <strong>{cert.title}</strong> ({cert.issuer}, {cert.date})
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </section>
          </div>

          <footer className="ap-workspace-footer">
            <span>
              &copy; {new Date().getFullYear()} <strong>{PROFILE_DATA.name}</strong>
            </span>
            <span>Dokumentasi Sistem &amp; Analisis Data (Angka Contoh Berlabel Data Simulasi)</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
