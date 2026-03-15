import { motion } from "framer-motion";

function HeroSection() {

  return (

    <section className="bg-black text-white min-h-screen flex flex-col items-center justify-center text-center px-6">

      <motion.h1
        initial={{ opacity:0, y:40 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.7 }}
        className="text-5xl font-bold mb-4"
      >
        SniperThink Strategy Engine
      </motion.h1>

      <motion.p
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:0.3 }}
        className="text-gray-400 text-xl mb-10"
      >
        Smarter Strategy. Faster Decisions.
      </motion.p>

      <motion.div
        animate={{ y:[0,10,0] }}
        transition={{ repeat:Infinity, duration:1.5 }}
        className="text-gray-500"
      >
        ↓
      </motion.div>

    </section>

  );
}

export default HeroSection;