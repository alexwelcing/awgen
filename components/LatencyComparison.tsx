import React, { useState } from 'react';
import { Send, Loader2, User, Bot, Zap, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LatencyComparison: React.FC = () => {
  const [trigger, setTrigger] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // States
  const [leftState, setLeftState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [rightState, setRightState] = useState<'idle' | 'thinking' | 'streaming' | 'done'>('idle');

  const runSimulation = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setLeftState('loading');
    setRightState('thinking');
    setTrigger(prev => prev + 1);

    // Timeline for Right (Optimistic)
    setTimeout(() => {
      setRightState('streaming');
    }, 400); // TTFT 400ms

    setTimeout(() => {
        setRightState('done');
    }, 2500); // Full generation

    // Timeline for Left (Traditional)
    setTimeout(() => {
      setLeftState('done');
      setIsAnimating(false);
    }, 2500); // Waits for full generation
  };

  return (
    <div className="my-10 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
           <h3 className="font-bold text-slate-800 flex items-center gap-2">
             <Clock size={18} className="text-blue-600"/>
             Latency Masking Simulator
           </h3>
           <p className="text-sm text-slate-500">Visualizing Perceived Latency (User Feel) vs Actual Latency</p>
        </div>
        <button 
          onClick={runSimulation}
          disabled={isAnimating}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            isAnimating 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
          }`}
        >
          {isAnimating ? <Loader2 className="animate-spin" size={16}/> : <Zap size={16} fill="currentColor"/>}
          {isAnimating ? 'Simulating...' : 'Test Latency'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 h-[350px]">
        {/* LEFT: Traditional */}
        <div className="p-6 flex flex-col relative bg-slate-50/50">
           <div className="mb-4 text-xs font-bold uppercase tracking-wider text-red-500 flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-red-500"/>
             Traditional (Blocking)
           </div>
           
           <div className="flex-1 space-y-4">
             {trigger > 0 && (
                <div className="flex justify-end">
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                      Run monthly report.
                   </div>
                </div>
             )}

             {leftState === 'loading' && (
                <div className="flex justify-center items-center h-20">
                   <div className="flex flex-col items-center gap-2 text-slate-400">
                     <Loader2 className="animate-spin text-slate-400" size={24} />
                     <span className="text-xs font-mono">Waiting for server...</span>
                   </div>
                </div>
             )}

             {leftState === 'done' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-start"
                >
                   <div className="bg-white border border-slate-200 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                      <p>Here is your Q3 report. Revenue is up 12%.</p>
                   </div>
                </motion.div>
             )}
           </div>
           
           {/* Metrics Overlay */}
           <div className="mt-auto pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono flex justify-between">
              <span>Status: {leftState === 'loading' ? 'BLOCKED' : 'IDLE'}</span>
              <span>TTFT: {leftState === 'done' ? '2.5s' : '-'}</span>
           </div>
        </div>

        {/* RIGHT: Optimistic */}
        <div className="p-6 flex flex-col relative bg-white">
           <div className="mb-4 text-xs font-bold uppercase tracking-wider text-green-600 flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-green-500"/>
             Agentic (Optimistic)
           </div>
           
           <div className="flex-1 space-y-4">
             {trigger > 0 && (
                <div className="flex justify-end">
                   <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl rounded-tr-sm text-sm">
                      Run monthly report.
                   </div>
                </div>
             )}

             {/* Immediate Skeleton / Thinking State */}
             {(rightState === 'thinking' || rightState === 'streaming') && (
                 <motion.div 
                   initial={{ opacity: 0, y: 5 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex justify-start w-full"
                 >
                   <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm w-full max-w-[80%]">
                      <div className="flex items-center gap-2 mb-2 text-blue-600 text-xs font-bold">
                         <SparklesIcon />
                         Thinking...
                      </div>
                      {/* Streaming Text Simulation */}
                      {rightState === 'streaming' ? (
                          <TypewriterText text="Here is your Q3 report. Revenue is up 12%." />
                      ) : (
                          <div className="space-y-2 animate-pulse">
                              <div className="h-2 bg-slate-300 rounded w-3/4"></div>
                              <div className="h-2 bg-slate-300 rounded w-1/2"></div>
                          </div>
                      )}
                   </div>
                 </motion.div>
             )}

             {rightState === 'done' && (
                <div className="flex justify-start">
                   <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-tl-sm text-sm shadow-sm">
                      <div className="flex items-center gap-2 mb-2 text-blue-600 text-xs font-bold">
                         <SparklesIcon />
                         Thinking
                      </div>
                      <p>Here is your Q3 report. Revenue is up 12%.</p>
                   </div>
                </div>
             )}
           </div>

           {/* Metrics Overlay */}
           <div className="mt-auto pt-4 border-t border-slate-200 text-xs text-slate-500 font-mono flex justify-between">
              <span>Status: {rightState === 'thinking' ? 'STREAMING' : 'IDLE'}</span>
              <span className="text-green-600 font-bold">TTFT: {rightState !== 'idle' ? '0.4s' : '-'}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const SparklesIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

const TypewriterText = ({ text }: { text: string }) => {
  const [displayed, setDisplayed] = useState('');
  
  React.useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 30); // Fast typing speed
    return () => clearInterval(interval);
  }, [text]);

  return <p>{displayed}<span className="animate-pulse">|</span></p>;
};