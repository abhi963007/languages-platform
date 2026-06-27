import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [community, setCommunity] = useState({});
  const [currentCourseId, setCurrentCourseId] = useState('kodava');
  
  // Stats
  const [xp, setXp] = useState(12400);
  const [streak, setStreak] = useState(242);
  const [wordsLearned, setWordsLearned] = useState(48);

  useEffect(() => {
    const initApp = async () => {
      // 1. Get Auth
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      setUser(currentUser);
      if (currentUser?.user_metadata?.preferred_language) {
        setCurrentCourseId(currentUser.user_metadata.preferred_language);
      }

      // 2. Fetch Database tables (courses, achievements, community)
      const resCourses = await supabase.from('courses').select();
      const resAchievements = await supabase.from('achievements').select();
      const resCommunity = await supabase.from('community').select();

      setCourses(resCourses.data);
      setAchievements(resAchievements.data);
      setCommunity(resCommunity.data);

      setLoading(false);
    };

    initApp();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) {
      setUser(data.user);
      if (data.user.user_metadata?.preferred_language) {
        setCurrentCourseId(data.user.user_metadata.preferred_language);
      }
    }
    setLoading(false);
    return { data, error };
  };

  const signup = async (email, password, fullName, preferredLanguage) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          preferred_language: preferredLanguage,
          role: 'student',
          avatar_url: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(fullName)}`
        }
      }
    });
    if (data?.user) {
      setUser(data.user);
      setCurrentCourseId(preferredLanguage);
    }
    setLoading(false);
    return { data, error };
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setLoading(false);
  };

  const updateProfile = async (metadata) => {
    const { data, error } = await supabase.auth.updateUser({ data: metadata });
    if (data?.user) {
      setUser(data.user);
    }
    return { data, error };
  };

  const selectCourse = (courseId) => {
    setCurrentCourseId(courseId);
    if (user) {
      updateProfile({ preferred_language: courseId });
    }
  };

  const addXP = (amount) => {
    setXp(prev => {
      const nextXp = prev + amount;
      // Check level up (every 2500 XP threshold)
      const currentLevel = Math.floor(prev / 2500) + 1;
      const nextLevel = Math.floor(nextXp / 2500) + 1;
      
      if (nextLevel > currentLevel && user) {
        updateProfile({ level_polyglot: nextLevel });
      }
      return nextXp;
    });
  };

  // Complete a lesson node
  const completeLesson = (courseId, unitId, lessonId) => {
    let xpAwarded = 150;
    
    // Update Courses Progress
    setCourses(prevCourses => {
      const updated = prevCourses.map(course => {
        if (course.id !== courseId) return course;
        
        let completedCount = course.completedLessons;
        const updatedUnits = course.units.map(unit => {
          if (unit.id !== unitId) return unit;
          
          const updatedLessons = unit.lessons.map(lesson => {
            if (lesson.id === lessonId && !lesson.completed) {
              completedCount += 1;
              return { ...lesson, completed: true };
            }
            return lesson;
          });
          return { ...unit, lessons: updatedLessons };
        });

        // Re-calculate unlocked states for subsequent lessons
        // Simply unlock the next lesson
        let foundCompleted = false;
        updatedUnits.forEach(u => {
          u.lessons.forEach(l => {
            if (foundCompleted && !l.completed) {
              l.unlocked = true;
              foundCompleted = false; // only unlock the immediate next one
            }
            if (l.id === lessonId) {
              foundCompleted = true;
            }
          });
        });

        const newProgress = Math.min(100, Math.round((completedCount / course.totalLessons) * 100));

        return {
          ...course,
          completedLessons: completedCount,
          progress: newProgress,
          units: updatedUnits
        };
      });

      // Sync back to supabase table mock
      supabase.from('courses').update(updated).eq('id', courseId);
      return updated;
    });

    // Add Stats
    addXP(xpAwarded);
    setWordsLearned(prev => prev + 4);
    
    // Check Achievements updates
    checkAchievements();
  };

  const checkAchievements = () => {
    // Holographic triggers
    setAchievements(prev => {
      const updated = prev.map(ach => {
        if (ach.id === 'genesis-ring' && !ach.unlocked) {
          return { ...ach, unlocked: true, dateEarned: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) };
        }
        return ach;
      });
      supabase.from('achievements').update(updated);
      return updated;
    });
  };

  // Chat Board Actions
  const postChatMessage = (courseId, text) => {
    if (!user) return;
    const authorName = user.user_metadata.full_name;
    const authorLevel = `Lvl ${user.user_metadata.level_polyglot || 1}`;
    
    const newMsg = {
      id: 'm-' + Math.random().toString(36).substr(2, 9),
      user: authorName,
      level: authorLevel,
      text,
      timestamp: 'Just now',
      reactions: [],
      replies: []
    };

    setCommunity(prev => {
      const updatedList = prev[courseId] ? [...prev[courseId], newMsg] : [newMsg];
      const nextComm = { ...prev, [courseId]: updatedList };
      supabase.from('community').update(nextComm);
      
      // Simulate real-time broadcast if real Supabase isn't active
      supabase.broadcast(`chat:${courseId}`, 'new-message', newMsg);
      
      return nextComm;
    });
  };

  const addChatReaction = (courseId, messageId, emoji) => {
    setCommunity(prev => {
      const messages = prev[courseId] || [];
      const updatedMessages = messages.map(msg => {
        if (msg.id !== messageId) return msg;
        
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        let updatedReactions = [];
        if (existingReaction) {
          updatedReactions = msg.reactions.map(r => r.emoji === emoji ? { ...r, count: r.count + 1 } : r);
        } else {
          updatedReactions = [...(msg.reactions || []), { emoji, count: 1 }];
        }
        return { ...msg, reactions: updatedReactions };
      });
      const nextComm = { ...prev, [courseId]: updatedMessages };
      supabase.from('community').update(nextComm);
      return nextComm;
    });
  };

  const addChatReply = (courseId, messageId, text) => {
    if (!user) return;
    const reply = {
      id: 'r-' + Math.random().toString(36).substr(2, 9),
      user: user.user_metadata.full_name,
      text,
      timestamp: 'Just now'
    };

    setCommunity(prev => {
      const messages = prev[courseId] || [];
      const updatedMessages = messages.map(msg => {
        if (msg.id !== messageId) return msg;
        return { ...msg, replies: [...(msg.replies || []), reply] };
      });
      const nextComm = { ...prev, [courseId]: updatedMessages };
      supabase.from('community').update(nextComm);
      return nextComm;
    });
  };

  // Administrative / Management Actions
  const addCourseUnit = (courseId, title, status = 'DRAFT') => {
    setCourses(prev => {
      const updated = prev.map(course => {
        if (course.id !== courseId) return course;
        
        const newUnit = {
          id: 'unit-' + Math.random().toString(36).substr(2, 9),
          title,
          status,
          lessons: []
        };
        
        return {
          ...course,
          units: [...(course.units || []), newUnit]
        };
      });
      supabase.from('courses').update(updated);
      return updated;
    });
  };

  const editUnitStatus = (courseId, unitId, status) => {
    setCourses(prev => {
      const updated = prev.map(course => {
        if (course.id !== courseId) return course;
        
        const updatedUnits = course.units.map(unit => {
          if (unit.id !== unitId) return unit;
          return { ...unit, status };
        });
        return { ...course, units: updatedUnits };
      });
      supabase.from('courses').update(updated);
      return updated;
    });
  };

  const addCourseLesson = (courseId, unitId, title, activitiesCount = 3, duration = '15 mins') => {
    setCourses(prev => {
      const updated = prev.map(course => {
        if (course.id !== courseId) return course;
        
        const updatedUnits = course.units.map(unit => {
          if (unit.id !== unitId) return unit;
          
          const newLesson = {
            id: 'lesson-' + Math.random().toString(36).substr(2, 9),
            title,
            activitiesCount,
            duration,
            unlocked: unit.lessons.length === 0, // unlock first lesson automatically
            completed: false,
            activities: [
              { id: 'act-new-1', type: 'listening', title: 'Listening Drill' },
              { id: 'act-new-2', type: 'writing', title: 'Transcription exercise' }
            ]
          };

          return {
            ...unit,
            lessons: [...(unit.lessons || []), newLesson]
          };
        });

        // Recalculate total lessons
        const total = updatedUnits.reduce((acc, curr) => acc + (curr.lessons?.length || 0), 0);
        return { ...course, units: updatedUnits, totalLessons: total };
      });
      supabase.from('courses').update(updated);
      return updated;
    });
  };

  const createCourse = (id, title, description) => {
    setCourses(prev => {
      const newCourse = {
        id: id.toLowerCase().replace(/\s+/g, '-'),
        title,
        description,
        imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
        progress: 0,
        completedLessons: 0,
        totalLessons: 0,
        units: []
      };
      const nextCourses = [...prev, newCourse];
      supabase.from('courses').update(nextCourses);
      return nextCourses;
    });
  };

  const currentCourse = courses.find(c => c.id === currentCourseId) || courses[0];

  return (
    <AppContext.Provider value={{
      loading,
      user,
      courses,
      achievements,
      community,
      currentCourseId,
      currentCourse,
      xp,
      streak,
      wordsLearned,
      login,
      signup,
      logout,
      updateProfile,
      selectCourse,
      completeLesson,
      postChatMessage,
      addChatReaction,
      addChatReply,
      addCourseUnit,
      editUnitStatus,
      addCourseLesson,
      createCourse
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
