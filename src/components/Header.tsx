import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "How I Grow", href: "#growth" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container px-6 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold">
          <span className="text-gradient">DMT</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:dmt1810@gmail.com"
            className="px-4 py-2 bg-gradient-primary rounded-lg text-sm font-medium text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-foreground p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden absolute top-full left-0 right-0 glass border-t border-border"
        >
          <nav className="container px-6 py-6 flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground py-2"
              >
                {item.label}
              </a>
            ))}
            <a
              href="mailto:dmt1810@gmail.com"
              className="px-4 py-3 bg-gradient-primary rounded-lg text-center font-medium text-primary-foreground mt-2"
            >
              Hire Me
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
