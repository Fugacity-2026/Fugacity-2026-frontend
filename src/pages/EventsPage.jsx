import React, { useState, useEffect, useRef, useCallback } from 'react';
// import MoleculeBackground from '../components/MoleculeBackground';
import NetworkCanvas from '../components/NetworkCanvas.jsx';


import FlaskCard from '../components/FlaskCard';
import PrevEventCard from '../components/PrevEventCard';
import EventDetail from '../components/EventDetail';
import PhaseTransition from '../components/PhaseTransition';
import { currentEvents, previousEvents } from '../data/events';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Adjust the path if necessary

/* ── HEADER ─────────────────────────────────── */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: scrolled ? '7px 32px' : '13px 32px',
      transition: 'all 0.3s ease',
      borderBottom: scrolled ? '1px solid rgba(0,245,212,0.16)' : '1px solid transparent',
      background: scrolled ? 'rgba(2,12,14,0.96)' : 'transparent',
    }}>
    </header>
  );
};

/* ── SECTION HEADER ─────────────────────────── */
const SectionHeader = ({ tag, title, accent }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      textAlign: 'center', marginBottom: 60,
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(28px)',
      transition: 'opacity 0.65s ease, transform 0.65s ease',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        marginBottom: 40, maxWidth: 700, margin: '0 auto 20px',
      }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${accent}55)` }} />
        <div style={{
          padding: '5px 18px', border: `1px solid white`,
          borderRadius: '2px', background: accent + '07',
          fontFamily: 'Times New Roman', fontSize: 19, letterSpacing: '3px',
          color: accent, opacity: 0.85,
        }}>{tag}</div>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${accent}55,transparent)` }} />
      </div>

      <h2 style={{
        fontFamily: 'Arial Black',
        fontSize: 'clamp(38px, 7vw, 72px)',
        fontWeight: 900, color: '#e8f4f4',
        letterSpacing: '6px',
        textShadow: `0 0 40px ${accent}30, 0 0 80px ${accent}12`,
        marginBottom: 12,
        lineHeight: 1,
      }}>{title}</h2>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {['●', '◆', '●'].map((s, i) => (
          <span key={i} style={{ fontFamily: 'Share Tech Mono', fontSize: 12, color: accent, opacity: 0.3 + i * 0.2 }}>{s}</span>
        ))}
      </div>
    </div>
  );
};

/* ── MELT DIVIDER ─────────────────────────────── */
const MeltDivider = () => (
  <div style={{ position: 'relative', width: '100%', height: 52, overflow: 'hidden', pointerEvents: 'none', margin: '8px 0' }}>
    {Array.from({ length: 22 }, (_, i) => {
      const x = (i / 21) * 100;
      const h = 12 + Math.sin(i * 1.6) * 9 + Math.cos(i * 0.9) * 5;
      return (
        <div key={i} style={{
          position: 'absolute', left: `${x}%`,
          top: 0, width: '5.5%', height: h,
          background: `linear-gradient(180deg,rgba(0,245,212,0.18) 0%,rgba(0,245,212,0.04) 70%,transparent 100%)`,
          borderRadius: '0 0 50% 50%',
          animation: `melt-drip ${1 + Math.abs(Math.sin(i)) * 0.5}s ease-in-out ${i * 0.04}s infinite alternate`,
        }} />
      );
    })}
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg,transparent,rgba(0,245,212,0.35),transparent)' }} />
  </div>
);

/* ── FREEZE DIVIDER ───────────────────────────── */
const FreezeDivider = () => (
  <div style={{ position: 'relative', width: '100%', height: 44, overflow: 'hidden', pointerEvents: 'none', margin: '8px 0' }}>
    <svg width="100%" height="44" viewBox="0 0 1200 44" preserveAspectRatio="none">
      {Array.from({ length: 24 }, (_, i) => {
        const x = (i / 23) * 1200;
        const h = 10 + Math.sin(i * 1.4) * 8;
        return (
          <polygon key={i}
            points={`${x},0 ${x + 25},0 ${x + 12},${h}`}
            fill="rgba(100,180,220,0.12)" stroke="rgba(100,180,220,0.25)" strokeWidth="0.5"
          />
        );
      })}
      <line x1="0" y1="1" x2="1200" y2="1" stroke="rgba(100,180,220,0.3)" strokeWidth="0.8" strokeDasharray="7 4" />
    </svg>
  </div>
);

