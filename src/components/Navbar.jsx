import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, destination) => {
    e.preventDefault();
    
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
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-6xl z-50 bg-[#0b1a24]/85 backdrop-blur-xl border border-cyan-400/28 rounded-full px-6 py-2 flex items-center justify-between shadow-[0_0_30px_rgba(34,211,238,0.15)]">
      <div 
        onClick={(e) => handleNavigation(e, '#home')} 
        className="text-lg font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-slate-200 cursor-pointer"
      >
        FUGACITY
      </div>
      
      <nav className="hidden md:flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-300">
        <a href="#home" onClick={(e) => handleNavigation(e, '#home')} className="hover:text-cyan-400 transition-colors">Home</a>
        <a href="#about" onClick={(e) => handleNavigation(e, '#about')} className="hover:text-cyan-400 transition-colors">About</a>
        <a href="#events" onClick={(e) => handleNavigation(e, '#events')} className="hover:text-cyan-400 transition-colors">Events</a>
        <a
  href="/sponsors"
  onClick={(e) => handleNavigation(e, '/sponsors')}
  className="hover:text-cyan-400 transition-colors"
>
  Sponsors
</a>
        <a href="/teams" onClick={(e) => handleNavigation(e, '/teams')} className="hover:text-cyan-400 transition-colors">Teams</a>
        <a href="/feedback" onClick={(e) => handleNavigation(e, '/feedback')} className="hover:text-cyan-400 transition-colors">Feedback</a>
      </nav>
      
      <button onClick={(e) => handleNavigation(e, '#register')} className="px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-cyan-400 hover:bg-cyan-300 text-[#09141c] transition-all shadow-[0_0_20px_#22d3ee]">
        Register Now
      </button>
    </header>
  );
};

export default Navbar;