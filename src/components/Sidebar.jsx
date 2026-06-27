import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Sidebar() {
  const { user, logout } = useApp();

  if (!user) return null;

  const userMeta = user.user_metadata || {};

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 bg-[#0A1128] border-r border-[#1E293B] sticky top-0 shrink-0 z-40">
      <div className="p-6">
        <span className="font-display text-2xl font-black text-[#F8FAFC] tracking-tighter">LinguaVerse</span>
      </div>
      
      {/* Profile Info */}
      <div className="px-6 py-4 flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
          <img 
            className="w-full h-full object-cover" 
            src={userMeta.avatar_url} 
            alt={userMeta.full_name} 
          />
        </div>
        <div>
          <h3 className="font-display text-[15px] font-bold text-[#F8FAFC]">{userMeta.full_name}</h3>
          <p className="font-mono text-[10px] text-[#94A3B8] uppercase tracking-wider">Level {userMeta.level_polyglot || 1} Polyglot</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-grow flex flex-col gap-1 px-4">
        <NavLink 
          to="/dashboard"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-[#00e3fd]/10 text-[#00daf3] border-r-4 border-[#006875]' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>dashboard</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/journey"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-[#00e3fd]/10 text-[#00daf3] border-r-4 border-[#006875]' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>route</span>
          <span>Journey</span>
        </NavLink>

        <NavLink 
          to="/vocabulary"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-[#00e3fd]/10 text-[#00daf3] border-r-4 border-[#006875]' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>menu_book</span>
          <span>Vocabulary</span>
        </NavLink>

        <NavLink 
          to="/achievements"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-[#00e3fd]/10 text-[#00daf3] border-r-4 border-[#006875]' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
          <span>Achievements</span>
        </NavLink>

        <NavLink 
          to="/community"
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-[#00e3fd]/10 text-[#00daf3] border-r-4 border-[#006875]' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>forum</span>
          <span>Community</span>
        </NavLink>

        {userMeta.role === 'admin' && (
          <NavLink 
            to="/admin"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                isActive 
                  ? 'bg-amber-500/10 text-amber-400 border-r-4 border-amber-500' 
                  : 'text-[#94A3B8] hover:text-amber-400 hover:bg-slate-800/40 hover:translate-x-1'
              }`
            }
          >
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 0" }}>admin_panel_settings</span>
            <span>Admin Control</span>
          </NavLink>
        )}
      </nav>

      {/* Promo Box */}
      <div className="px-6 mb-6 mt-8">
        <div className="p-4 bg-gradient-to-br from-[#06B6D4] to-[#4F46E5] rounded-xl text-center shadow-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <p className="text-white font-display text-sm font-semibold mb-3">Master faster.</p>
          <button className="w-full bg-[#0A1128]/80 text-[#F8FAFC] hover:bg-[#0A1128] py-2 rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto p-6 border-t border-[#1E293B] flex flex-col gap-2">
        <a href="#" className="flex items-center gap-3 px-4 py-2 text-[#94A3B8] hover:text-[#F8FAFC] font-mono text-[10px] uppercase tracking-wider">
          <span class="material-symbols-outlined text-[18px]">help</span> Help Center
        </a>
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2 text-[#94A3B8] hover:text-red-400 font-mono text-[10px] uppercase tracking-wider text-left w-full"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span> Logout
        </button>
      </div>
    </aside>
  );
}
