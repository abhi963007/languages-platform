import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Vocabulary() {
  const { currentCourse } = useApp();
  const navigate = useNavigate();

  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCount, setReviewCount] = useState(12);

  // Vocabulary dataset based on selected course
  const vocabList = currentCourse?.vocabulary || [
    { word: "L'Éphémère", type: "French • Noun", translation: "Ephemeral / Short-lived", example: "La beauté des fleurs de cerisier réside dans leur nature éphémère.", exampleTranslation: "The beauty of cherry blossoms lies in their ephemeral nature." },
    { word: "La Solitude", type: "French • Noun", translation: "Solitude / Loneliness", example: "Il apprécie la solitude des montagnes.", exampleTranslation: "He appreciates the solitude of the mountains." }
  ];

  const currentCard = vocabList[cardIndex % vocabList.length];

  const handleFlip = () => {
    setIsFlipped(true);
  };

  const handleRate = (rating) => {
    setIsFlipped(false);
    setTimeout(() => {
      setCardIndex(prev => prev + 1);
      setReviewCount(prev => Math.max(0, prev - 1));
    }, 300); // Wait for card to un-flip first before changing data
  };

  useEffect(() => {
    // Keyboard listener
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (isFlipped) {
        if (e.code === 'Digit1' || e.code === 'Numpad1') handleRate('again');
        else if (e.code === 'Digit2' || e.code === 'Numpad2') handleRate('hard');
        else if (e.code === 'Digit3' || e.code === 'Numpad3') handleRate('good');
        else if (e.code === 'Digit4' || e.code === 'Numpad4') handleRate('easy');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, cardIndex]);

  return (
    <div className="flex-grow bg-[#0A1128] text-[#F8FAFC] min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-[72px] pb-16">
      
      {/* Glow meshes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#4F46E5]/5 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#06B6D4]/5 blur-[120px]"></div>
      </div>

      {/* Header bar */}
      <header className="absolute top-[72px] w-full px-6 py-6 flex items-center justify-between z-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors group font-mono text-xs uppercase tracking-wider font-bold"
        >
          <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">arrow_back</span>
          <span>Exit Session</span>
        </button>

        <div className="flex items-center gap-3 bg-[#151E32]/50 border border-[#1E293B] rounded-full px-4 py-2 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
          <span className="text-sm font-medium text-[#94A3B8] font-mono uppercase tracking-wider">
            <span className="text-white font-display font-bold">{reviewCount}</span> / 40 Reviews
          </span>
        </div>
      </header>

      {/* Main Flashcard section */}
      <main className="w-full max-w-md px-4 flex flex-col items-center z-10 relative">
        
        {/* Helper guide */}
        <div className={`mb-8 text-center transition-opacity duration-300 ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-[#94A3B8] text-xs font-mono uppercase tracking-widest flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">tap_and_play</span>
            <span>Click card or Press Space to Reveal</span>
          </p>
        </div>

        {/* Card Stage */}
        <div 
          onClick={handleFlip}
          className="w-full h-[450px] perspective-1000 mb-8 cursor-pointer group"
        >
          <div 
            className={`w-full h-full relative transform-style-3d transition-all duration-500 ease-in-out ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#151E32] border border-[#1E293B] rounded-2xl flex flex-col items-center justify-center p-8 shadow-[0_0_30px_rgba(5,183,214,0.1)]">
              <div className="absolute top-6 right-6 flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
              </div>
              <span className="text-[#94A3B8] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                {currentCard.type || `${currentCourse.title} • Vocabulary`}
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white text-center break-words leading-tight px-4">
                {currentCard.word}
              </h2>
              <div className="absolute bottom-6 flex items-center justify-center w-full">
                <span className="material-symbols-outlined text-[#94A3B8]/30 text-3xl group-hover:text-[#06B6D4]/50 transition-colors">flip_camera_android</span>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-[#151E32] border border-[#06B6D4]/30 rounded-2xl flex flex-col items-center justify-center p-8 rotate-y-180 shadow-[0_0_40px_rgba(5,183,214,0.15)]">
              <div className="flex-1 flex flex-col items-center justify-center w-full">
                <span className="text-[#06B6D4] text-xs font-mono font-bold tracking-widest uppercase mb-3">Translation</span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-8">
                  {currentCard.translation}
                </h3>
                <div className="w-full h-px bg-[#1E293B] mb-8"></div>
                
                <div className="w-full space-y-4 text-left">
                  <span className="text-[#94A3B8] text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px]">format_quote</span>
                    <span>Example Usage</span>
                  </span>
                  <p className="text-[#94A3B8] text-base leading-relaxed italic border-l-2 border-[#4F46E5] pl-4">
                    "{currentCard.example}"
                  </p>
                  <p className="text-[#94A3B8]/70 text-sm pl-4 leading-relaxed">
                    {currentCard.exampleTranslation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Buttons */}
        <div className={`w-full flex gap-3 transition-all duration-300 ${
          isFlipped ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <button 
            onClick={(e) => { e.stopPropagation(); handleRate('again'); }}
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-[#151E32] border border-[#1E293B] hover:border-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-xl transition-all group relative"
          >
            <span className="text-white font-display text-sm font-semibold mb-1">Again</span>
            <span className="text-[#94A3B8] text-[10px] font-mono font-semibold uppercase tracking-wider">&lt; 1m</span>
            <div className="absolute -top-3 right-2 w-5 h-5 rounded bg-[#0A1128] border border-[#1E293B] flex items-center justify-center text-[10px] text-[#94A3B8] group-hover:text-white group-hover:border-[#4F46E5] transition-colors">1</div>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); handleRate('hard'); }}
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-[#151E32] border border-[#1E293B] hover:border-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-xl transition-all group relative"
          >
            <span className="text-white font-display text-sm font-semibold mb-1">Hard</span>
            <span className="text-[#94A3B8] text-[10px] font-mono font-semibold uppercase tracking-wider">6m</span>
            <div className="absolute -top-3 right-2 w-5 h-5 rounded bg-[#0A1128] border border-[#1E293B] flex items-center justify-center text-[10px] text-[#94A3B8] group-hover:text-white group-hover:border-[#4F46E5] transition-colors">2</div>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleRate('good'); }}
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-[#06B6D4]/10 border border-[#06B6D4] text-[#06B6D4] rounded-xl hover:bg-[#06B6D4]/20 transition-all group relative shadow-[0_0_15px_rgba(5,183,214,0.15)]"
          >
            <span className="font-display text-sm font-bold mb-1">Good</span>
            <span className="opacity-80 text-[10px] font-mono font-semibold uppercase tracking-wider">10m</span>
            <div className="absolute -top-3 right-2 w-5 h-5 rounded bg-[#0A1128] border border-[#06B6D4] flex items-center justify-center text-[10px] text-[#06B6D4] transition-colors">3</div>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handleRate('easy'); }}
            className="flex-1 flex flex-col items-center justify-center py-3 px-2 bg-[#151E32] border border-[#1E293B] hover:border-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-xl transition-all group relative"
          >
            <span className="text-white font-display text-sm font-semibold mb-1">Easy</span>
            <span className="text-[#94A3B8] text-[10px] font-mono font-semibold uppercase tracking-wider">4d</span>
            <div className="absolute -top-3 right-2 w-5 h-5 rounded bg-[#0A1128] border border-[#1E293B] flex items-center justify-center text-[10px] text-[#94A3B8] group-hover:text-white group-hover:border-[#4F46E5] transition-colors">4</div>
          </button>
        </div>
      </main>
    </div>
  );
}
