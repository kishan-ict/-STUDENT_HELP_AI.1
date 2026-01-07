import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowLeft, Layers, Check, GraduationCap } from 'lucide-react';
import { generateProjectStructure, generateVivaQuestions } from '../../services/geminiService';
import { MagneticButton } from '../ui/MagneticButton';
import { FlipCard } from '../ui/FlipCard';

export const ProjectGen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [domain, setDomain] = useState<string>('Web3');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // Viva Mode State
  const [viewMode, setViewMode] = useState<'BLUEPRINT' | 'VIVA'>('BLUEPRINT');
  const [vivaQuestions, setVivaQuestions] = useState<Array<{question: string, answer: string}>>([]);
  const [vivaLoading, setVivaLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setViewMode('BLUEPRINT');
    setVivaQuestions([]);
    
    try {
      const raw = await generateProjectStructure(domain);
      setResult(JSON.parse(raw));
    } catch (e) {
      setResult({ title: "Generator Error", description: "Please try again.", features: [] });
    }
    setLoading(false);
  };

  const handleEnterViva = async () => {
    setViewMode('VIVA');
    if (vivaQuestions.length === 0 && result) {
        setVivaLoading(true);
        const qs = await generateVivaQuestions(result.title, result.description);
        setVivaQuestions(qs);
        setVivaLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95, rotateX: -15 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        mass: 1
      }
    }
  };

  return (
    <div className="h-full flex flex-col bg-nexus-dark relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <header className="p-6 z-10 flex justify-between items-center bg-nexus-black/20 backdrop-blur-sm border-b border-white/5">
         <div className="flex items-center gap-4">
           <button onClick={onBack} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeft size={20} /> <span className="uppercase text-xs tracking-widest hidden md:inline">Return</span>
           </button>
           <div className="h-6 w-px bg-white/10" />
           <h2 className="font-display font-bold text-xl text-yellow-100">Project Architect</h2>
         </div>
         
         {result && !loading && (
             <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setViewMode('BLUEPRINT')}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${viewMode === 'BLUEPRINT' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}
                >
                    Blueprint
                </button>
                <button 
                  onClick={handleEnterViva}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${viewMode === 'VIVA' ? 'bg-yellow-500/20 text-yellow-200' : 'text-white/40 hover:text-white'}`}
                >
                    <GraduationCap size={14} /> Viva Mode
                </button>
             </div>
         )}
      </header>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
            {viewMode === 'BLUEPRINT' ? (
                <motion.div 
                    key="blueprint"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col md:flex-row p-6 gap-8 z-10 overflow-y-auto"
                >
                    {/* Controls */}
                    <div className="w-full md:w-1/3 glass-panel rounded-3xl p-6 flex flex-col gap-6 h-fit shrink-0">
                        <h3 className="text-sm uppercase tracking-widest text-white/50">Domain Selection</h3>
                        <div className="grid grid-cols-2 gap-4">
                        {['AI/ML', 'Web3', 'IoT', 'Fintech', 'EdTech', 'Health'].map(d => (
                            <button 
                            key={d}
                            onClick={() => setDomain(d)}
                            className={`p-4 rounded-xl border transition-all text-left ${domain === d ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-200' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'}`}
                            >
                            {d}
                            </button>
                        ))}
                        </div>
                        <MagneticButton onClick={handleGenerate} className="mt-4">
                        {loading ? "Constructing..." : "Generate Blueprint"}
                        </MagneticButton>
                    </div>

                    {/* Output */}
                    <div className="flex-1 glass-panel rounded-3xl p-8 flex flex-col justify-center items-center relative min-h-[400px]">
                        {!result && !loading && (
                        <div className="text-white/30 flex flex-col items-center gap-4">
                            <Layers size={48} />
                            <p>Waiting for input parameters...</p>
                        </div>
                        )}

                        {loading && (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-16 h-16 border-4 border-yellow-500/30 border-t-yellow-500 rounded-full animate-spin" />
                            <p className="text-yellow-500/80 animate-pulse font-mono text-xs">ARCHITECTING SOLUTION...</p>
                        </div>
                        )}

                        {result && !loading && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-2xl"
                        >
                            <div className="mb-2 text-yellow-400 text-xs font-mono uppercase tracking-widest border border-yellow-400/30 px-2 py-1 rounded w-fit">{result.difficulty || "Advanced"}</div>
                            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">{result.title}</h1>
                            <p className="text-lg text-white/70 mb-8 leading-relaxed">{result.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.features?.map((f: string, i: number) => (
                                <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3"
                                >
                                <Check className="text-yellow-500 mt-1" size={16} />
                                <span className="text-sm text-white/80">{f}</span>
                                </motion.div>
                            ))}
                            </div>
                        </motion.div>
                        )}
                    </div>
                </motion.div>
            ) : (
                <motion.div 
                    key="viva"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="h-full p-6 overflow-y-auto"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-display font-bold mb-2">Viva Voce Preparation</h2>
                            <p className="text-white/50">Master your defense for "{result?.title}"</p>
                        </div>

                        {vivaLoading ? (
                            <div className="h-64 flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-4 border-nexus-cyan/30 border-t-nexus-cyan rounded-full animate-spin" />
                                <p className="text-nexus-cyan animate-pulse text-xs tracking-widest uppercase">Analyzing Project Architecture...</p>
                            </div>
                        ) : (
                            <motion.div 
                              variants={containerVariants}
                              initial="hidden"
                              animate="show"
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 pb-12"
                            >
                                {vivaQuestions.map((q, i) => (
                                    <motion.div key={i} variants={cardVariants} style={{ perspective: 1000 }}>
                                      <FlipCard question={q.question} answer={q.answer} index={i} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                        
                        {!vivaLoading && vivaQuestions.length === 0 && (
                            <div className="text-center text-white/30">
                                <p>No questions generated. Try refreshing.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
};