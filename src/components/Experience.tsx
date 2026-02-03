import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    company: "Tastech PTE. Ltd",
    role: "Marketing Manager",
    period: "Feb 2025 – Present",
    description: "Leading marketing strategy for customized travel technology products including FindTourGo platform, driving B2B and B2C growth across global markets with focus on Southeast Asia.",
    achievements: [
      "Secured 500+ travel agents globally with concentrated focus on Southeast Asian markets",
      "Increased monthly platform traffic from pre-launch to 5,000+ visitors",
      "Expanded tour operator partnerships through strategic B2B relationship development",
    ],
  },
  {
    company: "Igloo Insurtech",
    role: "Growth & Brand Marketing Manager",
    period: "Sep 2021 – Dec 2024",
    description: "Led comprehensive marketing initiatives for leading Southeast Asian full-stack insurtech company.",
    achievements: [
      "Launched insurance agent platform across 4 SEA markets, achieving 10,000+ agent signups",
      "Secured 5+ strategic partnerships with e-commerce and fintech platforms",
      "Increased B2C platform brand awareness in Indonesia by 40%",
    ],
  },
  {
    company: "OneMount (VinID Ltd)",
    role: "CRM Specialist",
    period: "Sep 2019 – Aug 2021",
    description: "Vietnam's largest technological ecosystem providing solutions across financial services, distribution, real estate, and retail sectors.",
    achievements: [
      "Boosted email open rates by 20% and conversions by 15% through A/B testing",
      "Implemented personalized communication workflows improving engagement metrics",
    ],
  },
  {
    company: "Metrixa Pty Ltd",
    role: "Senior Performance Marketing Specialist",
    period: "July 2018 – Aug 2019",
    description: "Australia marketing agency focused on performance-driven strategies.",
    achievements: [
      "Achieved 30% quarterly ROI growth managing $50,000+ monthly Google Ads budgets",
      "Reduced CPA by 22% through automated bidding strategies and A/B testing",
    ],
  },
  {
    company: "Mytour Vietnam",
    role: "Digital Marketing Executive",
    period: "May 2015 – July 2018",
    description: "Leading online travel agency in Vietnam.",
    achievements: [
      "Reduced cost per acquisition by 18% via SEM optimizations",
      "Designed end-to-end lifecycle campaigns using Insider with CRM integration",
    ],
  },
  {
    company: "Dichung.vn",
    role: "Freelance Marketing Consultant",
    period: "2018 – 2019",
    description: "Independent consulting for ride-sharing startup.",
    achievements: [
      "Advised on performance marketing tactics for Google Ads and Facebook Ads",
      "Implemented CRM marketing automation campaigns using HubSpot",
      "Developed data-driven marketing strategies aligned with business objectives",
    ],
  },
];

const Experience = () => {
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
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A decade of driving growth across fintech, insurtech, and travel technology
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative mb-12 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute top-0 w-4 h-4 rounded-full bg-primary border-4 border-background ${
                  index % 2 === 0 ? "left-0 md:left-auto md:-right-2" : "left-0 md:-left-2"
                } -translate-x-1/2 md:translate-x-0`} />
                
                <div className="ml-8 md:ml-0 glass rounded-xl p-6 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-primary text-sm font-medium mb-2">
                    <Calendar className="w-4 h-4" />
                    {exp.period}
                  </div>
                  
                  <h3 className="font-display text-xl font-bold mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Briefcase className="w-4 h-4" />
                    {exp.company}
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">{exp.description}</p>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-foreground/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
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
