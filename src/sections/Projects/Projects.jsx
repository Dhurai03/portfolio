import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 'hydroindex',
    number: '01',
    title: 'HydroIndex',
    tagline: 'Water Quality Monitoring System',
    description:
      'ML-based groundwater analysis platform with Heavy Metal Pollution Index (HMPI) computation and XGBoost forecasting for contamination prediction. Features batch processing for 1000+ samples with a live visualization dashboard.',
    stack: ['Python', 'XGBoost', 'FastAPI', 'React.js', 'Data Analysis'],
    accent: '#00D4FF',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.05) 100%)',
    github: 'https://github.com/dhuraimurugan',
    live: 'https://hydro-index.vercel.app',
    features: ['HMPI computation engine', 'XGBoost contamination forecasting', 'Batch processing 1000+ samples', 'Live visualization dashboard'],
  },
  {
    id: 'cost-estimator',
    number: '02',
    title: 'Project Cost Estimator',
    tagline: 'Professional Estimation Platform',
    description:
      'Full-stack MERN application for estimating and tracking project costs using FPA, COCOMO, and Analogy-based methodologies. Includes role-based JWT authentication, multi-currency support, Recharts dashboards, and PDF export.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Recharts'],
    accent: '#7C3AED',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(0,212,255,0.05) 100%)',
    github: 'https://github.com/dhuraimurugan',
    live: null,
    features: ['FPA, COCOMO & Analogy estimation', 'Role-based JWT auth', 'Multi-currency support', 'PDF export & Recharts dashboard'],
  },
  {
    id: 'voxfix',
    number: '03',
    title: 'VoxFix',
    tagline: 'AI-Powered Grammar & Speech Assistant',
    description:
      'Full-stack application combining voice-to-text speech recognition with Google Gemini AI grammar correction. User authentication with MongoDB, dual interface for voice and text, and detailed grammatical breakdown with alternative word suggestions.',
    stack: ['React.js', 'Flask', 'Express.js', 'Google Gemini AI', 'MongoDB'],
    accent: '#00D4FF',
    gradient: 'linear-gradient(135deg, rgba(0,212,255,0.1) 0%, rgba(124,58,237,0.05) 100%)',
    github: 'https://github.com/dhuraimurugan',
    live: null,
    features: ['Real-time voice-to-text transcription', 'Google Gemini AI grammar correction', 'Dual voice & text interface', 'Detailed grammar breakdown with suggestions'],
  },
  {
    id: 'grievance',
    number: '04',
    title: 'AI Grievance Redressal Portal',
    tagline: 'NLP-Powered Citizen Complaint Management',
    description:
      'NLP-powered platform that automatically classifies, prioritizes, and routes citizen grievances to appropriate departments. Built with Flask backend and React frontend, currently developing for deployment.',
    stack: ['Python', 'NLP', 'Flask', 'MongoDB', 'React'],
    accent: '#7C3AED',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(0,212,255,0.05) 100%)',
    github: 'https://github.com/dhuraimurugan',
    live: null,
    features: ['NLP auto-classification engine', 'Priority scoring system', 'Real-time status tracking', 'Department routing AI'],
    developing: true,
  },
];

/* ── SVG Icons ── */
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card || expanded) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(1200px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = '';
  };

  return (
    <div
      ref={cardRef}
      className={`project-card glass ${expanded ? 'expanded' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-accent': project.accent }}
    >
      {/* Top accent bar */}
      <div className="card-accent-bar" style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

      {/* Hover glow border */}
      <div className="card-neon-border" style={{ '--border-col': project.accent }} />

      <div className="project-card-inner">
        {/* Header row */}
        <div className="project-header">
          <span className="project-number" style={{ color: project.accent }}>{project.number}</span>
          {project.developing && (
            <span className="developing-badge">
              <span className="developing-dot" />
              Developing
            </span>
          )}
        </div>

        {/* Tagline chip */}
        <div className="project-meta">
          <span className="project-tagline-chip" style={{ color: project.accent, borderColor: `${project.accent}28`, background: `${project.accent}0d` }}>
            {project.tagline}
          </span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Features (expanded) */}
        {expanded && (
          <div className="project-features">
            <p className="features-label">Key Features</p>
            <ul className="features-list">
              {project.features.map(f => (
                <li key={f}>
                  <span style={{ color: project.accent }}><CheckIcon /></span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Stack chips */}
        <div className="project-stack">
          {project.stack.map(tech => (
            <span key={tech} className="tech-pill" style={{ borderColor: `${project.accent}28`, color: project.accent }}>{tech}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-actions">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn"
            id={`project-github-${project.id}`}
            style={{ '--btn-col': project.accent }}
          >
            <GithubIcon />
            Code
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn project-link-btn--live"
              id={`project-live-${project.id}`}
              style={{ '--btn-col': project.accent }}
            >
              <LiveIcon />
              Live Demo
            </a>
          )}

          <button
            className="project-link-btn"
            onClick={() => setExpanded(!expanded)}
            id={`project-expand-${project.id}`}
            style={{ '--btn-col': project.accent }}
          >
            {expanded ? 'Less' : 'More'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 87%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="projects-section section-full">
      <div className="projects-bg-glow" />
      <div className="section">
        <div ref={titleRef} className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Case Studies
          </span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-sub">
            Production-ready work built to solve real problems. Every project was designed, built, and deployed with purpose.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div key={project.id} ref={el => (cardsRef.current[i] = el)}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
