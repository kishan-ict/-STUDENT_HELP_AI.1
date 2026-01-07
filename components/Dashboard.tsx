import React from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './ui/TiltCard';
import { ViewState } from '../types';
import { Brain, Heart, FileText, Briefcase, Shield, BarChart3, Clock, Zap } from 'lucide-react';

interface DashboardProps {
  setView: (v: ViewState) => void;
}

const modules = [
  { id: 'MODULE_STUDY', title: 'Study AI', desc: 'Deep learning companion', icon: <Brain className="text-nexus-cyan" size={32} />, col: 'col-span-1 md:col-span-2', bg: 'bg-gradient-to-br from-nexus-cyan/10 to-transparent' },
  { id: 'MODULE_WELLNESS', title: 'Mental Wellness', desc: 'Balance & focus', icon: <Heart className="text-rose-400" size={32} />, col: 'col-span-1', bg: 'bg-gradient-to-br from-rose-500/10 to-transparent' },
  { id: 'MODULE_RESUME', title: 'ResumeAI', desc: 'Career architect', icon: <FileText className="text-amber-400" size={32} />, col: 'col-span-1', bg: 'bg-gradient-to-br from-amber-500/10 to-transparent' },
  { id: 'MODULE_PROJECT', title: 'Project Gen', desc: 'Instant prototypes', icon: <Zap className="text-yellow-300" size={32} />, col: 'col-span-1', bg: 'bg-gradient-to-br from-yellow-400/10 to-transparent' },
  { id: 'MODULE_CYBER', title: 'Cyber Roadmap', desc: 'Ethical hacking path', icon: <Shield className="text-emerald-400" size={32} />, col: 'col-span-1 md:col-span-2', bg: 'bg-gradient-to-br from-emerald-500/10 to-transparent' },
  { id: 'MODULE_PROFILE', title: 'Analytics', desc: 'Skill growth tracking', icon: <BarChart3 className="text-purple-400" size={32} />, col: 'col-span-1', bg: 'bg-gradient-to-br from-purple-500/10 to-transparent' },
];

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="h-full w-full overflow-y-auto p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
             <motion.p 
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
               className="text-nexus-cyan font-mono text-xs mb-2"
             >
               SYSTEM STATUS: ONLINE
             </motion.p>
             <motion.h1 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
               className="text-4xl md:text-5xl font-display font-bold"
             >
               Command Center
             </motion.h1>
          </div>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="hidden md:flex items-center gap-2 text-white/40 text-sm font-mono"
          >
             <Clock size={14} /> 
             <span>{new Date().toLocaleTimeString()}</span>
          </motion.div>
        </header>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {modules.map((mod) => (
            <motion.div key={mod.id} variants={item} className={mod.col}>
              <TiltCard 
                onClick={() => setView(mod.id as ViewState)}
                className={`h-64 rounded-3xl glass-panel border border-white/5 p-6 flex flex-col justify-between group overflow-hidden ${mod.bg}`}
              >
                 <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500" />
                 
                 <div className="relative z-10 flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10">
                      {mod.icon}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white]" />
                    </div>
                 </div>

                 <div className="relative z-10">
                   <h3 className="text-2xl font-display font-medium mb-1 group-hover:text-nexus-cyan transition-colors">{mod.title}</h3>
                   <p className="text-white/50 text-sm">{mod.desc}</p>
                 </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};