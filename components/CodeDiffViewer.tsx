import React, { useState } from 'react';
import { OPTIMISTIC_CODE_TRADITIONAL, OPTIMISTIC_CODE_AGENTIC } from '../constants';
import { Code, Check, X } from 'lucide-react';

export const CodeDiffViewer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');

  return (
    <div className="my-8 border border-slate-700 rounded-lg overflow-hidden bg-[#1e293b] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-700">
        <div className="flex items-center gap-2 text-slate-300">
          <Code size={16} />
          <span className="text-xs font-mono font-bold">Latency Implementation Diff</span>
        </div>
        <div className="flex bg-slate-800 rounded p-1">
          <button
            onClick={() => setActiveTab('before')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeTab === 'before' ? 'bg-red-900/50 text-red-200' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <X size={12} /> Before
          </button>
          <button
            onClick={() => setActiveTab('after')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors flex items-center gap-1 ${
              activeTab === 'after' ? 'bg-green-900/50 text-green-200' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Check size={12} /> After (Optimistic)
          </button>
        </div>
      </div>
      
      <div className="p-4 overflow-x-auto scrollbar-dark">
        <pre className="font-mono text-sm leading-relaxed">
          <code className={activeTab === 'before' ? 'text-red-100' : 'text-green-100'}>
            {activeTab === 'before' ? OPTIMISTIC_CODE_TRADITIONAL : OPTIMISTIC_CODE_AGENTIC}
          </code>
        </pre>
      </div>
      <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-700 text-[10px] text-slate-400 font-mono text-right">
        {activeTab === 'before' ? 'Blocking I/O pattern' : 'React 19 useOptimistic pattern'}
      </div>
    </div>
  );
};