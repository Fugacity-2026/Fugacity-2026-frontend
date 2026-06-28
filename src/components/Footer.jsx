import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 w-full border-t border-slate-800/60 bg-[#07131a]/95 backdrop-blur-xl py-6 px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-evenly items-center gap-6">
        {/* Social Links */}
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
        
        {/* Department Info */}
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
  );
};

export default Footer;