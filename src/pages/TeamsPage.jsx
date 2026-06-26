import React, { useEffect, useRef, useState } from 'react';

// ─── TEAM DATA ───────────────────────────────────────────────
// Heads use the names/roles from the existing design. Advisors and
// Professors-In-Charge are placeholders (same "XXXX" convention as the
// homepage footer) — swap in real names, emails, phone numbers, photos
// and LinkedIn URLs. Add a `photo: 'url'` field to any member to show
// an actual picture instead of the initials avatar.

const TEAM_DATA = {
  heads: [
    {
      name: 'Yeshfeen Fatima',
      role: '',
      initials: 'YF',
      email: 'yeshfeenfatima2710@gmail.com',
      phone: '8467950818',
      linkedin: 'https://www.linkedin.com/in/yeshfeen-fatima-5ab593334/',
      photo: '/team/yeshfeen-fatima.jpeg',
    },
    {
      name: 'Aman Rao',
      role: '',
      initials: 'AR',
      email: 'aman.cheaiitkgp@gmail.com',
      phone: '8107901487',
      linkedin: 'https://www.linkedin.com/in/aman-rao-638461311/',
      photo: '/team/aman-rao.jpeg',
    },
    {
      name: 'Yug Birla',
      role: '',
      initials: 'YB',
      email: 'yug.cheaiitkgp@gmail.com',
      phone: '9303903529',
      linkedin: 'https://www.linkedin.com/in/yug-birla-4b17b4321/',
      photo: '/team/yug-birla.jpeg',
    },
    {
      name: 'Smriti Tubid',
      role: '',
      initials: 'ST',
      email: 'smriti.cheaiitkgp@gmail.com',
      phone: '6294714528',
      linkedin: 'https://www.linkedin.com/in/smriti-tubid-8a32972ab/',
      photo: '/team/smriti-tubid.jpeg',
    },
    {
      name: 'Nikita Ameriya',
      role: '',
      initials: 'NA',
      email: 'nikitaameriya.cheaiitkgp@gmail.com',
      phone: '8112289524',
      linkedin: 'https://www.linkedin.com/in/nikita-ameriya-b73630315/',
      photo: '/team/nikita-ameriya.jpeg',
    },
    {
      name: 'Asanga Pillewan',
      role: '',
      initials: 'AP',
      email: 'asanga.cheaiitkgp@gmail.com',
      phone: '9156605324',
      linkedin: 'https://www.linkedin.com/in/asanga-pillewan-iitkgp/',
  
    },
    {
      name: 'Sundram Kumar',
      role: '',
      initials: 'SK',
      email: 'sundram.cheaiitkgp@gmail.com',
      phone: '7070038511',
      linkedin: 'https://www.linkedin.com/in/sundramkumar/',
      photo: '/team/sundram-kumar.jpeg',
    },
    {
      name: 'Kosuru Praneetha',
      role: '',
      initials: 'KP',
      email: 'praneetha.cheaiitkgp@gmail.com',
      phone: '9963174477',
      linkedin: 'https://www.linkedin.com/in/praneetha-kosuru-585971322/',
    },
    {
      name: 'Aman Rathore',
      role: '',
      initials: 'AR',
      email: 'amanrathore.cheaiitkgp@gmail.com',
      phone: '9826338044',
      linkedin: 'https://www.linkedin.com/in/aman-rathore-65589831a/',
      photo: '/team/aman-rathore.jpeg',
    },
  ],
  advisors: [
    {
      name: 'Rishi Kushwaha',
      role: '',
      initials: 'RK',
      email: 'rishikushwaha125@gmail.com',
      phone: '9096909682',
      linkedin: 'https://www.linkedin.com/in/rishi-kushwaha-2baa88244/',
    },
    {
      name: 'Naveen G',
      role: '',
      initials: 'NG',
      email: '',
      phone: '8247365739',
      linkedin: 'https://www.linkedin.com/in/naveen-g-9785ba323/',
      photo: '/team/naveen-g.jpeg',
    },
    {
      name: 'Ankit Anand',
      role: '',
      initials: 'AA',
      email: 'ankitanand3027@gmail.com',
      phone: '7413027632',
      linkedin: 'https://www.linkedin.com/in/ankitanand30/',
      photo: '/team/ankit-anand.jpeg',
    },
    {
      name: 'Saakshi Baranwal',
      role: '',
      initials: 'SB',
      email: 'saakshibaranwal@kgpian.iitkgp.ac.in',
      phone: '8918732423',
      linkedin: 'https://www.linkedin.com/in/saakshi-baranwal/',
      photo: '/team/saakshi-baranwal.jpeg',
    },
    {
      name: 'Ayush Maurya',
      role: '',
      initials: 'AM',
      email: '',
      phone: '8918732423',
      linkedin: 'https://www.linkedin.com/in/ayush-kumar-maurya-065b14290/',
      photo: '/team/ayush-maurya.jpeg',
    },
  ],
  profsInCharge: [
    {
      name: 'Prof. Nikita Saxena',
      role: '',
      initials: 'NS',
      email: 'nks@che.iitkgp.ac.in',
      phone: '',
      linkedin: 'https://www.linkedin.com/in/ns27/',
      photo: '/team/nikita-saxena.jpeg',
    },
    {
      name: 'Prof. Nikita Dewangan',
      role: '',
      initials: 'ND',
      email: 'dnikita@che.iitkgp.ac.in',
      phone: '',
      linkedin: '#',
      photo: '/team/nikita-dewangan.jpeg',
    },
    {
      name: 'Prof. Namrata Gaikwad',
      role: '',
      initials: 'NG',
      email: 'dnikita@che.iitkgp.ac.in',
      phone: '',
      linkedin: '#',
    },
    {
      name: 'Prof. Koustuv Ray',
      role: '',
      initials: 'KR',
      email: 'koustuv@che.iitkgp.ac.in',
      phone: '+91-3222-284582',
      linkedin: 'https://www.linkedin.com/in/koustuvray/',
      photo: '/team/koustuv-ray.jpeg',
    },
    {
      name: 'Prof. Swambabu Varanasi',
      role: '',
      initials: 'SV',
      email: 'swambabu@che.iitkgp.ac.in',
      phone: '+91-3222-283941 / +91-3222-283942',
      linkedin: '#',
    },
  ],
};


