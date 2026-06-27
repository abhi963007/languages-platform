import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function LessonPlayer() {
  const { currentCourse, completeLesson } = useApp();
  const { courseId, unitId, lessonId } = useParams();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);
  const [isPlayingWaveform, setIsPlayingWaveform] = useState(false);
  const [shakeOption, setShakeOption] = useState(null); // id of option to shake

  // Quiz Options Seed
  const quizOptions = [
    { id: 'opt-1', text: "L'homme marche sous la pluie.", isCorrect: false },
    { id: 'opt-2', text: "La femme court dans le parc.", isCorrect: true }, // Correct option
    { id: 'opt-3', text: "Le chien dort sur le canapé.", isCorrect: false }
  ];

  const handleOptionClick = (option) => {
    if (isEvaluated) return;
    setSelectedOption(option.id);
  };

  const checkAnswer = () => {
    if (!selectedOption || isEvaluated) return;

    const option = quizOptions.find(o => o.id === selectedOption);
    const correct = option.isCorrect;
    
    setIsCorrectAnswer(correct);
    setIsEvaluated(true);

    if (correct) {
      // Trigger canvas-confetti celebratory effects
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06B6D4', '#4F46E5', '#ffffff']
      });
    } else {
      // Trigger shake animation on selection
      setShakeOption(selectedOption);
      setTimeout(() => {
        setShakeOption(null);
      }, 500);
    }
  };

  const handleContinue = () => {
    if (!isCorrectAnswer) {
      // If incorrect, let them retry
      setSelectedOption(null);
      setIsEvaluated(false);
      setIsCorrectAnswer(null);
      return;
    }

    // Complete lesson, update context state, and go back to Journey
    completeLesson(courseId, unitId, lessonId);
    navigate('/journey');
  };

  const playWaveform = () => {
    setIsPlayingWaveform(true);
    setTimeout(() => {
      setIsPlayingWaveform(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#0f2023] text-white z-50 overflow-y-auto flex flex-col justify-between font-sans">
      
      {/* Cinematic radial glow background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Top Fixed Progress Bar */}
      <header className="fixed top-0 left-0 w-full z-50">
        <div className="w-full h-1.5 bg-white/10">
          <div 
            className="h-full bg-[#06B6D4] transition-all duration-700 ease-out shadow-[0_0_12px_rgba(5,183,214,0.6)]" 
            style={{ width: isCorrectAnswer ? '100%' : '50%' }}
          ></div>
        </div>
      </header>

      {/* Minimal Header Nav */}
      <div className="p-6 relative z-10 flex justify-between items-center">
        <button 
          onClick={() => navigate(`/lesson/${courseId}/${unitId}/${lessonId}`)}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <span className="font-mono text-[10px] font-bold text-white/50 uppercase tracking-widest">Focused Mode</span>
      </div>

      {/* Main Content Stage */}
      <main className="relative z-10 w-full max-w-[800px] mx-auto px-6 py-8 flex-grow flex flex-col justify-center items-center">
        
        {/* Prompt Header */}
        <div className="text-center mb-10 animate-fadeIn">
          <span className="text-[#06B6D4] font-display font-semibold tracking-widest uppercase text-xs mb-3 block">Section 4 • Listening</span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Identify the correct phrase
          </h1>
        </div>

        {/* Waveform Player */}
        <div 
          onClick={playWaveform}
          className="w-full max-w-lg bg-white/5 border border-white/10 rounded-2xl p-4 mb-12 flex items-center gap-5 group cursor-pointer hover:border-[#06B6D4]/30 transition-colors shadow-xl"
        >
          <button className="w-14 h-14 shrink-0 rounded-full bg-[#06B6D4] flex items-center justify-center shadow-[0_0_24px_rgba(5,183,214,0.3)] group-hover:scale-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[#0f2023] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isPlayingWaveform ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <div className="flex-1 h-12 relative overflow-hidden rounded-md opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-between">
            {/* Waveform Simulator SVG bars */}
            <div className="flex items-end gap-1 h-full w-full py-2">
              {[8,12,18,32,24,14,8,16,28,38,42,22,12,16,28,34,18,12,8,10,16,22,14,6,10,22,38,30,14,8,12,6,10,14,8,4].map((h, i) => (
                <div 
                  key={i} 
                  className={`flex-1 bg-[#06B6D4] rounded-full transition-all duration-300 ${
                    isPlayingWaveform ? 'animate-pulse' : 'opacity-60'
                  }`}
                  style={{ 
                    height: isPlayingWaveform ? `${Math.max(20, Math.min(100, h * 1.8 + Math.random() * 20))}%` : `${h}%`,
                    animationDelay: `${i * 30}ms`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Option List */}
        <div className="w-full max-w-2xl flex flex-col gap-4">
          {quizOptions.map(opt => {
            const isSelected = selectedOption === opt.id;
            const isCorrect = opt.isCorrect;
            const isShaking = shakeOption === opt.id;

            let cardStyle = "bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20";
            let iconName = "radio_button_unchecked";
            let iconStyle = "text-white/0 group-hover:text-white/20";

            if (isEvaluated) {
              if (isSelected) {
                if (isCorrect) {
                  cardStyle = "bg-[#06B6D4]/10 border-[#06B6D4] text-white";
                  iconName = "check_circle";
                  iconStyle = "text-[#06B6D4] text-2xl scale-110";
                } else {
                  cardStyle = "bg-indigo-500/10 border-indigo-500 text-white";
                  iconName = "cancel";
                  iconStyle = "text-indigo-400 text-2xl scale-110";
                }
              } else if (isCorrect) {
                // Dim highlight for correct answer if user got it wrong
                cardStyle = "bg-[#06B6D4]/5 border-[#06B6D4]/30 text-white/80";
              }
            } else if (isSelected) {
              cardStyle = "bg-white/10 border-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]";
              iconName = "radio_button_checked";
              iconStyle = "text-[#06B6D4]";
            }

            return (
              <button
                key={opt.id}
                disabled={isEvaluated}
                onClick={() => handleOptionClick(opt)}
                className={`w-full p-6 rounded-2xl text-left font-display text-lg group transition-all duration-300 relative overflow-hidden flex items-center justify-between border ${cardStyle} ${
                  isShaking ? 'animate-shake' : ''
                }`}
              >
                <span>{opt.text}</span>
                <span className={`material-symbols-outlined transition-all duration-300 ${iconStyle}`} style={{ fontVariationSettings: iconName !== 'radio_button_unchecked' ? "'FILL' 1" : "'FILL' 0" }}>
                  {iconName}
                </span>
              </button>
            );
          })}
        </div>
      </main>

      {/* Floating Bottom Action Dock */}
      <div className="p-6 relative z-10 w-full max-w-[700px] mx-auto mb-6">
        <div className="bg-[#151E32]/80 border border-white/10 backdrop-blur-xl rounded-full h-20 px-8 flex items-center justify-between shadow-2xl">
          
          <button 
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white" 
            title="Report Issue"
          >
            <span className="material-symbols-outlined">flag</span>
          </button>
          
          {isEvaluated ? (
            <button 
              onClick={handleContinue}
              className="h-12 px-8 rounded-full bg-[#06B6D4] hover:bg-[#00daf3] text-[#0f2023] font-display font-semibold tracking-wide hover:shadow-[0_0_24px_rgba(5,183,214,0.4)] transition-all uppercase text-sm"
            >
              {isCorrectAnswer ? 'Continue' : 'Try Again'}
            </button>
          ) : (
            <button 
              disabled={!selectedOption}
              onClick={checkAnswer}
              className={`h-12 px-8 rounded-full font-display font-semibold tracking-wide transition-all uppercase text-sm ${
                selectedOption 
                  ? 'bg-[#06B6D4] text-[#0f2023] hover:shadow-[0_0_24px_rgba(5,183,214,0.4)] cursor-pointer' 
                  : 'bg-white/10 text-white/30 cursor-not-allowed'
              }`}
            >
              Check Answer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
