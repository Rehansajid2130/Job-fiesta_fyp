import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from './Modal';

// ponytail: reusable Figma-accurate footer shared across LandingPage, SearchPage, and all subpages
const Footer = () => {
  const navigate = useNavigate();
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <>
      <footer style={{ backgroundColor: '#111111', color: '#FFFFFF', paddingTop: '60px', paddingBottom: '30px', marginTop: 'auto', width: '100%' }}>
        <div className="container">
          
          {/* Footer Navigation Columns & Origami Doodle */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: '30px', alignItems: 'start', marginBottom: '40px' }}>
            
            {/* Company Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Platform
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <Link 
                    to="/search" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/companies" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Companies Directory
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/salaries" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Salary Insights
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/candidates" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Candidates (ATS)
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/profile/furqan12" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Public Portfolio Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/notifications" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Notification Center
                  </Link>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => scrollToSection('categories')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Categories
                  </button>
                </li>
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Help
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    type="button"
                    onClick={() => {
                      scrollToSection('contact');
                      document.getElementById('contact-message-input')?.focus();
                    }} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Customer Support
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => scrollToSection('contact')} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => setTermsModalOpen(true)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Terms &amp; Conditions
                  </button>
                </li>
                <li>
                  <button 
                    type="button"
                    onClick={() => setPrivacyModalOpen(true)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Resources
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <Link 
                    to="/resume-builder" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    AI Resume Builder
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/search" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Browse Jobs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', fontWeight: '600', marginBottom: '18px', color: '#FFFFFF' }}>
                Quick Links
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <Link 
                    to="/post-job" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login" 
                    style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                  >
                    Employer Sign In
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Airplane Origami Doodle */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: '120px' }}>
              <img 
                src="/assets/Landingpageimages/group_24.svg" 
                alt="Origami plane" 
                style={{ width: '120px', height: 'auto', filter: 'brightness(0) invert(0.6)', opacity: 0.5 }}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: '100%', height: '1px', backgroundColor: '#262626', marginBottom: '24px' }}></div>

          {/* Bottom Bar: Logo, Copyright, Social Icons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: "'League Script', cursive", fontSize: '32px', fontWeight: 'bold', color: '#FFFFFF' }}>
                Job fiesta
              </span>
            </Link>

            {/* Copyright */}
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
              &copy; Copyright 2024. All rights reserved by JobFiesta
            </div>

            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'X', url: 'https://twitter.com' },
                { name: 'F', url: 'https://facebook.com' },
                { name: 'L', url: 'https://linkedin.com' },
                { name: 'I', url: 'https://instagram.com' }
              ].map((s) => (
                <a 
                  key={s.name} 
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ 
                    width: '32px', 
                    height: '32px', 
                    borderRadius: '50%', 
                    backgroundColor: '#FFFFFF', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <span style={{ color: '#000000', fontSize: '12px', fontWeight: 'bold' }}>
                    {s.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* TERMS & CONDITIONS MODAL */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="JobFiesta Terms &amp; Conditions"
      >
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>1. Acceptance of Terms</h4>
          <p style={{ marginBottom: '14px' }}>
            By accessing or using JobFiesta, you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using the platform.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>2. Job Seekers &amp; Recruiters</h4>
          <p style={{ marginBottom: '14px' }}>
            Job seekers may browse positions and submit applications free of charge. Recruiters agree to post genuine opportunities and uphold equal employment standards.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>3. Privacy &amp; Data Security</h4>
          <p>
            Your information is safeguarded following industry standard encryption and privacy guidelines. We do not sell your personal information to third parties.
          </p>
        </div>
      </Modal>

      {/* PRIVACY POLICY MODAL */}
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="JobFiesta Privacy Policy"
      >
        <div style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>1. Information We Collect</h4>
          <p style={{ marginBottom: '14px' }}>
            We collect profile information, resumes, and communications necessary to facilitate employment applications and interview scheduling.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>2. How We Use Your Data</h4>
          <p style={{ marginBottom: '14px' }}>
            Your resume and contact information are shared only with employers when you explicitly apply for a job position.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '6px' }}>3. Your Rights</h4>
          <p>
            You have the right to edit, export, or delete your account and personal data at any time from your account settings.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
