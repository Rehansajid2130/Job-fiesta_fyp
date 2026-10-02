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
  Bell,
  Building2,
  TrendingUp,
  Users2,
  CheckCheck
} from 'lucide-react';
import IconSwap from './IconSwap';

const Navbar = () => {
  const { user, logout } = useAuth();
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

  const isRecruiter = user?.userType === 'recruiter';
  const isActive = (path) => location.pathname === path;

  const handleCategoriesClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById('categories');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#categories');
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid #F1F5F9',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '76px'
      }}>
        {/* Brand Logo Matching Everywhere */}
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

        {/* Center Desktop Navigation Links */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px'
            }} className="desktop-nav">
              <Link 
                to="/" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/') ? '700' : '500',
                  color: isActive('/') ? '#0C463B' : '#475569',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => {
                  if (!isActive('/')) e.currentTarget.style.color = '#475569';
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
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => {
                  if (!isActive('/search')) e.currentTarget.style.color = '#475569';
                }}
              >
                Jobs
              </Link>

              <button 
                type="button"
                onClick={handleCategoriesClick}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontSize: '0.92rem',
                  fontWeight: '500',
                  color: '#475569',
                  transition: 'color 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
              >
                Categories
              </button>

              <Link 
                to="/companies" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/companies') ? '700' : '500',
                  color: isActive('/companies') ? '#0C463B' : '#475569',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => {
                  if (!isActive('/companies')) e.currentTarget.style.color = '#475569';
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
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => {
                  if (!isActive('/salaries')) e.currentTarget.style.color = '#475569';
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
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                  onMouseLeave={(e) => {
                    if (!isActive('/candidates')) e.currentTarget.style.color = '#475569';
                  }}
                >
                  <Users2 size={15} />
                  Candidates
                </Link>
              )}

              <Link 
                to="/resume-builder" 
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/resume-builder') ? '700' : '500',
                  color: isActive('/resume-builder') ? '#0C463B' : '#475569',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0C463B'}
                onMouseLeave={(e) => {
                  if (!isActive('/resume-builder')) e.currentTarget.style.color = '#475569';
                }}
              >
                <FileText size={15} />
                AI Resume
              </Link>
            </div>

            {/* Right Navigation: Role Indicator, Browse Jobs, Notifications & Auth Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>

              {/* Notifications Badge & Dropdown */}
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
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  <Bell size={18} />
                  <span className="t-badge" data-open={unreadNotificationsCount > 0 ? "true" : "false"}>
                    <span className="t-badge-dot">
                      {unreadNotificationsCount}
                    </span>
                  </span>
                </button>

                {/* Notifications Dropdown */}
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

              {/* User Profile or Guest Auth Buttons */}
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

                  {/* Profile Dropdown */}
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
                        color: '#334155',
                        textDecoration: 'none'
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
                        color: '#334155',
                        textDecoration: 'none'
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
                        color: '#334155',
                        textDecoration: 'none'
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
                        color: '#334155',
                        textDecoration: 'none'
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
                        color: '#334155',
                        textDecoration: 'none'
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
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        borderTop: '1px solid #F1F5F9'
                      }}
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Link 
                    to="/login"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      color: '#0C463B',
                      padding: '8px 18px',
                      borderRadius: '50px',
                      border: '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                      transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#0C463B';
                      e.currentTarget.style.backgroundColor = '#F2FFF2';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(12, 70, 59, 0.12)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.backgroundColor = '#FFFFFF';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                    }}
                  >
                    Log In
                  </Link>

                  <Link 
                    to="/register"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      padding: '9px 20px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      border: '1px solid #0C463B',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      display: 'inline-block',
                      boxShadow: '0 2px 8px rgba(12, 70, 59, 0.2)',
                      transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#08342c';
                      e.currentTarget.style.borderColor = '#08342c';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 18px rgba(12, 70, 59, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0C463B';
                      e.currentTarget.style.borderColor = '#0C463B';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(12, 70, 59, 0.2)';
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
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
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none'
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
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderTop: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)'
        }}>
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: isActive('/') ? '700' : '500', color: isActive('/') ? '#0C463B' : '#334155', textDecoration: 'none' }}
          >
            Home
          </Link>
          <Link 
            to="/search" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: isActive('/search') ? '700' : '500', color: isActive('/search') ? '#0C463B' : '#334155', textDecoration: 'none' }}
          >
            Jobs
          </Link>
          <button 
            type="button"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleCategoriesClick(e);
            }}
            style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', fontSize: '1rem', fontWeight: '500', color: '#334155', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Categories
          </button>
          <Link 
            to="/companies" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: isActive('/companies') ? '700' : '500', color: isActive('/companies') ? '#0C463B' : '#334155', textDecoration: 'none' }}
          >
            Companies
          </Link>
          <Link 
            to="/salaries" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: isActive('/salaries') ? '700' : '500', color: isActive('/salaries') ? '#0C463B' : '#334155', textDecoration: 'none' }}
          >
            Salaries
          </Link>
          {isRecruiter && (
            <Link 
              to="/candidates" 
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', fontWeight: isActive('/candidates') ? '700' : '500', color: isActive('/candidates') ? '#0C463B' : '#334155', textDecoration: 'none' }}
            >
              Candidates (ATS)
            </Link>
          )}
          <Link 
            to="/resume-builder" 
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', fontWeight: isActive('/resume-builder') ? '700' : '500', color: isActive('/resume-builder') ? '#0C463B' : '#334155', textDecoration: 'none' }}
          >
            AI Resume Builder
          </Link>

          <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '4px 0' }} />

          {user ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link 
                to={isRecruiter ? '/recruiter-dashboard' : '/jobseeker-dashboard'} 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '0.95rem', fontWeight: '600', color: '#0C463B', textDecoration: 'none' }}
              >
                Dashboard
              </Link>
              <Link 
                to="/chat" 
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '0.95rem', fontWeight: '600', color: '#334155', textDecoration: 'none' }}
              >
                Messages
              </Link>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                  navigate('/login');
                }}
                style={{ background: 'none', border: 'none', padding: 0, textAlign: 'left', fontSize: '0.95rem', fontWeight: '600', color: '#EF4444', cursor: 'pointer' }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '50px',
                  border: '1px solid #E2E8F0',
                  color: '#0C463B',
                  fontWeight: '600',
                  textDecoration: 'none'
                }}
              >
                Log In
              </Link>
              <Link 
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '10px',
                  borderRadius: '50px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                Sign Up
              </Link>
            </div>
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
