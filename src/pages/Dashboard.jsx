import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const { 
    user, 
    currentCourse, 
    courses, 
    selectCourse,
    xp, 
    streak, 
    wordsLearned 
  } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    // Micro-interaction for page load opacity
    const el = document.getElementById('dashboard-view');
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => {
        el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 50);
    }
  }, []);

  if (!user) return null;
  const userMeta = user.user_metadata || {};

  // XP level calculation (2500 XP per level)
  const xpInCurrentLevel = xp % 2500;
  const xpPercentage = Math.round((xpInCurrentLevel / 2500) * 100);

  return (
    <div id="dashboard-view" className="flex-1 overflow-y-auto bg-[#f9f9ff] text-[#111c2d] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 py-10">
        
        {/* Welcome Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end mb-14">
          <div className="md:col-span-8">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#006875] mb-2 block">Current Status</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#001430]">
              Good Morning, {userMeta.full_name?.split(' ')[0]}.
            </h1>
            <p className="font-sans text-lg text-[#43474f] max-w-xl mt-4 leading-relaxed">
              You're making remarkable progress. Your linguistic fluency across {courses.filter(c => c.progress > 0).length || 1} languages is now in the top 2% of the global community.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-4">
            {/* Streak Widget */}
            <div className="bg-[#00e3fd]/10 p-6 rounded-2xl flex items-center justify-between border border-[#00e3fd]/20">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#00616d] mb-1">Daily Streak</p>
                <p className="font-display text-5xl font-extrabold text-[#001430]">{streak}</p>
              </div>
              <div className="text-[#006875] opacity-40">
                <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14">
          {/* XP Progress Card */}
          <div className="md:col-span-7 bg-white p-8 rounded-2xl border border-[#E2E8F0] flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-display text-xl font-bold text-[#001430]">XP Progression</h3>
                <span className="font-mono text-xs font-bold text-[#43474f] uppercase tracking-wider">Level {userMeta.level_polyglot || 12} Mastery</span>
              </div>
              <div className="relative w-full h-4 bg-[#e7eeff] rounded-full overflow-hidden mb-4">
                <div 
                  className="absolute top-0 left-0 h-full bg-[#00daf3] transition-all duration-1000 ease-out rounded-full shadow-[0_0_8px_rgba(0,227,253,0.5)]" 
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#43474f] uppercase tracking-wider">
                <span>{xpInCurrentLevel} XP</span>
                <span>2,500 XP (Next Level)</span>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="bg-[#f0f3ff] p-4 rounded-xl">
                <p className="font-mono text-[9px] text-[#43474f] font-bold uppercase tracking-wider mb-1">Today</p>
                <p className="font-display text-lg font-extrabold text-[#001430]">+450 XP</p>
              </div>
              <div className="bg-[#f0f3ff] p-4 rounded-xl">
                <p className="font-mono text-[9px] text-[#43474f] font-bold uppercase tracking-wider mb-1">Weekly</p>
                <p className="font-display text-lg font-extrabold text-[#001430]">3.2k XP</p>
              </div>
              <div className="bg-[#f0f3ff] p-4 rounded-xl">
                <p className="font-mono text-[9px] text-[#43474f] font-bold uppercase tracking-wider mb-1">Global</p>
                <p className="font-display text-lg font-extrabold text-[#001430]">#142</p>
              </div>
            </div>
          </div>

          {/* Resume Learning Card */}
          <div 
            onClick={() => navigate('/journey')}
            className="md:col-span-5 relative group cursor-pointer overflow-hidden rounded-2xl border border-[#E2E8F0] bg-[#001430] min-h-[300px] shadow-sm flex flex-col justify-end"
          >
            {/* Background image with dramatic overlay */}
            <div 
              className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-700 bg-cover bg-center" 
              style={{ backgroundImage: `url(${currentCourse?.bannerImage || currentCourse?.imageUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001430] via-[#001430]/60 to-transparent"></div>
            
            <div className="relative p-8 z-10">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#00e3fd] mb-2 block">Resume Learning</span>
              <h2 className="font-display text-2xl font-extrabold text-white mb-4">
                {currentCourse?.id === 'kodava' ? 'Basic Communication in Kodava' : `Fluency in ${currentCourse?.title}`}
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-1 bg-[#00e3fd] rounded-full"></div>
                  <span className="font-mono text-[10px] text-white/70 uppercase tracking-wider">Module 1 of 4</span>
                </div>
                <button className="w-12 h-12 rounded-full bg-white text-[#001430] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg">
                  <span className="material-symbols-outlined text-2xl font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* My Pathways */}
        <section>
          <div className="flex justify-between items-center mb-8 border-b border-[#E2E8F0] pb-4">
            <h3 className="font-display text-2xl font-bold text-[#001430]">My Pathways</h3>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#006875]">Tracked Paths</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
            {courses.map(course => (
              <div 
                key={course.id}
                onClick={() => {
                  selectCourse(course.id);
                  navigate('/journey');
                }}
                className="group flex flex-col cursor-pointer bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#e7eeff] mb-6 relative">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={course.imageUrl} 
                    alt={course.title}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider rounded border border-[#E2E8F0]">
                    {course.level || 'Beginner'}
                  </div>
                </div>
                <h4 className="font-display text-lg font-bold text-[#001430] mb-2 group-hover:text-[#006875] transition-colors">
                  {course.title}
                </h4>
                <p className="font-sans text-sm text-[#43474f] line-clamp-2 leading-relaxed mb-4">
                  {course.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                  <span className="font-mono text-[10px] font-bold text-[#43474f] uppercase tracking-wider">Progress: {course.progress}%</span>
                  <span className="material-symbols-outlined text-[#006875] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
