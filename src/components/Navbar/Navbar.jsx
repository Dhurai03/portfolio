import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './Navbar.css';

const NAV_LINKS = [
  { href: '#about',      label: 'About'      },
  { href: '#skills',     label: 'Skills'     },
  { href: '#projects',   label: 'Projects'   },
  { href: '#experience', label: 'Experience' },
];

export default function Navbar() {
  const navRef    = useRef(null);
  const flashRef  = useRef(null);
  const streakRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      navRef.current.classList.toggle('scrolled', window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const teleportTo = useCallback((e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const flash  = flashRef.current;
    const streak = streakRef.current;

    const tl = gsap.timeline();
    tl.fromTo(streak,
      { scaleX: 0, opacity: 1, transformOrigin: 'left center' },
      { scaleX: 1, opacity: 1, duration: 0.25, ease: 'power3.in' }
    )
    .to(streak, { opacity: 0, duration: 0.15 })
    .fromTo(flash,
      { opacity: 0 },
      { opacity: 0.35, duration: 0.12, ease: 'power2.in' },
      '-=0.1'
    )
    .call(() => { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); })
    .to(flash, { opacity: 0, duration: 0.4, ease: 'power2.out' });
  }, []);

  return (
    <>
      {/* Teleport flash overlay */}
      <div ref={flashRef} className="teleport-flash" style={{ pointerEvents: 'none' }} />
      <div ref={streakRef} className="teleport-streak" style={{ pointerEvents: 'none' }} />

      <nav ref={navRef} className="navbar">
        <div className="navbar-inner">

          {/* Nav Links — centered */}
          <ul className="navbar-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => teleportTo(e, link.href)}
                  className="navbar-link"
                >
                  <span className="nav-link-text">{link.label}</span>
                  <span className="nav-link-glow" />
                </a>
              </li>
            ))}
          </ul>

          {/* Right side: socials + CTA */}
          <div className="navbar-right">
            <div className="navbar-socials">
              <a href="https://github.com/dhuraimurugan" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://linkedin.com/in/dhuraimurugan" target="_blank" rel="noopener noreferrer" className="navbar-social-link" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Resume CTA — clean SVG icon */}
            <a href="/resume.pdf" className="navbar-cta" target="_blank" rel="noopener noreferrer" id="navbar-resume-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              Résumé
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