// ─── SCROLL REVEAL HOOK ──────────────────────────────────────
// Watches an element and flips `visible` to true the moment it enters
// the viewport, then stops watching (one-shot reveal on scroll).
const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// ─── MEMBER CARD ─────────────────────────────────────────────
const MemberCard = ({ member, delay = 0 }) => {
  const [revealRef, visible] = useReveal();
  const cardRef = useRef(null);

  // 3D tilt + spotlight: track cursor position relative to the card
  // and rotate it slightly toward the cursor, like light bending off glass.
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / rect.width) * 14;
    const rotateX = -((y - rect.height / 2) / rect.height) * 14;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
  };

  return (
    <div
      ref={revealRef}
      className={`reveal ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="member-card glass-panel group rounded-2xl px-6 py-10 relative overflow-hidden cursor-pointer"
      >
        
        {/* liquid strip along the bottom edge */}
        <div className="card-liquid-strip">
          <svg viewBox="0 0 260 42" preserveAspectRatio="none">
            <path fill="#4ee2ff" opacity="0.55">
              <animate attributeName="d" dur="3.4s" repeatCount="indefinite"
                values="
                  M0,5.4 C40,28.4 80,-6 130,12 C180,30 220,-2.8 260,12 L260,42 L0,42 Z;
                  M0,-4.4 C40,-7.7 80,25.1 130,2.2 C180,-9.3 220,23.5 260,-1.1 L260,42 L0,42 Z;
                  M0,15.3 C40,-4.4 80,26.8 130,3.8 C180,3.8 220,25.1 260,15.3 L260,42 L0,42 Z;
                  M0,5.4 C40,28.4 80,-6 130,12 C180,30 220,-2.8 260,12 L260,42 L0,42 Z" />
            </path>
            <path fill="none" stroke="rgba(225,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round">
              <animate attributeName="d" dur="3.4s" repeatCount="indefinite"
                values="
                  M0,5.4 C40,28.4 80,-6 130,12 C180,30 220,-2.8 260,12;
                  M0,-4.4 C40,-7.7 80,25.1 130,2.2 C180,-9.3 220,23.5 260,-1.1;
                  M0,15.3 C40,-4.4 80,26.8 130,3.8 C180,3.8 220,25.1 260,15.3;
                  M0,5.4 C40,28.4 80,-6 130,12 C180,30 220,-2.8 260,12" />
            </path>
          </svg>
        </div>
        {/* spotlight glow that follows the cursor */}
        <div className="card-spotlight" />

        {/* FRONT FACE: photo + name + role */}
        <div className="card-face card-front flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-6 mx-auto">
            <div className="ring" />
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="absolute inset-2 w-28 h-28 rounded-full object-cover border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)]"
              />
            ) : (
              <div className="absolute inset-2 w-28 h-28 rounded-full bg-[#0d1f29] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center text-2xl font-black text-cyan-300">
                {member.initials}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-100 tracking-wide">{member.name}</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-2">
            {member.role}
          </p>
        </div>

        {/* BACK FACE: email, phone, linkedin — revealed on hover */}
        <div className="card-face card-back flex flex-col items-center justify-center text-center px-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-4">
            {member.role}
          </p>
          {member.email && (
           <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-2">
            <span className="text-cyan-400">✉</span> {member.email}
           </p>
          )}
          {member.phone && (
           <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-5">
            <span className="text-cyan-400">📞</span> {member.phone}
           </p>
          )}
          {member.linkedin && member.linkedin !== '#' && (
        <a
    href={member.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
    aria-label="LinkedIn"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  </a>
)}
        </div>
      </div>
    </div>
  );
};

// ─── SECTION WRAPPER (eyebrow badge + grid of cards) ────────
const TeamSection = ({ id, label, members }) => {
  const [headerRef, headerVisible] = useReveal();
  return (
    <section id={id} className="mb-20 w-full">
      <div ref={headerRef} className={`flex justify-center mb-12 reveal ${headerVisible ? 'reveal-visible' : ''}`}>
        <div className="px-8 py-3 rounded-full border border-cyan-400/30 glass-panel">
        <span className="text-lg font-black tracking-widest"
        style={{
        color: '#ffffff',
        textShadow:'0 0 6px rgba(255,255,255,0.9), 0 0 16px rgba(34,211,238,0.7), 0 0 32px rgba(34,211,238,0.4)',
        }}>
        {label}
        </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {members.map((member, idx) => (
          <MemberCard key={member.name} member={member} delay={(idx % 3) * 0.1} />
        ))}
      </div>
    </section>
  );
};

const TeamsPage = () => {
  const canvasRef = useRef(null);
  const titleRef = useRef(null);

  // Interactive molecular lattice background — particles drift, link up when
  // close, and push away from the cursor like a reactive constellation.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];
    const particleCount = 150;
    const mouse = { x: null, y: null, radius: 180 };

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
        this.baseRadius = Math.random() * 2.5 + 1.5;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.color = 'rgba(34, 211, 238, 0.45)';
      }

      update() {
        const speedMultiplier = 0.5;
        this.x += this.vx * speedMultiplier;
        this.y += this.vy * speedMultiplier;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        if (mouse.x !== null && mouse.y !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const pushFactor = force * 4;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * pushFactor;
            this.y += Math.sin(angle) * pushFactor;
            this.radius = this.baseRadius * 1.5;
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

    const drawLattice = () => {
      const connectionDistance = 115;
      const maxOpacity = 0.18;

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

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(14, 33, 44, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      drawLattice();
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    init();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (titleRef.current) titleRef.current.classList.add('animate-vapor-reveal');
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#112733] via-[#0e202b] to-[#09151c] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />

      <style>{`
        html, body { margin: 0; padding: 0; }
        #root { min-height: 100vh; }

        @keyframes vaporReveal {
          0% { filter: blur(20px); letter-spacing: 16px; opacity: 0; transform: scale(0.96); }
          50% { filter: blur(6px); opacity: 0.7; }
          100% { filter: blur(0px); letter-spacing: 2px; opacity: 1; transform: scale(1); }
        }
        .animate-vapor-reveal { animation: vaporReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .glass-panel {
          background: rgba(22, 44, 56, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(34, 211, 238, 0.12);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0e202b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1c3b4e; border-radius: 10px; }

        /* Scroll-triggered reveal */
        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        /* Card hover mechanics */
        .member-card {
          transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
          transform-style: preserve-3d;
          will-change: transform;
          border-color: rgba(125, 250, 255, 0.45);
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.18);
        }
        .member-card:hover {
          box-shadow: 0 0 45px -8px rgba(34,211,238,0.55), 0 0 16px rgba(34,211,238,0.25);
          border-color: rgba(165, 250, 255, 0.7);
        }
        .ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          background: conic-gradient(from 0deg, transparent 0%, #22d3ee 22%, transparent 48%, transparent 100%);
          animation: spin 3.2s linear infinite;
          filter: blur(1px);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .card-liquid-strip {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 42px;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        .card-liquid-strip svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .card-spotlight {
          position: absolute;
          inset: 0;
          background: radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(34,211,238,0.18), transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .member-card:hover .card-spotlight { opacity: 1; }

        .card-face {
          transition: opacity 0.45s ease, transform 0.45s ease;
        }
        .card-front { opacity: 1; transform: scale(1); }
        .member-card:hover .card-front {
          opacity: 0;
          transform: scale(0.85);
          pointer-events: none;
        }
        .card-back {
          position: absolute;
          inset: 0;
          padding: 2rem;
          opacity: 0;
          transform: scale(1.08);
          pointer-events: none;
        }
        .member-card:hover .card-back {
          opacity: 1;
          transform: scale(1);
          pointer-events: auto;
          transition-delay: 0.08s;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .card-face, .member-card { transition: none !important; }
          .reveal { opacity: 1; transform: none; }
        }
      `}</style>

      {/* NAV — identical to homepage, Teams marked active */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50 glass-panel rounded-full px-6 py-2.5 flex items-center justify-between shadow-xl">
        <a href="#" className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-100">
          FUGACITY
        </a>
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-cyan-200 transition-colors">Home</a>
          <a href="#" className="hover:text-cyan-200 transition-colors">About</a>
          <a href="#" className="hover:text-cyan-200 transition-colors">Events</a>
          <a href="/sponsors" className="hover:text-cyan-200 transition-colors">Sponsors</a>
          <a href="#" className="hover:text-cyan-200 transition-colors">FAQs</a>
          <a href="#heads" className="text-cyan-400 hover:text-cyan-200 transition-colors">Teams</a>
        </nav>
        <button className="px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-[#0d1b22] transition-all shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-95">
          Register Now
        </button>
      </header>

      <div className="relative z-10 flex flex-col pt-28 px-4 w-full max-w-[1400px] mx-auto">

        {/* HERO */}
        <section className="flex flex-col justify-center items-center text-center mt-10 mb-20">
          <div ref={titleRef} className="opacity-0 select-none">
            <h1 className="text-6xl md:text-8xl leading-none font-black tracking-wide"
             style={{
             color: '#ffffff',
             textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(34,211,238,0.7), 0 0 60px rgba(34,211,238,0.45), 0 0 100px rgba(34,211,238,0.25)',
             }}>
            OUR TEAM
            </h1>
          </div>
          <p className="mt-4 text-sm md:text-base text-cyan-200/90 max-w-2xl uppercase tracking-[0.2em] font-medium font-mono">
            The People Powering Fugacity '26
          </p>
        </section>

        <TeamSection id="heads" label="HEADS" members={TEAM_DATA.heads} />
        <TeamSection id="advisors" label="ADVISORS" members={TEAM_DATA.advisors} />
        <TeamSection id="profs-in-charge" label="PROFESSORS-IN-CHARGE" members={TEAM_DATA.profsInCharge} />

      </div>

      {/* FOOTER — identical to homepage */}
      <footer className="relative z-10 w-full border-t border-slate-800/60 bg-[#07131a]/95 backdrop-blur-xl py-6 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-evenly items-center gap-6">
          <div className="flex items-center gap-5 text-slate-400">
          <a href="https://www.linkedin.com/company/chemical-engineering-association-iit-kharagpur/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all"
          aria-label="LinkedIn">
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
         <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
         </svg>
         </a>
         <a href="https://www.instagram.com/cheaiitkgp/"
         target="_blank"
         rel="noopener noreferrer"
         className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all"
         aria-label="Instagram">
         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
         <rect x="3" y="3" width="18" height="18" rx="5" />
         <circle cx="12" cy="12" r="4" />
         <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
         </svg>
         </a>
         <a href="https://www.facebook.com/cheaiitkgp/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(34,211,238,0.4)] transition-all"
          aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.18 4.32 15.1 4.22 13.84 4.22c-2.63 0-4.43 1.6-4.43 4.55V10.5H6.9v3h2.51V21h4.09z" />
          </svg>
          </a>
          </div>
          <div className="text-right flex flex-col items-end">
            <h4 className="text-[11px] font-bold text-slate-200 tracking-widest uppercase mb-1.5">Chemical Engineering Department</h4>
            <p className="text-[11px] text-slate-400 tracking-wider flex items-center gap-2 mt-0.5">
              <span className="text-cyan-600">✉</span> cheaiitkgp@gmail.com
            </p>
          </div>
        </div>
        <div className="text-center mt-6 text-[9px] text-slate-600 tracking-widest uppercase">
          © 2026 Fugacity. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default TeamsPage;