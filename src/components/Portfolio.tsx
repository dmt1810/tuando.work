import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import catsaLogo from "@/assets/logos/catsa.png";
import cenhomeLogo from "@/assets/logos/cenhome.png";
import dichungLogo from "@/assets/logos/dichung.svg";
import hnccLogo from "@/assets/logos/hncc.png";

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
    impact: ["Reduced CPA by ~18%", "Improved lead quality"],
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
    title: "Cenhomes.vn",
    subtitle: "Real Estate Marketplace",
    industry: "Real Estate / PropTech",
    url: "https://cenhomes.vn/",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section id="portfolio" ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-muted/20 -z-10 -skew-y-3 translate-y-20" />

      <div className="container px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
            className="max-w-2xl"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Selected <span className="text-gradient">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Driving measurable ROI for market leaders through performance-led digital transformations.
            </p>
          </motion.div>

          {/* Navigation Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            className="flex gap-3"
          >
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Portfolio Slider Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:px-[10%]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="group min-w-[300px] md:min-w-[480px] snap-center bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center overflow-hidden p-3 transition-transform duration-500 group-hover:scale-110">
                  <img
                    src={project.logo}
                    alt={`${project.title} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-end gap-3">
                  <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                    {project.industry}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <div className="mb-6 flex-grow">
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-primary font-semibold text-sm mb-4">{project.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-border/50">
                <div>
                  <span className="text-[10px] font-bold text-foreground/50 uppercase tracking-[0.2em] block mb-3">Core Scope</span>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map((item) => (
                      <span key={item} className="px-3 py-1.5 text-[10px] font-bold rounded-lg bg-muted/50 text-muted-foreground border border-border/40">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] block mb-3">Key Impact</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.impact.map((item) => (
                      <div key={item} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors duration-500">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="text-xs font-semibold text-foreground/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Simplified "And More" Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
            className="min-w-[200px] md:min-w-[250px] snap-center rounded-3xl p-10 border-2 border-dashed border-border/50 flex flex-col items-center justify-center text-center group"
          >
            <h3 className="font-display text-xl font-bold text-muted-foreground italic">And mores...</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
