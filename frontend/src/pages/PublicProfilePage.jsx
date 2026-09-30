import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { publicProfiles } from '../data/mockData';
import { useJobs } from '../context/JobContext';
import { 
  User, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  MessageSquare, 
  Download, 
  Share2, 
  ExternalLink, 
  Globe, 
  Sparkles,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

const PublicProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { showToast } = useJobs();

  // Find profile by username, fallback to furqan12
  const profileKey = (username || '').toLowerCase();
  const profile = publicProfiles[profileKey] || publicProfiles['furqan12'];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Profile URL copied to clipboard!', 'success');
  };

  const handleDownloadCV = () => {
    showToast(`Downloading verified resume for ${profile.name}...`, 'info');
  };

  const handleMessage = () => {
    navigate('/chat');
    showToast(`Starting chat with ${profile.name}`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar />

      {/* Header Profile Hero Card */}
      <section style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '44px 0 36px' }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  style={{
                    width: '110px',
                    height: '110px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '4px solid #0C463B',
                    boxShadow: 'var(--shadow-md)'
                  }}
                />
                {profile.availableForHire && (
                  <span
                    title="Available for immediate hiring"
                    style={{
                      position: 'absolute',
                      bottom: '4px',
                      right: '4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: '#10B981',
                      border: '3px solid #FFFFFF'
                    }}
                  />
                )}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {profile.name}
                  </h1>
                  {profile.verified && <CheckCircle2 size={22} color="#10B981" />}
                  {profile.availableForHire && (
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '20px',
                      backgroundColor: '#ECFDF5',
                      color: '#059669',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}>
                      Open to Offers
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '1.05rem', fontWeight: '600', color: '#475569', margin: '4px 0 8px' }}>
                  {profile.title}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#64748B' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={14} color="#94A3B8" /> {profile.location}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Briefcase size={14} color="#94A3B8" /> {profile.experienceYears} Years Experience
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <GraduationCap size={14} color="#94A3B8" /> {profile.education}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={handleShare}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Share2 size={16} /> Share
              </button>

              <button
                type="button"
                onClick={handleDownloadCV}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  color: '#334155',
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <Download size={16} /> Download CV
              </button>

              <button
                type="button"
                onClick={handleMessage}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 22px',
                  borderRadius: '10px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontSize: '0.92rem',
                  fontWeight: '700',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <MessageSquare size={17} /> Message Candidate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main style={{ padding: '36px 0 80px', flex: 1 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          {/* Left Column: Bio, Experience, Projects */}
          <div>
            {/* About / Bio */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '12px' }}>
                Professional Summary
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: 1.7, margin: 0 }}>
                {profile.bio}
              </p>
            </div>

            {/* Experience Timeline */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '20px' }}>
                Work History & Experience
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {profile.experiences.map((exp, idx) => (
                  <div
                    key={idx}
                    style={{
                      paddingLeft: '20px',
                      borderLeft: '3px solid #0C463B',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: '-7px',
                      top: '2px',
                      width: '11px',
                      height: '11px',
                      borderRadius: '50%',
                      backgroundColor: '#0C463B'
                    }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', margin: 0 }}>
                        {exp.role}
                      </h4>
                      <span style={{ fontSize: '0.8rem', color: '#94A3B8', fontWeight: '600' }}>
                        {exp.period}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0C463B', margin: '2px 0 8px' }}>
                      {exp.company}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '28px',
              border: '1px solid #E2E8F0'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0F172A', marginBottom: '18px' }}>
                Key Projects & Artifacts
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {profile.projects.map((proj, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#10B981', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {proj.tag}
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
                      {proj.name}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748B', lineHeight: 1.5, flex: 1, marginBottom: '14px' }}>
                      {proj.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {proj.tech.map(t => (
                        <span
                          key={t}
                          style={{
                            padding: '2px 6px',
                            borderRadius: '4px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#334155',
                            fontSize: '0.72rem',
                            fontWeight: '600'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Skills, Links, Contact Info */}
          <div>
            {/* Verified Skills */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>
                Verified Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {profile.skills.map(s => (
                  <span
                    key={s}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      backgroundColor: '#EBF8F4',
                      color: '#0C463B',
                      fontSize: '0.82rem',
                      fontWeight: '600'
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Links & Profiles */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid #E2E8F0',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0F172A', marginBottom: '14px' }}>
                Online Presence
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub Profile</span>
                  <ExternalLink size={14} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </a>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.37 9.74v-8.37H5.1v8.37h2.73z" />
                  </svg>
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={14} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </a>

                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    color: '#0F172A',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    textDecoration: 'none'
                  }}
                >
                  <Globe size={18} color="#10B981" /> Personal Portfolio <ExternalLink size={14} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </a>
              </div>
            </div>

            {/* Quick Pitch Box */}
            <div style={{
              backgroundColor: '#0C463B',
              borderRadius: '16px',
              padding: '24px',
              color: '#FFFFFF'
            }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '8px' }}>
                Looking to Hire {profile.name.split(' ')[0]}?
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#A7F3D0', lineHeight: 1.5, marginBottom: '18px' }}>
                Send a direct inquiry or interview invitation through Job Fiesta's real-time messaging suite.
              </p>
              <button
                type="button"
                onClick={handleMessage}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#0C463B',
                  fontWeight: '700',
                  fontSize: '0.88rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicProfilePage;
