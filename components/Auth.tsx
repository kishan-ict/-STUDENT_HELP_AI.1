import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './ui/MagneticButton';
import { UserProfile, ViewState } from '../types';
import { Sparkles, Brain, Rocket, X, Check } from 'lucide-react';

interface AuthProps {
  view: ViewState;
  setView: (v: ViewState) => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  profile: UserProfile;
}

// --- Data Configuration ---

type AnimType = 'LOGIC' | 'SCIENCE' | 'CREATIVE' | 'SOCIAL' | 'NATURE';

interface CategoryData {
  name: string;
  type: AnimType;
  subs: string[];
}

const INTEREST_DATA: CategoryData[] = [
  { name: "MATHEMATICS", type: "LOGIC", subs: ["Algebra", "Calculus", "Statistics", "Geometry", "Linear Algebra"] },
  { name: "COMPUTER SCIENCE", type: "LOGIC", subs: ["Algorithms", "Data Structures", "OS", "Networks"] },
  { name: "AI & ML", type: "LOGIC", subs: ["Neural Networks", "Deep Learning", "NLP", "Robotics"] },
  { name: "PHYSICS", type: "SCIENCE", subs: ["Classical", "Quantum", "Thermodynamics", "Astrophysics"] },
  { name: "CHEMISTRY", type: "SCIENCE", subs: ["Organic", "Inorganic", "Biochemistry", "Physical"] },
  { name: "BIOLOGY", type: "SCIENCE", subs: ["Genetics", "Microbiology", "Anatomy", "Marine Biology"] },
  { name: "HISTORY", type: "SOCIAL", subs: ["Ancient", "Modern", "Military", "Art History"] },
  { name: "LITERATURE", type: "CREATIVE", subs: ["Classic", "Poetry", "Modern Fiction", "Creative Writing"] },
  { name: "LANGUAGES", type: "CREATIVE", subs: ["Spanish", "French", "Mandarin", "German", "Japanese"] },
  { name: "ECONOMICS", type: "SOCIAL", subs: ["Micro", "Macro", "Game Theory", "Behavioral Finance"] },
  { name: "BUSINESS", type: "SOCIAL", subs: ["Marketing", "Management", "Entrepreneurship", "Finance"] },
  { name: "PSYCHOLOGY", type: "SOCIAL", subs: ["Cognitive", "Behavioral", "Developmental", "Clinical"] },
  { name: "PHILOSOPHY", type: "CREATIVE", subs: ["Ethics", "Logic", "Metaphysics", "Political Phil"] },
  { name: "ART & DESIGN", type: "CREATIVE", subs: ["Graphic Design", "UI/UX", "Fine Art", "Sculpture"] },
  { name: "ENGINEERING", type: "LOGIC", subs: ["Civil", "Mechanical", "Electrical", "Aerospace"] },
  { name: "LAW", type: "SOCIAL", subs: ["Criminal", "Corporate", "International", "Constitutional"] },
  { name: "MEDICINE", type: "SCIENCE", subs: ["Cardiology", "Neurology", "Pediatrics", "Surgery"] },
  { name: "ENV. SCIENCE", type: "NATURE", subs: ["Ecology", "Climate Change", "Sustainability", "Geology"] }
];

// --- Animation Variants ---

const animations = {
  LOGIC: {
    animate: { scale: [1, 1.02, 0.98, 1], opacity: [0.8, 1, 0.8] },
    transition: { duration: 2, repeat: Infinity, ease: "linear" as const } // Pulse/Glitch-ish
  },
  SCIENCE: {
    // handled via child element rotation to simulate orbit
    animate: {},
    transition: {} 
  },
  CREATIVE: {
    animate: { y: [0, -8, 0] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } // Float
  },
  SOCIAL: {
    animate: { rotate: [0, 5, 0, -5, 0] },
    transition: { duration: 8, repeat: Infinity, ease: "linear" as const } // Slow Spin/Adjust
  },
  NATURE: {
    animate: { rotate: [-3, 3, -3] },
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } // Sway
  }
};

