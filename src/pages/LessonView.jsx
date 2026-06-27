import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';

export default function LessonView() {
  const { currentCourse, xp } = useApp();
  const { courseId, unitId, lessonId } = useParams();
  const navigate = useNavigate();

  // Selection states for Match the Word
  const [selectedKodava, setSelectedKodava] = useState(null);
  const [selectedEnglish, setSelectedEnglish] = useState(null);
  const [matches, setMatches] = useState({}); // { kodavaWord: true }
  const [errors, setErrors] = useState({}); // { word: true }
  
  // Audio state
  const [audioPlaying, setAudioPlaying] = useState(false);

  useEffect(() => {
    // Fade in reveal
    const el = document.getElementById('lesson-view');
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

  if (!currentCourse) return null;

  const currentUnit = currentCourse.units?.find(u => u.id === unitId) || currentCourse.units?.[0];
  const currentLesson = currentUnit?.lessons?.find(l => l.id === lessonId) || currentUnit?.lessons?.[0];

  // Match the word data helper
  const wordPairs = [
    { kodava: "Enne", english: "Me" },
    { kodava: "Pedha", english: "Name" },
    { kodava: "Sowkhyame", english: "Are you well?" }
  ];

  const handleWordSelect = (word, type) => {
    if (type === 'kodava') {
      if (matches[word]) return;
      setSelectedKodava(word);
      checkMatch(word, selectedEnglish);
    } else {
      if (Object.values(matches).includes(word)) return;
      setSelectedEnglish(word);
      checkMatch(selectedKodava, word);
    }
  };

  const checkMatch = (kodavaWord, englishWord) => {
    if (!kodavaWord || !englishWord) return;

    const pair = wordPairs.find(p => p.kodava === kodavaWord);
    const isCorrect = pair && pair.english === englishWord;

    if (isCorrect) {
      setTimeout(() => {
        setMatches(prev => ({ ...prev, [kodavaWord]: englishWord }));
        setSelectedKodava(null);
        setSelectedEnglish(null);
      }, 300);
    } else {
      setTimeout(() => {
        setErrors({ [kodavaWord]: true, [englishWord]: true });
        
        // Shake feedback
        setTimeout(() => {
          setErrors({});
          setSelectedKodava(null);
          setSelectedEnglish(null);
        }, 500);
      }, 300);
    }
  };

  const playAudio = () => {
    setAudioPlaying(true);
    // Simulate audio length
    setTimeout(() => {
      setAudioPlaying(false);
    }, 1500);
  };

  return (
    <div id="lesson-view" className="flex-grow bg-[#f9f9ff] text-[#111c2d] min-h-screen overflow-x-hidden pt-[72px]">
      <main className="max-w-6xl mx-auto px-6 py-10">
        
        {/* Header navigation bar */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E2E8F0] pb-6">
          <div>
            <div className="flex items-center gap-2 text-[#43474f] text-xs font-mono uppercase tracking-wider mb-2">
              <span>{currentUnit?.title}</span>
              <span>•</span>
              <span className="text-[#006875]">Active Lesson</span>
            </div>
            <h1 className="font-display text-3xl font-extrabold text-[#001430] tracking-tight">
              {currentLesson?.title || 'Learning Lesson'}
            </h1>
            <div className="mt-4 w-64 bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#00daf3] h-full w-[35%] rounded-full shadow-[0_0_8px_rgba(0,227,253,0.5)]"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 glass-panel border border-[#E2E8F0] rounded-full flex items-center gap-3 bg-white/70">
              <span className="material-symbols-outlined text-[#FF2E63]" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              <span className="font-mono text-sm font-bold text-[#001430]">{xp} XP</span>
            </div>
            <button 
              onClick={() => navigate('/journey')}
              className="p-3 bg-white hover:bg-slate-100 border border-[#E2E8F0] rounded-full transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
        </header>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main activity stage (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Vocab Card with audio */}
            <section className="glass-panel border border-[#E2E8F0] bg-white/60 backdrop-blur p-8 md:p-12 rounded-2xl relative overflow-hidden group shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e3fd]/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex-1 text-center md:text-left">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-[#006875] mb-3 block uppercase">Phrase of the Day</span>
                  <h2 className="font-display text-4xl md:text-5xl font-extrabold text-[#001430] mb-2">Namaskara</h2>
                  <p className="font-sans text-lg text-[#006875] italic mb-6">"Hello / Greetings"</p>
                  <p className="font-sans text-sm text-[#43474f] leading-relaxed max-w-md">
                    The traditional way to greet someone in Kodava. Used at any time of day to show respect and warmth.
                  </p>
                </div>
                
                <div className="flex-shrink-0 relative">
                  <button 
                    onClick={playAudio}
                    className="w-24 h-24 rounded-full bg-[#00e3fd] hover:bg-[#00daf3] text-[#001430] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all group"
                  >
                    <span className="material-symbols-outlined text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {audioPlaying ? 'volume_up' : 'play_arrow'}
                    </span>
                    {audioPlaying && (
                      <svg className="absolute w-24 h-24 -rotate-90 pointer-events-none">
                        <circle className="animate-dash" cx="48" cy="48" fill="none" r="46" stroke="currentColor" strokeDasharray="290" strokeDashoffset="290" strokeWidth="2"></circle>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </section>

            {/* Match the word exercise */}
            <section className="pt-6">
              <header className="mb-6 flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                <h3 className="font-display text-xl font-bold text-[#001430]">Match the Word</h3>
                <span className="font-mono text-[10px] text-[#43474f] uppercase tracking-wider">Tap to pair Kodava with English</span>
              </header>

              <div className="grid grid-cols-2 gap-6">
                {/* Kodava list */}
                <div className="space-y-3">
                  {wordPairs.map(pair => {
                    const isMatched = !!matches[pair.kodava];
                    const isSelected = selectedKodava === pair.kodava;
                    const isErroneous = !!errors[pair.kodava];

                    return (
                      <button
                        key={pair.kodava}
                        disabled={isMatched}
                        onClick={() => handleWordSelect(pair.kodava, 'kodava')}
                        className={`w-full p-5 text-left border rounded-xl font-display text-md font-bold transition-all shadow-sm flex items-center justify-between ${
                          isMatched 
                            ? 'bg-[#00e3fd]/10 border-[#00daf3] text-[#006875] opacity-50' 
                            : isErroneous 
                              ? 'bg-red-500/10 border-red-500 text-red-500 animate-shake' 
                              : isSelected 
                                ? 'bg-[#f0f3ff] border-[#00daf3] text-[#001430] translate-y-[-2px]' 
                                : 'bg-white border-[#E2E8F0] text-[#001430] hover:border-[#00e3fd]'
                        }`}
                      >
                        <span>{pair.kodava}</span>
                        {isMatched && (
                          <span className="material-symbols-outlined text-sm text-[#006875]">check_circle</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* English list */}
                <div className="space-y-3">
                  {/* Shuffle English words statically for matches */}
                  {["Are you well?", "Name", "Me"].map(englishWord => {
                    const pair = wordPairs.find(p => p.english === englishWord);
                    const isMatched = Object.values(matches).includes(englishWord);
                    const isSelected = selectedEnglish === englishWord;
                    const isErroneous = !!errors[englishWord];

                    return (
                      <button
                        key={englishWord}
                        disabled={isMatched}
                        onClick={() => handleWordSelect(englishWord, 'english')}
                        className={`w-full p-5 text-left border rounded-xl font-display text-md font-bold transition-all shadow-sm flex items-center justify-between ${
                          isMatched 
                            ? 'bg-[#00e3fd]/10 border-[#00daf3] text-[#006875] opacity-50' 
                            : isErroneous 
                              ? 'bg-red-500/10 border-red-500 text-red-500 animate-shake' 
                              : isSelected 
                                ? 'bg-[#f0f3ff] border-[#00daf3] text-[#001430] translate-y-[-2px]' 
                                : 'bg-white border-[#E2E8F0] text-[#001430] hover:border-[#00e3fd]'
                        }`}
                      >
                        <span>{englishWord}</span>
                        {isMatched && (
                          <span className="material-symbols-outlined text-sm text-[#006875]">check_circle</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar panel (4 cols) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Cultural Context Note Card */}
            <div className="bg-[#001430] text-white p-8 rounded-2xl relative overflow-hidden shadow-lg min-h-[250px] flex flex-col justify-end">
              <div 
                className="absolute inset-0 opacity-20 mix-blend-overlay bg-cover bg-center" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAd3-sM0ua8jj0HSgfzeFbA3Y0bvm0RymUmUWLV-na-TnJ86UnE4uWp4caPmAhM_mXG1HirxlWB8D9lEeM4YL7nzJJfr8OZlxv3lQd-XlfybiwDI2WdQgUElgT191gqIx6W8M_BCmeOBe8MCZYhhiwCD9SyhXt7yjViMIQ3w5W01wzDTwUxfZfFNKdDM1DToHx317V8TBXWXwAIcOXXGvV0OcQw1mzDydn9yyDCklLVbKi2y5nTa386zW90vWl-HtDvmoSSZ5TdXK4')` }}
              ></div>
              <div className="relative z-10">
                <span className="font-mono text-[9px] font-bold text-[#00e3fd] mb-3 block uppercase tracking-widest">Cultural Note</span>
                <h4 className="font-display text-xl font-bold mb-3">The Coorg Greeting</h4>
                <p className="font-sans text-sm text-white/80 leading-relaxed mb-6">
                  {currentCourse.detailedDescription || "In the highlands of Coorg, greetings denote deep respect. Let's explore greetings and harvest vocabularies!"}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-[#00e3fd] font-mono text-[10px] font-bold uppercase tracking-wider hover:gap-3 transition-all">
                  Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </a>
              </div>
            </div>

            {/* Statistics and Gamification */}
            <div className="glass-panel border border-[#E2E8F0] bg-white p-8 rounded-2xl shadow-sm">
              <h4 className="font-mono text-xs font-bold text-[#43474f] mb-6 uppercase tracking-widest">Mastery Level</h4>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-sm font-semibold">Pronunciation</span>
                    <span className="font-display font-extrabold text-[#006875]">88%</span>
                  </div>
                  <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00daf3] h-full w-[88%] rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-sans text-sm font-semibold">Retention</span>
                    <span className="font-display font-extrabold text-[#006875]">62%</span>
                  </div>
                  <div className="w-full bg-[#e7eeff] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#00daf3] h-full w-[62%] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center text-[#FFD700] border border-[#FFD700]/30 shadow-sm">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-[#43474f] font-bold uppercase tracking-wider">Next Reward</p>
                    <p className="font-sans text-sm font-bold text-[#001430]">Kodava Script Unlocked</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom continue action dock */}
        <footer className="mt-12 flex justify-end">
          <button 
            onClick={() => navigate(`/lesson-player/${courseId}/${unitId}/${lessonId}`)}
            className="flex items-center gap-3 px-10 py-5 bg-[#001430] hover:bg-[#001430]/90 text-white rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl group"
          >
            <span className="font-display text-base font-bold">Continue Lesson</span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1.5">arrow_forward</span>
          </button>
        </footer>
      </main>
    </div>
  );
}
