import { motion } from "framer-motion";

const VaporLetter = ({ ch, delay }) => (
  <motion.span
    initial={{ opacity: 0, filter: "blur(14px)", y: 12 }}
    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
    transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    className="inline-block font-display"
    style={{
      textShadow:
        "0 0 28px rgba(6,214,160,0.65), 0 0 60px rgba(6,214,160,0.3)",
    }}
  >
    {ch === " " ? "\u00A0" : ch}
  </motion.span>
);

export default VaporLetter;