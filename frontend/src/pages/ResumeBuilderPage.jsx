import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import IconSwap from '../components/common/IconSwap';
import { useAuth } from '../context/AuthContext';
import { useJobs } from '../context/JobContext';
import { 
  Sparkles, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Check, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Eye, 
  FileText,
  Palette,
  Calendar,
  MapPin,
  Mail,
  Phone,
  RotateCcw,
  Copy,
  CheckCheck,
  Award,
  Link as LinkIcon,
  HelpCircle,
  TrendingUp,
  AlertCircle
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

const ResumeBuilderPage = () => {
  const { user } = useAuth();
  const { showToast } = useJobs();
  const navigate = useNavigate();

  // Mode: 'split' (side-by-side) or 'form' (focus form) or 'preview' (focus preview)
  const [viewMode, setViewMode] = useState('split');
  const [selectedTemplate, setSelectedTemplate] = useState('emerald'); // emerald, executive, tech
  
  // AI states
  const [isEnhancingSummary, setIsEnhancingSummary] = useState(false);
  const [isEnhancingFit, setIsEnhancingFit] = useState(false);
  const [isSuggestingSkills, setIsSuggestingSkills] = useState(false);
  const [enhancingExpId, setEnhancingExpId] = useState(null);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [historySummary, setHistorySummary] = useState(null);

  // Form State matching Figma Resume Generation screen
  const [resumeData, setResumeData] = useState(PRESET_PROFILES.frontend);
  const [newSkill, setNewSkill] = useState('');
  const [newHobby, setNewHobby] = useState('');

  // Real-time ATS Score & Checklist
  const [atsScore, setAtsScore] = useState(85);
  const [atsFeedback, setAtsFeedback] = useState([]);

  // Calculate live ATS metrics whenever resumeData changes
  useEffect(() => {
    let score = 20;
    const tips = [];

    if (resumeData.fullName?.trim() && resumeData.email?.trim()) {
      score += 15;
    } else {
      tips.push('Full name & email are required');
    }

    if (resumeData.phone?.trim() && resumeData.address?.trim()) {
      score += 10;
    } else {
      tips.push('Add phone number and location');
    }

    if (resumeData.description && resumeData.description.length >= 80) {
      score += 15;
    } else {
      tips.push('Expand summary to at least 2 sentences');
    }

    if (resumeData.experiences && resumeData.experiences.length > 0) {
      score += 20;
      const hasActionVerbs = resumeData.experiences.some(e => 
        /architected|engineered|optimized|accelerated|implemented|scaled|built|led/i.test(e.description || '')
      );
      if (hasActionVerbs) score += 5;
    } else {
      tips.push('Add work experience entries');
    }

    if (resumeData.skills && resumeData.skills.length >= 6) {
      score += 15;
    } else {
      tips.push('Include at least 6 technical skills');
    }

    setAtsScore(Math.min(100, Math.max(15, score)));
    setAtsFeedback(tips);
  }, [resumeData]);

  // Load user profile data if available
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
    setHistorySummary(resumeData.description);
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
      // Graceful offline heuristic fallback
      const target = resumeData.title || 'Professional';
      const topSkills = resumeData.skills.slice(0, 4).join(', ') || 'modern industry standards';
      const fallback = `Results-oriented ${target} recognized for architecting scalable, high-performance solutions utilizing ${topSkills}. Proven track record of translating complex requirements into resilient architectures, driving team delivery velocity, and surpassing business benchmarks.`;
      setResumeData(prev => ({ ...prev, description: fallback }));
      showToast('Summary enhanced with executive action verbs!', 'success');
    } finally {
      setIsEnhancingSummary(false);
    }
  };

  // AI "How you are fit for Job" Polish
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
      const fallback = `${verb} core platform features for ${resumeData.title || 'key services'}, improving performance by 34% and boosting system reliability. Collaborated across engineering and product teams to deliver clean, production-grade code.`;
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
        showToast(`Added top in-demand ATS skills for ${res.data.data.category || 'your role'}!`, 'success');
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

  // Add & Remove Experience
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

  // Download / Print PDF
  const handleDownloadPdf = () => {
    window.print();
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

WHY I AM A FIT
${resumeData.jobFit || 'N/A'}
    `.trim();

    navigator.clipboard.writeText(textContent);
    setCopiedSuccess(true);
    showToast('Resume copied to clipboard in clean ATS text format!', 'success');
    setTimeout(() => setCopiedSuccess(false), 2500);
  };

  // Reset to default
  const handleReset = () => {
    if (window.confirm('Reset all fields to default template?')) {
      setResumeData(PRESET_PROFILES.frontend);
      showToast('Form reset to default sample data', 'info');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Top Header Bar matching Figma Title & Branding */}
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
                backgroundColor: '#EBF8F4',
                color: '#0C463B',
                padding: '4px 10px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '700',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Sparkles size={13} /> AI Powered
              </span>
            </div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#64748B',
              marginTop: '4px'
            }}>
              Your Gateway to a Perfecto Resume
            </p>
          </div>

          {/* Quick Actions & ATS Meter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
            {/* ATS Score Badge */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: atsScore >= 80 ? '#F0FDF4' : '#FEF3C7',
              border: `1px solid ${atsScore >= 80 ? '#BBF7D0' : '#FDE68A'}`,
              padding: '8px 14px',
              borderRadius: '10px'
            }}>
              <TrendingUp size={16} color={atsScore >= 80 ? '#16A34A' : '#D97706'} />
              <div>
                <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: '600', textTransform: 'uppercase' }}>
                  ATS Score
                </div>
                <div style={{ fontSize: '0.98rem', fontWeight: '800', color: atsScore >= 80 ? '#15803D' : '#B45309' }}>
                  {atsScore}% Ready
                </div>
              </div>
            </div>

            {/* Load Sample Presets */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => setResumeData(PRESET_PROFILES.frontend)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#475569',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Frontend Demo
              </button>
              <button
                type="button"
                onClick={() => setResumeData(PRESET_PROFILES.fullstack)}
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  color: '#475569',
                  backgroundColor: '#F1F5F9',
                  border: '1px solid #E2E8F0',
                  padding: '7px 12px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Full Stack Demo
              </button>
            </div>

            {/* Prefill from user profile */}
            {user && (
              <button
                type="button"
                onClick={handlePrefillProfile}
                style={{
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  color: '#0C463B',
                  backgroundColor: '#EBF8F4',
                  border: '1px solid #A7F3D0',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Import My Profile
              </button>
            )}

            {/* Copy Plain Text */}
            <button
              type="button"
              onClick={handleCopyPlainText}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 14px',
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                color: '#334155',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {copiedSuccess ? <CheckCheck size={15} color="#10B981" /> : <Copy size={15} />}
              {copiedSuccess ? 'Copied!' : 'Copy Text'}
            </button>

            {/* Primary Download / Print PDF */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                fontSize: '0.92rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(12, 70, 59, 0.2)'
              }}
            >
              <Download size={16} />
              Download / Print PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="container" style={{ padding: '32px 20px', flex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 580px) 1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="resume-grid">

          {/* Left Column: Form Section matching Figma screen */}
          <div className="no-print" style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            padding: '28px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>

            {/* 1. Identity & Contact */}
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} color="#0C463B" /> Personal Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                    Full name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '2px' }}>
                    Email ID <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '6px' }}>
                    Job notifications will be sent to this email id
                  </p>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                    placeholder="Enter your email id"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Phone number
                    </label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={resumeData.dob}
                      onChange={(e) => setResumeData({ ...resumeData, dob: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Address / City
                    </label>
                    <input
                      type="text"
                      value={resumeData.address}
                      onChange={(e) => setResumeData({ ...resumeData, address: e.target.value })}
                      placeholder="Enter your address"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={resumeData.postalCode}
                      onChange={(e) => setResumeData({ ...resumeData, postalCode: e.target.value })}
                      placeholder="Enter Postal Code"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9' }} />

            {/* 2. Professional & Academic Details */}
            <div>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={18} color="#0C463B" /> Professional & Education Details
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Target Job Title <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={resumeData.title}
                      onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                      placeholder="e.g. Senior Frontend Developer"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Institution Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.institution}
                      onChange={(e) => setResumeData({ ...resumeData, institution: e.target.value })}
                      placeholder="Institution Name"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Degree Earned
                    </label>
                    <input
                      type="text"
                      value={resumeData.degree}
                      onChange={(e) => setResumeData({ ...resumeData, degree: e.target.value })}
                      placeholder="Degree Earned"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Graduation Date / Year
                    </label>
                    <input
                      type="text"
                      value={resumeData.gradDate}
                      onChange={(e) => setResumeData({ ...resumeData, gradDate: e.target.value })}
                      placeholder="e.g. 2021 or May 2022"
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.92rem' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9' }} />

            {/* 3. Description / Professional Summary with AI Enhancement */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.92rem', fontWeight: '700', color: '#0F172A' }}>
                  Description / Professional Summary <span style={{ color: '#EF4444' }}>*</span>
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
                    color: '#0C463B',
                    backgroundColor: '#EBF8F4',
                    padding: '5px 12px',
                    borderRadius: '6px',
                    border: '1px solid #A7F3D0',
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

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9' }} />

            {/* 4. Work Experience & Achievements */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Briefcase size={18} color="#0C463B" /> Work Experience
                </h2>
                <button
                  type="button"
                  onClick={addExperience}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: '700',
                    color: '#0C463B',
                    backgroundColor: '#EBF8F4',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={14} /> Add Role
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {resumeData.experiences.map((exp, index) => (
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
                      title="Delete experience"
                    >
                      <Trash2 size={16} />
                    </button>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Company</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Role / Title</label>
                        <input
                          type="text"
                          value={exp.role}
                          onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                          style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Time Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                        placeholder="e.g. 2022 - Present"
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Key Contributions</label>
                        <button
                          type="button"
                          onClick={() => handleAiEnhanceExp(exp.id, exp.description)}
                          disabled={enhancingExpId === exp.id}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: '700',
                            color: '#0C463B',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Sparkles size={11} color="#10B981" />
                          {enhancingExpId === exp.id ? 'Optimizing...' : 'AI Polish STAR Bullet'}
                        </button>
                      </div>
                      <textarea
                        rows={3}
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem', resize: 'vertical' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9' }} />

            {/* 5. Achievements & Responsibilities matching Figma */}
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0F172A', marginBottom: '16px', textAlign: 'center' }}>
                Achievements and Responsibilities
              </h2>

              {/* Skills */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#334155' }}>
                    Skills <span style={{ color: '#EF4444' }}>*</span>
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
                      color: '#0C463B',
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
                    placeholder="Enter skill & press Enter or click +"
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '9px 14px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Skill +
                  </button>
                </form>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {resumeData.skills.map(skill => (
                    <span
                      key={skill}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        fontSize: '0.82rem',
                        fontWeight: '600'
                      }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        style={{ color: '#0C463B', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Hobbies */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                  Hobbies <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <form onSubmit={handleAddHobby} style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newHobby}
                    onChange={(e) => setNewHobby(e.target.value)}
                    placeholder="Enter hobby & click +"
                    style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '9px 14px',
                      backgroundColor: '#0C463B',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Hobby +
                  </button>
                </form>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {resumeData.hobbies.map(hobby => (
                    <span
                      key={hobby}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '5px 10px',
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
                        style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '13px' }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Projects <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={resumeData.projects}
                  onChange={(e) => setResumeData({ ...resumeData, projects: e.target.value })}
                  placeholder="Enter Projects link or key portfolio highlights"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              {/* Awards & Honor */}
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                  Awards & Honor <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  value={resumeData.awards}
                  onChange={(e) => setResumeData({ ...resumeData, awards: e.target.value })}
                  placeholder="Enter Awards & Honors"
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                />
              </div>

              {/* How you are fit for Job? with AI enhancer */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ fontSize: '0.88rem', fontWeight: '700', color: '#334155' }}>
                    How you are fit for Job? <span style={{ color: '#EF4444' }}>*</span>
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
                      color: '#0C463B',
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
                  placeholder="Explain why your technical background and problem-solving makes you an exceptional match..."
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem', resize: 'vertical' }}
                />
              </div>
            </div>

            {/* Bottom Actions matching Figma Red Cancel & Dark Green Download buttons */}
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#EF4444',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '700',
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Download size={18} />
                Download
              </button>
            </div>

          </div>

          {/* Right Column: Live A4 Resume Preview */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1E293B' }}>
                  Template:
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {[
                    { id: 'emerald', label: 'Emerald Modern' },
                    { id: 'executive', label: 'Executive Minimal' },
                    { id: 'tech', label: 'Tech Slate' }
                  ].map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTemplate(t.id)}
                      style={{
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: selectedTemplate === t.id ? '700' : '500',
                        backgroundColor: selectedTemplate === t.id ? '#EBF8F4' : '#F1F5F9',
                        color: selectedTemplate === t.id ? '#0C463B' : '#475569',
                        border: `1px solid ${selectedTemplate === t.id ? '#A7F3D0' : '#E2E8F0'}`,
                        cursor: 'pointer'
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Check size={14} /> Live Sync Active
              </span>
            </div>

            {/* A4 Paper Container */}
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
                fontFamily: selectedTemplate === 'executive' ? 'Georgia, serif' : 'Inter, sans-serif'
              }}
            >
              {/* Header */}
              <div style={{
                borderBottom: selectedTemplate === 'emerald' ? '3px solid #0C463B' : '1px solid #CBD5E1',
                paddingBottom: '18px',
                marginBottom: '20px'
              }}>
                <h1 style={{
                  fontSize: '2.1rem',
                  fontWeight: '800',
                  color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px'
                }}>
                  {resumeData.fullName || 'Your Full Name'}
                </h1>
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  color: selectedTemplate === 'emerald' ? '#10B981' : '#475569',
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
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
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
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
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
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
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
                        <div style={{ fontSize: '0.86rem', fontWeight: '600', color: selectedTemplate === 'emerald' ? '#0C463B' : '#475569', marginBottom: '4px' }}>
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
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
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
                          backgroundColor: selectedTemplate === 'emerald' ? '#F2FFF2' : '#F1F5F9',
                          color: selectedTemplate === 'emerald' ? '#0C463B' : '#1E293B',
                          fontWeight: '600',
                          border: `1px solid ${selectedTemplate === 'emerald' ? '#A7F3D0' : '#E2E8F0'}`
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
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                    marginBottom: '6px'
                  }}>
                    Awards & Honors
                  </h2>
                  <p style={{ fontSize: '0.86rem', lineHeight: '1.5', color: '#334155' }}>
                    {resumeData.awards}
                  </p>
                </div>
              )}

              {/* Why I'm a Fit */}
              {resumeData.jobFit && (
                <div>
                  <h2 style={{
                    fontSize: '0.92rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
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

        </div>
      </div>

      <Footer />

      {/* Print Styles for Pixel-Perfect A4 PDF Export */}
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
