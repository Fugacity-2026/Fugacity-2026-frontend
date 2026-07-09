
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EventDetail = ({ event, onClose }) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoverBack, setHoverBack] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 350);
  };

  const isShowing = visible && !closing;

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: 25 }}>
      <h3 style={{
        fontSize: isMobile ? 22 : 20,
        color: '#fff',
        paddingLeft: 10,
        borderLeft: '3px solid #4ee2ff',
        letterSpacing: 1.5,
        marginBottom: 12,
        fontFamily:'Arial Black',
     
      }}>
        {title}
      </h3>
      {children}
    </div>
  );

  return (
    <div
      onClick={(e) => { e.stopPropagation(); handleClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        backdropFilter: 'blur(2px)',
        overflowX: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? 12 : 20,
        opacity: isShowing ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }}
    >

      {/* MAIN CARD */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: isMobile ? '95vw' : 700,
          margin: '0 auto',
          borderRadius: 8,
          background: '#08181b',
          border: '1px solid rgba(255,255,255,0.08)',
          transform: isShowing ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 0.35s ease',
          maxHeight: '95vh',
          overflowY: 'auto',
          borderColor:'#4ee2ff'
        }}
      >

        {/* CLOSE */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#000',
            color: 'white',
            border: '1px solid #9edfe9',
            width: 36,
            height: 36,
            cursor: 'pointer'
          }}
        >✕</button>

        {/* IMAGE */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: 30
        }}>
          <img
            src={event.image}
            alt=""
            style={{
              width: '100%',
              maxWidth: isMobile ? 180 : 220,
              aspectRatio: '1/1',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: 10,
              border: '2px solid #4ee2ff'
            }}
          />
        </div>

        {/* CONTENT */}
        <div style={{ padding: isMobile ? 16 : 24 }}>

          <p style={{
            fontSize: isMobile ? 25 : 25,
            letterSpacing: 2,
            color: '#4ee2ff',
            marginBottom: 6,
            textAlign: 'center',
            fontFamily:'Ubuntu',
            wordBreak: 'break-word'
          }}>
            {event.category} • {event.type}
          </p>

          <h2 style={{
            fontSize: isMobile ? 25 : 30,
            color: '#fff',
            marginBottom: 10,
            textAlign: 'center',
            fontFamily:'Arial Black',
            wordBreak: 'break-word'
          }}>
            {event.name}
          </h2>

          <p style={{
            color: '#9edfe9',
            marginBottom: 20,
            textAlign: 'center',
            fontFamily:'Ubuntu',
            fontSize: isMobile ? 24 : 25,
            wordBreak: 'break-word'
          }}>
            {event.rounds} Rounds • Team: {event.teamSize}
          </p>

          {/* ABOUT */}
          <Section title="ABOUT">
            <p style={{
              color: '#cfeff5',
              lineHeight: 1.6,
              fontFamily:'Ubuntu',
              fontSize: isMobile ? 20 : 21
            }}>
              {event.description2}
            </p>
          </Section>

          {/* STATS */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3,1fr)',
            gap: 10,
            marginBottom: 25
          }}>
            {[
              { label: 'PRIZE', value: event.prize },
              { label: 'TEAM', value: event.teamSize },
              { label: 'ROUNDS', value: event.rounds }
            ].map((s) => (
              <div key={s.label} style={{
                padding: 8,
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center'
              }}>
                <p style={{ 
                  fontSize: isMobile ? 18: 20, 
                  color: '#6aacac',
                  fontFamily:'Arial Black' 
                }}>
                  {s.label}
                </p>
                <p style={{ 
                  color: '#fff', 
                  fontWeight: 'bold',
                  fontSize: isMobile ? 18 : 20 
                }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          {/* DETAILS */}
          <Section title="EVENT DETAILS">
            {event.details.map((d, i) => (
              <div key={i} style={{
                padding: 8,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                color: '#cfeff5',
                lineHeight: 1.6,
                fontFamily:'Ubuntu',
                fontSize: isMobile ? 20 : 22,
                wordBreak: 'break-word'
              }}>
                {i + 1}. {d}
              </div>
            ))}
          </Section>

          {/* RULES */}
          <Section title="RULES">
            {event.rules.map((r, i) => (
              <div key={i} style={{
                padding: 6,
                color: '#cfeff5',
                lineHeight: 1.6,
                fontFamily:'Ubuntu',
                fontSize: isMobile ? 20 : 22,
                wordBreak: 'break-word'
              }}>
                • {r}
              </div>
            ))}
          </Section>

          {/* BUTTONS */}
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            gap: 20, 
            marginTop: 20, 
           
          }}>
            {!event.year && (
              <button
                onClick={() => navigate('/register')}
                style={{
                    flex: 1,
                    width: '100%',
                    padding: isMobile ? '10px 16px' : '12px',
                    background: '#4ee2ff',
                    color: '#012024',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: isMobile ? 18 : 25,
                    transition: 'all 0.25s ease',
                    fontFamily:'Arial Black'
                }}>
                REGISTER
              </button>
            )}

            <button
              onClick={handleClose}
              onMouseEnter={() => setHoverBack(true)}
              onMouseLeave={() => setHoverBack(false)}
              style={{
                width: isMobile ? '100%' : 'auto',
                padding: isMobile ? '10px 16px' : '10px 28px',
                border: '1px solid #333',
                background: hoverBack ? '#4ee2ff' : 'transparent',
                color: hoverBack ? '#012024' : '#fff',
                cursor: 'pointer',
                fontSize: isMobile ? 18 : 25,
                transition: 'all 0.25s ease',
                fontFamily:'Arial Black'
              }}
            >
              BACK
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetail;