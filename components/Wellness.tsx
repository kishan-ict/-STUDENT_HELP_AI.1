import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Wind, Moon, Sun, Headphones, 
  Play, Pause, RotateCcw, X, Brain, 
  Leaf, Battery, Coffee, Music, Activity
} from 'lucide-react';

interface WellnessProps {
  onBack: () => void;
}

type Category = 'MINDFULNESS' | 'RECOVERY' | 'PHYSICAL' | 'SENSORY';

interface WellnessActivity {
  id: string;
  title: string;
  subtitle: string;
  duration: number; // in seconds
  category: Category;
  icon: React.ReactNode;
  color: string;
  instruction?: string; // For text-based guidance
  type: 'TIMER' | 'BREATHING' | 'JOURNAL' | 'AUDIO';
}

const ACTIVITIES: WellnessActivity[] = [
  // Mindfulness
  { id: 'box-breath', title: 'Box Breathing', subtitle: '4-4-4-4 Technique', duration: 180, category: 'MINDFULNESS', icon: <Wind />, color: 'text-nexus-cyan', type: 'BREATHING' },
  { id: 'grounding', title: '5-4-3-2-1 Grounding', subtitle: 'Anxiety Reset', duration: 300, category: 'MINDFULNESS', icon: <Leaf />, color: 'text-emerald-400', type: 'TIMER', instruction: 'Acknowledge 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.' },
  { id: 'visualization', title: 'Cosmic Voyage', subtitle: 'Guided Visualization', duration: 600, category: 'MINDFULNESS', icon: <Moon />, color: 'text-purple-400', type: 'TIMER' },
  { id: 'brain-dump', title: 'Brain Dump', subtitle: 'Clear Mental RAM', duration: 600, category: 'MINDFULNESS', icon: <Brain />, color: 'text-rose-400', type: 'JOURNAL' },
  
  // Recovery
  { id: 'power-nap', title: 'Power Nap', subtitle: 'System Reboot', duration: 1200, category: 'RECOVERY', icon: <Battery />, color: 'text-yellow-400', type: 'TIMER' },
  { id: 'nsdr', title: 'NSDR', subtitle: 'Non-Sleep Deep Rest', duration: 600, category: 'RECOVERY', icon: <Moon />, color: 'text-indigo-400', type: 'TIMER' },
  { id: 'digital-detox', title: 'Digital Detox', subtitle: 'Screen-Free Block', duration: 1800, category: 'RECOVERY', icon: <X />, color: 'text-slate-400', type: 'TIMER' },
  { id: 'pomodoro-rest', title: 'Pomodoro Rest', subtitle: '5-Min Decompression', duration: 300, category: 'RECOVERY', icon: <Coffee />, color: 'text-orange-400', type: 'TIMER' },

  // Physical
  { id: 'desk-yoga', title: 'Desk Yoga', subtitle: 'Neck & Shoulder Release', duration: 300, category: 'PHYSICAL', icon: <Activity />, color: 'text-teal-400', type: 'TIMER', instruction: 'Follow the rhythm: Neck rolls (1m), Shoulder shrugs (1m), Seated twist (1m).' },
  { id: 'pmr', title: 'Muscle Relaxation', subtitle: 'Progressive Release', duration: 420, category: 'PHYSICAL', icon: <Activity />, color: 'text-blue-400', type: 'TIMER' },
  
  // Sensory
  { id: 'brown-noise', title: 'Brown Noise', subtitle: 'Deep Focus Audio', duration: 0, category: 'SENSORY', icon: <Headphones />, color: 'text-amber-700', type: 'AUDIO' },
  { id: 'nature-walk', title: 'Circadian Reset', subtitle: 'Outdoor Walk', duration: 300, category: 'SENSORY', icon: <Sun />, color: 'text-yellow-200', type: 'TIMER', instruction: 'Step outside. View sunlight. Walk briskly. Reset your biological clock.' },
];

