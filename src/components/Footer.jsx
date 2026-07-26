import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleScrollToSection = (id) => {
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const handleNavigation = (e, destination) => {
    e.preventDefault();
    navigate(destination);
  };

  return (
    <footer className="relative z-10 w-full text-base border-t border-cyan-500/20 bg-[#030d12]/85 backdrop-blur-md pt-16 pb-8 px-6 sm:px-12 mt-auto overflow-hidden">
      {/* CONSTELATION-MATCHING BLUR OVERLAYS */}
      <div className="absolute top-0 left-1/4 -z-10 w-96 h-40 bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 -z-10 w-80 h-40 bg-teal-500/5 rounded-full blur-[100px]" />

      {/* CHANGED TO CUSTOM TRACK FRACTIONS (md:grid-cols-[1.5fr_1fr_1.2fr_1.3fr]) AND LARGER GAP-X */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] gap-x-20 gap-y-10 items-start text-left mb-12">
        
        {/* COLUMN 1: BRIEF BRAND ANCHOR WITH LOGO */}
        <div className="flex flex-col gap-4 min-w-[260px]">
          <div className="flex items-center gap-3 whitespace-nowrap">
            <img 
              src="/chea-logo.jpg" 
              alt="ChEA Logo" 
              className="w-12 h-12 object-contain rounded-full bg-[#030d12]/90 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.2)] shrink-0"
            />
            <div className="text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-200 to-slate-100">
              FUGACITY '26
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed tracking-wide">
            The annual technical fest of the Chemical Engineering Department, inviting minds to solve process-control puzzles, operational logic problems, and core industrial challenges.
          </p>
        </div>

        {/* COLUMN 2: QUICK LINK SYSTEM DIRECTORY */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-cyan-400 tracking-widest uppercase border-b border-cyan-500/20 pb-1.5">Navigation</h4>
          <nav className="flex flex-col gap-3 text-sm font-medium tracking-wider text-slate-400">
            <a href="/" onClick={(e) => handleNavigation(e, '/')} className="hover:text-cyan-300 transition-colors w-fit flex items-center gap-1 group">
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px]">&gt;</span> Home
            </a>
            <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="hover:text-cyan-300 transition-colors w-fit flex items-center gap-1 group">
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px]">&gt;</span> About
            </a>
            <a href="/events" onClick={(e) => handleNavigation(e, '/events')} className="hover:text-cyan-300 transition-colors w-fit flex items-center gap-1 group">
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px]">&gt;</span> Events
            </a>
            <a href="/sponsors" onClick={(e) => handleNavigation(e, '/sponsors')} className="hover:text-cyan-300 transition-colors w-fit flex items-center gap-1 group">
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px]">&gt;</span> Sponsors
            </a>
            <a href="/teams" onClick={(e) => handleNavigation(e, '/teams')} className="hover:text-cyan-300 transition-colors w-fit flex items-center gap-1 group">
              <span className="text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono text-[11px]">&gt;</span> Meet the Team
            </a>
          </nav>
        </div>

        {/* COLUMN 3: ORGANIZER CONTACT PATHWAYS */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-cyan-400 tracking-widest uppercase border-b border-cyan-500/20 pb-1.5">Contact Us</h4>
          <div className="flex flex-col gap-4 text-sm text-slate-400 tracking-wider">
            
            <p className="flex items-start gap-3 leading-relaxed group">
              <span className="text-cyan-400 p-1.5 mt-0.5 flex items-center justify-center w-8 h-8 shrink-0">
                <span className="text-cyan-400 font-mono text-sm">📍</span>
              </span>
              <span>
                Chemical Engineering Department,<br />Indian Institute of Technology, Kharagpur<br />West Bengal, India - 721302<br />
                <a href="mailto:cheaiitkgp@gmail.com" className="hover:text-cyan-300 transition-colors">cheaiitkgp@gmail.com</a>
              </span>
            </p>
          </div>
        </div>

        {/* COLUMN 4: COMMUNITY ATTACHMENT NETWORKS */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-bold text-cyan-400 tracking-widest uppercase border-b border-cyan-500/20 pb-1.5">Follow ChEA</h4>
          <p className="text-sm text-slate-400 leading-relaxed tracking-wide mb-1">
            Stay connected with the Chemical Engineering Association for updates, timeline schedules, and event results releases.
          </p>
          
          {/* Social Icons Container */}
          <div className="flex items-center gap-3.5 text-slate-400">
            <a href="https://www.linkedin.com/company/chemical-engineering-association-iit-kharagpur/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 h-10 rounded-xl border border-slate-800 bg-[#061219]/60 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300"
               aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/cheaiitkgp/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 h-10 rounded-xl border border-slate-800 bg-[#061219]/60 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300"
               aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.facebook.com/cheaiitkgp/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-10 h-10 rounded-xl border border-slate-800 bg-[#061219]/60 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.25)] transition-all duration-300"
               aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.18 4.32 15.1 4.22 13.84 4.22c-2.63 0-4.43 1.6-4.43 4.55V10.5H6.9v3h2.51V21h4.09z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* LOWER BAR: SUB-FOOTER RECTIFICATION TRACK */}
      <div className="w-full border-t border-cyan-500/10 pt-6 flex justify-center text-xs text-slate-500 tracking-widest uppercase">
        <div className="text-center font-medium opacity-80 hover:opacity-100 transition-opacity">
          © 2026 Fugacity. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;