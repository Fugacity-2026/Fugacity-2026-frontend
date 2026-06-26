
import React, { useState, useRef, useEffect } from 'react';

const SCALE = 1.0;
const FLASK_W = 270 * SCALE;
const FLASK_H = 360 * SCALE;

const FLASK_PATH = `
  M 106,0
  L 196,0
  L 196,60
  L 284,255
  Q 298,295 264,312
  Q 236,325 151,325
  Q 66,325 38,312
  Q 4,295 18,255
  L 106,60
  Z
`;

const CX = 151;
const DRIP_XS = [40, 65, 90, 115, 140, 165, 190, 215, 240, 262];

const FlaskCard = ({ event, onClick, animDelay = 0, isTransitioning = false }) => {
  const [hovered, setHovered] = useState(false);
  const [meltP, setMeltP] = useState(0);
  const [liquidLevel, setLiquidLevel] = useState(0.52);
  const [visible, setVisible] = useState(false);
  const [shakeT, setShakeT] = useState(0);
  const cardRef = useRef(null);
  const animRef = useRef(null);
  const shakeRef = useRef(null);
  const liquidRef = useRef(null);
  const shakeTimeoutRef = useRef(null);

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
    const targetLevel = hovered ? 0.72 : 0.50;
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

  // Shake for 700ms then stop; on mouse leave reset
  useEffect(() => {
    clearTimeout(shakeTimeoutRef.current);

    if (!hovered) {
      setShakeT(0);
      clearInterval(shakeRef.current);
      shakeRef.current = null;
      return;
    }

    let t = 0;
    shakeRef.current = setInterval(() => { t++; setShakeT(t); }, 60);

    shakeTimeoutRef.current = setTimeout(() => {
      clearInterval(shakeRef.current);
      shakeRef.current = null;
      setShakeT(0);
    }, 700);

    return () => {
      clearInterval(shakeRef.current);
      clearTimeout(shakeTimeoutRef.current);
    };
  }, [hovered]);

  const uid = `f${event.id}`;

  const BOWL_TOP = 60;
  const BOWL_BOT = 325;
  const BOWL_H = BOWL_BOT - BOWL_TOP;

  const liquidTop = BOWL_BOT - liquidLevel * BOWL_H;

  const iconY = BOWL_TOP + BOWL_H * 0.28;
  const textStartY = BOWL_TOP + BOWL_H * 0.56;

  const shakeAngle = shakeT > 0 ? Math.sin(shakeT * 0.85) * 5.5 : 0;
  const shakeY     = shakeT > 0 ? Math.abs(Math.sin(shakeT * 0.85)) * -5 : 0;

  const drips = meltP > 0.05
    ? DRIP_XS.map((x, i) => ({
        x,
        len: meltP * (16 + Math.sin(i * 2.1) * 9),
      }))
    : [];

  const svgW = FLASK_W + 20;

  const getTransform = () => {
    if (!visible) return 'translateY(60px)';
    if (shakeT > 0) return `rotate(${shakeAngle}deg) translateY(${shakeY}px)`;
    return 'none';
  };

  const getTransition = () => {
    if (!visible) return `opacity 0.7s ease ${animDelay}s, transform 0.8s cubic-bezier(0.34,1.2,0.64,1) ${animDelay}s`;
    if (shakeT > 0) return 'opacity 0.7s ease';
    return 'opacity 0.7s ease, transform 0.3s ease';
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onClick(event)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      onKeyDown={e => e.key === 'Enter' && onClick(event)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${event.name}`}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '360px',
        minWidth: '260px',
        height: '497px',
        cursor: 'pointer',
        flexShrink: 0,
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: getTransition(),
        transformOrigin: 'bottom center',
        outline: 'none',
        filter: hovered
          ? `drop-shadow(0 0 28px ${c}99) drop-shadow(0 12px 28px rgba(0,0,0,0.55))`
          : `drop-shadow(0 0 10px ${c}40) drop-shadow(0 4px 14px rgba(0,0,0,0.35))`,
        zIndex: hovered ? 10 : 1,
        willChange: 'transform',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`-4 0 ${svgW} ${FLASK_H + 40}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ overflow: 'visible', display: 'block' }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`${uid}-imgclip`}>
  <rect x={CX - 60} y={iconY - 55} width="120" height="120" rx="20" ry="20" />
</clipPath>

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

        {/* Flask body (clipped) */}
        <g clipPath={`url(#${uid}-clip)`}>
          <path d={FLASK_PATH} fill={`url(#${uid}-bg)`} />
          <path d={FLASK_PATH} fill={`url(#${uid}-cglow)`} />
          <rect x="0" y={liquidTop} width={svgW} height={BOWL_BOT - liquidTop + 8}
            fill={`url(#${uid}-liq)`} />
          <path
            d={`M0,${liquidTop} Q${CX - 83},${liquidTop - 7} ${CX},${liquidTop} Q${CX + 83},${liquidTop + 7} ${svgW},${liquidTop} L${svgW},${liquidTop + 10} Q${CX + 83},${liquidTop + 3} ${CX},${liquidTop + 10} Q${CX - 83},${liquidTop + 17} 0,${liquidTop + 10}Z`}
            fill={c} opacity="0.42"
          />
          {hovered && [54, 98, 146, 188].map((bx, i) => (
            <circle key={i} cx={bx} cy={liquidTop + 20 + i * 12}
              r={2.5 + i * 1.2} fill="none" stroke={c} strokeWidth="1" opacity="0.65"
              style={{ animation: `bubble-rise ${0.7 + i * 0.25}s ease-out ${i * 0.18}s infinite` }}
            />
          ))}
          {meltP > 0 && (
            <rect x="0" y="0" width={svgW} height={FLASK_H}
              fill={`url(#${uid}-melt)`} />
          )}
          <rect x="-100%" y="0" width="60%" height={FLASK_H}
            fill={`url(#${uid}-shine)`}
            style={{ animation: 'shimmer 5s linear infinite' }}
          />
          <ellipse cx="84" cy="155" rx="14" ry="42"
            fill="rgba(255,255,255,0.06)" transform="rotate(-18,84,155)" />
        </g>

        {/* Flask outline */}
        <path d={FLASK_PATH} fill="none"
          stroke={hovered ? c : c + '65'}
          strokeWidth={hovered ? 2.8 : 1.8}
          strokeLinejoin="round"
          style={{ transition: 'stroke 0.3s, stroke-width 0.3s' }}
        />

        {/* Neck top line */}
        <line x1="92" y1="0" x2="170" y2="0"
          stroke={hovered ? c : c + '70'} strokeWidth="3.5" strokeLinecap="round" />

        {/* Graduation marks */}
        {[28, 50, 72].map((y, i) => (
          <line key={i} x1={98} y1={y} x2={116} y2={y}
            stroke={c + '45'} strokeWidth="0.9" />
        ))}

        {/* Status dot */}
        <circle cx={FLASK_W + 10} cy={14} r={4} fill={c} opacity="0.9"
          style={{ animation: 'phase-pulse 1.8s ease-in-out infinite' }} />

        {/* Outer glow ring on hover */}
        {hovered && (
          <path d={FLASK_PATH} fill="none" stroke={c} strokeWidth="1.2"
            opacity="0.18" transform="scale(1.05) translate(-7,-9)" />
        )}

        {/* Drips */}
        {!isTransitioning && drips.map((d, i) => (
          <g key={i}>
            <line x1={d.x} y1={BOWL_BOT - 2} x2={d.x} y2={BOWL_BOT - 2 + d.len}
              stroke={c} strokeWidth="2.5" opacity={0.65 * meltP} strokeLinecap="round" />
            <ellipse cx={d.x} cy={BOWL_BOT - 2 + d.len + 3}
              rx={3.5} ry={4 + d.len * 0.25}
              fill={c} opacity={0.7 * meltP} />
          </g>
        ))}

        {/* Icon */}
        <image
          href={event.image}
          x={CX - 55}
          y={iconY - 60}
          width="110"
          height="110"
          clipPath={`url(#${uid}-imgclip)`}
          preserveAspectRatio="xMidYMid slice"
          style={{ filter: `drop-shadow(0 0 14px ${c})`}}
        />

        {/* Event name */}
        <text x={CX} y={textStartY}
          textAnchor="middle"
          fontFamily="Arial Black"
          fontSize='20px'
          
          fontWeight="800"
        
          letterSpacing="1.5"
          fill='white'
          filter={hovered ? `url(#${uid}-textglow)` : undefined}>
          {event.name.length > 9 ? (
    <>
      {/* First line: Takes the first word or chunks up to a space */}
      <tspan x={CX} dy="0">
        {event.name.split(' ')[0]}
      </tspan>
      {/* Second line: Pushes the rest of the text down by 1.2em */}
      <tspan x={CX} dy="1.2em">
        {event.name.split(' ').slice(1).join(' ')}
      </tspan>
    </>
  ) : (
    /* If 9 characters or fewer, render normally on a single line */
    <tspan x={CX}>{event.name}</tspan>
  )}
        </text>

        {/* Category badge */}
        <rect x={CX - 40} y={textStartY -200} width="80" height="23" rx="2"
          fill={c + '20'} stroke="white" strokeWidth="0.9" />
        <text x={CX} y={textStartY -185}
          textAnchor="middle"
          fontFamily="Arial Black"
          fontSize="10" letterSpacing="1" fill="white" opacity="0.95">
          {event.category.toUpperCase()}
        </text>

        {/* Prize */}
        <text x={CX} y={textStartY + 46}
          textAnchor="middle"
          fontFamily="Arial Black" fontSize="18" fontWeight="800"
         fill={event.color === '#4ee2ff' ? '#F59E0B' : '#4ee2ff'}
        >
          {event.prize}
        </text>

        {/* Divider */}
        <line x1={CX - 75} y1={textStartY + 54} x2={CX + 75} y2={textStartY + 54}
          stroke={c + '30'} strokeWidth="0.8" />

        {/* Team + Rounds */}
        <text x={CX - 50} y={textStartY + 68}
          textAnchor="middle"
          fontFamily="Arial Black" fontSize="15"
           fill={event.color === '#4ee2ff' ? '#F59E0B' : '#4ee2ff'} opacity="1" letterSpacing="0.6">
          TEAM {event.teamSize}     
        </text>
        <line x1={CX - 14} y1={textStartY + 58} x2={CX - 14} y2={textStartY + 70}
          stroke={c + '35'} strokeWidth="0.9" />
        <text x={CX + 50} y={textStartY + 68}
          textAnchor="middle"
          fontFamily="Arial Black" fontSize="15" 
           fill={event.color === '#4ee2ff' ? '#F59E0B' : '#4ee2ff'}opacity="1" letterSpacing="0.6">
          {event.rounds} RND
        </text>

        {/* Type */}
        <text x={CX} y={textStartY + 86}
          textAnchor="middle"
          fontFamily="Arial" fontSize="13"
          fill="white" opacity="1" letterSpacing="1.5">
          {event.type.toUpperCase()} EVENT
        </text>

        {/* Explore CTA */}
        <text x={CX+15} y={textStartY + 108}
          textAnchor="middle"
          fontFamily="Arial Black" fontSize={hovered?"20":"18"} fontWeight="700"
          letterSpacing="2" fill="#021414"
          opacity={hovered ? 0.9 : 1}
          style={{ transition: 'opacity 0.25s' }}>
          EXPLORE →
        </text>

        {/* Neck symbol */}
        <text x={CX} y="55" textAnchor="middle"
          fontFamily="Share Tech Mono, monospace" fontSize="9"
          letterSpacing="1" fill={c + 'bb'}>
          {event.type === 'Team' ? '⬡' : '○'}
        </text>
      </svg>
    </div>
  );
};

export default FlaskCard;
