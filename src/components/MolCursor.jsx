import React, { useEffect, useRef, useState } from 'react';

const MolCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const canvasRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const ringPosRef = useRef({ x: -200, y: -200 });
  const trailRef = useRef([]);
  const animRef = useRef(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
      trailRef.current.push({ x: e.clientX, y: e.clientY, life: 1.0 });
      if (trailRef.current.length > 16) trailRef.current.shift();
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.04;
      const { x, y } = posRef.current;

      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.1;
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x + 'px';
        ringRef.current.style.top = ringPosRef.current.y + 'px';
      }

      trailRef.current.forEach(pt => {
        pt.life -= 0.06;
        if (pt.life <= 0) return;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2 * pt.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,212,${pt.life * 0.2})`;
        ctx.fill();
      });
      trailRef.current = trailRef.current.filter(p => p.life > 0);

      const orbits = [
        { r: 13, speed: 1.2, tilt: 0, color: '#00f5d4', eSize: 2.2 },
        { r: 13, speed: -0.9, tilt: Math.PI / 2.5, color: '#0ca183', eSize: 1.8 },
        { r: 17, speed: 0.6, tilt: Math.PI / 4, color: '#00ffea', eSize: 1.4 },
      ];
      orbits.forEach(orb => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(orb.tilt);
        ctx.beginPath();
        ctx.ellipse(0, 0, orb.r, orb.r * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = orb.color + '28';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        const ex = Math.cos(t * orb.speed) * orb.r;
        const ey = Math.sin(t * orb.speed) * orb.r * 0.35;
        ctx.beginPath();
        ctx.arc(ex, ey, orb.eSize, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.shadowColor = orb.color;
        ctx.shadowBlur = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99997 }} />
      <div ref={ringRef} style={{
        position: 'fixed', width: clicking ? 26 : 34, height: clicking ? 26 : 34,
        border: '1.5px solid rgba(0,245,212,0.45)', borderRadius: '50%',
        pointerEvents: 'none', zIndex: 99998,
        transform: 'translate(-50%,-50%)',
        transition: 'width 0.15s, height 0.15s',
      }} />
      <div ref={cursorRef} style={{ position: 'fixed', pointerEvents: 'none', zIndex: 99999, transform: 'translate(-50%,-50%)' }}>
        <svg width="12" height="12" viewBox="0 0 12 12">
          <circle cx="6" cy="6" r="4" fill="#00f5d4" />
          <circle cx="6" cy="6" r="2" fill="#021a1a" />
          <circle cx="6" cy="6" r="1" fill="#00f5d4" />
        </svg>
      </div>
    </>
  );
};

export default MolCursor;
