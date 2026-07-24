import { useEffect, useRef } from 'react';

const TRAIL_LENGTH = 8;

export default function Cursor() {
  const dotRef   = useRef(null);
  const ringRef  = useRef(null);
  const trailRef = useRef([]);
  const pos      = useRef({ x: 0, y: 0 });
  const ringPos  = useRef({ x: 0, y: 0 });
  const trail    = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: 0, y: 0 })));
  const animRef  = useRef(null);

  useEffect(() => {
    /* ── Mouse tracking ── */
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }
    };

    /* ── Hover state ── */
    const onEnter = () => {
      ringRef.current?.classList.add('hovering');
      if (dotRef.current) {
        dotRef.current.style.width  = '10px';
        dotRef.current.style.height = '10px';
        dotRef.current.style.boxShadow = '0 0 16px #00D4FF, 0 0 32px rgba(0,212,255,0.7)';
      }
    };
    const onLeave = () => {
      ringRef.current?.classList.remove('hovering');
      if (dotRef.current) {
        dotRef.current.style.width  = '6px';
        dotRef.current.style.height = '6px';
        dotRef.current.style.boxShadow = '0 0 10px #00D4FF, 0 0 20px rgba(0,212,255,0.5)';
      }
    };

    /* ── RAF loop for smooth trail ── */
    const lerp = () => {
      /* Smooth ring follow */
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.11;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }

      /* Shift trail history */
      trail.current.unshift({ x: pos.current.x, y: pos.current.y });
      trail.current = trail.current.slice(0, TRAIL_LENGTH);

      /* Render trail dots */
      trailRef.current.forEach((el, i) => {
        if (!el || !trail.current[i]) return;
        const p = trail.current[i];
        el.style.left    = `${p.x}px`;
        el.style.top     = `${p.y}px`;
        el.style.opacity = `${(1 - i / TRAIL_LENGTH) * 0.5}`;
        const scale = 1 - i / TRAIL_LENGTH;
        el.style.width  = `${4 * scale}px`;
        el.style.height = `${4 * scale}px`;
      });

      animRef.current = requestAnimationFrame(lerp);
    };
    animRef.current = requestAnimationFrame(lerp);

    document.addEventListener('mousemove', onMove);

    /* Attach hover listeners to interactive elements */
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachListeners();

    /* Re-attach on DOM mutations (for dynamically added elements) */
    const obs = new MutationObserver(attachListeners);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <>
      {/* Main dot */}
      <div className="cursor-dot" ref={dotRef} />

      {/* Outer ring */}
      <div className="cursor-ring" ref={ringRef} />

      {/* Energy trail */}
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          className="cursor-trail"
          ref={el => (trailRef.current[i] = el)}
          style={{ background: i < 3 ? '#00D4FF' : '#7C3AED' }}
        />
      ))}
    </>
  );
}
