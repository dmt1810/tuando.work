import { motion, useSpring, useTransform, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Mail, Linkedin, TrendingUp, Users, DollarSign, Layers } from "lucide-react";

const highlights = [
  { icon: TrendingUp, value: 150, suffix: "%", label: "YoY Growth Delivered" },
  { icon: Users, value: 10000, suffix: "+", label: "Agents Acquired" },
  { icon: DollarSign, value: 50, suffix: "K+", label: "Monthly Budgets Managed" },
  { icon: Layers, value: "Full Funnel", label: "Growth Ownership" },
];

const Counter = ({ value, suffix }: { value: number | string, suffix?: string }) => {
  if (typeof value === 'string') return <>{value}</>;

  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <motion.span>{displayValue}</motion.span>
  );
};

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yContent = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);

  return (
    <section ref={containerRef} className="relative min-h-[110vh] flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-[-150px] w-[400px] h-[400px] bg-primary/8 rounded-full blur-[80px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse-glow" />

      <div className="container relative z-10 px-6 pt-20">
        <motion.div
          style={{ y: yContent, opacity, scale }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <span className="text-primary text-sm font-medium">Growth Marketing Leader | 10+ Years</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            I Build <span className="text-gradient">Scalable Growth</span> Engines
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Hi, I'm Tuan — a growth-focused marketing leader based in Vietnam.
            I combine performance marketing, data analytics, and product thinking
            to help B2B & B2C platforms scale across Southeast Asia and beyond.
          </p>

          {/* Key Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="bg-card rounded-xl p-4 text-center shadow-sm border border-border/50 card-hover"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">
                  {typeof item.value === 'number' ? <Counter value={item.value} /> : item.value}
                  {item.suffix}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
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

        {/* Apple-style minimalist scroll indicator */}
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
      </div>
    </section>
  );
};

export default Hero;
