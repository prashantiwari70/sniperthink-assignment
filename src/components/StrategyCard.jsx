import { motion } from "framer-motion";

function StrategyCard({ step }) {

  return (

    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:0.15 }}

      whileHover={{ scale:1.015 }}

     className="group relative bg-[#0f172a]/80 backdrop-blur-md 
border border-[#1e293b] p-8 rounded-xl 
shadow-sm transition-all duration-200
hover:bg-[#1e293b] hover:border-indigo-500 
hover:shadow-[0_0_25px_rgba(99,102,241,0.25)]"

    >

      <h3 className="text-indigo-400 text-3xl font-bold mb-3 
      group-hover:text-white">
        {step.id.toString().padStart(2,"0")}
      </h3>

      <h2 className="text-xl font-semibold mb-3 text-white">
        {step.title}
      </h2>

      <p className="text-gray-400 mb-6 group-hover:text-gray-200">
        {step.description}
      </p>

      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("openInterestForm", { detail: step.id })
          )
        }
        className="text-indigo-400 group-hover:text-white font-medium"
      >
        I'm Interested →
      </button>

    </motion.div>

  );
}

export default StrategyCard;