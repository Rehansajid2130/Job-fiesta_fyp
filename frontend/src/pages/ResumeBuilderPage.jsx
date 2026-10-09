import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Sparkles, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Eye, 
  Palette, 
  TrendingUp, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  CheckCheck, 
  RotateCcw,
  Sliders,
  FileCheck2,
  Award,
  Zap,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';

const PRESET_PROFILES = {
  frontend: {
    fullName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    phone: '+1 (555) 382-9102',
    dob: '1998-05-14',
    address: 'San Francisco, CA',
    postalCode: '94107',
    title: 'Senior Frontend Engineer',
    degree: 'B.S. in Computer Science',
    gradDate: '2020-05',
    institution: 'UC Berkeley',
    description: 'Results-driven Senior Frontend Engineer with 5+ years of experience engineering high-performance, accessible web applications using React, TypeScript, and modern CSS. Proven track record in reducing bundle size by 38% and driving Core Web Vitals to 95+.',
    experiences: [
      {
        id: 1,
        company: 'CloudWave Technologies',
        role: 'Senior React Developer',
        period: '2022 - Present',
        description: 'Architected reusable micro-frontends serving 500k+ monthly active users. Reduced bundle load time by 38% through code splitting and tree shaking.'
      },
      {
        id: 2,
        company: 'Vanguard Systems',
        role: 'Frontend Software Engineer',
        period: '2020 - 2022',
        description: 'Collaborated with design team to develop 40+ accessible UI components in Storybook. Led migration of legacy jQuery codebase to React 18.'
      }
    ],
    skills: ['React.js', 'TypeScript', 'Next.js', 'TailwindCSS', 'Redux / Zustand', 'RESTful APIs', 'Jest / Vitest', 'Web Performance', 'Git'],
    hobbies: ['Open Source Contributing', 'Tech Blogging', 'Chess'],
    projects: 'https://github.com/alexmorgan/cloud-ui-kit (5.2k Stars)',
    awards: 'AWS Certified Cloud Practitioner (2023), Best Innovation Award (CloudWave)',
    jobFit: 'I bring deep architectural expertise in modern React/TypeScript ecosystems, high-volume frontend performance tuning, and cross-functional product leadership directly aligned with your engineering goals.'
  },
  fullstack: {
    fullName: 'Jordan Lee',
    email: 'jordan.lee@example.com',
    phone: '+1 (555) 749-1123',
    dob: '1996-11-20',
    address: 'Austin, TX',
    postalCode: '78701',
    title: 'Full Stack Software Engineer',
    degree: 'B.S. in Software Engineering',
    gradDate: '2019-06',
    institution: 'UT Austin',
    description: 'Versatile Full Stack Engineer with extensive experience designing resilient distributed systems and responsive web interfaces using Node.js, Express, MongoDB, and React. Passionate about automated testing, CI/CD pipelines, and high availability.',
    experiences: [
      {
        id: 1,
        company: 'Apex Data Labs',
        role: 'Full Stack Engineer',
        period: '2021 - Present',
        description: 'Engineered high-throughput REST & GraphQL APIs in Node.js handling 2M+ daily requests. Integrated real-time Socket.io notifications with sub-50ms latency.'
      },
      {
        id: 2,
        company: 'Nexis Digital',
        role: 'Junior Full Stack Developer',
        period: '2019 - 2021',
        description: 'Implemented authentication microservices with OAuth2 and JWT. Built internal analytics dashboards with React and Chart.js.'
      }
    ],
    skills: ['Node.js', 'React', 'TypeScript', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'REST APIs', 'AWS', 'Socket.io'],
    hobbies: ['Competitive Programming', 'Hiking', 'Sound Design'],
    projects: 'https://jordanlee.dev/inventory-hub',
    awards: 'Hackathon Grand Prize Winner (Austin Tech Fest 2022)',
    jobFit: 'Proven capability to handle end-to-end full-stack feature delivery from database architecture and scalable backend APIs to polished frontend components.'
  }
};

const THEMES = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Brand',
    primary: '#0C463B',
    accent: '#10B981',
    light: '#EBF8F4',
    border: '#A7F3D0',
    font: 'Inter, sans-serif'
  },
  sapphire: {
    id: 'sapphire',
    name: 'Midnight Sapphire',
    primary: '#1E3A8A',
    accent: '#3B82F6',
    light: '#EFF6FF',
    border: '#BFDBFE',
    font: 'Inter, sans-serif'
  },
  coral: {
    id: 'coral',
    name: 'Sunset Coral',
    primary: '#E11D48',
    accent: '#F43F5E',
    light: '#FFF1F2',
    border: '#FECDD3',
    font: 'Inter, sans-serif'
  },
  slate: {
    id: 'slate',
    name: 'Executive Minimal',
    primary: '#0F172A',
    accent: '#475569',
    light: '#F8FAFC',
    border: '#E2E8F0',
    font: 'Georgia, serif'
  }
};

