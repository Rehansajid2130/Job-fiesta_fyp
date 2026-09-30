import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';

const PrimaryRegisterStep = ({
  formData,
  handleChange,
  showPassword,
  setShowPassword,
  onSubmit,
  onGoogleSignup
}) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Full Name */}
      <div style={{ marginBottom: '20px' }}>
        <label className="figma-label">
          Full name<span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          type="text"
          className="figma-input"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
      </div>

      {/* Email ID */}
      <div style={{ marginBottom: '20px' }}>
        <label className="figma-label">
          Email ID<span style={{ color: '#EF4444' }}>*</span>
        </label>
        <div style={{ position: 'relative', width: '100%' }}>
          <Mail 
            size={18} 
            color="#9CA3AF" 
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
          />
          <input
            type="email"
            className="figma-input"
            style={{ paddingLeft: '44px' }}
            placeholder="Enter your email id"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
        <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
          Job notifications will be sent to this email id
        </span>
      </div>

      {/* Password */}
      <div style={{ marginBottom: '20px' }}>
        <label className="figma-label">
          Password<span style={{ color: '#EF4444' }}>*</span>
        </label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            className="figma-input figma-input-password"
            placeholder="(Minimum 6 characters)"
            value={formData.password}
            onChange={(e) => handleChange('password', e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="figma-show-btn"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
          Remember your password
        </span>
      </div>

      {/* Mobile Number */}
      <div style={{ marginBottom: '24px' }}>
        <label className="figma-label">
          Mobile number<span style={{ color: '#EF4444' }}>*</span>
        </label>
        <input
          type="tel"
          className="figma-input"
          placeholder="Enter your mobile number"
          value={formData.mobileNumber}
          onChange={(e) => handleChange('mobileNumber', e.target.value)}
        />
        <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', display: 'block' }}>
          Recruiters will contact you on this number
        </span>
      </div>

      {/* Role Decision Buttons (Job Seeker vs Job Recruiter) */}
      <div style={{ marginBottom: '24px' }}>
        <label className="figma-label" style={{ marginBottom: '12px' }}>
          I want to join JobFiesta as:
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          
          {/* Option 1: Job Seeker */}
          <button
            type="button"
            onClick={() => handleChange('role', 'jobseeker')}
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              border: formData.role === 'jobseeker' ? '2px solid #0D473B' : '1px solid #D1D5DB',
              backgroundColor: formData.role === 'jobseeker' ? '#F4FDF6' : '#FFFFFF',
              color: formData.role === 'jobseeker' ? '#0D473B' : '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: formData.role === 'jobseeker' ? '6px solid #0D473B' : '2px solid #9CA3AF',
              backgroundColor: '#FFFFFF',
              flexShrink: 0
            }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '700' }}>Job Seeker</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Looking for exciting jobs</div>
            </div>
          </button>

          {/* Option 2: Job Recruiter */}
          <button
            type="button"
            onClick={() => handleChange('role', 'recruiter')}
            style={{
              padding: '14px 18px',
              borderRadius: '12px',
              border: formData.role === 'recruiter' ? '2px solid #0D473B' : '1px solid #D1D5DB',
              backgroundColor: formData.role === 'recruiter' ? '#F4FDF6' : '#FFFFFF',
              color: formData.role === 'recruiter' ? '#0D473B' : '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: formData.role === 'recruiter' ? '6px solid #0D473B' : '2px solid #9CA3AF',
              backgroundColor: '#FFFFFF',
              flexShrink: 0
            }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '15px', fontWeight: '700' }}>Job Recruiter</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Hiring top tier talent</div>
            </div>
          </button>

        </div>
      </div>

      {/* Terms Agreement */}
      <p style={{ fontSize: '13px', color: '#6B7280', margin: '0 0 24px 0', lineHeight: '1.5' }}>
        By clicking Register, you agree to the{' '}
        <span style={{ color: '#0284C7', fontWeight: '600', cursor: 'pointer' }}>Terms and Conditions</span>
        {' & '}
        <span style={{ color: '#0284C7', fontWeight: '600', cursor: 'pointer' }}>Privacy Policy</span>
        {' of JobFiesta.'}
      </p>

      {/* Register Button */}
      <button
        type="submit"
        style={{
          width: '100%',
          height: '50px',
          borderRadius: '8px',
          backgroundColor: '#0D473B',
          color: '#FFFFFF',
          fontSize: '16px',
          fontWeight: '700',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(13, 71, 59, 0.15)',
          transition: 'background-color 0.15s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#08332A'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0D473B'}
      >
        <span>Register now</span>
        <ArrowRight size={18} />
      </button>

      {/* Divider & Social */}
      <div style={{ display: 'flex', alignItems: 'center', margin: '30px 0 20px 0' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
        <span style={{ padding: '0 16px', fontSize: '14px', color: '#6B7280' }}>
          or signup with
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: '#E5E7EB' }} />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={onGoogleSignup}
          style={{
            width: '52px',
            height: '48px',
            borderRadius: '10px',
            border: '1px solid #E5E7EB',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.87c2.26-2.09 3.675-5.17 3.675-9.15z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.87-3.05c-1.08.72-2.45 1.16-4.06 1.16-3.13 0-5.78-2.11-6.73-4.96H1.27v3.15C3.26 21.36 7.34 24 12 24z" />
            <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.27C.46 8.23 0 10.06 0 12s.46 3.77 1.27 5.39l4-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.27 6.61l4 3.15c.95-2.85 3.6-4.96 6.73-4.96z" />
          </svg>
        </button>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '15px' }}>
        <span style={{ color: '#0284C7' }}>Already have an account? </span>
        <Link to="/login" style={{ color: '#111827', fontWeight: '700', textDecoration: 'underline' }}>
          Login
        </Link>
      </div>
    </form>
  );
};

export default PrimaryRegisterStep;
