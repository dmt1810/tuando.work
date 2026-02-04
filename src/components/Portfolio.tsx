import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Truck, ShoppingBag, Building2, GraduationCap, ArrowUpRight } from "lucide-react";

const projects = [
  {
    icon: Truck,
    title: "Dichung.vn",
    subtitle: "Tech Transport Marketplace",
    industry: "Logistics / Tech",
    description: "Vietnamese technology platform optimizing vehicle usage and reducing empty seats with a sustainability-driven mission.",
    role: "Performance Marketing Consultant",
    scope: ["Paid acquisition campaigns", "Funnel efficiency optimization", "Data-backed scaling recommendations"],
    impact: ["Improved lead quality", "Reduced acquisition cost"],
  },
  {
    icon: ShoppingBag,
    title: "CATSA",
    subtitle: "Fashion Retail Brand",
    industry: "Retail / Fashion",
    description: "Well-established Vietnamese menswear brand with both offline retail presence and e-commerce operations.",
    role: "Digital Marketing Consultant",
    scope: ["Paid media campaigns", "ROAS optimization", "Customer acquisition tracking"],
    impact: ["Increased online revenue", "Improved ad efficiency"],
  },
  {
    icon: Building2,
    title: "Cenhome",
    subtitle: "Real Estate Marketplace",
    industry: "Real Estate / PropTech",
    description: "Part of the CEN Group ecosystem, providing digital real estate listing and brokerage solutions in Vietnam.",
    role: "Performance Marketing Consultant",
    scope: ["Lead generation funnels", "Analytics tracking", "Campaign targeting"],
    impact: ["Increased qualified leads", "Reduced cost per lead"],
  },
  {
    icon: GraduationCap,
    title: "Hanoi Community College",
    subtitle: "Education Institution",
    industry: "Education / Training",
    description: "Public vocational institution providing applied education and professional training programs.",
    role: "Digital Marketing Consultant",
    scope: ["Enrollment campaigns", "CRM workflows", "Paid search optimization"],
    impact: ["Increased enrollment inquiries", "Improved conversion rate"],
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Selected <span className="text-gradient">Portfolio</span> Work
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Freelance and consulting projects across diverse industries
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <project.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                  {project.industry}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold mb-1">{project.title}</h3>
              <p className="text-primary text-sm font-medium mb-2">{project.subtitle}</p>
              <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
              
              <div className="mb-4">
                <span className="text-xs font-medium text-foreground/70 uppercase tracking-wide">Role</span>
                <p className="text-sm text-foreground">{project.role}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.scope.map((item) => (
                  <span key={item} className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground">
                    {item}
                  </span>
                ))}
              </div>

              <div className="pt-4 border-t border-border">
                <span className="text-xs font-medium text-primary uppercase tracking-wide">Impact</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.impact.map((item) => (
                    <span key={item} className="flex items-center gap-1 text-sm text-foreground">
                      <ArrowUpRight className="w-3 h-3 text-primary" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
