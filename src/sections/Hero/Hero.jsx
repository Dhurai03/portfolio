import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const TYPING_ROLES = [
  'AI Developer',
  'Full Stack Developer',
  'Problem Solver',
  'Open Source Learner',
];

export default function Hero() {
  const sectionRef  = useRef(null);
  const canvasRef   = useRef(null);
  const nameRef     = useRef(null);
  const badgeRef    = useRef(null);
  const subRef      = useRef(null);
  const descRef     = useRef(null);
  const typingRef   = useRef(null);
  const ctaRef      = useRef(null);
  const scrollRef   = useRef(null);

  /* Typing animation state */
  const [displayText, setDisplayText] = useState('');
  const [roleIdx, setRoleIdx]         = useState(0);
  const [isDeleting, setIsDeleting]   = useState(false);
  const typingTimerRef                = useRef(null);

  /* ── Typing effect ── */
  useEffect(() => {
    const role = TYPING_ROLES[roleIdx];
    const speed = isDeleting ? 40 : 80;

    typingTimerRef.current = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(role.substring(0, displayText.length + 1));
        if (displayText.length + 1 === role.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(role.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIdx(prev => (prev + 1) % TYPING_ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(typingTimerRef.current);
  }, [displayText, isDeleting, roleIdx]);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let runeSymbols = [];

    const RUNES = ['◈', '⬡', '△', '✦', '◇', '⊕', '⬢'];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
      initRunes();
    };

    const initParticles = () => {
      particles = Array.from({ length: 80 }, () => ({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.5,
        vy:      (Math.random() - 0.5) * 0.5,
        size:    Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        hue:     Math.random() < 0.7 ? 193 : 265,
      }));
    };

    const initRunes = () => {
      runeSymbols = Array.from({ length: 8 }, (_, i) => ({
        x:    Math.random() * canvas.width,
        y:    Math.random() * canvas.height,
        size: Math.random() * 20 + 12,
        rot:  Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.005,
        sym:  RUNES[i % RUNES.length],
        alpha: 0.06 + Math.random() * 0.08,
        vy:   (Math.random() - 0.5) * 0.15,
        vx:   (Math.random() - 0.5) * 0.15,
        life: Math.random() * Math.PI * 2,
      }));
    };

    let mouse = { x: -9999, y: -9999 };
    const onMouseMove = e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.closest('section')?.addEventListener('mousemove', onMouseMove);

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      /* Particles */
      particles.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) { p.vx -= (dx / dist) * 0.05; p.vy -= (dy / dist) * 0.05; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === 193
          ? `rgba(0,212,255,${p.opacity})`
          : `rgba(124,58,237,${p.opacity})`;
        ctx.fill();
      });

      /* Connection lines */
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      /* Floating runes */
      runeSymbols.forEach(r => {
        r.x    += r.vx;
        r.y    += r.vy;
        r.rot  += r.rotV;
        r.life += 0.02;
        if (r.x < -40) r.x = canvas.width + 40;
        if (r.x > canvas.width + 40) r.x = -40;
        if (r.y < -40) r.y = canvas.height + 40;
        if (r.y > canvas.height + 40) r.y = -40;

        ctx.save();
        ctx.translate(r.x, r.y);
        ctx.rotate(r.rot);
        ctx.font = `${r.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = r.alpha * (0.6 + 0.4 * Math.sin(r.life));
        ctx.fillStyle = '#00D4FF';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,212,255,0.5)';
        ctx.fillText(r.sym, 0, 0);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  /* ── GSAP entrance (screen shake + reveal) ── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });

    /* Screen shake */
    tl.fromTo(sectionRef.current,
      { x: 0, y: 0 },
      { x: 6, y: -4, duration: 0.06, ease: 'none' }
    )
    .to(sectionRef.current, { x: -5, y: 3, duration: 0.06 })
    .to(sectionRef.current, { x: 4, y: -2, duration: 0.06 })
    .to(sectionRef.current, { x: 0, y: 0, duration: 0.06 });

    /* Badge */
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(2)' },
      '-=0.1'
    );

    /* Name with glitch burst */
    tl.fromTo(nameRef.current,
      { opacity: 0, y: 60, skewX: -5, filter: 'blur(12px)' },
      { opacity: 1, y: 0, skewX: 0, filter: 'blur(0px)', duration: 1, ease: 'power4.out' },
      '-=0.2'
    );

    /* Sub */
    tl.fromTo(subRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' },
      '-=0.5'
    );

    /* Desc + typing */
    tl.fromTo([descRef.current, typingRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      '-=0.3'
    );

    /* CTAs */
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    /* Scroll indicator */
    tl.fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      '-=0.1'
    );
  }, []);

  const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <canvas ref={canvasRef} className="hero-canvas" />

      {/* Ambient orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Energy streaks */}
      <div className="hero-energy-streak hero-streak-1" />
      <div className="hero-energy-streak hero-streak-2" />

      <div className="hero-content">
        {/* Available badge */}
        <div ref={badgeRef} className="hero-badge">
          <span className="hero-badge-dot" />
          <span>Available for Opportunities</span>
          <span className="hero-badge-ping" />
        </div>

        {/* Main name */}
        <h1 ref={nameRef} className="hero-name">
          <span className="hero-name-line">DHURAI</span>
          <span className="hero-name-line">MURUGAN<span className="hero-name-b"> B</span></span>
        </h1>

        {/* Subtitle */}
        <p ref={subRef} className="hero-subtitle">
          Computer Science &amp; Business Systems Engineer
        </p>

        {/* Description */}
        <p ref={descRef} className="hero-desc">
          Building AI, Full-Stack Applications, and Intelligent Systems.
        </p>

        {/* Typing animation */}
        <div ref={typingRef} className="hero-typing-wrapper">
          <span className="hero-typing-prefix">I am a&nbsp;</span>
          <span className="hero-typing-text">{displayText}</span>
          <span className="hero-typing-cursor">|</span>
        </div>

        {/* CTAs */}
        <div ref={ctaRef} className="hero-ctas">
          <button className="btn-primary hero-cta-btn" onClick={() => scrollTo('#projects')} id="hero-explore-btn">
            <span>Explore My Work</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a className="btn-secondary hero-cta-btn" href="/resume.pdf" target="_blank" rel="noopener noreferrer" id="hero-resume-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            Download Résumé
          </a>
          <a className="btn-outline hero-cta-btn" href="https://github.com/dhuraimurugan" target="_blank" rel="noopener noreferrer" id="hero-github-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            View GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        <div ref={scrollRef} className="hero-scroll">
          <div className="hero-scroll-line" />
          <div className="hero-scroll-dot" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
