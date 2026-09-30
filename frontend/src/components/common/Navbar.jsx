import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useJobs } from '../../context/JobContext';
import { 
  FileText, 
  MessageSquare, 
  LayoutDashboard, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Repeat,
  Bell,
  Building2,
  TrendingUp,
  Users2,
  CheckCheck
} from 'lucide-react';
import IconSwap from './IconSwap';

const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead 
  } = useJobs();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const profileDropdownRef = useRef(null);
  const notifDropdownRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
    };
    if (profileDropdownOpen || notifDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileDropdownOpen, notifDropdownOpen]);

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
                to="/companies" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/companies') ? '700' : '500',
                  color: isActive('/companies') ? '#0C463B' : '#475569',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Companies
              </Link>

              <Link 
                to="/salaries" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/salaries') ? '700' : '500',
                  color: isActive('/salaries') ? '#0C463B' : '#475569',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Salaries
              </Link>

              {isRecruiter && (
                <Link 
                  to="/candidates" 
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: isActive('/candidates') ? '700' : '500',
                    color: isActive('/candidates') ? '#0C463B' : '#475569',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  Candidates (ATS)
                </Link>
              )}

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

            {/* Right Navigation: Role Indicator, Browse Jobs, Notifications & Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
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

              {/* ── transitions-dev: 03-notification-badge & 05-menu-dropdown ── */}
              <div style={{ position: 'relative' }} ref={notifDropdownRef}>
                <button
                  type="button"
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  aria-label="View notifications"
                  title="Notifications"
                  style={{
                    position: 'relative',
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    backgroundColor: notifDropdownOpen ? '#F1F5F9' : '#FFFFFF',
                    color: '#334155',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Bell size={18} />
                  {/* transitions-dev: 03-notification-badge */}
                  <span className="t-badge" data-open={unreadNotificationsCount > 0 ? "true" : "false"}>
                    <span className="t-badge-dot">
                      {unreadNotificationsCount}
                    </span>
                  </span>
                </button>

                {/* transitions-dev: 05-menu-dropdown */}
                <div
                  className={`t-dropdown ${notifDropdownOpen ? 'is-open' : ''}`}
                  data-origin="top-right"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '48px',
                    width: '360px',
                    maxWidth: '90vw',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-xl)',
                    border: '1px solid #E2E8F0',
                    overflow: 'hidden',
                    zIndex: 1100
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderBottom: '1px solid #F1F5F9',
                    backgroundColor: '#FAFAFA'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '700', fontSize: '0.95rem', color: '#0F172A' }}>
                        Notifications
                      </span>
                      {unreadNotificationsCount > 0 && (
                        <span style={{
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: '#EBF8F4',
                          color: '#0C463B',
                          fontSize: '0.72rem',
                          fontWeight: '800'
                        }}>
                          {unreadNotificationsCount} New
                        </span>
                      )}
                    </div>
                    {unreadNotificationsCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllNotificationsAsRead}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#0C463B',
                          fontSize: '0.78rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <CheckCheck size={14} />
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div style={{ maxHeight: '340px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '32px 20px', textAlign: 'center', color: '#94A3B8', fontSize: '0.88rem' }}>
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.slice(0, 4).map(item => (
                        <Link
                          key={item.id}
                          to={item.link || '/notifications'}
                          onClick={() => {
                            markNotificationAsRead(item.id);
                            setNotifDropdownOpen(false);
                          }}
                          style={{
                            display: 'block',
                            padding: '12px 18px',
                            borderBottom: '1px solid #F8FAFC',
                            backgroundColor: item.unread ? '#F2FFF2' : '#FFFFFF',
                            transition: 'background-color 0.15s ease',
                            textDecoration: 'none'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px', marginBottom: '2px' }}>
                            <span style={{
                              fontWeight: item.unread ? '700' : '600',
                              fontSize: '0.85rem',
                              color: '#0F172A'
                            }}>
                              {item.title}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                              {item.time}
                            </span>
                          </div>
                          <p style={{
                            fontSize: '0.8rem',
                            color: '#64748B',
                            margin: 0,
                            lineHeight: 1.35,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}>
                            {item.message}
                          </p>
                        </Link>
                      ))
                    )}
                  </div>

                  <Link
                    to="/notifications"
                    onClick={() => setNotifDropdownOpen(false)}
                    style={{
                      display: 'block',
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: '#0C463B',
                      backgroundColor: '#F8FAFC',
                      borderTop: '1px solid #F1F5F9',
                      textDecoration: 'none'
                    }}
                  >
                    View All Notifications →
                  </Link>
                </div>
              </div>

              {user ? (
                <div style={{ position: 'relative' }} ref={profileDropdownRef}>
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

                  {/* transitions-dev: 05-menu-dropdown */}
                  <div 
                    className={`t-dropdown ${profileDropdownOpen ? 'is-open' : ''}`}
                    data-origin="top-right"
                    style={{
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
                    }}
                  >
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
                        to="/profile/furqan12"
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
                        Public Profile
                      </Link>
                      <Link
                        to="/notifications"
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
                        <Bell size={16} />
                        Notifications Center
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
                <IconSwap 
                  state={mobileMenuOpen} 
                  iconA={<X size={24} />} 
                  iconB={<Menu size={24} />} 
                />
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
