import './About.css';

const pillars = [
  {
    number: '01',
    title: 'Applied AI & Machine Learning',
    desc: 'Designing end-to-end ML workflows — from data processing and XGBoost predictive forecasting (HydroIndex) to NLP grievance classification and generative AI grammar correction using Google Gemini (VoxFix).',
    tag: 'Intelligence & NLP',
  },
  {
    number: '02',
    title: 'Full-Stack Software Engineering',
    desc: 'Building responsive, scalable web applications with React.js, modern CSS, and high-throughput backend APIs utilizing Node.js, Express, FastAPI, and Flask. Experienced in role-based auth and state management.',
    tag: 'Architecture & APIs',
  },
  {
    number: '03',
    title: 'Business Systems & Engineering Rigor',
    desc: 'Pursuing B.Tech in Computer Science and Business Systems at Bannari Amman Institute of Technology. Focused on building software that solves concrete business bottlenecks with clean code and reliable deployment.',
    tag: 'CS & Business Value',
  },
];

const highlights = [
  { val: '4+',   label: 'Deployed Applications' },
  { val: '12+',  label: 'Technologies & Tools' },
  { val: '2027', label: 'B.Tech CSBS Graduation' },
  { val: '100%', label: 'Commitment to Quality' },
];

export default function About() {
  return (
    <section id="about" className="about-section section-full">
      <div className="section">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            About Me
          </span>
          <h2 className="section-title">
            Engineering with <span className="text-gradient">Purpose &amp; Precision</span>
          </h2>
          <p className="section-sub">
            I build software systems that turn raw data and complex logic into intuitive,
            reliable products. Here is what defines my approach to technology.
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="about-pillars-grid">
          {pillars.map(p => (
            <div key={p.number} className="pillar-card glass">
              <div className="pillar-header">
                <span className="pillar-num">{p.number}</span>
                <span className="pillar-tag">{p.tag}</span>
              </div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="about-stats-card glass">
          <div className="stats-row">
            {highlights.map(h => (
              <div key={h.label} className="stat-box">
                <span className="stat-number text-gradient-blue">{h.val}</span>
                <span className="stat-label">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
