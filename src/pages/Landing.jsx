import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Landing() {
  const navigate = useNavigate();
  const { courses, user } = useApp();

  const handleStartLearning = (courseId) => {
    if (user) {
      if (user.user_metadata?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="bg-[#0B132B] text-white min-h-screen flex flex-col justify-between font-sans selection:bg-[#2563EB]/20 selection:text-white">
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-5 bg-[#0B132B]/85 backdrop-blur-md border-b border-[#1E293B]">
        <div className="flex items-center gap-8">
          <span 
            onClick={() => navigate('/')} 
            className="font-display text-2xl tracking-tighter font-black text-white cursor-pointer hover:text-[#2563EB] transition-colors"
          >
            LinguaVerse
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-[#94A3B8] hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={() => navigate('/signup')}
            className="bg-[#2563EB] text-white px-6 py-2.5 rounded font-mono text-[10px] font-bold uppercase tracking-wider hover:bg-blue-600 transition-all active:scale-95 shadow-md"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Main Content Stage */}
      <main className="flex-grow pt-32 px-6 md:px-12 max-w-5xl mx-auto w-full flex flex-col justify-center pb-12">
        
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 text-center overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2563EB]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#2563EB] bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 inline-block rounded-full animate-fadeIn">
              Linguistic Ecosystem
            </span>
            
            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Master any language <br />
              with <span className="text-[#2563EB] italic">precision.</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              Experience a curated multilingual curriculum designed to dynamically build fluency. Manage, customize, and learn dialects in a professional-grade digital ecosystem.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-[#2563EB] text-white px-8 py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
              >
                Begin Learning
              </button>
              <a 
                href="#pathways-list"
                className="w-full sm:w-auto border border-[#1E293B] bg-[#1C2541]/20 hover:bg-[#1C2541]/40 text-[#94A3B8] hover:text-white px-8 py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all text-center"
              >
                Explore Pathways
              </a>
            </div>
          </div>
        </section>

        {/* Dynamic Pathways Grid - reflecting Admin Panel creations */}
        <section id="pathways-list" className="space-y-6 scroll-mt-24">
          <h3 className="font-mono text-[10px] font-bold tracking-widest text-[#2563EB] uppercase border-b border-[#1E293B] pb-2">
            Available Language Pathways
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div 
                key={course.id}
                onClick={() => handleStartLearning(course.id)}
                className="group p-6 bg-[#1C2541]/40 border border-[#1E293B] rounded-2xl flex flex-col justify-between hover:border-[#2563EB]/40 hover:bg-[#1C2541]/60 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-lg font-bold text-white group-hover:text-[#2563EB] transition-colors">
                      {course.title}
                    </span>
                    <span className="bg-[#2563EB]/10 text-[#2563EB] px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider border border-[#2563EB]/20">
                      {course.level || 'Dialect'}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {course.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-[#1E293B] mt-4 font-mono text-[9px] font-bold uppercase tracking-widest text-[#94A3B8]">
                  <span>{course.totalLessons || 12} Lessons Available</span>
                  <span className="flex items-center gap-1 text-[#2563EB] group-hover:gap-2 transition-all">
                    Start Learning <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Minimal Footer */}
      <footer className="w-full border-t border-[#1E293B]/60 py-6 px-6 md:px-12 bg-[#0B132B]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-[#94A3B8] font-mono text-[9px] uppercase tracking-wider">
          <p>© 2026 LinguaVerse. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-white transition-colors" href="#">Privacy</a>
            <a className="hover:text-white transition-colors" href="#">Terms</a>
            <a className="hover:text-white transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
