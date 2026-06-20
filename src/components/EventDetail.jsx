import React, { useState, useEffect } from 'react';

/* ─────────────────────────────────────────────────────────────
   EventDetail — shows event info after the phase transition.
   The transition is fired ONLY from EventsPage (parent).
   This component NEVER spawns its own PhaseTransition —
   that was the root cause of the double-play bug.
───────────────────────────────────────────────────────────── */
const EventDetail = ({ event, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  // Fade in immediately on mount — no internal transition
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 380);
  };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const c = event.color;

  const phaseLabels = {
    liquid: 'LIQUID PHASE', melt: 'MELTING POINT',
    solid: 'SOLID PHASE',  freeze: 'FROZEN STATE',
    gas: 'GAS PHASE',      evaporate: 'VAPORISATION',
    plasma: 'PLASMA STATE',
  };

  const isShowing = visible && !closing;

  return (
    <div
      onClick={e => e.target === e.currentTarget && handleClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 5000,
        background: 'rgba(1,8,14,0.94)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        opacity: isShowing ? 1 : 0,
        transition: 'opacity 0.38s ease',
        overflowY: 'auto',
      }}
    >
      <div style={{
        position: 'relative', width: '100%', maxWidth: '840px',
        background: 'linear-gradient(145deg, #031c1c 0%, #042424 40%, #031820 100%)',
        border: `1px solid ${c}50`,
        borderRadius: '3px',
        padding: 'clamp(24px, 4vw, 48px)',
        transform: isShowing ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)',
        transition: 'transform 0.42s cubic-bezier(0.34,1.4,0.64,1)',
        boxShadow: `0 0 80px ${c}25, 0 0 160px ${c}10, inset 0 1px 0 ${c}20`,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Corner brackets */}
        {[
          { top: 0,    left: 0,   borderTop:    `2px solid ${c}`, borderLeft:   `2px solid ${c}` },
          { top: 0,    right: 0,  borderTop:    `2px solid ${c}`, borderRight:  `2px solid ${c}` },
          { bottom: 0, left: 0,   borderBottom: `2px solid ${c}`, borderLeft:   `2px solid ${c}` },
          { bottom: 0, right: 0,  borderBottom: `2px solid ${c}`, borderRight:  `2px solid ${c}` },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...s }} />
        ))}

        {/* Scan line */}
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
          background: `linear-gradient(90deg, transparent, ${c}08, transparent)`,
          animation: 'card-scan 5s linear infinite',
          pointerEvents: 'none',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: `1px solid ${c}40`,
            color: c, width: 38, height: 38, borderRadius: '2px', cursor: 'pointer',
            fontFamily: 'Orbitron', fontSize: '14px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = c + '20'; e.currentTarget.style.boxShadow = `0 0 16px ${c}50`; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
          aria-label="Close"
        >✕</button>

        {/* Phase badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: c + '12', border: `1px solid ${c}35`,
          borderRadius: '2px', padding: '4px 14px', marginBottom: 20,
          fontFamily: 'Share Tech Mono', fontSize: 11, letterSpacing: '2px',
          color: c, textTransform: 'uppercase',
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: c, boxShadow: `0 0 10px ${c}`,
            display: 'inline-block',
            animation: 'phase-pulse 1.5s ease-in-out infinite',
          }} />
          {phaseLabels[event.phase] || event.phase}
          {event.year && <span style={{ opacity: 0.6, marginLeft: 8 }}>· {event.year}</span>}
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28 }}>
          <div style={{ fontSize: 'clamp(40px,7vw,60px)', lineHeight: 1, filter: `drop-shadow(0 0 16px ${c})`, flexShrink: 0 }}>
            {event.icon}
          </div>
          <div>
            <div style={{ fontFamily: 'Share Tech Mono', fontSize: 11, letterSpacing: '3px', color: c, marginBottom: 6, opacity: 0.8 }}>
              {event.category} · {event.type} EVENT
            </div>
            <h2 style={{
              fontFamily: 'Orbitron', fontSize: 'clamp(20px,4.5vw,38px)',
              fontWeight: 900, color: '#e8f4f4', letterSpacing: '2px',
              textShadow: `0 0 24px ${c}50`, lineHeight: 1.1, marginBottom: 8,
            }}>{event.name}</h2>
            <div style={{ fontFamily: 'Rajdhani', fontSize: 15, color: '#6aacac' }}>
              {event.rounds} Round{event.rounds > 1 ? 's' : ''} · Team: {event.teamSize}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 28 }}>
          {[
            { label: 'PRIZE POOL', value: event.prize, gold: true },
            { label: 'TEAM SIZE',  value: event.teamSize + ' members' },
            { label: 'ROUNDS',     value: event.rounds + ' rounds' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#021616', border: `1px solid ${c}25`,
              borderRadius: '2px', padding: '14px 12px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: stat.gold ? '#f0a500' : c, opacity: 0.4 }} />
              <div style={{ fontFamily: 'Share Tech Mono', fontSize: 9, letterSpacing: '2px', color: '#6aacac', marginBottom: 6 }}>{stat.label}</div>
              <div style={{
                fontFamily: 'Orbitron', fontSize: 'clamp(14px,2.5vw,20px)', fontWeight: 700,
                color: stat.gold ? '#f0a500' : c,
                textShadow: stat.gold ? '0 0 14px #f0a50080' : `0 0 14px ${c}80`,
              }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <SectionBlock label="ABOUT THE EVENT" color={c}>
          <p style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(15px,1.8vw,18px)', lineHeight: 1.75, color: '#b0d8d8' }}>
            {event.description}
          </p>
        </SectionBlock>

        {/* Event structure */}
        <SectionBlock label="EVENT STRUCTURE" color={c}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {event.details.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '10px 16px',
                background: 'rgba(0,245,212,0.03)',
                borderLeft: `3px solid ${c}`,
                borderBottom: `1px solid ${c}15`,
                borderRadius: '0 2px 2px 0',
              }}>
                <span style={{ fontFamily: 'Share Tech Mono', color: c, fontSize: 12, minWidth: 22, opacity: 0.7 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(13px,1.6vw,16px)', color: '#b0d8d8', lineHeight: 1.5 }}>
                  {d}
                </span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Rules */}
        <SectionBlock label="RULES & REGULATIONS" color={c}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 8 }}>
            {event.rules.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px', background: '#021414',
                border: '1px solid rgba(0,245,212,0.12)', borderRadius: '2px',
              }}>
                <span style={{ color: '#f0a500', fontSize: 12, marginTop: 2, flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: 'Rajdhani', fontSize: 'clamp(12px,1.4vw,15px)', color: '#b0d8d8', lineHeight: 1.45 }}>{r}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <button style={{
            flex: 1, minWidth: 160, padding: '15px 28px',
            background: c, border: 'none', borderRadius: '2px',
            fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700,
            letterSpacing: '2.5px', color: '#021a1a', cursor: 'pointer',
            boxShadow: `0 0 24px ${c}60, 0 4px 20px rgba(0,0,0,0.4)`,
            transition: 'all 0.25s', textTransform: 'uppercase',
          }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${c}90, 0 8px 30px rgba(0,0,0,0.5)`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 24px ${c}60, 0 4px 20px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {event.year ? 'VIEW ARCHIVE' : 'REGISTER NOW'}
          </button>
          <button onClick={handleClose} style={{
            padding: '15px 28px', background: 'transparent',
            border: `1px solid ${c}50`, borderRadius: '2px',
            fontFamily: 'Orbitron', fontSize: 12, fontWeight: 600,
            letterSpacing: '2px', color: c, cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = c + '18'; e.currentTarget.style.borderColor = c; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = c + '50'; }}
          >
            ← BACK
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionBlock = ({ label, color, children }) => (
  <div style={{ marginBottom: 26 }}>
    <div style={{
      fontFamily: 'Orbitron', fontSize: 10, letterSpacing: '3px',
      color, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span style={{ width: 20, height: 1, background: color, display: 'inline-block' }} />
      {label}
      <span style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${color}40,transparent)`, display: 'inline-block' }} />
    </div>
    {children}
  </div>
);

export default EventDetail;
