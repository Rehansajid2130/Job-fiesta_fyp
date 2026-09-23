import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { JobProvider } from './context/JobContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

import LandingPage from './pages/LandingPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import JobdetailsPage from './pages/JobdetailsPage.jsx';
import ResumeBuilderPage from './pages/ResumeBuilderPage.jsx';
import Loginpage from './pages/Loginpage.jsx';
import RegistrationForjobseekerPage from './pages/RegistrationForjobseekerPage.jsx';
import JobSeekerDashBoardPage from './pages/JobSeekerDashBoardPage.jsx';
import RecruiterDashBoardPage from './pages/RecruiterDashBoardPage.jsx';
import PostJobPage from './pages/PostJobPage.jsx';
import ChatMainPage from './pages/ChatMainPage.jsx';
import AccountsettingsPage from './pages/AccountsettingsPage.jsx';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <JobProvider>
          <SocketProvider userId={localStorage.getItem('userId')}>
            <Routes>
              {/* Home & Discovery */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/jobs" element={<SearchPage />} />
              <Route path="/SearchPage" element={<Navigate to="/search" replace />} />
              
              {/* Job Details */}
              <Route path="/job/:id" element={<JobdetailsPage />} />
              <Route path="/job-details" element={<JobdetailsPage />} />

              {/* Resume Builder */}
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/resume" element={<Navigate to="/resume-builder" replace />} />

              {/* Authentication */}
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<RegistrationForjobseekerPage />} />
              <Route path="/register-jobseeker" element={<RegistrationForjobseekerPage />} />

              {/* Dashboards */}
              <Route path="/jobseeker-dashboard" element={<JobSeekerDashBoardPage />} />
              <Route path="/recruiter-dashboard" element={<RecruiterDashBoardPage />} />

              {/* Job Posting */}
              <Route path="/post-job" element={<PostJobPage />} />

              {/* Chat & Messaging */}
              <Route path="/chat" element={<ChatMainPage />} />
              <Route path="/chat-main" element={<Navigate to="/chat" replace />} />
              <Route path="/messages" element={<Navigate to="/chat" replace />} />
              <Route path="/chat-interface1" element={<Navigate to="/chat" replace />} />
              <Route path="/chat-interface2" element={<Navigate to="/chat" replace />} />

              {/* Account Settings */}
              <Route path="/account-settings" element={<AccountsettingsPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '70vh',
                  textAlign: 'center',
                  padding: '40px 20px'
                }}>
                  <h1 style={{ fontSize: '3rem', fontWeight: '800', color: '#0C463B', marginBottom: '12px' }}>404</h1>
                  <p style={{ fontSize: '1.1rem', color: '#64748B', marginBottom: '24px' }}>Page not found.</p>
                  <a href="/" style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}>
                    Return to Homepage
                  </a>
                </div>
              } />
            </Routes>
          </SocketProvider>
        </JobProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;