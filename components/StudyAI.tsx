import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { generateStudyResponse } from '../services/geminiService';
import { ChatMessage, NexusStatus } from '../types';
import { Send, Bot, User, ArrowLeft, Zap } from 'lucide-react';
import { ViewState } from '../types';

interface StudyAIProps {
  onBack: () => void;
}

export const StudyAI: React.FC<StudyAIProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', content: 'Ready for deep focus. What are we engineering today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<NexusStatus>(NexusStatus.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === NexusStatus.THINKING) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(NexusStatus.THINKING);

    const responseText = await generateStudyResponse(input);
    
    setStatus(NexusStatus.IDLE);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', content: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, aiMsg]);
  };

  return (
    <div className="h-full flex flex-col bg-nexus-dark/50 relative">
      {/* Header */}
      <header className="p-6 border-b border-white/5 flex items-center justify-between bg-nexus-black/50 backdrop-blur-xl z-20">
        <button onClick={onBack} className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
          <ArrowLeft size={20} /> <span className="uppercase tracking-widest text-xs">Return</span>
        </button>
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status === NexusStatus.THINKING ? 'bg-nexus-cyan animate-pulse' : 'bg-emerald-500'}`} />
          <span className="font-display font-bold">NEXUS CORE</span>
        </div>
        <button className="p-2 bg-nexus-cyan/10 text-nexus-cyan rounded-lg border border-nexus-cyan/20 hover:bg-nexus-cyan/20 transition-all flex items-center gap-2 text-xs font-bold uppercase">
           <Zap size={14} /> Exam Mode
        </button>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] md:max-w-2xl p-6 rounded-3xl ${
              msg.role === 'user' 
                ? 'bg-white/10 border border-white/5 text-white' 
                : 'bg-nexus-cyan/5 border border-nexus-cyan/10 text-nexus-cyan/90'
            }`}>
              <div className="flex items-center gap-2 mb-2 opacity-50 text-xs uppercase tracking-widest">
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span>{msg.role === 'user' ? 'You' : 'Nexus'}</span>
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">
                {msg.content}
              </div>
            </div>
          </motion.div>
        ))}
        {status === NexusStatus.THINKING && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
             <div className="bg-nexus-cyan/5 border border-nexus-cyan/10 p-4 rounded-2xl flex gap-1">
                <div className="w-2 h-2 bg-nexus-cyan rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-nexus-cyan rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-nexus-cyan rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-nexus-black/80 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-4xl mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-nexus-cyan to-purple-500 rounded-2xl opacity-20 blur group-focus-within:opacity-40 transition-opacity" />
          <div className="relative flex items-center bg-nexus-card rounded-2xl border border-white/10 p-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none text-white px-4 py-3 focus:ring-0 placeholder-white/20"
            />
            <button 
              onClick={handleSend}
              className="p-3 bg-white/10 hover:bg-nexus-cyan hover:text-black rounded-xl transition-all text-white"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};