import './Projects.css';

const projects = [
  {
    id: 'hydroindex',
    number: '01',
    title: 'HydroIndex',
    category: 'Machine Learning & Analytics',
    tagline: 'Groundwater Quality Monitoring & Contamination Forecasting',
    description:
      'An end-to-end ML platform for environmental intelligence. Computes the Heavy Metal Pollution Index (HMPI) and uses trained XGBoost models to forecast groundwater contamination trends with high accuracy. Supports batch analysis of 1,000+ samples and interactive analytical dashboards.',
    stack: ['Python', 'XGBoost', 'FastAPI', 'React.js', 'Data Analysis'],
    live: 'https://hydro-index.vercel.app',
    github: 'https://github.com/dhurai03',
    features: [
      'HMPI computation engine for heavy metal evaluation',
      'XGBoost predictive forecasting for contamination spread',
      'High-throughput batch ingestion for 1,000+ data samples',
      'Real-time data visualization charts and risk metrics',
    ],
  },
  {
    id: 'cost-estimator',
    number: '02',
    title: 'Project Cost Estimator',
    category: 'Full-Stack Web Platform',
    tagline: 'Enterprise Software Estimation & Budgeting Suite',
    description:
      'A full-stack MERN application engineered for software project managers to estimate, track, and budget engineering costs using industry standard models including Function Point Analysis (FPA), COCOMO, and Analogy estimation. Features role-based JWT auth and automated PDF reporting.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Recharts'],
    live: null,
    github: 'https://github.com/dhurai03',
    features: [
      'Dual estimation models: FPA, COCOMO & Analogy-based estimation',
      'Secure role-based authentication with JSON Web Tokens (JWT)',
      'Multi-currency monetary conversion & dynamic rate tracking',
      'Interactive Recharts visualization and automated PDF exports',
    ],
  },
  {
    id: 'voxfix',
    number: '03',
    title: 'VoxFix',
    category: 'AI & Speech Processing',
    tagline: 'AI Speech-to-Text & Contextual Grammar Assistant',
    description:
      'An intelligent speech processing web application combining browser speech recognition APIs with Google Gemini AI. Users transcribe spoken audio in real time, receive deep grammatical critique, and explore vocabulary enhancements with reasoning breakdowns.',
    stack: ['React.js', 'Flask', 'Express.js', 'Google Gemini AI', 'MongoDB'],
    live: null,
    github: 'https://github.com/dhurai03',
    features: [
      'Real-time voice-to-text audio stream transcription',
      'Context-aware grammar correction powered by Google Gemini',
      'Dual-input interface supporting both spoken and written text',
      'In-depth linguistic explanations and vocabulary recommendations',
    ],
  },
  {
    id: 'grievance',
    number: '04',
    title: 'AI Grievance Redressal Portal',
    category: 'NLP & Civic Tech',
    tagline: 'Automated Citizen Grievance Routing & Classification',
    description:
      'An NLP-driven citizen complaint management system designed to eliminate manual dispatch bottlenecks. Uses natural language processing models to classify grievance text, calculate urgency priority scores, and automatically route tickets to appropriate administrative departments.',
    stack: ['Python', 'NLP & NLTK', 'Flask', 'MongoDB', 'React.js'],
    live: null,
    github: 'https://github.com/Dhurai03',
    isDeveloping: true,
    features: [
      'Multi-class NLP text classification for complaint routing',
      'Automated priority and severity scoring algorithm',
      'Department dispatch pipeline with audit logs',
      'Citizen tracking portal with live ticket lifecycle status',
    ],
  },
];
  
export default function Projects() {
  return (
    <section id="projects" className="projects-section section-full">
      <div className="section">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            Case Studies
          </span>
          <h2 className="section-title">
            Featured <span className="text-gradient">Engineering Projects</span>
          </h2>
          <p className="section-sub">
            A selection of production-grade systems, AI applications, and full-stack platforms
            built with modern standards and practical utility.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card glass">

              {/* Card Header */}
              <div className="card-top-row">
                <div className="badge-group">
                  <span className="project-category-badge">{project.category}</span>
                  {project.isDeveloping && (
                    <span className="developing-pill">In Development</span>
                  )}
                </div>
                <span className="project-num">{project.number}</span>
              </div>

              {/* Project Title & Tagline */}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-tagline">{project.tagline}</p>

              {/* Description */}
              <p className="project-desc">{project.description}</p>

              {/* Key Architectural Highlights */}
              <div className="project-features-block">
                <span className="features-title">Core Capabilities:</span>
                <ul className="features-list">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>
                      <span className="check-bullet">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Badges */}
              <div className="project-tech-row">
                {project.stack.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="project-action-row">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary project-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    <span>Live Demo</span>
                  </a>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary project-btn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>Repository</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
