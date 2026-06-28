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
const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  return (
    <div
      onClick={(e )=>{ e.stopPropagation();handleClose();}}
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
        marginTop: isMobile ? '100px'  : 'clamp(24px, 4vw, 48px)',
        background: 'linear-gradient(145deg, #18a4c0 0%, #0f7488 40%, #088ba5 100%)',
        border: `1px solid white`,
        borderRadius: '3px',
        padding: 'clamp(24px, 4vw, 48px)',
        transform: isShowing ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(30px)',
        transition: 'transform 0.42s cubic-bezier(0.34,1.4,0.64,1)',
        boxShadow: `0 0 80px ${c}35, 0 0 160px ${c}50, inset 0 1px 0 ${c}50`,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Corner brackets */}
        {[
          { top: 0,    left: 0,   borderTop:    `4px solid white`, borderLeft:   `4px solid white` },
          { top: 0,    right: 0,  borderTop:    `4px solid white`, borderRight:  `4px solid white` },
          { bottom: 0, left: 0,   borderBottom: `4px solid white`, borderLeft:   `4px solid white` },
          { bottom: 0, right: 0,  borderBottom: `4px solid white`, borderRight:  `4px solid white` },
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...s }} />
        ))}

        {/* Scan line */}
        <div style={{
          position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%',
          background: `linear-gradient(90deg, transparent, #053842, transparent)`,
          animation: 'card-scan 7s linear 1',
          pointerEvents: 'none',
        }} />

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'transparent', border: `1px solid white`,
            color: 'white', width: 38, height: 38, borderRadius: '4px', cursor: 'pointer',
            fontFamily: 'Orbitron', fontSize: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = c + '20'; e.currentTarget.style.boxShadow = `0 0 16px ${c}50`; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
          aria-label="Close"
        >✕</button>

        {/* Phase badge */}
       <div style={{
  position: 'relative',
  top: isMobile ? 16 : 'auto',
  left: isMobile ? 16 : 'auto',

  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  background: c + '12',
  border: `1px solid white`,
  borderRadius: '2px',
  padding: '4px 14px',
  marginBottom: isMobile ? 24 : 20,

  fontFamily: 'Arial Black',
  fontSize: 11,
  letterSpacing: '2px',
  color: 'white',
  textTransform: 'uppercase',
  zIndex: 2
}}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: c, boxShadow: `0 0 10px ${c}`,
            display: 'inline-block',
            animation: 'phase-pulse 1.5s ease-in-out infinite',
          }} />
          {phaseLabels[event.phase] || event.phase}
          {event.year && <span style={{ opacity: 1, marginLeft: 8 }}>· {event.year}</span>}
        </div>

        {/* Header */}
       <div style={{
  display: 'flex',
  flexDirection: isMobile ? 'column' : 'row',
  alignItems: isMobile ? 'center' : 'flex-start',
  textAlign: isMobile ? 'center' : 'left',
  gap: isMobile ? 14 : 20,
  marginBottom: 28
}}>
         <div style={{
  fontSize: 'clamp(40px,7vw,60px)',
  lineHeight: 1,
  filter: `drop-shadow(0 0 16px ${c})`,
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  width: isMobile ? '100%' : 'auto'
}}>
  <img
    src={event.image}
    alt="Event image"
    style={{
      width: isMobile ? '120px' : '4em',
      height: isMobile ? '120px' : '4em',
      objectFit: 'cover'
    }}
  />
