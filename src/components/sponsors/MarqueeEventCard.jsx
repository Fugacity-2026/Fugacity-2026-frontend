import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Minus, Plus } from "lucide-react";


const MarqueeEventCard = ({ event }) => {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [flash, setFlash] = useState(false);


  const handleFlip = (e) => {
    e.stopPropagation();
    setFlipped((f) => !f);
    setExpanded(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 420);
  };


  return (
    <div className="flex-shrink-0 w-52 relative mx-3" style={{ height: 285, perspective: "900px" }}
        onMouseEnter={() => {
      setFlipped(true);
      setFlash(true);
      setTimeout(() => setFlash(false), 420);
    }}
    onMouseLeave={() => {
      setFlipped(false);
      setExpanded(false);
    }}
>
      {/* Molecular bond flash */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.42 }}
            className="absolute inset-0 z-30 bg-[#06d6a0] rounded-[14px] pointer-events-none"
          />
        )}
      </AnimatePresence>


      <div className={`flip-inner${flipped ? ' flipped' : ''}`}>
        {/* ── FRONT FACE ── */}
        <div className="flip-face overflow-hidden bg-[#071219]">
  <div className="absolute top-8 left-4 right-4 h-[190px] rounded-xl overflow-hidden bg-[#0c2235] flex items-center justify-center">
    <img
      src={event.image}
      alt={event.name}
      className="max-w-full max-h-full object-contain"
      draggable={false}
    />
  </div>

  <div className="absolute inset-0 bg-gradient-to-t from-[#071219] via-[#071219]/20 to-transparent" />
          {/* top badge */}
          <div className="absolute top-2 left-2 right-2 flex justify-end">
            <span className="text-[9px] font-bold tracking-widest bg-[#06d6a0]/20 text-[#06d6a0] border border-[#06d6a0]/30 px-2 py-0.5 rounded-full font-display">
              FUGACITY '26
            </span>
          </div>
          {/* bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <div className="text-white font-bold text-xs leading-tight mb-1 font-display tracking-wide">
              {event.name}
            </div>
           
           
          </div>
        </div>


        {/* ── BACK FACE ── */}
        <div className="flip-face flip-back bg-gradient-to-b from-[#0c2235] to-[#071a26] border border-[#06d6a0]/25 flex flex-col p-3">
          {/* header row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[#06d6a0] font-bold text-[11px] font-display tracking-wider">EVENT SPONSOR</div>
              <div className="text-slate-400 text-[9px]">{event.name}</div>
            </div>
            <div
                className="w-full text-center text-[10px] font-bold font-display bg-[#06d6a0] text-[#071219] py-1.5 rounded-lg tracking-wide"
                 >
                 
            </div>
          </div>


          {/* deliverables */}
          <div className="space-y-2 flex-1">
            <div className="mb-3">
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  {event.tagline}
                </p>
            </div>
            <div className="flex items-start gap-1.5 text-[10px]">
              <CheckCircle2 className="w-3 h-3 text-[#06d6a0] mt-0.5 flex-shrink-0" />
              <span className="text-slate-300 leading-tight">Social media posts with company logo</span>
            </div>
           
            <div className="mt-1">
              <div className="h-px bg-white/10 mb-2" />
              <div className="flex items-center gap-1 text-[9px] text-slate-500 mb-1.5">
                <span className="flex-1">Prize Pool</span>
                <span className="text-amber-400 font-bold">{event.prize}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-slate-500 mb-1">
                <span className="flex-1">Eligibility</span>
                <span className="text-slate-300">{event.eligibility}</span>
              </div>
            </div>
          </div>


          {/* expandable optional add-ons */}
          <div className="border-t border-white/10 pt-2 mt-1">
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
              className="flex items-center justify-between w-full text-[9px] text-slate-400 hover:text-[#06d6a0] transition-colors"
            >
             
              <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                {expanded ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  className="overflow-hidden"
                >
                  <div className="pt-1.5 space-y-1.5">
                    <div className="flex items-start gap-1.5 text-[9px]">
                      <Plus className="w-2.5 h-2.5 text-[#06d6a0]/60 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 leading-tight">Stall or presentation setup (upgrade)</span>
                    </div>
                    <div className="flex items-start gap-1.5 text-[9px]">
                      <Plus className="w-2.5 h-2.5 text-[#06d6a0]/60 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400 leading-tight">Branding through photobooths (upgrade)</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MarqueeEventCard;