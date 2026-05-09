import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*');
        
        if (error) throw error;
        if (data) setTestimonials(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  return (
    <section className="bg-brand-background py-32 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 px-6 backdrop-blur-md"
          >
            <span className="font-ui text-[10px] font-bold tracking-[0.4em] text-brand-text-secondary uppercase">Client Voices</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white md:text-6xl"
          >
            Digital <span className="italic text-brand-accent">Endorsements</span>
          </motion.h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-brand-accent animate-spin" />
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-12 no-scrollbar gap-8">
             {testimonials.map((t, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, x: 100, rotateY: 20 }}
                 whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.2 }}
                 whileHover={{ y: -10, scale: 1.02 }}
                 className="glass min-w-[320px] md:min-w-[500px] flex-1 rounded-[3rem] p-12 md:p-16 border border-white/10 shrink-0 relative overflow-hidden group shadow-2xl"
               >
                 <div className="absolute top-0 right-0 p-8 text-brand-accent/10 font-display text-8xl transition-all group-hover:text-brand-accent/20">"</div>
                 <p className="mb-10 font-display text-2xl md:text-3xl italic leading-tight text-white relative z-10 opacity-90">"{t.text}"</p>
                 <div className="flex items-center gap-4">
                   <div className="h-12 w-12 rounded-full bg-gradient-to-br from-brand-accent to-brand-violet p-[1px]">
                     <div className="h-full w-full rounded-full bg-brand-background flex items-center justify-center text-xs font-bold text-white">
                       {t.name.split(' ').map(n => n[0]).join('')}
                     </div>
                   </div>
                   <div className="space-y-1">
                     <p className="font-ui text-sm font-bold text-white uppercase tracking-wider">{t.name}</p>
                     <p className="font-ui text-[10px] font-bold tracking-widest text-brand-accent uppercase">{t.role}</p>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        )}
      </div>
    </section>
  );
}
