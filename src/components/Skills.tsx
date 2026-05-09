import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useRef, useEffect, useState } from 'react';
import { Layout, Palette, Brain, Workflow, Sparkles, Loader2, type LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const iconMap: Record<string, LucideIcon> = {
  Layout,
  Palette,
  Brain,
  Workflow,
  Sparkles
};

interface Skill {
  title: string;
  icon_name: string;
  desc: string;
  color: string;
  size: string;
  tags: string[];
  id: string;
}

const fallbackSkills: Skill[] = [
  {
    id: '01',
    title: 'Interactive UI',
    icon_name: 'Layout',
    desc: 'Designing immersive interfaces that feel fast, fluid, and premium across every device.',
    color: 'from-brand-accent to-white',
    size: 'lg:col-span-2',
    tags: ['React', 'Tailwind', 'Motion'],
  },
  {
    id: '02',
    title: 'Creative Branding',
    icon_name: 'Palette',
    desc: 'Building polished visual systems and identity language for modern digital experiences.',
    color: 'from-brand-violet to-brand-accent',
    size: 'lg:col-span-1',
    tags: ['Design', 'Strategy', 'Motion'],
  },
  {
    id: '03',
    title: 'System Architecture',
    icon_name: 'Brain',
    desc: 'Constructing scalable product systems with thoughtful engineering and powerful workflows.',
    color: 'from-brand-accent to-brand-violet',
    size: 'lg:col-span-1',
    tags: ['TypeScript', 'Supabase', 'Performance'],
  },
];

function SkillCard({ skill, index }: { skill: Skill, index: number, key?: React.Key }) {
  const Icon = iconMap[skill.icon_name] || Layout;
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for parallax tilt
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });

  // Spotlight glow position
  const glowX = useSpring(0, { damping: 30, stiffness: 200 });
  const glowY = useSpring(0, { damping: 30, stiffness: 200 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    
    // Calculate relative mouse position (-0.5 to 0.5)
    const relX = (e.clientX - left) / width - 0.5;
    const relY = (e.clientY - top) / height - 0.5;
    
    mouseX.set(relX);
    mouseY.set(relY);

    // Update glow position in pixels
    glowX.set(e.clientX - left);
    glowY.set(e.clientY - top);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    glowX.set(0);
    glowY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative perspective-1000",
        skill.size
      )}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="h-full w-full preserve-3d"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-10 md:p-12 transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05] flex flex-col justify-between backdrop-blur-xl">
          
          {/* Spotlight Glow */}
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-500 group-hover:opacity-100"
            style={{
              background: useTransform(
                [glowX, glowY],
                ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 40%)`
              ),
            }}
          />

          {/* Background Ambient Aura */}
          <div className={cn("absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-[120px] opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:scale-125 bg-gradient-to-br", skill.color)} />

          <div className="relative z-10 space-y-10">
            {/* Header: ID & Icon */}
            <div className="flex items-center justify-between">
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/5 border border-white/10 group-hover:border-brand-accent/40 group-hover:bg-brand-accent/10 transition-all duration-700 group-hover:rotate-6 group-hover:scale-110">
                <Icon className="h-8 w-8 text-white group-hover:text-brand-accent transition-colors duration-500" />
              </div>
              <span className="font-display text-4xl font-black text-white/5 group-hover:text-white/20 transition-colors uppercase tracking-widest">
                {skill.id}
              </span>
            </div>
            
            {/* Content */}
            <div className="space-y-6">
              <h3 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tighter group-hover:text-brand-accent transition-colors duration-500">
                {skill.title}
              </h3>
              <p className="font-sans text-brand-text-secondary leading-relaxed md:text-xl italic opacity-80 group-hover:opacity-100 transition-opacity">
                {skill.desc}
              </p>
            </div>
          </div>

          {/* Footer: Tags */}
          <div className="relative z-10 mt-12 flex flex-wrap gap-3">
            {skill.tags && skill.tags.map(tag => (
              <span key={tag} className="font-ui text-[11px] font-black uppercase tracking-[0.2em] text-white/40 bg-white/5 px-4 py-2 rounded-full border border-white/10 group-hover:border-brand-accent/20 group-hover:text-brand-accent/60 group-hover:bg-brand-accent/5 transition-all">
                {tag}
              </span>
            ))}
          </div>

          {/* Interactive Border (Corner Glows) */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-brand-accent/0 group-hover:border-brand-accent/40 rounded-tr-[3rem] transition-all duration-700 m-4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-brand-accent/0 group-hover:border-brand-accent/40 rounded-bl-[3rem] transition-all duration-700 m-4 pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const { data, error } = await supabase
          .from('skills')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills(fallbackSkills);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        setSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    }

    fetchSkills();
  }, []);

  return (
    <section id="skills" className="relative bg-brand-background py-40 overflow-hidden">
      {/* --- CINEMATIC AMBIANCE --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-brand-accent/10 blur-[150px]" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.2, 0.1], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-brand-violet/10 blur-[150px]" 
        />
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="h-[2px] w-16 bg-brand-accent" />
              <span className="font-ui text-sm font-black tracking-[0.5em] text-brand-accent uppercase">
                Interactive Design Intelligence
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl font-bold text-white md:text-9xl leading-[0.9] tracking-tighter"
            >
              Creative Systems & <br />
              <span className="bg-gradient-to-r from-brand-accent via-white to-brand-violet bg-clip-text text-transparent animate-gradient">
                Digital Mastery.
              </span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:max-w-xs space-y-6 border-l-2 border-white/10 pl-8"
          >
            <p className="font-sans text-brand-text-secondary text-xl leading-relaxed italic opacity-70 hover:opacity-100 transition-opacity">
              Melding architectural precision with high-end cinematic vision to redefine the digital standard.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="font-ui text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">Neural Ready // v2.0</span>
            </div>
          </motion.div>
        </div>

        {/* Asymmetrical Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-brand-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:auto-rows-[450px]">
            {(skills.length > 0 ? skills : fallbackSkills).map((skill, i) => (
              <SkillCard key={skill.title} skill={skill} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
