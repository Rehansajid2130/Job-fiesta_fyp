import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Mail, Lock, CheckCircle2, ArrowRight } from 'lucide-react';

const RegistrationForjobseekerPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [role, setRole] = useState('jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    title: '',
    company: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      login(formData.email, formData.password, role);
      if (role === 'recruiter') {
        navigate('/recruiter-dashboard');
      } else {
        navigate('/jobseeker-dashboard');
      }
    }, 1200);
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
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          backgroundColor: '#0C463B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFFFF'
        }}>
          <Briefcase size={22} />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0C463B', fontFamily: 'Poppins, sans-serif' }}>
          Job<span style={{ color: '#10B981' }}>Fiesta</span>
        </span>
      </Link>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid #E2E8F0',
        padding: '36px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: 'var(--shadow-lg)'
      }}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '36px 0' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              Account Created!
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
              Redirecting you to your personalized dashboard...
            </p>
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0F172A', marginBottom: '6px' }}>
              Create Your Job Fiesta Account
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '20px' }}>
              Join thousands of job seekers and hiring managers.
            </p>

            {/* Account Type Selection */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              padding: '4px',
              backgroundColor: '#F1F5F9',
              borderRadius: '10px',
              marginBottom: '22px'
            }}>
              <button
                type="button"
                onClick={() => setRole('jobseeker')}
                style={{
                  padding: '9px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  backgroundColor: role === 'jobseeker' ? '#FFFFFF' : 'transparent',
                  color: role === 'jobseeker' ? '#0C463B' : '#64748B',
                  boxShadow: role === 'jobseeker' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer'
                }}
              >
                I'm a Job Seeker
              </button>
              <button
                type="button"
                onClick={() => setRole('recruiter')}
                style={{
                  padding: '9px',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  backgroundColor: role === 'recruiter' ? '#FFFFFF' : 'transparent',
                  color: role === 'recruiter' ? '#0C463B' : '#64748B',
                  boxShadow: role === 'recruiter' ? 'var(--shadow-sm)' : 'none',
                  cursor: 'pointer'
                }}
              >
                I'm an Employer / Recruiter
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alice Johnson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              {role === 'recruiter' ? (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Company / Organization Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Tech Labs"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              ) : (
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Current or Target Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Password
                </label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '8px'
                }}
              >
                <span>Create Account</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#64748B' }}>
              Already registered?{' '}
              <Link to="/login" style={{ color: '#0C463B', fontWeight: '700' }}>
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationForjobseekerPage;