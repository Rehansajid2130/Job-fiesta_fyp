import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FileText, 
  MessageSquare, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X,
  Repeat
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is registration or sign in / login
  const normalizedPath = (location.pathname || '').toLowerCase().replace(/\/+$/, '') || '/';
  const isAuthPage = [
    '/login', 
    '/register', 
    '/register-jobseeker', 
    '/register-recruiter', 
    '/signup'
  ].includes(normalizedPath);

  const isRecruiter = user?.userType === 'recruiter';
  const isActive = (path) => location.pathname === path;

  const handleRoleToggle = () => {
    const nextRole = isRecruiter ? 'jobseeker' : 'recruiter';
    switchRole(nextRole);
    if (nextRole === 'recruiter') {
      navigate('/recruiter-dashboard');
    } else {
      navigate('/jobseeker-dashboard');
    }
  };

  const isSearchPage = normalizedPath === '/search';

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: isSearchPage ? '#F2FFF2' : '#FFFFFF',
      borderBottom: isSearchPage ? '1px solid rgba(13, 71, 59, 0.08)' : '1px solid #F1F5F9',
      boxShadow: isSearchPage ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.02)'
    }}>
      {/* ponytail: reusing global .container instead of re-specifying width, margins and padding */}
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Original Brand Logo Matching Landing Page */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            display: 'inline-flex', 
            alignItems: 'baseline', 
            gap: '4px' 
          }}
        >
          <span style={{ 
            fontFamily: "'League Script', cursive", 
            fontSize: 'clamp(34px, 5vw, 42px)', 
            fontWeight: 'bold', 
            color: '#000000', 
            lineHeight: 1 
          }}>
            Job fiesta
          </span>
        </Link>

        {/* If on Register or Sign In page: Hide all other links/buttons and show ONLY the website name */}
        {!isAuthPage && (
          <>
            {/* Center Desktop Navigation Links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }} className="desktop-nav">
              <Link 
                to="/" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/') ? '700' : '500',
                  color: isActive('/') ? '#0C463B' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                Home
              </Link>

              <Link 
                to="/search" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/search') ? '700' : '500',
                  color: isActive('/search') ? '#0C463B' : '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                Jobs
              </Link>

              <a 
                href="/search#categories" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: '500',
                  color: '#475569',
                  transition: 'all 0.2s ease'
                }}
              >
                Categories
              </a>

              <Link 
                to="/resume-builder" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/resume-builder') ? '700' : '500',
                  color: isActive('/resume-builder') ? '#0C463B' : '#475569',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <FileText size={15} />
                AI Resume
              </Link>
            </div>

            {/* Right Navigation: Role Indicator, Browse Jobs & Profile / Login */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Role switcher indicator */}
              <button
                type="button"
                onClick={handleRoleToggle}
                title="Switch between Job Seeker and Recruiter"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '50px',
                  backgroundColor: isRecruiter ? '#FEF3C7' : '#F2FFF2',
                  color: isRecruiter ? '#92400E' : '#0C463B',
                  fontSize: '0.78rem',
                  fontWeight: '700',
                  border: `1px solid ${isRecruiter ? '#FDE68A' : '#A7F3D0'}`,
                  cursor: 'pointer'
                }}
              >
                <Repeat size={12} />
                <span>{isRecruiter ? 'Recruiter' : 'Job Seeker'}</span>
              </button>

              <Link 
                to="/search" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  color: '#0C463B',
                  padding: '6px 10px',
                  transition: 'all 0.2s ease'
                }}
                className="browse-jobs-link"
              >
                Browse Jobs
              </Link>

              {user ? (
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      padding: '2px',
                      borderRadius: '50%'
                    }}
                  >
                    <img 
                      src={user.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces'} 
                      alt={user.name}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid #0C463B'
                      }}
                    />
                  </div>

                  {profileDropdownOpen && (
                    <div style={{
                      position: 'absolute',
                      right: 0,
                      top: '48px',
                      width: '210px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: 'var(--shadow-xl)',
                      border: '1px solid #E2E8F0',
                      padding: '8px 0',
                      zIndex: 1100
                    }}>
                      <div style={{ padding: '8px 16px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#0F172A' }}>{user.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{user.email}</div>
                      </div>
                      <Link
                        to={isRecruiter ? '/recruiter-dashboard' : '/jobseeker-dashboard'}
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          fontSize: '0.88rem',
                          color: '#334155'
                        }}
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <Link
                        to="/chat"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          fontSize: '0.88rem',
                          color: '#334155'
                        }}
                      >
                        <MessageSquare size={16} />
                        Messages
                      </Link>
                      <Link
                        to="/account-settings"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          fontSize: '0.88rem',
                          color: '#334155'
                        }}
                      >
                        <User size={16} />
                        Account Settings
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 16px',
                          fontSize: '0.88rem',
                          color: '#EF4444',
                          textAlign: 'left'
                        }}
                      >
                        <LogOut size={16} />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login"
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: '700',
                    padding: '10px 24px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    borderRadius: '50px',
                    transition: 'all 0.2s ease',
                    display: 'inline-block'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#08342c'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0C463B'}
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Toggle Button */}
              <button 
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={{
                  padding: '6px',
                  color: '#334155',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                className="mobile-nav-toggle"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </>
        )}
      </div>

      {/* Mobile Drawer (Only when not on auth pages) */}
      {!isAuthPage && mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/search" onClick={() => setMobileMenuOpen(false)}>Jobs</Link>
          <a href="/search#categories" onClick={() => setMobileMenuOpen(false)}>Categories</a>
          <Link to="/resume-builder" onClick={() => setMobileMenuOpen(false)}>AI Resume Builder</Link>
          {user && (
            <>
              <Link to={isRecruiter ? '/recruiter-dashboard' : '/jobseeker-dashboard'} onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              <Link to="/chat" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav { display: none !important; }
          .browse-jobs-link { display: none !important; }
          .mobile-nav-toggle { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
