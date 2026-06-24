import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  
  const isHome = location === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = `fixed top-0 w-full z-50 transition-all duration-500 ${
    isScrolled || !isHome || isMobileMenuOpen
      ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-black/5 py-3"
      : "bg-transparent py-5"
  }`;

  const textClass = `transition-colors duration-300 ${
    isScrolled || !isHome || isMobileMenuOpen ? "text-foreground" : "text-white"
  }`;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={navClass}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group z-50 relative">
          <div className={`w-8 h-8 rounded-full border border-current flex items-center justify-center font-serif text-lg ${textClass}`}>
            M
          </div>
          <span className={`font-serif text-xl tracking-wider font-semibold ${textClass}`}>
            Madhu Sethi
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={`text-sm tracking-wide uppercase font-medium transition-all duration-300 cursor-pointer relative ${textClass} ${
                location === link.href ? "text-primary" : "hover:text-primary"
              }`}>
                {link.label}
                {location === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </span>
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110 ${textClass}`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link href="/appointment">
            <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-2.5 text-xs uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 hover:scale-105 rounded-xl cursor-pointer inline-block">
              Book Now
            </span>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50 relative">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full hover:bg-primary/10 transition-colors ${textClass}`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 ${textClass}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={link.href}>
                    <span
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg uppercase tracking-wide font-medium block border-b border-border/50 pb-4 transition-colors ${
                        location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.35 }}
              >
                <Link href="/appointment">
                  <span
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="bg-primary text-primary-foreground w-full py-4 text-center text-sm uppercase tracking-wider font-medium mt-4 rounded-xl block shadow-lg shadow-primary/20"
                  >
                    Book Appointment
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
