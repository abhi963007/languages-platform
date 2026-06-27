import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Community() {
  const { currentCourse, community, postChatMessage, addChatReaction, addChatReply } = useApp();
  const [activeTab, setActiveTab] = useState('chat'); // chat, qa, announcements
  const [inputText, setInputText] = useState('');
  const [replyTexts, setReplyTexts] = useState({}); // { messageId: text }
  const [activeReplyThreadId, setActiveReplyThreadId] = useState(null);

  if (!currentCourse) return null;

  const messages = community[currentCourse.id] || [];

  const handlePost = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    postChatMessage(currentCourse.id, inputText.trim());
    setInputText('');
  };

  const handleReplyPost = (e, msgId) => {
    e.preventDefault();
    const text = replyTexts[msgId] || '';
    if (!text.trim()) return;
    addChatReply(currentCourse.id, msgId, text.trim());
    setReplyTexts(prev => ({ ...prev, [msgId]: '' }));
  };

  return (
    <div className="flex-1 bg-[#0A1128] text-white min-h-screen flex flex-col pt-[72px]">
      
      {/* Community Banner */}
      <div className="bg-[#151E32] border-b border-[#1E293B] px-8 py-6 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider border border-[#06B6D4]/20">COMMUNITY SPACE</span>
            <span className="text-xs text-[#94A3B8]">•</span>
            <span className="text-xs text-[#94A3B8] font-semibold uppercase font-mono tracking-wider">{currentCourse.title} Board</span>
          </div>
          <h1 className="font-display text-2xl font-black text-white">
            {currentCourse.title} Learners Circle
          </h1>
        </div>

        {/* Channel Navigation Switcher */}
        <div className="flex bg-[#0A1128] border border-[#1E293B] p-1 rounded-lg self-start">
          <button 
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'chat' ? 'bg-[#06B6D4] text-[#0A1128]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Group Chat
          </button>
          <button 
            onClick={() => setActiveTab('qa')}
            className={`px-4 py-2 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'qa' ? 'bg-[#06B6D4] text-[#0A1128]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Q&amp;A Forums
          </button>
          <button 
            onClick={() => setActiveTab('announcements')}
            className={`px-4 py-2 rounded-md font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${
              activeTab === 'announcements' ? 'bg-[#06B6D4] text-[#0A1128]' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Announcements
          </button>
        </div>
      </div>

      {/* Main chat window split screen */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* Chat Feed */}
        <div className="flex-grow flex flex-col justify-between overflow-y-auto p-6 min-w-0">
          <div className="space-y-6 flex-grow overflow-y-auto pb-6">
            
            {activeTab === 'announcements' ? (
              <div className="space-y-4">
                <div className="bg-[#4F46E5]/10 border border-[#4F46E5]/30 rounded-2xl p-6 relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="material-symbols-outlined text-amber-400">campaign</span>
                    <span className="font-mono text-xs text-[#06B6D4] uppercase font-bold tracking-wider">Instructor Broadcast</span>
                  </div>
                  <h4 className="font-display font-bold text-lg mb-2">Welcome to {currentCourse.title}!</h4>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    This community space serves as your direct linkage with classmates and instructors. Interact using comments, reply threads, and emoticons! Keep discussions focused on learning objectives.
                  </p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#94A3B8] py-20">
                <span className="material-symbols-outlined text-4xl mb-4">forum</span>
                <p className="font-mono text-xs uppercase tracking-wider">No posts here yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map(msg => (
                <div key={msg.id} className="bg-[#151E32] border border-[#1E293B] rounded-2xl p-5 shadow-sm space-y-4 max-w-3xl">
                  
                  {/* Message Header */}
                  <div className="flex items-center justify-between border-b border-[#1E293B]/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center font-display font-bold text-[#06B6D4] text-sm">
                        {msg.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display text-sm font-bold text-white">{msg.user}</span>
                          <span className="bg-slate-800 text-slate-400 border border-slate-700/50 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">{msg.level}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#94A3B8] block mt-0.5">{msg.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Text */}
                  <p className="text-sm text-[#F8FAFC] leading-relaxed font-sans pl-1">
                    {msg.text}
                  </p>

                  {/* Emoji Reactions */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {msg.reactions?.map(reaction => (
                      <button
                        key={reaction.emoji}
                        onClick={() => addChatReaction(currentCourse.id, msg.id, reaction.emoji)}
                        className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/50 rounded-full px-3 py-1 flex items-center gap-1.5 transition-colors text-xs"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="font-mono font-bold text-[#94A3B8]">{reaction.count}</span>
                      </button>
                    ))}
                    
                    {/* Add Reaction Button */}
                    <button 
                      onClick={() => addChatReaction(currentCourse.id, msg.id, '👍')}
                      className="bg-slate-800/40 hover:bg-slate-800 border border-slate-700/30 text-[#94A3B8] hover:text-white rounded-full px-2.5 py-1 flex items-center transition-colors text-xs"
                    >
                      <span className="material-symbols-outlined text-[15px]">add_reaction</span>
                    </button>
                  </div>

                  {/* Reply timeline threads */}
                  {msg.replies?.length > 0 && (
                    <div className="pl-6 border-l border-[#1E293B] mt-4 space-y-3">
                      {msg.replies.map(reply => (
                        <div key={reply.id} className="bg-[#0A1128]/40 border border-[#1E293B]/40 rounded-xl p-3.5 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-display text-xs font-bold text-white">{reply.user}</span>
                            <span className="text-[9px] font-mono text-[#94A3B8]">{reply.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline Thread Reply Box */}
                  <div className="pt-2">
                    {activeReplyThreadId === msg.id ? (
                      <form onSubmit={(e) => handleReplyPost(e, msg.id)} className="flex items-center gap-2 mt-2 pl-6">
                        <input
                          type="text"
                          required
                          value={replyTexts[msg.id] || ''}
                          onChange={(e) => setReplyTexts(prev => ({ ...prev, [msg.id]: e.target.value }))}
                          placeholder="Type reply..."
                          className="flex-grow bg-[#0A1128] border border-[#1E293B] rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#06B6D4]"
                        />
                        <button type="submit" className="bg-[#06B6D4] text-[#0A1128] font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-2 rounded-lg hover:scale-105 active:scale-95 transition-all">Reply</button>
                        <button type="button" onClick={() => setActiveReplyThreadId(null)} className="text-xs text-[#94A3B8] hover:text-white px-2">Cancel</button>
                      </form>
                    ) : (
                      <button
                        onClick={() => setActiveReplyThreadId(msg.id)}
                        className="text-xs text-[#06B6D4] hover:underline font-mono uppercase tracking-wider font-bold pl-1 flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[15px]">reply</span>
                        <span>Reply to thread</span>
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Posting field */}
          {activeTab !== 'announcements' && (
            <form onSubmit={handlePost} className="border-t border-[#1E293B] pt-4 flex gap-4 bg-[#0A1128] sticky bottom-0 shrink-0">
              <input
                type="text"
                required
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                placeholder="Share learning progress or ask a question (@username support)..."
                className="flex-1 bg-[#151E32] border border-[#1E293B] rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#06B6D4] transition-all placeholder:text-[#94A3B8]/60"
              />
              <button 
                type="submit"
                className="px-6 bg-[#06B6D4] text-[#0A1128] rounded-xl font-display font-semibold hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
              >
                <span className="material-symbols-outlined font-bold text-xl">send</span>
              </button>
            </form>
          )}
        </div>

        {/* Channels sidebar layout (Right-hand menu) */}
        <aside className="hidden xl:flex flex-col w-72 border-l border-[#1E293B] bg-[#151E32]/30 p-6 space-y-6 overflow-y-auto shrink-0">
          <div>
            <h4 className="font-mono text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest border-b border-[#1E293B] pb-2 mb-4">Channels</h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-3">
                <span className="material-symbols-outlined text-sm">tag</span>
                <span># General-Discussion</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800/40 text-[#94A3B8] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 transition-colors">
                <span className="material-symbols-outlined text-sm">help_outline</span>
                <span># Vocabulary-Q-A</span>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-slate-800/40 text-[#94A3B8] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 transition-colors">
                <span className="material-symbols-outlined text-sm">school</span>
                <span># Homework-Help</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t border-[#1E293B]/60">
            <h4 className="font-mono text-[10px] font-bold text-[#06B6D4] uppercase tracking-widest border-b border-[#1E293B] pb-2 mb-4">Active Members</h4>
            <div className="space-y-3">
              {['Prof. Appanna', 'Sophie Dubois', 'Rohan Somanna', 'Neela K.'].map((mem, i) => (
                <div key={mem} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#06B6D4] animate-pulse"></div>
                  <span className="text-xs font-display font-semibold text-[#94A3B8]">{mem}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
