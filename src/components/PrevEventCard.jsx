
import React, { useState, useRef, useEffect } from 'react';

const PrevEventCard = ({ event, onClick, animDelay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const [imageFlipped, setImageFlipped] = useState(false);
  const cardRef = useRef(null);
  const tiltRef = useRef(null);

  // Scroll reveal
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

  // 3D tilt on card hover
  const handleMouseMove = (e) => {
    const card = tiltRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 10;
    const rotateX = -((y - rect.height / 2) / rect.height) * 10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = tiltRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  const c = '#4a8aaa';

  return (
    <div
      ref={cardRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.9)',
        transition: `opacity 0.65s ease ${animDelay}s, transform 0.65s cubic-bezier(0.34,1.2,0.64,1) ${animDelay}s`,
      }}
    >
      <style>{`
        .prev-event-card {
          transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          border: 1px solid rgba(125, 250, 255, 0.45);
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.18);
          background: rgba(22, 44, 56, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .prev-event-card:hover {
          box-shadow: 0 0 45px -8px rgba(34,211,238,0.55), 0 0 16px rgba(34,211,238,0.25);
          border-color: rgba(165, 250, 255, 0.7);
        }
        .prev-event-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          border-radius: 1rem;
        }
        .prev-event-card:hover .prev-event-spotlight { opacity: 1; }

        .prev-event-liquid-strip {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 42px;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border-radius: 0 0 1rem 1rem;
        }
        .prev-event-liquid-strip svg {
          position: absolute; inset: 0; width: 100%; height: 100%;
        }

        /* Image flip panel */
        .img-flip-container {
          width: 45%;
          flex-shrink: 0;
          perspective: 800px;
          position: relative;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .img-flip-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .img-flip-container.flipped .img-flip-inner {
          transform: rotateY(180deg);
        }
        .img-flip-front, .img-flip-back {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .img-flip-back {
          transform: rotateY(180deg);
          background: linear-gradient(145deg, rgba(10,34,51,0.5) 0%, rgba(13,58,82,0.6) 50%, rgba(10,36,54,0.7) 0%),
           url('/icon.png') no-repeat center center;
  background-size: contain; 
  
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          text-align: center;
          border: 1px solid rgba(34,211,238,0.25);
          
        }
       
      `}</style>

      <div
        ref={tiltRef}
        onClick={() => onClick(event)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onClick(event)}
        aria-label={`View archive details for ${event.name}`}
        className="prev-event-card"
        style={{
          position: 'relative',
          borderRadius: '1rem',
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          height: 220,
          outline: 'none',
        }}
      >
        {/* Spotlight glow */}
        <div className="prev-event-spotlight" />

        {/* Liquid wave strip */}
        <div className="prev-event-liquid-strip">
          <svg viewBox="0 0 520 42" preserveAspectRatio="none">
            <path fill="#4ee2ff" opacity="0.45">
              <animate attributeName="d" dur="3.4s" repeatCount="indefinite"
                values="
                  M0,5.4 C80,28.4 160,-6 260,12 C360,30 440,-2.8 520,12 L520,42 L0,42 Z;
                  M0,-4.4 C80,-7.7 160,25.1 260,2.2 C360,-9.3 440,23.5 520,-1.1 L520,42 L0,42 Z;
                  M0,15.3 C80,-4.4 160,26.8 260,3.8 C360,3.8 440,25.1 520,15.3 L520,42 L0,42 Z;
                  M0,5.4 C80,28.4 160,-6 260,12 C360,30 440,-2.8 520,12 L520,42 L0,42 Z" />
            </path>
            <path fill="none" stroke="rgba(225,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="d" dur="3.4s" repeatCount="indefinite"
                values="
                  M0,5.4 C80,28.4 160,-6 260,12 C360,30 440,-2.8 520,12;
                  M0,-4.4 C80,-7.7 160,25.1 260,2.2 C360,-9.3 440,23.5 520,-1.1;
                  M0,15.3 C80,-4.4 160,26.8 260,3.8 C360,3.8 440,25.1 520,15.3;
                  M0,5.4 C80,28.4 160,-6 260,12 C360,30 440,-2.8 520,12" />
            </path>
          </svg>
        </div>

        {/* Corner accents */}
        {[
          { top: 0,    left: 0,   borderTop:    `2px solid ${c}`, borderLeft:   `2px solid ${c}`, borderRadius: '12px 0 0 0' },
          { top: 0,    right: 0,  borderTop:    `2px solid ${c}`, borderRight:  `2px solid ${c}`, borderRadius: '0 12px 0 0' },
          { bottom: 0, left: 0,   borderBottom: `2px solid ${c}`, borderLeft:   `2px solid ${c}`, borderRadius: '0 0 0 12px' },
          { bottom: 0, right: 0,  borderBottom: `2px solid ${c}`, borderRight:  `2px solid ${c}`, borderRadius: '0 0 12px 0' },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', zIndex: 10,
            width: 18, height: 18,
            opacity: 0.6,
            pointerEvents: 'none',
            ...s,
          }} />
        ))}

        {/* ── LEFT: Image panel with flip ── */}
        <div
          className={`img-flip-container${imageFlipped ? ' flipped' : ''}`}
          onMouseEnter={e => { e.stopPropagation(); setImageFlipped(true); }}
          onMouseLeave={e => { e.stopPropagation(); setImageFlipped(false); }}
          style={{ height: '100%' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="img-flip-inner" style={{ height: '100%' }}>
            {/* Front: event image */}
            <div className="img-flip-front">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'linear-gradient(145deg, #091820 0%, #0c2030 50%, #091520 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 48,
                }}>
                  {event.icon}
                </div>
              )}
              {/* Gradient overlay on image */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to right, transparent 60%, rgba(14,32,44,0.6) 100%)',
                pointerEvents: 'none',
              }} />
            </div>
            {/* Back: text revealed on hover */}
            <div className="img-flip-back">
             
              {event.description && (
                <p style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: 20, 
                  marginTop: 8, lineHeight: 1.5,
                    background: 'linear-gradient(180deg, #FFFFFF 0%, #F59E0B 100%)',
    WebkitBackgroundClip: 'text',
    MozBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textFillColor: 'transparent',
     fontWeight: 'bold', 
                }}>
                  {event.description}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Event details ── */}
        <div style={{
          flex: 1,
          padding: '16px 18px 48px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Category + Year row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              fontFamily: 'Arial Black', fontSize: 13, letterSpacing: '2px',
              color: '#F59E0B', padding: '2px 8px',
              border: `2px solid ${c}40`, borderRadius: 3,
              background: c + '10',
            }}>
              {event.category?.toUpperCase()}
            </div>
            <div style={{
              fontFamily: 'Arial Black, sans-serif', fontSize: 15,
              letterSpacing: '1.5px', color: '#4ee2ff', opacity: 0.7,
            }}>
              {event.year}
            </div>
          </div>

          {/* Event name */}
          <div style={{
            fontFamily: 'Arial Black', fontWeight: 800,
            fontSize: event.name?.length > 13 ? 18 : event.name?.length > 9 ? 20 : 15,
            color: 'white',
            letterSpacing: '1.5px', lineHeight: 1.2,
          }}>
            {event.name}
          </div>

          {/* Prize */}
          <div style={{
            fontFamily: 'Arial Black, sans-serif', fontSize: 19, fontWeight: 700,
            color: '#4ee2ff',
          }}>
            {event.prize}
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 14, marginTop: 'auto' }}>
            {[
              { label: 'TEAM',   value: event.teamSize },
              { label: 'ROUNDS', value: event.rounds   },
              { label: 'TYPE',   value: event.type     },
            ].map((item, i) => (
              <React.Fragment key={item.label}>
                {i > 0 && <div style={{ width: 1, background: c + '25', alignSelf: 'stretch' }} />}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <span style={{
                    fontFamily: 'Arial Black, sans-serif', fontSize: 11,
                    letterSpacing: '1.5px', color: 'white',
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: 'sans-serif', fontSize: 18,
                    fontWeight: 700, color: '#F59E0B',
                  }}>{item.value}</span>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%',
                background: c, boxShadow: `0 0 6px ${c}`,
                animation: 'phase-pulse 1.8s ease-in-out infinite',
              }} />
              <span style={{
                fontFamily: 'Arial Black', fontSize: 18,
                letterSpacing: '1px', color: '#F59E0B',
              }}>
                ChEA
              </span>
            </div>
            <span style={{
              fontFamily: 'Arial Black, sans-serif', fontSize: 18, fontWeight: 900,
              letterSpacing: '1.5px', color: '#F59E0B',
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