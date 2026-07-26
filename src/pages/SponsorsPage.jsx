
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Megaphone,
  Award,
  Mail,
  Sparkles,
  Handshake,
  Phone,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { tiers, partners, contacts, events } from "../data/sponsorsData.js";
import NetworkCanvas from "../components/NetworkCanvas.jsx";
import VaporLetter from "../components/sponsors/Vaporletter.jsx";
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
      
     <NetworkCanvas />
   
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
            border border-[#22d3ee]/60
            text-white text-sm font-bold tracking-widest
            shadow-[0_0_25px_rgba(34,211,238,0.35)]"
          >
          <Sparkles className="w-4 h-4 text-[#22d3ee]" />
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
            
            { val: '15+', label: 'COLLEGESIITs AND NITs)', color: 'text-[#22d3ee]' },
           
            { val: '2000+', label: 'PARTICIPANTS', color: 'text-[#22d3ee]' },
            { val: '20000+', label: 'SOCIAL MEDIA REACH', color: 'text-[#22d3ee]' },
          ].map(({ val, label, color }) => (
            <div key={label} className="text-center">
              <div className={`text-2xl md:text-3xl font-black font-display ${color}`}>{val}</div>
              <div className="text-[10px] text-gray-400 tracking-widest">{label}</div>
            </div>
          ))}
        </motion.div>
      </section>
{/* ── SPONSORSHIP BENEFITS ────────────────────────────── */}
<section className="relative z-10 py-6 md:py-10 px-4">
  <div className="max-w-5xl mx-auto">
    <SectionHeading>Sponsorship Benefits</SectionHeading>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
      {[
        {
  icon: Award,
  number: "10+",
  title: "Brand Visibility",
  items: [
    "Events & Workshops",
    "Website logo",
    "Event banners",
    "Standees & backdrops",
  ],
},
{
  icon: Globe,
  number: "3000+",
  title: "Digital Presence",
  items: [
    "Social media reach",
    "Dedicated sponsor posts",
    "Website mentions",
    "Company hyperlink",
  ],
},
{
  icon: Handshake,
  number: "2000+",
  title: "Direct Engagement",
  items: [
    "Participants",
    "Exhibition stalls",
    "Recruitment access",
    "Networking sessions",
  ],
},
{
  icon: Megaphone,
  number: "250+",
  title: "Premium Exposure",
  items: [
    "Competition attendees",
    "Workshop hosting",
    "Sponsored challenges",
    "Naming rights",
  ],
},
      ].map(({ icon: Icon, number, title, items }, i) => (
        <RevealCard
  key={title}
  delay={i * 0.08}
  className="
    group relative overflow-hidden
    min-h-[210px] rounded-2xl p-5
    bg-[#071b26]/90 border border-[#22d3ee]/35
    hover:-translate-y-2 hover:scale-[1.03]
    hover:border-[#22d3ee]
    hover:shadow-[0_0_35px_rgba(34,211,238,0.35)]
    transition-all duration-300
  "
>
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-[#22d3ee]/15 to-transparent transition-opacity duration-300" />

  <div className="relative z-10">
    <div className="w-11 h-11 rounded-xl bg-[#22d3ee]/15 flex items-center justify-center mb-4 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
      <Icon className="w-5 h-5 text-[#22d3ee]" />
    </div>
    

    <h3 className="text-white font-black text-base mb-3">
      {title}
    </h3>

    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-gray-300 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]" />
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

{/* ── SPONSORSHIP AMOUNTS ───────────────────────────── */}
<section className="relative z-10 py-8 md:py-12 px-4">
  <div className="max-w-7xl mx-auto">

    <SectionHeading>Sponsorship Amounts</SectionHeading>

    <p className="text-center text-gray-400 mt-3 mb-8 text-sm">
  Choose the partnership tier that best aligns with your brand and engagement goals.
</p>

    <div className="grid grid-cols-2 lg:grid-cols-6 gap-5 mt-10">

  {[
  {
    title: "TITLE SPONSOR",
    amount: "₹2 Lakh",
  },
  {
    title: "IN ASSOCIATION WITH",
    amount: "₹1.6 Lakh",
  },
  {
    title: "POWERED BY",
    amount: "₹1.2 Lakh",
  },
  {
    title: "MAJOR SPONSOR",
    amount: "₹80k",
  },
  {
    title: "STRATEGIC PARTNER",
    amount: "₹50k",
  },
  {
    title: "EVENT SPONSOR",
    amount: "₹40k",
  },
].map((item, index) => (
    <RevealCard
  key={item.title}
  delay={index * 0.05}
  className="
    h-36
    rounded-2xl
    border border-[#22d3ee]/35
    bg-[#071b26]/90
    backdrop-blur-xl
    flex flex-col
    items-center
    justify-center
    hover:-translate-y-1
    hover:scale-[1.03]
    hover:border-[#22d3ee]
    hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]
    transition-all duration-300
  "
>

  {/* Sponsorship Tier */}
  <div className="h-12 flex flex-col items-center justify-start">
  <span
    className="
      text-[11px]
      md:text-xs
      uppercase
      tracking-[0.18em]
      text-gray-300
      font-semibold
      text-center
      px-2
      leading-snug
    "
  >
    {item.title}
  </span>

  <div className="w-12 h-[2px] bg-[#22d3ee]/60 rounded-full mt-3"></div>
</div>

<span
  className="
    mt-4
    text-xl
    md:text-2xl
    font-extrabold
    tracking-tight
    text-[#22d3ee]
    leading-none
  "
>
  {item.amount}
</span>

</RevealCard>
  ))}

</div>

    

  </div>
</section>

    {/* Sponsorship Tiers - Pulling Stack */}
<section className="relative z-10 pt-10 pb-2 md:pt-20 md:pb-4 px-4 md:px-6">
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
  className="md:sticky mb-4 md:mb-8"
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
    


      {/* ── OUR PARTNERS & GET IN TOUCH ─────────────────────── */}
      <section className="relative z-10 pt-0 pb-10 px-4">
  <div className="max-w-6xl mx-auto">
    <div className="relative mb-12 rounded-3xl overflow-hidden border border-[#22d3ee]/20 bg-[#071219]/95 px-5 sm:px-8 md:px-10 py-10">
  <div className="space-y-14">
    {Array.from(new Set(partners.map((p) => p.role))).map((role) => (
      <div key={role}>
        <SectionHeading>{role}</SectionHeading>

        <div className="flex justify-center mt-8">
  {partners
    .filter((p) => p.role === role)
    .map((sponsor) => (
      <div
        key={sponsor.name}
        className="group w-full max-w-[700px] rounded-2xl border border-[#22d3ee]/35 bg-[#061823]/90 p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start hover:border-[#22d3ee] hover:shadow-[0_0_35px_rgba(34,211,238,0.28)] transition-all duration-300"
      >
                <div className="w-36 h-36 rounded-xl bg-white flex items-center justify-center p-4 shrink-0">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <div className="text-center sm:text-left flex flex-col h-full">
                  <h3 className="text-xl font-black text-white mb-1">
                    {sponsor.name}
                  </h3>

                  <p className="text-[#22d3ee] text-xs font-bold tracking-widest mb-3">
                    {sponsor.role}{sponsor.year ? ` · ${sponsor.year}` : ""}
                  </p>

                  <p className="text-gray-300 text-sm leading-relaxed mb-6">
                    {sponsor.description}
                  </p>

                  <a
  href={sponsor.website || "#"}
  target="_blank"
  rel="noopener noreferrer"
  onClick={(e) => {
    if (!sponsor.website || sponsor.website === "#") {
      e.preventDefault();
    }
  }}
  className="inline-flex w-fit mx-auto sm:mx-0 mt-auto items-center gap-2 px-5 py-2 rounded-full bg-[#241c4a] border border-[#22d3ee]/40 text-white text-sm font-semibold hover:bg-[#22d3ee] hover:text-[#06141c] transition-all duration-300"
>
  Know More →
</a>
                </div>
              </div>
            ))}
        </div>
      </div>
    ))}
  </div>
       </div>
          {/* Let's Collaborate */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mb-8">
            <RevealCard className="flex flex-col gap-4">
              <div className="text-[#22d3ee] text-3xl font-black font-display leading-none">
                FUGA<span className="text-white">CITY</span>
              </div>
              <p className="text-gray-300 text-sm border border-[#22d3ee]/50 bg-[#22d3ee]/5 rounded-xl px-4 py-3">
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
                  className="bg-[#0c2235]/92 backdrop-blur-xl border border-[#22d3ee]/50 rounded-xl p-4"
                >
                  <div className="text-white font-bold text-sm font-display mb-1">{c.name}</div>
                  <div className="flex items-center gap-1.5 text-gray-300 text-xs mb-1">
                    <Phone className="w-3 h-3 text-[#22d3ee]" />{c.phone}
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] break-all">
                    <Mail className="w-3 h-3 text-[#22d3ee] flex-shrink-0" />{c.email}
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
