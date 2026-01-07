import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'ghost' | 'glass';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary'
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.15, y: y * 0.15 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative overflow-hidden rounded-full px-8 py-4 font-display font-medium tracking-wider uppercase text-sm transition-all duration-300";
  
  const variants = {
    primary: "bg-white text-black hover:bg-nexus-cyan hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
    ghost: "text-white/70 hover:text-white",
    glass: "bg-white/5 border border-white/10 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/30"
  };

  return (
    <motion.button
      ref={ref}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
         <motion.div 
            className="absolute inset-0 -z-0 bg-gradient-to-r from-nexus-cyan via-purple-500 to-nexus-accent opacity-0 transition-opacity duration-300 hover:opacity-20" 
         />
      )}
    </motion.button>
  );
};