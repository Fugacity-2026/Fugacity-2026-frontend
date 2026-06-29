import React, { useState } from 'react';
import { Sparkles, Users, Quote, Info } from 'lucide-react';

// Change these from "./" to "../components/"
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MolCursor from '../components/MolCursor'; 
import NetworkCanvas from '../components/NetworkCanvas';

import hodphoto from '../assets/events/hod_chemical.png';

export default function AboutPage() {
  // Track hovered associated body information modules
  const [hoveredBody, setHoveredBody] = useState(null);

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
    },
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
    <div className="relative min-h-screen bg-[#0e202b] text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30 flex flex-col">
      
      {/* Dynamic Interactive Cursor Layer */}
      <MolCursor />

      {/* Background Interactive Lattice Network Canvas */}
      <NetworkCanvas />

      {/* NAVIGATION FIXED HEADER */}
      <Navbar />

      {/* CORE WORKSPACE LIMITER CONTAINER (Matches exactly 1400px of home page layout rules) */}
      <main className="relative z-10 w-full max-w-[1400px] mx-auto pt-28 pb-16 px-4 md:px-12 space-y-20 flex-grow">
        
        {/* ASYMMETRIC GRID ROW MAPPED TO EXTREME EQUALIZED HEIGHTS (40% Left Column, 60% Right Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 items-stretch w-full">
          
          {/* ================= LEFT COLUMN: OUR VISION ASSETS (40% Width Layout Node) ================= */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6">
            
            {/* Edge Bleeding Left Bar Header */}
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

            {/* Edge Bleeding Right Bar Header */}
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
                <div className={`w-full transition-all duration-300 ease-out transform ${hoveredBody ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}`}>
                  {hoveredBody ? (
                    <div className="text-left">
                      <div className="flex items-center space-x-1.5 text-cyan-400 font-mono text-[11px] font-bold uppercase tracking-wider mb-0.5">
                        <Info size={11} />
                        <span>{bodiesData[hoveredBody].title}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 font-light leading-tight line-clamp-2">
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
                  <div className="w-28 h-28 rounded-xl bg-[#08151d] border border-slate-700/60 p-1 shadow-lg overflow-hidden flex items-center justify-center">
                    <img 
                        src={hodphoto}
                        alt ="Head of Department"
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                  </div>
                  
                  {/* HOD NAME SPACE SLOT */}
                  <h3 className="text-sm font-bold text-slate-100 tracking-wide mt-3.5">
                    Prof. Sudipto Chakraborty
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

      {/* FOOTER FIXED AT THE BOTTOM */}
      <Footer />
    </div>
  );
}