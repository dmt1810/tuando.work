import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { User, Lightbulb, Target, TrendingUp } from "lucide-react";

const intersections = [
  { icon: Lightbulb, label: "Data-driven experimentation" },
  { icon: Target, label: "Full-funnel optimization" },
  { icon: TrendingUp, label: "Brand-aware performance execution" },
];

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
          className="max-w-5xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Profile Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-shrink-0"
              >
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-secondary border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <User className="w-12 h-12" />
                    <span className="text-xs">Profile Photo</span>
                  </div>
                </div>
              </motion.div>

              {/* About Text */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  I am a growth-focused marketing leader who combines{" "}
                  <span className="text-foreground font-medium">performance marketing, data analytics, and product thinking</span>{" "}
                  to build sustainable and scalable growth systems.
                </p>
                
                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  Rather than chasing short-term wins, I design growth frameworks that scale across products, 
                  channels, and markets. I have led growth initiatives for both early-stage platforms and 
                  large-scale ecosystems, working closely with product, tech, and commercial teams.
                </p>

                {/* Intersection Points */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground font-medium mb-3">My work sits at the intersection of:</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {intersections.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                      >
                        <item.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
