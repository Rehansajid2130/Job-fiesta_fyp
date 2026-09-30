import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import RegistrationProgress from '../components/registration/RegistrationProgress';
import PrimaryRegisterStep from '../components/registration/PrimaryRegisterStep';
import QuestionsStepOne from '../components/registration/QuestionsStepOne';
import QuestionsStepTwo from '../components/registration/QuestionsStepTwo';
import QuestionsStepThree from '../components/registration/QuestionsStepThree';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

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
    setErrorMsg('');

    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.mobileNumber,
        role: formData.role === 'recruiter' ? 'employer' : 'jobseeker',
        headline: formData.role === 'recruiter' ? formData.recruiterTitle : formData.jobTitle,
        location: formData.location || formData.companyAddress || '',
        skills: formData.preferredIndustry ? [formData.preferredIndustry] : [],
        companyDetails: formData.role === 'recruiter' ? {
          companyName: formData.companyName,
          companyWebsite: formData.companyWebsite,
          companySize: formData.teamSize,
          industry: formData.companyIndustry,
        } : undefined,
      };

      const res = await register(payload);
      setLoading(false);

      if (res?.success) {
        setCompletedSuccess(true);
        setTimeout(() => {
          if (formData.role === 'recruiter') {
            navigate('/recruiter-dashboard');
          } else {
            navigate('/jobseeker-dashboard');
          }
        }, 1600);
      } else {
        setErrorMsg(res?.message || 'Registration failed. Please try again.');
      }
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
              margin: 0,
              lineHeight: '1.5'
            }}>
              {currentStep === 'primary'
                ? 'Create your free account to discover opportunities and hire talent.'
                : formData.role === 'jobseeker'
                  ? 'Tell us your preferences so we can match you with the highest-fit opportunities.'
                  : 'Configure your company profile to start posting jobs and connecting with qualified candidates.'}
            </p>
          </div>

          {/* Stepper Progress Bar */}
          <RegistrationProgress 
            currentStep={currentStep} 
            progressPercent={getProgressPercentage()} 
          />

          {/* Form Card */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E5E7EB',
            padding: '36px 32px',
            boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
          }}>

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
                {/* STEP 1: Primary Credentials */}
                {currentStep === 'primary' && (
                  <PrimaryRegisterStep
                    formData={formData}
                    handleChange={handleChange}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    onSubmit={handlePrimarySubmit}
                    onGoogleSignup={() => goToStep('questions_step_1')}
                  />
                )}

                {/* STEP 2: Questions Set 1 */}
                {currentStep === 'questions_step_1' && (
                  <QuestionsStepOne
                    formData={formData}
                    handleChange={handleChange}
                    onBack={() => goToStep('primary')}
                    onSubmit={handleQuestionsStep1Submit}
                  />
                )}

                {/* STEP 3: Questions Set 2 */}
                {currentStep === 'questions_step_2' && (
                  <QuestionsStepTwo
                    formData={formData}
                    handleChange={handleChange}
                    onBack={() => goToStep('questions_step_1')}
                    onSubmit={handleQuestionsStep2Submit}
                  />
                )}

                {/* STEP 4: Questions Set 3 */}
                {currentStep === 'questions_step_3' && (
                  <QuestionsStepThree
                    formData={formData}
                    handleChange={handleChange}
                    onBack={() => goToStep('questions_step_2')}
                    onSubmit={handleFinalSubmit}
                    loading={loading}
                  />
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
          animation: fadeIn 0.25s ease-in-out forwards;
        }

        .fade-step-exit {
          animation: fadeOut 0.2s ease-in-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeOut {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
};

export default RegistrationPage;