import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useApp } from './context/AppContext';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Journey from './pages/Journey';
import LessonView from './pages/LessonView';
import LessonPlayer from './pages/LessonPlayer';
import Vocabulary from './pages/Vocabulary';
import Achievements from './pages/Achievements';
import Community from './pages/Community';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Sidebar from './components/Sidebar';
import AdminSidebar from './components/AdminSidebar';
import Navbar from './components/Navbar';

export default function App() {
  const { user, loading } = useApp();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-[#06B6D4] animate-spin mb-4"></div>
        <p className="font-mono text-xs uppercase tracking-widest text-[#94A3B8]">Syncing LinguaVerse...</p>
      </div>
    );
  }

  const isPublicRoute = ['/', '/login', '/signup'].includes(location.pathname);
  const isLessonPlayer = location.pathname.startsWith('/lesson-player');
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Sidebar checks
  const showStudentSidebar = !isPublicRoute && !isLessonPlayer && !isAdminRoute && user && user.user_metadata?.role !== 'admin';
  const showAdminSidebar = isAdminRoute && user && user.user_metadata?.role === 'admin';
  
  // Student Navbar checks
  const showStudentNavbar = !isPublicRoute && !isLessonPlayer && !isAdminRoute && user && user.user_metadata?.role !== 'admin';

  return (
    <div className="min-h-screen flex bg-[#0A1128] text-white w-full">
      {/* Layout Sidebar Shells */}
      {showStudentSidebar && <Sidebar />}
      {showAdminSidebar && <AdminSidebar />}

      <div className="flex-1 flex flex-col min-h-screen relative overflow-hidden w-full">
        {/* Layout Top Navbar */}
        {showStudentNavbar && <Navbar />}
        
        <div className={showStudentNavbar ? "pt-[72px] flex-1 flex flex-col w-full" : "flex-1 flex flex-col w-full"}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={!user ? <Auth /> : <Navigate to={user.user_metadata?.role === 'admin' ? "/admin" : "/dashboard"} replace />} />
            <Route path="/signup" element={!user ? <Auth /> : <Navigate to="/dashboard" replace />} />

            {/* Protected Student Routes */}
            <Route 
              path="/dashboard" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <Dashboard />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/journey" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <Journey />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/lesson/:courseId/:unitId/:lessonId" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <LessonView />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/lesson-player/:courseId/:unitId/:lessonId" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <LessonPlayer />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/vocabulary" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <Vocabulary />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/achievements" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <Achievements />) : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/community" 
              element={user ? (user.user_metadata?.role === 'admin' ? <Navigate to="/admin" replace /> : <Community />) : <Navigate to="/login" replace />} 
            />

            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={user && user.user_metadata?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />} 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
