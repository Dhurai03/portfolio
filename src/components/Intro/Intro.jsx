import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/* ═══════════════════════════════════════════════════════════════
   CRIMSON EYE INTRO — Cinematic awakening animation
   ─────────────────────────────────────────────────────────────
   Phase 0  0.0 – 0.5s  Black screen + smoke particles spawn
   Phase 1  0.5 – 1.9s  Iris materialises, tomoe orbit + rotate
   Phase 2  1.9 – 2.5s  Eye "opens" — eyelid split + crimson pulse
   Phase 3  2.5 – 3.4s  Zoom tunnel, concentric rings, glitch
   Phase 4  3.4 – 4.1s  Iris shatters → particles disperse → fade out
   ────────────────────────────────────────────────────────────
   Only plays on first visit — stored in localStorage.
   Skip at any time via button or Escape key.
═══════════════════════════════════════════════════════════════ */

const LOCAL_KEY = 'crimson-eye-intro-v1';

export default function Intro({ onComplete }) {
  const overlayRef = useRef(null);
  const canvasRef  = useRef(null);
  const doneRef    = useRef(false);
  const finishRef  = useRef(null);

  /* Store finish fn in ref so closures always access latest */
  finishRef.current = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    localStorage.setItem(LOCAL_KEY, '1');
    const overlay = overlayRef.current;
    if (!overlay) { onComplete(); return; }
    gsap.to(overlay, { opacity: 0, duration: 0.55, ease: 'power2.inOut', onComplete });
  };

  /* ── Main animation effect ── */
  useEffect(() => {
    /* Skip on returning visits */
    if (localStorage.getItem(LOCAL_KEY)) {
      onComplete();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId = null;
    let startTime = null;

    const W = () => canvas.width;
    const H = () => canvas.height;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    /* ──────────────── Helpers ──────────────── */
    const clamp  = (v, a, b) => Math.max(a, Math.min(b, v));
    const norm   = (v, a, b) => clamp((v - a) / (b - a), 0, 1);
    const easeO3 = t => 1 - Math.pow(1 - t, 3);      // ease-out cubic
    const easeI3 = t => t * t * t;                    // ease-in cubic
    const easeIO = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;

    /* ──────────────── Smoke particles ──────────────── */
    const SMOKE = Array.from({ length: 55 }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  window.innerHeight * (0.3 + Math.random() * 0.7),
      r:  50 + Math.random() * 70,
      vy: -(0.08 + Math.random() * 0.28),
      vx: (Math.random() - 0.5) * 0.18,
      a:  0.04 + Math.random() * 0.09,
      life: Math.random(),
    }));

    /* ──────────────── Shatter fragments ──────────────── */
    const FRAGS = Array.from({ length: 200 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const spd   = 2.5 + Math.random() * 9;
      return {
        ox: (Math.random() - 0.5) * 160,
        oy: (Math.random() - 0.5) * 160,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - Math.random() * 2,
        x: 0, y: 0,
        size: 1 + Math.random() * 4.5,
        alpha: 1,
        hue: 330 + Math.random() * 50, // deep red → rose
        rot: Math.random() * Math.PI * 2,
        rotV: (Math.random() - 0.5) * 0.25,
      };
    });
    let shatterStarted = false;

    /* ──────────────── Draw abstract tomoe symbol ────────────────
       Original curved comma design: a thick crescent arc
       with a small disc at the blunt end. Three placed at
       120° apart, orbiting the mid-iris ring.
    ─────────────────────────────────────────────────────────── */
    const drawTomoe = (ctx, ts) => {
      /* Crescent body using two arcs */
      ctx.beginPath();
      ctx.arc(0, 0,        ts,        0.15, Math.PI * 1.88, false);
      ctx.arc(0, ts * 0.3, ts * 0.62, Math.PI * 1.88 + Math.PI, 0.15 + Math.PI, false);
      ctx.closePath();
      const cg = ctx.createRadialGradient(0, 0, ts * 0.1, 0, 0, ts);
      cg.addColorStop(0, 'rgba(255,60,60,0.95)');
      cg.addColorStop(1, 'rgba(180,0,0,0.7)');
      ctx.fillStyle = cg;
      ctx.fill();

      /* Disc at trailing end */
      const dr = ts * 0.28;
      ctx.beginPath();
      ctx.arc(0, -ts * 0.82, dr, 0, Math.PI * 2);
      const dg = ctx.createRadialGradient(0, -ts * 0.82, 0, 0, -ts * 0.82, dr);
      dg.addColorStop(0, 'rgba(255,120,120,1)');
      dg.addColorStop(0.6, 'rgba(220,20,20,0.9)');
      dg.addColorStop(1, 'rgba(160,0,0,0.4)');
      ctx.fillStyle = dg;
      ctx.fill();
    };

    /* ──────────────── Draw the full iris ──────────────── */
    const drawIris = (cx, cy, irisR, alpha, rotAngle, lidT, pulseT, zoomFrac) => {
      if (irisR < 2) return;
      ctx.save();
      ctx.globalAlpha = alpha;

      /* — Outer crimson aura — */
      for (let i = 4; i >= 1; i--) {
        const gr = irisR * (1.2 + i * 0.45);
        const ga = ctx.createRadialGradient(cx, cy, irisR * 0.7, cx, cy, gr);
        ga.addColorStop(0, `rgba(160,0,0,${0.12 / i})`);
        ga.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(cx, cy, gr, 0, Math.PI * 2);
        ctx.fillStyle = ga;
        ctx.fill();
      }

      /* — Iris disc — */
      const IG = ctx.createRadialGradient(cx, cy, 0, cx, cy, irisR);
      IG.addColorStop(0.00, '#1a0000');
      IG.addColorStop(0.22, '#5a0000');
      IG.addColorStop(0.50, '#b30000');
      IG.addColorStop(0.72, '#8a0000');
      IG.addColorStop(0.90, '#320000');
      IG.addColorStop(1.00, '#0d0000');
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      ctx.fillStyle = IG;
      ctx.fill();

      /* — Iris texture: radial spokes — */
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      ctx.clip();
      const SPOKES = 52;
      for (let i = 0; i < SPOKES; i++) {
        const ang = (i / SPOKES) * Math.PI * 2 + rotAngle * 0.3;
        const wave = Math.sin(ang * 7 + rotAngle) * 0.06;
        const r1   = irisR * (0.28 + wave);
        const r2   = irisR * (0.94 + wave);
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(ang) * r1, cy + Math.sin(ang) * r1);
        ctx.lineTo(cx + Math.cos(ang) * r2, cy + Math.sin(ang) * r2);
        ctx.strokeStyle = 'rgba(255,40,40,0.11)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }
      ctx.restore();

      /* — Inner concentric detail rings — */
      [0.58, 0.74, 0.88].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, irisR * r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(200,0,0,${0.22 - i * 0.04})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      });

      /* — Pupil — */
      const PR = irisR * 0.285;
      const PG = ctx.createRadialGradient(cx, cy, 0, cx, cy, PR);
      PG.addColorStop(0.0, '#000000');
      PG.addColorStop(0.6, '#0a0000');
      PG.addColorStop(1.0, '#160000');
      ctx.beginPath();
      ctx.arc(cx, cy, PR, 0, Math.PI * 2);
      ctx.fillStyle = PG;
      ctx.fill();

      /* Pupil deep-red inner gleam */
      const PGL = ctx.createRadialGradient(cx, cy, 0, cx, cy, PR * 0.45);
      PGL.addColorStop(0, 'rgba(200,0,0,0.35)');
      PGL.addColorStop(1, 'rgba(200,0,0,0)');
      ctx.beginPath();
      ctx.arc(cx, cy, PR * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = PGL;
      ctx.fill();

      /* — Iris outer ring border — */
      ctx.beginPath();
      ctx.arc(cx, cy, irisR, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(230,10,10,0.85)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      /* — 3 Abstract Tomoe symbols (original design) — */
      const orbitR = irisR * 0.60;
      const tSize  = irisR * 0.155;
      for (let t = 0; t < 3; t++) {
        const baseAng = rotAngle + (t / 3) * Math.PI * 2;
        const tx = cx + Math.cos(baseAng) * orbitR;
        const ty = cy + Math.sin(baseAng) * orbitR;
        ctx.save();
        ctx.translate(tx, ty);
        ctx.rotate(baseAng + Math.PI * 0.5);
        drawTomoe(ctx, tSize);
        ctx.restore();
      }

      /* — Eyelid opening effect — */
      if (lidT < 1) {
        const lidH  = irisR * 1.05;
        const lidW  = irisR * 1.25;
        const openY = lidH * lidT;     // how far lids have moved apart
        const clipR = irisR * 1.1;

        /* Eyelid mask: cover top and bottom with curved bezier lids */
        const drawLid = (flip) => {
          ctx.save();
          if (flip) { ctx.scale(1, -1); ctx.translate(0, -2 * cy); }
          const yt = cy - openY;
          ctx.beginPath();
          ctx.moveTo(cx - lidW, yt);
          ctx.bezierCurveTo(
            cx - lidW * 0.35, yt - lidH * 0.55,
            cx + lidW * 0.35, yt - lidH * 0.55,
            cx + lidW, yt,
          );
          ctx.lineTo(cx + lidW, cy - lidH * 3);
          ctx.lineTo(cx - lidW, cy - lidH * 3);
          ctx.closePath();
          ctx.fillStyle = '#000000';
          ctx.fill();
          ctx.restore();
        };
        drawLid(false);
        drawLid(true);
      }

      /* — Crimson pulse ring on eye-open — */
      if (pulseT > 0 && pulseT < 1) {
        const pr1 = irisR * (1 + easeO3(pulseT) * 2.8);
        const pa1 = (1 - pulseT) * 0.9;
        ctx.beginPath();
        ctx.arc(cx, cy, pr1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,20,20,${pa1})`;
        ctx.lineWidth = 3.5 * (1 - pulseT * 0.8);
        ctx.stroke();

        const pr2 = irisR * (1 + easeO3(pulseT) * 1.6);
        ctx.beginPath();
        ctx.arc(cx, cy, pr2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,80,80,${pa1 * 0.55})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      /* — Zoom tunnel rings — */
      if (zoomFrac > 0) {
        const RINGS = 9;
        for (let i = 0; i < RINGS; i++) {
          const phase   = (i / RINGS + zoomFrac * 1.5) % 1;
          const ringR   = irisR * (0.25 + phase * 0.8);
          const ringA   = (1 - phase) * 0.45 * zoomFrac;
          const distort = Math.sin(phase * 12 + rotAngle * 2) * irisR * 0.04 * zoomFrac;
          ctx.beginPath();
          ctx.ellipse(cx, cy, ringR + distort, ringR - distort * 0.5, rotAngle * 0.4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(200,0,0,${ringA})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    /* ──────────────── Render loop ──────────────── */
    const render = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const t = (timestamp - startTime) / 1000;  // elapsed seconds

      /* Phase boundaries */
      const T_SMOKE  = 0.5;
      const T_AWAKEN = 1.9;
      const T_PULSE  = 2.5;
      const T_ZOOM   = 3.4;
      const T_END    = 4.1;

      const cw = W(), ch = H();
      const cx = cw / 2, cy = ch / 2;
      const BASE_R = Math.min(cw, ch) * 0.175;

      /* Clear */
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, cw, ch);

      /* ── Smoke ── */
      const smokeAmt = t < T_ZOOM ? 1 : Math.max(0, 1 - norm(t, T_ZOOM, T_END) * 4);
      if (smokeAmt > 0) {
        SMOKE.forEach(s => {
          s.y  += s.vy;
          s.x  += s.vx;
          s.life += 0.003;
          if (s.y < -100) { s.y = ch + 50; s.x = Math.random() * cw; }
          const pulse = 0.7 + 0.3 * Math.sin(s.life * 2.5);
          const sg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
          sg.addColorStop(0, `rgba(35,0,0,${s.a * pulse * smokeAmt})`);
          sg.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = sg;
          ctx.fill();
        });
      }

      /* ── PHASE 1 — Iris awakens ── */
      if (t >= T_SMOKE && t < T_ZOOM) {
        const awakenFrac = norm(t, T_SMOKE, T_AWAKEN);
        const irisAlpha  = easeO3(awakenFrac);
        const irisR      = BASE_R * easeO3(clamp(awakenFrac * 1.2, 0, 1));
        const rotAngle   = t * 0.9;

        /* Lid openness: closed at start (0), fully open by T_AWAKEN */
        const lidT     = easeIO(norm(t, T_SMOKE, T_AWAKEN));
        /* Pulse: fires at T_AWAKEN, lasts until T_PULSE */
        const pulseT   = t > T_AWAKEN ? norm(t, T_AWAKEN, T_PULSE) : 0;
        /* Zoom tunnel: starts at T_PULSE */
        const zoomFrac = t > T_PULSE ? easeI3(norm(t, T_PULSE, T_ZOOM)) : 0;

        drawIris(cx, cy, irisR, irisAlpha, rotAngle, lidT, pulseT, zoomFrac);
      }

      /* ── PHASE 3 — Zoom / tunnel (iris grows + distorts) ── */
      if (t >= T_PULSE && t < T_ZOOM) {
        const zF     = easeI3(norm(t, T_PULSE, T_ZOOM));
        const bigR   = BASE_R * (1 + zF * 9);
        const rotAng = t * 1.8;

        /* Draw enlarged iris */
        drawIris(cx, cy, bigR, 1, rotAng, 1, 0, zF);

        /* Motion blur overlay */
        ctx.fillStyle = `rgba(0,0,0,${zF * 0.35})`;
        ctx.fillRect(0, 0, cw, ch);

        /* Red vignette closing */
        const vg = ctx.createRadialGradient(cx, cy, bigR * 0.25, cx, cy, Math.max(cw, ch) * 0.9);
        vg.addColorStop(0, 'rgba(0,0,0,0)');
        vg.addColorStop(1, `rgba(80,0,0,${zF * 0.75})`);
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, cw, ch);

        /* Glitch scanlines */
        if (zF > 0.35) {
          const lines = Math.floor(zF * 8);
          for (let g = 0; g < lines; g++) {
            const gy  = Math.random() * ch;
            const gh  = 3 + Math.random() * 25;
            const gox = (Math.random() - 0.5) * 28 * zF;
            ctx.save();
            ctx.globalAlpha = 0.35 * zF;
            ctx.fillStyle = `rgba(200,0,0,0.25)`;
            ctx.fillRect(gox, gy, cw, gh);
            ctx.restore();
          }
        }
      }

      /* ── PHASE 4 — Shatter ── */
      if (t >= T_ZOOM && t < T_END) {
        const sf = norm(t, T_ZOOM, T_END);

        /* Init fragment positions on first frame */
        if (!shatterStarted) {
          shatterStarted = true;
          FRAGS.forEach(f => { f.x = f.ox; f.y = f.oy; f.alpha = 1; });
        }

        FRAGS.forEach(f => {
          f.x    += f.vx;
          f.y    += f.vy;
          f.vy   += 0.18;
          f.alpha = Math.max(0, 1 - sf * 2.2);
          f.rot  += f.rotV;

          if (f.alpha <= 0) return;
          ctx.save();
          ctx.translate(cx + f.x, cy + f.y);
          ctx.rotate(f.rot);
          ctx.globalAlpha = f.alpha;
          ctx.shadowBlur   = 12;
          ctx.shadowColor  = `hsl(${f.hue},100%,55%)`;
          ctx.fillStyle    = `hsl(${f.hue},100%,55%)`;
          ctx.fillRect(-f.size / 2, -f.size / 2, f.size, f.size);
          ctx.restore();
        });

        /* Fade screen to black */
        ctx.fillStyle = `rgba(0,0,0,${easeIO(sf)})`;
        ctx.fillRect(0, 0, cw, ch);
      }

      /* ── Auto-finish ── */
      if (t >= T_END) {
        finishRef.current?.();
        return;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  /* ESC key skip */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') finishRef.current?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div id="intro-overlay" ref={overlayRef}>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />

      {/* Skip button — top-right */}
      <button
        onClick={() => finishRef.current?.()}
        aria-label="Skip intro"
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          zIndex: 20,
          background: 'rgba(100,0,0,0.12)',
          border: '1px solid rgba(180,0,0,0.28)',
          color: 'rgba(220,70,70,0.65)',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.67rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          padding: '7px 20px',
          borderRadius: '100px',
          cursor: 'pointer',
          transition: 'color 0.2s, border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color          = '#ff4444';
          e.currentTarget.style.borderColor    = 'rgba(255,50,50,0.55)';
          e.currentTarget.style.background     = 'rgba(120,0,0,0.22)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color          = 'rgba(220,70,70,0.65)';
          e.currentTarget.style.borderColor    = 'rgba(180,0,0,0.28)';
          e.currentTarget.style.background     = 'rgba(100,0,0,0.12)';
        }}
      >
        SKIP &nbsp; ESC
      </button>
    </div>
  );
}
