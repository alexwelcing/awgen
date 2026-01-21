import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Cpu, 
  Database, 
  Play, 
  CheckCircle2, 
  XCircle, 
  Activity, 
  GitMerge,
  Search,
  Server,
  HardDrive,
  Globe,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';

type NodeType = 'cache' | 'heuristic' | 'model';

interface Scenario {
  id: string;
  query: string;
  category: string;
  target: NodeType;
  explanation: string;
  latencySaved: string;
}

const SCENARIOS: Scenario[] = [
  { 
    id: 's1', 
    query: 'GET /users/u_8829/profile', 
    category: 'Postgres Data', 
    target: 'heuristic', 
    explanation: 'Deterministic Route: URL matches pattern ^/users/:id. Bypassing LLM for direct SQL lookup.',
    latencySaved: '1.2s'
  },
  { 
    id: 's2', 
    query: 'Summarize Q3 board meeting notes', 
    category: 'Unstructured Text', 
    target: 'model', 
    explanation: 'Semantic Complexity: Request requires summarization and reasoning. Routing to GPT-4o.',
    latencySaved: '0s'
  },
  { 
    id: 's3', 
    query: 'Get AAPL stock price', 
    category: 'Market Data', 
    target: 'cache', 
    explanation: 'Hot Path: Key "ticker:AAPL" found in Redis (TTL 5s). Serving instantly.',
    latencySaved: '2.4s'
  },
  { 
    id: 's4', 
    query: 'Export 50k logs to CSV', 
    category: 'Data Lake', 
    target: 'heuristic', 
    explanation: 'Bulk Operation: Mapped to "job.export_logs". Delegating to background worker queue.',
    latencySaved: '0.8s'
  },
  { 
    id: 's5', 
    query: 'Why is the checkout slow?', 
    category: 'System Diagnostics', 
    target: 'model', 
    explanation: 'Root Cause Analysis: Multi-step reasoning required across logs and metrics.',
    latencySaved: '0s'
  },
  { 
    id: 's6', 
    query: 'Refund Order #9912', 
    category: 'RPC Action', 
    target: 'heuristic', 
    explanation: 'Strict Governance: Mutating action detected. Routing to regulated "Refund" tool with scope check.',
    latencySaved: '1.5s'
  },
  { 
    id: 's7', 
    query: 'Translate "Hello" to French', 
    category: 'NLP Task', 
    target: 'model', 
    explanation: 'Generative Task: Zero-shot translation required.',
    latencySaved: '0s'
  },
  { 
    id: 's8', 
    query: 'Get Navbar Configuration', 
    category: 'Static Config', 
    target: 'cache', 
    explanation: 'Static Asset: Global config hash matches CDN version. No compute needed.',
    latencySaved: '0.4s'
  },
  { 
    id: 's9', 
    query: 'Search: "Best headset under $200"', 
    category: 'Vector Search', 
    target: 'heuristic', 
    explanation: 'Hybrid Search: Routing to Pinecone/Elasticsearch. LLM used only for re-ranking results.',
    latencySaved: '1.1s'
  },
  { 
    id: 's10', 
    query: 'Analyze sentiment of review', 
    category: 'Classification', 
    target: 'model', 
    explanation: 'Nuance Detection: Irony and sentiment analysis require Model inference.',
    latencySaved: '0s'
  }
];

interface NodeState {
  id: NodeType;
  status: 'idle' | 'scanning' | 'hit' | 'miss' | 'bypassed';
}

