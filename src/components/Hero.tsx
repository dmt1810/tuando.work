import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(220_15%_15%/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(220_15%_15%/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      {/* Glowing orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      
      <div className="container relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/30 bg-primary/5"
          >
            <span className="text-primary text-sm font-medium">Marketing Professional</span>
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            Do Manh{" "}
            <span className="text-gradient">Tuan</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            10+ years driving growth through performance marketing, 
            digital strategy, and data-driven campaigns across Southeast Asia.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
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
            <a
              href="tel:+84384753797"
              className="flex items-center gap-2 px-6 py-3 border border-border rounded-lg font-medium text-foreground transition-all hover:bg-secondary hover:border-primary/50"
            >
              <Phone className="w-5 h-5" />
              Call Me
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
            <span className="text-sm">Scroll to explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
