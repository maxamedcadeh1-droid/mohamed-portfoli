import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const words = [
  "STRATEGY",
  "DESIGN",
  "DEVELOPMENT",
  "INNOVATION",
  "MOHAMED"
];

export default function Preloader({ onComplete }: { onComplete: () => void, key?: string | number }) {
  const [index, setIndex] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (index === words.length - 1) {
      if (percent === 100) {
        setTimeout(onComplete, 800);
      }
      return;
    }
    const timeout = setTimeout(() => setIndex(prev => prev + 1), 300);
    return () => clearTimeout(timeout);
  }, [index, percent, onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* Background Panels for Curtain Effect */}
      <motion.div
        initial={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.2 }}
        className="absolute inset-0 z-0 bg-brand-background"
      />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Typographic Sequence */}
        <div className="h-20 md:h-28 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <span className="font-display text-5xl font-bold tracking-tighter text-white md:text-8xl lg:text-9xl">
                {words[index]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-12 flex items-center gap-8"
        >
          <div className="flex flex-col items-start">
             <span className="font-ui text-[10px] font-bold tracking-[0.4em] text-brand-accent uppercase">Loading</span>
             <div className="mt-2 h-[2px] w-32 bg-white/5 relative overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  className="absolute inset-y-0 left-0 bg-brand-accent"
                />
             </div>
          </div>
          <span className="font-mono text-4xl font-light text-white/20 lining-nums">
            {percent.toString().padStart(3, '0')}
          </span>
        </motion.div>
      </div>

      {/* Decorative Glow that scales out */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 2, opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/5 blur-[120px]"
      />
    </motion.div>
  );
}
