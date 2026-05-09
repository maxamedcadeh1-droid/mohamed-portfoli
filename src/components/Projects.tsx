import { motion } from 'motion/react';
import { ExternalLink, ArrowUpRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Project {
  title: string;
  category: string;
  image: string;
  year: string;
  tools: string[];
  description: string;
}

const fallbackProjects: Project[] = [
  {
    title: 'Mohamed Digital Portfolio',
    category: 'Personal Portfolio Project',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    tools: ['React', 'Vite', 'Tailwind'],
    description: 'A cinematic personal portfolio focused on modern UI design, premium dark aesthetics, smooth interactions, and creative presentation.',
  },
  {
    title: 'Morla Coffee Website',
    category: 'Website Concept Project',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    tools: ['Figma', 'UI/UX', 'Design'],
    description: 'A modern coffee website concept exploring cinematic layout design, responsive user experience, and premium visual storytelling.',
  },
  {
    title: 'Morative Store Concept',
    category: 'eCommerce UI Concept',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    tools: ['Design', 'Concept', 'UI'],
    description: 'A futuristic online store concept focused on clean shopping UI, modern product presentation, and immersive digital experience.',
  },
  {
    title: 'IlaysTech Brand Concept',
    category: 'Brand Identity Concept',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    tools: ['Branding', 'Logo', 'Design'],
    description: 'A Somali-inspired futuristic technology brand concept combining modern visuals, glowing UI direction, and cinematic branding.',
  },
  {
    title: 'Motion Graphics & Video Editing',
    category: 'Creative Media Work',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    year: '2024',
    tools: ['After Effects', 'Premiere', 'Motion'],
    description: 'A collection of motion graphics, cinematic edits, TikTok visuals, and creative video projects focused on digital storytelling and visual creativity.',
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('year', { ascending: false });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="bg-brand-background py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-24 flex flex-col items-end gap-4 text-right">
          <motion.span 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-ui text-[10px] font-bold tracking-[0.6em] text-brand-accent uppercase"
          >
            Digital exhibition
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-display text-5xl font-bold leading-none text-white md:text-8xl lg:text-9xl tracking-tighter"
          >
            Selected <span className="italic text-brand-text-secondary">Works</span>
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-brand-accent animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {(projects.length > 0 ? projects : fallbackProjects).map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                className="group cursor-pointer space-y-8"
              >
                <div className="relative aspect-[14/10] overflow-hidden rounded-[3rem] border border-white/10 bg-brand-secondary shadow-[0_30px_60px_-10px_rgba(0,0,0,0.5)] transition-all duration-700 group-hover:border-brand-accent/50 group-hover:shadow-[0_0_100px_-20px_rgba(59,130,246,0.3)]">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-brand-background/20" />
                  
                  {/* Float Badge */}
                  <div className="glass absolute top-8 right-8 px-5 py-2.5 rounded-full border border-white/20 backdrop-blur-xl">
                    <span className="font-ui text-[10px] font-bold text-white uppercase tracking-widest">{project.year}</span>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                     <motion.div 
                       whileHover={{ scale: 1.1 }}
                       className="h-20 w-20 items-center justify-center rounded-full bg-white text-black flex transform translate-y-8 transition-transform duration-500 group-hover:translate-y-0 shadow-[0_0_50px_rgba(255,255,255,0.5)]"
                     >
                        <ArrowUpRight className="h-8 w-8" />
                     </motion.div>
                  </div>
                </div>

                <div className="flex items-start justify-between px-6">
                  <div className="space-y-2">
                    <motion.span 
                      whileHover={{ x: 5 }}
                      className="inline-block font-ui text-[10px] font-bold tracking-widest text-brand-accent uppercase italic transition-all"
                    >
                      {project.category}
                    </motion.span>
                    <h3 className="font-display text-4xl font-bold text-white md:text-5xl">{project.title}</h3>
                  </div>
                  <div className="flex gap-2 pt-2">
                    {project.tools && project.tools.slice(0, 2).map(tool => (
                      <span key={tool} className="font-ui text-[9px] font-bold text-brand-text-secondary border border-white/10 px-3 py-1.5 rounded-full uppercase backdrop-blur-md">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="px-6 font-sans text-lg text-brand-text-secondary line-clamp-2 italic opacity-80 leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-20 flex justify-center">
           <button className="glass group relative flex items-center gap-4 rounded-full px-12 py-5 font-ui font-bold text-white transition-all hover:bg-white/5 active:scale-95 shadow-2xl">
              EXPLORE ALL CASE STUDIES
              <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
           </button>
        </div>
      </div>
    </section>
  );
}
