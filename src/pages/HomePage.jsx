import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NetworkCanvas from '../components/NetworkCanvas.jsx';

const HomePage = () => {
  const shapesCanvasRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  
  const [activeFaq, setActiveFaq] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // COUNTDOWN STATE ENGINE
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('August 30, 2026 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNavigation = (e, destination) => {
    e.preventDefault();
    // Doing nothing intentionally
  };

  // HERO LAYER SHAPES ENGINE
  useEffect(() => {
    const canvas = shapesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    
    canvas.width = 750;
    canvas.height = 180;

    let points = [];
    const createShapePoints = () => {
      points = [];
      const fx = 120, fy = 95;
      for (let i = 0; i < 300; i++) { 
        let px, py;
        const r = Math.random();
        if (r < 0.25) { 
          px = fx - 10 + Math.random() * 20;
          py = fy - 50 + Math.random() * 45;
        } else if (r < 0.55) { 
          px = fx - 45 + Math.random() * 90;
          py = fy + 40 + (Math.random() - 0.5) * 4;
        } else { 
          const progress = Math.random();
          const widthAtY = 20 + progress * 66;
          px = fx - widthAtY / 2 + Math.random() * widthAtY;
          py = fy - 10 + progress * 50;
        }
        points.push({ x: px, y: py, origX: px, origY: py, phase: Math.random() * 12 });
      }

      const cx = 375, cy = 90;
      const nodes = [{x: cx, y: cy}, {x: cx, y: cy-45}, {x: cx-45, y: cy}, {x: cx+45, y: cy}, {x: cx, y: cy+45}];
      nodes.forEach((node, idx) => {
        const size = idx === 0 ? 18 : 12;
        for (let i = 0; i < 60; i++) {
          const ang = Math.random() * Math.PI * 2;
          const dist = Math.random() * size;
          const px = node.x + Math.cos(ang) * dist;
          const py = node.y + Math.sin(ang) * dist;
          points.push({ x: px, y: py, origX: px, origY: py, phase: Math.random() * 12 });
        }
      });

      const hx = 620, hy = 90, hRadius = 45;
      for (let i = 0; i < 300; i++) {
        let px, py;
        const choice = Math.random();
        if (choice < 0.6) { 
          const edge = Math.floor(Math.random() * 6);
          const a1 = (edge * Math.PI) / 3;
          const a2 = ((edge + 1) * Math.PI) / 3;
          const p = Math.random();
          const x1 = hx + Math.cos(a1) * hRadius, y1 = hy + Math.sin(a1) * hRadius;
          const x2 = hx + Math.cos(a2) * hRadius, y2 = hy + Math.sin(a2) * hRadius;
          px = x1 + (x2 - x1) * p;
          py = y1 + (y2 - y1) * p;
        } else { 
          const ang = Math.random() * Math.PI * 2;
          const dist = Math.random() * hRadius;
          px = hx + Math.cos(ang) * dist;
          py = hy + Math.sin(ang) * dist;
        }
        points.push({ x: px, y: py, origX: px, origY: py, phase: Math.random() * 12 });
      }
    };

    createShapePoints();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.003;

      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 0;

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.beginPath();
      ctx.moveTo(120 - 10, 45); ctx.lineTo(120 + 10, 45);
      ctx.moveTo(120 - 10, 45); ctx.lineTo(120 - 10, 65);
      ctx.lineTo(120 - 45, 135); ctx.lineTo(120 + 45, 135);
      ctx.lineTo(120 + 10, 65); ctx.lineTo(120 + 10, 45);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.beginPath();
      ctx.moveTo(375, 45); ctx.lineTo(375, 135);
      ctx.moveTo(330, 90); ctx.lineTo(420, 90);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(34, 211, 238, 0.25)';
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = 620 + Math.cos(angle) * 45;
        const y = 90 + Math.sin(angle) * 45;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = '#22d3ee';
      points.forEach(p => {
        const offset = Math.sin(time + p.phase) * 1.2;
        ctx.beginPath();
        ctx.arc(p.origX + offset, p.origY + offset, 1.4, 0, Math.PI * 2); 
        ctx.shadowColor = '#22d3ee';
        ctx.shadowBlur = 5;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => cancelAnimationFrame(animationId);
  }, []);

  // HORIZONTAL AUTO-SCROLL LOOP FOR EVENTS
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused) {
        container.scrollLeft += 0.8;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    container.addEventListener('mouseenter', () => isPaused = true);
    container.addEventListener('mouseleave', () => isPaused = false);
    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const eventData = [
    { image: '/e1.png', title: 'Chemical Quiz', desc: 'Construct and compile advanced computational frameworks to optimize chemical asset yields.' },
    { image: '/e2.png', title: 'Reaction Race', desc: 'Race against localized constraints to debug logic components and trace sorting arrays.' },
    { image: '/e3.png', title: 'CHEM Case Study', desc: 'Fine-tune mass balances, fluid flows, and loop coefficients to prevent process drop-off.' },
    { image: '/e4.png', title: 'MOL Modelling', desc: 'Isolate root failure mechanisms across high-scale industrial plant infrastructure simulations.' },
    { image: '/e5.png', title: 'Code the Problem', desc: 'Interact with global research leaders discussing upcoming shifts in industrial dynamics.' },
    { image: '/e6.png', title: 'CHEM Workshop', desc: 'Rapid reactions and conceptual checks across intense trivia timelines testing core kinetics.' }
  ];

  const extendedEvents = [...eventData, ...eventData];

  return (
    <div className="relative min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      
      {/* 🌟 CELLULAR BACKGROUND MANAGER */}
      <NetworkCanvas />

      {/* FLASH TRANSITION OVERLAY */}
      <div className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-300 ${isTransitioning ? 'opacity-100 backdrop-blur-xl bg-cyan-950/30' : 'opacity-0 backdrop-blur-none bg-transparent'}`}>
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isTransitioning ? 'scale-100' : 'scale-50'}`}>
           <div className="w-full h-[2px] bg-cyan-400 shadow-[0_0_30px_8px_#22d3ee]"></div>
        </div>
      </div>

      <style>{`
        @keyframes vaporReveal {
          0% { filter: blur(15px); letter-spacing: 12px; opacity: 0; transform: scale(0.97); }
          100% { filter: blur(0px); letter-spacing: 2px; opacity: 1; transform: scale(1); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.35; transform: scale(1); filter: blur(20px); }
          50% { opacity: 0.7; transform: scale(1.06); filter: blur(28px); }
        }
        .animate-vapor-reveal { animation: vaporReveal 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-subtle-pulse { animation: subtlePulse 3.5s ease-in-out infinite; }
        
        .glass-panel {
          background: rgba(11, 26, 38, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(34, 211, 238, 0.28);
          box-shadow: 0 0 25px rgba(34, 211, 238, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.05);
        }
        
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #09141c; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #152e3d; border-radius: 4px; }
        
        .hide-scroll-x::-webkit-scrollbar { display: none; }
        .hide-scroll-x { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 🌟 RENDER THE ACTUAL IMPORTED NAVBAR COMPONENT HERE */}
      <Navbar />

      {/* CENTRAL BOUNDED CONTAINER COMPONENT */}
      {/* RESPONSIVE EDIT: Fluid horizontal gutters and adaptable layout margins prevent component dismantling */}
      <div className="relative z-10 flex flex-col pt-20 md:pt-24 px-4 sm:px-6 lg:px-8 w-full max-w-[1340px] mx-auto items-center">

        {/* HERO SECTION */}
        <section id="home" className="flex flex-col justify-center items-center text-center mt-4 sm:mt-6 mb-10 md:mb-12 w-full">
          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-cyan-400 uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-4 sm:mb-5 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
             Chemical Engineering Association
          </p>
          
          <div className="relative py-1 sm:py-2 mb-2 sm:mb-3 select-none flex items-center justify-center w-full">
            <div className="absolute w-[90%] sm:w-[110%] h-[120%] bg-cyan-500/15 rounded-full filter blur-3xl animate-subtle-pulse pointer-events-none"></div>
            
            {/* RESPONSIVE EDIT: Gradual typography steps from mobile text-3xl to massive fluid viewports */}
            <h1 
              ref={titleRef}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.8rem] leading-none font-black tracking-wider text-white select-none filter drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] animate-vapor-reveal px-2 break-words"
            >
              FUGACITY '26
            </h1>
          </div>

          <p className="mt-2 sm:mt-4 text-[9px] sm:text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.18em] sm:tracking-[0.25em] font-medium font-mono">
            Where Chemistry Meets Innovation
          </p>

          {/* INSTANTIATED SHAPES ELEMENT FIELD */}
          {/* RESPONSIVE EDIT: Added relative scaling rules to keep custom canvas rendering fluid inside miniature screens */}
          <div className="w-full max-w-[750px] overflow-hidden mt-6 opacity-0 animate-vapor-reveal" style={{ animationDelay: '0.3s' }}>
            <canvas ref={shapesCanvasRef} className="mx-auto block cursor-default max-w-full h-auto" />
          </div>

          {/* METRIC TILES GRID CONTAINER */}
          {/* RESPONSIVE EDIT: Grid mapping architecture transitions seamlessly from standard mobile double grids into fluid desktop flex lines */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-16 mt-8 sm:mt-10 w-full max-w-sm sm:max-w-none px-2 sm:px-0">
            {[
              { val: '10+', label: 'EVENTS' },
              { val: '30+', label: 'COLLEGES' },
              { val: '1,000+', label: 'REGISTRATIONS', gradient: true },
              { val: '3,000+', label: 'SOCIAL REACH' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-default">
                <div className={`text-xl sm:text-2xl md:text-3xl font-black tracking-tight transition-transform ${stat.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-white'}`}>
                  {stat.val}
                </div>
                <div className="text-[8px] sm:text-[9px] text-cyan-400 uppercase tracking-widest font-bold mt-1 tracking-[0.15em] drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT PANEL */}
        {/* RESPONSIVE EDIT: Fluid text alignment structures and container edge offsets for smooth tablet/mobile reading */}
        <section id="about" className="mb-12 sm:mb-14 w-full max-w-4xl px-1 sm:px-0">
          <div className="bg-[#0b1a24]/90 backdrop-blur-xl border border-cyan-400/30 p-5 sm:p-6 md:p-8 rounded-xl text-center relative shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <h2 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">About Brief</h2>
            <p className="text-slate-300 text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-3xl mx-auto font-light">
              Fugacity is the Chemical Engineering Department fest inviting everyone to short-circuit norms. Solve for numerous unique solution pathways and operationalize process control logic matrices to optimize outcomes across localized systems—designed specifically to check for specialized engineering domains.
            </p>
          </div>
        </section>

        {/* FEATURED EVENTS PANEL */}
        <section id="events" className="mb-14 sm:mb-16 w-full overflow-hidden flex flex-col items-center">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Featured Events</h2>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-4 sm:gap-5 w-full overflow-x-auto hide-scroll-x cursor-grab active:cursor-grabbing pb-6 px-4 sm:px-6 md:px-8"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {extendedEvents.map((event, idx) => (
              <div 
                key={idx} 
                onClick={(e) => handleNavigation(e, '#')}
                className="group flex-shrink-0 w-[250px] sm:w-[270px] md:w-[290px] p-5 sm:p-6 rounded-xl glass-panel border-cyan-500/30 bg-[#0c1c28]/95 flex flex-col items-center text-center relative shadow-[0_0_20px_rgba(34,211,238,0.08)]"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 rounded-xl bg-[#061118] border border-cyan-400/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-wide mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">{event.title}</h3>
                <p className="text-slate-400 text-[10px] sm:text-[11px] leading-relaxed flex-grow">{event.desc}</p>
              </div>
            ))}
          </div>

          {/* INFORMATIONAL DISCLAIMER LINE */}
          {/* RESPONSIVE EDIT: Swapped explicit fixed viewport size parameters for balanced tracking scales */}
          <div className="mt-8 text-center px-4 w-full">
            <p className="text-[10px] sm:text-xs md:text-sm font-sans font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              for more details and information go to the events page
            </p>
          </div>
        </section>

        {/* COUNTDOWN DISPLAY */}
        {/* RESPONSIVE EDIT: Tuned container grid layouts and dynamic pad rules to keep time modules perfectly proportioned */}
        <section id="countdown" className="mb-14 sm:mb-16 max-w-4xl w-full px-1 sm:px-0">
          <div className="bg-[#0c1c28]/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl p-5 sm:p-6 md:p-8 flex flex-col items-center w-full shadow-[0_0_35px_rgba(34,211,238,0.15)] relative">
            
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_3px_#22d3ee]"></div>
            
            <h2 className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              Event Countdown
            </h2>
            <p className="text-[10px] sm:text-[11px] font-mono text-slate-300 font-bold tracking-wider mb-6 sm:mb-8 text-center drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
              30th August 2026 &middot; IIT Kharagpur
            </p>
            
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-6 w-full max-w-xl">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINS' },
                { value: timeLeft.seconds, label: 'SECS' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-full aspect-square bg-[#050e14] border border-cyan-400/50 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.22),_inset_0_0_10px_rgba(34,211,238,0.1)] mb-1.5 sm:mb-2.5">
                    <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white font-mono select-none filter drop-shadow-[0_0_10px_rgba(34,211,238,0.65)]">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[7px] sm:text-[8px] md:text-[9px] font-black text-cyan-400 tracking-widest font-sans drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTIONS MODULE */}
        {/* RESPONSIVE EDIT: Adapted title boundaries and tracking width rules to safely containerize multi-line labels */}
        <section id="faqs" className="glass-panel border-cyan-500/30 rounded-xl p-4 sm:p-6 max-w-4xl w-full mb-16 shadow-[0_0_25px_rgba(34,211,238,0.08)] px-3 sm:px-6">
          <div className="flex justify-between items-end border-b border-slate-700/60 pb-3 mb-4">
              <h2 className="text-sm sm:text-base font-bold tracking-wider text-white">FAQs</h2>
          </div>
          
          <div className="space-y-2.5">
            {[
              { q: "Who is eligible to join the tracks?", a: "Undergraduate technical and engineering students globally." },
              { q: "Is the pipeline hybrid?", a: "Phase 1 is online; Phase 2 is localized on-campus." },
              { q: "What software proficiencies are recommended for Process Design?", a: "Familiarity with process optimization platforms or programming modules like Aspen Plus, DWSIM, or MATLAB is helpful but not mandatory." },
              { q: "Can individuals participate, or are teams required?", a: "Most technical tracks allow teams of 2 to 4 members. Review the target rulebooks for accurate specifications." }
            ].map((faq, index) => (
              <div key={index} className="bg-[#061219]/90 rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-500/30 transition-colors">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full text-left px-3 sm:px-4 py-3 flex justify-between items-center gap-3 focus:outline-none"
                >
                  <span className="text-white text-[11px] sm:text-xs font-medium tracking-wide pr-2">{faq.q}</span>
                  <span className="text-cyan-400 text-xs sm:text-sm flex-shrink-0">{activeFaq === index ? '−' : '＋'}</span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    activeFaq === index ? 'max-h-[140px] sm:max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-3 sm:px-4 pb-3 text-cyan-100/70 text-[10px] sm:text-[11px] leading-relaxed border-t border-slate-800/60 pt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER COMPONENT */}
      <Footer />
    </div>
  );
};

export default HomePage;