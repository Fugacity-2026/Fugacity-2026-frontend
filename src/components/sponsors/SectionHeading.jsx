import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const SectionHeading = ({ children }) => {
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
export default SectionHeading;