export const OptimizationGrid: React.FC = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [nodes, setNodes] = useState<NodeState[]>([
    { id: 'cache', status: 'idle' },
    { id: 'heuristic', status: 'idle' },
    { id: 'model', status: 'idle' }
  ]);

  // Initial load simulation
  useEffect(() => {
    // Optional: Auto-run one demo on mount if desired
    // runSimulation(); 
  }, []);

  const runSimulation = async () => {
    if (isSimulating) return;
    setIsSimulating(true);

    // 1. Pick Random Scenario
    const randomScenario = SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)];
    setScenario(randomScenario);

    // Reset Nodes
    setNodes([
      { id: 'cache', status: 'idle' },
      { id: 'heuristic', status: 'idle' },
      { id: 'model', status: 'idle' }
    ]);

    // Helper to update specific node
    const setNodeStatus = (id: NodeType, status: NodeState['status']) => {
      setNodes(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    };

    // --- PHASE 1: CACHE LAYER ---
    setNodeStatus('cache', 'scanning');
    await wait(600);
    
    if (randomScenario.target === 'cache') {
      setNodeStatus('cache', 'hit');
      setNodeStatus('heuristic', 'bypassed');
      setNodeStatus('model', 'bypassed');
      setIsSimulating(false);
      return;
    }
    setNodeStatus('cache', 'miss');

    // --- PHASE 2: HEURISTIC LAYER ---
    await wait(300); // Travel time
    setNodeStatus('heuristic', 'scanning');
    await wait(800);

    if (randomScenario.target === 'heuristic') {
      setNodeStatus('heuristic', 'hit');
      setNodeStatus('model', 'bypassed');
      setIsSimulating(false);
      return;
    }
    setNodeStatus('heuristic', 'miss');

    // --- PHASE 3: MODEL LAYER ---
    await wait(300);
    setNodeStatus('model', 'scanning');
    await wait(1200); // Models are slow
    setNodeStatus('model', 'hit');
    
    setIsSimulating(false);
  };

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-950 rounded-3xl overflow-hidden relative border border-slate-800 shadow-2xl flex flex-col lg:flex-row">
      
      {/* LEFT: VISUALIZATION STAGE */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-8 bg-slate-950/50 backdrop-blur-sm min-h-[400px]">
         
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{ 
                 backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)', 
                 backgroundSize: '40px 40px' 
             }} 
         />
         
         {/* Wavefront Pipeline Line */}
         <div className="absolute top-1/2 left-[10%] right-[10%] h-1 bg-slate-800 -translate-y-1/2 rounded-full overflow-hidden">
             {/* Progress Bar Effect */}
            <motion.div 
               className="h-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]"
               initial={{ width: '0%' }}
               animate={{ 
                 width: isSimulating 
                   ? '100%' 
                   : scenario?.target === 'cache' ? '20%' 
                   : scenario?.target === 'heuristic' ? '50%' 
                   : '100%' 
               }}
               transition={{ duration: isSimulating ? 3 : 0.5, ease: 'linear' }}
            />
         </div>

         {/* NODES CONTAINER */}
         <div className="absolute inset-0 flex items-center justify-around px-12 md:px-24">
            
            {/* NODE 1: CACHE */}
            <GridNode 
               state={nodes.find(n => n.id === 'cache')!} 
               icon={<HardDrive size={28} />} 
               label="L1 Cache" 
               subLabel="Redis / Edge"
               latency="2ms"
            />

            {/* NODE 2: HEURISTIC */}
            <GridNode 
               state={nodes.find(n => n.id === 'heuristic')!} 
               icon={<GitMerge size={28} />} 
               label="Router" 
               subLabel="Code / Regex"
               latency="40ms"
            />

            {/* NODE 3: MODEL */}
            <GridNode 
               state={nodes.find(n => n.id === 'model')!} 
               icon={<Cpu size={28} />} 
               label="Inference" 
               subLabel="LLM / Agent"
               latency="~2s"
            />

         </div>

         {/* Scenario Overlay (Active Request) */}
         <AnimatePresence>
            {isSimulating && (
               <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: -120 }}
                  exit={{ opacity: 0 }}
                  className="absolute bg-white text-slate-900 px-4 py-2 rounded-full font-mono text-xs font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 z-20"
               >
                   <Search size={14} className="text-blue-600" />
                   {scenario?.query.substring(0, 30)}...
               </motion.div>
            )}
         </AnimatePresence>

      </div>

      {/* RIGHT: CONTROL PLANE (SIDEBAR) */}
      <div className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col relative z-20">
         
         <div className="p-6 border-b border-slate-800">
             <div className="flex items-center gap-2 text-blue-400 mb-2">
                 <Zap size={20} />
                 <h3 className="font-bold text-lg text-slate-100">Control Plane</h3>
             </div>
             <p className="text-slate-400 text-xs leading-relaxed">
                 Route requests to the most efficient handler. Why invoke an Agent when a regex will do?
             </p>
         </div>

         {/* Router Decision Log */}
         <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-slate-900/50">
             {!scenario ? (
                 <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50 gap-3">
                     <Activity size={32} />
                     <p className="text-sm font-mono text-center">System Idle.<br/>Waiting for traffic...</p>
                 </div>
             ) : (
                 <AnimatePresence mode="wait">
                     <motion.div 
                       key={scenario.id}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       className="space-y-4"
                     >
                        <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
                            <div className="text-[10px] text-slate-500 uppercase font-bold mb-1">Incoming Request</div>
                            <div className="font-mono text-xs text-white break-all">
                                {scenario.query}
                            </div>
                            <div className="mt-2 inline-block px-2 py-0.5 rounded bg-slate-700 text-[10px] text-slate-300">
                                {scenario.category}
                            </div>
                        </div>

                        {/* The "Why" Block */}
                        {!isSimulating && (
                            <motion.div 
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               className={`
                                   p-4 rounded-xl border-l-4 shadow-lg
                                   ${scenario.target === 'cache' ? 'bg-blue-900/20 border-blue-500' : ''}
                                   ${scenario.target === 'heuristic' ? 'bg-emerald-900/20 border-emerald-500' : ''}
                                   ${scenario.target === 'model' ? 'bg-purple-900/20 border-purple-500' : ''}
                               `}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <ShieldCheck size={16} className={`
                                        ${scenario.target === 'cache' ? 'text-blue-400' : ''}
                                        ${scenario.target === 'heuristic' ? 'text-emerald-400' : ''}
                                        ${scenario.target === 'model' ? 'text-purple-400' : ''}
                                    `} />
                                    <span className="font-bold text-sm text-slate-200">Router Decision</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                    {scenario.explanation}
                                </p>
                                
                                {scenario.latencySaved !== '0s' && (
                                    <div className="flex items-center gap-2 text-[10px] font-mono text-green-400 bg-green-900/20 px-2 py-1 rounded w-fit">
                                        <RefreshCw size={10} />
                                        Saved {scenario.latencySaved} vs LLM
                                    </div>
                                )}
                            </motion.div>
                        )}
                     </motion.div>
                 </AnimatePresence>
             )}
         </div>

         {/* Action Area */}
         <div className="p-6 bg-slate-900 border-t border-slate-800">
             <button
                 onClick={runSimulation}
                 disabled={isSimulating}
                 className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
             >
                 {isSimulating ? (
                     <>
                        <Activity className="animate-spin" size={18} />
                        Routing...
                     </>
                 ) : (
                     <>
                        <Play size={18} fill="currentColor" />
                        {scenario ? 'Simulate Next Request' : 'Start Simulation'}
                     </>
                 )}
             </button>
         </div>

      </div>

    </div>
  );
};

