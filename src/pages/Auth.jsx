import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const { login, signup, courses } = useApp();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [prefLang, setPrefLang] = useState('kodava');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        const { error: signUpError } = await signup(email, password, fullName, prefLang);
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await login(email, password);
        if (signInError) throw signInError;
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0A1128] px-4">
      {/* Dynamic atmospheric backdrops */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-[#4F46E5]/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#06B6D4]/10 blur-[150px] pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-2xl relative z-10 border border-slate-800 bg-[#151E32]/70 backdrop-blur-xl shadow-2xl">
        <div className="text-center mb-8">
          <span className="font-display text-3xl font-black text-[#F8FAFC] tracking-tighter">LinguaVerse</span>
          <p className="text-xs font-mono uppercase tracking-widest text-[#06B6D4] mt-2">
            {isSignUp ? 'Forge a new path' : 'Resume your journey'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5 font-bold">Full Name</label>
              <input 
                type="text" 
                required 
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                className="w-full bg-[#0A1128] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
                placeholder="Lukas Vance"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5 font-bold">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[#0A1128] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5 font-bold">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-[#0A1128] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
              placeholder="••••••••"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-1.5 font-bold">Primary Language Pathway</label>
              <select 
                value={prefLang}
                onChange={e => setPrefLang(e.target.value)}
                className="w-full bg-[#0A1128] border border-[#1E293B] rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all"
              >
                {courses.map(course => (
                  <option key={course.id} value={course.id}>{course.title}</option>
                ))}
              </select>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-[#06B6D4] text-[#0A1128] font-display font-semibold tracking-wide hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(5,183,214,0.4)] transition-all uppercase text-sm rounded-lg"
          >
            {loading ? 'Processing...' : isSignUp ? 'Begin Journey' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#1E293B] pt-6">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] hover:text-[#06B6D4] transition-colors"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
