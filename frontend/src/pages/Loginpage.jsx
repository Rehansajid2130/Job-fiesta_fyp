import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Check, X, AlertCircle } from 'lucide-react';

const Loginpage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState('rehan.candidate@jobfiesta.io');
  const [password, setPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Forgot Password Modal State
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSubmitted, setResetSubmitted] = useState(false);

  // Quick Demo Role selector (Jobseeker vs Recruiter)
  const [activeRole, setActiveRole] = useState('jobseeker');

  const handleRoleQuickFill = (role) => {
    setActiveRole(role);
    if (role === 'recruiter') {
      setEmailOrUsername('recruiter@nexusinnovations.com');
      setPassword('Recruiter2026!');
    } else {
      setEmailOrUsername('rehan.candidate@jobfiesta.io');
      setPassword('Password123');
    }
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!emailOrUsername.trim()) {
      setErrorMsg('Please enter your Email ID or Username.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login(emailOrUsername, password, activeRole);
      setLoading(false);

      if (res?.success) {
        if (res.user?.userType === 'recruiter' || activeRole === 'recruiter') {
          navigate('/recruiter-dashboard');
        } else {
          navigate('/jobseeker-dashboard');
        }
      } else {
        // Fallback default redirect if authenticated
        navigate('/jobseeker-dashboard');
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Login failed. Please try again.');
    }
  };

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setTimeout(async () => {
      await login(`${provider.toLowerCase()}.user@jobfiesta.io`, 'SocialAuth123', activeRole);
      setLoading(false);
      navigate(activeRole === 'recruiter' ? '/recruiter-dashboard' : '/jobseeker-dashboard');
    }, 600);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    if (resetEmail.trim()) {
      setResetSubmitted(true);
      setTimeout(() => {
        setForgotModalOpen(false);
        setResetSubmitted(false);
        setResetEmail('');
      }, 2000);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFDFB',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Outer Wrapper for Left-Aligned Title and Card */}
      <div style={{ width: '100%', maxWidth: '980px' }}>
        
        {/* Title & Subtitle Above the Card (Matches Figma Screenshot Exactly) */}
        <div style={{ marginBottom: '28px', paddingLeft: '12px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#1F2937',
            margin: '0 0 8px 0',
            letterSpacing: '-0.02em'
          }}>
            Login to your Account
          </h1>
          <p style={{
            fontSize: '15px',
            color: '#6B7280',
            margin: 0,
            fontWeight: '400'
          }}>
            Welcome back! Select the below login methods.
          </p>
        </div>

        {/* Main Card Container */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '32px',
          boxShadow: '0 12px 48px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          padding: '48px 52px',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 460px) 1fr',
          gap: '48px',
          alignItems: 'center'
        }} className="login-card-grid">

          {/* Left Column: Login Form */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            
            {/* Quick Demo Pill Helper (Job Seeker / Recruiter) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: '500' }}>Demo Role:</span>
              <button
                type="button"
                onClick={() => handleRoleQuickFill('jobseeker')}
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: activeRole === 'jobseeker' ? '1px solid #0D473B' : '1px solid #E5E7EB',
                  backgroundColor: activeRole === 'jobseeker' ? '#F4FDF6' : '#FFFFFF',
                  color: activeRole === 'jobseeker' ? '#0D473B' : '#6B7280',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Job Seeker
              </button>
              <button
                type="button"
                onClick={() => handleRoleQuickFill('recruiter')}
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  border: activeRole === 'recruiter' ? '1px solid #0D473B' : '1px solid #E5E7EB',
                  backgroundColor: activeRole === 'recruiter' ? '#F4FDF6' : '#FFFFFF',
                  color: activeRole === 'recruiter' ? '#0D473B' : '#6B7280',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                Recruiter
              </button>
            </div>

            {/* Error Message if any */}
            {errorMsg && (
              <div style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FCA5A5',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#B91C1C',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '16px'
              }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Field 1: Email ID / Username */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#0284C7',
                  marginBottom: '8px'
                }}>
                  Email ID / Username
                </label>
                <input
                  type="text"
                  placeholder="Enter email id / username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 16px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '14px',
                    color: '#1F2937',
                    backgroundColor: '#FFFFFF',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0284C7';
                    e.target.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#D1D5DB';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Field 2: Password */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#0284C7',
                  marginBottom: '8px'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: '100%',
                      height: '50px',
                      padding: '0 70px 0 16px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      color: '#1F2937',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box',
                      transition: 'border-color 0.15s ease, box-shadow 0.15s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0284C7';
                      e.target.style.boxShadow = '0 0 0 3px rgba(2, 132, 199, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#D1D5DB';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#111827',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {/* Row: Remember Me & Forgot Password? */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '26px'
              }}>
                {/* Remember Me Checkbox */}
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  userSelect: 'none'
                }}>
                  <div
                    onClick={() => setRememberMe(!rememberMe)}
                    style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: rememberMe ? '#0D473B' : '#FFFFFF',
                      border: rememberMe ? '1px solid #0D473B' : '1px solid #D1D5DB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {rememberMe && <Check size={13} color="#FFFFFF" strokeWidth={3} />}
                  </div>
                  <span style={{ fontSize: '14px', color: '#374151', fontWeight: '400' }}>
                    Remember me
                  </span>
                </label>

                {/* Forgot Password Link */}
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '14px',
                    color: '#111827',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: '400'
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  height: '50px',
                  borderRadius: '8px',
                  backgroundColor: '#0D473B',
                  color: '#FFFFFF',
                  fontSize: '16px',
                  fontWeight: '700',
                  border: 'none',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.15s ease, transform 0.1s ease',
                  boxShadow: '0 4px 12px rgba(13, 71, 59, 0.15)'
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#08332A';
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#0D473B';
                }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>

            </form>

            {/* Divider: or login with */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              margin: '30px 0 22px 0'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
              <span style={{
                padding: '0 16px',
                fontSize: '14px',
                color: '#6B7280',
                fontWeight: '400'
              }}>
                or login with
              </span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
            </div>

            {/* Social Login Buttons (Google & Apple) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px'
            }}>
              {/* Google Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                title="Login with Google"
                style={{
                  width: '52px',
                  height: '48px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.675-5.17 3.675-9.15z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.39l4-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.61l4 3.15c.95-2.85 3.6-4.96 6.73-4.96z"
                  />
                </svg>
              </button>

              {/* Apple Button */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                title="Login with Apple"
                style={{
                  width: '52px',
                  height: '48px',
                  borderRadius: '10px',
                  border: '1px solid #E5E7EB',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                }}
              >
                <img
                  src="/assets/images/applelogo_1.png"
                  alt="Apple"
                  style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                />
              </button>
            </div>

            {/* Bottom Register Link (Matches Figma: Blue text + Black bold underlined Register) */}
            <div style={{
              marginTop: '40px',
              textAlign: 'center',
              fontSize: '15px'
            }}>
              <span style={{ color: '#0284C7', fontWeight: '400' }}>
                Don’t have an account?{' '}
              </span>
              <Link
                to="/register"
                style={{
                  color: '#111827',
                  fontWeight: '700',
                  textDecoration: 'underline'
                }}
              >
                Register
              </Link>
            </div>

          </div>

          {/* Right Column: Illustration (Window with girl looking out and leaf) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }} className="login-illustration-container">
            <img
              src="/assets/loginpageimages/group.svg"
              alt="Login illustration"
              style={{
                width: '100%',
                maxWidth: '360px',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
            />
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            maxWidth: '440px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
            position: 'relative'
          }}>
            <button
              type="button"
              onClick={() => {
                setForgotModalOpen(false);
                setResetSubmitted(false);
              }}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6B7280'
              }}
            >
              <X size={20} />
            </button>

            {resetSubmitted ? (
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: '#D1FAE5',
                  color: '#0D473B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  Reset Link Sent!
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280' }}>
                  We have dispatched password recovery instructions to <strong>{resetEmail}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleResetSubmit}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                  Reset Password
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>
                  Enter your registered email address and we will send you a password reset link.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#0284C7', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    style={{
                      width: '100%',
                      height: '46px',
                      padding: '0 14px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      backgroundColor: '#FFFFFF',
                      color: '#4B5563',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: '#0D473B',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 820px) {
          .login-card-grid {
            grid-template-columns: 1fr !important;
            padding: 32px 24px !important;
            gap: 32px !important;
          }
          .login-illustration-container {
            order: -1;
            margin-bottom: -10px;
          }
          .login-illustration-container img {
            max-width: 240px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Loginpage;