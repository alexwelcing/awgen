import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Target, Zap, Brain, Briefcase, FileCheck, ArrowRight, Search, TrendingUp, Calendar } from 'lucide-react';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'query' | 'insight' | 'action';
  delay: number;
  driver?: string; // If it connects to a driver
}

const NODES: Node[] = [
  { id: 'n1', x: 20, y: 30, label: 'Account: Acme Corp', type: 'query', delay: 0, driver: 'Growth' },
  { id: 'n2', x: 70, y: 15, label: 'News: Series B Funding', type: 'query', delay: 1.5, driver: 'Growth' },
  { id: 'n3', x: 15, y: 70, label: 'Competitor: Globex', type: 'query', delay: 3, driver: 'Risk' },
  { id: 'n4', x: 85, y: 60, label: 'Usage: +240% MoM', type: 'query', delay: 4.5, driver: 'Growth' },
  { id: 'n5', x: 50, y: 40, label: 'Intent: Enterprise Expansion', type: 'insight', delay: 6.5, driver: 'Growth' },
  { id: 'n6', x: 50, y: 75, label: 'Auto-Create Deal: $150k', type: 'action', delay: 9, driver: 'Growth' },
];

const DRIVERS = [
  { id: 'Growth', x: 50, y: 40, color: '#3b82f6' }, // Blue
  { id: 'Risk', x: 20, y: 70, color: '#ef4444' },   // Red
];

