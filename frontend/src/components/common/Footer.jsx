import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0C463B',
      color: '#FFFFFF',
      paddingTop: '64px',
      paddingBottom: '32px',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                backgroundColor: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Briefcase size={20} />
              </div>
              <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'Poppins, sans-serif' }}>
                Job<span style={{ color: '#6EE7B7' }}>Fiesta</span>
              </span>
            </div>
            <p style={{ color: '#D1FAE5', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Connecting exceptional talent with world-class opportunities. Empowered with AI resume enhancement and real-time recruiter matching.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#A7F3D0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} /> San Francisco, CA & Remote Worldwide
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} /> support@jobfiesta.io
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '18px', color: '#FFFFFF' }}>For Candidates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/search" style={{ color: '#D1FAE5', transition: 'var(--transition)' }}>Browse Open Jobs</Link></li>
              <li><Link to="/resume-builder" style={{ color: '#D1FAE5' }}>AI Resume Builder</Link></li>
              <li><Link to="/jobseeker-dashboard" style={{ color: '#D1FAE5' }}>Job Seeker Dashboard</Link></li>
              <li><Link to="/chat" style={{ color: '#D1FAE5' }}>Recruiter Messages</Link></li>
              <li><Link to="/account-settings" style={{ color: '#D1FAE5' }}>Career Preferences</Link></li>
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '18px', color: '#FFFFFF' }}>For Employers</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/post-job" style={{ color: '#D1FAE5' }}>Post a New Job</Link></li>
              <li><Link to="/recruiter-dashboard" style={{ color: '#D1FAE5' }}>Recruiter Dashboard</Link></li>
              <li><Link to="/search" style={{ color: '#D1FAE5' }}>Browse Candidate Profiles</Link></li>
              <li><Link to="/chat" style={{ color: '#D1FAE5' }}>Candidate Messaging & Rating</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '18px', color: '#FFFFFF' }}>Stay Updated</h4>
            <p style={{ color: '#D1FAE5', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '14px' }}>
              Subscribe to weekly hiring trends and smart job alerts.
            </p>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.85rem',
                  backgroundColor: '#FFFFFF',
                  color: '#0F172A'
                }}
              />
              <button 
                onClick={(e) => { e.preventDefault(); alert('Subscribed to Job Fiesta newsletter!'); }}
                style={{
                  padding: '10px 16px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.85rem',
          color: '#A7F3D0'
        }}>
          <div>
            © {new Date().getFullYear()} Job Fiesta. All rights reserved. Final Year Project.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            Built with React 19 & modern engineering excellence.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
