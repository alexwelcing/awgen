import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Check, X, Server, Lock, User, Bot, ArrowRight, Terminal } from 'lucide-react';

type FlowState = 'idle' | 'request' | 'intercept' | 'approving' | 'executed' | 'rejected';

export const ToolGovernance: React.FC = () => {
  const [flowState, setFlowState] = useState<FlowState>('idle');

  const startSimulation = () => setFlowState('request');

  const handleApprove = () => {
    setFlowState('executed');
    setTimeout(() => setFlowState('idle'), 3000);
  };

  const handleReject = () => {
    setFlowState('rejected');
    setTimeout(() => setFlowState('idle'), 3000);
  };

  // Auto-advance from request to intercept
  React.useEffect(() => {
    if (flowState === 'request') {
      const timer = setTimeout(() => setFlowState('intercept'), 1000);
      return () => clearTimeout(timer);
    }
  }, [flowState]);

  return (
    <div className="w-full h-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6 items-start justify-center">
      
      {/* Left Column: Technical Context */}
      <div className="flex-1 space-y-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
           <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-lg">
             <Terminal size={20} className="text-blue-600" />
             The Tool Definition (RPC)
           </div>
           <p className="text-sm text-slate-600 mb-4">
             Tools are not just functions; they are <strong>regulated artifacts</strong>. 
             We define strict Zod schemas with embedded permission scopes.
           </p>
           
           <div className="bg-slate-900 rounded-lg p-4 overflow-hidden relative group">
             <div className="absolute top-2 right-2 text-[10px] text-slate-500 font-mono">tool_def.ts</div>
             <pre className="font-mono text-xs text-blue-100 leading-relaxed overflow-x-auto scrollbar-dark">
{`export const refundUser = tool({
  name: 'refund_transaction',
  description: 'Issue a refund to a customer wallet.',
  // 🔒 The Gate Configuration
  metadata: {
    riskLevel: 'HIGH',
    requiredScope: 'finance.write',
    requiresApproval: true, // <-- HITL Trigger
  },
  parameters: z.object({
    userId: z.string(),
    amount: z.number().max(500),
    reason: z.string(),
  }),
  execute: async ({ userId, amount }) => {
    return await rpc.finance.issueRefund(userId, amount);
  }
});`}
             </pre>
           </div>
        </div>

        <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl flex gap-3">
           <ShieldAlert className="text-amber-600 shrink-0" size={20} />
           <div>
             <h4 className="font-bold text-amber-900 text-sm">The Supervisor Pattern</h4>
             <p className="text-xs text-amber-800 mt-1 leading-relaxed">
               Agents are probabilistic. APIs are deterministic. We never let an LLM call a mutating RPC directly. 
               A deterministic <strong>"Regulator" layer</strong> sits in between to validate scopes and enforce approval policies.
             </p>
           </div>
        </div>
      </div>

      {/* Right Column: Interactive Simulation */}
      <div className="flex-1 w-full bg-slate-50 border border-slate-200 rounded-2xl p-2 relative h-[500px] flex flex-col">
        
        {/* Header */}
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center bg-white rounded-t-xl">
           <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Runtime Governance</span>
           <button 
             onClick={startSimulation}
             disabled={flowState !== 'idle'}
             className="bg-slate-900 text-white px-3 py-1.5 rounded text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
           >
             Trigger Sensitive Action
           </button>
        </div>

        {/* The Pipeline Visual */}
        <div className="flex-1 relative overflow-hidden flex flex-col items-center justify-center p-4">
           
           {/* Background Flow Line */}
           <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0" />

           <div className="relative z-10 w-full flex justify-between items-center gap-2">
              
              {/* Node 1: Agent */}
              <div className="flex flex-col items-center gap-2 relative">
                 <motion.div 
                   animate={flowState === 'request' ? { scale: 1.1, boxShadow: '0 0 20px rgba(59,130,246,0.5)' } : {}}
                   className="w-16 h-16 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center shadow