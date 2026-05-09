import { motion, useSpring, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';

const stats = [
  { label: 'Experience', value: '3+', suffix: 'Years' },
  { label: 'Projects', value: '40+', suffix: 'Completed' },
  { label: 'Happy Clients', value: '38+', suffix: 'Global' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useSpring(0, { damping: 25, stiffness: 150 });
  const mouseY = useSpring(0, { damping: 25, stiffness: 150 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section id="about" ref={containerRef} className="relative bg-brand-background py-40 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-brand-accent/5 blur-[120px]" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] rounded-full bg-brand-violet/5 blur-[120px]" 
        />
        <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/3 blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 gap-24 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Content */}
          <div className="space-y-16">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <div className="h-[1px] w-12 bg-brand-accent" />
                <span className="font-ui text-xs font-bold tracking-[0.4em] text-brand-accent uppercase">
                  Modern Vision
                </span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-5xl font-bold leading-[1.1] text-white md:text-7xl"
              >
                Crafting digital <br />
                legacies through <br />
                <span className="text-brand-text-secondary italic font-light">intentional</span> design.
              </motion.h2>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-xl font-sans text-xl leading-relaxed text-brand-text-secondary"
            >
              Driven by the intersection of art and technology, I help brands stand out in the digital noise. 
              My approach blends cinematic aesthetics with functional precision, ensuring every pixel tells a story.
            </motion.p>
            
            <div className="grid grid-cols-2 gap-12 pt-10">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="group space-y-2"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl font-bold text-white group-hover:text-brand-accent transition-colors duration-500">{stat.value}</span>
                    <span className="font-ui text-xs font-bold text-brand-accent uppercase tracking-tighter">{stat.suffix}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5 overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full w-full bg-brand-accent origin-left"
                    />
                  </div>
                  <p className="font-ui text-[10px] font-bold tracking-widest text-brand-text-secondary uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Portrait Composition */}
          <div className="relative group">
            <motion.div 
              style={{ x: mouseX, y: mouseY }}
              className="relative z-10"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative mx-auto aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[4rem] border border-white/10 bg-brand-secondary shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)]"
              >
                <img 
                  src="https://i.postimg.cc/SR7NVSNH/Chat-GPT-Image-May-8-2026-12-08-00-PM.png" 
                  alt="Mohamed Portrait" 
                  className="h-full w-full object-cover transition-all duration-1000 group-hover:scale-105"
                />
                
                {/* Cinematic Overlays */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-violet/40 via-transparent to-brand-accent/40 opacity-60 mix-blend-overlay" />
                  
                  {/* Glassmorphism Glows */}
                  <div className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-brand-accent/40 blur-[130px] rounded-full" />
                  <div className="absolute -top-1/4 -left-1/4 w-3/4 h-3/4 bg-brand-violet/40 blur-[130px] rounded-full" />
                </div>

                {/* Floating UI */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="glass absolute top-12 left-12 px-6 py-4 rounded-[2rem] border border-white/20 backdrop-blur-2xl shadow-2xl"
                >
                  <span className="font-ui text-[10px] font-bold tracking-[0.3em] text-white uppercase">Mohamed</span>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Background Decorative Element */}
            <motion.div
              style={{ rotate }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="absolute -top-10 -right-10 h-64 w-64 rounded-full border border-white/5 z-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

