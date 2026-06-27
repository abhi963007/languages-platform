import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { 
    courses, 
    currentCourseId, 
    selectCourse, 
    addCourseUnit, 
    editUnitStatus,
    addCourseLesson,
    createCourse
  } = useApp();

  const [activeUnitId, setActiveUnitId] = useState(null);
  const [expandedLessonId, setExpandedLessonId] = useState(null);
  
  // Forms states
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLangName, setNewLangName] = useState('');
  const [newLangDesc, setNewLangDesc] = useState('');
  const [showAddLangModal, setShowAddLangModal] = useState(false);

  const selectedCourse = courses.find(c => c.id === currentCourseId) || courses[0];

  useEffect(() => {
    if (selectedCourse?.units?.length > 0 && !activeUnitId) {
      setActiveUnitId(selectedCourse.units[0].id);
    }
  }, [selectedCourse, activeUnitId]);

  const handleAddUnit = (e) => {
    e.preventDefault();
    if (!newUnitTitle.trim()) return;
    addCourseUnit(selectedCourse.id, newUnitTitle.trim());
    setNewUnitTitle('');
  };

  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !activeUnitId) return;
    addCourseLesson(selectedCourse.id, activeUnitId, newLessonTitle.trim());
    setNewLessonTitle('');
  };

  const handleCreateLang = (e) => {
    e.preventDefault();
    if (!newLangName.trim() || !newLangDesc.trim()) return;
    createCourse(newLangName.trim(), newLangName.trim(), newLangDesc.trim());
    setNewLangName('');
    setNewLangDesc('');
    setShowAddLangModal(false);
  };

  const activeUnit = selectedCourse?.units?.find(u => u.id === activeUnitId);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-[#f9f9ff] text-[#111c2d]">
      
      {/* Top Header */}
      <header className="h-20 bg-white/70 backdrop-blur-md border-b border-[#E2E8F0] flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="font-display text-2xl font-black text-[#001430] tracking-tight">Curriculum Manager</h1>
          <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full font-mono text-[9px] font-bold uppercase tracking-wider">Admin Panel</span>
        </div>

        <button 
          onClick={() => setShowAddLangModal(true)}
          className="flex items-center gap-2 bg-[#001430] text-white px-5 py-2.5 rounded-lg hover:bg-[#006875] transition-all font-mono text-xs font-bold uppercase tracking-wider"
        >
          <span className="material-symbols-outlined text-sm font-bold">add</span>
          <span>Create New Language</span>
        </button>
      </header>

      {/* Main panel workspace */}
      <div className="flex-grow flex overflow-hidden min-h-0">
        
        {/* Left column: active languages */}
        <aside className="w-80 border-r border-[#E2E8F0] bg-white p-6 overflow-y-auto shrink-0 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[#001430]">Active Languages</h2>
            <span className="font-mono text-[10px] text-[#43474f] font-bold uppercase tracking-wider">Total: {courses.length}</span>
          </div>

          <div className="space-y-3">
            {courses.map(course => (
              <div
                key={course.id}
                onClick={() => {
                  selectCourse(course.id);
                  setActiveUnitId(null);
                }}
                className={`p-5 rounded-xl transition-all cursor-pointer border ${
                  course.id === currentCourseId
                    ? 'bg-white border-[#006875] shadow-lg border-l-8 border-l-[#006875] translate-x-1'
                    : 'bg-[#f0f3ff]/40 border-[#E2E8F0] hover:border-[#00e3fd]'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-display font-bold text-[#001430]">{course.title}</h3>
                    {course.dialectInfo && (
                      <span className="bg-[#001430] text-[#00daf3] px-2 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider mt-1 inline-block">
                        {course.dialectInfo}
                      </span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-sm text-[#006875]">arrow_forward_ios</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[9px] text-[#43474f]">
                    <span>Completion</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full h-1 bg-[#e7eeff] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006875] rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main edit canvas */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f9f9ff]">
          
          {/* Banner Hero */}
          <div className="relative w-full h-56 overflow-hidden rounded-2xl bg-[#001430] flex items-end p-8 shadow-sm">
            <div 
              className="absolute inset-0 opacity-40 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedCourse.bannerImage || selectedCourse.imageUrl})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#001430] via-[#001430]/60 to-transparent"></div>
            
            <div className="relative z-10 w-full flex justify-between items-end">
              <div>
                <h2 className="font-display text-4xl font-extrabold text-white leading-none">{selectedCourse.title}</h2>
                <p className="font-sans text-sm text-white/70 mt-2 max-w-md line-clamp-2 leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 border border-white hover:bg-white hover:text-[#001430] rounded-lg text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors">Preview Path</button>
                <button className="px-4 py-2 bg-[#00e3fd] text-[#001430] rounded-lg font-mono text-[10px] font-bold uppercase tracking-wider">Edit Metadata</button>
              </div>
            </div>
          </div>

          {/* Unit & Lesson structure container */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Unit navigation left sidebar */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-mono text-xs font-bold text-[#006875] border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
                <span>UNITS</span>
                <span className="material-symbols-outlined text-sm">settings</span>
              </h4>

              <div className="space-y-2">
                {selectedCourse.units?.map(unit => (
                  <button
                    key={unit.id}
                    onClick={() => {
                      setActiveUnitId(unit.id);
                      setExpandedLessonId(null);
                    }}
                    className={`w-full text-left p-4 rounded-xl border font-sans text-sm font-bold flex justify-between items-center transition-all ${
                      unit.id === activeUnitId
                        ? 'bg-white border-[#006875] text-[#006875] shadow-sm border-l-4 border-l-[#006875]'
                        : 'bg-white/40 border-[#E2E8F0] text-[#43474f] hover:border-[#00e3fd]'
                    }`}
                  >
                    <span>{unit.title}</span>
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      unit.status === 'LIVE' ? 'bg-[#00e3fd]/20 text-[#00616d]' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {unit.status}
                    </span>
                  </button>
                ))}
              </div>

              {/* Add Unit form */}
              <form onSubmit={handleAddUnit} className="pt-2">
                <input
                  type="text"
                  required
                  value={newUnitTitle}
                  onChange={e => setNewUnitTitle(e.target.value)}
                  placeholder="New Unit Title..."
                  className="w-full bg-white border border-[#E2E8F0] rounded-lg px-3 py-2 text-xs mb-2 focus:outline-none focus:ring-1 focus:ring-[#006875]"
                />
                <button 
                  type="submit"
                  className="w-full py-2.5 border border-dashed border-[#outline-variant] rounded-lg text-[#43474f] font-mono text-[10px] font-bold uppercase tracking-wider hover:border-[#001430] hover:text-[#001430] transition-colors"
                >
                  + Add New Unit
                </button>
              </form>
            </div>

            {/* Selected unit contents and lessons details */}
            <div className="md:col-span-8 space-y-6">
              {activeUnit ? (
                <div className="glass-panel border border-[#E2E8F0] bg-white p-8 rounded-2xl shadow-sm">
                  
                  <div className="flex justify-between items-start mb-8 border-b border-[#E2E8F0] pb-4">
                    <div>
                      <span className="font-mono text-[9px] font-bold text-[#006875] uppercase tracking-widest block">Unit Settings</span>
                      <h3 className="font-display text-xl font-bold text-[#001430]">{activeUnit.title}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editUnitStatus(selectedCourse.id, activeUnit.id, activeUnit.status === 'LIVE' ? 'DRAFT' : 'LIVE')}
                        className="px-3.5 py-1.5 border border-[#E2E8F0] rounded-lg text-xs font-mono font-semibold hover:bg-slate-100"
                      >
                        Toggle Status
                      </button>
                    </div>
                  </div>

                  {/* Add Lesson form */}
                  <form onSubmit={handleAddLesson} className="flex gap-2 mb-6">
                    <input
                      type="text"
                      required
                      value={newLessonTitle}
                      onChange={e => setNewLessonTitle(e.target.value)}
                      placeholder="Add lesson (e.g. Grammar Drills)..."
                      className="flex-grow bg-white border border-[#E2E8F0] rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006875]"
                    />
                    <button type="submit" className="bg-[#001430] hover:bg-[#006875] text-white px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-colors shrink-0">
                      + Add Lesson
                    </button>
                  </form>

                  {/* Lessons list stack */}
                  <div className="space-y-4">
                    {activeUnit.lessons?.length === 0 ? (
                      <p className="text-center text-xs text-[#94A3B8] font-mono py-6">No lessons added to this unit yet.</p>
                    ) : (
                      activeUnit.lessons?.map((lesson, lIdx) => {
                        const isExpanded = expandedLessonId === lesson.id;
                        return (
                          <div key={lesson.id} className="border border-[#E2E8F0] rounded-xl p-4 shadow-sm bg-[#f9f9ff]">
                            <div 
                              onClick={() => setExpandedLessonId(isExpanded ? null : lesson.id)}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#e7eeff] text-[#001430] rounded-xl flex items-center justify-center font-display font-bold text-sm">
                                  {lIdx + 1}
                                </div>
                                <div>
                                  <h5 className="font-sans font-bold text-sm text-[#001430]">{lesson.title}</h5>
                                  <p className="text-xs text-[#43474f] font-mono">{lesson.activitiesCount || 2} Activities • {lesson.duration || '15 mins'}</p>
                                </div>
                              </div>
                              <span className="material-symbols-outlined text-[#43474f] transition-transform">
                                {isExpanded ? 'expand_less' : 'expand_more'}
                              </span>
                            </div>

                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-2 animate-fadeIn">
                                {lesson.activities?.map((act, aIdx) => (
                                  <div key={act.id} className="flex items-center justify-between p-3.5 bg-white border border-[#E2E8F0] rounded-lg group">
                                    <div className="flex items-center gap-3">
                                      <span className="material-symbols-outlined text-[#006875] text-sm">
                                        {act.type === 'listening' ? 'volume_up' : act.type === 'writing' ? 'edit_note' : 'task_alt'}
                                      </span>
                                      <span className="text-xs font-semibold text-[#001430]">{act.title || `Activity ${aIdx + 1}`}</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <span className="material-symbols-outlined text-xs cursor-pointer hover:text-[#006875]">edit</span>
                                      <span className="material-symbols-outlined text-xs cursor-pointer hover:text-red-500">delete</span>
                                    </div>
                                  </div>
                                ))}

                                <button className="w-full py-2 bg-[#f0f3ff] text-[#006875] hover:bg-[#e7eeff] transition-colors rounded-lg font-mono text-[9px] font-bold uppercase tracking-wider">
                                  + Insert Activity
                                </button>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                </div>
              ) : (
                <p className="text-center font-mono text-xs text-[#94A3B8] py-12 bg-white rounded-2xl border border-[#E2E8F0]">Select or create a unit to manage activities.</p>
              )}
            </div>
          </div>

        </main>
      </div>

      {/* Create New Language Modal overlay */}
      {showAddLangModal && (
        <div className="fixed inset-0 bg-[#0A1128]/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full border border-[#E2E8F0] shadow-2xl relative animate-fadeIn">
            <button 
              onClick={() => setShowAddLangModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-[#43474f]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <h3 className="font-display text-xl font-bold text-[#001430] mb-6">Create New Language Pathway</h3>

            <form onSubmit={handleCreateLang} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#43474f] mb-1.5">Language Name</label>
                <input 
                  type="text" 
                  required
                  value={newLangName}
                  onChange={e => setNewLangName(e.target.value)}
                  className="w-full bg-[#f9f9ff] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006875]"
                  placeholder="e.g. Tamazight"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#43474f] mb-1.5">Description</label>
                <textarea 
                  required
                  rows="3"
                  value={newLangDesc}
                  onChange={e => setNewLangDesc(e.target.value)}
                  className="w-full bg-[#f9f9ff] border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#006875]"
                  placeholder="Path details, origins, history, etc..."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 bg-[#001430] hover:bg-[#006875] text-white rounded-lg font-display font-semibold transition-all uppercase text-xs tracking-wider"
              >
                Create Pathway
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
