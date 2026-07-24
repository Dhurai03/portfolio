import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stack.css';

gsap.registerPlugin(ScrollTrigger);

/* ── SVG icons for each category ── */
const CategoryIcon = ({ type }) => {
  const icons = {
    languages: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    frontend: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    backend: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    aiml: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    database: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    cloud: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const skills = [
  {
    category: 'Languages',
    type: 'languages',
    color: '#00D4FF',
    items: ['Python', 'JavaScript', 'Java', 'C', 'SQL'],
  },
  {
    category: 'Frontend',
    type: 'frontend',
    color: '#7C3AED',
    items: ['React', 'HTML / CSS', 'Tailwind CSS', 'GSAP', 'Next.js'],
  },
  {
    category: 'Backend',
    type: 'backend',
    color: '#00D4FF',
    items: ['Node.js', 'Express.js', 'FastAPI', 'Flask'],
  },
  {
    category: 'AI / ML',
    type: 'aiml',
    color: '#7C3AED',
    items: ['NLP / NLTK', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Gemini AI'],
  },
  {
    category: 'Databases',
    type: 'database',
    color: '#00D4FF',
    items: ['MongoDB', 'MySQL', 'PostgreSQL'],
  },
  {
    category: 'Cloud & DevOps',
    type: 'cloud',
    color: '#7C3AED',
    items: ['AWS', 'Docker', 'Git / GitHub', 'CI/CD'],
  },
];

export default function Stack() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const cardsRef   = useRef([]);

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
          { opacity: 0, y: 36, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: 'power3.out',
            delay: i * 0.07,
            scrollTrigger: { trigger: card, start: 'top 88%' },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="stack-section section-full">
      <div className="section">
        <div ref={titleRef} className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            Capabilities
          </span>
          <h2 className="section-title">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="section-sub">
            The tools, languages, and frameworks I use to design, build, and ship — from prototype to production.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((cat, i) => (
            <div
              key={cat.category}
              ref={el => (cardsRef.current[i] = el)}
              className="skill-card glass glow-card"
              style={{ '--cat-color': cat.color }}
            >
              {/* Top accent line */}
              <div className="skill-card-accent" style={{ background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />

              {/* Card header */}
              <div className="skill-card-header">
                <div className="skill-cat-icon" style={{ color: cat.color, borderColor: `${cat.color}25`, background: `${cat.color}0d` }}>
                  <CategoryIcon type={cat.type} />
                </div>
                <span className="skill-cat-name">{cat.category}</span>
              </div>

              {/* Tech chips */}
              <div className="skill-chips">
                {cat.items.map(item => (
                  <span
                    key={item}
                    className="skill-chip"
                    style={{ borderColor: `${cat.color}22`, color: 'var(--text-secondary)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Corner glow */}
              <div className="skill-card-glow" style={{ background: `radial-gradient(circle at top right, ${cat.color}0d, transparent 65%)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
