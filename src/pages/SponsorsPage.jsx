
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Users,
  Globe,
  Megaphone,
  Award,
  Mail,
  Sparkles,
  Building2,
  GraduationCap,
  Handshake,
  Phone,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { tiers, partners, contacts, events } from "../data/sponsorsData.js";
import NetworkCanvas from "../components/sponsors/NetworkCanvas.jsx";
import VaporLetter from "../components/sponsors/VaporLetter.jsx";
import SectionHeading from "../components/sponsors/SectionHeading.jsx";
import RevealCard from "../components/sponsors/RevealCard.jsx";
import TierCard from "../components/sponsors/TierCard.jsx";
import MarqueeStrip from "../components/sponsors/MarqueeStrip.jsx";
import SponsorCard from "../components/sponsors/SponsorCard.jsx";
import "./SponsorsPage.css";


const SponsorsPage = () => {
  const [openTier, setOpenTier] = useState(null);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const title = "OUR SPONSORS";

  const toggleTier = useCallback((t) => {
    setOpenTier((p) => (p === t ? null : t));
  }, []);
return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#112733] via-[#0e202b] to-[#09151c] text-white font-sans overflow-x-hidden selection:bg-cyan-500/30 custom-scrollbar">
      <div className="fixed inset-0 z-0 pointer-events-none">
     <NetworkCanvas />
    </div>
      <Navbar />

      {/* ── HERO ───────────────────────────────────────────── */}
      <section
  ref={heroRef}
  className="relative z-10 flex flex-col items-center justify-center pt-28 md:pt-32 pb-6 md:pb-10 px-4 text-center"
>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-3"
        ><span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full
            bg-[#06141c]/90
            border border-[#06d6a0]/60
            text-white text-sm font-bold tracking-widest
            shadow-[0_0_25px_rgba(6,214,160,0.35)]"
          >
          <Sparkles className="w-4 h-4 text-[#06d6a0]" />
                  IIT KHARAGPUR · FUGACITY '26
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-widest mb-3">
          {title.split('').map((ch, i) => <VaporLetter key={i} ch={ch} delay={i * 0.04} />)}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-300 text-sm sm:text-base md:text-lg max-w-xl"
          style={{ letterSpacing: '0.05em' }}
        >
          PARTNERING WITH INNOVATION, EMPOWERING EXCELLENCE
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
              <div className="text-[10px] text-gray-400 tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>
{/* ── WHY PARTNER ─────────────────────────────────────── */}
<section className="relative z-10 py-8 md:py-20 px-4">
  <div className="max-w-6xl mx-auto">
    <SectionHeading>Why Partner With Fugacity?</SectionHeading>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
      {[
        { icon: GraduationCap, val: "IIT KGP", sub: "Premier Institution" },
        { icon: Users, val: "2000+", sub: "Participants" },
        { icon: Sparkles, val: "10+", sub: "Events & Workshops" },
        { icon: Building2, val: "IITs & NITs", sub: "Top Colleges" },
      ].map(({ icon: Icon, val, sub }, i) => (
        <RevealCard
          key={val}
          delay={i * 0.08}
          className="min-h-[145px] rounded-xl border border-[#06d6a0]/45 bg-[#0c2235]/95 backdrop-blur-xl px-5 py-6 text-center flex flex-col items-center justify-center shadow-[0_0_25px_rgba(0,0,0,0.25)] hover:-translate-y-2 hover:border-[#06d6a0] hover:shadow-[0_0_35px_rgba(6,214,160,0.35)] transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-[#06d6a0]/15 border border-[#06d6a0]/35 flex items-center justify-center mb-4">
            <Icon className="w-5 h-5 text-[#06d6a0]"/>
          </div>

          <div className="text-lg font-bold text-white font-display leading-tight">
            {val}
          </div>

          <div className="text-xs text-gray-300 mt-1">
            {sub}
          </div>
        </RevealCard>
      ))}
    </div>
  </div>
</section>
{/* ── SPONSORSHIP BENEFITS ────────────────────────────── */}
<section className="relative z-10 py-6 md:py-10 px-4">
  <div className="max-w-5xl mx-auto">
    <SectionHeading>Sponsorship Benefits</SectionHeading>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {[
        {
          icon: Award,
          title: "Brand Visibility",
          items: [
            "Website logo",
            "Event banners",
            "Standees & backdrops",
            "Merchandise",
          ],
        },
        {
          icon: Globe,
          title: "Digital Presence",
          items: [
            "Social media posts",
            "Dedicated sponsor posts",
            "Website mentions",
            "Company hyperlink",
          ],
        },
        {
          icon: Handshake,
          title: "Direct Engagement",
          items: [
            "Exhibition stalls",
            "Product showcases",
            "Recruitment access",
            "Networking sessions",
          ],
        },
        {
          icon: Megaphone,
          title: "Premium Exposure",
          items: [
            "Naming rights",
            "Video branding",
            "Workshop hosting",
            "Sponsored challenges",
          ],
        },
      ].map(({ icon: Icon, title, items }, i) => (
        <RevealCard
  key={title}
  delay={i * 0.08}
  className="
    group relative overflow-hidden
    min-h-[210px] rounded-2xl p-5
    bg-[#071b26]/90 border border-[#06d6a0]/35
    hover:-translate-y-2 hover:scale-[1.03]
    hover:border-[#06d6a0]
    hover:shadow-[0_0_35px_rgba(6,214,160,0.35)]
    transition-all duration-300
  "
>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#06d6a0]/15 to-transparent transition-opacity duration-300" />

  <div className="relative z-10">
    <div className="w-11 h-11 rounded-xl bg-[#06d6a0]/15 flex items-center justify-center mb-4 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
      <Icon className="w-5 h-5 text-[#06d6a0]" />
    </div>

    <h3 className="text-white font-black text-base mb-3">
      {title}
    </h3>

    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-gray-300 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#06d6a0]" />
          {item}
        </li>
      ))}
    </ul>
  </div>
</RevealCard>
      ))}
    </div>
  </div>
</section>

    {/* Sponsorship Tiers - Pulling Stack */}
<section className="relative z-10 py-10 md:py-20 px-4 md:px-6">
  <div className="max-w-6xl mx-auto text-center mb-8 md:mb-16">
    <SectionHeading>Sponsorship Tiers</SectionHeading>
    <p className="text-gray-300 mt-3">
      Scroll to explore each sponsorship tier.
    </p>
  </div>

  <div className="relative max-w-5xl mx-auto">
    {tiers.map((tier, index) => (
      <div
  key={tier.name}
  className="md:sticky mb-8 md:mb-28"
  style={{
    top: `${110 + index * 18}px`,
    zIndex: index + 10,
  }}
>
        <TierCard
          name={tier.name}
          subtitle={tier.subtitle}
          accentClass={tier.accentClass}
          icon={tier.icon}
          deliverables={tier.deliverables}
          delay={index * 0.05}
        />
      </div>
    ))}
  </div>
</section>
      {/* ── MARQUEE EVENT CARDS ──────────────────────────────── */}
      <section className="relative z-10 py-8 md:py-10 overflow-hidden">
        <div className="max-w-5xl mx-auto mt-8 md:mt-16 space-y-8 md:space-y-24">
          <SectionHeading>Sponsor Individual Events</SectionHeading>
          <p className="text-center text-gray-400 text-xs -mt-4 mb-0 tracking-wide">
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


         <div className="relative min-h-[900px] mb-12 rounded-3xl overflow-hidden border border-[#06d6a0]/15 bg-[#071219]/95 px-4 sm:px-8 md:px-10 py-12 md:py-16">
  <div className="max-w-5xl mx-auto space-y-16 md:space-y-24">
    {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, groupIndex) => {
      const group = partners.slice(groupIndex * 3, groupIndex * 3 + 3);

      return (
        <div key={groupIndex} className="space-y-16 md:space-y-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-28 items-center">
            {group.slice(0, 2).map((sponsor) => (
              <SponsorCard key={sponsor.name} {...sponsor} />
            ))}
          </div>

          {group[2] && (
            <div className="flex justify-center">
              <SponsorCard key={group[2].name} {...group[2]} />
            </div>
          )}
        </div>
      );
    })}
  </div>
