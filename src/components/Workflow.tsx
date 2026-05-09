import { motion } from 'motion/react';

const services = [
  { step: "01", title: "Strategy & Audit", desc: "Analyzing deep metrics and creative direction to find the unique brand voice." },
  { step: "02", title: "Systems Design", desc: "Building scalable UI kits and design systems that breathe with the brand." },
  { step: "03", title: "Motion Engineering", desc: "Injecting life into static pixels through high-end cinematic animations." },
  { step: "04", title: "Launch & Growth", desc: "Seamless deployment and continuous evolution of the digital product." },
];

export default function Workflow() {
  return (
    <section id="process" className="bg-brand-background py-32 border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          
          <div className="sticky top-32 h-max space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 px-6 backdrop-blur-md"
              >
                <div className="h-2 w-2 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-ui text-[10px] font-bold tracking-[0.4em] text-brand-text-secondary uppercase">Standard of Excellence</span>
              </motion.div>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-4xl font-bold leading-tight text-white md:text-7xl lg:text-8xl tracking-tight"
              >
                A meticulous <br />
                process for <br />
                <span className="bg-gradient-to-r from-brand-accent to-brand-violet bg-clip-text text-transparent italic">unprecedented</span> <br />
                results.
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="max-w-md font-sans text-xl text-brand-text-secondary leading-relaxed italic"
            >
              I don't just build websites; I craft digital ecosystems. Each step is calculated to maximize impact and ensure a premium feel.
            </motion.p>
          </div>

          <div className="space-y-8">
            {services.map((service, i) => (
              <motion.div
                key={service.step}
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                whileHover={{ x: 20 }}
                className="glass group flex items-start gap-10 rounded-[2.5rem] p-12 border border-white/10 transition-all hover:bg-white/[0.08] relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative font-display text-7xl font-bold text-white/5 group-hover:text-brand-accent/20 transition-all duration-700">{service.step}</span>
                <div className="relative space-y-4">
                  <h3 className="font-display text-3xl font-bold text-white group-hover:text-brand-accent transition-colors">{service.title}</h3>
                  <p className="font-sans text-lg text-brand-text-secondary italic leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
