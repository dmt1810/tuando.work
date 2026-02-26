import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Heart, BarChart3, Globe } from "lucide-react";

const pillars = [
  {
    id: "awareness",
    icon: Target,
    title: "Awareness & Reach",
    items: ["Brand positioning & messaging", "Multi-channel expansion strategy", "Market share growth mapping"],
  },
  {
    id: "acquisition",
    icon: Heart,
    title: "Performance & Growth",
    items: ["High-intent Google & Social Ads", "Landing page conversion strategy", "Budget scaling & unit economics"],
  },
  {
    id: "retention",
    icon: BarChart3,
    title: "Lifecycle & Engagement",
    items: ["Customer journey mapping", "Automated engagement workflows", "Loyalty & retention programs"],
  },
  {
    id: "revenue",
    icon: Globe,
    title: "Data & Scaling",
    items: ["Advanced analytics & BigQuery", "A/B testing & experimentation", "GTM strategy for new markets"],
  },
];

const GrowthPillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  // Default to the first pillar
  const [activeLayer, setActiveLayer] = useState<string | null>(pillars[0].id);

  return (
    <section id="growth-pillars" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-10" />

      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Key <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Strategic strengths and core expertise built across a decade of
            scaling high-performance marketing ecosystems.
          </p>
        </motion.div>

        {/* Expanding Accordion Pillars */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[420px]">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setActiveLayer(pillar.id)}
                className={`
                  relative overflow-hidden rounded-3xl p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                  border border-border/50 shadow-sm
                  flex flex-col group cursor-pointer
                  ${activeLayer === pillar.id ? "flex-[3.5] bg-white shadow-2xl border-primary/20" : "md:flex-1 bg-slate-50/40 hover:bg-white/80 backdrop-blur-[2px] opacity-80 hover:opacity-100 shadow-sm"}
                `}
              >
                {/* Rainbow Accent (Visible only when active) */}
                <div className={`
                  absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF3D57] via-[#FFCB00] to-[#00D2D2] 
                  transition-all duration-500 z-10
                  ${activeLayer === pillar.id ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}
                `} />

                {/* Content Header */}
                <div className="mb-6 flex-shrink-0">
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500
                    ${activeLayer === pillar.id ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-primary/10 text-primary"}
                  `}>
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className={`font-display text-2xl font-bold transition-all duration-500 ${activeLayer === pillar.id ? "text-foreground" : "text-muted-foreground/60"}`}>
                    {pillar.title}
                  </h3>
                </div>

                {/* Expanded Details Content */}
                <div className={`
                  transition-all duration-700 flex-grow
                  ${activeLayer === pillar.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}
                `}>
                  <ul className="space-y-4">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-4 text-sm text-muted-foreground leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-border/50">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary group-hover:tracking-[0.4em] transition-all">
                      Core Expertise →
                    </span>
                  </div>
                </div>

                {/* Collapsed state vertical label */}
                <div className={`
                  absolute bottom-8 left-8 transition-all duration-500
                  ${activeLayer === pillar.id ? "opacity-0 translate-x-4" : "opacity-40 translate-x-0"}
                `}>
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground [writing-mode:vertical-lr] rotate-180">
                    {pillar.title.split(' ')[0]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Dots (Monday style) */}
        <div className="flex justify-center gap-3">
          {pillars.map((pillar) => (
            <button
              key={pillar.id}
              onClick={() => setActiveLayer(pillar.id)}
              className={`
                h-1.5 rounded-full transition-all duration-500
                ${activeLayer === pillar.id ? "w-8 bg-primary" : "w-1.5 bg-border hover:bg-primary/30"}
              `}
              aria-label={`Show ${pillar.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthPillars;