</div>
          <div>
            <div style={{ fontFamily: 'Arial Black', fontSize: 15, letterSpacing: '3px', color: '#F59E0B', marginBottom: 6, opacity: 1, textTransform:'uppercase' }}>
              { event.category} · {event.type} EVENT
            </div>
            <h2 style={{
              fontFamily: 'Arial Black', fontSize: '36px',
              fontWeight: 500, color: 'white', letterSpacing: '2px',
              textShadow: `0 0 24px ${c}50`, lineHeight: 1.1, marginBottom: 8,
            }}>{event.name}</h2>
            <div style={{ fontFamily: 'Arial Black', fontSize: 20, color: '#F59E0B' }}>
              {event.rounds} Round{event.rounds > 1 ? 's' : ''} · Team: {event.teamSize}
            </div>
              {/* Description */}
              <div style={{marginTop:'-5px'}}>
        <SectionBlock style={{marginTop:'-5px'}}>
          <p style={{ fontSize:'15px',color:'#eaf7fa',fontFamily:'Arial Black',textAlign:'center'}}>●ABOUT THE EVENT●</p>
          <p style={{ fontFamily: 'Arial Black', fontSize: '15px', lineHeight: 1.75, color: '#F59E0B' , textAlign:'center',textShadow: '0 0 14px #0c5466'}}>
            {event.description2}
          </p>
        </SectionBlock>
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
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: stat.gold ? '#f0a500' : c, opacity: 0.4 }} />
              <div style={{ fontFamily: 'Arial Black', fontSize: 15, letterSpacing: '2px', color: '#6aacac', marginBottom: 6 }}>{stat.label}</div>
              <div style={{
                fontFamily: 'Arial Black', fontSize: 'clamp(14px,2.5vw,20px)', fontWeight: 700,
                color: stat.gold ? '#f0a500' : 'white',
                textShadow: stat.gold ? '0 0 14px #f0a50080' : `0 0 14px ${c}80`,
              }}>{stat.value}</div>
            </div>
          ))}
        </div>

       

        {/* Event structure */}
        <SectionBlock >
          <p style={{fontSize:'20px', marginTop:'-25px'}}>◆ EVENT STRUCTURE</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {event.details.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '10px 16px',
                background: 'rgba(0,245,212,0.03)',
                borderLeft: `3px solid white}`,
                borderBottom: `1px solid white `,
                borderRadius: '0 2px 2px 0',
              }}>
                <span style={{ fontFamily: 'Arial ', color: 'white', fontSize: 20, minWidth: 22, opacity: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ fontFamily: 'Arial', fontSize: '20px', color: 'white', lineHeight: 1.5 }}>
                  {d}
                </span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* Rules */}
        <SectionBlock >
            <p style={{fontSize:'20px', marginTop:'-25px'}}>◆ RULES AND REGULATIONS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 8 }}>
            {event.rules.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 12px', background: '#021414',
                border: '1px solid rgba(0,245,212,0.12)', borderRadius: '2px', marginTop:'3px'
              }}>
                <span style={{ color: '#f0a500', fontSize: 12, marginTop: '7px', flexShrink: 0 }}>◆</span>
                <span style={{ fontFamily: 'Arial', fontSize: '18px', color: 'white', marginTop: '7px', lineHeight: 1.45 , textTransform:'uppercase'}}>{r}</span>
              </div>
            ))}
          </div>
        </SectionBlock>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
  {/* If the event has a year (is archived), it returns null and renders absolutely nothing (no empty container box) */}
  {event.year ? null : (
    <button onClick={(e) => handleNavigation(e, '/register')}
    style={{
      flex: 1, minWidth: 160, padding: '15px 28px',
      background: '#F59E0B', border: 'none', borderRadius: '2px',
      fontFamily: 'Arial Black', fontSize: 25, fontWeight: 700,
      letterSpacing: '2.5px', color: 'white', cursor: 'pointer',
      boxShadow: `0 0 24px ${c}60, 0 4px 20px rgba(0,0,0,0.4)`,
      transition: 'all 0.25s', textTransform: 'uppercase',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 50px ${c}90, 0 8px 30px rgba(0,0,0,0.5)`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 24px ${c}60, 0 4px 20px rgba(0,0,0,0.4)`; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      REGISTER NOW
    </button>
  )}
          <button onClick={handleClose} style={{
            padding: '15px 28px', background:'#021414',
            border: `1px solid white`, borderRadius: '2px',
            fontFamily: 'Arial Black', fontSize: 26, fontWeight: 600,
            letterSpacing: '2px', color: 'white', cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F59E0B'; e.currentTarget.style.borderColor = c; }}
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
