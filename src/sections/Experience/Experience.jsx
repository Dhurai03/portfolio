import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Project data ── */
const projects = [
  {
    year: '2026',
    status: 'Developing',
    title: 'AI Grievance Redressal Portal',
    org: 'Academic Research Project',
    desc: 'Built and deployed an NLP-powered citizen grievance management system integrating classification models with a Flask backend and React frontend.',
    tech: ['NLP', 'Flask', 'MongoDB', 'React', 'Deployment'],
    accent: '#00D4FF',
    link: null,
  },
  {
    year: '2026',
    status: 'Web Application',
    title: 'Project Cost Estimator',
    org: 'Full-Stack MERN Application',
    desc: 'Professional estimation platform supporting Function Point Analysis (FPA), COCOMO, and Analogy-based estimation with role-based authentication, multi-currency support, and PDF export.',
    tech: ['React.js', 'Express.js', 'Node.js', 'MongoDB', 'JWT', 'Recharts'],
    accent: '#7C3AED',
    link: null,
  },
  {
    year: '2025',
    status: 'Research & Development',
    title: 'HydroIndex',
    org: 'Water Quality Monitoring System',
    desc: 'ML-based groundwater analysis platform with Heavy Metal Pollution Index (HMPI) computation and XGBoost forecasting for contamination prediction. Features batch processing for 1000+ samples with live visualization dashboard.',
    tech: ['Python', 'XGBoost', 'FastAPI', 'React.js', 'Data Analysis'],
    accent: '#00D4FF',
    link: 'https://hydro-index.vercel.app',
  },
  {
    year: '2025',
    status: 'Web Application',
    title: 'VoxFix',
    org: 'AI-Powered Grammar & Speech Assistant',
    desc: 'Full-stack application combining voice-to-text speech recognition with Google Gemini AI grammar correction. Features user authentication with MongoDB, dual-interface for voice and text input, and detailed grammatical breakdown with suggestions.',
    tech: ['React.js', 'Flask', 'Express.js', 'Google Gemini AI', 'MongoDB'],
    accent: '#7C3AED',
    link: null,
  },
];

/* ── Education data ── */
const education = {
  period: '2022 – 2026',
  degree: 'B.E. Computer Science & Business Systems',
  institution: 'Sri Eshwar College of Engineering',
  sub: 'Affiliated with Anna University',
  details: ['CGPA: 8.0+', 'AI/ML Specialization', 'Full Stack', 'Cloud Computing'],
};

/* ── SVG icons ── */
const IconCode = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const IconGraduate = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default function Experience() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const cardsRef    = useRef([]);
  const eduRef      = useRef(null);
  const footerRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40, filter: 'blur(6px)' },
          {
            opacity: 1, y: 0, filter: 'blur(0px)',
            duration: 0.75, ease: 'power3.out',
            delay: i * 0.09,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });

      if (eduRef.current) {
        gsap.fromTo(eduRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
            scrollTrigger: { trigger: eduRef.current, start: 'top 85%' },
          }
        );
      }

      if (footerRef.current) {
        gsap.fromTo(footerRef.current,
          { opacity: 0 },
          {
            opacity: 1, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: footerRef.current, start: 'top 95%' },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="experience-section section-full">
      <div className="exp-bg-glow" />
      <div className="section">

        {/* Header */}
        <div ref={titleRef} className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
            Timeline
          </span>
          <h2 className="section-title">
            Projects & <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-sub">
            Academic milestones, shipped projects, and continuous learning — every step building toward something bigger.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="exp-layout">

          {/* Left: Project cards */}
          <div className="exp-projects">
            <div className="exp-col-label">
              <IconCode />
              <span>Projects</span>
            </div>

            <div className="project-cards-list">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  ref={el => (cardsRef.current[i] = el)}
                  className="proj-card glass glow-card"
                  style={{ '--proj-accent': proj.accent }}
                >
                  {/* Top accent */}
                  <div className="proj-card-accent" style={{ background: `linear-gradient(90deg, ${proj.accent}, transparent)` }} />

                  <div className="proj-card-inner">
                    {/* Year + status row */}
                    <div className="proj-meta-row">
                      <span className="proj-year" style={{ color: proj.accent }}>{proj.year}</span>
                      <span className="proj-status-chip" style={{ color: proj.accent, borderColor: `${proj.accent}28`, background: `${proj.accent}0d` }}>
                        {proj.status}
                      </span>
                    </div>

                    <h3 className="proj-title">{proj.title}</h3>
                    <p className="proj-org">{proj.org}</p>
                    <p className="proj-desc">{proj.desc}</p>

                    {/* Tech chips */}
                    <div className="proj-tech-chips">
                      {proj.tech.map(t => (
                        <span key={t} className="proj-tech-chip" style={{ borderColor: `${proj.accent}20`, color: `${proj.accent}bb` }}>{t}</span>
                      ))}
                    </div>

                    {/* Live link */}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-live-link" style={{ color: proj.accent }}>
                        <IconLink />
                        {proj.link.replace('https://', '')}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education */}
          <div className="exp-sidebar">
            <div className="exp-col-label">
              <IconGraduate />
              <span>Education</span>
            </div>

            <div ref={eduRef} className="edu-card glass glow-card">
              <div className="edu-card-accent" />
              <div className="edu-card-inner">
                <span className="edu-period">{education.period}</span>
                <h3 className="edu-degree">{education.degree}</h3>
                <p className="edu-institution">{education.institution}</p>
                <p className="edu-sub">{education.sub}</p>
                <div className="edu-tags">
                  {education.details.map(d => (
                    <span key={d} className="edu-tag">{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer ref={footerRef} className="site-footer">
          <div className="footer-line" />
          <div className="footer-inner">
            <p className="footer-text">
              Crafted with
              <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--neon-blue)" style={{ margin: '0 4px', verticalAlign: 'middle' }}>
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
              </svg>
              by <span className="text-gradient">Dhurai Murugan B</span>
            </p>
            <p className="footer-sub">CS & Business Systems · {new Date().getFullYear()}</p>
          </div>
        </footer>

      </div>
    </section>
  );
}
