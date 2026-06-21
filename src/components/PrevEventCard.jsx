import React, { useState, useRef, useEffect } from 'react';

const PrevEventCard = ({ event, onClick, animDelay = 0 }) => {
  const [hovered, setHovered] = useState(false);
  const [freezeP, setFreezeP] = useState(0);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    const target = hovered ? 1 : 0;
    let cur = freezeP;
    const step = () => {
      cur += (target - cur) * (hovered ? 0.04 : 0.06);
      if (Math.abs(cur - target) < 0.003) cur = target;
      setFreezeP(cur);
      if (cur !== target) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  const c = '#4a8aaa';

  const crystalLines = hovered ? [
    { x1: 0,   y1: 0,   dx: 35,  dy: 35  },
    { x1: 260, y1: 0,   dx: -35, dy: 35  },
    { x1: 0,   y1: 160, dx: 35,  dy: -35 },
    { x1: 260, y1: 160, dx: -35, dy: -35 },
  ] : [];

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(event)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={e => e.key === 'Enter' && onClick(event)}
      role="button"
      tabIndex={0}
      aria-label={`View archive details for ${event.name}`}
      style={{
        position: 'relative',
        width: 260, height: 180,
        cursor: 'pointer', flexShrink: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
        transition: `opacity 0.65s ease ${animDelay}s, transform 0.65s cubic-bezier(0.34,1.2,0.64,1) ${animDelay}s`,
        outline: 'none', borderRadius: 4, overflow: 'visible',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered
          ? 'linear-gradient(145deg, #26c6da 0%, #0e4468 50%, #0d3c5c 100%)'
          : 'linear-gradient(145deg, #091820 0%, #0c2030 50%, #091520 100%)',
        border: `1.5px solid ${hovered ? c + 'cc' : c + '40'}`,
        borderRadius: 4,
        transition: 'border-color 0.35s, background 0.35s',
        boxShadow: hovered
          ? `0 0 28px ${c}55, 0 8px 24px rgba(0,0,0,0.5), inset 0 0 20px rgba(100,180,220,0.06)`
          : `0 0 8px ${c}18, 0 4px 12px rgba(0,0,0,0.3)`,
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, rgba(100,180,220,${0.08 * freezeP}) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '55%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(100,180,220,0.04), transparent)',
          animation: 'shimmer 6s linear infinite',
          pointerEvents: 'none',
        }} />

        {[
          { top: 0,    left: 0,   borderTop:    `2px solid ${c}`, borderLeft:   `2px solid ${c}`, borderRadius: '3px 0 0 0' },
          { top: 0,    right: 0,  borderTop:    `2px solid ${c}`, borderRight:  `2px solid ${c}`, borderRadius: '0 3px 0 0' },
          { bottom: 0, left: 0,   borderBottom: `2px solid ${c}`, borderLeft:   `2px solid ${c}`, borderRadius: '0 0 0 3px' },
          { bottom: 0, right: 0,  borderBottom: `2px solid ${c}`, borderRight:  `2px solid ${c}`, borderRadius: '0 0 3px 0' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: hovered ? 22 : 14, height: hovered ? 22 : 14,
            opacity: hovered ? 0.9 : 0.5,
            transition: 'width 0.3s, height 0.3s, opacity 0.3s',
            ...s,
          }} />
        ))}

        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
          {crystalLines.map((l, i) => (
            <g key={i} opacity={freezeP}>
              <line x1={l.x1} y1={l.y1} x2={l.x1 + l.dx * freezeP} y2={l.y1 + l.dy * freezeP}
                stroke="rgba(140,210,255,0.6)" strokeWidth="1" />
              <line x1={l.x1} y1={l.y1} x2={l.x1 + l.dx * 0.6 * freezeP} y2={l.y1 + l.dy * 0.4 * freezeP}
                stroke="rgba(140,210,255,0.4)" strokeWidth="0.7" />
              <line x1={l.x1} y1={l.y1} x2={l.x1 + l.dx * 0.4 * freezeP} y2={l.y1 + l.dy * 0.7 * freezeP}
                stroke="rgba(140,210,255,0.4)" strokeWidth="0.7" />
            </g>
          ))}
          {freezeP > 0.3 && (
            <g transform="translate(220, 140)" opacity={Math.min(1, (freezeP - 0.3) / 0.7) * 0.5}>
              {[0, 60, 120, 180, 240, 300].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const len = 12 * freezeP;
                return (
                  <g key={i}>
                    <line x1={0} y1={0} x2={Math.cos(rad) * len} y2={Math.sin(rad) * len}
                      stroke="rgba(180,230,255,0.7)" strokeWidth="0.8" />
                    <line
                      x1={Math.cos(rad) * len * 0.5} y1={Math.sin(rad) * len * 0.5}
                      x2={Math.cos(rad + 0.6) * len * 0.35} y2={Math.sin(rad + 0.6) * len * 0.35}
                      stroke="rgba(180,230,255,0.5)" strokeWidth="0.6" />
                  </g>
                );
              })}
            </g>
          )}
        </svg>

        <div style={{ padding: '14px 16px', height: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 26, filter: `drop-shadow(0 0 8px ${c}80)` }}>{event.icon}</span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <div style={{
                fontFamily: 'Times New Roman', fontSize: 12, letterSpacing: '2px',
                color: '#ff9d00', padding: '2px 8px',
                border: `2px solid ${c}40`, borderRadius: 3,
                background: c + '10',
              }}>
                {event.category.toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Arial Black', fontSize: 10, letterSpacing: '1.5px', color: '#26c6da', opacity: 0.7 }}>
                {event.year}
              </div>
            </div>
          </div>

          <div style={{
            fontFamily: 'Orbitron', fontWeight: 800,
            fontSize: event.name.length > 13 ? 11 : event.name.length > 9 ? 13 : 15,
            color: hovered ? '#e8f4f4' : '#b0ccd8',
            letterSpacing: '1.5px', lineHeight: 1.2,
            textShadow: hovered ? `0 0 14px ${c}80` : 'none',
            transition: 'color 0.3s, text-shadow 0.3s',
          }}>
            {event.name}
          </div>

          <div style={{
            fontFamily: 'Arial Black', fontSize: 16, fontWeight: 700,
            color: '#7ac0d4',
            textShadow: hovered ? '0 0 12px rgba(122,192,212,0.7)' : 'none',
            transition: 'text-shadow 0.3s',
          }}>
            {event.prize}
          </div>

          <div style={{ display: 'flex', gap: 12, marginTop: 'auto' }}>
            {[
              { label: 'TEAM',   value: event.teamSize },
              { label: 'ROUNDS', value: event.rounds   },
              { label: 'TYPE',   value: event.type     },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <div style={{ width: 1, background: c + '25', alignSelf: 'stretch' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{ fontFamily: 'Arial Black', fontSize: 10, letterSpacing: '1.5px', color: '#5a8090' }}>{item.label}</span>
                  <span style={{ fontFamily: 'Rajdhani', fontSize: 14, fontWeight: 600, color: '#ff9d00' }}>{item.value}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 5, height: 5, borderRadius: '50%',
                background: c, boxShadow: `0 0 6px ${c}`,
                animation: 'phase-pulse 1.8s ease-in-out infinite',
              }} />
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 10, letterSpacing: '1px', color: '#26c6da' }}>
                ChEA
              </span>
            </div>
            <span style={{
              fontFamily: 'Arial Black', fontSize: 10, fontWeight: 700,
              letterSpacing: '1.5px', color: '#26c6da',
              opacity: hovered ? 1 : 0.4,
              transition: 'opacity 0.25s',
            }}>
              VIEW →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrevEventCard;
