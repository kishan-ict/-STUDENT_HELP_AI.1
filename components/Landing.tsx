import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface LandingProps {
  onEnter: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onEnter }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Sequence orchestration
    const timer1 = setTimeout(() => setStage(1), 1000); // Dot expand
    const timer2 = setTimeout(() => setStage(2), 2500); // Text reveal
    const timer3 = setTimeout(() => setStage(3), 4000); // CTA

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-nexus-black text-white">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50 animate-pulse-slow" />
      
      <AnimatePresence>
        {stage === 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-4 h-4 bg-white rounded-full shadow-[0_0_40px_rgba(255,255,255,0.8)]"
          />
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="z-10 text-center"
      >
        <motion.h1 
          className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40"
          initial={{ y: 50, filter: 'blur(10px)' }}
          animate={{ y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          NEXUS AI
        </motion.h1>

        <div className="space-y-4 font-light text-lg md:text-xl text-white/60 tracking-widest uppercase">
          {stage >= 2 && (
            <>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>One Platform.</motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>One Intelligence.</motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>One Student Companion.</motion.p>
            </>
          )}
        </div>

        {stage >= 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1 }}
            className="mt-16"
          >
            <MagneticButton onClick={onEnter} variant="primary">
              Enter Nexus <ArrowRight className="w-4 h-4 ml-2" />
            </MagneticButton>
          </motion.div>
        )}
      </motion.div>

      {stage >= 3 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
        >
          <span>System Ready</span>
          <ChevronDown className="animate-bounce" />
        </motion.div>
      )}
    </div>
  );
};