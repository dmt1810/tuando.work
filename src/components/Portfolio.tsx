import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, ExternalLink, Linkedin } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
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
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const ProjectDetails = ({ project }: { project: typeof projects[0] }) => (
    <div className="flex flex-col gap-6 py-4 md:py-0">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center overflow-hidden p-3 border border-border/50">
          <img src={project.logo} alt={project.title} className="w-full h-full object-contain" />
        </div>
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight">{project.title}</h3>
          <p className="text-primary font-semibold text-sm">{project.subtitle}</p>
          <div className="mt-2">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
              {project.industry}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
          {project.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
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
            <div className="space-y-2">
              {project.impact.map((item) => (
                <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <ArrowUpRight className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/20"
        >
          Visit Website
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

  return (
    <section id="portfolio" ref={containerRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-muted/20 -z-10 -skew-y-3 translate-y-20" />

      <div className="container px-6">
        <div className="max-w-3xl mx-auto text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Selected <span className="text-gradient">Work</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Showcasing brand growth through performance-led digital transformations.
            </p>
          </motion.div>
        </div>

        {/* Logo Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              className="group aspect-square rounded-3xl bg-card border border-border/50 p-6 flex items-center justify-center cursor-pointer transition-all duration-500 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={project.logo}
                alt={project.title}
                className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110 relative z-10"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full backdrop-blur-sm">
                  View Case
                </span>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Minimalist "and more.." Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: projects.length * 0.1 + 0.2 }}
          className="mt-12 text-center"
        >
          <span className="text-sm font-medium text-muted-foreground/40 italic">
            and more..
          </span>
        </motion.div>

        {/* Responsive Modal / Drawer */}
        {isMobile ? (
          <Drawer open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DrawerContent className="px-6 pb-12">
              <DrawerHeader className="px-0 mb-4">
                <DrawerTitle className="sr-only">Project Details</DrawerTitle>
                <DrawerDescription className="sr-only">Description for screen readers</DrawerDescription>
              </DrawerHeader>
              {selectedProject && <ProjectDetails project={selectedProject} />}
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
            <DialogContent className="max-w-2xl p-10">
              <DialogHeader className="sr-only">
                <DialogTitle>Project Details</DialogTitle>
                <DialogDescription>Full overview of the project and results</DialogDescription>
              </DialogHeader>
              {selectedProject && <ProjectDetails project={selectedProject} />}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
