import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState({ submitted: false, message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dhuraimurugan@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ submitted: false, message: 'Please fill in all required fields.' });
      return;
    }

    // Prepare mailto fallback or simulated success
    const mailtoUrl = `mailto:dhuraimurugan@gmail.com?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`Hi Dhurai,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`;
    window.open(mailtoUrl, '_blank');

    setStatus({
      submitted: true,
      message: 'Thank you for reaching out! Your email client has been opened, and I will respond promptly.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="contact-section section-full">
      <div className="section">

        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Get In Touch
          </span>
          <h2 className="section-title">
            Let's Build Something <span className="text-gradient">Impactful</span>
          </h2>
          <p className="section-sub">
            Whether you have an engineering role, a collaborative AI project, or want to discuss
            software architecture, feel free to drop a message.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="contact-grid">

          {/* Left Column: Direct Info */}
          <div className="contact-info-col">
            <h3 className="contact-info-title">Direct Inquiries &amp; Channels</h3>
            <p className="contact-info-desc">
              I am actively seeking software engineering and AI development roles where I can contribute
              to production systems and grow within high-performing engineering teams.
            </p>

            <div className="contact-cards-stack">
              {/* Email Card with Copy Action */}
              <div className="contact-detail-card glass">
                <div className="detail-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="detail-info">
                  <span className="detail-label">Email Address</span>
                  <a href="mailto:dhuraimurugan@gmail.com" className="detail-value">
                    dhuraimurugan@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  className="copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  id="contact-copy-email-btn"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* LinkedIn Card */}
              <a
                href="https://linkedin.com/in/dhuraimurugan"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-card glass"
                id="contact-linkedin-card"
              >
                <div className="detail-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="detail-info">
                  <span className="detail-label">Professional Profile</span>
                  <span className="detail-value">linkedin.com/in/dhuraimurugan</span>
                </div>
                <span className="card-arrow">→</span>
              </a>

              {/* GitHub Card */}
              <a
                href="https://github.com/dhuraimurugan"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-detail-card glass"
                id="contact-github-card"
              >
                <div className="detail-icon-wrap">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div className="detail-info">
                  <span className="detail-label">Open Source &amp; Repositories</span>
                  <span className="detail-value">github.com/dhuraimurugan</span>
                </div>
                <span className="card-arrow">→</span>
              </a>

              {/* Status Card */}
              <div className="status-callout glass">
                <span className="status-callout-dot" />
                <div>
                  <p className="status-callout-title">Ready for Onsite &amp; Remote Roles</p>
                  <p className="status-callout-sub">Full-time opportunities, internships &amp; select contracts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="contact-form-col">
            <div className="contact-form-card glass">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-sub">Feel free to reach out directly using the form below.</p>

              {status.message && (
                <div className={`form-alert ${status.submitted ? 'success' : 'error'}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Full Name *</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-subject" className="form-label">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    name="subject"
                    placeholder="Engineering Role / Project Discussion"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message" className="form-label">Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell me about your team, project, or opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input form-textarea"
                  />
                </div>

                <button type="submit" className="btn-primary form-submit-btn" id="contact-submit-btn">
                  <span>Send Message</span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Global Professional Footer */}
        <footer className="site-footer">
          <div className="footer-divider" />
          <div className="footer-content">
            <div className="footer-left">
              <span className="footer-brand">Dhurai Murugan B</span>
              <p className="footer-tagline">AI &amp; Full-Stack Engineer · B.Tech CSBS (2023–2027)</p>
            </div>

            <div className="footer-center">
              <nav className="footer-nav" aria-label="Footer Navigation">
                <a href="#about" className="footer-link">About</a>
                <a href="#skills" className="footer-link">Skills</a>
                <a href="#projects" className="footer-link">Projects</a>
                <a href="#experience" className="footer-link">Experience</a>
                <a href="#contact" className="footer-link">Contact</a>
              </nav>
            </div>

            <div className="footer-right">
              <button onClick={scrollToTop} className="back-to-top-btn" aria-label="Back to top">
                <span>Back to top</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Dhurai Murugan B. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </section>
  );
}
