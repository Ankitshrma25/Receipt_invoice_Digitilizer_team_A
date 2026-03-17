import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import FeatureBento from "../components/landing/FeatureBento";
import BackgroundGrid from "../components/landing/BackgroundGrid";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  return (
    // Base background must be defined here
    <div className="relative min-h-screen bg-[#030303] selection:bg-blue-500/30">
      {/* Background is fixed and sent to the very back */}
      <BackgroundGrid />
      
      {/* Content is relative and lifted to the front */}
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <FeatureBento />
        <Footer />
      </div>
    </div>
  );
}