import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Modal from './Modal';
import { useAuth } from '../../context/AuthContext';

// ponytail: reusable Figma-accurate footer shared across LandingPage, SearchPage, and all subpages
const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRecruiter = user?.userType === 'recruiter';
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  // ponytail: legal disclosure modal state for EU AI Act compliance
  const [aiNoticeModalOpen, setAiNoticeModalOpen] = useState(false);

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
                {isRecruiter ? (
                  <li>
                    <Link 
                      to="/candidates" 
                      style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                    >
                      Candidates (ATS)
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link 
                      to="/resume-builder" 
                      style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                    >
                      AI Resume Builder
                    </Link>
                  </li>
                )}
                {user && (
                  <li>
                    <Link 
                      to={isRecruiter ? '/recruiter-dashboard' : '/jobseeker-dashboard'} 
                      style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                    >
                      {isRecruiter ? 'Recruiter Dashboard' : 'Candidate Dashboard'}
                    </Link>
                  </li>
                )}
                {!isRecruiter && (
                  <li>
                    <Link 
                      to="/profile/furqan12" 
                      style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                    >
                      Public Portfolio Profile
                    </Link>
                  </li>
                )}
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
                <li>
                  <button 
                    type="button"
                    onClick={() => setAiNoticeModalOpen(true)} 
                    style={{ color: '#9CA3AF', background: 'none', border: 'none', fontSize: '14px', fontFamily: 'Inter, sans-serif', cursor: 'pointer', padding: 0, textAlign: 'left' }}
                  >
                    AI Ethics &amp; Transparency
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
                <li>
                  <Link 
                    to="/system-status" 
                    style={{ color: '#34D399', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none', fontWeight: '500' }}
                  >
                    ⚡ System Diagnostics &amp; Tests
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
                {isRecruiter ? (
                  <>
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
                        to="/recruiter-dashboard" 
                        style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        Recruiter Dashboard
                      </Link>
                    </li>
                  </>
                ) : user ? (
                  <>
                    <li>
                      <Link 
                        to="/jobseeker-dashboard" 
                        style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        My Applications
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/resume-builder" 
                        style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        AI Resume Builder
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link 
                        to="/register-recruiter" 
                        style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        Post a Job (Employers)
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/login" 
                        style={{ color: '#9CA3AF', fontSize: '14px', fontFamily: 'Inter, sans-serif', textDecoration: 'none' }}
                      >
                        Sign In
                      </Link>
                    </li>
                  </>
                )}
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

            {/* Copyright & Trademark Disclaimer */}
            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF' }}>
              <div>&copy; Copyright 2024-2026. All rights reserved by JobFiesta.</div>
              {/* ponytail: trademark disclaimer to avoid trademark infringement liability */}
              <div style={{ fontSize: '11px', color: '#6B7280', marginTop: '3px' }}>
                All brand logos and trademarks are property of their respective owners. Used for academic demonstration.
              </div>
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

      {/* TERMS & CONDITIONS MODAL (ponytail: comprehensive enforceable terms) */}
      <Modal
        isOpen={termsModalOpen}
        onClose={() => setTermsModalOpen(false)}
        title="JobFiesta Terms of Service"
      >
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>1. Acceptance &amp; Platform Role</h4>
          <p style={{ marginBottom: '12px' }}>
            By accessing or using JobFiesta, you agree to these Terms. JobFiesta operates as an independent technological venue connecting job seekers and prospective employers. JobFiesta does not act as an employer, agent, or guarantor of employment, nor does it guarantee the accuracy of job listings or candidate credentials.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>2. Acceptable Use &amp; Prohibitions</h4>
          <p style={{ marginBottom: '12px' }}>
            Users agree not to: (a) post false, misleading, or discriminatory job offers; (b) solicit upfront fees or illegal activities; (c) scrape, harvest, or automate data collection from user profiles or resumes; or (d) transmit malicious code or spam via the messaging features.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>3. AI Tools &amp; Advisory Match Scoring</h4>
          <p style={{ marginBottom: '12px' }}>
            The AI Resume Builder and candidate match scores are automated advisory tools provided for draft guidance only. JobFiesta makes no warranty regarding AI summary efficacy. Employers retain sole responsibility for qualification evaluation.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>4. Disclaimer of Warranties &amp; Liability Cap</h4>
          <p style={{ marginBottom: '12px' }}>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, JOBFIESTA'S TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED ONE HUNDRED US DOLLARS ($100.00).
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>5. Termination &amp; Governing Law</h4>
          <p>
            We reserve the right to suspend or terminate accounts that violate these terms. Any disputes shall be governed by applicable laws without regard to conflict of law principles.
          </p>
        </div>
      </Modal>

      {/* PRIVACY POLICY MODAL (ponytail: GDPR & CCPA compliant privacy disclosure) */}
      <Modal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
        title="JobFiesta Privacy Policy"
      >
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>1. Data We Collect</h4>
          <p style={{ marginBottom: '12px' }}>
            We collect identity information (name, email, phone, location), professional details (resumes, work history, skills, portfolio links), communications, and session tokens necessary to provide recruitment services.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>2. Legal Bases for Processing (GDPR Art. 6)</h4>
          <p style={{ marginBottom: '12px' }}>
            We process your personal information under contractual necessity (delivering account services and transmitting applications), legitimate interests (platform security and fraud prevention), and consent (for optional AI profile enhancements).
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>3. Data Sharing &amp; Third Parties</h4>
          <p style={{ marginBottom: '12px' }}>
            Your resume and contact information are shared with employers only when you explicitly apply for a job position. We never sell, rent, or trade your personal data to third parties.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>4. Your Statutory Privacy Rights</h4>
          <p style={{ marginBottom: '12px' }}>
            Under GDPR and CCPA, you have the right to access your data, rectify inaccuracies, export your data in JSON format, or request complete account erasure ("Right to be Forgotten") at any time directly via your Account Settings.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>5. Contact &amp; Data Protection Officer</h4>
          <p>
            For privacy inquiries, contact our Data Protection representative at <strong style={{ color: '#0C463B' }}>privacy@jobfiesta.com</strong>. We respond to all verified requests within 30 days.
          </p>
        </div>
      </Modal>

      {/* AI ETHICS & TRANSPARENCY NOTICE (ponytail: EU AI Act Regulation 2024/1689 compliance) */}
      <Modal
        isOpen={aiNoticeModalOpen}
        onClose={() => setAiNoticeModalOpen(false)}
        title="AI Ethics, Algorithmic Transparency &amp; EEO Notice"
      >
        <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.6', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>1. Advisory Nature of Match Scores</h4>
          <p style={{ marginBottom: '12px' }}>
            JobFiesta features an algorithmic Match Score designed to assist candidates and recruiters in gauging skill alignment. In accordance with the <strong>EU AI Act (Annex III)</strong>, this metric is an advisory recommendation tool and is <strong>never used for automated rejection or autonomous disqualification</strong>. All final employment determinations are made through human review.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>2. AI Resume Enhancement Controls</h4>
          <p style={{ marginBottom: '12px' }}>
            The AI Resume Builder processes user inputs exclusively to enhance grammatical structure and professional clarity. Candidates maintain full editorial control to review, edit, or reject any generated draft before applying to jobs.
          </p>
          <h4 style={{ color: '#0C463B', marginBottom: '4px' }}>3. Equal Employment Opportunity (EEO)</h4>
          <p>
            JobFiesta is committed to fair and equitable hiring practices. We prohibit discriminatory filtering on the basis of age, race, gender, religion, national origin, or disability. Date of birth is not collected in resume workflows to eliminate age discrimination risk under ADEA and EEOC frameworks.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Footer;
