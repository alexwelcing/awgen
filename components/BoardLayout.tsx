import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp, Pin, CornerDownRight } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: any) => void;
  }
}

interface BoardLayoutProps {
  slides: {
    id: string;
    title: string;
    component: React.ReactNode;
  }[];
}

export const BoardLayout: React.FC<BoardLayoutProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(prev => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  // Animation Variants
  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? 1200 : -1200,
      opacity: 0,
      // Funk: Random rotation only during entry/motion
      rotate: direction > 0 ? Math.random() * 6 - 3 : Math.random() * 6 - 3,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
      // Rest: Perfectly straight
      rotate: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? 1200 : -1200,
      opacity: 0,
      // Funk: Random rotation only during exit/motion
      rotate: direction < 0 ? Math.random() * 6 - 3 : Math.random() * 6 - 3,
      scale: 0.9,
    })
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] overflow-hidden bg-dot-pattern bg-slate-50 flex flex-col items-center justify-center">
      
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[#fdfbf7] opacity-80 pointer-events-none"></div>

      {/* The Red Thread Connection (Vertical) */}
      <div className="hidden md:block absolute top-0 left-8 bottom-0 w-16 z-0">
         <svg className="h-full w-full" preserveAspectRatio="none">
             <motion.path 
               d={`M 32 0 Q ${currentSlide % 2 === 0 ? '60' : '0'} ${currentSlide * 100 + 50}, 32 ${currentSlide * 100 + 200}`}
               fill="none"
               stroke="#ef4444"
               strokeWidth="3"
               strokeDasharray="10 5"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               className="drop-shadow-md opacity-30"
             />
         </svg>
      </div>

      {/* Vertical Progress Nodes */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
         {slides.map((slide, idx) => (
           <div key={slide.id} className="relative group flex items-center justify-end">
               <span className={`absolute right-8 mr-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 transition-opacity whitespace-nowrap
                   ${idx === currentSlide ? 'opacity-100' : 'group-hover:opacity-100'}
               `}>
                   {slide.title}
               </span>
               <motion.button 
                onClick={() => {
                    setDirection(idx > currentSlide ? 1 : -1);
                    setCurrentSlide(idx);
                }}
                className={`w-3 h-3 rounded-full border-2 transition-all
                    ${idx === currentSlide ? 'bg-red-500 border-red-600 scale-125' : 'bg-white border-slate-300 hover:border-red-400'}
                `}
               />
           </div>
         ))}
      </div>

      {/* Main Card Stage - HUUUGE POSTER (90vw) */}
      <div className="relative w-full max-w-[95vw] md:max-w-[90vw] h-[90vh] md:h-[85vh] flex items-center justify-center p-4 z-10 perspective-1000">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 260, damping: 25 },
              opacity: { duration: 0.3 },
              rotate: { type: "spring", stiffness: 200, damping: 20 }
            }}
            className="absolute w-full h-full max-h-[900px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
            style={{
                boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.15)'
            }}
          >
             {/* Card Header */}
             <div className="h-16 bg-white/95 backdrop-blur border-b border-slate-100 flex items-center justify-between px-8 select-none z-10 sticky top-0">
                 <div className="flex items-center gap-4">
                     <span className="font-marker text-2xl text-slate-300 select-none">
                       #{currentSlide + 1}<span className="text-slate-200 mx-1">/</span>{slides.length}
                     </span>
                     <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 hidden sm:block">{slides[currentSlide].title}</h2>
                 </div>
                 <Pin className="text-red-500 fill-red-500 rotate-[30deg] opacity-90 drop-shadow-sm" size={20} />
             </div>

             {/* Scrollable Content Area */}
             <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-16 bg-white relative">
                 {slides[currentSlide].component}
             </div>
             
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls (Bottom Right Corner) */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-30">
         <button 
           onClick={prevSlide} 
           disabled={currentSlide === 0}
           className="bg-white hover:bg-slate-50 border border-slate-200 shadow-lg p-3 rounded-full transition-all disabled:opacity-50 text-slate-800 disabled:cursor-not-allowed"
           aria-label="Previous Slide"
           onClickCapture={() => {
             if (window.gtag) window.gtag('event', 'prev_slide', { event_category: 'navigation', value: currentSlide - 1 });
           }}
         >
            <ArrowUp size={20} />
         </button>
         
         <button 
           onClick={nextSlide} 
           disabled={currentSlide === slides.length - 1}
           className="bg-slate-900 hover:bg-slate-800 text-white shadow-xl p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
           aria-label="Next Slide"
           onClickCapture={() => {
             if (window.gtag) window.gtag('event', 'next_slide', { event_category: 'navigation', value: currentSlide + 1 });
           }}
         >
            <ArrowDown size={20} />
         </button>
      </div>
    </div>
  );
};