/* ── PHASE CHANGE SEPARATOR ──────────────────── */
const PhaseChangeSeparator = () => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      position: 'relative', zIndex: 1, padding: '32px 24px',
      opacity: vis ? 1 : 0,
      transform: vis ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.7s ease, transform 0.7s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          border: '1px solid rgba(229, 243, 241, 0.73)',
          borderRadius: '2px', padding: '28px 36px',
          background: 'linear-gradient(135deg,rgba(0,245,212,0.025) 0%,rgba(100,180,220,0.025) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap',
        }}>
          <div style={{ textAlign: 'center', minWidth: 140 }}>
            <div style={{ fontFamily: 'Times New Roman', fontSize: 12, letterSpacing: '3px', color: 'white', marginBottom: 6, opacity: 0.65 }}>LIQUID</div>
            <div style={{ fontFamily: 'Arial Black', fontSize: 26, fontWeight: 900, color: 'white', letterSpacing: '3px', textShadow: '0 0 18px rgba(0,245,212,0.55)' }}>EVENTS 26</div>
            <div style={{ fontFamily: 'Times New Roman', fontSize: 19, color: '#26c6da', letterSpacing: '2px', marginTop: 3 }}>FUGACITY '26</div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 14, minWidth: 180 }}>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg,#00f5d4,rgba(100,180,220,0.4))' }} />
            <div style={{
              padding: '6px 14px', border: '1px solid rgba(214, 241, 253, 0.28)',
              borderRadius: '2px', background: 'rgba(0,245,212,0.05)',
              fontFamily: 'Share Tech Mono', fontSize: 12, letterSpacing: '2px',
              color: 'white', whiteSpace: 'nowrap',
            }}>ΔT → SOLIDIFICATION</div>
            <div style={{ flex: 1, height: 2, background: 'linear-gradient(90deg,rgba(100,180,220,0.4),#4a8aaa)' }} />
          </div>

          <div style={{ textAlign: 'center', minWidth: 140 }}>
            <div style={{ fontFamily: 'Times New Roman', fontSize: 12, letterSpacing: '3px', color: 'white', marginBottom: 6, opacity: 0.65 }}>FROZEN</div>
            <div style={{ fontFamily: 'Arial Black', fontSize: 26, fontWeight: 900, color: 'white', letterSpacing: '3px', textShadow: '0 0 18px rgba(74,138,170,0.45)' }}>PAST YEARS</div>
            <div style={{ fontFamily: 'Times New Roman', fontSize: 19, color: '#26c6da', letterSpacing: '2px', marginTop: 3 }}>ARCHIVE</div>
          </div>

          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.1 }} preserveAspectRatio="none">
            {Array.from({ length: 10 }, (_, i) => (
              <line key={i} x1={`${8 + i * 10}%`} y1="0" x2={`${4 + i * 10}%`} y2="100%"
                stroke="rgba(0,245,212,0.6)" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

/* ── WAVE OFFSETS ── */
const WAVE_OFFSETS_5 = [40, -10, 60, -10, 40];
const WAVE_OFFSETS_3 = [30, -10, 30];

const CurrentEventsSection = ({ events, onCardClick }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const groups = [];
  for (let i = 0; i < events.length; i += 6) groups.push(events.slice(i, i + 6));
const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

React.useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  return (
    <section id="events" style={{ position: 'relative', zIndex: 1, padding: '50px 20px 40px'}}>
      <div style={{ maxWidth: 1320, margin:'0 auto' }}>
        <SectionHeader
          tag="⬡ THE ANNUAL CHEMICAL ENGINEERING FESTIVAL ⬡"
          title="EVENTS 2026"
          accent="#4ee2ff"
        />

        <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' ,marginTop:'-10px'}}>
          {groups.map((group, gi) => {
            const offsets = [180, 80, 140, 80, 180]; 
            const maxOff  = Math.max(...offsets.filter(o => o > 0));
            const minOff  = Math.min(...offsets.filter(o => o < 0), 0);

          return (
  <React.Fragment key={gi}>
    <div
  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: isMobile ? 'center' : 'flex-start', // ✅ key
    gap: 10,
    marginBottom: 2,
    paddingLeft: isMobile ? 0 : 4, // ✅ remove left padding on mobile
    textAlign: isMobile ? 'center' : 'left', // ✅ center text
    flexDirection: isMobile ? 'column' : 'row', // ✅ stack on mobile
  }}
>
  {/* Dot */}
  <div
    style={{
      width: 5,
      height: 5,
      borderRadius: '50%',
      background: '#00f5d4',
      boxShadow: '0 0 7px #00f5d4',
      animation: 'phase-pulse 2s ease-in-out infinite',
    }}
  />

  {/* Text */}
  <span
    style={{
      fontFamily: 'Times New Roman',
      fontSize: 18,
      letterSpacing: '3px',
      color: 'white',
      textTransform: 'uppercase',
    }}
  >
    Platform for innovation, competition & collaboration
  </span>

  {/* Line (hide or shrink on mobile) */}
  <div
    style={{
      flex: isMobile ? 'none' : 1,
      width: isMobile ? '60%' : 'auto', // ✅ centered short line on mobile
      height: 1,
      background: 'linear-gradient(90deg,rgba(0,245,212,0.2),transparent)',
    }}
  />
</div>

   <div style={{
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', // ✅ key line
  gap: 40,
  justifyItems: isMobile ? 'start' : 'center',
  alignItems: 'start',
  paddingTop: Math.abs(minOff) + 20,
  paddingBottom: maxOff + 60,
  paddingRight: isMobile ? '10px' : '0px',  
  paddingLeft: isMobile ? '10px' : '0px',  // 👈 shift slightly left

  width: '100%',
  maxWidth: '1100px',
  margin: '0 auto',
}}>
      {group.map((event, i) => (
        <FlaskCard
          key={event.id}
          event={event}
          onClick={onCardClick}
          animDelay={gi * 0.12 + i * 0.08}
        />
      ))}
    </div>

    {gi < groups.length - 1 && <MeltDivider />}
  </React.Fragment>
);

          })}
        </div>
      </div>
    </section>
  );
};

/* ── PREVIOUS EVENTS ── */
const PreviousEventsSection = ({ events, onCardClick }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.04 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const rows = [];
  for (let i = 0; i < events.length; i += 4) rows.push(events.slice(i, i + 4));
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

React.useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth < 768);

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '50px 20px 40px',marginTop:'-100px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          tag="❄ ARCHIVE ❄"
          title="PAST YEARS"
          accent="#4ee2ff"
        />

        <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          

<div style={{
  display: 'grid',
  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
  gap: '1.75rem',
  maxWidth: 1100,
  margin: '0 auto',
}}>
  {events.map((event, i) => (
    <PrevEventCard key={event.id ?? event.name} event={event} onClick={onCardClick} animDelay={i * 0.07} />
  ))}
</div>

        </div>
      </div>
    </section>
  );
};