export const SpiderwebVisualization: React.FC = () => {
  const [activeTime, setActiveTime] = useState(0);
  const [identifiedDrivers, setIdentifiedDrivers] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTime(prev => {
        if (prev > 12) return 0; // Loop (extended time for action)
        return prev + 0.05;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Reset drivers on loop
    if (activeTime < 0.1) setIdentifiedDrivers([]);

    // Trigger driver detection logic
    if (activeTime > 3 && !identifiedDrivers.includes('Growth')) {
        setIdentifiedDrivers(prev => [...prev, 'Growth']);
    }
  }, [activeTime]);

  return (
    <div className="w-full h-[500px] bg-slate-900 rounded-xl border border-slate-700 shadow-2xl flex overflow-hidden">
      
      {/* Main Visualization Area */}
      <div className="flex-1 relative p-6">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }} 
        />
        
        {/* Radar Scanner Effect */}
        <motion.div 
            className="absolute top-1/2 left-1/2 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: 'center' }}
        />

        {/* Central Brain/Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-slate-800 p-4 rounded-full border-2 border-slate-600 shadow-xl shadow-blue-900/20 relative">
                <Brain className="text-emerald-400 w-8 h-8" />
                <div className="absolute inset-0 border border-emerald-500/30 rounded-full animate-ping" />
            </div>
        </div>

        {/* Nodes & Connections */}
        <div className="absolute inset-0">
            {NODES.map((node) => {
                const isVisible = activeTime >= node.delay;
                const isConnected = activeTime >= node.delay + 1;

                return (
                    <React.Fragment key={node.id}>
                        {/* The Node */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                            className="absolute z-10 flex flex-col items-center gap-2"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                            <div className={`
                                w-4 h-4 rounded-full flex items-center justify-center
                                ${node.type === 'insight' ? 'bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)]' : 
                                  node.type === 'action' ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] scale-125' : 
                                  'bg-slate-400'}
                            `}>
                                {node.type === 'action' && <FileCheck size={10} className="text-emerald-950"/>}
                            </div>
                            <span className={`
                                text-[10px] font-mono px-2 py-0.5 rounded border whitespace-nowrap
                                ${node.type === 'action' 
                                    ? 'bg-emerald-900/90 border-emerald-500 text-emerald-100 font-bold shadow-lg' 
                                    : 'bg-slate-900/80 border-slate-700 text-slate-400'}
                            `}>
                                {node.label}
                            </span>
                        </motion.div>

                        {/* Connection Line to Center */}
                        {isVisible && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                <motion.line
                                    x1="50%" y1="50%"
                                    x2={`${node.x}%`} y2={`${node.y}%`}
                                    stroke={isConnected ? (node.type === 'action' ? '#10b981' : node.type === 'insight' ? '#fbbf24' : '#475569') : 'transparent'}
                                    strokeWidth={node.type === 'action' ? 2 : 1}
                                    strokeDasharray={node.type === 'action' ? '0' : '4 4'}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: isConnected ? 1 : 0 }}
                                    transition={{ duration: 0.8 }}
                                />
                            </svg>
                        )}
                    </React.Fragment>
                );
            })}
        </div>

        {/* Driver Cluster Highlights */}
        {identifiedDrivers.map(driverId => {
            const driver = DRIVERS.find(d => d.id === driverId);
            if(!driver) return null;
            const relatedNodes = NODES.filter(n => n.driver === driverId && activeTime >= n.delay);
            if (relatedNodes.length < 2) return null;

            return (
                <svg key={driverId} className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <motion.path 
                        d={`M ${relatedNodes.map(n => `${n.x * 0.01 * 1000} ${n.y * 0.01 * 500}`).join(' L ')} Z`}
                        fill={driver.color}
                        fillOpacity="0.05"
                        stroke={driver.color}
                        strokeWidth="1"
                        strokeOpacity="0.3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    />
                </svg>
            )
        })}

        {/* Timeline Indicator */}
        <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 flex items-center gap-2">
            <Calendar size={12} />
            <span>Real-time Signal Monitor</span>
        </div>
      </div>

      {/* Right Side Panel: Insights */}
      <div className="w-72 bg-slate-950 border-l border-slate-800 p-5 flex flex-col gap-5">
          <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-3">
              <TrendingUp size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Signals Detected</span>
          </div>

          <div className="space-y-4">
              <AnimatePresence>
                  {identifiedDrivers.length === 0 && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="text-slate-600 text-xs italic text-center py-8"
                      >
                          Monitoring feed for intent signals...
                      </motion.div>
                  )}

                  {identifiedDrivers.includes('Growth') && activeTime > 6 && (
                      <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg"
                      >
                          <div className="flex items-center gap-2 mb-2">
                              <Target className="text-blue-400 w-4 h-4" />
                              <span className="text-blue-200 text-xs font-bold">Expansion Signal</span>
                          </div>
                          <p className="text-[11px] text-blue-300/80 leading-relaxed">
                              Usage spike (+240%) correlates with recent Series B funding news. High probability of up-sell.
                          </p>
                      </motion.div>
                  )}

                  {activeTime > 9 && (
                       <motion.div
                       initial={{ scale: 0.9, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       className="bg-emerald-900/20 border border-emerald-500/50 p-4 rounded-xl shadow-lg relative overflow-hidden"
                     >
                         <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                         <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="text-emerald-400 w-4 h-4" />
                                    <span className="text-emerald-100 text-xs font-bold">Opportunity Created</span>
                                </div>
                                <span className="bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded font-bold">AUTO</span>
                            </div>
                            <div className="bg-slate-900/50 p-2 rounded border border-slate-700/50 mb-2">
                                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Deal Name</div>
                                <div className="text-xs text-white font-mono">Acme Corp - Enterprise Lic</div>
                            </div>
                            <div className="flex items-center justify-between text-[10px]">
                                <span className="text-emerald-300">Est. Value: $150,000</span>
                                <div className="flex items-center gap-1 text-emerald-400 cursor-pointer hover:underline">
                                    View in CRM <ArrowRight size={10} />
                                </div>
                            </div>
                         </div>
                     </motion.div>
                  )}
              </AnimatePresence>
          </div>

          {/* Bottom Metric */}
          <div className="mt-auto pt-4 border-t border-slate-800">
             <div className="flex justify-between items-end">
                 <div>
                     <div className="text-[10px] text-slate-500 uppercase">Signal Confidence</div>
                     <div className="text-2xl font-mono text-emerald-400">{Math.min(Math.floor(activeTime * 11), 98)}%</div>
                 </div>
                 <Zap className={`w-6 h-6 ${activeTime > 6 ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-700'}`} />
             </div>
          </div>
      </div>

    </div>
  );
};