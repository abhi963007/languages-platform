import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const { user, courses, currentCourseId, selectCourse, logout } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user) return null;

  const currentCourse = courses.find(c => c.id === currentCourseId) || courses[0];
  const userMeta = user.user_metadata || {};

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-[#0A1128]/80 backdrop-blur-md border-b border-[#1E293B]">
      {/* Brand Logo */}
      <div className="flex items-center gap-8">
        <Link to="/dashboard" className="font-display text-lg tracking-tighter font-black text-[#F8FAFC]">
          LinguaVerse
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/dashboard" className={({ isActive }) => `font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#00daf3]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}>Explore</NavLink>
          <NavLink to="/journey" className={({ isActive }) => `font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#00daf3]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}>Pathways</NavLink>
          <NavLink to="/vocabulary" className={({ isActive }) => `font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#00daf3]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}>Journal</NavLink>
          <NavLink to="/community" className={({ isActive }) => `font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-[#00daf3]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'}`}>Community</NavLink>
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* Language Selection Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-[#151E32] hover:bg-[#151E32]/80 border border-[#1E293B] rounded-full transition-colors text-sm font-semibold text-[#F8FAFC]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#06B6D4]">translate</span>
            <span>{currentCourse?.title || 'Language'}</span>
            <span className="material-symbols-outlined text-xs">expand_more</span>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-[#151E32] border border-[#1E293B] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-[#1E293B] mb-1">
                <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#94A3B8]">Select Learning Path</span>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {courses.map(course => (
                  <button
                    key={course.id}
                    onClick={() => {
                      selectCourse(course.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 hover:bg-[#0A1128] transition-colors flex items-center justify-between text-sm ${
                      course.id === currentCourseId ? 'text-[#06B6D4] font-bold bg-[#0A1128]/60' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                    }`}
                  >
                    <span>{course.title}</span>
                    {course.id === currentCourseId && (
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User avatar for mobile logout & admin trigger */}
        <div className="relative lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700 focus:outline-none"
          >
            <img 
              className="w-full h-full object-cover" 
              src={userMeta.avatar_url} 
              alt={userMeta.full_name} 
            />
          </button>
          
          {mobileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#151E32] border border-[#1E293B] rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-2 border-b border-[#1E293B]">
                <p className="text-sm font-bold text-white truncate">{userMeta.full_name}</p>
                <p className="text-[10px] font-mono text-[#94A3B8]">Lvl {userMeta.level_polyglot || 1}</p>
              </div>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-[#94A3B8] hover:text-white">
                <span className="material-symbols-outlined text-sm">dashboard</span> Dashboard
              </Link>
              <Link to="/journey" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-[#94A3B8] hover:text-white">
                <span className="material-symbols-outlined text-sm">route</span> Journey
              </Link>
              <Link to="/vocabulary" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-[#94A3B8] hover:text-white">
                <span className="material-symbols-outlined text-sm">menu_book</span> Vocabulary
              </Link>
              <Link to="/achievements" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-[#94A3B8] hover:text-white">
                <span className="material-symbols-outlined text-sm">workspace_premium</span> Achievements
              </Link>
              <Link to="/community" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-[#94A3B8] hover:text-white">
                <span className="material-symbols-outlined text-sm">forum</span> Community
              </Link>
              {userMeta.role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-amber-400 hover:bg-amber-500/10">
                  <span className="material-symbols-outlined text-sm">admin_panel_settings</span> Admin Panel
                </Link>
              )}
              <button 
                onClick={logout}
                className="w-full text-left flex items-center gap-2 px-4 py-2.5 hover:bg-[#0A1128] text-sm text-red-400 hover:text-red-300 border-t border-[#1E293B] mt-2"
              >
                <span className="material-symbols-outlined text-sm">logout</span> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
