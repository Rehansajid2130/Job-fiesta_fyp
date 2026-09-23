import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const Loginpage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('jobseeker'); // 'jobseeker' or 'recruiter'
  const [email, setEmail] = useState('alice.jobseeker@example.com');
  const [password, setPassword] = useState('Password123');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'recruiter') {
      setEmail('bob.recruiter@example.com');
    } else {
      setEmail('alice.jobseeker@example.com');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await login(email, password, role);
    setLoading(false);

    if (res.success) {
      if (res.user.userType === 'recruiter') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/jobseeker-dashboard');
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F8FAFC',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px'
    }}>
      {/* Brand Header */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '10px',
          backgroundColor: '#0C463B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF'
        }}>
          <Briefcase size={24} />
        </div>
        <span style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0C463B', fontFamily: 'Poppins, sans-serif' }}>
          Job<span style={{ color: '#10B981' }}>Fiesta</span>
        </span>
      </Link>

      {/* Login Card */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '40px',
        width: '100%',
        maxWidth: '460px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
          Sign In to Your Account
        </h2>
        <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '24px' }}>
          Welcome back! Access your profile, saved jobs, and real-time dashboard.
        </p>

        {/* Role Switcher Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          padding: '4px',
          backgroundColor: '#F1F5F9',
          borderRadius: '10px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => handleRoleSelect('jobseeker')}
            style={{
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.88rem',
              backgroundColor: role === 'jobseeker' ? '#FFFFFF' : 'transparent',
              color: role === 'jobseeker' ? '#0C463B' : '#64748B',
              boxShadow: role === 'jobseeker' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer'
            }}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('recruiter')}
            style={{
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.88rem',
              backgroundColor: role === 'recruiter' ? '#FFFFFF' : 'transparent',
              color: role === 'recruiter' ? '#0C463B' : '#64748B',
              boxShadow: role === 'recruiter' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer'
            }}
          >
            Recruiter
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                Password
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo reset email sent to ' + email); }} style={{ fontSize: '0.8rem', color: '#0C463B', fontWeight: '600' }}>
                Forgot?
              </a>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '11px 14px 11px 38px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.92rem'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '13px',
              borderRadius: '10px',
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '0.98rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '8px'
            }}
          >
            <span>{loading ? 'Signing In...' : `Sign In as ${role === 'jobseeker' ? 'Candidate' : 'Recruiter'}`}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.88rem', color: '#64748B' }}>
          Don't have an account?{' '}
          <Link to="/register-jobseeker" style={{ color: '#0C463B', fontWeight: '700' }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;