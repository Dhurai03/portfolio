import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

const words1 = 'Learning has no finish line. Every project teaches me something I didn\'t know yesterday.'.split(' ');
const words2 = 'My greatest skill isn\'t coding. It\'s my willingness to keep learning.'.split(' ');

export default function Philosophy() {
  const sectionRef = useRef(null);
  const quote1Ref = useRef(null);
  const quote2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const revealWords = (ref) => {
        const spans = ref?.querySelectorAll('.reveal-word');
        if (!spans || spans.length === 0) return;
        gsap.fromTo(spans,
          { opacity: 0.1, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref,
              start: 'top 70%',
              end: 'bottom 30%',
              scrub: 0.5,
            }
          }
        );
      };

      revealWords(quote1Ref.current);
      revealWords(quote2Ref.current);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="philosophy" ref={sectionRef} className="philosophy-section section-full">
      {/* Background glow */}
      <div className="philosophy-bg-glow" />

      <div className="section">
        <span className="tag-chip" style={{ marginBottom: '4rem', display: 'inline-block' }}>Learning Philosophy</span>

        <div ref={quote1Ref} className="philosophy-quote philosophy-quote-1">
          <span className="quote-mark">"</span>
          {words1.map((word, i) => (
            <span key={i} className="reveal-word">
              {word}
            </span>
          ))}
          <span className="quote-mark quote-mark-close">"</span>
        </div>

        <div className="philosophy-divider">
          <div className="divider-line" />
          <span className="divider-icon">⟡</span>
          <div className="divider-line" />
        </div>

        <div ref={quote2Ref} className="philosophy-quote philosophy-quote-2">
          <span className="quote-mark">"</span>
          {words2.map((word, i) => (
            <span key={i} className="reveal-word">
              {word}
            </span>
          ))}
          <span className="quote-mark quote-mark-close">"</span>
        </div>

        <div className="philosophy-attribution">
          <div className="attribution-line" />
          <span>— Dhurai Murugan</span>
        </div>
      </div>
    </section>
  );
}