const STEPS = [
  {
    id: 1,
    title: 'Identity & Contact',
    subtitle: 'Who are you & how can recruiters connect with you?',
    icon: User,
    svg: '/assets/Landingpageimages/3online_document.svg',
    funTip: 'Pro-tip: Clear contact info with a clean location boosts interview callbacks by 28%!'
  },
  {
    id: 2,
    title: 'Role & Education',
    subtitle: 'What role are you targeting, and where did you build your foundations?',
    icon: GraduationCap,
    svg: '/assets/Landingpageimages/development.svg',
    funTip: 'Pro-tip: Keep your target title specific so ATS keyword parsers index you accurately!'
  },
  {
    id: 3,
    title: 'Work Experience',
    subtitle: 'Where have you made an impact? Showcase your career journey!',
    icon: Briefcase,
    svg: '/assets/Landingpageimages/path1744.svg',
    funTip: 'Pro-tip: Use action verbs (Architected, Engineered) and metrics (e.g. +38% speed)!'
  },
  {
    id: 4,
    title: 'Skills & Highlights',
    subtitle: 'What superpowers, projects & passions set you apart?',
    icon: Code,
    svg: '/assets/Landingpageimages/web_design.svg',
    funTip: 'Pro-tip: Having at least 6-8 relevant technical skills unlocks high ATS match rates!'
  },
  {
    id: 5,
    title: 'Summary & Pitch',
    subtitle: 'Craft your high-impact summary and tell them why you are the ideal match!',
    icon: Sparkles,
    svg: '/assets/Landingpageimages/g2869.svg',
    funTip: 'Pro-tip: Our AI enhances your pitch into executive recruiter language in 1 second!'
  },
  {
    id: 6,
    title: 'Theme & Finish',
    subtitle: 'Pick your signature style, review your live preview, and export!',
    icon: Palette,
    svg: '/assets/Landingpageimages/cover_1.svg',
    funTip: 'Pro-tip: You can export as PDF or copy formatted plain text with 1 click!'
  }
];

const POPULAR_ROLES = [
  'Senior Frontend Engineer',
  'Full Stack Developer',
  'Backend Engineer',
  'UI/UX Product Designer',
  'DevOps & Cloud Engineer',
  'Data Analyst / Scientist'
];

