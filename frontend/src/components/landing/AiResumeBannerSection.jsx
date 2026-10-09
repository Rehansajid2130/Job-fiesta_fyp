import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Zap, 
  Award, 
  Eye, 
  Download, 
  Layers, 
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

const PREVIEW_ROLES = [
  {
    id: 'frontend',
    title: 'Senior Frontend Engineer',
    name: 'Alex Morgan',
    location: 'San Francisco, CA',
    score: 96,
    skills: ['React 18', 'TypeScript', 'Next.js', 'TailwindCSS', 'System Architecture'],
    highlight: 'Optimized Core Web Vitals to 98% and reduced web bundle latency by 42% across enterprise scale.'
  },
  {
    id: 'design',
    title: 'Lead Product Designer',
    name: 'Sophia Chen',
    location: 'New York, NY',
    score: 94,
    skills: ['Figma Design Systems', 'UX Research', 'Design Tokens', 'Prototyping', 'User Testing'],
    highlight: 'Spearheaded global design system adopted by 14 product squads, lifting task completion rate by 29%.'
  },
  {
    id: 'product',
    title: 'Senior Product Manager',
    name: 'David Vance',
    location: 'Austin, TX',
    score: 95,
    skills: ['Roadmapping', 'Agile Scrum', 'Data Analytics', 'A/B Testing', 'Growth Strategy'],
    highlight: 'Drove $3.4M ARR growth via algorithmic onboarding funnels and iterative product-market optimization.'
  }
];

const AiResumeBannerSection = () => {
  const navigate = useNavigate();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);
  const activeRole = PREVIEW_ROLES[selectedRoleIndex];

  return (
    <section 
      id="ai-resume-section"
      style={{
        padding: '90px 24px',
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box'
      }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #0C463B 0%, #082F27 100%)',
        borderRadius: '28px',
        padding: '56px 48px',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 24px 64px -12px rgba(12, 70, 59, 0.35)',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        {/* Ambient Decorative Glow Circles */}
        <div style={{
          position: 'absolute',
          top: '-120px',
          right: '-80px',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.28) 0%, rgba(12, 70, 59, 0) 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-60px',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.18) 0%, rgba(12, 70, 59, 0) 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '48px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Column: Value Proposition & Call to Action */}
          <div>
            {/* Eyebrow Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#A7F3D0',
              marginBottom: '20px'
            }}>
              <Sparkles size={14} color="#34D399" />
              <span>Job Fiesta AI Career Studio</span>
            </div>

            {/* Main Headline */}
            <h2 style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: '800',
              lineHeight: '1.18',
              letterSpacing: '-0.025em',
              margin: '0 0 16px 0',
              color: '#FFFFFF'
            }}>
              Build ATS-Optimized Resumes in Minutes with AI
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: '16px',
              lineHeight: '1.6',
              color: '#D1FAE5',
              margin: '0 0 32px 0',
              maxWidth: '520px'
            }}>
              Stop getting filtered out by automated bots. Our interactive step-by-step AI wizard drafts keyword-rich, achievement-driven bullet points formatted to pass ATS screening algorithms with top percentile scores.
            </p>

            {/* 4 Core Value Pillars */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
              marginBottom: '36px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#F0FDF4' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>94%+ ATS Pass Rate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#F0FDF4' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>Step-by-Step Guided Wizard</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#F0FDF4' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>Instant PDF & Live Preview</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#F0FDF4' }}>
                <CheckCircle2 size={16} color="#34D399" />
                <span>Role-Tailored Keywords</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => navigate('/resume-builder')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#FFFFFF',
                  color: '#0C463B',
                  fontWeight: '700',
                  fontSize: '15px',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.28)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                }}
              >
                <Sparkles size={16} color="#059669" />
                <span>Launch AI Resume Builder</span>
                <ArrowRight size={16} color="#0C463B" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Resume Card Showcase */}
          <div>
            {/* Role switcher pills */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
              overflowX: 'auto',
              paddingBottom: '4px'
            }}>
              {PREVIEW_ROLES.map((r, idx) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRoleIndex(idx)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    border: selectedRoleIndex === idx ? '1px solid #34D399' : '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: selectedRoleIndex === idx ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: selectedRoleIndex === idx ? '#A7F3D0' : '#E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {r.title}
                </button>
              ))}
            </div>

            {/* Simulated Live ATS Document Card */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '28px',
              color: '#0F172A',
              boxShadow: '0 20px 45px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              {/* Header profile row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
                    {activeRole.name}
                  </h3>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#0C463B' }}>
                    {activeRole.title}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                    {activeRole.location} • Verified Candidate Profile
                  </div>
                </div>

                <div style={{
                  padding: '6px 10px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11px',
                  color: '#475569',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <FileText size={13} color="#0C463B" />
                  <span>Modern ATS Template</span>
                </div>
              </div>

              {/* AI Bullet Highlight */}
              <div style={{
                backgroundColor: '#F0FDF4',
                borderLeft: '3px solid #10B981',
                padding: '10px 14px',
                borderRadius: '0 8px 8px 0',
                marginBottom: '16px'
              }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#065F46', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Sparkles size={11} color="#10B981" />
                  <span>AI Generated Bullet Point</span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#1E293B', lineHeight: '1.45' }}>
                  "{activeRole.highlight}"
                </div>
              </div>

              {/* Skills Row */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '8px' }}>
                  Algorithmically Extracted Keywords
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {activeRole.skills.map((skill) => (
                    <span 
                      key={skill}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#EBF8F4',
                        color: '#0C463B',
                        fontSize: '11.5px',
                        fontWeight: '700',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Check size={11} color="#059669" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '14px',
                borderTop: '1px solid #F1F5F9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#059669', fontWeight: '600' }}>
                  <Zap size={14} />
                  <span>Ready for instant PDF download</span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/resume-builder')}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Eye size={13} />
                  <span>Try Builder</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiResumeBannerSection;
