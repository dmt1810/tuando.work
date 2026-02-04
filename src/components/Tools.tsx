import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle } from "lucide-react";

const toolCategories = [
  {
    category: "Advertising Platforms",
    tools: ["Google Ads", "Facebook Ads", "Trivago", "Criteo", "TikTok Ads"],
  },
  {
    category: "CRM & Automation",
    tools: ["HubSpot", "Insider", "Salesforce", "Mailchimp", "Braze"],
  },
  {
    category: "Analytics & Data",
    tools: ["Google Analytics", "BigQuery", "Data Studio", "Mixpanel", "Amplitude"],
  },
  {
    category: "Marketing Channels",
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
                className="glass rounded-xl p-6"
              >
                <h4 className="font-display font-semibold text-lg mb-4 text-primary">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1.5 text-sm rounded-full bg-secondary text-foreground/80 hover:bg-primary/20 hover:text-primary transition-colors"
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                className="glass rounded-lg p-4 hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {cert.issuer} • {cert.year}
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
