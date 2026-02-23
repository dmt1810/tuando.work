import { Mail, Phone, Linkedin } from "lucide-react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#growth-pillars" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#portfolio" },
  { label: "Skills", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-[hsl(220,30%,15%)] text-white/90">
      <div className="container px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <a href="#" className="font-display text-xl font-bold hover:opacity-80 transition-opacity">
              <span className="text-white">Tuan Do</span>
            </a>
            <p className="text-white/60 text-sm mt-3 leading-relaxed max-w-xs">
              Growth Marketing Leader helping B2B & B2C platforms scale across Southeast Asia and beyond.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-white/40 mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wide text-white/40 mb-4">
              Connect
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/dmt1810"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="mailto:hello@tuando.work"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@tuando.work
              </a>
              <a
                href="tel:+84384753797"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                (+84) 384 753 797
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container px-6 py-6 font-medium">
          <p className="text-white/40 text-sm text-center">
            © {new Date().getFullYear()} Tuan Do. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
