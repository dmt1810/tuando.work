import { motion } from "framer-motion";
import { Mail, Linkedin, ChevronDown, TrendingUp, Users, DollarSign, Layers } from "lucide-react";
import heroAbstract from "@/assets/hero-abstract.png";

const highlights = [
  { icon: TrendingUp, value: "150%", label: "YoY Growth Delivered" },
  { icon: Users, value: "10,000+", label: "Agents Acquired" },
  { icon: DollarSign, value: "$50K+", label: "Monthly Budgets Managed" },
  { icon: Layers, value: "Full Funnel", label: "Growth Ownership" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background abstract image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroAbstract} 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
      </div>
      
      {/* Glowing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      
      <div className="container relative z-10 px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
          >
            <span className="text-primary text-sm font-medium">Growth & Performance Marketing Leader</span>
          </motion.div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Building <span className="text-gradient">Scalable Growth</span> Engines
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Driving measurable ROI for global B2B & B2C platforms across fintech, insurtech, travel tech, and more. 
            10+ years of performance marketing, CRM optimization, and go-to-market strategy.
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
                className="glass rounded-xl p-4 text-center"
              >
                <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{item.value}</div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="mailto:dmt1810@gmail.com"
              className="group flex items-center gap-2 px-6 py-3 bg-gradient-primary rounded-lg font-medium text-primary-foreground transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </a>
            <a
              href="https://linkedin.com/in/dmt1810"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-all hover:bg-secondary hover:border-primary/50"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-sm">Explore my work</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
