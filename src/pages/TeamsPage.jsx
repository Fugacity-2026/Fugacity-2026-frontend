import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NetworkCanvas from '../components/NetworkCanvas';

const HOD_DATA = {
  name: 'Prof. Sudipto Chakraborty',
  role: 'Head of Department',
  initials: 'SC',
  email: 'che_hod@che.iitkgp.ac.in / sc@che.iitkgp.ac.in',
  phone: '+91-3222-282249 / +91-3222-282250',
  linkedin: 'https://www.linkedin.com/in/sudiptochakraborty/',
  photo: '/team/sudipto-chakraborty.webp',
  speech: "I am delighted to announce that the Chemical Engineering Association of IIT Kharagpur is organizing the much-anticipated Technical Fest, 'Fugacity.' As the Head of the Chemical Engineering Department, I am excited to witness an event that promises to be both informative and enriching for the entire chemical community across the nation. This year's array of competitions, talks, and workshops, meticulously organized by the dedicated ChEA team, is designed to benefit students, professionals, and enthusiasts by providing a platform for learning, networking, and exploring the latest trends in chemical engineering. I extend a heartfelt invitation to all to join us at Fugacity and be a part of this enriching experience.",
};

const TEAM_DATA = {
  heads: [
    { name: 'Aman Rao', role: '', initials: 'AR', email: 'aman.cheaiitkgp@gmail.com', phone: '+91 8107901487', linkedin: 'https://www.linkedin.com/in/aman-rao-638461311/', photo: '/team/aman-rao.webp' },
    { name: 'Aman Rathore', role: '', initials: 'AR', email: 'amanrathore.cheaiitkgp@gmail.com', phone: '+91 9826338044', linkedin: 'https://www.linkedin.com/in/aman-rathore-65589831a/', photo: '/team/aman-rathore.webp' },
    { name: 'Asanga Pillewan', role: '', initials: 'AP', email: 'asanga.cheaiitkgp@gmail.com', phone: '+91 9156605324', linkedin: 'https://www.linkedin.com/in/asanga-pillewan-iitkgp/' },
    { name: 'Kosuru Praneetha', role: '', initials: 'KP', email: 'praneetha.cheaiitkgp@gmail.com', phone: '+91 9963174477', linkedin: 'https://www.linkedin.com/in/praneetha-kosuru-585971322/' },
    { name: 'Nikita Ameriya', role: '', initials: 'NA', email: 'nikitaameriya.cheaiitkgp@gmail.com', phone: '+91 8112289524', linkedin: 'https://www.linkedin.com/in/nikita-ameriya-b73630315/', photo: '/team/nikita-ameriya.webp' },
    { name: 'Smriti Tubid', role: '', initials: 'ST', email: 'smriti.cheaiitkgp@gmail.com', phone: '+91 6294714528', linkedin: 'https://www.linkedin.com/in/smriti-tubid-8a32972ab/', photo: '/team/smriti-tubid.webp' },
    { name: 'Sundram Kumar', role: '', initials: 'SK', email: 'sundram.cheaiitkgp@gmail.com', phone: '+91 7070038511', linkedin: 'https://www.linkedin.com/in/sundramkumar/', photo: '/team/sundram-kumar.webp' },
    { name: 'Yeshfeen Fatima', role: '', initials: 'YF', email: 'yeshfeenfatima2710@gmail.com', phone: '+91 8467950818', linkedin: 'https://www.linkedin.com/in/yeshfeen-fatima-5ab593334/', photo: '/team/yeshfeen-fatima.webp' },
    { name: 'Yug Birla', role: '', initials: 'YB', email: 'yug.cheaiitkgp@gmail.com', phone: '+91 9303903529', linkedin: 'https://www.linkedin.com/in/yug-birla-4b17b4321/', photo: '/team/yug-birla.webp' },
  ],
  advisors: [
    { name: 'Ankit Anand', role: '', initials: 'AA', email: 'ankitanand3027@gmail.com', phone: '+91 7413027632', linkedin: 'https://www.linkedin.com/in/ankitanand30/', photo: '/team/ankit-anand.webp' },
    { name: 'Ayush Maurya', role: '', initials: 'AM', email: '', phone: '+91 8918732423', linkedin: 'https://www.linkedin.com/in/ayush-kumar-maurya-065b14290/', photo: '/team/ayush-maurya.webp' },
    { name: 'Naveen G', role: '', initials: 'NG', email: '', phone: '+91 8247365739', linkedin: 'https://www.linkedin.com/in/naveen-g-9785ba323/', photo: '/team/naveen-g.webp' },
    { name: 'Rishi Kushwaha', role: '', initials: 'RK', email: 'rishikushwaha125@gmail.com', phone: '+91 9096909682', linkedin: 'https://www.linkedin.com/in/rishi-kushwaha-2baa88244/' },
    { name: 'Saakshi Baranwal', role: '', initials: 'SB', email: 'saakshibaranwal@kgpian.iitkgp.ac.in', phone: '+91 8918732423', linkedin: 'https://www.linkedin.com/in/saakshi-baranwal/', photo: '/team/saakshi-baranwal.webp' },
  ],
  profsInCharge: [
    { name: 'Prof. Koustuv Ray', role: '', initials: 'KR', email: 'koustuv@che.iitkgp.ac.in', phone: '+91-3222-284582', linkedin: 'https://www.linkedin.com/in/koustuvray/', photo: '/team/koustuv-ray.webp' },
    { name: 'Prof. Namrata Gaikwad', role: '', initials: 'NG', email: 'dnikita@che.iitkgp.ac.in', phone: '', linkedin: '#' },
    { name: 'Prof. Nikita Dewangan', role: '', initials: 'ND', email: 'dnikita@che.iitkgp.ac.in', phone: '', linkedin: '#', photo: '/team/nikita-dewangan.webp' },
    { name: 'Prof. Nikita Saxena', role: '', initials: 'NS', email: 'nks@che.iitkgp.ac.in', phone: '', linkedin: 'https://www.linkedin.com/in/ns27/', photo: '/team/nikita-saxena.webp' },
    { name: 'Prof. Swambabu Varanasi', role: '', initials: 'SV', email: 'swambabu@che.iitkgp.ac.in', phone: '+91-3222-283941 / +91-3222-283942', linkedin: '#' },
  ],
};

const useReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
};

const MemberCard = ({ member, delay = 0 }) => {
  const [revealRef, visible] = useReveal();
  const [flipped, setFlipped] = useState(false);
  const leaveTimer = useRef(null);

  return (
    <div
      ref={revealRef}
      className={`reveal ${visible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div
        onMouseEnter={() => { clearTimeout(leaveTimer.current); setFlipped(true); }}
        onMouseLeave={() => { clearTimeout(leaveTimer.current); leaveTimer.current = setTimeout(() => setFlipped(false), 100); }}
        className="member-card glass-panel rounded-2xl relative cursor-pointer h-[280px] w-full"
        style={{
          transform: flipped ? 'perspective(900px) rotateY(180deg)' : 'perspective(900px) rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
        }}
      >
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

        {/* FRONT FACE */}
        <div
          className="card-face flex flex-col items-center justify-center text-center px-6"
          style={{
            opacity: flipped ? 0 : 1,
            transition: flipped ? 'opacity 0.1s ease 0s' : 'opacity 0.1s ease 0.3s',
            pointerEvents: flipped ? 'none' : 'auto',
          }}
        >
          <div className="relative w-28 h-28 mb-4 mx-auto">
            <div className="ring" />
            {member.photo ? (
              <img src={member.photo} alt={member.name}
                className="absolute inset-2 w-24 h-24 rounded-full object-cover border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)]" />
            ) : (
              <div className="absolute inset-2 w-24 h-24 rounded-full bg-[#0d1f29] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center text-2xl font-black text-cyan-300">
                {member.initials}
              </div>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-100 tracking-wide">{member.name}</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-2">{member.role}</p>
        </div>

        {/* BACK FACE */}
        <div
          className="card-face flex flex-col items-center justify-center text-center px-4"
          style={{
            opacity: flipped ? 1 : 0,
            transition: flipped ? 'opacity 0.1s ease 0.3s' : 'opacity 0.1s ease 0s',
            pointerEvents: flipped ? 'auto' : 'none',
            transform: 'scaleX(-1)',
          }}
        >
          <p className="text-sm font-bold text-cyan-300 mb-4">{member.name}</p>
          {member.email && (
            <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-2">
              <span className="text-cyan-400">✉</span> {member.email}
            </p>
          )}
          {member.phone && (
            <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-4">
              <span className="text-cyan-400">📞</span> {member.phone}
            </p>
          )}
          {member.linkedin && member.linkedin !== '#' && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all"
              aria-label="LinkedIn">
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

const HODSection = () => {
  const [revealRef, visible] = useReveal();
  const [flipped, setFlipped] = useState(false);
  const hodLeaveTimer = useRef(null);

  return (
    <section className="mb-20 w-full">
      <div className="flex justify-center mb-12">
        <div className="px-8 py-3 rounded-full border border-cyan-400/30 glass-panel">
          <span className="text-lg font-black tracking-widest"
            style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255,255,255,0.9), 0 0 16px rgba(34,211,238,0.7), 0 0 32px rgba(34,211,238,0.4)' }}>
            GREETINGS FROM HOD
          </span>
        </div>
      </div>

      <div
        ref={revealRef}
        className={`reveal ${visible ? 'reveal-visible' : ''} max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center`}
      >
        {/* HOD Card */}
        <div className="flex-shrink-0 w-[270px]">
          <div
            onMouseEnter={() => { clearTimeout(hodLeaveTimer.current); setFlipped(true); }}
            onMouseLeave={() => { clearTimeout(hodLeaveTimer.current); hodLeaveTimer.current = setTimeout(() => setFlipped(false), 100); }}
            className="member-card glass-panel rounded-2xl relative cursor-pointer h-[280px] w-full"
            style={{
              transform: flipped ? 'perspective(900px) rotateY(180deg)' : 'perspective(900px) rotateY(0deg)',
              transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s ease, border-color 0.3s ease',
            }}
          >
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

            {/* FRONT */}
            <div className="card-face flex flex-col items-center justify-center text-center px-6"
              style={{
                opacity: flipped ? 0 : 1,
                transition: flipped ? 'opacity 0.1s ease 0s' : 'opacity 0.1s ease 0.3s',
                pointerEvents: flipped ? 'none' : 'auto',
              }}>
              <div className="relative w-28 h-28 mb-4 mx-auto">
                <div className="ring" />
                {HOD_DATA.photo ? (
                  <img src={HOD_DATA.photo} alt={HOD_DATA.name}
                    className="absolute inset-2 w-24 h-24 rounded-full object-cover border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)]" />
                ) : (
                  <div className="absolute inset-2 w-24 h-24 rounded-full bg-[#0d1f29] border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.25)] flex items-center justify-center text-2xl font-black text-cyan-300">
                    {HOD_DATA.initials}
                  </div>
                )}
              </div>
              <h3 className="text-lg font-bold text-slate-100 tracking-wide">{HOD_DATA.name}</h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 mt-2">{HOD_DATA.role}</p>
            </div>

            {/* BACK */}
            <div className="card-face flex flex-col items-center justify-center text-center px-4"
              style={{
                opacity: flipped ? 1 : 0,
                transition: flipped ? 'opacity 0.1s ease 0.3s' : 'opacity 0.1s ease 0s',
                pointerEvents: flipped ? 'auto' : 'none',
                transform: 'scaleX(-1)',
              }}>
              <p className="text-sm font-bold text-cyan-300 mb-4">{HOD_DATA.name}</p>
              {HOD_DATA.email && (
                <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-2">
                  <span className="text-cyan-400">✉</span> {HOD_DATA.email}
                </p>
              )}
              {HOD_DATA.phone && (
                <p className="text-[11px] text-slate-300 tracking-wide flex items-center gap-2 mb-4">
                  <span className="text-cyan-400">📞</span> {HOD_DATA.phone}
                </p>
              )}
              {HOD_DATA.linkedin && HOD_DATA.linkedin !== '#' && (
                <a href={HOD_DATA.linkedin} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-9 h-9 rounded-full border border-slate-600 flex items-center justify-center text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                  aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Speech Box */}
        <div className="flex-1 glass-panel rounded-2xl p-6 border border-cyan-400/20 relative">
          <div className="absolute top-4 left-5 text-5xl text-cyan-400/30 font-serif leading-none">"</div>
          <p className="text-slate-300 text-sm leading-relaxed tracking-wide pt-6 px-2">
            {HOD_DATA.speech}
          </p>
          <div className="absolute bottom-2 right-5 text-5xl text-cyan-400/30 font-serif leading-none">"</div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = ({ id, label, members }) => {
  const [headerRef, headerVisible] = useReveal();
  return (
    <section id={id} className="mb-20 w-full">
      <div ref={headerRef} className={`flex justify-center mb-12 reveal ${headerVisible ? 'reveal-visible' : ''}`}>
        <div className="px-8 py-3 rounded-full border border-cyan-400/30 glass-panel">
          <span className="text-lg font-black tracking-widest"
            style={{ color: '#ffffff', textShadow: '0 0 6px rgba(255,255,255,0.9), 0 0 16px rgba(34,211,238,0.7), 0 0 32px rgba(34,211,238,0.4)' }}>
            {label}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
        {members.map((member, idx) => (
          <div key={member.name} className="w-[270px]">
            <MemberCard member={member} delay={(idx % 3) * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
};

const TeamsPage = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (titleRef.current) titleRef.current.classList.add('animate-vapor-reveal');
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#112733] via-[#0e202b] to-[#09151c] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      <NetworkCanvas />

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

        .reveal {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        .member-card {
          border-color: rgba(125, 250, 255, 0.45);
          box-shadow: 0 0 16px rgba(34, 211, 238, 0.18);
          will-change: transform;
        }
        .member-card:hover {
          box-shadow: 0 0 45px -8px rgba(34,211,238,0.55), 0 0 16px rgba(34,211,238,0.25);
          border-color: rgba(165, 250, 255, 0.7);
        }

        .card-liquid-strip {
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
        .card-liquid-strip svg { position: absolute; inset: 0; width: 100%; height: 100%; }

        .card-face {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
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

        @media (prefers-reduced-motion: reduce) {
          .reveal, .card-face, .member-card { transition: none !important; }
          .reveal { opacity: 1; transform: none; }
        }
      `}</style>

      <Navbar />

      <div className="relative z-10 flex flex-col pt-28 px-4 w-full max-w-[1400px] mx-auto">
        <section className="flex flex-col justify-center items-center text-center mt-10 mb-20">
          <div ref={titleRef} className="opacity-0 select-none">
            <h1 className="text-6xl md:text-8xl leading-none font-black tracking-wide"
              style={{ color: '#ffffff', textShadow: '0 0 10px rgba(255,255,255,0.9), 0 0 30px rgba(34,211,238,0.7), 0 0 60px rgba(34,211,238,0.45), 0 0 100px rgba(34,211,238,0.25)' }}>
              OUR TEAM
            </h1>
          </div>
          <p className="mt-4 text-sm md:text-base text-cyan-200/90 max-w-2xl uppercase tracking-[0.2em] font-medium font-mono">
            The People Powering Fugacity '26
          </p>
        </section>

        <HODSection />
        <TeamSection id="profs-in-charge" label="PROFESSORS-IN-CHARGE" members={TEAM_DATA.profsInCharge} />
        <TeamSection id="advisors" label="ADVISORS" members={TEAM_DATA.advisors} />
        <TeamSection id="heads" label="HEADS" members={TEAM_DATA.heads} />
      </div>

      <Footer />
    </div>
  );
};

export default TeamsPage;