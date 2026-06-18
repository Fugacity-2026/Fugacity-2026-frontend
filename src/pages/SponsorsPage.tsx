import vedanta from "../assets/events/vedanta.png";
import algamitra from "../assets/events/algamitra.png";
import iicu from "../assets/events/iicu.png";
import indianoil from "../assets/events/indianoil.png";
import unstop from "../assets/events/unstop.png";
import group from "../assets/events/group.png";





import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Users,
  Globe,
  Megaphone,
  Award,
  Download,
  Mail,
  Sparkles,
  ChevronDown,
  ChevronLeft,
  Building2,
  GraduationCap,
  Target,
  Zap,
  Trophy,
  Star,
  Handshake,
  Phone,
  CheckCircle2,
  Minus,
  Plus,
} from 'lucide-react';
<div className="bg-red-500 text-white p-8 text-4xl">
  TAILWIND TEST
</div>


/* ─── Network Particle Canvas ─────────────────────────────────────── */
interface Node { x: number; y: number; vx: number; vy: number; r: number; }
const SponsorCard = ({ logo, name, role }: { logo: string; name: string; role: string }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      className="relative pt-12 flex flex-col items-center" // Added flex centering
    >
      {/* Floating Logo: Removed absolute positioning */}
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="z-20 mb-4" // Use margin to separate from the card below
      >
        <div className="w-20 h-20 rounded-full bg-white p-3 shadow-xl flex items-center justify-center">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>


      {/* Card */}
      {/* Card */}
<div className="w-full h-full min-h-[160px] flex flex-col bg-[#0c2235]/70 backdrop-blur-md border border-[#06d6a0]/20 rounded-2xl px-6 pt-10 pb-6 text-center transition-all duration-300 hover:border-[#06d6a0] hover:shadow-[0_0_30px_rgba(6,214,160,0.35)]">
  <div className="flex-grow flex flex-col justify-center">
    <h3 className="text-white font-bold font-display tracking-wide">{name}</h3>
    <p className="text-[#06d6a0] text-sm mt-2">{role}</p>
  </div>
</div>
    </motion.div>
  );
};
const NetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>();
  const mouse = useRef({ x: -1000, y: -1000, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize nodes
    nodesRef.current = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodes = nodesRef.current;
      const m = mouse.current;

      nodes.forEach((n) => {
        // 1. Repulsion Logic
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < m.radius) {
          const force = (m.radius - dist) / m.radius;
          n.x += (dx / dist) * force * 1.5; 
          n.y += (dy / dist) * force * 1.5;
        }

        // 2. Normal Movement
        n.x += n.vx; n.y += n.vy;
        
        // 3. Boundary Wrap-around (keeps them from disappearing)
        if (n.x < 0) n.x = canvas.width;
        if (n.x > canvas.width) n.x = 0;
        if (n.y < 0) n.y = canvas.height;
        if (n.y > canvas.height) n.y = 0;
      });

      // 4. Draw Lines
      for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[j].x - nodes[i].x;
    const dy = nodes[j].y - nodes[i].y;
    const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.beginPath();
            const opacity = (1 - d / 200) * 0.25;
            ctx.strokeStyle = `rgba(6,214,160,${(1 - d / 140) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // 5. Draw Bubbles
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6,214,160,0.7)'; 
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current!);
    };
  }, []);

  return (
  <canvas 
  ref={canvasRef} 
  className="fixed inset-0 pointer-events-none z-0 bg-[#071219]" 
/>
);
};


/* ─── Vapor Title Letter ───────────────────────────────────────────── */
const VaporLetter = ({ ch, delay }: { ch: string; delay: number }) => (
  <motion.span
    initial={{ opacity: 0, filter: 'blur(14px)', y: 12 }}
    animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
    transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    className="inline-block font-display"
    style={{ textShadow: '0 0 28px rgba(6,214,160,0.65), 0 0 60px rgba(6,214,160,0.3)' }}
  >
    {ch === ' ' ? '\u00A0' : ch}
  </motion.span>
);


/* ─── Section Heading ──────────────────────────────────────────────── */
const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55 }}
      className="relative text-2xl md:text-3xl font-bold tracking-widest text-white uppercase text-center mb-8 font-display"
      style={{ letterSpacing: '0.18em' }}
    >
      <motion.span
        className="absolute inset-x-0 -inset-y-2 bg-[#06d6a0]/10 blur-2xl rounded-full"
        animate={inView ? { opacity: [0.4, 0.8, 0.4] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <span className="relative z-10" style={{ textShadow: '0 0 18px rgba(6,214,160,0.55)' }}>
        {children}
      </span>
      <div className="mt-3 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#06d6a0]/60" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#06d6a0]" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#06d6a0]/60" />
      </div>
    </motion.h2>
  );
};


/* ─── RevealCard ───────────────────────────────────────────────────── */
const RevealCard = ({
  children, delay = 0, className = '',
}: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >{children}</motion.div>
  );
};


/* ─── Exothermic Button ────────────────────────────────────────────── */
const ExothermicButton = ({
  children, variant = 'primary', onClick, className = '',
}: { children: React.ReactNode; variant?: 'primary' | 'ghost'; onClick?: () => void; className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-sm tracking-wide flex items-center gap-2 transition-all duration-300 font-display ${
      variant === 'primary'
        ? 'bg-[#06d6a0] text-[#071219] shadow-lg shadow-[#06d6a0]/25'
        : 'border border-[#06d6a0]/40 text-[#06d6a0] hover:bg-[#06d6a0]/10'
    } ${className}`}
  >
    <motion.div
      className={`absolute inset-0 ${variant === 'primary' ? 'bg-white/20' : 'bg-[#06d6a0]/10'}`}
      animate={{ scale: [1, 1.04, 1], opacity: [0.1, 0.25, 0.1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);


/* ─── Sponsor Tier Accordion Card ──────────────────────────────────── */
type DeliverableRow = { label: string; value: 'yes' | 'optional' | string | null };


const TierCard = ({
  name, subtitle, accentClass, icon: Icon, deliverables, open, onToggle, delay,
}: {
  name: string; subtitle: string; accentClass: string; icon: React.ElementType;
  deliverables: DeliverableRow[]; open: boolean; onToggle: () => void; delay: number;
}) => (
  <RevealCard delay={delay} className="rounded-xl overflow-hidden border border-white/10 bg-[#0c2235]/60 backdrop-blur-md">
    <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 text-left group">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${accentClass}`}>
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="font-bold text-white text-sm tracking-wide font-display">{name}</div>
          <div className="text-xs text-slate-400">{subtitle}</div>
        </div>
      </div>
      <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#06d6a0] transition-colors" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 border-t border-white/10 pt-4 space-y-2">
            {deliverables.map((d, i) => (
              <motion.div key={i} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.04 }} className="flex items-start gap-3 text-sm">
                {d.value === 'yes' && <CheckCircle2 className="w-4 h-4 text-[#06d6a0] mt-0.5 flex-shrink-0" />}
                {d.value === 'optional' && <Minus className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />}
                {d.value === null && <Minus className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />}
                {d.value !== 'yes' && d.value !== 'optional' && d.value !== null && (
                  <CheckCircle2 className="w-4 h-4 text-[#06d6a0] mt-0.5 flex-shrink-0" />
                )}
                <span className="text-slate-300 leading-snug">
                  {d.label}
                  {typeof d.value === 'string' && d.value !== 'yes' && d.value !== 'optional' && (
                    <span className="text-[#06d6a0] ml-1">— {d.value}</span>
                  )}
                  {d.value === 'optional' && <span className="text-amber-400 ml-1">(Optional)</span>}
                  {d.value === null && <span className="text-slate-600 ml-1">(Not included)</span>}
                </span>
              </motion.div>
            ))}
            <div className="pt-3">
             
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </RevealCard>
);


