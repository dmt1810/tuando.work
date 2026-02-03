import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Users, Target, ArrowUpRight, BarChart3 } from "lucide-react";

const caseStudies = [
  {
    title: "Insurance Agent Platform Launch",
    company: "Igloo Insurtech",
    icon: Users,
    category: "B2A2C Growth",
    metrics: [
      { label: "Agent Signups", value: "10,000+", highlight: true },
      { label: "Markets Launched", value: "4 SEA" },
      { label: "Retention Rate", value: "2x Industry" },
    ],
    description: "Led end-to-end marketing for insurance agent platform launch across Southeast Asia, implementing multi-channel acquisition strategies and lifecycle marketing programs.",
  },
  {
    title: "FindTourGo Platform Growth",
    company: "Tastech PTE. Ltd",
    icon: Target,
    category: "B2B/B2C Travel Tech",
    metrics: [
      { label: "Travel Agents", value: "500+" },
      { label: "Monthly Visitors", value: "5,000+" },
      { label: "Partner Network", value: "Growing" },
    ],
    description: "Spearheaded digital marketing campaigns from pre-launch to active growth phase, building B2B partnerships and driving B2C traffic through targeted campaigns.",
  },
  {
    title: "E-commerce Partnership Expansion",
    company: "Igloo Insurtech",
    icon: TrendingUp,
    category: "Strategic Partnerships",
    metrics: [
      { label: "Partnerships", value: "5+" },
      { label: "User Reach", value: "500,000+" },
      { label: "Brand Awareness", value: "+40%" },
    ],
    description: "Secured strategic partnerships with major e-commerce and fintech platforms, expanding product reach and increasing brand awareness in Indonesia through integrated campaigns.",
  },
  {
    title: "Performance Marketing Optimization",
    company: "Metrixa Pty Ltd",
    icon: BarChart3,
    category: "PPC & ROI",
    metrics: [
      { label: "ROI Growth", value: "+30%", highlight: true },
      { label: "CPA Reduction", value: "-22%" },
      { label: "Monthly Budget", value: "$50K+" },
    ],
    description: "Managed high-budget Google Ads campaigns with systematic A/B testing and automated bidding strategies, achieving consistent quarterly ROI improvements.",
  },
  {
    title: "CRM Marketing Automation",
    company: "Dichung.vn (Freelance)",
    icon: Target,
    category: "Consulting",
    metrics: [
      { label: "Platform", value: "HubSpot" },
      { label: "Channels", value: "Google + FB" },
      { label: "Focus", value: "Data-Driven" },
    ],
    description: "Advised clients on performance marketing tactics and implemented CRM marketing automation campaigns, developing data-driven strategies aligned with business objectives.",
  },
];

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-background">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Key projects and campaigns that delivered measurable impact
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <study.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                  {study.category}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-1">{study.title}</h3>
              <p className="text-primary text-sm font-medium mb-4">{study.company}</p>
              
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {study.description}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                {study.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className={`font-display font-bold text-lg ${metric.highlight ? 'text-primary' : 'text-foreground'}`}>
                      {metric.value}
                    </div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
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

export default CaseStudies;
