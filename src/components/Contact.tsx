import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, Linkedin, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      
      <div className="container px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
            Ready to drive growth for your business? Let's discuss how I can help 
            scale your marketing efforts across Southeast Asia and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="mailto:dmt1810@gmail.com"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-primary rounded-xl font-semibold text-primary-foreground transition-all hover:shadow-xl hover:shadow-primary/25 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              dmt1810@gmail.com
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
            <a
              href="tel:+84384753797"
              className="flex items-center gap-3 px-8 py-4 border border-border rounded-xl font-medium text-foreground transition-all hover:bg-secondary hover:border-primary/50 w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              (+84) 384 753 797
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href="https://linkedin.com/in/dmt1810"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
