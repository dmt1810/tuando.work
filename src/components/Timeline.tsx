import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const timeline = [
  { role: "Marketing Manager", company: "Tastech", period: "2025 – Present", current: true },
  { role: "Growth & Brand Marketing Manager", company: "Igloo Insurtech", period: "2021 – 2024" },
  { role: "CRM Specialist", company: "OneMount Group", period: "2019 – 2021" },
  { role: "Sr. Performance Marketing", company: "Metrixa", period: "2018 – 2019" },
  { role: "Digital Marketing Executive", company: "Mytour Vietnam", period: "2015 – 2018" },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-background">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Career <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of driving growth across diverse industries
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {timeline.map((item, index) => (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-8 pl-12 md:pl-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-1 w-3 h-3 rounded-full ${item.current ? 'bg-primary animate-pulse' : 'bg-primary/50'} border-4 border-background left-3 md:left-auto ${
                  index % 2 === 0 ? "md:-right-1.5" : "md:-left-1.5"
                } -translate-x-1/2 md:translate-x-0`} />
                
                <div className={`glass rounded-xl p-5 hover:border-primary/30 transition-colors ${item.current ? 'border-primary/30' : ''}`}>
                  <div className="flex items-center gap-2 text-primary text-xs font-medium mb-2">
                    <Briefcase className="w-3 h-3" />
                    {item.period}
                    {item.current && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">Current</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold">{item.role}</h3>
                  <p className="text-muted-foreground text-sm">{item.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
