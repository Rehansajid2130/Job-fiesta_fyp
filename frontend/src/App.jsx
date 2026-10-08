import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { JobProvider } from './context/JobContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ScrollToTop from './components/common/ScrollToTop.jsx';

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

// Newly added SaaS Pages
import CompaniesPage from './pages/CompaniesPage.jsx';
import CompanyDetailPage from './pages/CompanyDetailPage.jsx';
import CandidatesAtsPage from './pages/CandidatesAtsPage.jsx';
import PublicProfilePage from './pages/PublicProfilePage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';
import SalaryInsightsPage from './pages/SalaryInsightsPage.jsx';
import SystemStatusPage from './pages/SystemStatusPage.jsx';
import Toast from './components/common/Toast.jsx';

// Route protection component to restrict views according to user roles
const RoleRoute = ({ children, allowedRole }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRole && user.userType !== allowedRole) {
    return <Navigate to={user.userType === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard'} replace />;
  }
  return children;
};

// General route protection for authenticated users of any role
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <JobProvider>
          <SocketProvider userId={localStorage.getItem('userId')}>
            <ScrollToTop />
            <Toast />
            <Routes>
              {/* Home & Discovery */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/jobs" element={<SearchPage />} />
              <Route path="/SearchPage" element={<Navigate to="/search" replace />} />

              {/* Companies Directory & Profiles */}
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/company/:id" element={<CompanyDetailPage />} />

              {/* Salary Insights */}
              <Route path="/salaries" element={<SalaryInsightsPage />} />
              <Route path="/salary-insights" element={<Navigate to="/salaries" replace />} />

              {/* Candidate ATS Pipeline (Recruiters Only) */}
              <Route path="/candidates" element={<RoleRoute allowedRole="recruiter"><CandidatesAtsPage /></RoleRoute>} />
              <Route path="/ats" element={<Navigate to="/candidates" replace />} />

              {/* Public Profiles */}
              <Route path="/profile/:username" element={<PublicProfilePage />} />
              <Route path="/profile" element={<Navigate to="/profile/furqan12" replace />} />

              {/* Notification Center (Protected) */}
              <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
              
              {/* Job Details (Public to view, login required to apply) */}
              <Route path="/job/:id" element={<JobdetailsPage />} />
              <Route path="/job-details" element={<JobdetailsPage />} />

              {/* AI Resume Generator & Builder */}
              <Route path="/resume-builder" element={<ResumeBuilderPage />} />
              <Route path="/resume-generation" element={<ResumeBuilderPage />} />
              <Route path="/resume-generator" element={<ResumeBuilderPage />} />
              <Route path="/resume" element={<Navigate to="/resume-builder" replace />} />

              {/* Authentication */}
              <Route path="/login" element={<Loginpage />} />
              <Route path="/register" element={<RegistrationForjobseekerPage />} />
              <Route path="/register-jobseeker" element={<RegistrationForjobseekerPage />} />
              <Route path="/register-recruiter" element={<RegistrationForjobseekerPage />} />
              <Route path="/signup" element={<RegistrationForjobseekerPage />} />

              {/* Dashboards (Strict Role-Based Access) */}
              <Route path="/jobseeker-dashboard" element={<RoleRoute allowedRole="jobseeker"><JobSeekerDashBoardPage /></RoleRoute>} />
              <Route path="/recruiter-dashboard" element={<RoleRoute allowedRole="recruiter"><RecruiterDashBoardPage /></RoleRoute>} />

              {/* Job Posting (Recruiters Only) */}
              <Route path="/post-job" element={<RoleRoute allowedRole="recruiter"><PostJobPage /></RoleRoute>} />

              {/* Chat & Messaging (Protected) */}
              <Route path="/chat" element={<ProtectedRoute><ChatMainPage /></ProtectedRoute>} />
              <Route path="/chat-main" element={<Navigate to="/chat" replace />} />
              <Route path="/messages" element={<Navigate to="/chat" replace />} />
              <Route path="/chat-interface1" element={<Navigate to="/chat" replace />} />
              <Route path="/chat-interface2" element={<Navigate to="/chat" replace />} />

              {/* Account Settings (Protected) */}
              <Route path="/account-settings" element={<ProtectedRoute><AccountsettingsPage /></ProtectedRoute>} />

              {/* System Diagnostics & Testing Suite */}
              <Route path="/system-status" element={<SystemStatusPage />} />
              <Route path="/status" element={<Navigate to="/system-status" replace />} />

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