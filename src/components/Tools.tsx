import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle, Megaphone, Settings, BarChart3, Globe } from "lucide-react";

const toolCategories = [
  {
    category: "Advertising Platforms",
    icon: Megaphone,
    tools: ["Google Ads", "Facebook Ads", "Trivago", "Criteo", "TikTok Ads"],
  },
  {
    category: "CRM & Automation",
    icon: Settings,
    tools: ["HubSpot", "Insider", "Salesforce", "Mailchimp", "Braze"],
  },
  {
    category: "Analytics & Data",
    icon: BarChart3,
    tools: ["Google Analytics", "BigQuery", "Data Studio", "Mixpanel", "Amplitude"],
  },
  {
    category: "Marketing Channels",
    icon: Globe,
    tools: ["SEM/PPC", "Email Marketing", "Content Marketing", "Social Media", "Affiliate"],
  },
];

const certifications = [
  {
    name: "Google Ads Search Certification",
    issuer: "Google",
    year: "2024",
  },
  {
    name: "Google Analytics Individual Qualification",
    issuer: "Google",
    year: "2023",
  },
  {
    name: "HubSpot Inbound Marketing",
    issuer: "HubSpot Academy",
    year: "2023",
  },
  {
    name: "Meta Blueprint Certification",
    issuer: "Meta",
    year: "2023",
  },
  {
    name: "Google Ads Display Certification",
    issuer: "Google",
    year: "2022",
  },
  {
    name: "Google Ads Video Certification",
    issuer: "Google",
    year: "2022",
  },
];

const Tools = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="tools" className="py-24 md:py-32 bg-card">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Skills & <span className="text-gradient">Credentials</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools, platforms, and certifications that power marketing success
          </p>
        </motion.div>

        {/* MarTech Stack */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-xl font-semibold text-center mb-8"
          >
            MarTech Stack
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-6">
            {toolCategories.map((category, catIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm border border-border/50"
              >
                <h4 className="font-display font-semibold text-lg mb-4 text-primary flex items-center gap-2">
                  <category.icon className="w-5 h-5 flex-shrink-0" />
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 text-sm rounded-full bg-white border border-border text-foreground/80 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="max-w-5xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-display text-xl font-semibold text-center mb-8 flex items-center justify-center gap-2"
          >
            <Award className="w-5 h-5 text-primary" />
            Professional Certifications
          </motion.h3>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="bg-card rounded-lg p-5 border border-border/50 shadow-sm card-hover group min-w-[280px] md:min-w-0 snap-center"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 flex-shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-2">
                      <span className="font-medium text-primary/80">{cert.issuer}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{cert.year}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;
