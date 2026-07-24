import { useRef } from 'react';
import './MagneticButton.css';

export default function MagneticButton({ children, className = '', onClick, href, target, rel, download }) {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    if (btnRef.current) {
      btnRef.current.style.transform = 'translate(0, 0)';
    }
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef}
      className={`mag-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      href={href}
      target={target}
      rel={rel}
      download={download}
    >
      {children}
    </Tag>
  );
}
