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

const fallbackSkills = [
  'AI-assisted Website Building',
  'Modern Website Design',
  'Responsive UI Design',
  'Logo Design',
  'Video Editing',
  'Motion Graphics'
];

export default function Skills() {
  const [skills, setSkills] = useState<string[]>([]);
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
          setSkills(data.map((s: any) => s.title || s));
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
                Creative Digital Mastery
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-6xl font-bold text-white md:text-9xl leading-[0.9] tracking-tighter"
            >
              Creative Digital <br />
              <span className="bg-gradient-to-r from-brand-accent via-white to-brand-violet bg-clip-text text-transparent animate-gradient">
                Builder
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
              Crafting premium digital experiences through AI-assisted design, modern web development, and creative visual storytelling.
            </p>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
              <span className="font-ui text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">Personal Craft // v1.0</span>
            </div>
          </motion.div>
        </div>

        {/* Premium Skills Card */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-brand-accent animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-6xl mx-auto"
          >
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.03] p-12 md:p-16 backdrop-blur-xl group hover:border-white/20 hover:bg-white/[0.05] transition-all duration-700">
              
              {/* Spotlight Glow */}
              <motion.div
                className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(800px circle at center, rgba(255,255,255,0.08), transparent 40%)`
                }}
              />

              {/* Background Ambient Aura */}
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-[120px] opacity-10 transition-all duration-700 group-hover:opacity-30 group-hover:scale-125 bg-gradient-to-br from-brand-accent to-brand-violet" />

              <div className="relative z-10 space-y-12">
                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(skills.length > 0 ? skills : fallbackSkills).map((skill, i) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="group/skill"
                    >
                      <div className="flex items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-500">
                        <div className="h-3 w-3 rounded-full bg-brand-accent/60 group-hover/skill:bg-brand-accent transition-colors duration-500" />
                        <span className="font-ui text-sm font-bold text-white/80 group-hover/skill:text-white transition-colors duration-500 uppercase tracking-wide">
                          {skill}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Interactive Border Glows */}
              <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-brand-accent/0 group-hover:border-brand-accent/40 rounded-tr-[3rem] transition-all duration-700 m-4 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-brand-accent/0 group-hover:border-brand-accent/40 rounded-bl-[3rem] transition-all duration-700 m-4 pointer-events-none" />
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
