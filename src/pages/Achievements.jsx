import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Achievements() {
  const { achievements } = useApp();
  
  // Custom coordinates for tracking mouse highlight on cards
  const [foilCoordinates, setFoilCoordinates] = useState({}); // { cardId: { x: '0%', y: '0%' } }

  const handleMouseMove = (cardId, e, rect) => {
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentages relative to card dimensions
    const xPercent = ((x / rect.width) - 0.5) * 100;
    const yPercent = ((y / rect.height) - 0.5) * 100;

    setFoilCoordinates(prev => ({
      ...prev,
      [cardId]: { x: `${xPercent}%`, y: `${yPercent}%` }
    }));
  };

  const handleMouseLeave = (cardId) => {
    setFoilCoordinates(prev => ({
      ...prev,
      [cardId]: { x: '0%', y: '0%' }
    }));
  };

  return (
    <div className="flex-grow bg-[#0A1128] text-[#F8FAFC] min-h-screen relative overflow-y-auto pb-16">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(5,183,214,0.06)_0%,transparent_60%)] pointer-events-none opacity-50 z-0"></div>

      <div className="max-w-[1200px] w-full mx-auto px-8 py-12 lg:py-20 relative z-10">
        
        {/* Header section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-[#1E293B] pb-8">
          <div className="flex flex-col gap-4 max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-display font-extrabold leading-tight tracking-tight text-white">
              Credentials <br/>
              <span className="bg-gradient-to-r from-[#06B6D4] to-[#4F46E5] bg-clip-text text-transparent">
                &amp; Honors
              </span>
            </h1>
            <p className="text-[#94A3B8] text-lg leading-relaxed max-w-lg font-sans">
              Your journey artifacts. A curated gallery of your linguistic milestones, forged through dedication and practice.
            </p>
          </div>

          {/* Stats Chips */}
          <div className="flex gap-4 self-start md:self-end">
            <div className="bg-[#151E32]/70 border border-[#1E293B] rounded-2xl p-5 flex flex-col gap-1 min-w-[140px] shadow-lg backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#94A3B8] font-bold">Unlocked</span>
              <span className="text-3xl font-display font-extrabold text-white">
                {achievements.filter(a => a.unlocked).length}
                <span className="text-[#94A3B8] text-lg font-semibold">/{achievements.length}</span>
              </span>
            </div>
            <div className="bg-[#151E32]/70 border border-[#1E293B] rounded-2xl p-5 flex flex-col gap-1 min-w-[140px] shadow-lg backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#94A3B8] font-bold">Rank</span>
              <span className="text-3xl font-display font-extrabold text-[#06B6D4]">Adept</span>
            </div>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main feature artifact card (Genesis Ring) */}
          {achievements.filter(a => a.id === 'genesis-ring').map(ach => {
            const coords = foilCoordinates[ach.id] || { x: '0%', y: '0%' };
            return (
              <article 
                key={ach.id}
                onMouseMove={(e) => handleMouseMove(ach.id, e, e.currentTarget.getBoundingClientRect())}
                onMouseLeave={() => handleMouseLeave(ach.id)}
                className="md:col-span-8 bg-[#151E32] rounded-2xl border border-[#1E293B] p-8 flex flex-col justify-between min-h-[420px] relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_24px_-8px_rgba(5,183,214,0.2)]"
              >
                {/* Holographic foil layer */}
                <div 
                  className="absolute inset-[-50%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen z-10"
                  style={{
                    background: `radial-gradient(circle at center, rgba(5, 183, 214, 0.4) 0%, transparent 50%)`,
                    transform: `translate(${coords.x}, ${coords.y})`
                  }}
                ></div>
                
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#06B6D4]/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                
                <div className="relative z-20 flex justify-between items-start w-full">
                  <div>
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full border border-[#06B6D4]/30 bg-[#06B6D4]/10 text-[#06B6D4] text-[10px] uppercase font-mono tracking-wider font-bold mb-4">
                      {ach.category}
                    </div>
                    <h2 className="text-3xl font-display font-extrabold text-white mb-2 group-hover:text-[#06B6D4] transition-colors">
                      {ach.title}
                    </h2>
                    <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm">{ach.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] block mb-1 font-bold">Earned On</span>
                    <span className="text-sm font-semibold text-white">{ach.dateEarned}</span>
                  </div>
                </div>

                {/* Spin loader spinner placeholder */}
                <div className="relative z-20 flex-grow flex items-center justify-center py-8">
                  <div className="w-44 h-44 rounded-full border border-[#1E293B] bg-[#0A1128] flex items-center justify-center relative shadow-[0_0_40px_rgba(5,183,214,0.15)]">
                    <span className="material-symbols-outlined text-6xl text-[#06B6D4]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {ach.icon}
                    </span>
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#06B6D4] animate-spin" style={{ animationDuration: '4s' }}></div>
                  </div>
                </div>

                <div className="relative z-20 flex justify-between items-end border-t border-[#1E293B] pt-4 mt-auto">
                  <span className="text-xs text-[#94A3B8] font-mono">
                    RARITY SCORE: <strong className="text-white font-bold">{ach.rarity}</strong>
                  </span>
                  <button className="text-[#06B6D4] text-xs font-mono font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center gap-1">
                    View Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </article>
            );
          })}

          {/* Medium unlocked achievement card (Flawless Week) */}
          {achievements.filter(a => a.id === 'flawless-week').map(ach => {
            const coords = foilCoordinates[ach.id] || { x: '0%', y: '0%' };
            return (
              <article 
                key={ach.id}
                onMouseMove={(e) => handleMouseMove(ach.id, e, e.currentTarget.getBoundingClientRect())}
                onMouseLeave={() => handleMouseLeave(ach.id)}
                className="md:col-span-4 bg-[#151E32] rounded-2xl border border-[#1E293B] p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_24px_-8px_rgba(5,183,214,0.2)]"
              >
                <div 
                  className="absolute inset-[-50%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen z-10"
                  style={{
                    background: `radial-gradient(circle at center, rgba(79, 70, 229, 0.4) 0%, transparent 50%)`,
                    transform: `translate(${coords.x}, ${coords.y})`
                  }}
                ></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#4F46E5]/5 rounded-full blur-2xl -ml-10 -mb-10"></div>
                
                <div className="flex justify-between items-start mb-8 relative z-20">
                  <div className="w-16 h-16 rounded-xl bg-[#0A1128] border border-[#1E293B] flex items-center justify-center shadow-lg group-hover:border-[#4F46E5] transition-colors">
                    <span className="material-symbols-outlined text-3xl text-[#4F46E5]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {ach.icon}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] block mb-1 font-bold">Earned</span>
                    <span className="text-sm font-semibold text-white">{ach.dateEarned}</span>
                  </div>
                </div>

                <div className="relative z-20 mt-auto">
                  <h3 className="text-xl font-display font-extrabold text-white mb-2">{ach.title}</h3>
                  <p className="text-[#94A3B8] text-xs leading-relaxed mb-4">{ach.description}</p>
                  <div className="h-1.5 w-full bg-[#0A1128] rounded-full overflow-hidden">
                    <div className="h-full bg-[#4F46E5] w-full rounded-full"></div>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Unlocked Skill achievement card (Orator's Echo) */}
          {achievements.filter(a => a.id === 'orators-echo').map(ach => {
            const coords = foilCoordinates[ach.id] || { x: '0%', y: '0%' };
            return (
              <article 
                key={ach.id}
                onMouseMove={(e) => handleMouseMove(ach.id, e, e.currentTarget.getBoundingClientRect())}
                onMouseLeave={() => handleMouseLeave(ach.id)}
                className="md:col-span-4 bg-[#151E32] rounded-2xl border border-[#1E293B] p-6 flex flex-col justify-between relative overflow-hidden group transition-all duration-300 hover:translate-y-[-4px] hover:shadow-[0_12px_24px_-8px_rgba(5,183,214,0.2)]"
              >
                <div 
                  className="absolute inset-[-50%] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen z-10"
                  style={{
                    background: `radial-gradient(circle at center, rgba(5, 183, 214, 0.4) 0%, transparent 50%)`,
                    transform: `translate(${coords.x}, ${coords.y})`
                  }}
                ></div>
                
                <div className="flex justify-between items-start mb-8 relative z-20">
                  <div className="w-16 h-16 rounded-xl bg-[#0A1128] border border-[#1E293B] flex items-center justify-center shadow-lg group-hover:border-[#06B6D4] transition-colors">
                    <span className="material-symbols-outlined text-3xl text-[#06B6D4]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {ach.icon}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] block mb-1 font-bold">Earned</span>
                    <span className="text-sm font-semibold text-white">{ach.dateEarned}</span>
                  </div>
                </div>

                <div className="relative z-20 mt-auto">
                  <h3 className="text-xl font-display font-extrabold text-white mb-2">{ach.title}</h3>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{ach.description}</p>
                </div>
              </article>
            );
          })}

          {/* Locked Achievement cards (locked, grayscale, blurred, lock icon) */}
          {achievements.filter(a => !a.unlocked).map(ach => (
            <article 
              key={ach.id}
              className="md:col-span-4 bg-[#0A1128] rounded-2xl border border-[#1E293B] p-6 flex flex-col justify-between relative overflow-hidden opacity-60 grayscale hover:grayscale-0 transition-all duration-500 cursor-not-allowed"
            >
              {/* blur overlay */}
              <div className="absolute inset-0 bg-[#151E32]/40 backdrop-blur-sm z-0"></div>

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 rounded-xl bg-[#0A1128] border border-[#1E293B] border-dashed flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-[#94A3B8]" style={{ fontVariationSettings: "'FILL' 0" }}>
                    lock
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#94A3B8] block mb-1 font-bold">Status</span>
                  <span className="text-sm font-semibold text-[#94A3B8]">Locked</span>
                </div>
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-xl font-display font-extrabold text-[#94A3B8] mb-2 blur-[1.5px]">{ach.title}</h3>
                <p className="text-[#94A3B8]/80 text-xs leading-relaxed mb-4">{ach.description}</p>
                
                {ach.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between font-mono text-[9px] text-[#94A3B8]">
                      <span>Progress</span>
                      <span>{ach.progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#151E32] rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 rounded-full" style={{ width: `${ach.progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}

        </div>
      </div>
    </div>
  );
}
