import React, { useState } from 'react';

const ContactSection = () => {
  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('jobfiesta_inquiries') || '[]');
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...contactData,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('jobfiesta_inquiries', JSON.stringify([newInquiry, ...existing]));
    setContactSubmitted(true);
  };

  return (
    <section id="contact" className="container" style={{ marginBottom: '100px', position: 'relative' }}>
      {/* Floating Paper Airplane Top Right */}
      <div className="contact-doodle" style={{ position: 'absolute', right: '5%', top: '-20px', pointerEvents: 'none', zIndex: 1 }}>
        <img 
          src="/assets/Landingpageimages/group_24.svg" 
          alt="Airplane doodle" 
          style={{ width: '160px', height: 'auto', opacity: 0.4 }}
        />
      </div>

      {/* Floating Lightbulb Bottom Left */}
      <div className="contact-doodle" style={{ position: 'absolute', left: '3%', bottom: '20px', pointerEvents: 'none', zIndex: 1 }}>
        <img 
          src="/assets/Landingpageimages/group_23.svg" 
          alt="Lightbulb doodle" 
          style={{ width: '130px', height: 'auto', opacity: 0.5 }}
        />
      </div>

      <h2 style={{ fontFamily: "'Martel', serif", fontSize: 'clamp(30px, 5vw, 56px)', fontWeight: '700', color: '#0C463B', textAlign: 'center', marginBottom: '36px' }}>
        Contact Us
      </h2>

      {/* White Form Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.05)',
          maxWidth: '920px',
          margin: '0 auto',
          padding: 'clamp(28px, 5vw, 50px) clamp(18px, 4vw, 44px)',
          position: 'relative',
          zIndex: 2
        }}
      >
        {contactSubmitted ? (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div style={{ fontSize: '48px', color: '#0C463B', marginBottom: '16px' }}>✓</div>
            <h3 style={{ fontFamily: "'Martel', serif", fontSize: '26px', color: '#0C463B', marginBottom: '10px' }}>
              Thank You, {contactData.firstName || 'Friend'}!
            </h3>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B7280', maxWidth: '480px', margin: '0 auto 20px', fontSize: '15px' }}>
              Your message has been received! Our support team will review your inquiry and reply to {contactData.email || 'your email'} within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => {
                setContactSubmitted(false);
                setContactData({ firstName: '', lastName: '', email: '', location: '', message: '' });
              }}
              style={{
                backgroundColor: '#0C463B',
                color: '#FFFFFF',
                padding: '10px 28px',
                borderRadius: '50px',
                border: 'none',
                fontWeight: '600',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer'
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleContactSubmit}>
            {/* Responsive Form Inputs Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(14px, 2.5vw, 24px)', marginBottom: '24px' }}>
              
              {/* First Name */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="First Name*"
                  value={contactData.firstName}
                  onChange={(e) => setContactData({ ...contactData, firstName: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '14px 38px 14px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827'
                  }}
                />
                <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
              </div>

              {/* Last Name */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Last Name*"
                  value={contactData.lastName}
                  onChange={(e) => setContactData({ ...contactData, lastName: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '14px 38px 14px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827'
                  }}
                />
                <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
              </div>

              {/* Email Address */}
              <div style={{ position: 'relative' }}>
                <input
                  type="email"
                  required
                  placeholder="Email Address*"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '14px 38px 14px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827'
                  }}
                />
                <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
              </div>

              {/* Location */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  required
                  placeholder="Location*"
                  value={contactData.location}
                  onChange={(e) => setContactData({ ...contactData, location: e.target.value })}
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    padding: '14px 38px 14px 16px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '15px',
                    outline: 'none',
                    color: '#111827'
                  }}
                />
                <span style={{ position: 'absolute', right: '14px', top: '15px', color: '#10B981', fontSize: '16px' }}>✓</span>
              </div>
            </div>

            {/* Message */}
            <div style={{ marginBottom: '28px' }}>
              <textarea
                id="contact-message-input"
                rows="4"
                required
                placeholder="Message"
                value={contactData.message}
                onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                style={{
                  width: '100%',
                  backgroundColor: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '10px',
                  padding: '16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '15px',
                  outline: 'none',
                  color: '#111827',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '14px clamp(32px, 6vw, 52px)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '17px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(12, 70, 59, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                Message Us
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactSection;
