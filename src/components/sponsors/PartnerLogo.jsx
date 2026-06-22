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