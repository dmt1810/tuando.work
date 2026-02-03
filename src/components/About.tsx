import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 md:py-32 bg-background">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8 text-center">
            Professional <span className="text-gradient">Summary</span>
          </h2>
          
          <div className="glass rounded-2xl p-8 md:p-12">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Results-driven marketing professional with <span className="text-foreground font-medium">10+ years of experience</span> in 
              performance marketing, growth marketing, and digital strategy. Specialized in <span className="text-primary">PPC campaign management</span>, 
              CRM optimization, and multi-channel user acquisition across fintech, insurtech, and travel technology sectors.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-6">
              Proven track record of driving measurable ROI improvements and scaling B2B/B2C platforms 
              across <span className="text-foreground font-medium">Southeast Asian markets</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
