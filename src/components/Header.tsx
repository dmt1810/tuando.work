import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#growth-pillars" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#portfolio" },
  { label: "Skills", href: "#tools" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/70 backdrop-blur-2xl shadow-sm border-b border-border/40 py-3" : "py-6"
        }`}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-monday-rainbow opacity-80" />
      <div className="container px-6 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold">
          <span className="text-gradient">Tuan Do</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative text-sm text-muted-foreground hover:text-primary transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          <a
            href="mailto:hello@tuando.work"
            className="px-5 py-2 bg-gradient-primary rounded-full text-sm font-semibold text-primary-foreground hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Contact
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
          className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-border shadow-lg"
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
              href="mailto:hello@tuando.work"
              className="px-4 py-3 bg-gradient-primary rounded-xl text-center font-bold text-primary-foreground mt-2"
            >
              Contact
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
