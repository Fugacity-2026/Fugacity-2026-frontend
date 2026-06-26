import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   SINGLE-FIRE GUARANTEE
   ─ Each canvas component checks doneFired.current at the TOP
     of useEffect. If true (StrictMode remount / any re-render),
     the effect returns immediately without starting a new loop.
   ─ PhaseTransition wraps onDone in its own firedRef so even if
     two children somehow call through, onDone fires exactly once.
   ─ React StrictMode is removed in main.jsx so double-mount no
     longer happens in dev, but the guards remain for safety.

   DURATION
   ─ Melt  : ~0.9 s  (tipSpeed 32-56, delay spread 0-0.5)
   ─ Plasma: ~0.9 s  (DONE_FRAME = 55 @ 60 fps)
   ─ Freeze: ~0.8 s  (shard speed 20-44)
───────────────────────────────────────────────────────────── */

/* ── MELT ── */
const MeltTransition = ({ onDone }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const doneFired = useRef(false);

  useEffect(() => {
    if (doneFired.current) return;          // StrictMode / remount guard

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const COLS = 50;
    const colW = W / COLS;

    const drips = Array.from({ length: COLS }, (_, i) => ({
      x: i * colW,
      delay: i * 0.03 + Math.random() * 0.5,   // tighter delay spread
      height: H * (0.88 + Math.random() * 0.12),
      tip: 0,
      tipSpeed: 32 + Math.random() * 24,         // faster drips
      wave: Math.random() * Math.PI * 2,
    }));

    const rings = Array.from({ length: 3 }, (_, i) => ({
      x: W * 0.2 + Math.random() * W * 0.6,
      y: H * 0.3 + Math.random() * H * 0.4,
      r: 0, maxR: 55 + Math.random() * 80,
      speed: 6 + Math.random() * 5,
      alpha: 0.8, delay: i * 2,
    }));

    let frame = 0;
    let finished = false;

    const fire = () => {
      if (doneFired.current) return;
      doneFired.current = true;
      setTimeout(onDone, 20);
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(2,12,18,0.88)';
      ctx.fillRect(0, 0, W, H);

      drips.forEach(d => {
        if (frame < d.delay) return;
        d.tip = Math.min(d.tip + d.tipSpeed, d.height);

        const grad = ctx.createLinearGradient(d.x, 0, d.x, d.tip);
        grad.addColorStop(0,    'rgba(78,226,255,1)');
        grad.addColorStop(0.35, 'rgba(78,226,255,0.75)');
        grad.addColorStop(0.75, 'rgba(2,60,50,0.5)');
        grad.addColorStop(1,    'rgba(2,20,18,0)');

        const waveX = Math.sin(frame * 0.05 + d.wave) * 3;
        ctx.beginPath();
        ctx.moveTo(d.x + waveX, 0);
        ctx.lineTo(d.x + colW + waveX, 0);
        ctx.lineTo(d.x + colW + waveX * 0.5, d.tip);
        ctx.lineTo(d.x + waveX * 0.5, d.tip);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        if (d.tip < d.height) {
          ctx.beginPath();
          ctx.arc(d.x + colW / 2 + waveX, d.tip, 3 + Math.random() * 2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f5d4';
          ctx.shadowColor = '#00f5d4';
          ctx.shadowBlur = 12;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      rings.forEach(r => {
        if (frame < r.delay) return;
        r.r = Math.min(r.r + r.speed, r.maxR);
        r.alpha = Math.max(0, 0.8 * (1 - r.r / r.maxR));
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,245,212,${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        if (r.r >= r.maxR) { r.r = 0; r.alpha = 0.8; }
      });

      if (!finished && drips.every(d => d.tip >= d.height)) {
        finished = true;
        fire();
        return;                               // stop rAF after firing
      }
      if (!finished) animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);                                     // empty deps — run once

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none',
    }} aria-hidden="true" />
  );
};

/* ── PLASMA ── */
const PlasmaTransition = ({ onDone }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const doneFired = useRef(false);

  useEffect(() => {
    if (doneFired.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const lightning = (x1, y1, x2, y2, roughness, depth) => {
      if (depth === 0) { ctx.lineTo(x2, y2); return; }
      const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness;
      const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness;
      lightning(x1, y1, mx, my, roughness * 0.6, depth - 1);
      lightning(mx, my, x2, y2, roughness * 0.6, depth - 1);
    };

    const drawBolt = (x1, y1, x2, y2, alpha, color) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      lightning(x1, y1, x2, y2, 120, 6);
      ctx.strokeStyle = color || `rgba(0,245,212,${alpha})`;
      ctx.lineWidth = 1.5 + Math.random() * 2;
      ctx.shadowColor = '#4ee2ff';
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      lightning(x1, y1, x2, y2, 80, 5);
      ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.3})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const nodes = Array.from({ length: 14 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 3.5, vy: (Math.random() - 0.5) * 3.5,
      r: 8 + Math.random() * 20,
    }));

    const DONE_FRAME = 30;   // ~0.9 s at 60 fps
    let frame = 0;
    let finished = false;

    const fire = () => {
      if (doneFired.current) return;
      doneFired.current = true;
      setTimeout(onDone, 20);
    };

    const draw = () => {
      frame++;
      ctx.fillStyle = `rgba(5,0,20,${Math.min(0.92, frame * 0.02)})`;
      ctx.fillRect(0, 0, W, H);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      if (frame % 2 === 0) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 420 && Math.random() > 0.3) {
              const alpha = (1 - dist / 420) * (0.5 + Math.random() * 0.5);
              const cols = [
                `rgba(0,245,212,${alpha})`,
                `rgba(12,161,131,${alpha})`,
                `rgba(100,255,230,${alpha})`,
                `rgba(240,165,0,${alpha * 0.5})`,
              ];
              drawBolt(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, alpha,
                cols[Math.floor(Math.random() * cols.length)]);
            }
          }
        }
        if (Math.random() > 0.55) {
          const x1 = Math.random() * W, y1 = Math.random() * H;
          drawBolt(x1, y1,
            x1 + (Math.random() - 0.5) * 350,
            y1 + (Math.random() - 0.5) * 350,
            0.4 + Math.random() * 0.4);
        }
      }

      nodes.forEach(n => {
        const pulse = 0.7 + 0.3 * Math.sin(frame * 0.2 + n.x);
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3 * pulse);
        grad.addColorStop(0, 'rgba(48, 171, 202, 0.9)');
        grad.addColorStop(0.3, 'rgba(0,245,212,0.35)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(55, 166, 209, 0.9)';
        ctx.shadowColor = '#4ee2ff';
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      if (frame >= DONE_FRAME && !finished) {
        finished = true;
        fire();
        return;
      }
      if (!finished) animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none',
    }} aria-hidden="true" />
  );
};

