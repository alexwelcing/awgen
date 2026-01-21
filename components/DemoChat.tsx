import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Play, RotateCcw, Loader2, Sparkles, CheckCircle2, Terminal } from 'lucide-react';

const mockChartData = [
  { name: 'Jul', value: 4000 },
  { name: 'Aug', value: 3000 },
  { name: 'Sep', value: 5500 },
];

export const DemoChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<'idle' | 'thinking' | 'tool' | 'streaming' | 'done'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const startDemo = async () => {
    setMessages([]);
    setStatus('thinking');
    
    // Step 1: User Message
    setMessages([{ id: '1', role: 'user', content: 'Analyze Q3 revenue trends.' }]);
    
    // Simulate Thinking Delay
    await new Promise(r => setTimeout(r, 1500));
    
    // Step 2: Tool Call
    setStatus('tool');
    await new Promise(r => setTimeout(r, 1200));

    // Step 3: Tool Result / Streaming UI
    setStatus('streaming');
    setMessages(prev => [
      ...prev,
      {
        id: '2',
        role: 'assistant',
        content: '',
        toolInvocation: {
          toolName: 'getRevenueData',
          state: 'result',
          result: mockChartData
        }
      }
    ]);

    await new Promise(r => setTimeout(r, 800));
    setStatus('done');
  };

  return (
    <div className="my-12 border border-slate-200 rounded-xl shadow-lg bg-white overflow-hidden max-w-2xl mx-auto flex flex-col max-h-[60vh] min-h-[400px]">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600 w-4 h-4" />
            <span className="font-semibold text-sm text-slate-700">Live Demo: Generative UI</span>
        </div>
        <div className="flex gap-2">
            {status === 'idle' || status === 'done' ? (
                <button 
                  onClick={startDemo}
                  className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
                >
                   {status === 'done' ? <RotateCcw size={12}/> : <Play size={12}/>}
                   {status === 'done' ? 'Replay' : 'Run Demo'}
                </button>
            ) : (
                <span className="text-xs text-slate-500 font-mono animate-pulse">Processing...</span>
            )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 bg-white space-y-6 relative custom-scrollbar">
        {messages.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <p className="text-sm">Click "Run Demo" to simulate an Agentic Workflow.</p>
            </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] sm:max-w-[85%] rounded-2xl px-5 py-3 ${
              m.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-slate-100 text-slate-800 rounded-tl-sm'
            }`}>
              {m.content && <p className="text-sm">{m.content}</p>}
              
              {m.toolInvocation && (
                <div className="mt-2">
                    <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 font-mono border-b border-slate-200 pb-2">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span>Called function <span className="text-slate-700 font-bold">{m.toolInvocation.toolName}</span></span>
                    </div>
                    {/* Responsive Chart Container */}
                    <div className="h-[200px] w-[250px] sm:w-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={m.toolInvocation.result}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#f1f5f9'}}
                                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {status === 'thinking' && (
             <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-slate-500 text-xs font-mono">
                    <Loader2 className="animate-spin w-3 h-3" />
                    <span>Orchestrator routing request...</span>
                </div>
             </div>
        )}
        
        {status === 'tool' && (
             <div className="flex justify-start">
                <div className="bg-orange-50 border border-orange-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2 text-orange-700 text-xs font-mono">
                    <Terminal className="w-3 h-3" />
                    <span>Executing tool: getRevenueData(q: "Q3 2024")</span>
                </div>
             </div>
        )}

      </div>
    </div>
  );
};