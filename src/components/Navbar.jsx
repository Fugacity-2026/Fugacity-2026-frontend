import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (e, destination) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Auto-close menu drawer upon navigation click
    
    // If it's an internal section scroll link (starts with #)
    if (destination.startsWith('#')) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          document.getElementById(destination.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        document.getElementById(destination.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If navigating to an entirely separate page
      navigate(destination);
    }
  };

  return (
    <>
      {/* HEADER MASTER CONTAINER */}
      {/* RESPONSIVE EDIT: Adapted vertical/horizontal padding parameters to stay compact on smaller touch targets */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-[#0b1a24]/85 backdrop-blur-xl border border-cyan-400/28 rounded-full px-4 sm:px-6 py-2 md:py-2.5 flex items-center justify-between shadow-[0_0_30px_rgba(34,211,238,0.15)]">
        
        {/* LOGO LINK */}
        <div 
          onClick={(e) => handleNavigation(e, '#home')} 
          className="text-base sm:text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-200 cursor-pointer select-none"
        >
          FUGACITY
        </div>
        
        {/* DESKTOP NAVIGATION ROW */}
        {/* RESPONSIVE EDIT: Remains safely hidden until md break window triggers horizontal arrangement */}
        <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
          <a href="/" onClick={(e) => handleNavigation(e, '/')} className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="hover:text-cyan-400 transition-colors">About</a>
          <a href="/events" onClick={(e) => handleNavigation(e, '/events')} className="hover:text-cyan-400 transition-colors">Events</a>
          <a href="/sponsors" onClick={(e) => handleNavigation(e, '/sponsors')} className="hover:text-cyan-400 transition-colors">Sponsors</a>
          <a href="/teams" onClick={(e) => handleNavigation(e, '/teams')} className="hover:text-cyan-400 transition-colors">Teams</a>
          <a href="/feedback" onClick={(e) => handleNavigation(e, '/feedback')} className="hover:text-cyan-400 transition-colors">Feedback</a>
        </nav>
        
        {/* RIGHT SIDE CTA ACTIONS BUTTON ROW */}
        <div className="flex items-center gap-3">
          {/* REGISTER ACTION CTA BUTTON */}
          {/* RESPONSIVE EDIT: Scaled typography dynamically to save inline asset space on small mobile headers */}
          <button 
            onClick={(e) => handleNavigation(e, '#register')} 
            className="px-4 sm:px-5 py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-[#09141c] transition-all shadow-[0_0_20px_#22d3ee]"
          >
            Register Now
          </button>

          {/* MOBILE HAMBURGER MENU BUTTON */}
          {/* RESPONSIVE EDIT: Explicitly visible on small viewports and hides automatically on desktop grids */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden flex-col justify-center items-center w-8 h-8 rounded-full border border-cyan-400/30 bg-[#061219]/60 focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <div className="space-y-1.5 w-4">
              <span className={`block h-[1.5px] w-4 bg-cyan-400 transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-44 translate-y-[4.5px]' : ''}`}></span>
              <span className={`block h-[1.5px] w-4 bg-cyan-400 transition-opacity duration-200 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-[1.5px] w-4 bg-cyan-400 transition-transform duration-300 ${isMobileMenuOpen ? 'transform -rotate-44 -translate-y-[4.5px]' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN DROPDOWN OVERLAY PANEL */}
      {/* RESPONSIVE EDIT: Handles slide actions smoothly when clicking the hamburger trigger on phone layout frames */}
      <div 
        className={`fixed inset-x-0 top-20 mx-auto w-[92%] max-w-6xl z-40 md:hidden overflow-hidden glass-panel rounded-2xl border border-cyan-500/30 bg-[#0c1c28]/95 transition-all duration-300 ease-in-out shadow-[0_15px_35px_rgba(6,18,25,0.8)] ${
          isMobileMenuOpen ? 'max-h-[340px] opacity-100 py-5' : 'max-h-0 opacity-0 py-0 pointer-events-none'
        }`}
      >
        <nav className="flex flex-col items-center gap-4 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-300">
          <a href="/" onClick={(e) => handleNavigation(e, '/')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Home</a>
          <a href="/about" onClick={(e) => handleNavigation(e, '/about')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">About</a>
          <a href="/events" onClick={(e) => handleNavigation(e, '/events')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Events</a>
          <a href="/sponsors" onClick={(e) => handleNavigation(e, '/sponsors')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Sponsors</a>
          <a href="/teams" onClick={(e) => handleNavigation(e, '/teams')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Teams</a>
          <a href="/feedback" onClick={(e) => handleNavigation(e, '/feedback')} className="w-full text-center py-2 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all">Feedback</a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;