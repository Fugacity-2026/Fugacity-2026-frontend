import React, { useState, useEffect, useRef, useCallback } from 'react';
import MoleculeBackground from './MoleculeBackground';
import FlaskCard from './FlaskCard';
import PrevEventCard from './PrevEventCard';
import EventDetail from './EventDetail';
import PhaseTransition from './PhaseTransition';
import { currentEvents, previousEvents } from '../data/events';

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
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <svg width="28" height="38" viewBox="0 0 28 38" style={{ filter: 'drop-shadow(0 0 7px rgba(0,245,212,0.55))' }}>
            <path d="M10,0 L18,0 L18,11 L26,30 Q29,36 22,37 L6,37 Q-1,36 2,30 L10,11 Z"
              fill="none" stroke="#26c6da" strokeWidth="1.4" strokeLinejoin="round" />
            <rect x="11" y="13" width="6" height="16" rx="1" fill="rgba(0,245,212,0.12)" />
            <circle cx="14" cy="28" r="2" fill="#26c6da" opacity="0.7"
              style={{ animation: 'phase-pulse 2s ease-in-out infinite' }} />
          </svg>
          <div>
            <div style={{ fontFamily: 'Arial Black', fontSize: 17, fontWeight: 900, color: '#e8f4f4', letterSpacing: '3px', lineHeight: 1 }}>FUGACITY</div>
            <div style={{ fontFamily: 'Arial Black', fontSize: 10, fontWeight: 600, color: '#26c6da', letterSpacing: '2px', textShadow: '0 0 10px rgba(0,245,212,0.9)' }}>'26</div>
          </div>
        </a>

        <div style={{ display: 'flex', gap: 8 }}>
          {[{ n: '10+', l: 'Events', g: false }, { n: '30+', l: 'Colleges', g: false }, { n: '₹30K+', l: 'Prizes', g: true }].map(s => (
            <div key={s.l} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '3px 10px', border: '1px solid rgba(0,245,212,0.18)',
              borderRadius: '2px', background: 'rgba(0,245,212,0.03)', gap: 1,
            }}>
              <span style={{ fontFamily: 'Orbitron', fontSize: 12, fontWeight: 700, color: s.g ? '#f0a500' : '#26c6da', textShadow: s.g ? '0 0 7px rgba(240,165,0,0.7)' : '0 0 7px rgba(0,245,212,0.7)' }}>{s.n}</span>
              <span style={{ fontFamily: 'Share Tech Mono', fontSize: 7, letterSpacing: '1px', color: '#6aacac', textTransform: 'uppercase' }}>{s.l}</span>
            </div>
          ))}
        </div>
      </div>
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
        display: 'flex', alignItems: 'center', gap: 14,
        marginBottom: 20, maxWidth: 700, margin: '0 auto 20px',
      }}>
        <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${accent}55)` }} />
        <div style={{
          padding: '5px 18px', border: `1px solid ${accent}38`,
          borderRadius: '2px', background: accent + '07',
          fontFamily: 'Times New Roman', fontSize: 15, letterSpacing: '3px',
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
  for (let i = 0; i < events.length; i += 5) groups.push(events.slice(i, i + 5));

  return (
    <section id="events" style={{ position: 'relative', zIndex: 1, padding: '50px 20px 40px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <SectionHeader
          tag="⬡ THE ANNUAL CHEMICAL ENGINEERING FESTIVAL ⬡"
          title="EVENTS 2026"
          accent="#00f5d4"
        />

        <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {groups.map((group, gi) => {
            const offsets = group.length === 5 ? WAVE_OFFSETS_5 : WAVE_OFFSETS_3;
            const maxOff  = Math.max(...offsets.filter(o => o > 0));
            const minOff  = Math.min(...offsets.filter(o => o < 0), 0);

            return (
              <React.Fragment key={gi}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, paddingLeft: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#00f5d4', boxShadow: '0 0 7px #00f5d4', animation: 'phase-pulse 2s ease-in-out infinite' }} />
                  <span style={{ fontFamily: 'Times New Roman', fontSize: 14, letterSpacing: '3px', color: '#00f5d499', textTransform: 'uppercase' }}>
                    Platform for innovation, competition &amp; collaboration
                  </span>
                  <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(0,245,212,0.2),transparent)' }} />
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: 18,
                  paddingTop: Math.abs(minOff) + 20,
                  paddingBottom: maxOff + 60,
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                }}>
                  {group.map((event, i) => (
                    <FlaskCard
                      key={event.id}
                      event={event}
                      onClick={onCardClick}
                      animDelay={gi * 0.12 + i * 0.08}
                      verticalOffset={offsets[i] || 0}
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

  return (
    <section style={{ position: 'relative', zIndex: 1, padding: '50px 20px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionHeader
          tag="❄ ARCHIVE ❄"
          title="PAST YEARS"
          accent="#4a8aaa"
        />

        <div ref={ref} style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          {rows.map((row, ri) => (
            <React.Fragment key={ri}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingLeft: 4 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4a8aaa', boxShadow: '0 0 7px #4a8aaa', animation: 'phase-pulse 2s ease-in-out infinite' }} />
                <span style={{ fontFamily: 'Share Tech Mono', fontSize: 8, letterSpacing: '3px', color: '#4a8aaa99', textTransform: 'uppercase' }}>
                  ROW {String(ri + 1).padStart(2, '0')} / {String(rows.length).padStart(2, '0')}
                </span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg,rgba(74,138,170,0.2),transparent)' }} />
              </div>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 20,
                justifyContent: 'center',
                marginBottom: 8,
              }}>
                {row.map((event, i) => (
                  <PrevEventCard
                    key={event.id}
                    event={event}
                    onClick={onCardClick}
                    animDelay={ri * 0.1 + i * 0.07}
                  />
                ))}
              </div>

              {ri < rows.length - 1 && <FreezeDivider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── FOOTER ── */
const Footer = () => (
  <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(0,245,212,0.1)', padding: '36px', marginTop: 32 }}>
    <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
      <div>
        <div style={{ fontFamily: 'Arial Black', fontSize: 15, fontWeight: 900, color: '#e8f4f4', letterSpacing: '3px' }}>FUGACITY
          <div style={{ fontFamily: 'Arial Black', fontSize: 15, fontWeight: 900, color: '#26c6da', letterSpacing: '3px' }}>'26</div>
        </div>
        <div style={{ fontFamily: 'Times New Roman', fontSize: 12, color: '#6aacac', letterSpacing: '2px' }}>Chemical Engineering Association</div>
      </div>
      <div style={{ fontFamily: 'Share Tech Mono', fontSize: 11, color: 'rgba(0,245,212,0.3)', letterSpacing: '1px' }}>
        f = P · φ · exp(V(P−P°)/RT)
      </div>
      <div style={{ fontFamily: 'Times New Roman', fontSize: 15, color: '#6aacac', letterSpacing: '1px' }}>
        © 2026 Fugacity. Department of Chemical Engineering.
      </div>
    </div>
  </footer>
);

/* ─────────────────────────────────────────────────────────────
   PAGE ROOT
   FIX SUMMARY
   ───────────────────────────────────────────────────────────
   1. `transitionInProgress` ref — prevents a second click from
      starting a new transition while one is already running.
   2. `handleTransitionDone` wrapped in `useCallback` with stable
      deps so its identity never changes between renders.
   3. `PhaseTransition` is keyed with a unique `transitionKey` so
      React always mounts a *fresh* instance per transition —
      no stale state from a previous run bleeds through.
   4. `React.StrictMode` removed from main.jsx (double-invoke in
      dev mode was the primary cause of the double-fire).
───────────────────────────────────────────────────────────── */
const EventsPage = () => {
  const [pendingEvent,    setPendingEvent]    = useState(null);
  const [transitionPhase, setTransitionPhase] = useState(null);
  const [transitionKey,   setTransitionKey]   = useState(0);   // ← increments each click
  const [activeEvent,     setActiveEvent]     = useState(null);

  // Ref-based lock: true while a transition is in flight
  const transitionInProgress = useRef(false);

  // ── handleEventClick ──────────────────────────────────────
  // Guarded so rapid double-clicks are ignored
  const handleEventClick = useCallback((event) => {
    if (transitionInProgress.current) return;   // ← LOCK
    transitionInProgress.current = true;

    const phase = event.year ? 'plasma' : 'melt';
    setPendingEvent(event);
    setTransitionPhase(phase);
    setTransitionKey(k => k + 1);               // fresh mount each time
  }, []);

  // ── handleTransitionDone ──────────────────────────────────
  // Called exactly once by PhaseTransition when animation ends
  const handleTransitionDone = useCallback(() => {
    // Capture pending synchronously before clearing state
    setPendingEvent(prev => {
      setActiveEvent(prev);
      return null;
    });
    setTransitionPhase(null);
    transitionInProgress.current = false;        // ← UNLOCK
  }, []);

  const handleDetailClose = useCallback(() => {
    setActiveEvent(null);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #020f0f 0%, #031a1a 30%, #042020 60%, #031414 100%)',
      width: '100%',
    }}>
      <MoleculeBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header />

        {/* Spacer for fixed header */}
        <div style={{ height: 70 }} />

        <CurrentEventsSection
          events={currentEvents}
          onCardClick={handleEventClick}
        />

        <PhaseChangeSeparator />

        <PreviousEventsSection
          events={previousEvents}
          onCardClick={handleEventClick}
        />

        <Footer />
      </div>

      {/* Phase transition overlay — keyed so it always mounts fresh */}
      {transitionPhase && (
        <PhaseTransition
          key={transitionKey}
          phase={transitionPhase}
          onDone={handleTransitionDone}
        />
      )}

      {/* Event detail modal */}
      {activeEvent && (
        <EventDetail
          event={activeEvent}
          onClose={handleDetailClose}
        />
      )}
    </div>
  );
};

export default EventsPage;
