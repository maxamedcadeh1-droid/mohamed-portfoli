import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brand-background pt-32 pb-16 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-full bg-brand-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-16 lg:flex-row">
          <div className="space-y-8 max-w-md">
            <motion.h2 
              whileHover={{ scale: 1.05 }}
              className="font-display text-4xl font-bold tracking-tighter text-white"
            >
              MOHAMED<span className="text-brand-accent">.</span>
            </motion.h2>
            <p className="font-sans text-lg italic text-brand-text-secondary leading-relaxed">
              Crafting digital legacies for brands that demand excellence. Based in the future, working globally.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-24 md:gap-32">
            <div className="space-y-6">
              <h4 className="font-ui text-[10px] font-bold text-white uppercase tracking-[0.4em]">Navigation</h4>
              <ul className="space-y-4">
                <li><a href="#about" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> About</a></li>
                <li><a href="#projects" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> Work</a></li>
                <li><a href="#process" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> Process</a></li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-ui text-[10px] font-bold text-white uppercase tracking-[0.4em]">Connect</h4>
              <ul className="space-y-4">
                <li><a href="#contact" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> Hire Me</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://linkedin.com" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> LinkedIn</a></li>
                <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com" className="group flex items-center gap-2 font-ui text-[10px] font-bold text-brand-text-secondary hover:text-white uppercase tracking-widest transition-all"><span className="h-px w-0 bg-brand-accent transition-all group-hover:w-4" /> Twitter</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-32 flex flex-col items-center justify-between gap-8 border-t border-white/5 pt-12 md:flex-row opacity-40 hover:opacity-100 transition-opacity duration-500">
          <p className="font-ui text-[10px] font-bold text-white uppercase tracking-widest">© {currentYear} MOHAMED DESIGN STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <p className="font-ui text-[10px] font-bold text-white uppercase tracking-widest">PRIVACY POLICY</p>
            <p className="font-ui text-[10px] font-bold text-white uppercase tracking-widest">TERMS OF SERVICE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
