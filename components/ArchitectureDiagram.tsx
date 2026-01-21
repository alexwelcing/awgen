import React, { useState } from 'react';
import { ViewMode, DiagramNode } from '../types';
import { ArrowDown, Database, Cpu, Layout, Globe, Server, Box, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const nodes: DiagramNode[] = [
  {
    id: 'user',
    label: 'User Interface',
    type: 'client',
    engDesc: 'Next.js App Router (Client Components). Handles user input and renders React Server Components streamed from the backend.',
    pmDesc: 'The Engagement Layer. Must feel instant. Uses Optimistic UI to mask latency while the AI thinks.'
  },
  {
    id: 'stream',
    label: 'Streaming UI',
    type: 'client',
    engDesc: 'React Suspense + Vercel AI SDK. Renders partial tokens and component shells as they arrive.',
    pmDesc: 'Generative UI. Instead of text, we render interactive Widgets (charts, tables) in real-time.'
  },
  {
    id: 'orchestrator',
    label: 'Agent Router',
    type: 'server',
    engDesc: 'LangGraph / AI SDK Core. The control flow that decides: Chat vs. Tool Call vs. RAG.',
    pmDesc: 'The Brain. Decouples logic from the model. Routes cheap queries to Flash and complex reasoning to Pro.'
  },
  {
    id: 'rag',
    label: 'Vector Search',
    type: 'tool',
    engDesc: 'Pinecone/Weaviate. Retrieval Augmented Generation pipeline for semantic context.',
    pmDesc: 'The Memory. Ensures the AI knows YOUR specific business data, reducing hallucinations.'
  },
  {
    id: 'model',
    label: 'LLM Inference',
    type: 'ai',
    engDesc: 'GPT-4o / Claude 3.5. Stateless inference API returning structured JSON or text streams.',
    pmDesc: 'The Intelligence Layer. A commodity capability we pay for by the token.'
  }
];

const NodeCard: React.FC<{ 
  node: DiagramNode; 
  viewMode: ViewMode; 
  icon: React.ReactNode 
}> = ({ node, viewMode, icon }) => {
  const isEng = viewMode === ViewMode.ENGINEERING;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative group p-4 rounded-xl border-2 transition-all duration-300 cursor-help
        ${node.type === 'client' ? 'bg-slate-50 border-slate-200 hover:border-slate-400' : ''}
        ${node.type === 'server' ? 'bg-blue-50 border-blue-200 hover:border-blue-400' : ''}
        ${node.type === 'tool' ? 'bg-orange-50 border-orange-200 hover:border-orange-400' : ''}
        ${node.type === 'ai' ? 'bg-purple-50 border-purple-200 hover:border-purple-400' : ''}
      `}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={`
          p-2 rounded-lg
          ${node.type === 'client' ? 'bg-slate-200 text-slate-700' : ''}
          ${node.type === 'server' ? 'bg-blue-200 text-blue-700' : ''}
          ${node.type === 'tool' ? 'bg-orange-200 text-orange-700' : ''}
          ${node.type === 'ai' ? 'bg-purple-200 text-purple-700' : ''}
        `}>
          {icon}
        </div>
        <h3 className="font-bold text-slate-800">{node.label}</h3>
      </div>
      
      {/* Description that changes based on view mode */}
      <div className="h-20 text-sm leading-relaxed overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={viewMode}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className={isEng ? "text-slate-600 font-mono text-xs" : "text-slate-700"}
          >
            {isEng ? node.engDesc : node.pmDesc}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Role Badge */}
      <span className={`
        absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider
        ${node.type === 'client' ? 'bg-slate-100 text-slate-500' : ''}
        ${node.type === 'server' ? 'bg-blue-100 text-blue-500' : ''}
        ${node.type === 'tool' ? 'bg-orange-100 text-orange-500' : ''}
        ${node.type === 'ai' ? 'bg-purple-100 text-purple-500' : ''}
      `}>
        {node.type}
      </span>
    </motion.div>
  );
};

export const ArchitectureDiagram: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.PRODUCT);

  return (
    <div className="my-12 w-full max-w-4xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-slate-900">System Architecture</h2>
        <div className="bg-slate-100 p-1 rounded-lg flex items-center">
          <button
            onClick={() => setViewMode(ViewMode.PRODUCT)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === ViewMode.PRODUCT 
                ? 'bg-white shadow-sm text-slate-900' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Product Vision
          </button>
          <button
            onClick={() => setViewMode(ViewMode.ENGINEERING)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              viewMode === ViewMode.ENGINEERING 
                ? 'bg-white shadow-sm text-blue-600' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Engineering Detail
          </button>
        </div>
      </div>

      {/* Diagram Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="flex flex-col gap-8 relative z-10">
          
          {/* Layer 1: Client */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
             {/* Connection Line */}
             <div className="hidden md:block absolute left-1/2 top-full h-8 w-0.5 bg-slate-300 -translate-x-1/2 z-0" />
             
             <NodeCard 
               node={nodes[0]} 
               viewMode={viewMode} 
               icon={<Layout size={20} />} 
             />
             <NodeCard 
               node={nodes[1]} 
               viewMode={viewMode} 
               icon={<Globe size={20} />} 
             />
          </div>

          <div className="flex justify-center py-2">
            <ArrowDown className="text-slate-300" />
          </div>

          {/* Layer 2: Orchestration */}
          <div className="grid grid-cols-1 relative">
            <div className="hidden md:block absolute left-1/4 top-full h-8 w-0.5 bg-slate-300 z-0" />
            <div className="hidden md:block absolute right-1/4 top-full h-8 w-0.5 bg-slate-300 z-0" />

            <NodeCard 
              node={nodes[2]} 
              viewMode={viewMode} 
              icon={<Server size={20} />} 
            />
          </div>

          <div className="flex justify-center py-2 gap-32">
             <ArrowDown className="text-slate-300" />
             <ArrowDown className="text-slate-300" />
          </div>

          {/* Layer 3: Tools & AI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NodeCard 
              node={nodes[3]} 
              viewMode={viewMode} 
              icon={<Database size={20} />} 
            />
             <NodeCard 
              node={nodes[4]} 
              viewMode={viewMode} 
              icon={<Cpu size={20} />} 
            />
          </div>
          
        </div>

        {/* Caption */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500 italic">
              {viewMode === ViewMode.PRODUCT 
                ? "Figure 1: High-level data flow emphasizing user perceived latency and value retrieval." 
                : "Figure 1: Request topology demonstrating server actions, state router, and vector grounding."}
            </p>
        </div>

      </div>
    </div>
  );
};