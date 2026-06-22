import React, { useEffect, useRef, useState } from 'react';

const HomePage = () => {
  const canvasRef = useRef(null);
  const shapesCanvasRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const thermometerTrackRef = useRef(null);
  
  const [activeFaq, setActiveFaq] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef(0);
  const [isDraggingThermometer, setIsDraggingThermometer] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(-25);

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

  // NAVIGATION ROUTING SIMULATOR
  const handleNavigation = (e, destination) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      setIsTransitioning(false);
      console.log(`Mapsd to ${destination}`);
    }, 800);
  };

  // THERMOMETER DRAG AND SCROLL ENGINE
  const updateScrollFromThermometer = (clientY) => {
    if (!thermometerTrackRef.current) return;
    const rect = thermometerTrackRef.current.getBoundingClientRect();
    
    let pct = (clientY - rect.top) / rect.height;
    pct = Math.max(0, Math.min(1, pct));
    
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    window.scrollTo(0, pct * docHeight);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDraggingThermometer) {
        updateScrollFromThermometer(e.clientY);
      }
    };
    const handleGlobalMouseUp = () => {
      setIsDraggingThermometer(false);
    };

    if (isDraggingThermometer) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDraggingThermometer]);


  // DYNAMIC PHASE TRANSITION KINETICS ENGINE
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 200; 
    const mouse = { x: null, y: null, radius: 150, speed: 0, lastX: null, lastY: null };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const docHeight = scrollHeight - clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollRef.current = progress;

      let temp = -25;
      if (progress <= 0.5) {
        temp = -25 + (progress * 2 * (27 - (-25)));
      } else {
        temp = 27 + ((progress - 0.5) * 2 * (100 - 27));
      }
      setCurrentTemp(Math.round(temp));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x; 
        this.baseY = this.y; 
        this.baseRadius = Math.random() * 2.5 + 1.5;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = 'rgba(34, 211, 238, 0.3)'; 
      }

      update(phaseProgress) {
        let speedMultiplier = 1;
        let returnForce = 0;
        let upwardDrift = 0;

        if (phaseProgress < 0.25) {
          speedMultiplier = 0.2;
          returnForce = 0.05;
          this.color = 'rgba(16, 185, 129, 0.4)'; 
        } else if (phaseProgress >= 0.25 && phaseProgress < 0.65) {
          speedMultiplier = 0.65; 
          returnForce = 0; 
          this.color = 'rgba(34, 211, 238, 0.45)'; 
        } else {
          const gasIntensity = (phaseProgress - 0.65) / 0.35; 
          speedMultiplier = 1.2 + (gasIntensity * 1.5); 
          returnForce = 0; 
          upwardDrift = gasIntensity * 2.5; 
          this.color = `rgba(56, 189, 248, ${0.3 + (gasIntensity * 0.4)})`; 
        }

        this.x += this.vx * speedMultiplier;
        this.y += (this.vy * speedMultiplier) - upwardDrift;

        if (returnForce > 0) {
          this.x += (this.baseX - this.x) * returnForce;
          this.y += (this.baseY - this.y) * returnForce;
        }

        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          if (phaseProgress < 0.25) this.baseX = this.x < 0 ? 10 : canvas.width - 10;
        }
        
        if (this.y < -50 && upwardDrift > 0) {
          this.y = canvas.height + 10;
        } else if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          if (phaseProgress < 0.25) {
            this.baseY = this.y < 0 ? 10 : canvas.height - 10;
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = mouse.radius * (1 + phaseProgress); 

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const pushFactor = (mouse.speed > 5 ? force * 9 : force * 3.5) * (0.6 + phaseProgress);
            const angle = Math.atan2(dy, dx);
            
            this.x += Math.cos(angle) * pushFactor;
            this.y += Math.sin(angle) * pushFactor;
            this.radius = this.baseRadius * 1.8; 
          } else {
            this.radius = this.baseRadius;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const drawLattice = (phaseProgress) => {
      if (phaseProgress > 0.65) return;
      const connectionDistance = 120 - (phaseProgress * 150); 
      if (connectionDistance <= 0) return;
      const maxOpacity = 0.15 * (1 - (phaseProgress / 0.65));

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, maxOpacity * (1 - dist / connectionDistance))})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    const drawWaterWaves = (phaseProgress) => {
      let waveIntensity = 0;
      if (phaseProgress >= 0.2 && phaseProgress < 0.5) {
        waveIntensity = (phaseProgress - 0.2) / 0.3; 
      } else if (phaseProgress >= 0.5 && phaseProgress < 0.75) {
        waveIntensity = Math.max(0, 1 - (phaseProgress - 0.5) / 0.25);
      }

      if (waveIntensity <= 0) return;

      const time = Date.now() * 0.002;
      const baseHeight = canvas.height - (180 * waveIntensity); 
      const defaultAmplitude = 45 * waveIntensity; 

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        let currentAmplitude = defaultAmplitude;

        if (mouse.x !== null && mouse.y !== null) {
          const xDist = Math.abs(x - mouse.x);
          if (xDist < 180) { 
            const proximityFactor = (180 - xDist) / 180;
            const yDist = Math.abs(mouse.y - baseHeight);
            if (yDist < 250) {
              currentAmplitude += 40 * proximityFactor * (1 - yDist / 250);
            }
          }
        }

        const y = baseHeight + Math.sin(x * 0.004 + time) * currentAmplitude + Math.cos(x * 0.002 + time * 0.5) * (currentAmplitude * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = `rgba(34, 211, 238, ${0.14 * waveIntensity})`;
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let x = 0; x <= canvas.width; x += 10) {
        let currentAmplitude = defaultAmplitude * 0.7;

        if (mouse.x !== null && mouse.y !== null) {
          const xDist = Math.abs(x - mouse.x);
          if (xDist < 180) {
            const proximityFactor = (180 - xDist) / 180;
            const yDist = Math.abs(mouse.y - (baseHeight + 15));
            if (yDist < 250) {
              currentAmplitude += 35 * proximityFactor * (1 - yDist / 250);
            }
          }
        }

        const y = (baseHeight + 20) + Math.sin(x * 0.006 - time * 0.8) * currentAmplitude + Math.cos(x * 0.003 + time) * (currentAmplitude * 0.3);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, canvas.height);
      ctx.fillStyle = `rgba(56, 189, 248, ${0.19 * waveIntensity})`;
      ctx.fill();
      ctx.restore();
    };

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      const phase = scrollRef.current;
      const bgOpacity = 0.12 + (phase * 0.08);
      ctx.fillStyle = `rgba(10, 23, 31, ${bgOpacity})`; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(phase);
        p.draw();
      });
      
      drawLattice(phase);
      drawWaterWaves(phase); 
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      if (mouse.lastX !== null && mouse.lastY !== null) {
        const dx = e.clientX - mouse.lastX;
        const dy = e.clientY - mouse.lastY;
        mouse.speed = Math.sqrt(dx * dx + dy * dy);
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastX = e.clientX;
      mouse.lastY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; mouse.speed = 0; });
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    { icon: '🤖', title: 'ML HACKATHON', desc: 'Construct and compile advanced computational frameworks to optimize chemical asset yields.' },
    { icon: '💻', title: 'CODING & DSA', desc: 'Race against localized constraints to debug logic components and trace sorting arrays.' },
    { icon: '⚙️', title: 'OPTIMIZEIT', desc: 'Fine-tune mass balances, fluid flows, and loop coefficients to prevent process drop-off.' },
    { icon: '📊', title: 'CASE STUDY', desc: 'Isolate root failure mechanisms across high-scale industrial plant infrastructure simulations.' },
    { icon: '🎤', title: 'GUEST LECTURES', desc: 'Interact with global research leaders discussing upcoming shifts in industrial dynamics.' },
    { icon: '🧪', title: 'CHEM-QUIZ', desc: 'Rapid reactions and conceptual checks across intense trivia timelines testing core kinetics.' }
  ];

  const extendedEvents = [...eventData, ...eventData];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a171f] via-[#09141c] to-[#050c12] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* ENCAPSULATED THERMOMETER MODULE (Corrected Overlapping and Spacing Setup) */}
      <div className="fixed right-5 top-1/2 transform -translate-y-1/2 z-50 select-none hidden md:flex">
        <div className="bg-[#0b1b24]/95 border border-cyan-500/30 shadow-[0_0_25px_rgba(34,211,238,0.15)] rounded-xl px-3 py-5 flex flex-col items-center w-[135px]">
          
          <span className="text-[9px] font-black font-mono tracking-[0.15em] text-cyan-400 mb-4 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(34,211,238,0.2)]">
            THERMOMETER
          </span>

          {/* Track frame alignment container shifted right to accommodate wider safety gap on left layout */}
          <div className="relative h-[310px] w-1.5 bg-[#07131a] border border-slate-800 rounded-full flex flex-col justify-between items-center py-4 ml-auto mr-1.5" ref={thermometerTrackRef}>
            
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-emerald-500 via-cyan-500 to-red-500 rounded-full transition-all duration-75 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
              style={{ height: `${scrollRef.current * 100}%` }}
            />

            {/* Added wider right offset padding (right-7) to completely prevent overlapping congestion with slider tracking disk */}
            <div className="absolute right-7 top-2 text-[9px] font-mono font-black text-emerald-400 flex flex-col items-end leading-none text-right">
              <span className="bg-emerald-950/40 border border-emerald-500/30 px-1.5 py-0.5 rounded shadow-[0_0_5px_rgba(16,185,129,0.2)]">SOLID</span>
              <span className="text-[7px] text-slate-400 mt-0.5 font-bold">-25°C</span>
            </div>

            <div className="absolute right-7 top-1/2 transform -translate-y-1/2 text-[9px] font-mono font-black text-cyan-400 flex flex-col items-end leading-none text-right">
              <span className="bg-cyan-950/40 border border-cyan-500/30 px-1.5 py-0.5 rounded shadow-[0_0_5px_rgba(34,211,238,0.2)]">LIQUID</span>
              <span className="text-[7px] text-slate-400 mt-0.5 font-bold">+27°C</span>
            </div>

            <div className="absolute right-7 bottom-2 text-[9px] font-mono font-black text-rose-400 flex flex-col items-end leading-none text-right">
              <span className="bg-rose-950/40 border border-rose-500/30 px-1.5 py-0.5 rounded shadow-[0_0_5px_rgba(239,68,68,0.2)]">GAS</span>
              <span className="text-[7px] text-slate-400 mt-0.5 font-bold">+100°C</span>
            </div>

            {/* Indicator Control Node Slider Ball */}
            <div 
              onMouseDown={() => setIsDraggingThermometer(true)}
              className={`absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#0d222f] border-2 cursor-grab active:cursor-grabbing flex flex-col items-center justify-center shadow-2xl transition-transform duration-100 ${isDraggingThermometer ? 'scale-110 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]' : 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'}`}
              style={{ top: `calc(${scrollRef.current * 100}% - 16px)` }}
            >
              <span className="text-[8px] font-black font-mono text-white tracking-tighter">{currentTemp}°</span>
              <div className="w-2 h-[2px] bg-slate-500 rounded-full mt-0.5"></div>
            </div>
          </div>
        </div>
      </div>

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

      {/* HEADER STICKY BAR (Updated Links Configuration) */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50 glass-panel rounded-full px-6 py-2 flex items-center justify-between shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        <div className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-200">
          FUGACITY
        </div>
        <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#events" onClick={(e) => handleNavigation(e, '/events')} className="hover:text-cyan-400 transition-colors">Events</a>
          <a href="#countdown" className="hover:text-cyan-400 transition-colors">Countdown</a>
          <a href="#sponsors" onClick={(e) => handleNavigation(e, '/sponsors')} className="hover:text-cyan-400 transition-colors">Sponsors</a>
          <a href="#teams" onClick={(e) => handleNavigation(e, '/teams')} className="hover:text-cyan-400 transition-colors">Teams</a>
        </nav>
        <button onClick={(e) => handleNavigation(e, '/register')} className="px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-[#09141c] transition-all shadow-[0_0_20px_#22d3ee]">
          Register Now
        </button>
      </header>

      {/* CENTRAL BOUNDED CONTAINER COMPONENT */}
      <div className="relative z-10 flex flex-col pt-24 px-4 w-full max-w-[1340px] mx-auto items-center">

        {/* HERO SECTION */}
        <section id="home" className="flex flex-col justify-center items-center text-center mt-6 mb-12 w-full">
          <p className="text-[10px] md:text-xs font-bold text-cyan-400 uppercase tracking-[0.35em] mb-5 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            Chemical Engineering Association
          </p>
          
          <div className="relative py-2 mb-3 select-none flex items-center justify-center">
            <div className="absolute w-[110%] h-[120%] bg-cyan-500/15 rounded-full filter blur-3xl animate-subtle-pulse pointer-events-none"></div>
            
            <h1 
              ref={titleRef}
              className="text-5xl md:text-[5.8rem] leading-none font-black tracking-wider text-white select-none filter drop-shadow-[0_0_35px_rgba(34,211,238,0.8)] animate-vapor-reveal px-2"
            >
              FUGACITY '26
            </h1>
          </div>

          <p className="mt-4 text-[10px] md:text-xs text-slate-400 uppercase tracking-[0.25em] font-medium font-mono">
            Where Chemistry Meets Innovation
          </p>

          {/* INSTANTIATED SHAPES ELEMENT FIELD */}
          <div className="w-full max-w-[750px] overflow-hidden mt-6 opacity-0 animate-vapor-reveal" style={{ animationDelay: '0.3s' }}>
            <canvas ref={shapesCanvasRef} className="mx-auto block cursor-default" />
          </div>

          {/* UPDATED METRIC TILES GRID CONTAINER */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-10 w-full">
            {[
              { val: '10+', label: 'EVENTS' },
              { val: '30+', label: 'COLLEGES' },
              { val: '1,000+', label: 'REGISTRATIONS', gradient: true },
              { val: '3,000+', label: 'SOCIAL REACH' },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center group cursor-default">
                <div className={`text-2xl md:text-3xl font-black tracking-tight transition-transform ${stat.gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]' : 'text-white'}`}>
                  {stat.val}
                </div>
                <div className="text-[9px] text-cyan-400 uppercase tracking-widest font-bold mt-1 tracking-[0.15em] drop-shadow-[0_0_6px_rgba(34,211,238,0.3)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT PANEL */}
        <section id="about" className="mb-14 w-full max-w-4xl">
          <div className="bg-[#0b1a24]/90 backdrop-blur-xl border border-cyan-400/30 p-6 md:p-8 rounded-xl text-center relative shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mb-3 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">About Brief</h2>
            <p className="text-slate-300 text-xs md:text-sm leading-relaxed max-w-3xl mx-auto font-light">
              Fugacity is the Chemical Engineering Department fest inviting everyone to short-circuit norms. Solve for numerous unique solution pathways and operationalize process control logic matrices to optimize outcomes across localized systems—designed specifically to check for specialized engineering domains.
            </p>
          </div>
        </section>

        {/* FEATURED EVENTS PANEL */}
        <section id="events" className="mb-16 w-full overflow-hidden flex flex-col items-center">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black tracking-widest text-white uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">Featured Events</h2>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex gap-5 w-full overflow-x-auto hide-scroll-x cursor-grab active:cursor-grabbing pb-6 px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {extendedEvents.map((event, idx) => (
              <div 
                key={idx} 
                onClick={(e) => handleNavigation(e, `/events/${event.title.toLowerCase().replace(/\s/g, '-')}`)}
                className="group flex-shrink-0 w-[270px] md:w-[290px] p-6 rounded-xl glass-panel border-cyan-500/30 hover:border-cyan-400 bg-[#0c1c28]/95 hover:bg-[#112738] transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative top-0 hover:-top-1.5 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-[#061118] border border-cyan-400/50 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(34,211,238,0.35)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] group-hover:scale-105 transition-all text-cyan-400">
                  {event.icon}
                </div>
                <h3 className="text-base font-bold text-white tracking-wide mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">{event.title}</h3>
                <p className="text-slate-400 text-[11px] leading-relaxed mb-6 flex-grow">{event.desc}</p>
                <button className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5 drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                  View More <span className="text-sm transition-transform group-hover:translate-x-1.5">→</span>
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* COUNTDOWN DISPLAY */}
        <section id="countdown" className="mb-16 max-w-4xl w-full">
          <div className="bg-[#0c1c28]/95 backdrop-blur-xl border border-cyan-400/40 rounded-xl p-8 flex flex-col items-center w-full shadow-[0_0_35px_rgba(34,211,238,0.15)] relative">
            
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_3px_#22d3ee]"></div>
            
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan-400 mb-1 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
              Event Countdown
            </h2>
            <p className="text-[11px] font-mono text-slate-300 font-bold tracking-wider mb-8 drop-shadow-[0_0_5px_rgba(255,255,255,0.1)]">
              30 August 2026 &middot; IIT Kharagpur
            </p>
            
            <div className="grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-xl">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINS' },
                { value: timeLeft.seconds, label: 'SECS' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-full aspect-square max-h-24 bg-[#050e14] border border-cyan-400/50 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(34,211,238,0.22),_inset_0_0_10px_rgba(34,211,238,0.1)] mb-2.5">
                    <span className="text-2xl sm:text-4xl font-black text-white font-mono select-none filter drop-shadow-[0_0_10px_rgba(34,211,238,0.65)]">
                      {String(item.value).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="text-[9px] font-black text-cyan-400 tracking-widest font-sans drop-shadow-[0_0_5px_rgba(34,211,238,0.3)]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ SECTIONS MODULE */}
        <section id="faqs" className="glass-panel border-cyan-500/30 rounded-xl p-6 max-w-4xl w-full mb-16 shadow-[0_0_25px_rgba(34,211,238,0.08)]">
          <div className="flex justify-between items-end border-b border-slate-700/60 pb-3 mb-4">
             <h2 className="text-base font-bold tracking-wider text-white">FAQ</h2>
             <button className="text-[9px] uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">View More →</button>
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
                  className="w-full text-left px-4 py-3 flex justify-between items-center focus:outline-none"
                >
                  <span className="text-white text-xs font-medium tracking-wide">{faq.q}</span>
                  <span className="text-cyan-400 text-sm">{activeFaq === index ? '−' : '＋'}</span>
                </button>
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFaq === index ? 'max-h-24' : 'max-h-0'}`}>
                  <p className="px-4 pb-3 text-cyan-100/70 text-[11px] leading-relaxed border-t border-slate-800/60 pt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800 bg-[#050b0f]/95 py-6 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 text-slate-400">
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer text-xs">In</div>
            <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer text-xs">Li</div>
          </div>
          <div className="text-center md:text-right flex flex-col items-center md:items-end text-[11px] text-slate-400">
            <h4 className="font-bold text-white tracking-wider uppercase mb-1">Department</h4>
            <p className="tracking-wide">📞 +X XX XXXX XXXX</p>
            <p className="tracking-wide mt-0.5">✉️ XXXXXXXXX@fugs.che.com</p>
          </div>
        </div>
        <div className="text-center mt-6 text-[9px] text-slate-600 tracking-widest uppercase">
          © 2026 Fugacity. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HomePage;