export const Auth: React.FC<AuthProps> = ({ view, setView, updateProfile, profile }) => {
  const [email, setEmail] = useState('');
  
  // State for Onboarding Step 2
  const [selectedMap, setSelectedMap] = useState<Record<string, string[]>>({}); // MainCategory -> [SubOptions]
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const toggleSubOption = (category: string, sub: string) => {
    const current = selectedMap[category] || [];
    const updated = current.includes(sub) 
      ? current.filter(s => s !== sub)
      : [...current, sub];
    
    const newMap = { ...selectedMap };
    if (updated.length > 0) {
      newMap[category] = updated;
    } else {
      delete newMap[category];
    }
    setSelectedMap(newMap);
  };

  const getActiveCount = () => Object.keys(selectedMap).length;

  // Login Screen
  if (view === 'AUTH_LOGIN') {
    return (
      <div className="h-full w-full flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl glass-panel relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-cyan via-purple-500 to-nexus-accent" />
          
          <h2 className="text-3xl font-display font-bold mb-2">Identify</h2>
          <p className="text-white/50 mb-8">Access the Student Nexus.</p>
          
          <div className="space-y-6">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-nexus-cyan transition-colors">Student ID / Email</label>
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-nexus-cyan/50 focus:bg-white/10 transition-all"
                placeholder="nexus@student.edu"
              />
            </div>
            
            <MagneticButton 
              className="w-full" 
              onClick={() => setView('AUTH_ONBOARDING_1')}
            >
              Initialize Session
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    );
  }

  // Onboarding Step 1: Education
  if (view === 'AUTH_ONBOARDING_1') {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="text-4xl font-display mb-12 text-center"
        >
          Select Your Path
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          {['Diploma', 'Engineering'].map((path) => (
            <motion.button
              key={path}
              onClick={() => {
                updateProfile({ education: path as any });
                setView('AUTH_ONBOARDING_2');
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.95 }}
              className="h-64 rounded-3xl glass-panel border border-white/10 flex flex-col items-center justify-center gap-6 group hover:border-nexus-cyan/50 hover:bg-white/5 transition-all"
            >
              <div className={`p-4 rounded-full bg-white/5 group-hover:bg-nexus-cyan/20 transition-colors`}>
                {path === 'Diploma' ? <Sparkles size={32} /> : <Rocket size={32} />}
              </div>
              <span className="text-2xl font-light tracking-wide">{path}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Onboarding Step 2: Interests Grid
  if (view === 'AUTH_ONBOARDING_2') {
    return (
      <div className="h-full w-full flex flex-col items-center p-4 relative overflow-hidden bg-[#121212]">
        
        {/* Header */}
        <div className="z-10 mt-8 mb-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold mb-2 text-white"
          >
            Calibrate Interests
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-white/50 text-sm uppercase tracking-widest"
          >
            Select exactly 4 Main Bubbles to form your cluster.
          </motion.p>
          <motion.div 
             key={getActiveCount()}
             initial={{ scale: 1.2, color: '#fff' }} animate={{ scale: 1, color: getActiveCount() >= 4 ? '#10b981' : '#6b7280' }}
             className="mt-2 font-mono text-xs"
          >
             ACTIVE CLUSTERS: {getActiveCount()} / 4
          </motion.div>
        </div>

        {/* BUBBLE GRID */}
        <div className="flex-1 w-full max-w-6xl overflow-y-auto pb-32 px-4 scrollbar-hide">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {INTEREST_DATA.map((cat, i) => {
              const isActive = !!selectedMap[cat.name];
              const anim = animations[cat.type];

              return (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group"
                >
                  <motion.button
                    onClick={() => setActiveModal(cat.name)}
                    animate={anim.animate}
                    transition={anim.transition}
                    className={`w-32 h-32 rounded-full flex flex-col items-center justify-center p-4 text-center transition-all duration-500 relative z-10 ${
                      isActive 
                        ? 'bg-nexus-cyan/10 border-nexus-cyan text-white shadow-[0_0_30px_rgba(6,182,212,0.3)]' 
                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/30'
                    } border backdrop-blur-sm`}
                  >
                    <span className="text-[10px] font-bold tracking-widest leading-tight">{cat.name}</span>
                    {isActive && (
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-nexus-cyan" />
                    )}
                  </motion.button>
                  
                  {/* Specific Decoration based on type */}
                  {cat.type === 'SCIENCE' && (
                     <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className={`absolute inset-[-4px] rounded-full border border-dashed border-white/10 pointer-events-none ${isActive ? 'border-nexus-cyan/40' : ''}`}
                     />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Confirmation */}
        <div className="absolute bottom-10 z-20">
          <MagneticButton 
            onClick={() => {
               if (getActiveCount() >= 4) {
                 // Flatten interests and save
                 const allInterests = Object.entries(selectedMap).flatMap(([cat, subs]) => [`${cat}`, ...subs]);
                 updateProfile({ interests: allInterests });
                 setView('AUTH_ONBOARDING_3');
               }
            }}
            className={getActiveCount() >= 4 ? '' : 'opacity-50 cursor-not-allowed grayscale'}
          >
            {getActiveCount() >= 4 ? 'Confirm Cluster' : 'Expand More Nodes'}
          </MagneticButton>
        </div>

        {/* SUB-SELECTION MODAL */}
        <AnimatePresence>
          {activeModal && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setActiveModal(null)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#1a1a24] border border-white/10 p-8 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
              >
                 {/* Modal Header */}
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="text-2xl font-display font-bold text-white">{activeModal}</h3>
                   <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                     <X size={20} className="text-white/60" />
                   </button>
                 </div>
                 
                 <p className="text-white/40 text-sm mb-6">Select focus areas to activate this node.</p>

                 {/* Sub Options */}
                 <div className="flex flex-wrap gap-3">
                   {INTEREST_DATA.find(c => c.name === activeModal)?.subs.map(sub => {
                     const isSelected = selectedMap[activeModal!]?.includes(sub);
                     return (
                       <button
                         key={sub}
                         onClick={() => toggleSubOption(activeModal!, sub)}
                         className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 border ${
                           isSelected 
                           ? 'bg-nexus-cyan/20 border-nexus-cyan text-nexus-cyan' 
                           : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                         }`}
                       >
                         {sub}
                         {isSelected && <Check size={14} />}
                       </button>
                     );
                   })}
                 </div>

                 {/* Modal Actions */}
                 <div className="mt-8 flex justify-end">
                   <button 
                     onClick={() => setActiveModal(null)}
                     className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-nexus-cyan hover:text-white transition-colors text-sm uppercase tracking-wide"
                   >
                     Done
                   </button>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    );
  }

  // Onboarding Step 3: Goals Timeline
  if (view === 'AUTH_ONBOARDING_3') {
    return (
       <div className="h-full w-full flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8"
        >
          <h2 className="text-4xl font-display">Target Graduation</h2>
          
          <div className="w-full max-w-lg mx-auto py-12">
            <input 
              type="range" 
              min="2024" 
              max="2030" 
              step="1"
              value={profile.goalYear}
              onChange={(e) => updateProfile({ goalYear: parseInt(e.target.value) })}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-nexus-cyan"
            />
            <div className="mt-8 text-8xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-nexus-cyan to-purple-500">
              {profile.goalYear}
            </div>
          </div>

          <MagneticButton 
            variant="primary" 
            onClick={() => setView('DASHBOARD')}
            className="mt-8"
          >
            <span className="flex items-center gap-2"><Brain size={18}/> Build My Nexus</span>
          </MagneticButton>
        </motion.div>
       </div>
    );
  }

  return null;
};