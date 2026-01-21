import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Database, 
  Server, 
  Terminal, 
  Loader2, 
  Play,
  RotateCcw,
  User,
  Bot,
  Globe
} from 'lucide-react';

type Step = 'idle' | 'input' | 'routing' | 'tool' | 'thinking' | 'rendering' | 'done';

export const AgentSimulation: React.FC = () => {
  const [step, setStep] = useState<Step>('idle');
  const [logs, setLogs] = useState<string[]>(['System initialized.', 'Waiting for user input...']);
  
  // Ref for auto-scrolling logs
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (log: string) => {
    setLogs(prev => [...prev, `> ${log}`]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const runSimulation = async () => {
    if (step !== 'idle' && step !== 'done') return;
    
    setStep('input');
    setLogs(['> Session initialized: sid_9823']);
    addLog("User input received");
    
    await wait(800);
    setStep('routing');
    addLog("POST /api/chat");
    addLog("Orchestrator: Analysis started...");
    addLog("Classifier: Intent = 'ANALYTICAL_RETRIEVAL'");
    
    await wait(1200);
    setStep('tool');
    addLog("Router: Selected tool [RevenueDB]");
    addLog("Constructing SQL query...");
    addLog("Exec: SELECT * FROM revenue_q3 WHERE status='final'");
    
    await wait(1200);
    setStep('thinking');
    addLog("DB: Returned 45 rows (14ms)");
    addLog("Context injected into context window (1204 tokens)");
    addLog("LLM: Generating Component Tree...");
    
    await wait(1500);
    setStep('rendering');
    addLog("Stream: <RevenueChart data={...} />");
    addLog("Client: Hydrating component...");
    
    await wait(1000);
    setStep('done');
    addLog("Request complete. Latency: 840ms");
  };

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="w-full h-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col md:flex-row">
      
      {/* LEFT: User Interface (Chat View) */}
      <div className="flex-1 bg-slate-50 flex flex-col relative border-r border-slate-200">
        <div className="bg-white p-4 border-b border-slate-200 flex justify-between items-center z-10 shrink-0 h-14">
           <div className="flex items-center gap-3">
             <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
             </div>
             <div className="bg-slate-100 px-3 py-1 rounded text-xs font-mono text-slate-500 flex items-center gap-2">
                <Globe size={12} />
                localhost:3000
             </div>
           </div>
        </div>

        <div className="flex-1 p-8 flex flex-col space-y-8 relative overflow-y-auto">
            {/* Background Decor */}
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

            {/* Static Previous Message */}
            <div className="flex gap-4 opacity-50">
               <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm"><Bot size={20}/></div>
               <div className="bg-white border border-slate-200 text-slate-600 px-6 py-4 rounded-2xl rounded-tl-none text-base shadow-sm">
                  Hello! How can I help with your data today?
               </div>
            </div>

            {/* Active Simulation Message */}
            {(step !== 'idle') && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4 flex-row-reverse"
              >
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-sm"><User size={20} className="text-blue-600"/></div>
                 <div className="bg-blue-600 text-white px-6 py-4 rounded-2xl rounded-tr-none text-base shadow-lg">
                   Analyze Q3 performance vs targets.
                 </div>
              </motion.div>
            )}

            {/* Assistant Response Area */}
            <AnimatePresence mode="wait">
               {/* Loading State */}
               {(step === 'routing' || step === 'tool' || step === 'thinking') && (
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="flex gap-4"
                 >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm"><Bot size={20}/></div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm font-mono bg-white border border-slate-200 px-4 py-3 rounded-xl shadow-sm">
                       <Loader2 className="animate-spin w-4 h-4 text-blue-500" />
                       <span className="animate-pulse">
                          {step === 'routing' && 'Routing intent...'}
                          {step === 'tool' && 'Querying RevenueDB...'}
                          {step === 'thinking' && 'Synthesizing response...'}
                       </span>
                    </div>
                 </motion.div>
               )}

               {/* Final Result */}
               {(step === 'rendering' || step === 'done') && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex gap-4"
                 >
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0 shadow-sm"><Bot size={20}/></div>
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xl w-full max-w-[90%]">
                       <div className="flex items-center justify-between mb-6">
                          <h4 className="font-bold text-slate-800 text-lg">Q3 Revenue Overview</h4>
                          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-bold border border-green-200">+12% YoY</span>
                       </div>
                       {/* Simulated Chart Bars */}
                       <div className="flex items-end gap-4 h-48 mb-4">
                           <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ delay: 0.1 }} className="flex-1 bg-slate-100 rounded-t-md" />
                           <motion.div initial={{ height: 0 }} animate={{ height: '60%' }} transition={{ delay: 0.2 }} className="flex-1 bg-slate-200 rounded-t-md" />
                           <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ delay: 0.3 }} className="flex-1 bg-blue-600 rounded-t-md relative group shadow-lg shadow-blue-900/20">
                               <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/90 text-xs font-bold">$1.2M</div>
                           </motion.div>
                       </div>
                       <p className="text-sm text-slate-600 leading-relaxed">
                          Performance is exceeding targets driven by enterprise adoption in North America.
                       </p>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
        </div>
      </div>

      {/* RIGHT: System Internals (Terminal) */}
      <div className="w-full md:w-[450px] bg-[#0f172a] flex flex-col font-mono text-xs relative border-t md:border-t-0 md:border-l border-slate-700">
        <div className="bg-[#1e293b] p-3 border-b border-slate-700 flex justify-between items-center z-10 shrink-0 h-14">
           <div className="flex items-center gap-3 px-2">
             <Terminal size={16} className="text-slate-400" />
             <span className="text-slate-200 font-bold">System_Logs</span>
           </div>
           
           <button 
             onClick={runSimulation}
             disabled={step !== 'idle' && step !== 'done'}
             className={`
               flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all
               ${step === 'idle' || step === 'done' 
                 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg hover:shadow-blue-500/20 cursor-pointer' 
                 : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
             `}
           >
             {step === 'done' ? <RotateCcw size={14} /> : <Play size={14} />}
             {step === 'done' ? 'Reset' : 'Simulate'}
           </button>
        </div>

        {/* Nodes Visualization (Top Half of Right Panel) */}
        <div className="h-48 bg-slate-900/50 border-b border-slate-800 flex items-center justify-around px-4 relative shrink-0">
             {/* Connection Line */}
             <div className="absolute top-1/2 left-12 right-12 h-0.5 bg-slate-800 -z-0" />
             
             {/* Router Node */}
             <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity duration-300 ${step === 'routing' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-purple-900/20 border-2 ${step === 'routing' ? 'border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] bg-purple-900/40' : 'border-purple-900'}`}>
                   <Server size={20} className="text-purple-400" />
                </div>
                <span className="text-xs text-purple-300 font-bold tracking-wide">ROUTER</span>
             </div>

             {/* DB Node */}
             <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity duration-300 ${step === 'tool' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-orange-900/20 border-2 ${step === 'tool' ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)] bg-orange-900/40' : 'border-orange-900'}`}>
                   <Database size={20} className="text-orange-400" />
                </div>
                <span className="text-xs text-orange-300 font-bold tracking-wide">TOOL</span>
             </div>

             {/* AI Node */}
             <div className={`relative z-10 flex flex-col items-center gap-3 transition-opacity duration-300 ${step === 'thinking' ? 'opacity-100 scale-110' : 'opacity-40'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-green-900/20 border-2 ${step === 'thinking' ? 'border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] bg-green-900/40' : 'border-green-900'}`}>
                   <Cpu size={20} className="text-green-400" />
                </div>
                <span className="text-xs text-green-300 font-bold tracking-wide">LLM</span>
             </div>
        </div>

        {/* Scrolling Logs (Bottom Half of Right Panel) */}
        <div className="flex-1 p-6 overflow-y-auto scrollbar-dark flex flex-col font-mono text-sm leading-relaxed">
            <div className="space-y-2">
               {logs.map((log, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, x: -5 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   className="text-slate-400 break-all border-l-2 border-transparent hover:border-slate-700 pl-2 -ml-2 transition-colors"
                 >
                   {log.startsWith('>') ? (
                       <span className="text-blue-500 mr-2 font-bold">$</span>
                   ) : (
                       <span className="text-slate-600 mr-2 text-[10px]">{new Date().toLocaleTimeString().split(' ')[0]}</span>
                   )}
                   <span className={log.includes('Error') ? 'text-red-400' : 'text-slate-300'}>{log.replace('> ', '')}</span>
                 </motion.div>
               ))}
               <div ref={logsEndRef} />
            </div>
            
            {logs.length === 0 && (
                <div className="h-full flex items-center justify-center text-slate-700 italic">
                   System Ready.
                </div>
            )}
        </div>

      </div>
    </div>
  );
};