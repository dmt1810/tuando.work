import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Heart, BarChart3, Globe, ChevronDown } from "lucide-react";

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
  const [activeLayer, setActiveLayer] = useState<string | null>(pillars[0].id);

  const handleToggle = (id: string) => {
    setActiveLayer(id);
  };

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
          {/* Mobile hint — hidden on desktop where hover works */}
          <p className="md:hidden text-xs text-muted-foreground/50 mt-3 italic">
            Tap cards to explore
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
                transition={{
                  layout: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.6, delay: 0.2 + index * 0.1 },
                  y: { duration: 0.6, delay: 0.2 + index * 0.1 }
                }}
                onMouseEnter={() => {
                  // Only trigger hover on devices that support hover (non-touch)
                  if (window.matchMedia("(hover: hover)").matches) {
                    setActiveLayer(pillar.id);
                  }
                }}
                onClick={() => handleToggle(pillar.id)}
                className={`
                  relative overflow-hidden rounded-3xl border border-border/50 shadow-sm
                  flex flex-col group cursor-pointer touch-manipulation
                  ${activeLayer === pillar.id
                    ? "flex-[3.5] bg-white shadow-2xl border-primary/20 p-8 h-auto"
                    : "md:flex-1 bg-slate-50/40 hover:bg-white/80 backdrop-blur-[2px] opacity-80 hover:opacity-100 shadow-sm p-4 h-20 md:h-auto md:p-8"}
                `}
              >
                {/* Rainbow Accent (Visible only when active) */}
                <motion.div
                  layout
                  className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF3D57] via-[#FFCB00] to-[#00D2D2] z-10"
                  initial={false}
                  animate={{
                    opacity: activeLayer === pillar.id ? 1 : 0,
                    scaleX: activeLayer === pillar.id ? 1 : 0
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content Header — with chevron indicator */}
                <div className={`${activeLayer === pillar.id ? "mb-6" : "mb-0"}`}>
                  <div className="flex items-center md:items-start justify-between">
                    <div className="flex items-center gap-4 md:block">
                      <div
                        className={`
                          rounded-xl flex items-center justify-center transition-colors duration-500
                          ${activeLayer === pillar.id
                            ? "w-12 h-12 md:mb-6 bg-primary text-white shadow-lg shadow-primary/20"
                            : "w-10 h-10 md:w-12 md:h-12 md:mb-6 bg-primary/10 text-primary"}
                        `}
                      >
                        <pillar.icon className={`${activeLayer === pillar.id ? "w-6 h-6" : "w-5 h-5 md:w-6 md:h-6"}`} />
                      </div>
                      <h3
                        className={`font-display font-bold transition-colors duration-500 
                          ${activeLayer === pillar.id ? "text-2xl text-foreground" : "text-lg text-muted-foreground/60 md:text-2xl"}`}
                      >
                        {pillar.title}
                      </h3>
                    </div>
                    {/* Chevron expand indicator */}
                    <div>
                      <ChevronDown className={`
                        w-5 h-5 transition-transform duration-500 flex-shrink-0 md:hidden
                        ${activeLayer === pillar.id ? "rotate-180 text-primary" : "text-muted-foreground/40"}
                      `} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Content */}
                <AnimatePresence initial={false}>
                  {activeLayer === pillar.id && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 10 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="flex-grow overflow-hidden"
                    >
                      <ul className="space-y-4">
                        {pillar.items.map((item) => (
                          <li key={item} className="flex items-start gap-4 text-sm text-muted-foreground leading-relaxed">
                            <span className="w-2 h-2 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 pt-6 border-t border-border/50">
                        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary transition-all">
                          Core Expertise →
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed state vertical label (Desktop Only) */}
                <motion.div
                  layout="position"
                  initial={false}
                  animate={{ opacity: activeLayer === pillar.id ? 0 : 0.4 }}
                  transition={{ duration: 0.4 }}
                  className="hidden md:block absolute bottom-8 left-8"
                >
                  <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-muted-foreground [writing-mode:vertical-lr] rotate-180">
                    {pillar.title.split(' ')[0]}
                  </span>
                </motion.div>
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

