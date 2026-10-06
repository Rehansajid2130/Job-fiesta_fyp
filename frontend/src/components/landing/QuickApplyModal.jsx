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
  const { applyToJob, showToast } = useJobs();

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

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      onClose();
      navigate('/login', { 
        state: { 
          from: selectedJob ? `/job/${selectedJob.id}` : '/jobs',
          message: 'Please log in to your account to apply for this job.' 
        } 
      });
      return;
    }
    if (!selectedJob) return;
    const res = await applyToJob(selectedJob.id, coverNote);
    if (res.success) {
      setApplySuccess(res.message);
      setTimeout(() => {
        setApplySuccess('');
        onClose();
      }, 1600);
    } else {
      if (res.requireLogin) {
        onClose();
        navigate('/login', { 
          state: { 
            from: `/job/${selectedJob.id}`,
            message: res.message 
          } 
        });
      } else if (res.alreadyApplied || res.message?.toLowerCase().includes('already applied')) {
        onClose();
        showToast('You have already applied for this position.', 'info');
      } else {
        showToast(res.message || 'Could not submit application.', 'error');
      }
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
            <div style={{ padding: '24px 16px', textAlign: 'center', color: '#0C463B' }}>
              <img
                src="/assets/searchimages/application-success.svg"
                alt="Application Submitted"
                style={{
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  margin: '0 auto 16px auto',
                  display: 'block'
                }}
              />
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#0C463B', marginBottom: '8px' }}>Application Submitted!</h3>
              <p style={{ color: '#64748B', fontSize: '14px', maxWidth: '380px', margin: '0 auto', lineHeight: '1.5' }}>{applySuccess}</p>
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
                    borderRadius: '8px',
                    border: '1px solid #0C463B',
                    backgroundColor: '#EBF8F4',
                    color: '#0C463B',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 24px',
                    borderRadius: '8px',
                    border: '1px solid #0C463B',
                    backgroundColor: '#0C463B',
                    color: '#FFFFFF',
                    fontWeight: '600',
                    cursor: 'pointer'
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
