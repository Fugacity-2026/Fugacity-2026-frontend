import React, { useState, useRef, useEffect } from 'react';

const FLASK_W = 210;
const FLASK_H = 340;

const FLASK_PATH = `
  M 80,0
  L 130,0
  L 130,88
  L 202,280
  Q 214,315 192,330
  Q 175,342 105,342
  Q 35,342 18,330
  Q -4,315 8,280
  L 80,88
  Z
`;

const FlaskCard = ({ event, onClick, animDelay = 0, verticalOffset = 0, isTransitioning = false }) => {
  const [hovered, setHovered] = useState(false);
  const [meltP, setMeltP] = useState(0);
  const [liquidLevel, setLiquidLevel] = useState(0.52);
  const [visible, setVisible] = useState(false);
  const [shakeT, setShakeT] = useState(0);
  const cardRef = useRef(null);
  const animRef = useRef(null);
  const shakeRef = useRef(null);
  const liquidRef = useRef(null);

  useEffect(() => {
    if (isTransitioning) setHovered(false);
  }, [isTransitioning]);

  const c = event.color;
  const isOrange = c === '#f0a500' || c.toLowerCase().includes('a5') || c.toLowerCase().includes('f0');
  const textPrimary = isOrange ? '#ffffff' : '#ff9d00';
  const prizeColor  = isOrange ? '#ffffff' : '#f0a500';
  const prizeGlow   = isOrange ? 'rgba(255,255,255,0.8)' : 'rgba(240,165,0,0.8)';

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    const target = hovered ? 1 : 0;
    let cur = meltP;
    const step = () => {
      cur += (target - cur) * (hovered ? 0.04 : 0.07);
      if (Math.abs(cur - target) < 0.003) cur = target;
      setMeltP(cur);
      if (cur !== target) animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  useEffect(() => {
    cancelAnimationFrame(liquidRef.current);
    const targetLevel = hovered ? 0.75 : 0.52;
    let cur = liquidLevel;
    const step = () => {
      cur += (targetLevel - cur) * 0.035;
      if (Math.abs(cur - targetLevel) < 0.002) cur = targetLevel;
      setLiquidLevel(cur);
      if (cur !== targetLevel) liquidRef.current = requestAnimationFrame(step);
    };
    liquidRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(liquidRef.current);
  }, [hovered]);

  useEffect(() => {
    clearInterval(shakeRef.current);
    if (!hovered) { setShakeT(0); return; }
    let t = 0;
    shakeRef.current = setInterval(() => { t++; setShakeT(t); }, 60);
    return () => clearInterval(shakeRef.current);
  }, [hovered]);

  const uid = `f${event.id}`;
  const liquidTop = FLASK_H - liquidLevel * 252;
  const shakeAngle = hovered ? Math.sin(shakeT * 0.85) * 5.5 : 0;
  const shakeY     = hovered ? Math.abs(Math.sin(shakeT * 0.85)) * -5 : 0;

  const drips = meltP > 0.05
    ? [22, 48, 74, 100, 125, 150, 175, 200].map((x, i) => ({
        x,
        len: meltP * (16 + Math.sin(i * 2.1) * 9),
      }))
    : [];

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(event)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={e => e.key === 'Enter' && onClick(event)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.name}`}
      style={{
        position: 'relative',
        width: FLASK_W,
        height: FLASK_H + 70,
        cursor: 'pointer',
        flexShrink: 0,
        marginTop: verticalOffset,
        opacity: visible ? 1 : 0,
        transform: visible
          ? `rotate(${shakeAngle}deg) translateY(${shakeY}px)`
          : `translateY(60px) scale(0.82)`,
        transition: visible
          ? `opacity 0.7s ease ${animDelay}s`
          : `opacity 0.7s ease ${animDelay}s, transform 0.8s cubic-bezier(0.34,1.2,0.64,1) ${animDelay}s`,
        transformOrigin: 'bottom center',
        outline: 'none',
        filter: hovered
          ? `drop-shadow(0 0 28px ${c}99) drop-shadow(0 12px 28px rgba(0,0,0,0.55))`
          : `drop-shadow(0 0 10px ${c}40) drop-shadow(0 4px 14px rgba(0,0,0,0.35))`,
        willChange: 'transform',
      }}
    >
      <svg
        width={FLASK_W}
        height={FLASK_H + 70}
        viewBox={`0 0 ${FLASK_W} ${FLASK_H + 70}`}
        style={{ overflow: 'visible', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`${uid}-clip`}><path d={FLASK_PATH} /></clipPath>
          <filter id={`${uid}-glow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={`${uid}-textglow`} x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#021818" />
            <stop offset="100%" stopColor="#042222" />
          </linearGradient>
          <linearGradient id={`${uid}-liq`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c} stopOpacity="0.82" />
            <stop offset="100%" stopColor={c} stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id={`${uid}-melt`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={c} stopOpacity={meltP * 0.5} />
            <stop offset="70%"  stopColor={c} stopOpacity={meltP * 0.12} />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}-cglow`} cx="50%" cy="65%" r="45%">
            <stop offset="0%"   stopColor={c} stopOpacity={hovered ? 0.18 : 0.06} />
            <stop offset="100%" stopColor={c} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-shine`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        <g clipPath={`url(#${uid}-clip)`}>
          <path d={FLASK_PATH} fill={`url(#${uid}-bg)`} />
          <path d={FLASK_PATH} fill={`url(#${uid}-cglow)`} />
          <rect x="0" y={liquidTop} width={FLASK_W} height={FLASK_H - liquidTop + 8}
            fill={`url(#${uid}-liq)`} />
          <path
            d={`M0,${liquidTop} Q52,${liquidTop - 7} 105,${liquidTop} Q158,${liquidTop + 7} 210,${liquidTop} L210,${liquidTop + 10} Q158,${liquidTop + 3} 105,${liquidTop + 10} Q52,${liquidTop + 17} 0,${liquidTop + 10}Z`}
            fill={c} opacity="0.42"
          />
          {hovered && [38, 82, 130, 172].map((bx, i) => (
            <circle key={i} cx={bx} cy={liquidTop + 20 + i * 12}
              r={2.5 + i * 1.2} fill="none" stroke={c} strokeWidth="1" opacity="0.65"
              style={{ animation: `bubble-rise ${0.7 + i * 0.25}s ease-out ${i * 0.18}s infinite` }}
            />
          ))}
          {meltP > 0 && (
            <rect x="0" y="0" width={FLASK_W} height={FLASK_H}
              fill={`url(#${uid}-melt)`} />
          )}
          <rect x="-100%" y="0" width="60%" height={FLASK_H}
            fill={`url(#${uid}-shine)`}
            style={{ animation: 'shimmer 5s linear infinite' }}
          />
          <ellipse cx="68" cy="135" rx="14" ry="38"
            fill="rgba(255,255,255,0.06)" transform="rotate(-18,68,135)" />
        </g>

        <path d={FLASK_PATH} fill="none"
          stroke={hovered ? c : c + '65'}
          strokeWidth={hovered ? 2.8 : 1.8}
          strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
        />
        <line x1="76" y1="0" x2="134" y2="0"
          stroke={hovered ? c : c + '70'} strokeWidth="3.5" strokeLinecap="round" />
        {[28, 52, 74].map((y, i) => (
          <line key={i} x1={82} y1={y} x2={100} y2={y}
            stroke={c + '45'} strokeWidth="0.9" />
        ))}
        <circle cx={FLASK_W - 14} cy={14} r={4} fill={c} opacity="0.9"
          style={{ animation: 'phase-pulse 1.8s ease-in-out infinite' }} />

        {!isTransitioning && drips.map((d, i) => (
          <g key={i}>
            <line x1={d.x} y1={FLASK_H - 2} x2={d.x} y2={FLASK_H - 2 + d.len}
              stroke={c} strokeWidth="2.5" opacity={0.65 * meltP} strokeLinecap="round" />
            <ellipse cx={d.x} cy={FLASK_H - 2 + d.len + 3}
              rx={3.5} ry={4 + d.len * 0.25}
              fill={c} opacity={0.7 * meltP} />
          </g>
        ))}

        {hovered && (
          <path d={FLASK_PATH} fill="none" stroke={c} strokeWidth="1.2"
            opacity="0.18" transform="scale(1.05) translate(-5,-8.5)" />
        )}

        <text x="105" y="169" textAnchor="middle" fontSize="50"
          style={{ filter: `drop-shadow(0 0 12px ${c})` }}>
          {event.icon}
        </text>
        <text x="105" y="218" textAnchor="middle"
          fontFamily="Arial Black"
          fontSize={event.name.length > 13 ? "11" : event.name.length > 9 ? "13" : "15"}
          fontWeight="800" letterSpacing="1.5"
          fill={textPrimary}
          filter={hovered ? `url(#${uid}-textglow)` : undefined}
          style={{ transition: 'opacity 0.3s' }}>
          {event.name}
        </text>
        <rect x="38" y="224" width="136" height="18" rx="2"
          fill={c + '20'} stroke="white" strokeWidth="0.9" />
        <text x="105" y="236" textAnchor="middle"
          fontFamily="Share Tech Mono, monospace"
          fontSize="14" letterSpacing="1.8" fill="white" opacity="0.95">
          {event.category.toUpperCase()}
        </text>
        <text x="105" y="262" textAnchor="middle"
          fontFamily="Arial Black" fontSize="18" fontWeight="700"
          fill={prizeColor}
          style={{ filter: `drop-shadow(0 0 8px ${prizeGlow})` }}>
          {event.prize}
        </text>
        <line x1="55" y1="270" x2="155" y2="270" stroke={c + '30'} strokeWidth="0.8" />
        <text x="85" y="285" textAnchor="middle"
          fontFamily="Arial Black" fontSize="11.5"
          fill={textPrimary} opacity="0.75" letterSpacing="0.6">
          TEAM {event.teamSize}
        </text>
        <line x1="108" y1="277" x2="108" y2="289" stroke={c + '35'} strokeWidth="0.9" />
        <text x="142" y="285" textAnchor="middle"
          fontFamily="Arial Black" fontSize="11.5"
          fill={textPrimary} opacity="0.75" letterSpacing="0.6">
          |{event.rounds} RND
        </text>
        <text x="105" y="304" textAnchor="middle"
          fontFamily="Times New Roman" fontSize="11.5"
          fill="white" opacity="0.7" letterSpacing="1.5">
          {event.type.toUpperCase()} EVENT
        </text>
        <text x="105" y="328" textAnchor="middle"
          fontFamily="Arial Black" fontSize="9.5" fontWeight="700"
          letterSpacing="2" fill="white"
          opacity={hovered ? 1 : 0.35}
          style={{ transition: 'opacity 0.25s' }}>
          EXPLORE →
        </text>
        <text x="105" y="58" textAnchor="middle"
          fontFamily="Share Tech Mono, monospace" fontSize="9"
          letterSpacing="1" fill={c + 'bb'}>
          {event.type === 'Team' ? '⬡' : '○'}
        </text>
      </svg>
    </div>
  );
};

export default FlaskCard;
