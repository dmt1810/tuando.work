import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Target, 
  Users, 
  BarChart3, 
  Megaphone, 
  Globe, 
  Zap 
} from "lucide-react";

const competencies = [
  {
    icon: Target,
    title: "Performance Marketing & PPC",
    description: "Google Ads, Facebook Ads, SEM, Paid Social",
  },
  {
    icon: Users,
    title: "CRM & Marketing Automation",
    description: "HubSpot, Insider, Salesforce",
  },
  {
    icon: Zap,
    title: "User Acquisition & Retention",
    description: "Lifecycle Marketing, Growth Strategies",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & A/B Testing",
    description: "Google Analytics, BigQuery",
  },
  {
    icon: Megaphone,
    title: "Campaign Management",
    description: "ROI Optimization, Multi-channel Campaigns",
  },
  {
    icon: Globe,
    title: "B2B & B2C Strategy",
    description: "Southeast Asia Market Expertise",
  },
];

const Competencies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 md:py-32 bg-card">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Core <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expertise built over a decade of driving growth across diverse industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {competencies.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Competencies;
