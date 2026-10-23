import './Experience.css';

const milestones = [
  {
    period: '2025 – Present',
    role: 'Lead Full-Stack & AI Builder',
    organization: 'Academic Research & Production Systems',
    description:
      'Architected and deployed full-stack applications with AI/ML integration. Engineered HydroIndex for automated water quality index calculation and predictive forecasting; created VoxFix with speech recognition and Google Gemini AI critique.',
    skills: ['System Design', 'React.js', 'FastAPI', 'Node.js', 'NLP', 'XGBoost'],
  },
  {
    period: '2024 – 2025',
    role: 'Full-Stack Developer & Problem Solver',
    organization: 'Engineering Projects',
    description:
      'Engineered the Project Cost Estimator implementing classical software engineering estimation models (FPA, COCOMO). Integrated role-based authentication, multi-currency conversion, and dynamic Recharts analytics.',
    skills: ['MERN Stack', 'JWT Auth', 'MongoDB', 'Data Modeling', 'REST APIs'],
  },
  {
    period: '2023 – 2024',
    role: 'Software Foundations & Algorithmic Practice',
    organization: 'Undergraduate Engineering',
    description:
      'Built a strong foundation in Object-Oriented Programming, Data Structures, Algorithms, Relational Databases, and modern web standards. Developed interactive tools and scripts in Python, C, and JavaScript.',
    skills: ['Data Structures', 'Algorithms', 'Python', 'Java', 'SQL'],
  },
];

const education = {
  degree: 'Bachelor of Technology in Computer Science & Business Systems',
  institution: 'Bannari Amman Institute of Technology',
  period: '2023 – 2027',
  location: 'Tamil Nadu, India',
  focus: [
    'Artificial Intelligence & Machine Learning',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Full-Stack Web Development',
    'Business Process Management',
    'Cloud & Distributed Systems',
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="experience-section section-full">
      <div className="section">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
            </svg>
            Career &amp; Education
          </span>
          <h2 className="section-title">
            Academic Track &amp; <span className="text-gradient">Milestones</span>
          </h2>
          <p className="section-sub">
            A track record of engineering leadership, academic focus, and relentless project delivery.
          </p>
        </div>

        {/* 2-Column Experience & Education Layout */}
        <div className="experience-grid">

          {/* Left: Engineering Milestones */}
          <div className="milestones-column">
            <h3 className="column-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
              </svg>
              <span>Technical Track Record</span>
            </h3>

            <div className="timeline-list">
              {milestones.map((item, i) => (
                <div key={i} className="timeline-item glass">
                  <div className="timeline-top">
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <h4 className="timeline-role">{item.role}</h4>
                  <p className="timeline-org">{item.organization}</p>
                  <p className="timeline-desc">{item.description}</p>
                  <div className="timeline-skills">
                    {item.skills.map(s => (
                      <span key={s} className="skill-chip">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Education Card */}
          <div className="education-column">
            <h3 className="column-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
              <span>Education</span>
            </h3>

            <div className="education-card glass">
              <span className="edu-period-pill">{education.period}</span>
              <h4 className="edu-degree">{education.degree}</h4>
              <p className="edu-institution">{education.institution}</p>
              <p className="edu-location">{education.location}</p>

              <div className="edu-coursework-block">
                <span className="coursework-label">Core Coursework &amp; Specializations:</span>
                <div className="coursework-tags">
                  {education.focus.map(f => (
                    <span key={f} className="coursework-tag">{f}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