</div>
          {/* Let's Collaborate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-8">
            <RevealCard className="flex flex-col gap-4">
              <div className="text-[#06d6a0] text-3xl font-black font-display leading-none">
                FUGA<span className="text-white">CITY</span>
              </div>
              <p className="text-gray-300 text-sm border border-[#06d6a0]/50 bg-[#06d6a0]/5 rounded-xl px-4 py-3">
                We look forward to partnering with you
              </p>
              <div className="text-white text-3xl font-black font-display leading-tight">
                Let's<br />Collaborate
              </div>
            </RevealCard>


           <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contacts.map((c, i) => (
                <RevealCard
                  key={c.name}
                  delay={i * 0.07}
                  className="bg-[#0c2235]/92 backdrop-blur-xl border border-[#06d6a0]/50 rounded-xl p-4"
                >
                  <div className="text-white font-bold text-sm font-display mb-1">{c.name}</div>
                  <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-1">
                    <Phone className="w-3 h-3 text-[#06d6a0]" />{c.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] break-all">
                    <Mail className="w-3 h-3 text-[#06d6a0] flex-shrink-0" />{c.email}
                  </div>
                </RevealCard>
              ))}
            </div>
          </div>


         
        </div>
      </section>


      <Footer />
    </div>
  );
};


export default SponsorsPage;
