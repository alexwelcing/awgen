import React from 'react';
import { BoardLayout } from './BoardLayout';
import { ArchitectureDiagram } from './ArchitectureDiagram';
import { SpiderwebVisualization } from './SpiderwebVisualization';
import { AgentSimulation } from './AgentSimulation';
import { LatencyComparison } from './LatencyComparison';
import { OptimizationGrid } from './OptimizationGrid';
import { AUTHOR_NAME } from '../constants';
import { Github, Linkedin, ArrowRight, ExternalLink } from 'lucide-react';

export const ArticleContent: React.FC = () => {

  const slides = [
    {
      id: "MANIFESTO",
      title: "The Paradigm",
      component: (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-10">
              THE INTERFACE<br/>
              IS THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AGENT</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12 font-light">
                An experimental lab exploring how AI agents reason, collaborate, and fail.<br/>
                Built by <a href="https://alexwelcing.com" target="_blank" className="text-slate-900 font-bold hover:text-blue-600 underline decoration-blue-200 underline-offset-4 transition-colors">Alex Welcing</a>, Senior AI Product Leader.
                <br/><br/>
                We are moving from <strong>Text-in/Text-out</strong> to <strong>Intent-in/Action-out</strong>.
            </p>
            <div className="flex items-center gap-2 text-slate-400 font-mono text-sm animate-pulse">
                <span>Scroll to explore the architecture</span>
                <ArrowRight size={16} className="rotate-90" />
            </div>
        </div>
      )
    },
    {
      id: "SIMULATION",
      title: "The Glass Box",
      component: (
        <div className="flex flex-col h-full">
            <div className="mb-6 flex items-baseline justify-between shrink-0">
               <div>
                   <h2 className="text-3xl font-bold text-slate-900">The Glass Box</h2>
                   <p className="text-slate-600">
                     Visualizing the real-time negotiation. A core part of my <a href="https://alexwelcing.com" target="_blank" className="text-blue-600 hover:underline">Agentic Framework</a>.
                   </p>
               </div>
            </div>
            <div className="flex-1 min-h-0">
                <AgentSimulation />
            </div>
        </div>
      )
    },
    {
      id: "BLUEPRINT",
      title: "The Topology",
      component: (
        <div className="flex flex-col h-full max-w-6xl mx-auto justify-center">
           <div className="text-center mb-10 shrink-0">
                <h2 className="text-4xl font-bold text-slate-900 mb-4">The Agentic Topology</h2>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Effective <a href="https://alexwelcing.com" target="_blank" className="text-slate-900 font-medium hover:text-blue-600 transition-colors border-b border-slate-300">AI Product Strategy</a> requires decoupling the <strong>Interface</strong> (Client) from the <strong>Intelligence</strong> (LLM). 
                    A router sits in the middle, deciding execution paths dynamically.
                </p>
           </div>
           <ArchitectureDiagram />
        </div>
      )
    },
    {
      id: "CONTROL",
      title: "The Control Plane",
      component: (
        <div className="flex flex-col h-full max-w-6xl mx-auto justify-center">
           <div className="flex flex-col items-center justify-center mb-8 text-center shrink-0">
              <h2 className="text-4xl font-bold text-slate-900 mb-3">The Control Plane</h2>
              <p className="text-xl text-slate-600 max-w-3xl">
                 Architecture over magic. We don't just "ask the AI". We expand a routing wavefront to find the most efficient path—cache, code, or model—before spending a single token.
              </p>
           </div>
           
           <div className="flex-1 w-full min-h-[400px]">
               <OptimizationGrid />
           </div>
        </div>
      )
    },
    {
      id: "MEMORY",
      title: "Recursive Memory",
      component: (
        <div className="flex flex-col h-full max-w-6xl mx-auto justify-center">
           <div className="flex flex-col items-center justify-center mb-10 text-center shrink-0">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">The Spiderweb System</h2>
              <p className="text-xl text-slate-600 max-w-3xl">
                 Passive data is useless. The agent constantly scans disparate signals—usage spikes, funding news, competitor pricing—to identify <strong>High-Value Opportunities</strong> in real-time.
              </p>
           </div>
           
           <div className="flex-1 w-full min-h-[400px]">
               <SpiderwebVisualization />
           </div>
        </div>
      )
    },
    {
      id: "LATENCY",
      title: "The Illusion",
      component: (
        <div className="flex flex-col h-full max-w-6xl mx-auto justify-center">
           <div className="text-center mb-12 shrink-0">
               <h2 className="text-4xl font-bold text-slate-900 mb-4">Masking Latency</h2>
               <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                  AI is slow. The web must feel fast. By acknowledging intent immediately (Optimistic UI), we buy the model time to think.
               </p>
           </div>
           <LatencyComparison />
        </div>
      )
    },
    {
      id: "CONNECT",
      title: "Connect",
      component: (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-5xl mx-auto">
           <div className="mb-12">
               <h2 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 tracking-tight">Let's Build.</h2>
               <p className="text-2xl text-slate-600 max-w-2xl mx-auto font-light">
                  Bridging the gap between Product Vision and Engineering Reality.
               </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl">
              <a href="https://alexwelcing.com" target="_blank" rel="noopener noreferrer" 
                 className="group bg-slate-900 text-white p-10 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.02] hover:shadow-2xl border border-slate-800">
                 <div className="bg-white/10 p-4 rounded-full group-hover:bg-white/20 transition-colors">
                    <ExternalLink size={32} className="text-white" />
                 </div>
                 <div className="text-2xl font-bold">View Full Portfolio</div>
                 <span className="text-base text-slate-400 font-mono">alexwelcing.com</span>
              </a>

              <a href="https://linkedin.com/in/alexwelcing" target="_blank" rel="noopener noreferrer"
                 className="group bg-[#0077b5] text-white p-10 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all hover:scale-[1.02] hover:shadow-2xl">
                 <Linkedin size={56} className="text-blue-200 group-hover:text-white transition-colors" />
                 <div className="text-2xl font-bold">Connect on LinkedIn</div>
                 <span className="text-base text-blue-100 font-mono">Recruiters & Partners</span>
              </a>
           </div>

           <div className="mt-16 flex gap-6 text-slate-400 text-sm font-mono">
              <a href="https://github.com/alexwelcing" target="_blank" className="hover:text-slate-900 transition-colors flex items-center gap-2">
                 <Github size={16} /> Source Code
              </a>
              <span>•</span>
              <span>Designed by {AUTHOR_NAME}</span>
           </div>
        </div>
      )
    }
  ];

  return <BoardLayout slides={slides} />;
};