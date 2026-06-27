import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Journey() {
  const { currentCourse } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Fade in animation
    const el = document.getElementById('journey-view');
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    }
  }, [currentCourse]);

  if (!currentCourse) return null;

  // Flatten all lessons across units to draw a single continuous path
  const allLessons = [];
  currentCourse.units?.forEach(unit => {
    if (unit.status !== 'DRAFT') { // Only show active units
      unit.lessons?.forEach(lesson => {
        allLessons.push({
          ...lesson,
          unitId: unit.id,
          unitTitle: unit.title
        });
      });
    }
  });

  return (
    <div id="journey-view" className="flex-1 bg-[#0A1128] text-white min-h-screen relative overflow-y-auto pb-24">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-2/3 left-1/3 w-[600px] h-[600px] bg-[#4F46E5]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[800px] mx-auto px-6 pt-12 relative z-10">
        
        {/* Course Header */}
        <header className="mb-16 text-center">
          <span className="text-[#06B6D4] font-display font-semibold tracking-widest uppercase text-xs mb-3 block">
            {currentCourse.dialectInfo || currentCourse.level || 'Learning Pathway'}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {currentCourse.title} Journey
          </h1>
          <p className="text-[#94A3B8] text-sm max-w-md mx-auto leading-relaxed">
            Follow the asymmetrical S-curve path. Complete each node to unlock the next cultural and linguistic level.
          </p>
        </header>

        {/* Path Canvas */}
        <div className="relative flex flex-col items-center py-12">
          
          {/* Vertical connecting line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#4F46E5] via-[#06B6D4] to-slate-800 z-0"></div>

          {currentCourse.units?.length === 0 ? (
            <div className="text-center py-12">
              <span className="material-symbols-outlined text-4xl text-[#94A3B8] mb-4">menu_book</span>
              <p className="text-[#94A3B8] font-mono text-xs uppercase tracking-wider">No lessons created yet for this path</p>
            </div>
          ) : (
            currentCourse.units?.filter(u => u.status !== 'DRAFT').map((unit, uIdx) => (
              <div key={unit.id} className="w-full mb-16 relative z-10 flex flex-col items-center">
                
                {/* Unit Sticky Header */}
                <div className="glass-panel border border-[#1E293B] bg-[#151E32]/80 backdrop-blur rounded-full px-6 py-2.5 mb-12 shadow-xl flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#06B6D4]"></span>
                  <span className="font-display text-sm font-semibold tracking-wide">{unit.title}</span>
                </div>

                {/* Lesson Nodes list */}
                <div className="w-full flex flex-col gap-12 items-center">
                  {unit.lessons?.map((lesson, lIdx) => {
                    // Position calculations for S-curve
                    const positions = ['-translate-x-12 md:-translate-x-24', 'translate-x-0', 'translate-x-12 md:translate-x-24'];
                    const posIndex = lIdx % 3;
                    const alignmentClass = positions[posIndex];

                    const isCompleted = lesson.completed;
                    const isActive = lesson.unlocked && !lesson.completed;
                    const isLocked = !lesson.unlocked && !lesson.completed;

                    return (
                      <div 
                        key={lesson.id} 
                        className={`flex flex-col items-center transition-all duration-300 relative ${alignmentClass}`}
                      >
                        {/* Node Tooltip */}
                        <div className="absolute bottom-16 bg-[#151E32] border border-[#1E293B] rounded-lg px-4 py-2 text-center shadow-2xl min-w-[160px] pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          <p className="text-white text-xs font-bold font-display">{lesson.title}</p>
                          <p className="text-[#94A3B8] text-[10px] font-mono uppercase tracking-wider mt-0.5">{lesson.duration || '15m'} • {lesson.activitiesCount || 3} Acts</p>
                        </div>

                        {/* Interactive Node Circle */}
                        <button
                          disabled={isLocked}
                          onClick={() => navigate(`/lesson/${currentCourse.id}/${unit.id}/${lesson.id}`)}
                          className={`w-16 h-16 rounded-full flex items-center justify-center relative transition-all duration-300 shadow-2xl group ${
                            isCompleted 
                              ? 'bg-[#4F46E5] text-white border-2 border-indigo-400 hover:scale-105' 
                              : isActive 
                                ? 'bg-[#06B6D4] text-[#0A1128] border-2 border-[#00e3fd] hover:scale-110 animate-pulse' 
                                : 'bg-[#151E32] text-slate-500 border border-[#1E293B] cursor-not-allowed'
                          }`}
                          style={isActive ? { boxShadow: '0 0 24px rgba(6,182,212,0.6)' } : {}}
                        >
                          {isCompleted ? (
                            <span className="material-symbols-outlined font-bold text-xl">check</span>
                          ) : isLocked ? (
                            <span className="material-symbols-outlined text-lg">lock</span>
                          ) : (
                            <span className="material-symbols-outlined font-bold text-xl">play_arrow</span>
                          )}
                        </button>
                        
                        <span className="mt-3 font-mono text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest bg-slate-900/50 px-2 py-0.5 rounded border border-[#1E293B]/20">
                          NODE {lIdx + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