// export default EventsPage;
const EventsPage = () => {
  const [pendingEvent, setPendingEvent] = useState(null);
  const [transitionPhase, setTransitionPhase] = useState(null);
  const [transitionKey, setTransitionKey] = useState(0);
  const [activeEvent, setActiveEvent] = useState(null);
  
  // Thermometer & Scroll State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTemp, setCurrentTemp] = useState(-25);
  const [isDragging, setIsDragging] = useState(false);
  const thermometerTrackRef = useRef(null);
  const transitionInProgress = useRef(false);

  // 1. Logic to sync temperature and scroll from drag
  const updateScrollFromThermometer = useCallback((clientY) => {
    if (!thermometerTrackRef.current) return;
    const rect = thermometerTrackRef.current.getBoundingClientRect();
    
    let pct = (clientY - rect.top) / rect.height;
    pct = Math.max(0, Math.min(1, pct));
    
    setScrollProgress(pct);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pct * docHeight, behavior: 'auto' });
    
    let temp = pct <= 0.5 ? -25 + (pct * 2 * 52) : 27 + ((pct - 0.5) * 2 * 73);
    setCurrentTemp(Math.round(temp));
  }, []);

  // 2. Global mouse listeners for smooth dragging
  useEffect(() => {
    const handleMouseMove = (e) => { if (isDragging) updateScrollFromThermometer(e.clientY); };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateScrollFromThermometer]);

  // 3. Scroll listener (Syncs thermometer when user scrolls normally)
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(progress);
      
      let temp = progress <= 0.5 ? -25 + (progress * 2 * 52) : 27 + ((progress - 0.5) * 2 * 73);
      setCurrentTemp(Math.round(temp));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const handleEventClick = useCallback((event) => {
    if (transitionInProgress.current) return;
    transitionInProgress.current = true;
    const phase = event.year ? 'plasma' : 'melt';
    setPendingEvent(event);
    setTransitionPhase(phase);
    setTransitionKey(k => k + 1);
  }, []);

  const handleTransitionDone = useCallback(() => {
    setPendingEvent(prev => { setActiveEvent(prev); return null; });
    setTransitionPhase(null);
    transitionInProgress.current = false;
  }, []);

  const handleDetailClose = useCallback(() => setActiveEvent(null), []);

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      
      {/* <MoleculeBackground/> */}
      <NetworkCanvas/>
     
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />
        <Navbar/>
        <div style={{ height: 70 }} />
        <CurrentEventsSection events={currentEvents} onCardClick={handleEventClick} />
        <PreviousEventsSection events={previousEvents} onCardClick={handleEventClick} />
        <Footer />
      </div>

      {transitionPhase && (
        <PhaseTransition key={transitionKey} phase={transitionPhase} onDone={handleTransitionDone} />
      )}
      {activeEvent && (
        <EventDetail event={activeEvent} onClose={handleDetailClose} />
      )}
    </div>
  );
};

export default EventsPage;