import React from 'react';
import { ArticleContent } from './components/ArticleContent';
import { SEOMetadata } from './components/SEOMetadata';
import { Bot, Share2, Menu } from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="h-screen bg-slate-50 font-sans antialiased overflow-hidden flex flex-col">
      <SEOMetadata />
      
      {/* Navigation Bar */}
      <nav className="h-16 bg-white border-b border-slate-200 shrink-0 z-50 relative shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <a href="https://alexwelcing.com" target="_blank" className="flex items-center gap-3 group">
              <div className="bg-red-600 text-white p-1.5 rounded rotate-3 group-hover:rotate-0 transition-transform cursor-pointer">
                <Bot size={20} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-red-600 transition-colors">Agents</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold group-hover:text-slate-700">AlexWelcing.com</span>
              </div>
            </a>
            
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded">v2.0.4-agentic-rc</span>
              <button 
                 className="text-slate-500 hover:text-red-600 transition-colors"
                 onClick={() => {
                     if (navigator.share) {
                         navigator.share({
                             title: 'Agents | Alex Welcing',
                             text: 'Explore the architecture of Agentic Web Systems.',
                             url: window.location.href,
                         });
                     }
                 }}
              >
                <Share2 size={20} />
              </button>
              <a href="https://alexwelcing.com" target="_blank" className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg">
                About the Architect
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="text-slate-500 hover:text-slate-700">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Board */}
      <main className="flex-1 relative overflow-hidden">
        <ArticleContent />
      </main>
    </div>
  );
};

export default App;