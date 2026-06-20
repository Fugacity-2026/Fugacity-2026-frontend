import React, { useEffect, useRef, useState } from 'react';

const DENSITY = 12000;
const COLORS = ['#00f5d4', '#00d4ff', '#7efaf3', '#00e5cc', '#aafff5'];

const FlaskIntro = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef('assemble');
  const particlesRef = useRef([]);
  const holdTimerRef = useRef(0);
  const explodeProgressRef = useRef(0);
  const [textAlpha, setTextAlpha] = useState(0);
  const [subAlpha, setSubAlpha] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: false });
    let W, H;

    function buildParticles() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particlesRef.current = [];
      for (let i = 0; i < DENSITY; i++) {
        particlesRef.current.push(new Particle(i % 3, W, H));
      }
    }

    class Particle {
      constructor(group, W, H) {
        this.group = group;
        this.W = W;
        this.H = H;
        this.isBubble = false;
        this.assembled = false;
        this.assembleProgress = 0;
        this.reset(true);
      }

      reset(firstTime = false) {
        this.isBubble = false;
        this.opacity = Math.random() * 0.85 + 0.15;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.size = Math.random() * 1.8 + 0.3;
        this.bubbleSpeed = Math.random() * 2.2 + 0.8;
        this.jitter = Math.random() * 2.0;
        this.delay = Math.random() * 0.5;

        const W = this.W, H = this.H;
        const s = Math.min(W, H) * 0.22;
        const cx = (W / 4) * (this.group + 1);

        if (this.group === 0) {
          const neckW = s * 0.20, neckH = s * 0.40, baseW = s * 0.85, baseH = s * 0.65;
          if (Math.random() > 0.28) {
            const h = Math.random();
            const currentW = neckW + (baseW - neckW) * h;
            this.tx = (Math.random() - 0.5) * currentW;
            this.ty = h * baseH;
          } else {
            this.tx = (Math.random() - 0.5) * neckW;
            this.ty = -Math.random() * neckH;
          }
        } else if (this.group === 1) {
          const r = s * 0.15;
          if (Math.random() > 0.55) {
            const side = Math.floor(Math.random() * 4) * (Math.PI / 2);
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random()) * (r * 0.85);
            this.tx = Math.cos(side) * s * 0.52 + Math.cos(angle) * dist;
            this.ty = Math.sin(side) * s * 0.52 + Math.sin(angle) * dist;
          } else {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.sqrt(Math.random()) * r;
            this.tx = Math.cos(angle) * dist;
            this.ty = Math.sin(angle) * dist;
          }
        } else {
          const side = Math.floor(Math.random() * 6);
          const a1 = (side * Math.PI * 2) / 6;
          const a2 = ((side + 1) * Math.PI * 2) / 6;
          const p1 = Math.random(), p2 = Math.random();
          const r = s * 0.62;
          this.tx = (Math.cos(a1) * p1 + Math.cos(a2) * (1 - p1)) * r * p2;
          this.ty = (Math.sin(a1) * p1 + Math.sin(a2) * (1 - p1)) * r * p2;
        }

        this.cx = (W / 4) * (this.group + 1);
        this.cy = H / 2;

        if (firstTime) {
          const angle = Math.random() * Math.PI * 2;
          const dist = Math.min(W, H) * (0.6 + Math.random() * 0.8);
          this.x = this.cx + Math.cos(angle) * dist;
          this.y = this.cy + Math.sin(angle) * dist;
        }

        this.explodeVx = 0;
        this.explodeVy = 0;
      }

      update(tilt, state, assembleT) {
        if (state === 'explode' || state === 'done') {
          this.x += this.explodeVx;
          this.y += this.explodeVy;
          this.explodeVy += 0.12;
          this.explodeVx *= 0.995;
          this.opacity = Math.max(0, this.opacity - 0.018);
          return;
        }

        if (this.isBubble) {
          this.y -= this.bubbleSpeed;
          this.x += Math.sin(this.y * 0.09) * 1.6;
          this.opacity -= 0.014;
          if (this.opacity <= 0) this.reset(false);
          return;
        }

        const cos = Math.cos(tilt), sin = Math.sin(tilt);
        const rx = this.cx + (this.tx * cos - this.ty * sin);
        const ry = this.cy + (this.tx * sin + this.ty * cos);
        const localP = Math.max(0, Math.min(1, (assembleT - this.delay) / (1 - this.delay + 0.001)));
        const ease = 1 - Math.pow(1 - localP, 3);
        const speed = 0.06 + ease * 0.06;

        this.x += (rx - this.x) * speed + (Math.random() - 0.5) * this.jitter * (1 - ease * 0.7);
        this.y += (ry - this.y) * speed + (Math.random() - 0.5) * this.jitter * (1 - ease * 0.7);
        this.opacity = Math.min(1, this.opacity + 0.02);

        if (state === 'hold' && Math.random() < 0.0028) this.isBubble = true;
      }

      draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      }
    }

    let assembleProg = 0;

    const animate = () => {
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#000d0d';
      ctx.fillRect(0, 0, W, H);

      const state = stateRef.current;
      const tilt = Math.sin(Date.now() * 0.0011) * 0.18;

      if (state === 'assemble') assembleProg = Math.min(assembleProg + 0.015, 1);

      if (state === 'hold') {
        holdTimerRef.current++;
        if (holdTimerRef.current === 1) {
          setTextAlpha(1);
          setTimeout(() => setSubAlpha(1), 350);
        }
        if (holdTimerRef.current > 90) {
          particlesRef.current.forEach(p => {
            const dx = p.x - W / 2, dy = p.y - H / 2;
            const dist = Math.sqrt(dx * dx + dy * dy) + 1;
            const speed = 5 + Math.random() * 18;
            p.explodeVx = (dx / dist) * speed + (Math.random() - 0.5) * 9;
            p.explodeVy = (dy / dist) * speed + (Math.random() - 0.5) * 9;
          });
          stateRef.current = 'explode';
          setTextAlpha(0);
          setSubAlpha(0);
        }
      }

      if (state === 'explode') {
        explodeProgressRef.current = Math.min(explodeProgressRef.current + 0.016, 1);
        if (explodeProgressRef.current >= 0.88 && stateRef.current !== 'done') {
          stateRef.current = 'done';
          setTimeout(() => onComplete && onComplete(), 200);
        }
      }

      ctx.globalCompositeOperation = 'lighter';
      particlesRef.current.forEach(p => { p.update(tilt, state, assembleProg); p.draw(ctx); });
      ctx.globalCompositeOperation = 'source-over';

      if (state === 'assemble' && assembleProg >= 1) stateRef.current = 'hold';

      animRef.current = requestAnimationFrame(animate);
    };

    buildParticles();
    animRef.current = requestAnimationFrame(animate);

    const onResize = () => buildParticles();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, [onComplete]);

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: '#000d0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, filter: 'contrast(1.12) brightness(1.18)' }} />

      <div style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 10,
        opacity: textAlpha, transition: 'opacity 0.9s ease',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        <div style={{ fontFamily: 'Times New Roman', fontSize: 'clamp(9px,1.3vw,12px)', letterSpacing: '8px', color: '#00f2ff', marginBottom: '10px', textTransform: 'uppercase', opacity: 0.75 }}>
          Chemical Engineering Association
        </div>
        <div style={{ fontFamily: "Arial Black", fontSize: 'clamp(36px,8vw,88px)', fontWeight: 900, color: '#e8f8f8', letterSpacing: '10px', lineHeight: 1, textShadow: '0 0 30px rgba(0,242,255,0.55), 0 0 70px rgba(0,242,255,0.2)' }}>
          FUGACITY
        </div>
        <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(20px,3.5vw,42px)', fontWeight: 700, color: '#00f2ff', letterSpacing: '8px', textShadow: '0 0 18px rgba(0,242,255,1)', marginTop: '4px' }}>
          &apos;26
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '9%', left: '50%', transform: 'translateX(-50%)',
        textAlign: 'center', zIndex: 10,
        opacity: subAlpha, transition: 'opacity 1s ease',
        pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(13px,1.8vw,17px)', color: '#a0d8d8', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 500 }}>
          Where Chemistry Meets Innovation
        </div>
        <div style={{ marginTop: '18px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#00f2ff', boxShadow: '0 0 10px #00f2ff, 0 0 20px #00f2ff',
              animation: `pulseDot 1.3s ease-in-out ${i * 0.22}s infinite`,
            }} />
          ))}
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: '3%', left: 0, right: 0,
        display: 'flex', justifyContent: 'space-around',
        zIndex: 10, opacity: subAlpha, transition: 'opacity 1s ease', pointerEvents: 'none',
      }}>
        {['🥇 Competitions', '🏆 GuestLectures', '🔥 WorkShops'].map((label, i) => (
          <div key={i} style={{ fontFamily: "Times New Roman", fontSize: 'clamp(15px,1vw,11px)', color: '#00f2ff', letterSpacing: '4px', opacity: 0.55 }}>
            {label}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default FlaskIntro;
