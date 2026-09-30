import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LandingHeader = ({ scrollToSection }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          position: 'relative', 
          paddingTop: '20px', 
          paddingBottom: '20px' 
        }}
      >
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => {
            setMobileMenuOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '4px' }}
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

        {/* Desktop Navigation links & CTA */}
        <div className="landing-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/search')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Jobs
            </button>
            <button 
              onClick={() => scrollToSection('categories')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Categories
            </button>
            <button 
              onClick={() => navigate('/resume-builder')}
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '500', color: '#1A1A1A', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Resume Builder
            </button>
          </nav>

          {/* Right CTA - Logged in vs Guest */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button 
              onClick={() => navigate('/search')} 
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#0C463B', cursor: 'pointer', background: 'none', border: 'none' }}
            >
              Browse jobs
            </button>

            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Link 
                  to={user.userType === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard'} 
                  style={{ 
                    backgroundColor: '#0C463B', 
                    color: '#FFFFFF', 
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px', 
                    fontWeight: '600', 
                    padding: '9px 24px', 
                    borderRadius: '50px', 
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Dashboard</span>
                </Link>
                <button 
                  onClick={logout}
                  title="Log out"
                  style={{ fontSize: '13px', color: '#64748B', fontFamily: 'Inter, sans-serif', cursor: 'pointer', background: 'none', border: 'none' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                style={{ 
                  backgroundColor: '#0C463B', 
                  color: '#FFFFFF', 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '16px', 
                  fontWeight: '600', 
                  padding: '10px 32px', 
                  borderRadius: '50px', 
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Log In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="landing-mobile-toggle"
          aria-label="Toggle Navigation Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            color: '#0C463B',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileMenuOpen ? (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div 
          style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #ECECEC',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
            zIndex: 100
          }}
        >
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Home
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/search');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Jobs
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              scrollToSection('categories');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            Categories
          </button>
          <button 
            onClick={() => {
              setMobileMenuOpen(false);
              navigate('/resume-builder');
            }}
            style={{ textAlign: 'left', fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: '600', color: '#1A1A1A', padding: '8px 0', borderBottom: '1px solid #F3F4F6', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            AI Resume Builder
          </button>
          
          <div style={{ paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/search');
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '50px',
                border: '1.5px solid #0C463B',
                color: '#0C463B',
                fontFamily: 'Inter, sans-serif',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                background: 'none'
              }}
            >
              Browse All Jobs
            </button>
            {user ? (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link
                  to={user.userType === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard'}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    padding: '12px',
                    borderRadius: '50px',
                    fontWeight: '600',
                    fontSize: '15px'
                  }}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '50px',
                    backgroundColor: '#F3F4F6',
                    color: '#64748B',
                    fontWeight: '600',
                    fontSize: '14px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  padding: '12px',
                  borderRadius: '50px',
                  fontWeight: '600',
                  fontSize: '15px',
                  display: 'block'
                }}
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LandingHeader;
