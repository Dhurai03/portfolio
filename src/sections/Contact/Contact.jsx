import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { prompt: 'name',    label: 'What\'s your name?',          type: 'text',     placeholder: 'e.g. Jane Doe'                },
  { prompt: 'email',   label: 'Your email address?',          type: 'email',    placeholder: 'e.g. jane@example.com'         },
  { prompt: 'message', label: 'What would you like to say?',  type: 'textarea', placeholder: 'Let\'s build something great...' },
];

export default function Contact() {
  const sectionRef  = useRef(null);
  const titleRef    = useRef(null);
  const terminalRef = useRef(null);
  const quoteRef    = useRef(null);
  const inputRef    = useRef(null);

  const [step,      setStep]      = useState(0);
  const [values,    setValues]    = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [output,    setOutput]    = useState([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, filter: 'blur(8px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(terminalRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: terminalRef.current, start: 'top 80%' },
        }
      );

      /* Quote words */
      const words = quoteRef.current?.querySelectorAll('.q-word');
      if (words) {
        gsap.fromTo(words,
          { opacity: 0.06 },
          {
            opacity: 1, stagger: 0.05, duration: 0.4, ease: 'power2.out',
            scrollTrigger: { trigger: quoteRef.current, start: 'top 75%', end: 'bottom 35%', scrub: 0.3 },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleNext = () => {
    const val = values[STEPS[step].prompt]?.trim();
    if (!val) return;
    setOutput(prev => [...prev, { prompt: STEPS[step].prompt, value: val }]);
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
      setOutput(prev => [...prev, { system: true, value: '⚡ Message transmitted! I\'ll respond at warp speed.' }]);
    }
  };

  const reset = () => {
    setStep(0); setValues({ name: '', email: '', message: '' });
    setSubmitted(false); setOutput([]);
  };

  const quoteText = 'The more I learn, the more I realize how much more there is to discover.';

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/Dhurai03',              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>, col: '#00D4FF' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhuraimurugan/', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, col: '#7C3AED' },
    { label: 'Email',    href: 'mailto:dhuraimurugan@gmail.com',            icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>, col: '#00FF94' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="contact-section section-full">
      <div className="contact-bg" />

      <div className="section">
        {/* Quote */}
        <div ref={quoteRef} className="contact-quote">
          {quoteText.split(' ').map((word, i) => (
            <span key={i} className="q-word">{word} </span>
          ))}
        </div>

        <div ref={titleRef} className="contact-header section-header">
          <span className="section-label">⊕ Connect</span>
          <h2 className="section-title">
            Let's Build <span className="text-gradient">Together</span>
          </h2>
          <p className="section-sub">
            Have a project in mind? Looking for a developer who ships? Let's connect.
          </p>
        </div>

        <div className="contact-layout">
          {/* Terminal form */}
          <div ref={terminalRef} className="terminal-container glass">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="t-dot t-dot-red" />
                <span className="t-dot t-dot-yellow" />
                <span className="t-dot t-dot-green" />
              </div>
              <span className="terminal-title">dhurai@portfolio:~/contact</span>
              <span className="terminal-status">● LIVE</span>
            </div>

            <div className="terminal-body">
              <div className="t-line">
                <span className="t-prompt">⚡</span>
                <span className="t-text t-dim">Initializing secure connection...</span>
              </div>
              <div className="t-line">
                <span className="t-prompt">→</span>
                <span className="t-text">Connection established. Let's connect!</span>
              </div>
              <div className="t-spacer" />

              {output.map((o, i) => (
                <div key={i}>
                  {o.system ? (
                    <div className="t-line t-success">
                      <span className="t-green">✓</span>
                      <span className="t-text">{o.value}</span>
                    </div>
                  ) : (
                    <div className="t-line">
                      <span className="t-prompt t-blue">$</span>
                      <span className="t-label">{o.prompt}:</span>
                      <span className="t-value">{o.value}</span>
                    </div>
                  )}
                </div>
              ))}

              {!submitted && step < STEPS.length && (
                <div className="t-active-block">
                  <div className="t-line">
                    <span className="t-prompt t-cyan">?</span>
                    <span className="t-question">{STEPS[step].label}</span>
                  </div>
                  <div className="t-input-row">
                    <span className="t-prompt t-green">›</span>
                    {STEPS[step].type === 'textarea' ? (
                      <textarea
                        ref={inputRef}
                        className="t-input t-textarea"
                        placeholder={STEPS[step].placeholder}
                        value={values[STEPS[step].prompt]}
                        onChange={e => setValues(v => ({ ...v, [STEPS[step].prompt]: e.target.value }))}
                        rows={3}
                      />
                    ) : (
                      <input
                        ref={inputRef}
                        type={STEPS[step].type}
                        className="t-input"
                        placeholder={STEPS[step].placeholder}
                        value={values[STEPS[step].prompt]}
                        onChange={e => setValues(v => ({ ...v, [STEPS[step].prompt]: e.target.value }))}
                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleNext(); } }}
                      />
                    )}
                  </div>
                  <div className="t-hint">Press <kbd>Enter</kbd> to continue</div>
                </div>
              )}

              {!submitted && step < STEPS.length && (
                <button className="t-run-btn" onClick={handleNext} id="contact-send-btn">
                  Transmit <span>⚡</span>
                </button>
              )}

              {submitted && (
                <button className="t-reset" onClick={reset} id="contact-reset-btn">
                  $ new_connection
                </button>
              )}
            </div>
          </div>

          {/* Socials panel */}
          <div className="contact-side">
            <h3 className="contact-cta-text">
              Let's Build Something<br />
              <span className="text-gradient">Meaningful.</span>
            </h3>

            <div className="contact-socials">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link glass glow-card"
                  id={`contact-${s.label.toLowerCase()}-link`}
                  style={{ '--social-col': s.col }}
                >
                  <span className="social-icon" style={{ color: s.col }}>{s.icon}</span>
                  <span className="social-label">{s.label}</span>
                  <span className="social-arrow" style={{ color: s.col }}>→</span>
                </a>
              ))}
            </div>

            {/* Availability status */}
            <div className="availability-card glass">
              <div className="avail-dot" />
              <div>
                <p className="avail-title">Open to Opportunities</p>
                <p className="avail-sub">Full-time · Internship · Freelance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-line" />
          <div className="footer-inner">
            <p className="footer-text">
              Crafted with ⚡ by <span className="text-gradient">Dhurai Murugan B</span>
            </p>
            <p className="footer-sub">CS &amp; Business Systems · {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </section>
  );
}