/* ─── Marquee Event Card ────────────────────────────────────────────── */
interface EventData {
  name: string;
  tagline: string;
  image: string;
  prize: string;
  eligibility: string;
  platform: string;
}


const MarqueeEventCard = ({ event }: { event: EventData }) => {
  const [flipped, setFlipped] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [flash, setFlash] = useState(false);


  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFlipped((f) => !f);
    setExpanded(false);
    setFlash(true);
    setTimeout(() => setFlash(false), 420);
  };


  return (
    <div className="flex-shrink-0 w-44 relative mx-2" style={{ height: 268, perspective: '900px' }}
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
        <div className="flip-face overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071219] via-[#071219]/40 to-transparent" />
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


/* ─── Marquee Strip ────────────────────────────────────────────────── */
const MarqueeStrip = ({ events }: { events: EventData[] }) => {
  const doubled = [...events, ...events];
  return (
    <div className="marquee-container overflow-hidden py-2">
      <div className="marquee-track gap-0">
        {doubled.map((ev, i) => (
          <MarqueeEventCard key={`${ev.name}-${i}`} event={ev} />
        ))}
      </div>
    </div>
  );
};


/* ─── Partner Logo ─────────────────────────────────────────────────── */
const PartnerLogo = ({
  name,
  role,
  roleColor,
  logo,
  delay,
}: {
  name: string;
  role: string;
  roleColor: string;
  logo: string;
  delay: number;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <RevealCard delay={delay} className="border border-white/10 bg-[#0c2235]/60 backdrop-blur-md rounded-xl p-5 flex flex-col items-center gap-3">
      <motion.div
         animate={{
         scale: hovered ? 1.1 : 1,
         rotate: hovered ? 5 : 0,
        }}
        transition={{ duration: 0.4 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer p-2"
        >
        <img
         src={logo}
        alt={name}
        className="w-full h-full object-contain"
        />
      </motion.div>
      <div className="text-center">
        <div className="text-white font-bold tracking-wider text-sm font-display">{name}</div>
        <div className={`text-xs font-medium ${roleColor}`}>{role}</div>
      </div>
    </RevealCard>
  );
};


/* ─── Main Page ────────────────────────────────────────────────────── */
const SponsorsPage = () => {
  const [openTier, setOpenTier] = useState<string | null>(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const title = 'OUR SPONSORS';
  const toggleTier = useCallback((t: string) => setOpenTier((p) => (p === t ? null : t)), []);


  const tiers = [
    {
      name: 'Title Sponsor', subtitle: 'Premier Partnership', accentClass: 'bg-slate-200/10 text-slate-200', icon: Trophy,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At multiple hotspot zones' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In all the Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ] as DeliverableRow[],
    },
    {
      name: 'In Association With', subtitle: 'Co-title Partner', accentClass: 'bg-cyan-500/10 text-cyan-300', icon: Handshake,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At any one hotspot zone' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In multiple Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ] as DeliverableRow[],
    },
    {
      name: 'Powered By', subtitle: 'Technology Partner', accentClass: 'bg-amber-500/10 text-amber-400', icon: Zap,
      deliverables: [
        { label: 'Branding through photobooths', value: 'At any one hotspot zone' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'yes' },
        { label: 'Special Association with Fugacity', value: 'yes' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In one Hotspot zone' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'yes' },
        { label: 'Branding through distribution of exclusive company merch', value: 'yes' },
      ] as DeliverableRow[],
    },
    {
      name: 'Major Sponsor', subtitle: 'Key Supporter', accentClass: 'bg-gray-400/10 text-gray-300', icon: Star,
      deliverables: [
        { label: 'Branding through photobooths', value: 'optional' },
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: null },
       
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'yes' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
        { label: "Hyperlink to company's website on fugacity's website", value: 'optional' },
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] as DeliverableRow[],
    },
    {
      name: 'Strategic Sponsor', subtitle: 'Industry Partner', accentClass: 'bg-teal-500/10 text-teal-400', icon: Target,
      deliverables: [
       
        { label: 'Stall or presentation setup', value: 'yes' },
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'optional' },
       
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'optional' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
       
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] as DeliverableRow[],
    },
    {
      name: 'Event Sponsor', subtitle: 'Event Specific Support', accentClass: 'bg-orange-700/10 text-orange-400', icon: Sparkles,
      deliverables: [
       
        { label: 'Social media posts having company\'s logo', value: 'yes' },
        { label: 'Specific social media post regarding company\'s association', value: 'optional' },
        { label: 'Logo on backdrops of all events', value: 'yes' },
        { label: 'Branding through standees and banners', value: 'In specific Hotspot zones' },
        { label: 'Video branding at strategic locations', value: 'optional' },
        { label: 'Logo interaction of fugacity website', value: 'yes' },
       
        { label: 'Branding through distribution of exclusive company merch', value: 'optional' },
      ] as DeliverableRow[],
    },
  ];


  const events: EventData[] = [
   
    {
      name: 'OptimiseIT',
      tagline: 'Think. Analyze. Innovate. Crack real-world cases',
      image: 'src/assets/events/OptimiseIT.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'QuizBowl',
      tagline: 'Fast quiz testing real-life knowledge & problem-solving',
      image: 'src/assets/events/Quizbowl.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Code The Problem',
      tagline: 'Think smart. Code fast. Solve engineering problems',
      image: 'src/assets/events/Code The Problem.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'HackerRank',
    },
    {
      name: 'Chem-e-Reel',
      tagline: 'Turn science into stories. Engage through reels',
      image: 'src/assets/events/Chem-E-Reel.png',
      prize: '₹10,000+', eligibility: 'UG & PG', platform: 'Unstop',
    },
    {
      name: 'Aspen Workshop',
      tagline: 'Hands-on Aspen Plus process simulation & design',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      prize: 'Free Entry', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Reverse Brainstorming',
      tagline: 'Creative problem-solving by exploring what goes wrong',
      image: 'src/assets/events/Reverse BrainStorming.png',
      prize: '₹15,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Photography Challenge',
      tagline: 'Capture creativity through everyday moments',
      image: 'src/assets/events/Photography Challenge.png',
      prize: '₹10,000+ And Exciting Goodies', eligibility: 'UG & PG', platform: 'Online',
    },
    {
      name: 'Chem-Meme Challenge',
      tagline: 'Turn scientific concepts into relatable humor',
      image: 'src/assets/events/Chem-Meme Challenge.png',
      prize: '₹8,000+', eligibility: 'Open', platform: 'Online',
    },
    {
      name: 'Chem-Engage',
      tagline: 'Interactive event fostering engagement through challenges',
      image: 'src/assets/events/Chem Engage.png',
      prize: '₹10,000+', eligibility: 'UG & PG', platform: 'On-site',
    },
    {
      name: 'Chem-Intelligence',
      tagline: 'Analytical thinking and problem-solving through tasks',
      image: 'src/assets/events/Chem Intillegence.png',
      prize: 'Win Prizes', eligibility: 'UG & PG', platform: 'On-site',
    },
  ];


  const contacts = [
    { name: 'Yug Birla', phone: '+91 9303903529', email: 'yug.cheaiitkgp@gmail.com' },
    { name: 'Nikita Ameriya', phone: '+91 8112289524', email: 'nikitaameriya.cheaiitkgp@gmail.com' },
    { name: 'Yeshfeen Fatima', phone: '+91 8467950818', email: 'yeshfeen.cheaiitkgp@gmail.com' },
    { name: 'Sundram Kumar', phone: '+91 7070038511', email: 'sundram.cheaiitkgp@gmail.com' },
  ];


  return (
    <div
  className="min-h-screen text-slate-100 overflow-x-hidden custom-scrollbar relative"
  style={{ 
    background: 'linear-gradient(to bottom, #112733 0%, #0e202b 50%, #09151c 100%)', 
    fontFamily: "'Inter', sans-serif" 
  }}
>
      <NetworkCanvas />


      {/* ── HERO ───────────────────────────────────────────── */}
      <section ref={heroRef} className="relative z-10 flex flex-col items-center justify-center pt-14 pb-10 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06d6a0]/10 border border-[#06d6a0]/30 text-[#06d6a0] text-xs font-medium tracking-widest uppercase font-display">
            <Sparkles className="w-3.5 h-3.5" />
            IIT Kharagpur · Fugacity '26
          </span>
        </motion.div>
        <h1 className="text-5xl md:text-7xl font-black tracking-widest mb-3">
          {title.split('').map((ch, i) => <VaporLetter key={i} ch={ch} delay={i * 0.04} />)}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-slate-400 text-base md:text-lg max-w-xl"
          style={{ letterSpacing: '0.05em' }}
        >
          WHERE CHEMICAL INGENUITY MEETS KINETIC ENERGY
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {[
            { val: '10+', label: 'EVENTS', color: 'text-[#06d6a0]' },
            { val: '30+', label: 'COLLEGES', color: 'text-[#06d6a0]' },
           
            { val: '2000+', label: 'PARTICIPANTS', color: 'text-[#06d6a0]' },
          ].map(({ val, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-2xl md:text-3xl font-black font-display ${color}`}>{val}</div>
              <div className="text-[10px] text-slate-400 tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>


      {/* ── WHY PARTNER ─────────────────────────────────────── */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Why Partner With Fugacity?</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: GraduationCap, val: 'IIT KGP', sub: 'Premier Institution' },
              { icon: Users, val: '2000+', sub: 'Participants' },
              { icon: Sparkles, val: '10+', sub: 'Events & Workshops' },
              { icon: Building2, val: 'IITs & NITs', sub: 'Top Colleges' },
            ].map(({ icon: Icon, val, sub }, i) => (
              <RevealCard key={val} delay={i * 0.08} className="bg-[#06d6a0]/5 border border-[#06d6a0]/15 rounded-xl p-4 text-center">
                <Icon className="w-7 h-7 text-[#06d6a0] mx-auto mb-2" />
                <div className="text-lg font-black text-white font-display">{val}</div>
                <div className="text-xs text-slate-400">{sub}</div>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>


      {/* ── SPONSORSHIP BENEFITS ────────────────────────────── */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Sponsorship Benefits</SectionHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Award, title: 'Brand Visibility', items: ['Website logo', 'Event banners', 'Standees & backdrops', 'Merchandise'] },
              { icon: Globe, title: 'Digital Presence', items: ['Social media posts', 'Dedicated sponsor posts', 'Website mentions', 'Company hyperlink'] },
              { icon: Handshake, title: 'Direct Engagement', items: ['Exhibition stalls', 'Product showcases', 'Recruitment access', 'Networking sessions'] },
              { icon: Megaphone, title: 'Premium Exposure', items: ['Naming rights', 'Video branding', 'Workshop hosting', 'Sponsored challenges'] },
            ].map(({ icon: Icon, title, items }, i) => (
              <RevealCard key={title} delay={i * 0.08} className="bg-[#0c2235]/60 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="w-9 h-9 rounded-lg bg-[#06d6a0]/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#06d6a0]" />
                </div>
                <div className="text-white font-bold text-sm mb-2 font-display">{title}</div>
                <ul className="space-y-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <div className="w-1 h-1 rounded-full bg-[#06d6a0]/60 flex-shrink-0" />{item}
                    </li>
                  ))}
                </ul>
              </RevealCard>
            ))}
          </div>
        </div>
      </section>


      {/* ── SPONSORSHIP OPPORTUNITIES ────────────────────────── */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Sponsorship Opportunities</SectionHeading>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <TierCard key={tier.name} {...tier} open={openTier === tier.name} onToggle={() => toggleTier(tier.name)} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>


      {/* ── MARQUEE EVENT CARDS ──────────────────────────────── */}
      <section className="relative z-10 py-10">
        <div className="max-w-5xl mx-auto px-4 mb-6">
          <SectionHeading>Sponsor Individual Events</SectionHeading>
          <p className="text-center text-slate-500 text-xs -mt-4 mb-0 tracking-wide">
            Hover over a card to reveal Event Sponsor deliverables ·
          </p>
        </div>
        {/* fade edges */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[#0e202b] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[#0e202b] to-transparent pointer-events-none" />
          <MarqueeStrip events={events} />
        </div>
      </section>


      {/* ── OUR PARTNERS & GET IN TOUCH ─────────────────────── */}
      <section className="relative z-10 py-10 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Our Catalysts</SectionHeading>
          <p className="text-center text-slate-500 text-xs -mt-4 mb-6 tracking-wide">
            The catalysts powering Fugacity's reactions
          </p>


          <div className="relative h-[700px] mb-12 rounded-3xl overflow-hidden border border-[#06d6a0]/15 bg-[#071219]/70">
            {/* Chemical bonds */}


{[...Array(15)].map((_, i) => (
  <motion.div
    key={i}
    className="absolute w-2 h-2 rounded-full bg-[#06d6a0]/30"
    initial={{
      x: Math.random() * 1000,
      y: 500,
    }}
    animate={{
      y: -50,
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      repeat: Infinity,
      delay: Math.random() * 5,
    }}
  />
))}




<div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
  <SponsorCard
    logo={vedanta}
    name="VEDANTA"
    role="Title Sponsor"
  />


  <SponsorCard
    logo={algamitra}
    name="ALGAMITRA"
    role="Powered By"
  />


  <SponsorCard
    logo={indianoil}
    name="INDIAN OIL"
    role="Industry Partner"
  />


  <SponsorCard
    logo={iicu}
    name="Indian Institute of Chemical Engineers"
    role="Knowledge Partner"
  />


  <SponsorCard
    logo={unstop}
    name="UNSTOP"
    role="Platform Partner"
  />
  <SponsorCard
    logo={group}
    name="Navin Fluorine International"
    role="Previous Sponsors"
  />
</div>
</div>
          {/* Let's Collaborate */}
          <div className="grid md:grid-cols-3 gap-6 items-start mb-8">
            <RevealCard className="flex flex-col gap-4">
              <div className="text-[#06d6a0] text-3xl font-black font-display leading-none">
                FUGA<span className="text-white">CITY</span>
              </div>
              <p className="text-slate-400 text-sm border border-[#06d6a0]/20 bg-[#06d6a0]/5 rounded-xl px-4 py-3">
                We look forward to partnering with you
              </p>
              <div className="text-white text-3xl font-black font-display leading-tight">
                Let's<br />Collaborate
              </div>
            </RevealCard>


            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {contacts.map((c, i) => (
                <RevealCard
                  key={c.name}
                  delay={i * 0.07}
                  className="bg-[#0c2235]/60 border border-[#06d6a0]/20 rounded-xl p-4"
                >
                  <div className="text-white font-bold text-sm font-display mb-1">{c.name}</div>
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs mb-1">
                    <Phone className="w-3 h-3 text-[#06d6a0]" />{c.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] break-all">
                    <Mail className="w-3 h-3 text-[#06d6a0] flex-shrink-0" />{c.email}
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>


         
        </div>
      </section>


      <footer className="relative z-10 py-6 px-4 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs tracking-widest uppercase font-display">
          Fugacity '26 · IIT Kharagpur · Annual Chemical Engineering Festival
        </p>
      </footer>
    </div>
  );
};


export default SponsorsPage;
