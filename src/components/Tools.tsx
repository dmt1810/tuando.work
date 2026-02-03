import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const toolCategories = [
  {
    category: "Advertising Platforms",
    tools: [
      { name: "Google Ads", level: 95 },
      { name: "Facebook Ads", level: 90 },
      { name: "Trivago", level: 85 },
      { name: "Criteo", level: 80 },
    ],
  },
  {
    category: "CRM & Automation",
    tools: [
      { name: "HubSpot", level: 90 },
      { name: "Insider", level: 88 },
      { name: "Salesforce", level: 75 },
    ],
  },
  {
    category: "Analytics & Data",
    tools: [
      { name: "Google Analytics", level: 95 },
      { name: "BigQuery", level: 85 },
      { name: "Data Studio", level: 80 },
    ],
  },
  {
    category: "Marketing Channels",
    tools: [
      { name: "SEM/PPC", level: 95 },
      { name: "Email Marketing", level: 90 },
      { name: "Content Marketing", level: 85 },
      { name: "Social Media", level: 88 },
    ],
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
            MarTech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tools and platforms I use to drive marketing success
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          {toolCategories.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-display font-semibold text-lg mb-6 text-primary">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.tools.map((tool, toolIndex) => (
                  <div key={tool.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{tool.name}</span>
                      <span className="text-xs text-muted-foreground">{tool.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${tool.level}%` } : {}}
                        transition={{ duration: 1, delay: catIndex * 0.1 + toolIndex * 0.05 }}
                        className="h-full bg-gradient-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;
