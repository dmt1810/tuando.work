import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Plane, Building, TrendingUp, Users, Target } from "lucide-react";

const caseStudies = [
  {
    icon: Shield,
    company: "Igloo Insurtech",
    title: "Regional Growth & Brand Scaling",
    role: "Growth & Brand Marketing Manager",
    challenge: "Scale a multi-market insurtech platform while balancing acquisition efficiency and brand trust.",
    strategy: [
      "Built multi-channel acquisition engine",
      "Integrated online and offline campaigns",
      "Leveraged partnerships for ecosystem growth",
    ],
    results: [
      { value: "150%", label: "YoY Growth", highlight: true },
      { value: "10,000+", label: "Agents Onboarded" },
      { value: "+40%", label: "Brand Awareness (ID)" },
    ],
  },
  {
    icon: Plane,
    company: "FindTourGo (Tastech)",
    title: "B2B Travel Tech Growth",
    role: "Marketing Manager",
    challenge: "Drive early-stage traction for a travel customization platform.",
    strategy: [
      "Targeted B2B acquisition campaigns",
      "Partner-led growth with tour operators",
      "Continuous funnel optimization",
    ],
    results: [
      { value: "500+", label: "Global Agents", highlight: true },
      { value: "5,000+", label: "Monthly Visitors" },
      { value: "SEA", label: "Market Focus" },
    ],
  },
  {
    icon: Building,
    company: "OneMount Group",
    title: "CRM & Retention Transformation",
    role: "CRM Specialist",
    challenge: "Improve customer engagement and retention across a large ecosystem.",
    strategy: [
      "Advanced segmentation and personalization",
      "Automated lifecycle workflows",
      "A/B testing for email and messaging",
    ],
    results: [
      { value: "+20%", label: "Email Open Rates", highlight: true },
      { value: "+15%", label: "Conversion Lift" },
      { value: "Multi", label: "Channel Integration" },
    ],
  },
];

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="case-studies" className="py-24 md:py-32 bg-secondary/30">
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
            Deep dives into key growth initiatives and their measurable impact
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all"
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Header & Challenge */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <study.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-primary text-sm font-medium">{study.company}</p>
                      <h3 className="font-display text-xl md:text-2xl font-bold">{study.title}</h3>
                      <p className="text-muted-foreground text-sm">{study.role}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-3">Strategy</h4>
                    <ul className="space-y-2">
                      {study.strategy.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="bg-secondary/50 rounded-xl p-6">
                  <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-4 text-center">Results</h4>
                  <div className="space-y-4">
                    {study.results.map((result) => (
                      <div key={result.label} className="text-center">
                        <div className={`font-display text-3xl font-bold ${result.highlight ? 'text-gradient' : 'text-foreground'}`}>
                          {result.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{result.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
