import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Users, Quote, ChevronRight, Info } from 'lucide-react';

export default function AboutPage() {
  const canvasRef = useRef(null);
  const scrollRef = useRef(0);
  
  // Track hovered associated body information modules
  const [hoveredBody, setHoveredBody] = useState(null);

  // 1. FLUID DYNAMICS GAS KINETICS BACKGROUND ENGINE (SYNCED WITH HOME PAGE)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let particles = [];
    const particleCount = 140;
    const mouse = { x: null, y: null, radius: 130, speed: 0, lastX: null, lastY: null };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const docHeight = scrollHeight - clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollRef.current = Math.min(Math.max(progress, 0), 1);
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
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.color = 'rgba(34, 211, 238, 0.2)';
      }

      update(phaseProgress) {
        let speedMultiplier = 1;
        let returnForce = 0;
        let upwardDrift = 0;

        if (phaseProgress < 0.25) {
          speedMultiplier = 0.25;
          returnForce = 0.04;
          this.color = 'rgba(16, 185, 129, 0.25)';
        } else if (phaseProgress >= 0.25 && phaseProgress < 0.65) {
          speedMultiplier = 0.5;
          returnForce = 0.005;
          this.color = 'rgba(34, 211, 238, 0.25)';
        } else {
          const gasIntensity = (phaseProgress - 0.65) / 0.35;
          speedMultiplier = 1.2 + (gasIntensity * 1.2);
          returnForce = 0;
          upwardDrift = gasIntensity * 2;
          this.color = `rgba(56, 189, 248, ${0.2 + (gasIntensity * 0.3)})`;
        }

        this.x += this.vx * speedMultiplier;
        this.y += (this.vy * speedMultiplier) - upwardDrift;

        if (returnForce > 0) {
          this.x += (this.baseX - this.x) * returnForce;
          this.y += (this.baseY - this.y) * returnForce;
        }

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < -20 && upwardDrift > 0) {
          this.y = canvas.height + 20;
        } else if (this.y < 0 || this.y > canvas.height) {
          if (upwardDrift === 0) this.vy *= -1;
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = mouse.radius * (1 + phaseProgress);

          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const pushFactor = (mouse.speed > 5 ? force * 5 : force * 2) * (0.5 + phaseProgress);
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * pushFactor;
            this.y += Math.sin(angle) * pushFactor;
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
      const connectionDistance = 90 - (phaseProgress * 100);
      if (connectionDistance <= 0) return;
      const maxOpacity = 0.1 * (1 - (phaseProgress / 0.65));

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
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      const phase = scrollRef.current;
      ctx.fillStyle = `rgba(14, 33, 44, ${0.15 + (phase * 0.05)})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update(phase);
        p.draw();
      });
      drawLattice(phase);
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
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Associated Bodies dynamic summary descriptors
  const bodiesData = {
    kgp: {
      title: "Indian Institute of Technology Kharagpur",
      desc: "Indian Institute of Technology Kharagpur (IIT Kharagpur) is a public technical university established by the government of India in Kharagpur, West Bengal. Established in 1951, it is the first of the IITs and is recognised as an Institute of National Importance. In 2019 it was awarded the status of Institute of Eminence by the government of India.",
      link: "https://www.iitkgp.ac.in/"
    },
    chea: {
      title: "Chemical Engineering Association, IIT Kharagpur",
      desc: "Chemical Engineering Association (ChEA-IITKGP) is the official student body of the Department of Chemical Engineering, IIT Kharagpur. The association coordinates academic activities, technical events, and student initiatives in areas such as pollution control, transport processes, petroleum technology, and membrane processes.",
      link: "https://www.facebook.com/cheaiitkgp"
    }
    ,
    workshops: {
      title: "Workshops & Guest Lectures",
      desc: "Hands-on workshops and talks by eminent faculty and industry experts covering cutting-edge research, tools, and methods relevant to chemical engineering and allied fields."
    },
    competitions: {
      title: "Technical Competitions & Case Studies",
      desc: "Problem-solving contests, case-study challenges, and team-based technical competitions designed to test applied knowledge and innovation under time constraints."
    },
    industry: {
      title: "Industry Interaction & Networking",
      desc: "Opportunities to connect with industry representatives, recruiters, and research collaborators for internships, projects, and career guidance."
    },
    fun: {
      title: "Fun Events & Quizzes",
      desc: "Social events, quizzes, and informal competitions to relax, network, and celebrate with peers across departments and institutes."
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e202b] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      
      {/* Background canvas context */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      {/* NAVIGATION FIXED HEADER */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 bg-[#112733]/75 backdrop-blur-xl border border-cyan-400/12 rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl">
        <div className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-100">
          FUGACITY
        </div>
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <a href="/" className="hover:text-cyan-200 transition-colors">Home</a>
          <a href="/about" className="text-cyan-400 font-extrabold tracking-wider">About</a>
          <span className="hover:text-cyan-200 transition-colors cursor-pointer">Events</span>
          <span className="hover:text-cyan-200 transition-colors cursor-pointer">Schedule</span>
          <span className="hover:text-cyan-200 transition-colors cursor-pointer">FAQs</span>
        </nav>
        <button className="px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-400 text-[#0d1b22] shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          Register
        </button>
      </header>

      {/* CORE WORKSPACE LIMITER CONTAINER (Matches exactly 1400px of your home page layout rules) */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto pt-28 pb-16 px-4 md:px-12 space-y-20">
        
        {/* ASYMMETRIC GRID ROW MAPPED TO EXTREME EQUALIZED HEIGHTS (40% Left Column, 60% Right Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 items-stretch w-full">
          
          {/* ================= LEFT COLUMN: OUR VISION ASSETS (40% Width Layout Node) ================= */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            
            {/* Edge Bleeding Left Bar Header (Uses infinite overlay block extending left outside the layout box) */}
            <div className="relative h-12 flex items-center w-full">
              <div 
                style={{
                  background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.2) 0%, rgba(22, 54, 71, 0.95) 75%, rgba(14, 32, 43, 0) 100%)',
                  borderLeft: '4px solid #22d3ee'
                }}
                className="absolute top-0 bottom-0 left-[-100vw] right-0 rounded-r-xl border-t border-b border-cyan-400/15"
              />
              <div className="relative z-20 pl-4 flex items-center space-x-3 text-cyan-400 font-mono">
                <Sparkles size={16} className="animate-pulse" />
                <h2 className="text-xs uppercase tracking-[0.25em] font-black">About Us</h2>
              </div>
            </div>

            {/* Vision Statement Content Block */}
            <div className="flex-grow bg-[#132936]/45 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6 md:p-8 flex flex-col justify-center shadow-xl">
              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-[0.35em] text-cyan-400 font-bold">What we do</span>
                <h3 className="mt-3 text-lg md:text-xl font-black tracking-tight text-white">A vibrant fest for learning, innovation and networking.</h3>
              </div>
              <p className="text-sm md:text-[15px] text-slate-300 leading-relaxed text-center md:text-left max-w-[38rem] mx-auto font-light">
                Fugacity is the annual departmental fest of the Department of Chemical Engineering at IIT Kharagpur, organised by the Chemical Engineering Association (ChEA). Each year the fest brings together over 1,500 participants from premier institutes across India for workshops, competitions, guest lectures, and industry networking.
                <br />
                <br />
                Our mission is to foster innovation, collaboration, and professional growth through hands-on experiences and expert-led sessions that bridge academia and industry.
              </p>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: DYNAMIC MATRIX & ASSOCIATED MODULES (60% Width Layout Node) ================= */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6">
            
            {/* Four Panels Grid: Workshops / Competitions / Industry / Fun */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onMouseEnter={() => setHoveredBody('workshops')}
                onMouseLeave={() => setHoveredBody(null)}
                className="h-24 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
              >
                <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">WORKSHOPS & GUEST LECTURES</h4>
              </div>

              <div
                onMouseEnter={() => setHoveredBody('competitions')}
                onMouseLeave={() => setHoveredBody(null)}
                className="h-24 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
              >
                <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">TECHNICAL COMPETITIONS & CASE STUDIES</h4>
              </div>

              <div
                onMouseEnter={() => setHoveredBody('industry')}
                onMouseLeave={() => setHoveredBody(null)}
                className="h-24 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
              >
                <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">INDUSTRY INTERACTION & NETWORKING</h4>
              </div>

              <div
                onMouseEnter={() => setHoveredBody('fun')}
                onMouseLeave={() => setHoveredBody(null)}
                className="h-24 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
              >
                <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">FUN EVENTS & QUIZZES</h4>
              </div>
            </div>

            {/* Edge Bleeding Right Bar Header (Uses infinite overlay block extending right outside the layout box) */}
            <div className="relative h-12 flex items-center justify-end w-full">
              <div 
                style={{
                  background: 'linear-gradient(270deg, rgba(34, 211, 238, 0.2) 0%, rgba(22, 54, 71, 0.95) 75%, rgba(14, 32, 43, 0) 100%)',
                  borderRight: '4px solid #22d3ee'
                }}
                className="absolute top-0 bottom-0 left-0 right-[-100vw] rounded-l-xl border-t border-b border-cyan-400/15"
              />
              <div className="relative z-20 pr-4 flex items-center space-x-3 text-cyan-400 font-mono">
                <h2 className="text-xs uppercase tracking-[0.25em] font-black">Associated Bodies</h2>
                <Users size={16} />
              </div>
            </div>

            {/* Interactive Grid Modules Row Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Rectangular Interactive Card Module 1: IIT Kharagpur */}
                <a 
                  href="https://www.iitkgp.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredBody('kgp')}
                  onMouseLeave={() => setHoveredBody(null)}
                  className="bg-[#132936]/40 hover:bg-[#152e3c]/70 border border-slate-800/60 hover:border-cyan-400/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-lg group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-cyan-500/10 flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                    <img
                      src="https://cheaiitkgp.github.io/fugacity/IIT_Kharagpur_Logo.svg.png"
                      alt="IIT Kharagpur logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                    IIT Kharagpur
                  </h4>
                </a>

                {/* Rectangular Interactive Card Module 2: ChEA */}
                <a 
                  href="https://www.facebook.com/cheaiitkgp"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredBody('chea')}
                  onMouseLeave={() => setHoveredBody(null)}
                  className="bg-[#132936]/40 hover:bg-[#152e3c]/70 border border-slate-800/60 hover:border-cyan-400/40 rounded-2xl p-5 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer shadow-lg group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-cyan-500/10 flex items-center justify-center overflow-hidden mb-2 group-hover:scale-105 transition-transform duration-200">
                    <img
                      src="https://cheaiitkgp.github.io/fugacity/Screenshot_2022-01-05_at_11.57.17_AM-removebg-preview.png"
                      alt="ChEA logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-200">
                    ChEA
                  </h4>
                </a>

              </div>

              {/* SMOOTH HOVER INFORMATION STREAM DISPLAY ELEMENT CONTAINER */}
              <div className="w-full h-20 bg-[#0a1822]/70 border border-slate-900 rounded-xl px-5 py-3 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                <div className={`w-full transition-all duration-300 ease-out transform ${hoveredBody === 'kgp' || hoveredBody === 'chea' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                  {hoveredBody === 'kgp' || hoveredBody === 'chea' ? (
                    <div className="text-left">
                      <div className="flex items-center space-x-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
                        <Info size={11} />
                        <span>{bodiesData[hoveredBody].title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light leading-tight">
                        {bodiesData[hoveredBody].desc}
                      </p>
                    </div>
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* ================= LOWER ROW: HOD CORE MESSAGE SECTION ZONE BLOCK ================= */}
        <section className="w-full">
        <div className="w-full bg-gradient-to-r from-[#122834]/80 to-[#0e202b]/20 border border-slate-800/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            <div className="absolute right-6 bottom-[-10px] text-slate-800/10 select-none pointer-events-none">
            <Quote size={120} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* LEFT PROFILE ASSEMBLY NODE */}
            <div className="md:col-span-3 flex flex-col items-center text-center">
                {/* Dynamic Image Wrapper Container */}
                <div className="w-28 h-28 rounded-xl bg-[#08151d] border border-slate-700/60 p-1 shadow-lg overflow-hidden flex items-center justify-center">
                <img 
                    src="data:image/png;base64, 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" 
                    alt ="Head of Department"
                    className="w-full h-full object-cover object-center rounded-lg"
                />
                </div>
                
                {/* HOD NAME SPACE SLOT */}
                <h3 className="text-sm font-bold text-slate-100 tracking-wide mt-3.5">
                Prof.Sudipto Chakraborty
                </h3>
                
                {/* LEADERSHIP ROLES */}
                <h4 className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 mt-1 uppercase">
                Head of Department
                </h4>
                <p className="text-[9px] text-slate-500 font-mono tracking-wider">
                Department of Chemical Engineering
                </p>
            </div>

            {/* RIGHT TEXT CAPTURE NODE */}
            <div className="md:col-span-9 space-y-3">
                <div className="flex items-center space-x-2 border-b border-slate-800/80 pb-2.5">
                <Quote size={14} className="text-cyan-400 transform scale-x-[-1]" />
                <h3 className="text-xs font-mono uppercase tracking-[0.15em] font-black text-slate-200">
                    Message from the Leadership Core
                </h3>
                </div>
                <p className="text-sm md:text-[14px] text-slate-300 font-light leading-relaxed text-justify">
                "I am delighted to announce that the Chemical Engineering Association of IIT Kharagpur is organizing the much-anticipated Technical Fest, Fugacity. As the Head of the Department, I am excited to witness an event that promises to be informative and enriching for the entire chemical engineering community. This year's competitions, talks, and workshops, organised by the dedicated ChEA team, are designed to support learning, networking, and the exploration of the latest industry trends. I extend a warm invitation to all to join us at Fugacity and be part of this exceptional experience."
                </p>
            </div>

            </div>
        </div>
        </section>

      </main>
    </div>
  );
}