import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Bookmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useJobs } from '../../context/JobContext';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

const JobCard = ({ job }) => {
  const { savedJobIds, toggleSaveJob, applyToJob, applications } = useJobs();
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');
  const [applySuccessMessage, setApplySuccessMessage] = useState('');

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);

  const handleApply = (e) => {
    e.preventDefault();
    const result = applyToJob(job.id, coverNote);
    if (result.success) {
      setApplySuccessMessage(result.message);
      setTimeout(() => {
        setApplySuccessMessage('');
        setApplyModalOpen(false);
      }, 1500);
    } else {
      alert(result.message);
    }
  };

  return (
    <>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
        e.currentTarget.style.borderColor = '#A7F3D0';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
        e.currentTarget.style.borderColor = '#E2E8F0';
      }}
      >
        <div>
          {/* Header Row: Company Logo & Bookmark */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img 
                src={job.logo} 
                alt={job.company} 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  border: '1px solid #E2E8F0'
                }}
              />
              <div>
                <span style={{ fontSize: '0.88rem', fontWeight: '600', color: '#64748B' }}>{job.company}</span>
                <Link to={`/job/${job.id}`}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#0F172A', marginTop: '2px' }}>
                    {job.title}
                  </h3>
                </Link>
              </div>
            </div>

            <button
              onClick={() => toggleSaveJob(job.id)}
              title={isSaved ? "Remove from saved" : "Save this job"}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: isSaved ? '#EBF8F4' : '#F1F5F9',
                color: isSaved ? '#0C463B' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }}
            >
              <Bookmark size={18} fill={isSaved ? '#0C463B' : 'none'} />
            </button>
          </div>

          {/* Location & Salary Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: '#475569', marginBottom: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={15} color="#0C463B" />
              {job.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600', color: '#0C463B' }}>
              <DollarSign size={15} color="#0C463B" />
              {job.salary}
            </span>
          </div>

          {/* Description snippet */}
          <p style={{
            fontSize: '0.88rem',
            color: '#64748B',
            lineHeight: '1.5',
            marginBottom: '18px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {job.description}
          </p>

          {/* Badges / Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            <Badge variant="primary">{job.type}</Badge>
            {job.tags?.slice(0, 3).map((tag, idx) => (
              <Badge key={idx} variant="default">{tag}</Badge>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid #F1F5F9',
          paddingTop: '16px'
        }}>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>{job.postedDate}</span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link 
              to={`/job/${job.id}`}
              style={{
                fontSize: '0.88rem',
                fontWeight: '600',
                color: '#0C463B',
                padding: '8px 14px',
                borderRadius: '8px',
                backgroundColor: '#EBF8F4',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Details
            </Link>

            {isApplied ? (
              <button
                disabled
                style={{
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  color: '#065F46',
                  backgroundColor: '#ECFDF5',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'default'
                }}
              >
                <CheckCircle2 size={16} />
                Applied
              </button>
            ) : (
              <button
                onClick={() => setApplyModalOpen(true)}
                style={{
                  fontSize: '0.88rem',
                  fontWeight: '600',
                  color: '#FFFFFF',
                  backgroundColor: '#0C463B',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'var(--transition)'
                }}
              >
                Apply Now
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Apply Modal */}
      <Modal 
        isOpen={applyModalOpen} 
        onClose={() => setApplyModalOpen(false)}
        title={`Apply for ${job.title}`}
      >
        {applySuccessMessage ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F172A', marginBottom: '8px' }}>
              Application Sent!
            </h4>
            <p style={{ color: '#64748B', fontSize: '0.9rem' }}>{applySuccessMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleApply}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>
                Position at {job.company}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#64748B' }}>
                {job.location} • {job.salary}
              </div>
            </div>

            <div style={{
              backgroundColor: '#EBF8F4',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '0.85rem',
              color: '#0C463B',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>Attached: <strong>Alice_Johnson_Resume.pdf</strong></span>
              <Badge variant="success">Auto-Attached</Badge>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Short Cover Note (Optional)
              </label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Share why you are an ideal match for this opportunity..."
                rows={4}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  outline: 'none',
                  fontSize: '0.9rem',
                  resize: 'vertical'
                }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setApplyModalOpen(false)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  color: '#475569',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '10px 22px',
                  borderRadius: '8px',
                  backgroundColor: '#0C463B',
                  color: '#FFFFFF',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default JobCard;
