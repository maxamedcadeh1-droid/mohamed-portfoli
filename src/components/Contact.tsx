import { motion, AnimatePresence } from 'motion/react';
import { Send, MapPin, Mail, Phone, Instagram, Twitter, Linkedin, Github, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';

const contactInfo = [
  {
    icon: Mail,
    label: "Email Me",
    value: "maxamedcadeh1@gmail.com",
    href: "mailto:maxamedcadeh1@gmail.com"
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+252 611674258",
    href: "tel:+252611674258"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Mogadishu, Hodan, Somalia",
    href: "#"
  }
];

const socials = [
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
  { icon: Github, href: "#" },
  { icon: Instagram, href: "#" },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            full_name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: unknown) {
      console.error('Supabase Error:', error);
      setStatus('error');
      
      let message = 'Failed to send message';
      if (error && typeof error === 'object') {
        message = (error as { message?: string }).message || 
                  (error as { details?: string }).details || 
                  message;
      }
      setErrorMessage(message);
    }
  };

  return (
    <section id="contact" className="relative bg-brand-background py-32 overflow-hidden">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 h-full w-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-brand-accent/20 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-brand-violet/20 blur-[150px] animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
            
            {/* Left Column: Content & Info */}
            <div className="flex flex-col justify-center space-y-12">
              <div className="space-y-6 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 px-6 backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent"></span>
                  </span>
                  <span className="font-ui text-[10px] font-bold tracking-[0.4em] text-brand-text-secondary uppercase">Available for new projects</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-display text-5xl font-bold leading-[1.1] text-white md:text-7xl lg:text-8xl"
                >
                  Ready to <br />
                  <span className="bg-gradient-to-r from-brand-accent to-brand-violet bg-clip-text text-transparent">Collaborate?</span>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="max-w-md font-sans text-lg text-brand-text-secondary italic lg:mx-0 mx-auto"
                >
                  Let's craft a digital experience that transcends boundaries. Reach out via the form or the direct channels below.
                </motion.p>
              </div>

              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {contactInfo.map((info, i) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass group flex items-center gap-6 rounded-2xl p-6 transition-all hover:bg-white/[0.08] hover:border-white/20"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 border border-brand-accent/20 group-hover:scale-110 transition-transform">
                      <info.icon className="h-6 w-6 text-brand-accent" />
                    </div>
                    <div>
                      <p className="font-ui text-[10px] font-bold tracking-widest text-brand-text-secondary uppercase">{info.label}</p>
                      <p className="font-display text-lg text-white group-hover:text-brand-accent transition-colors">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Socials */}
              <div className="flex justify-center gap-4 lg:justify-start">
                {socials.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    whileHover={{ y: -8, scale: 1.1 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:border-brand-accent hover:text-brand-accent shadow-xl"
                  >
                    <social.icon className="h-6 w-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column: Modern Form */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass relative rounded-[2.5rem] p-8 md:p-12 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="space-y-3">
                    <label className="font-ui text-[10px] font-bold tracking-[0.2em] text-brand-text-secondary uppercase pl-1">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name" 
                      className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 font-sans text-white ring-brand-accent/40 transition-all placeholder:text-white/20 focus:border-brand-accent/50 focus:ring-4 focus:outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="font-ui text-[10px] font-bold tracking-[0.2em] text-brand-text-secondary uppercase pl-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@email.com" 
                      className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 font-sans text-white ring-brand-accent/40 transition-all placeholder:text-white/20 focus:border-brand-accent/50 focus:ring-4 focus:outline-none" 
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="font-ui text-[10px] font-bold tracking-[0.2em] text-brand-text-secondary uppercase pl-1">Subject</label>
                  <input 
                    required
                    type="text" 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry" 
                    className="w-full rounded-2xl border border-white/5 bg-white/5 p-5 font-sans text-white ring-brand-accent/40 transition-all placeholder:text-white/20 focus:border-brand-accent/50 focus:ring-4 focus:outline-none" 
                  />
                </div>

                <div className="space-y-3">
                  <label className="font-ui text-[10px] font-bold tracking-[0.2em] text-brand-text-secondary uppercase pl-1">How can I help?</label>
                  <textarea 
                    required
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your amazing vision..." 
                    className="w-full resize-none rounded-3xl border border-white/5 bg-white/5 p-6 font-sans text-white ring-brand-accent/40 transition-all placeholder:text-white/20 focus:border-brand-accent/50 focus:ring-4 focus:outline-none" 
                  />
                </div>

                <button 
                  disabled={status === 'loading'}
                  className="group relative w-full overflow-hidden rounded-[1.5rem] bg-brand-accent py-6 font-ui text-xs font-bold tracking-[0.2em] text-white transition-all shadow-[0_20px_40px_-10px_rgba(59,130,246,0.5)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'loading' ? (
                      <>SENDING... <Loader2 className="h-4 w-4 animate-spin" /></>
                    ) : (
                      <>SEND MESSAGE <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
                    )}
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>

                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="font-sans text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500"
                    >
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-sans text-sm font-medium">{errorMessage || 'Something went wrong. Please try again.'}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Decorative Corner Glow */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-brand-accent/20 blur-2xl" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

