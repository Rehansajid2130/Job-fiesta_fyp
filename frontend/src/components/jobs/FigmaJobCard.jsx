import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Bookmark } from 'lucide-react';
import IconSwap from '../common/IconSwap';
import { useAuth } from '../../context/AuthContext';

const FigmaJobCard = ({ 
  job, 
  onApply, 
  isApplied = false,
  isBookmarked = false,
  onToggleBookmark 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isRecruiter = user?.userType === 'recruiter';
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    if (onToggleBookmark) {
      onToggleBookmark(job.id);
    }
  };

  const isPartTime = job.type?.toLowerCase().includes('part') || job.type === 'Part-Time';
  const applicantsCount = job.applicantsCount || 10;

  return (
    <div 
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #ECECEC',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: 'Inter, sans-serif'
      }}
    >
      <div>
        {/* Top Title & Bookmark */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <h4 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#111827',
            margin: 0,
            lineHeight: 1.3
          }}>
            {job.title}
          </h4>
          <button
            type="button"
            onClick={handleBookmarkClick}
            aria-label="Bookmark Job"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '2px',
              color: bookmarked ? '#0D473B' : '#9CA3AF',
              flexShrink: 0
            }}
          >
            <IconSwap 
              state={bookmarked} 
              iconA={<Bookmark size={20} fill="#0D473B" color="#0D473B" />} 
              iconB={<Bookmark size={20} fill="none" color="#9CA3AF" />} 
            />
          </button>
        </div>

        {/* Badge & Salary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            padding: '4px 9px',
            borderRadius: '4px',
            backgroundColor: isPartTime ? '#DCFCE7' : '#F1E0FF',
            color: isPartTime ? '#0D473B' : '#7C3AED'
          }}>
            {job.type || 'Full-Time'}
          </span>
          <span style={{ fontSize: '12.5px', color: '#6B7280', fontWeight: '500' }}>
            {job.salary ? `Salary: ${job.salary}` : 'Salary: 20,000 INR - 25,000 INR'}
          </span>
        </div>

        {/* Company & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            backgroundColor: '#F8FAFC',
            border: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            flexShrink: 0,
            padding: '6px'
          }}>
            <img 
              src={job.logo || '/assets/images/google_logo.png'} 
              alt={job.company} 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/assets/images/google_logo.png';
              }}
            />
          </div>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827' }}>
              {job.company}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#6B7280' }}>
              <MapPin size={13} color="#9CA3AF" />
              <span>{job.location}</span>
            </div>
          </div>
        </div>

        {/* Applicants Avatar Pile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '22px' }}>
          <div className="t-avatar-group" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop"
              alt="Applicant"
              className="t-avatar"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop"
              alt="Applicant"
              className="t-avatar"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-8px', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop"
              alt="Applicant"
              className="t-avatar"
              style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #FFFFFF', marginLeft: '-8px', objectFit: 'cover' }}
            />
          </div>
          <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: '500' }}>
            {applicantsCount}+ applicants
          </span>
        </div>
      </div>

      {/* Buttons Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <button
          type="button"
          onClick={() => navigate(`/job/${job.id}`)}
          style={{
            backgroundColor: '#EBF8F4',
            color: '#0C463B',
            border: '1px solid #0C463B',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '13.5px',
            fontWeight: '600',
            cursor: 'pointer',
            textAlign: 'center'
          }}
        >
          View details
        </button>

        {isRecruiter ? (
          <button
            type="button"
            onClick={() => navigate('/candidates')}
            style={{
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              border: '1px solid #0C463B',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Manage ATS
          </button>
        ) : isApplied ? (
          <button
            type="button"
            disabled
            style={{
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              borderRadius: '50px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'default',
              textAlign: 'center'
            }}
          >
            ✓ Applied
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onApply && onApply(job)}
            style={{
              backgroundColor: '#0C463B',
              color: '#FFFFFF',
              border: '1px solid #0C463B',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13.5px',
              fontWeight: '600',
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            Apply now
          </button>
        )}
      </div>
    </div>
  );
};

export default FigmaJobCard;
