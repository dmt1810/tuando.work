import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import catsaLogo from "@/assets/logos/catsa.png";
import cenhomeLogo from "@/assets/logos/cenhome.svg";
import dichungLogo from "@/assets/logos/dichung.svg";
import hnccLogo from "@/assets/logos/hncc.jpg";

const projects = [
  {
    logo: dichungLogo,
    title: "Dichung.vn",
    subtitle: "Tech Transport Marketplace",
    industry: "Logistics / Tech",
    url: "https://dichung.vn",
    description: "Vietnamese technology platform optimizing vehicle usage and reducing empty seats with a sustainability-driven mission.",
    role: "Performance Marketing Consultant",
    scope: ["Paid acquisition campaigns", "Funnel efficiency optimization", "Data-backed scaling recommendations"],
    impact: ["Improved lead quality", "Reduced acquisition cost"],
  },
  {
    logo: catsaLogo,
    title: "CATSA",
    subtitle: "Fashion Retail Brand",
    industry: "Retail / Fashion",
    url: "https://catsa.vn",
    description: "Well-established Vietnamese menswear brand with both offline retail presence and e-commerce operations.",
    role: "Digital Marketing Consultant",
    scope: ["Paid media campaigns", "ROAS optimization", "Customer acquisition tracking"],
    impact: ["Increased online revenue", "Improved ad efficiency"],
  },
  {
    logo: cenhomeLogo,
    title: "Cenhome",
    subtitle: "Real Estate Marketplace",
    industry: "Real Estate / PropTech",
    url: "https://cenhome.vn",
    description: "Part of the CEN Group ecosystem, providing digital real estate listing and brokerage solutions in Vietnam.",
    role: "Performance Marketing Consultant",
    scope: ["Lead generation funnels", "Analytics tracking", "Campaign targeting"],
    impact: ["Increased qualified leads", "Reduced cost per lead"],
  },
  {
    logo: hnccLogo,
    title: "Hanoi Community College",
    subtitle: "Education Institution",
    industry: "Education / Training",
    url: "https://hncc.edu.vn",
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
            Freelance <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Consulting projects across diverse industries
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
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center overflow-hidden p-2">
                  <img 
                    src={project.logo} 
                    alt={`${project.title} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                    {project.industry}
                  </span>
                  <a 
                    href={project.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </a>
                </div>
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
