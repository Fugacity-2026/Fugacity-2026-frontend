const SponsorCard = ({ name, role, logo }) => (
  <div className="group flex flex-col items-center text-center">

    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 md:mb-8 tracking-wide">
      {role}
    </h3>

    <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-white flex items-center justify-center p-5 md:p-6 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_40px_rgba(6,214,160,0.35)] mb-5">
      <img
        src={logo}
        alt={name}
        className="max-w-full max-h-full object-contain"
      />
    </div>

    <p className="text-base md:text-lg text-slate-300 font-semibold">
      {name}
    </p>

  </div>
);

export default SponsorCard;