// Sub-component for individual nodes to keep main file clean
const GridNode: React.FC<{
    state: NodeState;
    icon: React.ReactNode;
    label: string;
    subLabel: string;
    latency: string;
}> = ({ state, icon, label, subLabel, latency }) => {
    
    // Dynamic Styles based on status
    const getStyles = () => {
        switch (state.status) {
            case 'scanning': return 'border-blue-500 bg-blue-900/40 shadow-[0_0_30px_rgba(59,130,246,0.5)] text-blue-200 scale-110 z-10';
            case 'hit': return 'border-emerald-500 bg-emerald-900/40 shadow-[0_0_40px_rgba(16,185,129,0.5)] text-emerald-200 scale-110 z-10';
            case 'miss': return 'border-red-900/50 bg-red-900/10 text-red-400/50 opacity-60 grayscale';
            case 'bypassed': return 'border-slate-800 bg-slate-900/50 text-slate-700 opacity-30 blur-[1px]';
            default: return 'border-slate-700 bg-slate-900 text-slate-500';
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 relative transition-all duration-500">
            {/* The Node Circle */}
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 relative backdrop-blur-md ${getStyles()}`}>
                {icon}
                
                {/* Status Badges */}
                <div className="absolute -top-3 -right-3">
                    {state.status === 'scanning' && <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-lg">SCAN</div>}
                    {state.status === 'hit' && <div className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg flex items-center gap-1"><CheckCircle2 size={10}/> MATCH</div>}
                    {state.status === 'miss' && <div className="bg-red-900 text-red-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-800"><XCircle size={10}/></div>}
                </div>
            </div>

            {/* Labels */}
            <div className={`text-center transition-all duration-300 ${state.status === 'bypassed' ? 'opacity-30' : 'opacity-100'}`}>
                <div className={`text-sm font-bold uppercase tracking-wider mb-1 ${state.status === 'hit' ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {label}
                </div>
                <div className="text-[10px] font-mono text-slate-500">{subLabel}</div>
                <div className="mt-1 text-[10px] font-mono text-slate-600 border px-1.5 py-0.5 rounded border-slate-800 inline-block">{latency}</div>
            </div>
        </div>
    );
};