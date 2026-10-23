import './Stack.css';

const skillCategories = [
  {
    category: 'Programming Languages',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    skills: ['Python', 'JavaScript (ES6+)', 'Java', 'C', 'SQL'],
  },
  {
    category: 'AI & Machine Learning',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/>
        <path d="M12 8v4l3 3"/>
      </svg>
    ),
    skills: ['NLP & NLTK', 'scikit-learn', 'XGBoost', 'TensorFlow', 'Google Gemini AI'],
  },
  {
    category: 'Backend & APIs',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    skills: ['Node.js', 'Express.js', 'FastAPI', 'Flask', 'RESTful APIs'],
  },
  {
    category: 'Frontend Engineering',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    skills: ['React.js', 'Next.js', 'HTML5 / CSS3', 'Tailwind CSS', 'Responsive UI/UX'],
  },
  {
    category: 'Databases & Storage',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Data Modeling'],
  },
  {
    category: 'Cloud, DevOps & Tools',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
      </svg>
    ),
    skills: ['Git & GitHub', 'Docker', 'AWS (Foundations)', 'Postman', 'Linux / Vercel'],
  },
];

export default function Stack() {
  return (
    <section id="skills" className="stack-section section-full">
      <div className="section">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
            </svg>
            Technical Expertise
          </span>
          <h2 className="section-title">
            Skills &amp; <span className="text-gradient">Technology Stack</span>
          </h2>
          <p className="section-sub">
            The programming languages, frameworks, AI tools, and architectures I leverage to
            build scalable, production-ready software.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-category-grid">
          {skillCategories.map(cat => (
            <div key={cat.category} className="skill-category-card glass">
              <div className="cat-header">
                <div className="cat-icon-box">{cat.icon}</div>
                <h3 className="cat-title">{cat.category}</h3>
              </div>
              <div className="skills-tag-list">
                {cat.skills.map(s => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
