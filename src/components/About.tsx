import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, TrendingUp } from "lucide-react";

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

          <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border/50">
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Profile Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex-shrink-0 relative group"
              >
                <div className="w-48 h-56 md:w-56 md:h-64 rounded-2xl bg-muted overflow-hidden border-2 border-white shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-primary/20">
                  <img
                    src="/tuan-profile.jpg"
                    alt="Tuan Do"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>
                {/* monday.com style colorful accent indicator */}
                <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-white rounded-xl shadow-lg border border-border flex items-center justify-center z-10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF3D57] via-[#FFCB00] to-[#00D2D2] animate-spin-slow" />
                </div>
              </motion.div>

              {/* About Text */}
              <div className="flex-1 text-center md:text-left">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                  I'm a growth-focused marketing leader who combines{" "}
                  <span className="text-foreground font-medium">performance marketing, data analytics, and product thinking</span>{" "}
                  to build sustainable, scalable growth systems.
                </p>

                <p className="text-base text-muted-foreground leading-relaxed mb-8">
                  Rather than chasing short-term wins, I design growth frameworks that scale across
                  products, channels, and markets — from early-stage platforms to large-scale
                  ecosystems. I work closely with product, tech, and commercial teams to turn
                  data into decisions and campaigns into compounding revenue.
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
