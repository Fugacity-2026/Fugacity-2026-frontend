import { motion } from "framer-motion";
import { CheckCircle2, Minus } from "lucide-react";

const TierCard = ({ name, subtitle, accentClass, icon: Icon, deliverables }) => {
  return (
    <motion.div
      initial={{ scale: 0.92, y: 80, opacity: 0 }}
      whileInView={{ scale: 1, y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.45 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-auto md:min-h-[520px] rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-[#0c2235]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
    >
      <div className="text-center px-8 pt-10 pb-8 border-b border-white/10">
        <div
          className={`mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center ${accentClass}`}
        >
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-display">
          {name}
        </h3>

        <p className="text-slate-400 mt-3 text-lg">{subtitle}</p>
      </div>

      <div className="px-5 md:px-8 py-6 md:py-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliverables.map((d, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            {d.value === "optional" || d.value === null ? (
              <Minus className="w-4 h-4 text-amber-400 mt-1 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#06d6a0] mt-1 flex-shrink-0" />
            )}

            <span className="text-slate-300 leading-relaxed">
              {d.label}

              {typeof d.value === "string" &&
                d.value !== "yes" &&
                d.value !== "optional" && (
                  <span className="text-[#06d6a0] ml-1">— {d.value}</span>
                )}

              {d.value === "optional" && (
                <span className="text-amber-400 ml-1">(Optional)</span>
              )}

              {d.value === null && (
                <span className="text-slate-600 ml-1">(Not included)</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TierCard;