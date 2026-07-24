import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Cursor    from './components/Cursor/Cursor';
import Navbar    from './components/Navbar/Navbar';
import Intro     from './components/Intro/Intro';
import Hero      from './sections/Hero/Hero';
import About     from './sections/About/About';
import Stack     from './sections/Stack/Stack';
import Projects  from './sections/Projects/Projects';
import Experience from './sections/Experience/Experience';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const lenisRef = useRef(null);

  /* ── Smooth scroll (Lenis) ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    lenisRef.current = lenis;

    const raf = time => {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* ── Lock scroll during intro ── */
  useEffect(() => {
    if (!introComplete) {
      document.body.style.overflow = 'hidden';
      lenisRef.current?.stop();
    } else {
      document.body.style.overflow = '';
      lenisRef.current?.start();
      setTimeout(() => ScrollTrigger.refresh(), 150);
    }
  }, [introComplete]);

  /* ── ESC to skip intro ── */
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape' && !introComplete) setIntroComplete(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [introComplete]);

  return (
    <>
      {/* Custom cursor */}
      <Cursor />

      {/* Fixed energy grid background */}
      <div className="aurora-bg" />

      {/* Sharingan intro animation */}
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}

      {/* Main site */}
      <div id="main-content" className={introComplete ? 'visible' : ''}>
        <Navbar />
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Experience />
      </div>
    </>
  );
}
