import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { useJobs } from '../../context/JobContext';

const QuickApplyModal = ({
  isOpen,
  onClose,
  selectedJob,
  user
}) => {
  const navigate = useNavigate();
  const { applyToJob } = useJobs();

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [applySuccess, setApplySuccess] = useState('');

  // Check for saved resume from Resume Builder
  const savedResume = localStorage.getItem('jobfiesta_resume')
    ? JSON.parse(localStorage.getItem('jobfiesta_resume'))
    : null;

  useEffect(() => {
    if (isOpen) {
      setApplicantName(user?.name || '');
      setApplicantEmail(user?.email || '');
      setCoverNote('');
      setApplySuccess('');
    }
  }, [isOpen, user]);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!selectedJob) return;
    const res = applyToJob(selectedJob.id, coverNote);
    if (res.success) {
      setApplySuccess(res.message);
      setTimeout(() => {
        setApplySuccess('');
        onClose();
      }, 1600);
    } else {
      alert(res.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={selectedJob ? `Apply to ${selectedJob.title}` : 'Quick Apply'}
    >
      {selectedJob && (
        <div>
          {applySuccess ? (
            <div style={{ padding: '32px 24px', textAlign: 'center', color: '#0C463B' }}>
              <div style={{ marginBottom: '16px' }}>
                <span className="t-success-check">
                  <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
                    <circle cx="24" cy="24" r="22" fill="#EBF8F4" stroke="#0C463B" strokeWidth="2.5" />
                    <path d="M14 24L21 31L34 17" stroke="#0C463B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>Application Submitted!</h3>
              <p style={{ color: '#64748B', fontSize: '14px' }}>{applySuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ padding: '14px', backgroundColor: '#F2FFF2', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={selectedJob.logo} alt={selectedJob.company} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#0C463B' }}>{selectedJob.title}</div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>{selectedJob.company} &bull; {selectedJob.location}</div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="e.g. alex@example.com"
                    style={{
                      width: '100%',
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </div>
              </div>

              {/* Resume Status Notification */}
              <div style={{ padding: '10px 14px', backgroundColor: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B' }}>
                    {savedResume ? `Attached: ${savedResume.fullName || 'User'}'s AI Resume` : 'Default Profile Resume Attached'}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Employers will receive your verified profile credentials.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    navigate('/resume-builder');
                  }}
                  style={{ fontSize: '12px', color: '#0C463B', fontWeight: '600', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Edit Resume
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Cover Note / Brief Pitch
                </label>
                <textarea
                  rows="3"
                  required
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Briefly describe why you are the best fit for this role..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '14px',
                    outline: 'none',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '50px',
                    border: '1px solid #D1D5DB',
                    backgroundColor: '#FFFFFF',
                    color: '#4B5563',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
                    transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), color 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 340ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.04)';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '50px',
                    border: '1px solid #0C463B',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(12, 70, 59, 0.18)',
                    transition: 'background-color 340ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.18s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 340ms cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#08342c';
                    e.currentTarget.style.borderColor = '#08342c';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(12, 70, 59, 0.28)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#0C463B';
                    e.currentTarget.style.borderColor = '#0C463B';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(12, 70, 59, 0.18)';
                  }}
                >
                  Confirm &amp; Submit Application
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </Modal>
  );
};

export default QuickApplyModal;
