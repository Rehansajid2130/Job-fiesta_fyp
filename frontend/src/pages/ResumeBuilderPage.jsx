import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
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
  Palette
} from 'lucide-react';

const ResumeBuilderPage = () => {
  const [activeTab, setActiveTab] = useState('personal'); // personal, experience, education, skills, template
  const [selectedTemplate, setSelectedTemplate] = useState('emerald'); // emerald, executive, tech
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhanceSuccess, setEnhanceSuccess] = useState(false);

  const [resumeData, setResumeData] = useState({
    fullName: 'Alice Johnson',
    title: 'Senior Frontend Developer',
    email: 'alice.johnson@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alicejohnson.dev',
    summary: 'Results-driven Senior Frontend Developer with 5+ years of experience crafting high-performance web applications using React, TypeScript, and modern CSS. Proven track record in optimizing page speed, component architecture, and team collaboration.',
    experiences: [
      {
        id: 1,
        company: 'CloudWave Technologies',
        role: 'Senior React Developer',
        period: '2023 - Present',
        description: 'Architected reusable micro-frontends serving 500k+ monthly active users. Reduced bundle load time by 38% through code splitting and tree shaking.'
      },
      {
        id: 2,
        company: 'Vanguard Systems',
        role: 'Frontend Software Engineer',
        period: '2021 - 2023',
        description: 'Collaborated with UX team to develop 40+ accessible UI components in Storybook. Led migration of legacy jQuery codebase to React 18.'
      }
    ],
    education: [
      {
        id: 1,
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        year: '2017 - 2021',
        details: 'Dean\'s Honor List, GPA: 3.85 / 4.0'
      }
    ],
    skills: ['React', 'TypeScript', 'Next.js', 'JavaScript (ES6+)', 'TailwindCSS', 'Redux / Zustand', 'RESTful APIs', 'Git', 'Webpack / Vite', 'Jest']
  });

  const [newSkill, setNewSkill] = useState('');

  // Handle AI Enhance for summary
  const handleAiEnhanceSummary = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setResumeData(prev => ({
        ...prev,
        summary: `Strategic ${prev.title || 'Professional'} recognized for driving technical excellence and measurable impact. Proven ability to architect resilient, scalable systems, accelerate product delivery cycles by 30%, and deliver user-centric digital experiences that surpass business KPIs.`
      }));
      setIsEnhancing(false);
      setEnhanceSuccess(true);
      setTimeout(() => setEnhanceSuccess(false), 2500);
    }, 1000);
  };

  // Add/remove experience
  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        {
          id: Date.now(),
          company: 'Company Name',
          role: 'Job Title',
          period: 'Year - Year',
          description: 'Key accomplishments, metrics, and technologies used.'
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

  // Add/remove education
  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: 'University / Institute',
          degree: 'Degree / Major',
          year: 'Graduation Year',
          details: 'Relevant coursework or achievements'
        }
      ]
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  // Skills
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !resumeData.skills.includes(newSkill.trim())) {
      setResumeData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skillToRemove)
    }));
  };

  // Trigger Print to PDF
  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Top Banner / Actions Bar */}
      <div className="no-print" style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '16px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: '800', color: '#0C463B' }}>
              Interactive AI Resume Builder
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#64748B' }}>
              Create ATS-friendly, professional resumes with instant AI enhancements and live preview.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                fontSize: '0.9rem',
                fontWeight: '600',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Download size={16} />
              Download / Print PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace: Split-Screen Builder + Live Preview */}
      <div className="container" style={{ padding: '32px 20px', flex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 480px) 1fr',
          gap: '32px',
          alignItems: 'start'
        }} className="resume-grid">

          {/* Left Column: Form Controls (No-Print) */}
          <div className="no-print" style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: 'var(--shadow-sm)',
            overflow: 'hidden'
          }}>
            {/* Step Tabs */}
            <div style={{
              display: 'flex',
              borderBottom: '1px solid #E2E8F0',
              overflowX: 'auto',
              backgroundColor: '#F8FAFC'
            }}>
              {[
                { id: 'personal', label: 'Personal', icon: User },
                { id: 'experience', label: 'Experience', icon: Briefcase },
                { id: 'education', label: 'Education', icon: GraduationCap },
                { id: 'skills', label: 'Skills', icon: Code },
                { id: 'template', label: 'Templates', icon: Palette }
              ].map(tab => {
                const Icon = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: 1,
                      padding: '12px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.78rem',
                      fontWeight: isSelected ? '700' : '500',
                      color: isSelected ? '#0C463B' : '#64748B',
                      backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                      borderBottom: isSelected ? '2px solid #0C463B' : '2px solid transparent',
                      minWidth: '68px',
                      cursor: 'pointer'
                    }}
                  >
                    <Icon size={16} color={isSelected ? '#0C463B' : '#94A3B8'} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div style={{ padding: '24px' }}>
              {/* Tab 1: Personal Details */}
              {activeTab === 'personal' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>Contact & Profile</h3>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                      Target Job Title / Headline
                    </label>
                    <input
                      type="text"
                      value={resumeData.title}
                      onChange={(e) => setResumeData({ ...resumeData, title: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Email</label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Phone</label>
                      <input
                        type="text"
                        value={resumeData.phone}
                        onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Location</label>
                      <input
                        type="text"
                        value={resumeData.location}
                        onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>Portfolio / Website</label>
                      <input
                        type="text"
                        value={resumeData.website}
                        onChange={(e) => setResumeData({ ...resumeData, website: e.target.value })}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.9rem' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#334155' }}>
                        Professional Summary
                      </label>
                      <button
                        type="button"
                        onClick={handleAiEnhanceSummary}
                        disabled={isEnhancing}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                          fontSize: '0.78rem',
                          fontWeight: '700',
                          color: '#0C463B',
                          backgroundColor: '#EBF8F4',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1px solid #A7F3D0'
                        }}
                      >
                        <Sparkles size={13} color="#10B981" />
                        {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                      </button>
                    </div>

                    {enhanceSuccess && (
                      <div style={{ fontSize: '0.8rem', color: '#065F46', marginBottom: '6px' }}>
                        ✓ Summary polished with AI action verbs and impact metrics!
                      </div>
                    )}

                    <textarea
                      rows={5}
                      value={resumeData.summary}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem', resize: 'vertical' }}
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Experience */}
              {activeTab === 'experience' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>Work Experience</h3>
                    <button
                      onClick={addExperience}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: '#0C463B',
                        backgroundColor: '#EBF8F4',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      <Plus size={14} /> Add Role
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    {resumeData.experiences.map((exp, index) => (
                      <div key={exp.id} style={{
                        padding: '16px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            color: '#EF4444',
                            padding: '4px'
                          }}
                          title="Delete entry"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div style={{ marginBottom: '10px' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Company</label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Role / Title</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Dates</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Key Contributions & Metrics</label>
                          <textarea
                            rows={3}
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Education */}
              {activeTab === 'education' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A' }}>Education</h3>
                    <button
                      onClick={addEducation}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.82rem',
                        fontWeight: '600',
                        color: '#0C463B',
                        backgroundColor: '#EBF8F4',
                        padding: '6px 12px',
                        borderRadius: '6px'
                      }}
                    >
                      <Plus size={14} /> Add Degree
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id} style={{
                        padding: '16px',
                        borderRadius: '10px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        position: 'relative'
                      }}>
                        <button
                          onClick={() => removeEducation(edu.id)}
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            color: '#EF4444',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={16} />
                        </button>

                        <div style={{ marginBottom: '10px' }}>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>University / School</label>
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Degree</label>
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Graduation Year</label>
                            <input
                              type="text"
                              value={edu.year}
                              onChange={(e) => updateEducation(edu.id, 'year', e.target.value)}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.78rem', fontWeight: '600', color: '#64748B' }}>Honors / Notes</label>
                          <input
                            type="text"
                            value={edu.details}
                            onChange={(e) => updateEducation(edu.id, 'details', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.85rem' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Skills */}
              {activeTab === 'skills' && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
                    Skills & Competencies
                  </h3>
                  
                  <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                    <input
                      type="text"
                      placeholder="e.g. Docker, Python, Figma..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '0.88rem' }}
                    />
                    <button
                      type="submit"
                      style={{
                        padding: '10px 16px',
                        backgroundColor: '#0C463B',
                        color: '#FFFFFF',
                        borderRadius: '8px',
                        fontWeight: '600',
                        fontSize: '0.88rem'
                      }}
                    >
                      Add
                    </button>
                  </form>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {resumeData.skills.map(skill => (
                      <span
                        key={skill}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 12px',
                          borderRadius: '20px',
                          backgroundColor: '#EBF8F4',
                          color: '#0C463B',
                          fontSize: '0.85rem',
                          fontWeight: '600'
                        }}
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          style={{ color: '#0C463B', cursor: 'pointer', display: 'flex' }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 5: Template Selector */}
              {activeTab === 'template' && (
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>
                    Select Resume Template
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { id: 'emerald', name: 'Emerald Modern (Default)', desc: 'Clean forest green accent, polished layout for modern tech and design' },
                      { id: 'executive', name: 'Executive Minimal', desc: 'Monochrome classic typography, ideal for management, finance & corporate' },
                      { id: 'tech', name: 'Tech Slate (Two-Column)', desc: 'Header divider with prominent skills sidebar' }
                    ].map(tpl => (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        style={{
                          padding: '16px',
                          borderRadius: '12px',
                          border: `2px solid ${selectedTemplate === tpl.id ? '#0C463B' : '#E2E8F0'}`,
                          backgroundColor: selectedTemplate === tpl.id ? '#F2FFF2' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '700', color: '#0F172A', fontSize: '0.95rem' }}>{tpl.name}</div>
                          <div style={{ fontSize: '0.82rem', color: '#64748B', marginTop: '2px' }}>{tpl.desc}</div>
                        </div>
                        {selectedTemplate === tpl.id && (
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: '#0C463B',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Live A4 Resume Preview */}
          <div style={{
            position: 'sticky',
            top: '90px'
          }}>
            <div className="no-print" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Eye size={16} /> Live ATS Preview ({selectedTemplate.toUpperCase()})
              </span>
              <span style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                Instant real-time sync
              </span>
            </div>

            {/* A4 Paper Container */}
            <div 
              className="resume-paper"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                boxShadow: 'var(--shadow-xl)',
                padding: '48px 44px',
                minHeight: '800px',
                color: '#1E293B',
                fontFamily: selectedTemplate === 'executive' ? 'Georgia, serif' : 'Inter, sans-serif'
              }}
            >
              {/* Header */}
              <div style={{
                borderBottom: selectedTemplate === 'emerald' ? '3px solid #0C463B' : '1px solid #CBD5E1',
                paddingBottom: '20px',
                marginBottom: '24px'
              }}>
                <h1 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                  letterSpacing: '-0.02em',
                  marginBottom: '4px'
                }}>
                  {resumeData.fullName || 'Your Name'}
                </h1>
                <div style={{
                  fontSize: '1.05rem',
                  fontWeight: '600',
                  color: selectedTemplate === 'emerald' ? '#10B981' : '#475569',
                  marginBottom: '12px'
                }}>
                  {resumeData.title || 'Professional Title'}
                </div>

                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '16px',
                  fontSize: '0.85rem',
                  color: '#475569'
                }}>
                  {resumeData.email && <span>{resumeData.email}</span>}
                  {resumeData.phone && <span>• {resumeData.phone}</span>}
                  {resumeData.location && <span>• {resumeData.location}</span>}
                  {resumeData.website && <span>• {resumeData.website}</span>}
                </div>
              </div>

              {/* Summary */}
              {resumeData.summary && (
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                    marginBottom: '8px'
                  }}>
                    Professional Summary
                  </h2>
                  <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#334155' }}>
                    {resumeData.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resumeData.experiences.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                    marginBottom: '14px'
                  }}>
                    Work Experience
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {resumeData.experiences.map((exp) => (
                      <div key={exp.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                          <span style={{ fontSize: '0.98rem', fontWeight: '700', color: '#0F172A' }}>
                            {exp.role}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '500' }}>
                            {exp.period}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: '600', color: selectedTemplate === 'emerald' ? '#0C463B' : '#475569', marginBottom: '6px' }}>
                          {exp.company}
                        </div>
                        <p style={{ fontSize: '0.88rem', lineHeight: '1.5', color: '#334155' }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                    marginBottom: '12px'
                  }}>
                    Education
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0F172A' }}>
                            {edu.degree}
                          </span>
                          <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                            {edu.year}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.88rem', color: '#475569' }}>
                          {edu.school} {edu.details && `• ${edu.details}`}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div>
                  <h2 style={{
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: selectedTemplate === 'emerald' ? '#0C463B' : '#0F172A',
                    marginBottom: '10px'
                  }}>
                    Key Skills
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontSize: '0.82rem',
                          padding: '3px 9px',
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
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <style>{`
        @media (max-width: 900px) {
          .resume-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilderPage;
