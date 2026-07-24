import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

/* ── SVG icon components ── */
const IconCurious = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconBuilt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const IconReady = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const milestones = [
  {
    number: '01',
    title: 'Curious by Default',
    desc: 'Started with a simple question — "how does this work?" That question turned into real code, real projects, and a discipline of learning that never stopped.',
    Icon: IconCurious,
    color: '#00D4FF',
  },
  {
    number: '02',
    title: 'Shipped, Not Just Built',
    desc: 'From an AI grammar correction platform to a groundwater intelligence system — every project was designed to solve a real problem, deployed, and presented to users.',
    Icon: IconBuilt,
    color: '#7C3AED',
  },
  {
    number: '03',
    title: 'Ready for What Comes Next',
    desc: 'Currently working across AI engineering, scalable backends, and cloud systems. Actively seeking a team where I can contribute from day one and grow fast.',
    Icon: IconReady,
    color: '#00D4FF',
  },
];

const stats = [
  { value: '3+',   label: 'Projects Deployed'          },
  { value: '10+',  label: 'Technologies Mastered'       },
  { value: '100%', label: 'Commitment to Impact'        },
];

export default function About() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);
  const statsRef   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Title teleport-in */
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );

      /* Cards materialize with stagger */
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, filter: 'blur(6px)' },
          {
            opacity: 1, x: 0, filter: 'blur(0px)',
            duration: 0.8, ease: 'power3.out',
            delay: i * 0.12,
            scrollTrigger: { trigger: card, start: 'top 85%' },
          }
        );
      });

      /* Stats count-up effect */
      statsRef.current.forEach((stat, i) => {
        gsap.fromTo(stat,
          { opacity: 0, y: 30, scale: 0.8 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, delay: i * 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: stat, start: 'top 85%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="about-section section-full">
      <div className="about-bg-glow" />
      <div className="section">
        {/* Header */}
        <div ref={titleRef} className="about-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            My Story
          </span>
          <h2 className="section-title">
            The <span className="text-gradient">Journey</span>
          </h2>
          <p className="section-sub">
            I started with curiosity. That curiosity evolved into building applications,
            solving problems, and exploring how technology creates meaningful impact.
          </p>
        </div>

        {/* Milestone cards */}
        <div className="about-milestones">
          {milestones.map((m, i) => (
            <div
              key={m.number}
              ref={el => (cardsRef.current[i] = el)}
              className="milestone-card glass glow-card"
            >
              {/* Top accent line */}
              <div className="milestone-accent" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />

              <div className="milestone-inner">
                <div className="milestone-number-wrap">
                  <span className="milestone-number" style={{ color: m.color }}>{m.number}</span>
                  <span className="milestone-icon" style={{ color: m.color }}><m.Icon /></span>
                </div>
                <h3 className="milestone-title">{m.title}</h3>
                <p className="milestone-desc">{m.desc}</p>

                {/* Energy dot */}
                <div className="milestone-energy" style={{ background: m.color, boxShadow: `0 0 12px ${m.color}` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="about-stats">
          {stats.map((s, i) => (
            <div key={s.label} ref={el => (statsRef.current[i] = el)} className="stat-item">
              <span className="stat-value text-gradient-blue">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
