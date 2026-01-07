import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface FlipCardProps {
  question: string;
  answer: string;
  index?: number;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ question, answer, index, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`h-64 w-full cursor-pointer group ${className}`} 
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative w-full h-full"
      >
        {/* Front */}
        <div 
          className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col items-center justify-center text-center hover:bg-white/10 hover:border-nexus-cyan/30 transition-all shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-8 h-8 rounded-full bg-nexus-cyan/10 flex items-center justify-center mb-4">
             <HelpCircle className="text-nexus-cyan" size={16} />
          </div>
          {index !== undefined && (
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Viva Question {index + 1}</h3>
          )}
          <p className="text-lg font-medium text-white/90 leading-snug">{question}</p>
          <div className="absolute bottom-4 text-[10px] uppercase tracking-widest text-nexus-cyan opacity-60 group-hover:opacity-100 transition-opacity">Tap to Reveal</div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-nexus-cyan/10 to-purple-500/10 border border-nexus-cyan/30 p-6 flex flex-col items-center justify-center text-center bg-nexus-card shadow-xl overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-4 shrink-0">Model Answer</h3>
          <div className="overflow-y-auto w-full h-full pr-1">
             <p className="text-white/80 leading-relaxed text-sm">{answer}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};