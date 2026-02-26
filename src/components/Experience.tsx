import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Plane, Building, Briefcase, TrendingUp, Users, Target } from "lucide-react";
import Counter from "./ui/Counter";

const experiences = [
  // ... (same as before)
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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="container px-6 relative z-10">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
            Professional Journey
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            A decade of driving growth across fintech, insurtech, travel tech, and more
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/60 -translate-x-1/2 overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-primary via-primary/50 to-primary/10 origin-top"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Role Node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                    className="w-12 h-12 rounded-2xl bg-white border-2 border-primary flex items-center justify-center shadow-xl group"
                  >
                    <exp.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Date/Period (Sticky-ish) */}
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0`}>
                  <div className={`inline-flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                    <span className="text-sm font-bold text-primary tracking-tight whitespace-nowrap">{exp.period}</span>
                    {exp.current && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">{exp.company}</h3>
                  <p className="text-primary font-semibold text-base mb-4">{exp.title}</p>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 pl-16 md:pl-0">
                  <div className="bg-card rounded-3xl p-6 md:p-8 shadow-sm border border-border/50 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 card-hover group">
                    <div className="mb-6">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 mb-3">The Challenge</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{exp.challenge}</p>
                    </div>

                    <div className="mb-8">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground/50 mb-4">Strategic Execution</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.strategy.map((item) => (
                          <span key={item} className="px-3 py-1.5 rounded-lg bg-slate-50 text-[11px] text-muted-foreground border border-border/50 group-hover:border-primary/20 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border/50 grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {exp.results.map((result) => (
                        <div key={result.label} className="flex flex-col">
                          <Counter
                            value={result.value}
                            className={`font-display text-xl md:text-2xl font-bold ${result.highlight ? 'text-gradient' : 'text-foreground'}`}
                          />
                          <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{result.label}</span>
                        </div>
                      ))}
                    </div>
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

export default Experience;
