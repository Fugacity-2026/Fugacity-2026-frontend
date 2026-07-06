import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Building2, Globe, Users, Info, } from 'lucide-react';

// Change these from "./" to "../components/"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MolCursor from '../components/MolCursor'; 
import NetworkCanvas from '../components/NetworkCanvas';
import ParticleText from '../components/ParticleText';



export default function AboutPage() {
  const navigate = useNavigate();

  const [hoveredBody, setHoveredBody] = useState(null);
  const [activeBody, setActiveBody] = useState(null);

  const handleCategoryNavigation = (category) => {
    navigate(`/events?category=${encodeURIComponent(category)}#past-years`);
  };

  const bodiesData = {
    kgp: {
      title: "Indian Institute of Technology Kharagpur",
      info: "Indian Institute of Technology Kharagpur (IIT Kharagpur) is a public technical university established by the government of India in Kharagpur, West Bengal. Established in 1951, it is the first of the IITs and is recognised as an Institute of National Importance. In 2019 it was awarded the status of Institute of Eminence by the government of India.",
      link: "https://www.iitkgp.ac.in/",
      logoPlaceholder: "IITK"
    },
    chea: {
      title: "Chemical Engineering Association, IIT Kharagpur",
      info: "Chemical Engineering Association (ChEA-IITKGP) is the official student body of the Department of Chemical Engineering, IIT Kharagpur. The association coordinates academic activities, technical events, and student initiatives in areas such as pollution control, transport processes, petroleum technology, and membrane processes.",
      link: "https://www.facebook.com/cheaiitkgp",
      logoPlaceholder: "ChEA"
    },
    dept: {
      title: "Chemical Engineering Department",
      info: "The Department of Chemical Engineering at IIT Kharagpur stands as a historical leader in technical research, sustainable systems optimization, and core process engineering curricula since its inception.",
      link: "https://www.iitkgp.ac.in/department/CH",
      logoPlaceholder: "CHED",
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0e202b] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 flex flex-col">
      
      <MolCursor />

      <NetworkCanvas />

      <Navbar />

      <main className="relative z-10 w-full max-w-[1400px] mx-auto pt-28 pb-16 px-4 md:px-12 space-y-16 flex-grow">
        
        {/* ================= SECTION 1: ABOUT US (FIXED LAYER COLLISION & GLASS CARD LAYOUT) ================= */}
        <section className="relative w-full z-10">
          
          <div className="relative h-14 flex items-center w-full max-w-[50%] mb-8">
            <div 
              style={{
                background: 'linear-gradient(90deg, rgba(34, 211, 238, 0.25) 0%, rgba(22, 54, 71, 0.98) 75%, rgba(14, 32, 43, 0) 100%)',
                borderLeft: '5px solid #22d3ee'
              }}
              className="absolute top-0 bottom-0 left-[-100vw] right-0 rounded-r-xl border-t border-b border-cyan-400/20"
            />
            <div className="relative z-20 pl-5 flex items-center space-x-3 text-cyan-400 font-mono">
              <Sparkles size={18} className="animate-pulse" />
              <h2 className="text-sm md:text-base uppercase tracking-[0.25em] font-black drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">
                About Us
              </h2>
            </div>
          </div>

          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative">
            
            <div className="w-full lg:w-[45%] bg-[#132936]/25 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6 md:p-8 shadow-2xl z-20 space-y-6">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white leading-[1.15]">
                A vibrant fest for learning, innovation and networking.
              </h3>
              
              <div className="space-y-4">
                <p className="text-base md:text-[16px] text-slate-200 font-normal leading-relaxed tracking-wide text-justify">
                  Fugacity is the annual departmental fest of the Department of Chemical Engineering at IIT Kharagpur, organised by the Chemical Engineering Association (ChEA). Each year the fest brings together over 1,500 participants from premier institutes across India for workshops, competitions, guest lectures, and industry networking.
                </p>
                <p className="text-base md:text-[16px] text-slate-200 font-normal leading-relaxed tracking-wide text-justify">
                  Our mission is to foster innovation, collaboration, and professional growth through hands-on experiences and expert-led sessions that bridge academia and industry.
                </p>
              </div>
            </div>

            <div className="w-full lg:w-[55%] h-[480px] flex items-center justify-center z-10 lg:-mt-12">
              <div className="w-full h-full flex items-center justify-center">
                <ParticleText />
              </div>
            </div>

          </div>
        </section>

          <section className="relative w-full z-20 mt-16">
      
              <div className="relative h-14 flex items-center w-full max-w-[50%] mb-12 ml-auto justify-end">
                <div 
                  style={{
                    background: 'linear-gradient(270deg, rgba(34, 211, 238, 0.25) 0%, rgba(22, 54, 71, 0.98) 75%, rgba(14, 32, 43, 0) 100%)',
                    borderRight: '5px solid #22d3ee'
                  }}
                  className="absolute top-0 bottom-0 left-0 right-[-100vw] rounded-l-xl border-t border-b border-cyan-400/20"
                />
                <div className="relative z-20 pr-5 flex items-center space-x-3 text-cyan-400 font-mono">
                  <Building2 size={18} className="animate-pulse" />
                  <h2 className="text-sm md:text-base uppercase tracking-[0.25em] font-black drop-shadow-[0_2px_10px_rgba(34,211,238,0.3)]">
                    Associated Bodies
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4">
                
                <div 
                  onMouseEnter={() => setActiveBody('kgp')}
                  onMouseLeave={() => setActiveBody(null)}
                  onClick={() => window.open(bodiesData.kgp.link, '_blank', 'noopener,noreferrer')} // 🚀 CLICK TO LINK
                  className="group cursor-pointer bg-[#132936]/15 backdrop-blur-sm border border-white-800/40 hover:border-cyan-500/100 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  {/* Rounded Corner Square Image Container */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-slate-700/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <img 
                      src="https://tse4.mm.bing.net/th/id/OIP.hr5cI_EuutsBU9Km13LJhgAAAA?r=0&w=350&h=350&rs=1&pid=ImgDetMain&o=7&rm=3" 
                      alt="IIT Kharagpur Logo" 
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                  <span className="text-sm md:text-base font-bold text-slate-300 group-hover:text-white transition-colors duration-200 tracking-wide text-center">
                    {bodiesData.kgp.title}
                  </span>
                </div>

                <div 
                  onMouseEnter={() => setActiveBody('chea')}
                  onMouseLeave={() => setActiveBody(null)}
                  className="group cursor-pointer bg-[#132936]/15 backdrop-blur-sm border border-white-800/40 hover:border-cyan-500/100 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  {/* Rounded Corner Square Image Container */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#0e202b] border border-slate-700/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <img 
                      src="https://avatars.githubusercontent.com/u/156908338?s=280&v=4" 
                      alt="ChEA Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm md:text-base font-bold text-slate-300 group-hover:text-white transition-colors duration-200 tracking-wide text-center">
                    {bodiesData.chea.title}
                  </span>
                </div>

                <div 
                  onMouseEnter={() => setActiveBody('dept')}
                  onMouseLeave={() => setActiveBody(null)}
                  onClick={() => window.open(bodiesData.dept.link, '_blank', 'noopener,noreferrer')} // 🚀 CLICK TO LINK
                  className="group cursor-pointer bg-[#132936]/15 backdrop-blur-sm border border-white-800/40 hover:border-cyan-500/100 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                >
                  {/* Rounded Corner Square Image Container */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden relative border border-slate-700/50 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                    <img 
                      src="https://www.iitkgp.ac.in/abhijnana/202410/assets/images/p5/06.jpg" 
                      alt="Chemical Engineering Department Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-sm md:text-base font-bold text-slate-300 group-hover:text-white transition-colors duration-200 tracking-wide text-center">
                    {bodiesData.dept.title}
                  </span>
                </div>

              </div>

              <div className="w-full max-w-4xl mx-auto mt-8 px-4 h-28 flex items-center justify-center transition-all duration-300">
                <div className={`w-full p-5 rounded-xl border transition-all duration-300 flex items-center space-x-4 ${
                  activeBody 
                    ? 'bg-[#132936]/30 backdrop-blur-md border-cyan-500/20 opacity-100 scale-100 translate-y-0' 
                    : 'bg-transparent border-transparent opacity-0 scale-95 translate-y-2 pointer-events-none'
                }`}>
                  {activeBody && (
                    <>
                      <Globe size={24} className="text-cyan-400 animate-pulse flex-shrink-0" />
                      <p className="text-base md:text-lg text-slate-200 font-medium tracking-wide leading-relaxed text-justify">
                        {bodiesData[activeBody].info}
                      </p>
                    </>
                  )}
                </div>
              </div>

          </section>
 
        {/* ================= SECTION 3: CORE EVENT MATRIX (NOW AT THE BOTTOM) ================= */}
        <section className="w-full space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div
              onMouseEnter={() => setHoveredBody('workshops')}
              onMouseLeave={() => setHoveredBody(null)}
              onClick={() => handleCategoryNavigation('Workshop')}
              className="h-28 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
            >
              <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">WORKSHOPS & GUEST LECTURES</h4>
            </div>

            <div
              onMouseEnter={() => setHoveredBody('competitions')}
              onMouseLeave={() => setHoveredBody(null)}
              onClick={() => handleCategoryNavigation('Coding')}
              className="h-28 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
            >
              <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">TECHNICAL COMPETITIONS</h4>
            </div>

            <div
              onMouseEnter={() => setHoveredBody('industry')}
              onMouseLeave={() => setHoveredBody(null)}
              onClick={() => handleCategoryNavigation('Strategy')}
              className="h-28 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
            >
              <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">CASE STUDIES COMPETITIONS</h4>
            </div>

            <div
              onMouseEnter={() => setHoveredBody('fun')}
              onMouseLeave={() => setHoveredBody(null)}
              onClick={() => handleCategoryNavigation('Quiz')}
              className="h-28 rounded-2xl bg-[#163f49]/40 border border-slate-700/30 flex items-center justify-center text-center p-4 transition-transform duration-200 transform ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(34,211,238,0.18)] hover:ring-4 hover:ring-cyan-400/20 cursor-pointer"
            >
              <h4 className="text-sm sm:text-[14px] font-mono font-extrabold uppercase tracking-[0.18em] leading-tight text-slate-100">FUN EVENTS & QUIZZES</h4>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}