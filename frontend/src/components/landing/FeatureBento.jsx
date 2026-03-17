import { Card } from "@/components/ui/card";
import { Bolt, Shield, Search, FileJson } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Bolt,
    title: "FastAPI Backend",
    desc: "Lightning fast API responses under 200ms for real-time extraction.",
    className: "md:col-span-2", // This card will be wide
    iconColor: "text-blue-400",
    bgGlow: "from-blue-500/10"
  },
  {
    icon: Shield,
    title: "Secure Storage",
    desc: "AES-256 encrypted storage.",
    className: "md:col-span-1",
    iconColor: "text-purple-400",
    bgGlow: "from-purple-500/10"
  },
  {
    icon: Search,
    title: "Global Search",
    desc: "Find any line item instantly.",
    className: "md:col-span-1",
    iconColor: "text-emerald-400",
    bgGlow: "from-emerald-500/10"
  },
  {
    icon: FileJson,
    title: "JSON Export",
    desc: "Structured data ready for your ERP or accounting software via API.",
    className: "md:col-span-2", // Wide card
    iconColor: "text-orange-400",
    bgGlow: "from-orange-500/10"
  }
];

export default function FeatureBento() {
  return (
    <section id="features" className="max-w-5xl mx-auto px-6 pb-24 relative">
      {/* 1. Added a slight glow behind the grid to separate it from the deep black */}
      <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="grid md:grid-cols-3 gap-4 relative z-10">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={f.className}
            >
              <Card className="group relative h-full bg-zinc-900/40 border-zinc-800 backdrop-blur-md p-8 overflow-hidden hover:border-zinc-700 transition-all duration-300">
                
                {/* 2. Hover Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className={`p-3 w-fit bg-zinc-800/50 rounded-xl border border-zinc-700/50 mb-6 group-hover:scale-110 transition-transform ${f.iconColor}`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-white text-xl font-semibold tracking-tight">{f.title}</h3>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}