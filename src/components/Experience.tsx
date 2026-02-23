import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Plane, Building, Briefcase, TrendingUp, Users, Target } from "lucide-react";

const experiences = [
  {
    icon: Plane,
    company: "Tastech (FindTourGo)",
    title: "Marketing Manager",
    period: "2025 – Present",
    current: true,
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
    icon: Shield,
    company: "Igloo Insurtech",
    title: "Growth & Brand Marketing Manager",
    period: "2021 – 2024",
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
    icon: Building,
    company: "OneMount Group",
    title: "CRM Specialist",
    period: "2019 – 2021",
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
  {
    icon: TrendingUp,
    company: "Metrixa",
    title: "Sr. Performance Marketing",
    period: "2018 – 2019",
    challenge: "Optimize paid acquisition for diverse agency clients.",
    strategy: [
      "Cross-channel campaign management",
      "Budget allocation optimization",
      "Performance reporting frameworks",
    ],
    results: [
      { value: "15+", label: "Clients Managed", highlight: true },
      { value: "+30%", label: "Avg ROAS Improvement" },
      { value: "Multi", label: "Industry Verticals" },
    ],
  },
  {
    icon: Target,
    company: "Mytour Vietnam",
    title: "Digital Marketing Executive",
    period: "2015 – 2018",
    challenge: "Build digital presence for emerging OTA in competitive market.",
    strategy: [
      "SEO and content marketing strategy",
      "Paid search campaign launch",
      "Partnership development",
    ],
    results: [
      { value: "3x", label: "Traffic Growth", highlight: true },
      { value: "+50%", label: "Booking Increase" },
      { value: "Top 5", label: "OTA Ranking" },
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-muted/50">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of driving growth across fintech, insurtech, travel tech, and more
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-card rounded-2xl p-6 md:p-8 shadow-md border-y border-x border-border/50 card-hover ${exp.current ? 'border-l-4 border-l-primary' : ''}`}
            >
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left: Header & Challenge */}
                <div className="lg:col-span-2">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <exp.icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-primary text-sm font-medium">{exp.company}</p>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-medium">Current</span>
                        )}
                      </div>
                      <h3 className="font-display text-xl md:text-2xl font-bold">{exp.title}</h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-2">
                        <Briefcase className="w-3 h-3" />
                        {exp.period}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{exp.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-3">Strategy</h4>
                    <ul className="space-y-2">
                      {exp.strategy.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-foreground/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Results */}
                <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                  <h4 className="text-sm font-medium text-foreground/70 uppercase tracking-wide mb-4 text-center">Results</h4>
                  <div className="space-y-4">
                    {exp.results.map((result) => (
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

export default Experience;
