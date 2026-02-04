import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Heart, BarChart3, Globe } from "lucide-react";
import growthFunnel from "@/assets/growth-funnel.png";

const pillars = [
  {
    icon: Target,
    title: "Performance & Acquisition",
    items: ["Google Ads, Paid Social, SEM", "Funnel design & conversion optimization", "Budget scaling & bidding strategy"],
  },
  {
    icon: Heart,
    title: "CRM, Retention & Lifecycle",
    items: ["HubSpot, Insider, Salesforce", "Segmentation & personalization", "Retention, win-back, LTV optimization"],
  },
  {
    icon: BarChart3,
    title: "Analytics & Experimentation",
    items: ["Google Analytics & BigQuery", "A/B testing frameworks", "Marketing dashboards & reporting"],
  },
  {
    icon: Globe,
    title: "Market Expansion & GTM",
    items: ["New market launches", "B2B, B2C, B2B2C growth models", "Partnership & ecosystem-led growth"],
  },
];

const GrowthPillars = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="growth" className="py-24 md:py-32 bg-secondary/30">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How I Create <span className="text-gradient">Growth</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            End-to-end growth ownership from acquisition to retention to monetization
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <img 
                  src={growthFunnel} 
                  alt="Growth Funnel" 
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Pillars Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover:border-primary/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <pillar.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{pillar.title}</h3>
                  <ul className="space-y-2">
                    {pillar.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthPillars;