export const Wellness: React.FC<WellnessProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Category>('MINDFULNESS');
  const [selectedActivity, setSelectedActivity] = useState<WellnessActivity | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Hold Empty'>('Inhale');
  const [journalEntry, setJournalEntry] = useState('');

  // Timer Logic
  useEffect(() => {
    let interval: any;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  // Breathing Logic
  useEffect(() => {
    if (selectedActivity?.type === 'BREATHING' && isPlaying) {
      const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Hold Empty')[] = ['Inhale', 'Hold', 'Exhale', 'Hold Empty'];
      let phaseIndex = 0;
      
      const breathInterval = setInterval(() => {
        phaseIndex = (phaseIndex + 1) % 4;
        setBreathPhase(phases[phaseIndex]);
      }, 4000); // 4 second intervals for Box Breathing

      return () => clearInterval(breathInterval);
    }
  }, [isPlaying, selectedActivity]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartActivity = (activity: WellnessActivity) => {
    setSelectedActivity(activity);
    setTimeLeft(activity.duration);
    setIsPlaying(true);
    setBreathPhase('Inhale');
  };

  const handleExitActivity = () => {
    setSelectedActivity(null);
    setIsPlaying(false);
  };

  return (
    <div className="h-full w-full relative overflow-hidden bg-nexus-dark flex flex-col">
       {/* Ambient Background */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: isPlaying ? [1, 1.1, 1] : 1,
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-teal-900/10 via-nexus-black to-transparent"
          />
       </div>

       {/* Header */}
       <header className="p-6 flex items-center justify-between z-20 bg-nexus-black/20 backdrop-blur-sm border-b border-white/5">
        <button onClick={selectedActivity ? handleExitActivity : onBack} className="text-white/60 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={20} /> <span className="uppercase text-xs tracking-widest hidden md:inline">{selectedActivity ? 'End Session' : 'Return'}</span>
        </button>
        <h2 className="text-xl font-display text-white/90 tracking-wide">
          {selectedActivity ? selectedActivity.title : 'Mental Sanctuary'}
        </h2>
        <div className="w-8" /> {/* Spacer */}
       </header>

       <div className="flex-1 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedActivity ? (
            /* MENU VIEW */
            <motion.div 
              key="menu"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col p-6 max-w-6xl mx-auto"
            >
              {/* Category Tabs */}
              <div className="flex overflow-x-auto gap-4 mb-8 pb-2 scrollbar-hide">
                {['MINDFULNESS', 'RECOVERY', 'PHYSICAL', 'SENSORY'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat as Category)}
                    className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest border transition-all whitespace-nowrap ${
                      activeTab === cat 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                      : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-20">
                {ACTIVITIES.filter(a => a.category === activeTab).map((activity) => (
                  <motion.div
                    key={activity.id}
                    layoutId={activity.id}
                    onClick={() => handleStartActivity(activity)}
                    whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.08)' }}
                    className="group cursor-pointer p-6 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden flex flex-col gap-4"
                  >
                    <div className={`w-12 h-12 rounded-2xl ${activity.color} bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
                      {activity.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-medium mb-1">{activity.title}</h3>
                      <p className="text-white/40 text-sm uppercase tracking-wider">{activity.subtitle}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-xs font-mono text-white/30">
                      <RotateCcw size={12} />
                      {activity.duration > 0 ? `${Math.floor(activity.duration / 60)} min` : 'Continuous'}
                    </div>
                    <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                        <Play size={14} fill="currentColor" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* SESSION VIEW */
            <motion.div 
              key="session"
              layoutId={selectedActivity.id}
              className="h-full flex flex-col items-center justify-center relative p-6"
            >
              {/* Central Visual */}
              <div className="relative mb-12 flex items-center justify-center">
                {/* Breathing Orb */}
                {selectedActivity.type === 'BREATHING' && (
                  <>
                    <motion.div 
                      animate={{ 
                        scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 2 : 1,
                        opacity: 0.3
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                      className={`absolute w-48 h-48 rounded-full blur-[80px] ${selectedActivity.color.replace('text-', 'bg-')}`}
                    />
                    <motion.div 
                      animate={{ 
                        scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.5 : 1,
                        borderColor: breathPhase === 'Inhale' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)'
                      }}
                      transition={{ duration: 4, ease: "easeInOut" }}
                      className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md relative z-10"
                    >
                      <span className="text-xl font-display tracking-widest uppercase">{breathPhase}</span>
                    </motion.div>
                  </>
                )}

                {/* Standard Timer Orb */}
                {(selectedActivity.type === 'TIMER' || selectedActivity.type === 'AUDIO') && (
                  <div className="relative">
                    <svg className="w-64 h-64 rotate-[-90deg]">
                       <circle cx="128" cy="128" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                       <motion.circle 
                         cx="128" cy="128" r="120" 
                         stroke="currentColor" strokeWidth="4" fill="none"
                         className={selectedActivity.color}
                         strokeDasharray="753"
                         initial={{ strokeDashoffset: 0 }}
                         animate={{ strokeDashoffset: 753 - (753 * timeLeft) / selectedActivity.duration }}
                         transition={{ duration: 1, ease: "linear" }}
                       />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-5xl font-mono font-bold tracking-tighter">
                         {formatTime(timeLeft)}
                      </span>
                      {selectedActivity.type === 'AUDIO' && <span className="text-xs mt-2 animate-pulse uppercase">Audio Playing</span>}
                    </div>
                  </div>
                )}

                {/* Journal View */}
                {selectedActivity.type === 'JOURNAL' && (
                   <div className="w-full max-w-2xl h-[400px] glass-panel rounded-2xl p-6 flex flex-col relative z-20">
                     <textarea 
                       className="flex-1 bg-transparent border-none focus:ring-0 text-white/90 placeholder-white/20 resize-none font-mono leading-relaxed"
                       placeholder="Dump your thoughts here. Clear your cache..."
                       value={journalEntry}
                       onChange={(e) => setJournalEntry(e.target.value)}
                       autoFocus
                     />
                     <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
                        <span className="text-xs text-white/40">{journalEntry.length} chars</span>
                        <span className="text-xs font-mono">{formatTime(timeLeft)} remaining</span>
                     </div>
                   </div>
                )}
              </div>

              {/* Instructions */}
              <div className="text-center max-w-lg mb-12">
                 <h2 className="text-3xl font-display font-medium mb-2">{selectedActivity.title}</h2>
                 <p className="text-white/50">{selectedActivity.instruction || selectedActivity.subtitle}</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                 <button 
                   onClick={() => setTimeLeft(selectedActivity.duration)}
                   className="p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
                 >
                   <RotateCcw size={20} />
                 </button>
                 
                 <button 
                   onClick={() => setIsPlaying(!isPlaying)}
                   className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                 >
                   {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                 </button>
                 
                 <button 
                   onClick={handleExitActivity}
                   className="p-4 rounded-full bg-white/5 hover:bg-red-500/20 transition-colors text-white/60 hover:text-red-400"
                 >
                   <X size={20} />
                 </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
       </div>
    </div>
  );
};