/* ── FREEZE ── */
const FreezeTransition = ({ onDone }) => {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const doneFired = useRef(false);

  useEffect(() => {
    if (doneFired.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width  = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const SHARDS = 90;
    const cx = W / 2, cy = H / 2;
    const shards = Array.from({ length: SHARDS }, (_, i) => {
      const angle = (i / SHARDS) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const dist  = 20 + Math.random() * Math.max(W, H) * 0.85;
      return {
        angle, dist, currentDist: 0,
        speed: 20 + Math.random() * 24,   // faster shards
        width: 2 + Math.random() * 14,
        hue: 170 + Math.random() * 30,
        alpha: 0.5 + Math.random() * 0.5,
        branches: Math.random() > 0.5,
        branchAngle: (Math.random() - 0.5) * 0.8,
        branchDist: 0.3 + Math.random() * 0.5,
      };
    });

    const tiles = Array.from({ length: 18 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 0, maxR: 30 + Math.random() * 70,
      speed: 4 + Math.random() * 5,
      alpha: 0, delay: Math.random() * 20,
    }));

    let frame = 0;
    let finished = false;

    const fire = () => {
      if (doneFired.current) return;
      doneFired.current = true;
      setTimeout(onDone, 60);
    };

    const drawHex = (x, y, r, alpha) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
        i === 0
          ? ctx.moveTo(x + Math.cos(a) * r, y + Math.sin(a) * r)
          : ctx.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(0,245,212,${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = `rgba(0,40,50,${alpha * 0.3})`;
      ctx.fill();
    };

    const draw = () => {
      frame++;
      ctx.fillStyle = `rgba(2,8,20,${Math.min(0.88, frame * 0.018)})`;
      ctx.fillRect(0, 0, W, H);

      shards.forEach(s => {
        s.currentDist = Math.min(s.currentDist + s.speed, s.dist);
        const endX = cx + Math.cos(s.angle) * s.currentDist;
        const endY = cy + Math.sin(s.angle) * s.currentDist;
        const perpX = Math.cos(s.angle + Math.PI / 2) * s.width;
        const perpY = Math.sin(s.angle + Math.PI / 2) * s.width;

        ctx.beginPath();
        ctx.moveTo(cx + perpX * 0.3, cy + perpY * 0.3);
        ctx.lineTo(endX + perpX, endY + perpY);
        ctx.lineTo(endX, endY + 2);
        ctx.lineTo(endX - perpX, endY - perpY);
        ctx.lineTo(cx - perpX * 0.3, cy - perpY * 0.3);
        ctx.closePath();

        const grad = ctx.createLinearGradient(cx, cy, endX, endY);
        grad.addColorStop(0,   `hsla(${s.hue},100%,80%,${s.alpha * 0.9})`);
        grad.addColorStop(0.5, `hsla(${s.hue},100%,60%,${s.alpha * 0.6})`);
        grad.addColorStop(1,   `hsla(${s.hue},100%,40%,0)`);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = `hsla(${s.hue},100%,90%,${s.alpha * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        if (s.branches && s.currentDist > s.dist * s.branchDist) {
          const bx  = cx + Math.cos(s.angle) * s.dist * s.branchDist;
          const by  = cy + Math.sin(s.angle) * s.dist * s.branchDist;
          const bEnd = s.currentDist - s.dist * s.branchDist;
          ctx.beginPath();
          ctx.moveTo(bx, by);
          ctx.lineTo(bx + Math.cos(s.angle + s.branchAngle) * bEnd * 0.6,
                     by + Math.sin(s.angle + s.branchAngle) * bEnd * 0.6);
          ctx.strokeStyle = `rgba(0,245,212,${s.alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      tiles.forEach(tile => {
        if (frame < tile.delay) return;
        tile.r = Math.min(tile.r + tile.speed, tile.maxR);
        tile.alpha = Math.min(0.7, tile.r / tile.maxR);
        drawHex(tile.x, tile.y, tile.r, tile.alpha);
      });

      const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 120);
      cGrad.addColorStop(0, 'rgba(0,245,212,0.4)');
      cGrad.addColorStop(0.5, 'rgba(0,245,212,0.1)');
      cGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.fillStyle = cGrad;
      ctx.fill();

      if (!finished && shards.every(s => s.currentDist >= s.dist)) {
        finished = true;
        fire();
        return;
      }
      if (!finished) animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'fixed', inset: 0, zIndex: 10000, pointerEvents: 'none',
    }} aria-hidden="true" />
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
   onDone is wrapped in a one-shot ref so it fires at most once
   no matter what the child components do.
───────────────────────────────────────────────────────────── */
const PhaseTransition = ({ phase, onDone }) => {
  const firedRef = useRef(false);

  // Stable, one-shot wrapper — created once per mount
  const stableOnDone = useRef(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    onDone();
  }).current;

  if (phase === 'melt' || phase === 'liquid' || phase === 'gas') {
    return <MeltTransition   onDone={stableOnDone} />;
  }
  if (phase === 'plasma') {
    return <PlasmaTransition onDone={stableOnDone} />;
  }
  if (phase === 'freeze' || phase === 'solid') {
    return <FreezeTransition onDone={stableOnDone} />;
  }
  return null;
};

export default PhaseTransition;
