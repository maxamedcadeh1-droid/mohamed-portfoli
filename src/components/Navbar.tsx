import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Process', href: '#process' },
  { name: 'Work', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSegment, setActiveSegment] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', updateScrollState);
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 z-[100] w-full flex justify-center py-6 px-4 sm:px-8"
    >
      <nav
        className={cn(
          "flex items-center justify-between w-full max-w-7xl h-20 px-8 rounded-full transition-all duration-500",
          isScrolled 
            ? "bg-brand-background/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
            : "bg-transparent border border-transparent"
        )}
      >
        {/* LOGO */}
        <div className="flex items-center">
          <a href="#home" className="group flex items-center">
            <span className="font-display text-2xl font-black text-white tracking-tighter transition-colors group-hover:text-brand-accent">
              MOHAMED<span className="text-brand-accent">.</span>
            </span>
          </a>
        </div>

        {/* CENTER NAV */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name} className="relative group/nav">
              <a
                href={item.href}
                onClick={() => setActiveSegment(item.name)}
                className={cn(
                  "font-sans text-sm font-medium tracking-tight transition-all duration-300 relative py-2",
                  activeSegment === item.name ? "text-brand-accent" : "text-brand-muted hover:text-white"
                )}
              >
                {item.name}
              </a>
              {activeSegment === item.name && (
                <motion.div
                  layoutId="active-nav-glow"
                  className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-accent shadow-[0_0_10px_rgba(56,189,248,1)]"
                />
              )}
            </li>
          ))}
        </ul>

        {/* RIGHT ACTION */}
        <div className="flex items-center gap-4">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-brand-accent hover:bg-brand-accent/90 text-brand-background font-bold text-sm rounded-full transition-colors"
          >
            Contact Me
          </motion.a>

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden h-10 w-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
          >
            <Menu className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="fixed inset-0 z-[120] bg-brand-background flex flex-col p-8 sm:p-12 overflow-hidden"
            >
              <div className="flex justify-between items-center">
                <span className="font-display text-3xl font-black text-white">MOHAMED.</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>

              <div className="mt-20 flex flex-col gap-8">
                {navItems.map((item, i) => (
                  <motion.a
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-4xl font-bold text-white tracking-tighter"
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-12 border-t border-white/10">
                 <a href="#contact" className="block w-full py-4 bg-brand-accent text-brand-background font-black text-center rounded-2xl text-xl">
                   Start Project
                 </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
