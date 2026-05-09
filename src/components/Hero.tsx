import { motion } from 'motion/react';
import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  Twitter as TwitterIcon, 
  Github, 
  ArrowUpRight 
} from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-16">
      {/* MAIN CONTAINER CARD */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-7xl min-h-[700px] lg:h-[85vh] bg-brand-background rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 flex flex-col lg:flex-row"
      >
        {/* LEFT CONTENT */}
        <div className="flex-1 p-8 sm:p-12 lg:p-20 flex flex-col justify-center relative z-10">
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="font-ui text-brand-accent font-bold tracking-[0.2em] uppercase mb-4"
          >
            Hi, There!
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            I’m <span className="text-brand-accent">Mohamed</span> <br /> Mohamud
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            {["UI/UX Designer", "Motion Designer", "WordPress Developer", "AI Vibe Coding"].map((tag, i) => (
              <React.Fragment key={tag}>
                <span className="font-sans text-sm font-semibold text-brand-text/80">{tag}</span>
                {i < 3 && <span className="h-1 w-1 rounded-full bg-brand-accent/50" />}
              </React.Fragment>
            ))}
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="font-sans text-brand-muted text-lg lg:text-xl max-w-xl leading-relaxed mb-10"
          >
            I design modern digital experiences, cinematic interfaces, portfolio websites, brand visuals, and motion-based creative designs.
          </motion.p>

          {/* SOCIALS */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-6 mb-12"
          >
            {[
              { icon: Linkedin, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Github, href: "#" },
              { icon: TwitterIcon, href: "#" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.href} 
                className="text-brand-muted hover:text-brand-accent transition-all hover:scale-110"
              >
                <social.icon className="h-6 w-6" />
              </a>
            ))}
          </motion.div>

          {/* ACTIONS */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-6"
          >
            <a href="#contact" className="group relative h-14 px-10 rounded-full bg-brand-accent text-brand-background font-black flex items-center gap-3 overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_15px_30px_-5px_rgba(56,189,248,0.4)]">
              <span>Hire Me</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href="#projects" className="h-14 px-10 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all hover:border-white/20 active:scale-95">
              View Portfolio
            </a>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 relative overflow-hidden flex items-end justify-center lg:justify-end">
          {/* Ambient Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand-accent/20 blur-[120px] rounded-full pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10 h-[90%] w-full flex items-end"
          >
            <img 
              src="https://i.postimg.cc/SR7NVSNH/Chat-GPT-Image-May-8-2026-12-08-00-PM.png" 
              alt="Mohamed Portrait" 
              className="h-full w-full object-contain object-bottom transition-transform duration-1000"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* LOC INFO */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 lg:hidden">
        <span className="font-ui text-[10px] font-bold text-white/40 tracking-widest uppercase">Mogadishu, Somalia</span>
      </div>
    </section>
  );
}
