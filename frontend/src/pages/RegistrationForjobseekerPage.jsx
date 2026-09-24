import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  Building,
  GraduationCap,
  Globe,
  MapPin,
  DollarSign,
  Mail
} from 'lucide-react';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Step state: 
  // 'primary' (Name, Email, Password, Mobile, Role selector)
  // 'questions_step_1' (2-3 questions)
  // 'questions_step_2' (2-3 questions)
  // 'questions_step_3' (2-3 questions)
  const [currentStep, setCurrentStep] = useState('primary');
  const [animating, setAnimating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [completedSuccess, setCompletedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Primary Core
    fullName: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'jobseeker', // 'jobseeker' or 'recruiter'

    // Job Seeker Specific Questions
    jobTitle: '',
    jobType: 'Full-Time',
    preferredIndustry: 'Technology & Software',
    location: '',
    desiredSalary: '',
    experienceLevel: 'Mid-Level',
    education: '',
    institution: '',
    completionYear: '2026',
    photoName: '',
    careerGoals: '',

    // Recruiter Specific Questions
    recruiterTitle: '',
    hiringExperience: '4-7 Years',
    preferredLanguage: 'English',
    companyName: '',
    companyWebsite: '',
    companyAddress: '',
    companyIndustry: 'Information Technology',
    companyGoals: '',
    teamSize: '10-50 employees'
  });

  const [showPassword, setShowPassword] = useState(false);

  // Step change with smooth fade transition
  const goToStep = (nextStep) => {
    setErrorMsg('');
    setAnimating(true);
    setTimeout(() => {
      setCurrentStep(nextStep);
      setAnimating(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 200);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  // Validation for Step 1
  const handlePrimarySubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    goToStep('questions_step_1');
  };

  // Validation for Profile Questions Step 1
  const handleQuestionsStep1Submit = (e) => {
    e.preventDefault();
    if (formData.role === 'jobseeker') {
      if (!formData.jobTitle.trim()) {
        setErrorMsg('Please specify your target job title.');
        return;
      }
    } else {
      if (!formData.recruiterTitle.trim()) {
        setErrorMsg('Please specify your current role / title.');
        return;
      }
    }
    goToStep('questions_step_2');
  };

  // Validation for Profile Questions Step 2
  const handleQuestionsStep2Submit = (e) => {
    e.preventDefault();
    if (formData.role === 'jobseeker') {
      if (!formData.location.trim()) {
        setErrorMsg('Please enter your city / location.');
        return;
      }
    } else {
      if (!formData.companyName.trim()) {
        setErrorMsg('Please enter your company name.');
        return;
      }
    }
    goToStep('questions_step_3');
  };

  // Final Registration Completion
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(formData.email, formData.password, formData.role);
      setLoading(false);
      setCompletedSuccess(true);

      setTimeout(() => {
        if (formData.role === 'recruiter') {
          navigate('/recruiter-dashboard');
        } else {
          navigate('/jobseeker-dashboard');
        }
      }, 1600);
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    }
  };

  const getProgressPercentage = () => {
    switch (currentStep) {
      case 'primary': return 25;
      case 'questions_step_1': return 50;
      case 'questions_step_2': return 75;
      case 'questions_step_3': return 100;
      default: return 25;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FAFDFB',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      {/* Clean Original Navbar */}
      <Navbar />

      {/* Main Container */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 60px 20px'
      }}>
        <div style={{ width: '100%', maxWidth: '780px' }}>

          {/* Header Title & Subtitle */}
          <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              {currentStep !== 'primary' && (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 'questions_step_1') goToStep('primary');
                    else if (currentStep === 'questions_step_2') goToStep('questions_step_1');
                    else if (currentStep === 'questions_step_3') goToStep('questions_step_2');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#0C463B',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '14px',
                    fontWeight: '600',
                    padding: 0
                  }}
                >
                  <ArrowLeft size={18} /> Back
                </button>
              )}
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#1F2937',
                margin: 0,
                letterSpacing: '-0.02em'
              }}>
                {currentStep === 'primary' 
                  ? 'Registration form'
                  : formData.role === 'jobseeker'
                    ? 'Registration Form For Job seekers'
                    : 'Registration Form For Recruiters'}
              </h1>
            </div>
            
            <p style={{
              fontSize: '15px',
              color: '#6B7280',
              margin: 0
            }}>
              {currentStep === 'primary'
                ? 'Register to apply for jobs of your choice all over the world'
                : `Complete your ${formData.role === 'jobseeker' ? 'Candidate' : 'Employer'} profile to unlock matching recommendations`}
            </p>
          </div>

          {/* Progress Bar (Visible during multi-stage flow) */}
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: '#E5E7EB',
            borderRadius: '9999px',
            marginBottom: '24px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${getProgressPercentage()}%`,
              backgroundColor: '#0D473B',
              borderRadius: '9999px',
              transition: 'width 0.35s ease'
            }} />
          </div>

          {/* Registration Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '32px',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.04)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            padding: '44px 48px',
            position: 'relative'
          }} className="registration-card">

            {/* Error Message Box */}
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
                marginBottom: '20px'
              }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Celebration Toast */}
            {completedSuccess && (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <CheckCircle2 size={64} color="#10B981" style={{ margin: '0 auto 16px auto' }} />
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0C463B', marginBottom: '8px' }}>
                  Account Created Successfully!
                </h2>
                <p style={{ fontSize: '15px', color: '#4B5563' }}>
                  Welcome to JobFiesta! Preparing your personalized dashboard...
                </p>
              </div>
            )}

            {!completedSuccess && (
              <div className={animating ? 'fade-step-exit' : 'fade-step-enter'}>

                {/* ========================================================= */}
                {/* STEP 1: Primary Credentials (Name, Email, Password, Mobile & Role) */}
                {/* ========================================================= */}
                {currentStep === 'primary' && (
                  <form onSubmit={handlePrimarySubmit}>
                    
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
                        onClick={() => goToStep('questions_step_1')}
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
                )}

                {/* ========================================================= */}
                {/* STEP 2: Questions Set 1 (Career / Role Essentials) */}
                {/* ========================================================= */}
                {currentStep === 'questions_step_1' && (
                  <form onSubmit={handleQuestionsStep1Submit}>
                    <div style={{ marginBottom: '24px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Step 1 of 3: Essentials
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
                        {formData.role === 'jobseeker' ? 'What kind of work are you seeking?' : 'Tell us about your recruiting role'}
                      </h3>
                    </div>

                    {formData.role === 'jobseeker' ? (
                      <>
                        {/* Question 1: Job Title */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Target Job Title*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. Senior Frontend Engineer, UX Designer"
                            value={formData.jobTitle}
                            onChange={(e) => handleChange('jobTitle', e.target.value)}
                          />
                        </div>

                        {/* Question 2: Job Type */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Preferred Job Type*</label>
                          <select
                            className="figma-input"
                            value={formData.jobType}
                            onChange={(e) => handleChange('jobType', e.target.value)}
                          >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                          </select>
                        </div>

                        {/* Question 3: Preferred Industry */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Preferred Industry*</label>
                          <select
                            className="figma-input"
                            value={formData.preferredIndustry}
                            onChange={(e) => handleChange('preferredIndustry', e.target.value)}
                          >
                            <option value="Technology & Software">Technology & Software</option>
                            <option value="Product Design & UX">Product Design & UX</option>
                            <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                            <option value="Banking & Finance">Banking & Finance</option>
                            <option value="Marketing & Content">Marketing & Content</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Recruiter Question 1: Job Title */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Your Position / Title*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. Head of Talent Acquisition, HR Director"
                            value={formData.recruiterTitle}
                            onChange={(e) => handleChange('recruiterTitle', e.target.value)}
                          />
                        </div>

                        {/* Recruiter Question 2: Experience */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Hiring Experience Level*</label>
                          <select
                            className="figma-input"
                            value={formData.hiringExperience}
                            onChange={(e) => handleChange('hiringExperience', e.target.value)}
                          >
                            <option value="1-3 Years">Beginner (1-3 Years)</option>
                            <option value="4-7 Years">Mid-Level (4-7 Years)</option>
                            <option value="8+ Years Executive">Advanced / Executive (8+ Years)</option>
                          </select>
                        </div>

                        {/* Recruiter Question 3: Language */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Preferred Language*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. English, Urdu, Bilingual"
                            value={formData.preferredLanguage}
                            onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => goToStep('primary')}
                        style={{
                          flex: 1,
                          height: '48px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#4B5563',
                          fontSize: '15px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        style={{
                          flex: 2,
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: '#0D473B',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>Next: Location & Background</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ========================================================= */}
                {/* STEP 3: Questions Set 2 (Location, Salary / Company Info) */}
                {/* ========================================================= */}
                {currentStep === 'questions_step_2' && (
                  <form onSubmit={handleQuestionsStep2Submit}>
                    <div style={{ marginBottom: '24px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Step 2 of 3: Details
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
                        {formData.role === 'jobseeker' ? 'Location & Salary Expectations' : 'Company & Organization Details'}
                      </h3>
                    </div>

                    {formData.role === 'jobseeker' ? (
                      <>
                        {/* Question 1: Location */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Location / City*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. Lahore, PK or San Francisco, CA (Remote)"
                            value={formData.location}
                            onChange={(e) => handleChange('location', e.target.value)}
                          />
                        </div>

                        {/* Question 2: Desired Salary */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Desired Salary Range*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. 50k - 80k PKR / $120k - $150k"
                            value={formData.desiredSalary}
                            onChange={(e) => handleChange('desiredSalary', e.target.value)}
                          />
                        </div>

                        {/* Question 3: Experience Level */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Experience Level*</label>
                          <select
                            className="figma-input"
                            value={formData.experienceLevel}
                            onChange={(e) => handleChange('experienceLevel', e.target.value)}
                          >
                            <option value="Beginner Level">Beginner Level (0-2 Yrs)</option>
                            <option value="Mid-Level">Mid-Level (3-5 Yrs)</option>
                            <option value="Advanced Level">Advanced / Senior (5+ Yrs)</option>
                          </select>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Question 1: Company Name */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Company Name*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. Nexus Innovations"
                            value={formData.companyName}
                            onChange={(e) => handleChange('companyName', e.target.value)}
                          />
                        </div>

                        {/* Question 2: Company Website */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Company Website*</label>
                          <input
                            type="text"
                            inputMode="url"
                            autoCapitalize="none"
                            autoCorrect="off"
                            id="companyWebsite"
                            name="companyWebsite"
                            className="figma-input"
                            placeholder="e.g. company.com or https://company.com"
                            value={formData.companyWebsite}
                            onChange={(e) => handleChange('companyWebsite', e.target.value)}
                          />
                        </div>

                        {/* Question 3: Company Address */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Company Address / Headquarters*</label>
                          <input
                            type="text"
                            className="figma-input"
                            placeholder="e.g. Silicon Valley, CA / Gulberg, Lahore"
                            value={formData.companyAddress}
                            onChange={(e) => handleChange('companyAddress', e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => goToStep('questions_step_1')}
                        style={{
                          flex: 1,
                          height: '48px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#4B5563',
                          fontSize: '15px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        style={{
                          flex: 2,
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: '#0D473B',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>Next: Qualifications & Goals</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* ========================================================= */}
                {/* STEP 4: Questions Set 3 (Qualifications, Photo & Goals) */}
                {/* ========================================================= */}
                {currentStep === 'questions_step_3' && (
                  <form onSubmit={handleFinalSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#0D473B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Step 3 of 3: Final Polish
                      </span>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>
                        {formData.role === 'jobseeker' ? 'Education, Photo & Career Goals' : 'Hiring Goals & Team Scope'}
                      </h3>
                    </div>

                    {formData.role === 'jobseeker' ? (
                      <>
                        {/* Question 1: Education & Institution */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '22px' }}>
                          <div>
                            <label className="figma-label">Education / Degree*</label>
                            <input
                              type="text"
                              className="figma-input"
                              placeholder="e.g. BS Computer Science"
                              value={formData.education}
                              onChange={(e) => handleChange('education', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="figma-label">Institution / University*</label>
                            <input
                              type="text"
                              className="figma-input"
                              placeholder="e.g. FAST, NUST, Stanford"
                              value={formData.institution}
                              onChange={(e) => handleChange('institution', e.target.value)}
                            />
                          </div>
                        </div>

                        {/* Question 2: Upload Photo / Resume */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Upload Profile Photo / Resume</label>
                          <label style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed #CBD5E1',
                            borderRadius: '12px',
                            padding: '24px',
                            backgroundColor: '#F8FAFC',
                            cursor: 'pointer',
                            transition: 'border-color 0.15s ease'
                          }}>
                            <UploadCloud size={32} color="#0D473B" style={{ marginBottom: '8px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1F2937' }}>
                              {formData.photoName || 'Click or drop file to upload photo'}
                            </span>
                            <span style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                              PNG, JPG, or PDF (Max 5MB)
                            </span>
                            <input
                              type="file"
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                if (e.target.files?.[0]) {
                                  handleChange('photoName', e.target.files[0].name);
                                }
                              }}
                            />
                          </label>
                        </div>

                        {/* Question 3: Career Goals */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Career Goals & Bio*</label>
                          <textarea
                            rows={3}
                            className="figma-input"
                            style={{ height: 'auto', padding: '12px 16px', resize: 'vertical' }}
                            placeholder="Describe what you are looking to achieve in your next role..."
                            value={formData.careerGoals}
                            onChange={(e) => handleChange('careerGoals', e.target.value)}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Question 1: Team Size */}
                        <div style={{ marginBottom: '22px' }}>
                          <label className="figma-label">Current Company Size*</label>
                          <select
                            className="figma-input"
                            value={formData.teamSize}
                            onChange={(e) => handleChange('teamSize', e.target.value)}
                          >
                            <option value="1-10 employees">Startup (1-10 employees)</option>
                            <option value="10-50 employees">Growing Team (10-50 employees)</option>
                            <option value="50-250 employees">Medium Enterprise (50-250 employees)</option>
                            <option value="250+ employees">Large Scale (250+ employees)</option>
                          </select>
                        </div>

                        {/* Question 2: Company Goals */}
                        <div style={{ marginBottom: '26px' }}>
                          <label className="figma-label">Company Hiring Goals & Mission*</label>
                          <textarea
                            rows={4}
                            className="figma-input"
                            style={{ height: 'auto', padding: '12px 16px', resize: 'vertical' }}
                            placeholder="Describe your company's mission and what qualities you look for in candidates..."
                            value={formData.companyGoals}
                            onChange={(e) => handleChange('companyGoals', e.target.value)}
                          />
                        </div>
                      </>
                    )}

                    <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
                      <button
                        type="button"
                        onClick={() => goToStep('questions_step_2')}
                        style={{
                          flex: 1,
                          height: '48px',
                          borderRadius: '8px',
                          border: '1px solid #D1D5DB',
                          backgroundColor: '#FFFFFF',
                          color: '#4B5563',
                          fontSize: '15px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          flex: 2,
                          height: '48px',
                          borderRadius: '8px',
                          backgroundColor: '#0D473B',
                          color: '#FFFFFF',
                          fontSize: '15px',
                          fontWeight: '700',
                          border: 'none',
                          cursor: loading ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <span>{loading ? 'Creating Profile...' : 'Complete & Sign Up'}</span>
                        <Check size={18} />
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}

          </div>

        </div>
      </main>

      {/* Styled Inputs & Animations matching Loginpage */}
      <style>{`
        .figma-label {
          display: block !important;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 15px !important;
          font-weight: 600 !important;
          color: #0284C7 !important;
          margin-bottom: 8px !important;
          letter-spacing: -0.01em !important;
        }

        .figma-input {
          display: block !important;
          width: 100% !important;
          height: 48px !important;
          padding: 12px 16px !important;
          border: 1px solid #D1D5DB !important;
          border-radius: 8px !important;
          background-color: #FFFFFF !important;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          color: #1F2937 !important;
          box-sizing: border-box !important;
          transition: border-color 0.15s ease, box-shadow 0.15s ease !important;
          -webkit-appearance: none !important;
          appearance: none !important;
        }

        .figma-input::placeholder {
          color: #9CA3AF !important;
          font-size: 14px !important;
          font-weight: 400 !important;
          opacity: 1 !important;
        }

        .figma-input:focus {
          outline: none !important;
          border-color: #0284C7 !important;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15) !important;
        }

        .figma-input-password {
          padding-right: 70px !important;
        }

        .figma-show-btn {
          position: absolute !important;
          right: 16px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          background: transparent !important;
          border: none !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          font-size: 14px !important;
          font-weight: 500 !important;
          color: #111827 !important;
          cursor: pointer !important;
          padding: 4px 6px !important;
          user-select: none !important;
        }

        .figma-show-btn:hover {
          color: #0284C7 !important;
        }

        /* Fade-in and fade-out animations */
        .fade-step-enter {
          animation: stepFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .fade-step-exit {
          animation: stepFadeOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes stepFadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes stepFadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-8px);
          }
        }

        @media (max-width: 640px) {
          .registration-card {
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;