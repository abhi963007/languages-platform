import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function AdminSidebar() {
  const { user, logout } = useApp();

  if (!user) return null;

  const userMeta = user.user_metadata || {};

  return (
    <aside className="hidden lg:flex flex-col h-screen w-64 bg-[#0A1128] border-r border-[#1E293B] sticky top-0 shrink-0 z-40">
      <div className="p-6 flex flex-col gap-2">
        <span className="font-display text-2xl font-black text-[#F8FAFC] tracking-tighter">LinguaVerse</span>
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-center py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-bold">ADMIN PANEL</span>
      </div>

      {/* Nav Links */}
      <nav className="flex-grow flex flex-col gap-1 px-4 mt-6">
        <NavLink 
          to="/admin"
          end
          className={({ isActive }) => 
            `flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive 
                ? 'bg-amber-500/10 text-amber-400 border-r-4 border-amber-500' 
                : 'text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1'
            }`
          }
        >
          <span className="material-symbols-outlined text-[20px]">curriculum</span>
          <span>Curriculum</span>
        </NavLink>

        <NavLink 
          to="/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-slate-800/40 hover:translate-x-1 mt-4 border border-dashed border-[#1E293B]"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Student View</span>
        </NavLink>
      </nav>

      {/* Profile summary */}
      <div className="mt-auto p-6 border-t border-[#1E293B]">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 border border-slate-700">
            <img 
              className="w-full h-full object-cover" 
              src={userMeta.avatar_url} 
              alt={userMeta.full_name} 
            />
          </div>
          <div>
            <p className="font-display text-sm font-bold text-[#F8FAFC]">{userMeta.full_name}</p>
            <p className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">Super Administrator</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <NavLink to="/dashboard" className="flex items-center gap-3 text-[#94A3B8] hover:text-[#F8FAFC] font-mono text-[10px] uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">help</span> Help Center
          </NavLink>
          <button 
            onClick={logout} 
            className="flex items-center gap-3 text-[#94A3B8] hover:text-red-400 font-mono text-[10px] uppercase tracking-wider text-left w-full"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span> Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
