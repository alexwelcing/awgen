import React, { useState } from 'react';
import { Send, Download, Lock, CheckCircle, FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmailCapture = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => setStatus('success'), 1500);
    };

    if (status === 'success') {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-100 border-dashed max-w-md mx-auto"
            >
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">You're In!</h3>
                <p className="text-slate-600 mb-8 text-lg">The <strong>Agentic Architecture Guide</strong> is ready for download.</p>
                <button className="w-full bg-slate-900 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 group">
                    <Download size={24} className="group-hover:animate-bounce" />
                    Download PDF Bundle
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-1 rounded-2xl shadow-sm">
            <div className="border border-slate-100 rounded-xl p-8 md:p-10 relative overflow-hidden">
                {/* Decorative background blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

                <div className="text-center mb-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                        <Sparkles size={12} />
                        Bonus Content
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
                        Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Full Architecture</span>
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Get the high-res diagrams, React 19 source code, and my <strong>"Agentic PM Checklist"</strong> PDF.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                    <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-200"></div>
                        <div className="relative flex bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                            <input 
                                type="email" 
                                required
                                placeholder="Enter your work email..."
                                className="w-full px-4 py-3 rounded-lg text-lg outline-none text-slate-900 placeholder:text-slate-400"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button 
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-slate-900 text-white px-6 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {status === 'loading' ? <span className="animate-pulse">Sending...</span> : (
                                    <>
                                        <span>Get It</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>

                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span>PDF Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Lock size={16} />
                        <span>Source Code</span>
                    </div>
                </div>
            </div>
        </div>
    );
};