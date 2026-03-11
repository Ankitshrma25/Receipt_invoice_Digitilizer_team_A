import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Hero() {

    const navigate = useNavigate();
    const handleGetStarted = () => {
        navigate("/register");
    }

    

  return (
    <section className="relative pt-32 pb-24 px-6 flex flex-col items-center text-center overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10"
      >
        {/* Slim Badge */}
        <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/30 text-zinc-500 text-[10px] tracking-[0.2em] uppercase font-medium mb-10 inline-block">
          Precision Engine v2.0
        </span>

        {/* Smaller, Slimmer Heading - NOT Bold */}
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
          Invoices into data. <br />
          <span className="text-blue-500/80 italic font-light">In seconds.</span>
        </h1>

        {/* Muted, breathable subtext */}
        <p className="max-w-lg mx-auto text-zinc-500 text-base md:text-lg mb-12 font-normal leading-relaxed">
          The high-fidelity OCR layer for automated document parsing. 
          Extract structured JSON from any chaotic source.
        </p>

        {/* Refined Buttons - Smaller and more subtle */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
          <Button 
            className="w-[140px] h-[48px] bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-all hover:scale-105"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
          
          <button 
          className="w-[140px] h-[48px] border border-zinc-800 rounded-md bg-transparent text-zinc-400 text-sm font-medium transition-all hover:bg-zinc-900 hover:text-white hover:border-zinc-700" 
          >
          
            Watch Demo
          </button>
        </div>
      </motion.div>

      {/* Very thin, elegant divider line */}
      <div className="mt-24 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
    </section>
  );
}