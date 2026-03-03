import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Mail, Linkedin, TrendingUp, Users, DollarSign, Layers } from "lucide-react";
import Counter from "./ui/Counter";

const highlights = [
  {
    icon: TrendingUp,
    value: 150,
    suffix: "%",
    label: "YoY Growth Delivered",
    context: "at Igloo Insurtech · 2021–2024"
  },
  { icon: Users, value: 10000, suffix: "+", label: "Agents Acquired" },
  { icon: DollarSign, value: 50, suffix: "K+", label: "Monthly Budgets Managed" },
  { icon: Layers, value: "Full Funnel", label: "Growth Ownership" },
];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
};

// Variants for staggered entrance (single RAF loop instead of 10+)
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll parallax — only active on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen md:min-h-[110vh] flex items-center justify-center bg-gradient-hero overflow-hidden"
    >
      {/* Decorative gradient blobs — simplified on mobile */}
      <div className={`absolute top-20 right-[-200px] w-[500px] h-[500px] bg-primary/5 rounded-full ${isMobile ? "blur-[30px]" : "blur-[100px]"}`} />
      <div className={`absolute bottom-20 left-[-150px] w-[400px] h-[400px] bg-primary/8 rounded-full ${isMobile ? "blur-[30px]" : "blur-[80px]"}`} />
      {/* Third pulsing blob — hidden on mobile, too expensive */}
      {!isMobile && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />
      )}

      <div className="container relative z-10 px-6 pt-20">
        <motion.div
          style={isMobile ? undefined : { y: yContent, opacity, scale, willChange: "transform" }}
          className="text-center max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={scaleInVariant}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="text-primary text-sm font-medium">Growth Marketing Leader | 10+ Years</span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            I Build <span className="text-gradient">Scalable Growth</span> Engines
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Hi, I'm Tuan — a growth-focused marketing leader based in Vietnam.
            I combine performance marketing, data analytics, and product thinking
            to help B2B & B2C platforms scale across Southeast Asia and beyond.
          </motion.p>

          {/* Key Highlights — single stagger container */}
          <motion.div
            variants={fadeUpVariant}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
          >
            {highlights.map((item) => (
              <div
                key={item.label}
                className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50 card-hover flex flex-col items-center justify-center min-h-[140px]"
              >
                <item.icon className="w-6 h-6 text-primary mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient mb-1">
                  <Counter value={item.value} suffix={item.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-medium mb-1">{item.label}</div>
                {item.context && (
                  <div className="text-[9px] text-muted-foreground/60 leading-tight">
                    {item.context}
                  </div>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUpVariant}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <a
              href="mailto:hello@tuando.work"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg font-medium text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 duration-200"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <a
              href="https://linkedin.com/in/dmt1810"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-all hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5 duration-200"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — hidden on mobile to save GPU work */}
        {!isMobile && (
          <motion.div
            style={{ opacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="w-[24px] h-[40px] border-2 border-muted-foreground/30 rounded-full flex justify-center p-1.5 focus:outline-none">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-2 bg-primary rounded-full shadow-[0_0_8px_hsl(var(--primary))]"
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground font-bold">Scroll</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;

