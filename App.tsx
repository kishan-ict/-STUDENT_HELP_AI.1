import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Landing } from './components/Landing';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { StudyAI } from './components/StudyAI';
import { Wellness } from './components/Wellness';
import { ProjectGen } from './components/modules/ProjectGen';
import { ViewState, UserProfile } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('LANDING');
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    education: null,
    interests: [],
    goalYear: 2026,
  });

  const updateProfile = (data: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const renderView = () => {
    switch(view) {
      case 'LANDING':
        return <Landing onEnter={() => setView('AUTH_LOGIN')} />;
      case 'AUTH_LOGIN':
      case 'AUTH_ONBOARDING_1':
      case 'AUTH_ONBOARDING_2':
      case 'AUTH_ONBOARDING_3':
        return (
          <Auth 
            view={view} 
            setView={setView} 
            profile={profile} 
            updateProfile={updateProfile} 
          />
        );
      case 'DASHBOARD':
        return <Dashboard setView={setView} />;
      case 'MODULE_STUDY':
        return <StudyAI onBack={() => setView('DASHBOARD')} />;
      case 'MODULE_WELLNESS':
        return <Wellness onBack={() => setView('DASHBOARD')} />;
      case 'MODULE_PROJECT':
        return <ProjectGen onBack={() => setView('DASHBOARD')} />;
      default:
        return <Dashboard setView={setView} />;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-nexus-black text-white overflow-hidden font-sans selection:bg-nexus-cyan/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.5 }}
          className="w-full h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
      
      {/* Global Grain/Noise Overlay for film effect */}
      <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default App;