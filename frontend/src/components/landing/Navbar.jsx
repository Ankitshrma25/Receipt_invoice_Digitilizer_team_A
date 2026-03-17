import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Docs", href: "#docs" },
  { name: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [active, setActive] = useState("Features");
  const navigate = useNavigate();

  const handleLaunchApp = () => {
    navigate("/login");
  };

  // --- Scroll Spy Logic ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Detects when section is in the upper middle of screen
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Find the link name that matches the section ID
          const link = navLinks.find(l => l.href === `#${entry.target.id}`);
          if (link) setActive(link.name);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Watch each section
    navLinks.forEach((link) => {
      const section = document.querySelector(link.href);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);
  // ------------------------

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-[#030303]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="text-white font-medium tracking-tighter text-xl">DigiDoc</div>
        
        <div className="flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                // Optional: Smooth scroll behavior
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                setActive(link.name);
              }}
              className={`relative text-sm font-medium transition-colors ${
                active === link.name ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {link.name}
              {active === link.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute left-0 top-[22px] h-[2px] w-full bg-blue-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </a>
          ))}
        </div>

        <button 
          className="px-4 py-1.5 bg-zinc-100 text-black text-xs font-bold rounded hover:bg-white transition-all" 
          onClick={handleLaunchApp}
        >
          Launch App
        </button>
      </div>
    </nav>
  );
}