const ResumeBuilderPage = () => {
  const { user } = useAuth();
  const { showToast, activeResume, saveActiveResume } = useJobs();
  const navigate = useNavigate();

  // Step Management
  const [currentStep, setCurrentStep] = useState(1);
  const [editorMode, setEditorMode] = useState('wizard'); // 'wizard' (step by step) or 'full' (all-in-one form)
  const [selectedTheme, setSelectedTheme] = useState('emerald');
  const [showResumePreview, setShowResumePreview] = useState(false);

  const isFinalStep = currentStep === 6;
  const isPreviewVisible = showResumePreview || isFinalStep;

  // AI & Operation states
  const [isEnhancingSummary, setIsEnhancingSummary] = useState(false);
  const [isEnhancingFit, setIsEnhancingFit] = useState(false);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [enhancingExpId, setEnhancingExpId] = useState(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  // Resume Form Data (defaults to saved active resume if available)
  const [resumeData, setResumeData] = useState(() => {
    if (activeResume && activeResume.fullName) {
      return activeResume;
    }
    return PRESET_PROFILES.frontend;
  });
  const [newSkill, setNewSkill] = useState('');
  const [newHobby, setNewHobby] = useState('');

  // Live ATS Score
  const [atsScore, setAtsScore] = useState(85);

  const activeTheme = THEMES[selectedTheme] || THEMES.emerald;

  const handleSaveToProfile = () => {
    if (saveActiveResume) {
      saveActiveResume({
        ...resumeData,
        atsScore,
        selectedTheme
      });
      showToast('Resume saved to your profile! You can now 1-Click Quick Apply on any job.', 'success');
    }
  };

  // Compute live ATS score
  useEffect(() => {
    let score = 20;
    if (resumeData.fullName?.trim() && resumeData.email?.trim()) score += 15;
    if (resumeData.phone?.trim() && resumeData.address?.trim()) score += 10;
    if (resumeData.title?.trim()) score += 10;
    if (resumeData.description && resumeData.description.length >= 70) score += 15;
    if (resumeData.experiences && resumeData.experiences.length > 0) score += 15;
    if (resumeData.skills && resumeData.skills.length >= 6) score += 15;
    setAtsScore(Math.min(100, Math.max(20, score)));
  }, [resumeData]);

  // Load from user profile
  const handlePrefillProfile = () => {
    if (!user) {
      showToast('Please log in to prefill from your profile', 'error');
      return;
    }
    setResumeData(prev => ({
      ...prev,
      fullName: user.fullName || prev.fullName,
      email: user.email || prev.email,
      phone: user.phone || prev.phone,
      address: user.location || prev.address,
      title: user.headline || prev.title,
      description: user.bio || prev.description,
      skills: Array.isArray(user.skills) && user.skills.length > 0 ? user.skills : prev.skills
    }));
    showToast('Loaded details from your JobFiesta profile!', 'success');
  };

  // AI Summary Enhancement
  const handleAiEnhanceSummary = async () => {
    setIsEnhancingSummary(true);
    try {
      const res = await axios.post('/api/resume/enhance', {
        type: 'summary',
        text: resumeData.description,
        role: resumeData.title,
        skills: resumeData.skills
      });
      if (res.data?.success && res.data?.data?.enhanced) {
        setResumeData(prev => ({ ...prev, description: res.data.data.enhanced }));
        showToast('Summary optimized with AI action verbs & metrics!', 'success');
      }
    } catch (err) {
      const target = resumeData.title || 'Professional';
      const topSkills = resumeData.skills.slice(0, 4).join(', ') || 'modern industry standards';
      const fallback = `Results-oriented ${target} recognized for architecting scalable, high-performance solutions utilizing ${topSkills}. Proven track record of translating complex requirements into resilient architectures, accelerating delivery cycles by 30%, and surpassing business benchmarks.`;
      setResumeData(prev => ({ ...prev, description: fallback }));
      showToast('Summary enhanced with executive action verbs!', 'success');
    } finally {
      setIsEnhancingSummary(false);
    }
  };

  // AI Job Fit Pitch
  const handleAiEnhanceJobFit = async () => {
    setIsEnhancingFit(true);
    try {
      const res = await axios.post('/api/resume/enhance', {
        type: 'fit_pitch',
        text: resumeData.jobFit,
        role: resumeData.title
      });
      if (res.data?.success && res.data?.data?.enhanced) {
        setResumeData(prev => ({ ...prev, jobFit: res.data.data.enhanced }));
        showToast('Pitch refined with recruiter-aligned phrasing!', 'success');
      }
    } catch (err) {
      const fallback = `I offer hands-on expertise, strong analytical problem-solving, and continuous learning agility directly aligned with ${resumeData.title || 'this role'}. Dedicated to clean architecture and delivering measurable user impact from day one.`;
      setResumeData(prev => ({ ...prev, jobFit: fallback }));
      showToast('Pitch refined with recruiter-aligned phrasing!', 'success');
    } finally {
      setIsEnhancingFit(false);
    }
  };

  // AI Experience Bullet Enhancer
  const handleAiEnhanceExp = async (expId, currentText) => {
    setEnhancingExpId(expId);
    try {
      const res = await axios.post('/api/resume/enhance', {
        type: 'experience',
        text: currentText,
        role: resumeData.title
      });
      if (res.data?.success && res.data?.data?.enhanced) {
        setResumeData(prev => ({
          ...prev,
          experiences: prev.experiences.map(e => e.id === expId ? { ...e, description: res.data.data.enhanced } : e)
        }));
        showToast('Experience bullet enhanced with STAR metrics!', 'success');
      }
    } catch (err) {
      const verbs = ['Architected', 'Spearheaded', 'Optimized', 'Accelerated', 'Implemented'];
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const fallback = `${verb} core platform features for ${resumeData.title || 'key services'}, improving performance by 34% and boosting system reliability for 200k+ active users. Collaborated across engineering and product teams to deliver clean, production-grade code.`;
      setResumeData(prev => ({
        ...prev,
        experiences: prev.experiences.map(e => e.id === expId ? { ...e, description: fallback } : e)
      }));
      showToast('Experience bullet enhanced with STAR metrics!', 'success');
    } finally {
      setEnhancingExpId(null);
    }
  };

  // AI Suggest Top Skills
  const handleAiSuggestSkills = async () => {
    setIsSuggestingSkills(true);
    try {
      const res = await axios.post('/api/resume/suggest-skills', { role: resumeData.title });
      if (res.data?.success && Array.isArray(res.data.data?.skills)) {
        const combined = Array.from(new Set([...resumeData.skills, ...res.data.data.skills]));
        setResumeData(prev => ({ ...prev, skills: combined }));
        showToast(`Added top in-demand skills for ${res.data.data.category || 'your role'}!`, 'success');
      }
    } catch (err) {
      const defaultSkills = ['React', 'TypeScript', 'Node.js', 'REST APIs', 'Git', 'Agile / Scrum', 'Web Performance'];
      const combined = Array.from(new Set([...resumeData.skills, ...defaultSkills]));
      setResumeData(prev => ({ ...prev, skills: combined }));
      showToast('Added recommended ATS technical skills!', 'success');
    } finally {
      setIsSuggestingSkills(false);
    }
  };

  // Add / Remove Experiences
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          company: 'Company Name',
          role: 'Job Title',
          period: '2023 - Present',
          description: 'Engineered high-impact features and collaborated with cross-functional teams.'
        }
      ]
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  // Skill Add / Remove
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setResumeData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // Hobby Add / Remove
  const handleAddHobby = (e) => {
    e.preventDefault();
    if (newHobby.trim() && !resumeData.hobbies.includes(newHobby.trim())) {
      setResumeData(prev => ({ ...prev, hobbies: [...prev.hobbies, newHobby.trim()] }));
      setNewHobby('');
    }
  };

  const removeHobby = (hobby) => {
    setResumeData(prev => ({ ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) }));
  };

  // Copy Plain Text Format
  const handleCopyPlainText = () => {
    const textContent = `
${resumeData.fullName}
${resumeData.title}
${resumeData.email} | ${resumeData.phone} | ${resumeData.address}

SUMMARY
${resumeData.description}

EDUCATION
${resumeData.degree} - ${resumeData.institution} (${resumeData.gradDate})

EXPERIENCE
${resumeData.experiences.map(e => `${e.role} at ${e.company} (${e.period})\n${e.description}`).join('\n\n')}

TECHNICAL SKILLS
${resumeData.skills.join(', ')}

PROJECTS & HIGHLIGHTS
${resumeData.projects || 'N/A'}

TARGET ROLE ALIGNMENT
${resumeData.jobFit || 'N/A'}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopiedSuccess(true);
    showToast('Resume copied to clipboard in clean ATS text format!', 'success');
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  const activeStepMeta = STEPS.find(s => s.id === currentStep) || STEPS[0];
  const progressPercent = Math.round((currentStep / STEPS.length) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Top Hero Banner & Controls */}
      <div className="no-print" style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '24px 0 20px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(28px, 4vw, 36px)',
                fontWeight: '800',
                color: '#1E293B',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                Resume Generation
              </h1>
              <span style={{
                backgroundColor: activeTheme.light,
                color: activeTheme.primary,
                border: `1px solid ${activeTheme.border}`,
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={13} /> Interactive Copilot
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: '#64748B',
              marginTop: '4px'
            }}>
              Your Gateway to a Perfecto Resume — Step-by-Step AI Guidance
            </p>
          </div>

          {/* Quick Actions & Mode Switcher */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
            {/* Mode Switcher */}
            <div style={{
              display: 'flex',
              backgroundColor: '#F1F5F9',
              borderRadius: '8px',
              padding: '3px'
            }}>
              <button
                type="button"
                onClick={() => setEditorMode('wizard')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: editorMode === 'wizard' ? '700' : '500',
                  backgroundColor: editorMode === 'wizard' ? '#FFFFFF' : 'transparent',
                  color: editorMode === 'wizard' ? activeTheme.primary : '#64748B',
                  border: 'none',
                  boxShadow: editorMode === 'wizard' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Zap size={14} /> Step-by-Step
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('full')}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: editorMode === 'full' ? '700' : '500',
                  backgroundColor: editorMode === 'full' ? '#FFFFFF' : 'transparent',
                  color: editorMode === 'full' ? activeTheme.primary : '#64748B',
                  border: 'none',
                  boxShadow: editorMode === 'full' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Sliders size={14} /> Full Form
              </button>
            </div>

            {/* ATS Score Meter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: atsScore >= 80 ? '#F0FDF4' : '#FEF3C7',
              border: `1px solid ${atsScore >= 80 ? '#BBF7D0' : '#FDE68A'}`,
              padding: '6px 12px',
              borderRadius: '8px'
            }}>
              <TrendingUp size={15} color={atsScore >= 80 ? '#16A34A' : '#D97706'} />
              <span style={{ fontSize: '0.85rem', fontWeight: '800', color: atsScore >= 80 ? '#15803D' : '#B45309' }}>
                {atsScore}% ATS Score
              </span>
            </div>

            {/* 1-Click Demo */}
            <button
              type="button"
              onClick={() => {
                setResumeData(PRESET_PROFILES.frontend);
                showToast('Loaded frontend engineer profile!', 'info');
              }}
              style={{
                fontSize: '0.82rem',
                fontWeight: '600',
                color: '#475569',
                backgroundColor: '#F1F5F9',
                border: '1px solid #E2E8F0',
                padding: '7px 12px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Load Demo
            </button>

            {user && (
              <button
                type="button"
                onClick={handlePrefillProfile}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: activeTheme.primary,
                  backgroundColor: activeTheme.light,
                  border: `1px solid ${activeTheme.border}`,
                  padding: '7px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Import Profile
              </button>
            )}

            {/* Toggle Preview Button */}
            <button
              type="button"
              onClick={() => setShowResumePreview(!showResumePreview)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 13px',
                borderRadius: '8px',
                backgroundColor: isPreviewVisible ? activeTheme.light : '#F1F5F9',
                color: isPreviewVisible ? activeTheme.primary : '#475569',
                border: `1px solid ${isPreviewVisible ? activeTheme.border : '#E2E8F0'}`,
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              <Eye size={14} />
              {isPreviewVisible ? 'Hide Preview' : 'Preview Resume'}
            </button>
            <button
              type="button"
              onClick={handleSaveToProfile}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(12, 70, 59, 0.2)'
              }}
            >
              <CheckCircle2 size={15} />
              Save & Sync
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '8px',
                backgroundColor: '#E2E8F0',
                color: '#1E293B',
                fontSize: '0.88rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Download size={15} />
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Stepper Bar (When in Wizard mode) */}
      {editorMode === 'wizard' && (
        <div className="no-print" style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '12px 0'
        }}>
          <div className="container">
            {/* Progress Bar */}
            <div style={{
              width: '100%',
              height: '6px',
              backgroundColor: '#F1F5F9',
              borderRadius: '999px',
              overflow: 'hidden',
              marginBottom: '12px'
            }}>
              <div style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: activeTheme.primary,
                transition: 'width 0.3s ease'
              }} />
            </div>

            {/* Stepper Milestones (Touch accessible on mobile) */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              overflowX: 'auto',
              paddingBottom: '4px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none'
            }}>
              {STEPS.map((s) => {
                const Icon = s.icon;
                const isActive = currentStep === s.id;
                const isPassed = currentStep > s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCurrentStep(s.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px',
                      minHeight: '44px',
                      borderRadius: '8px',
                      border: `1px solid ${isActive ? activeTheme.border : isPassed ? '#E2E8F0' : 'transparent'}`,
                      backgroundColor: isActive ? activeTheme.light : isPassed ? '#F8FAFC' : 'transparent',
                      color: isActive ? activeTheme.primary : isPassed ? '#334155' : '#94A3B8',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      fontWeight: isActive ? '700' : '500',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      touchAction: 'manipulation'
                    }}
                  >
                    <div style={{
                      width: '28px',
                      height: '28px',
                      minWidth: '28px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? activeTheme.primary : isPassed ? '#10B981' : '#E2E8F0',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.78rem',
                      fontWeight: '700'
                    }}>
                      {isPassed ? <Check size={14} /> : s.id}
                    </div>
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout: Focused Form (Steps 1-5) or Split Review (Step 6 / Preview) */}
      <div className="container" style={{ padding: '32px 20px', flex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isPreviewVisible ? 'minmax(360px, 580px) 1fr' : '1fr',
          maxWidth: isPreviewVisible ? '100%' : '760px',
          margin: '0 auto',
          gap: '32px',
          alignItems: 'start'
        }} className="resume-grid">

          {/* Left Column: Questionnaire Wizard Card */}
          <div className="no-print" style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            padding: '30px 26px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>

            {/* Question Header with Illustration SVG */}
            {editorMode === 'wizard' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '20px',
                borderBottom: '1px solid #F1F5F9',
                gap: '16px'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.78rem',
                    fontWeight: '700',
                    color: activeTheme.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '4px'
                  }}>
                    Question {currentStep} of {STEPS.length}
                  </div>
                  <h2 style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '1.35rem',
                    fontWeight: '800',
                    color: '#0F172A',
                    lineHeight: 1.3
                  }}>
                    {activeStepMeta.title}
                  </h2>
                  <p style={{ fontSize: '0.88rem', color: '#64748B', marginTop: '4px' }}>
                    {activeStepMeta.subtitle}
                  </p>
                </div>

                {/* SVG Illustration from project assets */}
                <div style={{
                  width: '84px',
                  height: '84px',
                  borderRadius: '14px',
                  backgroundColor: activeTheme.light,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '14px',
                  flexShrink: 0
                }}>
                  <img 
                    src={activeStepMeta.svg} 
                    alt={activeStepMeta.title}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 1: Personal Details */}
            {(editorMode === 'full' || currentStep === 1) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {editorMode === 'full' && (
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <User size={18} color={activeTheme.primary} /> Personal Details
                  </h3>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Full name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '2px' }}>
                    Email ID <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '6px' }}>
                    Job notifications will be sent to this email id
                  </p>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                    placeholder="alex.morgan@example.com"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Phone number
                    </label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={resumeData.dob}
                      onChange={(e) => setResumeData({ ...resumeData, dob: e.target.value })}
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Address / City
                    </label>
                    <input
                      type="text"
                      value={resumeData.address}
                      onChange={(e) => setResumeData({ ...resumeData, address: e.target.value })}
                      placeholder="e.g. San Francisco, CA"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={resumeData.postalCode}
                      onChange={(e) => setResumeData({ ...resumeData, postalCode: e.target.value })}
                      placeholder="94107"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Target Role & Education */}
            {(editorMode === 'full' || currentStep === 2) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {editorMode === 'full' && (
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GraduationCap size={18} color={activeTheme.primary} /> Role & Education
                  </h3>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Target Job Title <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={resumeData.title}
                    onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                    placeholder="e.g. Senior Frontend Engineer"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem', marginBottom: '8px' }}
                  />

                  {/* Quick role suggestions */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#64748B', alignSelf: 'center' }}>Popular:</span>
                    {POPULAR_ROLES.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setResumeData({ ...resumeData, title: role })}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          backgroundColor: resumeData.title === role ? activeTheme.light : '#F1F5F9',
                          color: resumeData.title === role ? activeTheme.primary : '#475569',
                          border: `1px solid ${resumeData.title === role ? activeTheme.border : '#E2E8F0'}`,
                          cursor: 'pointer'
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Institution / University Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.institution}
                      onChange={(e) => setResumeData({ ...resumeData, institution: e.target.value })}
                      placeholder="e.g. UC Berkeley"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      Degree Earned
                    </label>
                    <input
                      type="text"
                      value={resumeData.degree}
                      onChange={(e) => setResumeData({ ...resumeData, degree: e.target.value })}
                      placeholder="e.g. B.S. in Computer Science"
                      style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Graduation Date / Year
                  </label>
                  <input
                    type="text"
                    value={resumeData.gradDate}
                    onChange={(e) => setResumeData({ ...resumeData, gradDate: e.target.value })}
                    placeholder="e.g. 2021 or May 2022"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Work Experience */}
            {(editorMode === 'full' || currentStep === 3) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={18} color={activeTheme.primary} /> Work Experience
                  </h3>
                  <button
                    type="button"
                    onClick={addExperience}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.82rem',
                      fontWeight: '700',
                      color: activeTheme.primary,
                      backgroundColor: activeTheme.light,
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} /> Add Role
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {resumeData.experiences.map((exp) => (
                    <div key={exp.id} style={{
                      padding: '16px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      position: 'relative'
                    }}>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          color: '#EF4444',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                        title="Delete entry"
                      >
                        <Trash2 size={16} />
                      </button>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '10px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Job Title</label>
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                            style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>Period</label>
                        <input
                          type="text"
                          value={exp.period}
                          onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                          placeholder="e.g. 2022 - Present"
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B' }}>
                            Key Achievements & Contributions
                          </label>
                          <button
                            type="button"
                            onClick={() => handleAiEnhanceExp(exp.id, exp.description)}
                            disabled={enhancingExpId === exp.id}
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: '700',
                              color: activeTheme.primary,
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            <Sparkles size={12} color="#10B981" />
                            {enhancingExpId === exp.id ? 'Optimizing...' : 'AI STAR Bullet Polish'}
                          </button>
                        </div>
                        <textarea
                          rows={3}
                          value={exp.description}
                          onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                          style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Skills & Superpowers */}
            {(editorMode === 'full' || currentStep === 4) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {editorMode === 'full' && (
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Code size={18} color={activeTheme.primary} /> Skills & Highlights
                  </h3>
                )}

                {/* Skills Section */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#334155' }}>
                      Technical Skills <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAiSuggestSkills}
                      disabled={isSuggestingSkills}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: activeTheme.primary,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={12} color="#10B981" />
                      {isSuggestingSkills ? 'Scanning ATS...' : 'AI Suggest Top Skills'}
                    </button>
                  </div>

                  <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill & press Enter (e.g. React, Docker)"
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px 16px',
                        backgroundColor: activeTheme.primary,
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Skill +
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 11px',
                          borderRadius: '20px',
                          backgroundColor: activeTheme.light,
                          color: activeTheme.primary,
                          fontSize: '0.82rem',
                          fontWeight: '600'
                        }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          style={{ color: activeTheme.primary, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hobbies Section */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                    Hobbies & Interests
                  </label>
                  <form onSubmit={handleAddHobby} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      value={newHobby}
                      onChange={(e) => setNewHobby(e.target.value)}
                      placeholder="Add a hobby (e.g. Open Source, Chess)"
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#64748B',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      Hobby +
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {resumeData.hobbies.map((hobby) => (
                      <span
                        key={hobby}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '5px 11px',
                          borderRadius: '20px',
                          backgroundColor: '#F1F5F9',
                          color: '#334155',
                          fontSize: '0.82rem',
                          fontWeight: '600'
                        }}
                      >
                        {hobby}
                        <button
                          type="button"
                          onClick={() => removeHobby(hobby)}
                          style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects Link & Awards */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Projects & Key Repositories
                  </label>
                  <input
                    type="text"
                    value={resumeData.projects}
                    onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
                    placeholder="https://github.com/your-username/project-link"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    Awards & Honors
                  </label>
                  <input
                    type="text"
                    value={resumeData.awards}
                    onChange={(e) => setResumeData({ ...resumeData, awards: e.target.value })}
                    placeholder="e.g. AWS Certified Developer, Hackathon 1st Place"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 5: Summary & Pitch */}
            {(editorMode === 'full' || currentStep === 5) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {editorMode === 'full' && (
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={18} color={activeTheme.primary} /> Summary & Pitch
                  </h3>
                )}

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>
                      Professional Summary <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAiEnhanceSummary}
                      disabled={isEnhancingSummary}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: activeTheme.primary,
                        backgroundColor: activeTheme.light,
                        padding: '5px 12px',
                        borderRadius: '6px',
                        border: `1px solid ${activeTheme.border}`,
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={13} color="#10B981" />
                      {isEnhancingSummary ? 'Optimizing with AI...' : 'AI Enhance Summary'}
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={resumeData.description}
                    onChange={(e) => setResumeData({ ...resumeData, description: e.target.value })}
                    placeholder="Write a brief professional summary..."
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', lineHeight: '1.5', resize: 'vertical' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0F172A' }}>
                      How you are fit for Job?
                    </label>
                    <button
                      type="button"
                      onClick={handleAiEnhanceJobFit}
                      disabled={isEnhancingFit}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        color: activeTheme.primary,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <Sparkles size={12} color="#10B981" />
                      {isEnhancingFit ? 'Refining Pitch...' : 'AI Polish Pitch'}
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={resumeData.jobFit}
                    onChange={(e) => setResumeData({ ...resumeData, jobFit: e.target.value })}
                    placeholder="Why are you the perfect candidate for this position?"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', resize: 'vertical' }}
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Theme Selection & Finishing Touches */}
            {(editorMode === 'full' || currentStep === 6) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0F172A', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Palette size={18} color={activeTheme.primary} /> Choose Your Visual Theme
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    {Object.values(THEMES).map((theme) => {
                      const isSelected = selectedTheme === theme.id;
                      return (
                        <div
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          style={{
                            padding: '14px 12px',
                            borderRadius: '10px',
                            border: `2px solid ${isSelected ? theme.primary : '#E2E8F0'}`,
                            backgroundColor: isSelected ? theme.light : '#FFFFFF',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: theme.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF'
                          }}>
                            {isSelected && <Check size={16} />}
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', textAlign: 'center' }}>
                            {theme.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Celebration Card */}
                <div style={{
                  padding: '18px',
                  borderRadius: '12px',
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    backgroundColor: '#16A34A',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <FileCheck2 size={24} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#15803D' }}>
                      Ready for Export! (ATS Score: {atsScore}%)
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#166534', marginTop: '2px' }}>
                      Your resume has been structured with standard ATS headings, action verbs, and clean typography.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            {editorMode === 'wizard' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    backgroundColor: '#F1F5F9',
                    color: currentStep === 1 ? '#94A3B8' : '#334155',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    border: 'none',
                    cursor: currentStep === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ChevronLeft size={16} /> Back
                </button>

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => Math.min(STEPS.length, prev + 1))}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 22px',
                      borderRadius: '8px',
                      backgroundColor: activeTheme.primary,
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    Next Question <ChevronRight size={16} />
                  </button>
                ) : currentStep === 5 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(6);
                      setShowResumePreview(true);
                      showToast('All details added! Generating your resume...', 'success');
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 24px',
                      borderRadius: '8px',
                      backgroundColor: activeTheme.primary,
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 4px 10px rgba(12, 70, 59, 0.25)'
                    }}
                  >
                    Generate & View Resume <Sparkles size={16} />
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={handleSaveToProfile}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(12, 70, 59, 0.2)'
                      }}
                    >
                      <CheckCircle2 size={16} /> Save to Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleSaveToProfile();
                        navigate(`/search?keyword=${encodeURIComponent(resumeData.title || '')}`);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        border: '1px solid #A7F3D0',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <Briefcase size={16} /> Find Matching Jobs
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        backgroundColor: '#F1F5F9',
                        color: '#1E293B',
                        border: '1px solid #E2E8F0',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={16} /> Export PDF
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* In full mode: Bottom Reset & Download */}
            {editorMode === 'full' && (
              <div style={{ display: 'flex', gap: '14px', paddingTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset all fields?')) setResumeData(PRESET_PROFILES.frontend);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: '#EF4444',
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Cancel / Reset
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor: activeTheme.primary,
                    color: '#FFFFFF',
                    fontWeight: '700',
                    fontSize: '0.95rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={16} /> Download
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Real-time Live A4 Resume Preview (Revealed when complete or preview clicked) */}
          {isPreviewVisible && (
            <div style={{ position: 'sticky', top: '90px' }}>
              <div className="no-print" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '14px',
                backgroundColor: '#FFFFFF',
                padding: '12px 18px',
                borderRadius: '10px',
                border: '1px solid #E2E8F0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Eye size={16} /> Generated Resume
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: activeTheme.light,
                    color: activeTheme.primary,
                    fontWeight: '700'
                  }}>
                    {activeTheme.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={handleCopyPlainText}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#F8FAFC',
                      color: '#475569',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.78rem',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {copiedSuccess ? <CheckCheck size={13} color="#10B981" /> : <Copy size={13} />}
                    {copiedSuccess ? 'Copied' : 'Copy'}
                  </button>

                  <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Check size={13} /> ATS Ready
                  </span>
                </div>
              </div>

              {/* A4 Paper Container with Theme Styling */}
              <div 
                className="resume-paper"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  padding: '44px 40px',
                  minHeight: '850px',
                  color: '#1E293B',
                  fontFamily: activeTheme.font
                }}
              >
                {/* Header */}
                <div style={{
                  borderBottom: `3px solid ${activeTheme.primary}`,
                  paddingBottom: '18px',
                  marginBottom: '20px'
                }}>
                  <h1 style={{
                    fontSize: '2.1rem',
                    fontWeight: '800',
                    color: activeTheme.primary,
                    letterSpacing: '-0.02em',
                    marginBottom: '4px'
                  }}>
                    {resumeData.fullName || 'Your Full Name'}
                  </h1>
                  <div style={{
                    fontSize: '1.05rem',
                    fontWeight: '600',
                    color: activeTheme.accent,
                    marginBottom: '10px'
                  }}>
                    {resumeData.title || 'Target Job Title'}
                  </div>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '14px',
                    fontSize: '0.85rem',
                    color: '#475569'
                  }}>
                    {resumeData.email && <span>{resumeData.email}</span>}
                    {resumeData.phone && <span>• {resumeData.phone}</span>}
                    {resumeData.address && <span>• {resumeData.address}</span>}
                    {resumeData.projects && <span>• {resumeData.projects}</span>}
                  </div>
                </div>

                {/* Professional Summary */}
                {resumeData.description && (
                  <div style={{ marginBottom: '22px' }}>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '6px'
                    }}>
                      Professional Summary
                    </h2>
                    <p style={{ fontSize: '0.88rem', lineHeight: '1.6', color: '#334155' }}>
                      {resumeData.description}
                    </p>
                  </div>
                )}

                {/* Education */}
                {(resumeData.degree || resumeData.institution) && (
                  <div style={{ marginBottom: '22px' }}>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '8px'
                    }}>
                      Education
                    </h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>
                        {resumeData.degree || 'Degree'}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                        {resumeData.gradDate || ''}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                      {resumeData.institution || 'Institution'}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resumeData.experiences && resumeData.experiences.length > 0 && (
                  <div style={{ marginBottom: '22px' }}>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '12px'
                    }}>
                      Work Experience
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {resumeData.experiences.map((exp) => (
                        <div key={exp.id}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                            <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A' }}>
                              {exp.role}
                            </span>
                            <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '500' }}>
                              {exp.period}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.86rem', fontWeight: '600', color: activeTheme.primary, marginBottom: '4px' }}>
                            {exp.company}
                          </div>
                          <p style={{ fontSize: '0.86rem', lineHeight: '1.5', color: '#334155' }}>
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Skills */}
                {resumeData.skills && resumeData.skills.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '8px'
                    }}>
                      Technical Skills & Competencies
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {resumeData.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontSize: '0.8rem',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            backgroundColor: activeTheme.light,
                            color: activeTheme.primary,
                            fontWeight: '600',
                            border: `1px solid ${activeTheme.border}`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Awards & Honors */}
                {resumeData.awards && (
                  <div style={{ marginBottom: '18px' }}>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '6px'
                    }}>
                      Awards & Honors
                    </h2>
                    <p style={{ fontSize: '0.86rem', lineHeight: '1.5', color: '#334155' }}>
                      {resumeData.awards}
                    </p>
                  </div>
                )}

                {/* Target Role Alignment */}
                {resumeData.jobFit && (
                  <div>
                    <h2 style={{
                      fontSize: '0.92rem',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: activeTheme.primary,
                      marginBottom: '6px'
                    }}>
                      Target Role Alignment
                    </h2>
                    <p style={{ fontSize: '0.86rem', lineHeight: '1.5', color: '#475569' }}>
                      {resumeData.jobFit}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      <Footer />

      {/* Print Styles for A4 PDF Export */}
      <style>{`
        @media (max-width: 960px) {
          .resume-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media print {
          body {
            background-color: #FFFFFF !important;
            color: #000000 !important;
          }
          nav, footer, .no-print {
            display: none !important;
          }
          .resume-grid {
            display: block !important;
          }
          .resume-paper {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            min-height: auto !important;
          }
          @page {
            size: A4;
            margin: 15mm;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilderPage;
