import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim-item',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = id => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" ref={heroRef} className="hero-section">
      <div className="section hero-container">

        <div className="hero-text-content">
          {/* Status Badge */}
          <div className="hero-anim-item">
            <div className="hero-status-badge">
              <span className="status-indicator">
                <span className="status-ping" />
                <span className="status-dot" />
              </span>
              <span>Available for Software Engineering &amp; AI Opportunities</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="hero-anim-item hero-title">
            Hi, I'm <span className="hero-name-gradient">Dhurai Murugan B</span>
          </h1>

          {/* Subtitle / Role */}
          <div className="hero-anim-item hero-role-badge-row">
            <span className="hero-role-text">AI Developer &amp; Full-Stack Engineer</span>
            <span className="hero-role-divider">•</span>
            <span className="hero-degree-text">B.Tech CS &amp; Business Systems</span>
          </div>

          {/* Elevator Pitch */}
          <p className="hero-anim-item hero-description">
            Specializing in intelligent artificial intelligence platforms, NLP classification engines,
            and scalable web architectures. Passionate about engineering production-grade software that
            bridges technical rigor with measurable business value.
          </p>

          {/* CTAs */}
          <div className="hero-anim-item hero-actions">
            <button
              className="btn-primary hero-btn"
              onClick={() => scrollTo('#projects')}
              id="hero-explore-btn"
            >
              <span>View Featured Projects</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              className="btn-secondary hero-btn"
              onClick={() => scrollTo('#contact')}
              id="hero-contact-btn"
            >
              <span>Get in Touch</span>
            </button>

            <a
              className="btn-outline hero-btn"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              id="hero-resume-btn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              <span>Download CV</span>
            </a>
          </div>

          {/* Highlights / Metric Pills */}
          <div className="hero-anim-item hero-metrics-grid">
            <div className="hero-metric-card glass">
              <span className="metric-val">4+</span>
              <span className="metric-lbl">Production Projects</span>
            </div>
            <div className="hero-metric-card glass">
              <span className="metric-val">12+</span>
              <span className="metric-lbl">Core Technologies</span>
            </div>
            <div className="hero-metric-card glass">
              <span className="metric-val">2027</span>
              <span className="metric-lbl">B.Tech Candidate</span>
            </div>
            <div className="hero-metric-card glass">
              <span className="metric-val">100%</span>
              <span className="metric-lbl">Code Ownership</span>
            </div>
          </div>
        </div>

        {/* Visual Terminal / Feature Snippet on the Right */}
        <div className="hero-anim-item hero-preview-pane">
          <div className="code-card glass">
            <div className="code-card-header">
              <div className="window-dots">
                <span className="dot red" />
                <span className="dot yellow" />
                <span className="dot green" />
              </div>
              <span className="window-title">dhurai_engineer_profile.ts</span>
            </div>
            <div className="code-card-body">
              <pre>
                <code>
<span className="c-keyword">interface</span> <span className="c-type">Engineer</span> {'{\n'}
  name: <span className="c-string">'Dhurai Murugan B'</span>;{'\n'}
  degree: <span className="c-string">'B.Tech CS & Business Systems'</span>;{'\n'}
  institution: <span className="c-string">'Bannari Amman Institute of Tech'</span>;{'\n'}
  coreFocus: [<span className="c-string">'AI/ML'</span>, <span className="c-string">'NLP'</span>, <span className="c-string">'Full-Stack Web'</span>];{'\n'}
  primaryStack: {'{\n'}
    languages: [<span className="c-string">'Python'</span>, <span className="c-string">'JavaScript'</span>, <span className="c-string">'SQL'</span>],{'\n'}
    frontend: [<span className="c-string">'React.js'</span>, <span className="c-string">'Tailwind'</span>],{'\n'}
    backend: [<span className="c-string">'FastAPI'</span>, <span className="c-string">'Express'</span>, <span className="c-string">'Flask'</span>],{'\n'}
    databases: [<span className="c-string">'MongoDB'</span>, <span className="c-string">'PostgreSQL'</span>]{'\n'}
  {'}'};{'\n'}
  seeking: <span className="c-string">'High-Impact Engineering Roles'</span>;{'\n'}
{'}'}
                </code>
              </pre>
            </div>
            <div className="code-card-footer">
              <span className="footer-status">✓ Ready for production deployment</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
