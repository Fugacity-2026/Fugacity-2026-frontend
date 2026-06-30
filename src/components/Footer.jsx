import React from 'react';

const Footer = () => {
  const handleScrollToSection = (id) => {
    if (window.location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <footer className="relative z-10 w-full border-t border-cyan-500/15 bg-[#051016]/95 backdrop-blur-xl pt-12 pb-6 px-6 sm:px-12 mt-auto">
      {/* GLOW DECOR BACKGROUND AMBIENT INSERTS */}
      <div className="absolute top-0 left-1/4 -z-10 w-72 h-32 bg-cyan-500/5 rounded-full blur-[80px]" />
      <div className="absolute top-0 right-1/4 -z-10 w-72 h-32 bg-slate-500/5 rounded-full blur-[80px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 items-start text-left mb-10">
        
        {/* COLUMN 1: BRIEF BRAND ANCHOR */}
        <div className="flex flex-col gap-3">
          <div className="text-xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-200">
            FUGACITY '26
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed tracking-wide">
            The annual technical fest of the Chemical Engineering Department, inviting minds to solve process-control puzzles, operational logic problems, and core industrial challenges.
          </p>
        </div>

        {/* COLUMN 2: QUICK LINK SYSTEM DIRECTORY */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">Navigation</h4>
          <nav className="flex flex-col gap-2 text-[11px] font-medium tracking-wider text-slate-400">
            <a href="/" className="hover:text-cyan-300 transition-colors w-fit">Home</a>
            <a href="/about" className="hover:text-cyan-300 transition-colors w-fit">About</a>
            <a href="/events" className="hover:text-cyan-300 transition-colors w-fit">Events</a>
            <a href="/sponsors" className="hover:text-cyan-300 transition-colors w-fit">Sponsors</a>
            <a href="/teams" className="hover:text-cyan-300 transition-colors w-fit">Meet the Team</a>
          </nav>
        </div>

        {/* COLUMN 3: ORGANIZER CONTACT PATHWAYS */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">Contact Us</h4>
          <div className="flex flex-col gap-2.5 text-[11px] text-slate-400 tracking-wider">
            <p className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">✉</span> 
              <a href="mailto:cheaiitkgp@gmail.com" className="hover:text-cyan-300 transition-colors">cheaiitkgp@gmail.com</a>
            </p>
            <p className="flex items-start gap-2 leading-relaxed">
              <span className="text-cyan-400 font-mono text-sm">📍</span>
              <span>Chemical Engineering Department,<br />Indian Institute of Technology, Kharagpur<br />West Bengal, India - 721302</span>
            </p>
          </div>
        </div>

        {/* COLUMN 4: COMMUNITY ATTACHMENT NETWORKS */}
        <div className="flex flex-col gap-3">
          <h4 className="text-[11px] font-bold text-cyan-400 tracking-widest uppercase">Follow ChEA</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed tracking-wide mb-1">
            Stay connected with the Chemical Engineering Association for updates, timeline schedules, and event results releases.
          </p>
          
          {/* Social Icons Container */}
          <div className="flex items-center gap-3 text-slate-400">
            <a href="https://www.linkedin.com/company/chemical-engineering-association-iit-kharagpur/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-8 h-8 rounded-full border border-slate-800 bg-[#061219]/40 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
               aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/cheaiitkgp/"
               target="_blank"
               rel="noopener noreferrer"
               className="w-8 h-8 rounded-full border border-slate-800 bg-[#061219]/40 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
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
               className="w-8 h-8 rounded-full border border-slate-800 bg-[#061219]/40 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
               aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.36C16.18 4.32 15.1 4.22 13.84 4.22c-2.63 0-4.43 1.6-4.43 4.55V10.5H6.9v3h2.51V21h4.09z" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* LOWER BAR: SUB-FOOTER RECTIFICATION TRACK */}
      <div className="w-full border-t border-slate-800/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] text-slate-500 tracking-widest uppercase">
        <div>
          © 2026 Fugacity. All rights reserved.
        </div>
        <div className="flex gap-6 text-slate-600">
          <span className="hover:text-cyan-500/60 cursor-pointer transition-colors" onClick={() => handleScrollToSection('terms')}>Terms & Conditions</span>
          <span className="hover:text-cyan-500/60 cursor-pointer transition-colors" onClick={() => handleScrollToSection('privacy')}>Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;